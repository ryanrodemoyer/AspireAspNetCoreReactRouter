import type { Route } from "./+types/about";
import type { BreadcrumbHandle } from "~/components/layout";

export const handle: BreadcrumbHandle = {
  breadcrumb: "About",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Your App" },
    { name: "description", content: "Learn more about us" },
  ];
}

/**
 * Simple about page demonstrating the app layout.
 */
export default function About() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        About Us
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        This is an example about page demonstrating the shared app layout with
        header, footer, and breadcrumbs.
      </p>

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            To provide developers with a solid foundation for building modern
            web applications. This starter template includes everything you
            need to get up and running quickly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            What&apos;s Included
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-gray-600 dark:text-gray-400">
            <li>React Router v7 with SSR support</li>
            <li>Tailwind CSS v4 for styling</li>
            <li>TypeScript for type safety</li>
            <li>Vitest for unit testing</li>
            <li>Playwright for E2E testing</li>
            <li>Responsive layout with mobile navigation</li>
            <li>Breadcrumbs for nested routes</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
