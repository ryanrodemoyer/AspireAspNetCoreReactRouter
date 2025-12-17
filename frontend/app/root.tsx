import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";

// Loader runs on server - passes OTEL config to client for browser telemetry
// Browser needs HTTP OTLP endpoint (not gRPC)
export function loader() {
  // Browser telemetry only works in local development where the OTEL collector is accessible
  // In production (Azure Container Apps), the collector is internal-only and not reachable from browsers
  const isProduction = process.env.NODE_ENV === "production";
  
  if (isProduction) {
    // Don't attempt browser telemetry in production - collector is not publicly accessible
    return {
      otlpEndpoint: null,
      otlpHeaders: null,
    };
  }

  // Try HTTP-specific endpoint first, fall back to deriving from gRPC endpoint
  let httpEndpoint = process.env.OTEL_EXPORTER_OTLP_HTTP_ENDPOINT || null;

  // If no HTTP endpoint, try to derive from gRPC endpoint (HTTP is typically gRPC port + 1)
  if (!httpEndpoint && process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    try {
      const url = new URL(process.env.OTEL_EXPORTER_OTLP_ENDPOINT);
      const grpcPort = parseInt(url.port, 10);
      url.port = String(grpcPort + 1);
      httpEndpoint = url.toString().replace(/\/$/, "");
    } catch {
      // If URL parsing fails, don't set endpoint
    }
  }

  return {
    otlpEndpoint: httpEndpoint,
    otlpHeaders: process.env.OTEL_EXPORTER_OTLP_HEADERS || null,
  };
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { otlpEndpoint, otlpHeaders } = useLoaderData<typeof loader>();

  useEffect(() => {
    // Only run in browser
    if (typeof window !== "undefined" && otlpEndpoint) {
      import("./telemetry.client").then(({ initTelemetry }) => {
        initTelemetry(otlpEndpoint, otlpHeaders ?? undefined);
      });
    }
  }, [otlpEndpoint, otlpHeaders]);

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
