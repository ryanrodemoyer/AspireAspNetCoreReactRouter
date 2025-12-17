import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";

/**
 * Custom render function that wraps components with necessary providers.
 * Extend this as your app grows to include other providers (theme, auth, etc.)
 */
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  /**
   * Initial route for the memory router (useful for route-specific tests)
   */
  initialRoute?: string;
  /**
   * Custom wrapper component for additional providers
   */
  wrapper?: React.ComponentType<{ children: ReactNode }>;
}

/**
 * Renders a component for testing without router context.
 * Use this for testing simple components that don't need routing.
 */
function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { wrapper: Wrapper, ...renderOptions } = options;

  function AllProviders({ children }: { children: ReactNode }) {
    if (Wrapper) {
      return <Wrapper>{children}</Wrapper>;
    }
    return <>{children}</>;
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...renderOptions }),
  };
}

/**
 * Renders a component within a React Router context.
 * Use this for testing route components or components that use router hooks.
 */
interface RenderWithRouterOptions extends Omit<RenderOptions, "wrapper"> {
  /**
   * Initial route to render
   */
  initialRoute?: string;
  /**
   * Routes configuration for the memory router
   */
  routes?: Array<{
    path: string;
    element: ReactElement;
    children?: Array<{ path: string; element: ReactElement }>;
  }>;
}

function renderWithRouter(
  ui: ReactElement,
  options: RenderWithRouterOptions = {}
) {
  const { initialRoute = "/", routes, ...renderOptions } = options;

  const defaultRoutes = [
    {
      path: "/",
      element: ui,
    },
  ];

  const router = createMemoryRouter(routes ?? defaultRoutes, {
    initialEntries: [initialRoute],
  });

  return {
    user: userEvent.setup(),
    router,
    ...render(<RouterProvider router={router} />, renderOptions),
  };
}

/**
 * Creates a deferred promise for testing async operations.
 * Useful for controlling when promises resolve in tests.
 */
function createDeferred<T>() {
  let resolve: (value: T) => void;
  let reject: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}

/**
 * Waits for a specified amount of time.
 * Use sparingly - prefer waitFor or findBy queries instead.
 */
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Re-export everything from React Testing Library
export * from "@testing-library/react";
export { userEvent };

// Export custom utilities
export { customRender as render, renderWithRouter, createDeferred, wait };
