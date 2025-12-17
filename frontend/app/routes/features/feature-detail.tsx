import { Link, useParams } from "react-router";
import type { Route } from "./+types/feature-detail";
import type { BreadcrumbHandle } from "~/components/layout";

// Feature data (in a real app, this would come from a database/API)
const featuresData: Record<string, { title: string; description: string; details: string[] }> = {
  authentication: {
    title: "Authentication",
    description: "Secure user authentication with multiple providers",
    details: [
      "Email/password authentication",
      "OAuth providers (Google, GitHub, etc.)",
      "Two-factor authentication",
      "Session management",
      "Password reset flows",
    ],
  },
  "api-integration": {
    title: "API Integration",
    description: "RESTful API with automatic documentation",
    details: [
      "OpenAPI/Swagger documentation",
      "Type-safe API clients",
      "Rate limiting",
      "API versioning",
      "Webhook support",
    ],
  },
  "real-time": {
    title: "Real-time Updates",
    description: "WebSocket support for live data synchronization",
    details: [
      "WebSocket connections",
      "Server-sent events",
      "Real-time notifications",
      "Live collaboration",
      "Presence indicators",
    ],
  },
  analytics: {
    title: "Analytics",
    description: "Built-in analytics and usage tracking",
    details: [
      "Page view tracking",
      "Custom event tracking",
      "User journey analysis",
      "Performance metrics",
      "Export capabilities",
    ],
  },
};

export const handle: BreadcrumbHandle = {
  // Dynamic breadcrumb based on the feature being viewed
  breadcrumb: (data: unknown) => {
    const typedData = data as { feature: { title: string } } | undefined;
    return typedData?.feature?.title ?? "Feature";
  },
};

export function meta({ data }: Route.MetaArgs) {
  const feature = data?.feature;
  return [
    { title: feature ? `${feature.title} - Features` : "Feature" },
    { name: "description", content: feature?.description ?? "Feature details" },
  ];
}

export function loader({ params }: Route.LoaderArgs) {
  const featureId = params.featureId;
  const feature = featuresData[featureId ?? ""];

  if (!feature) {
    throw new Response("Feature not found", { status: 404 });
  }

  return { feature, featureId };
}

/**
 * Feature detail page demonstrating dynamic breadcrumbs.
 */
export default function FeatureDetail({ loaderData }: Route.ComponentProps) {
  const { feature } = loaderData;

  return (
    <div>
      <Link
        to="/features"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Features
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        {feature.title}
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        {feature.description}
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Key Capabilities
        </h2>
        <ul className="mt-4 space-y-3">
          {feature.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
