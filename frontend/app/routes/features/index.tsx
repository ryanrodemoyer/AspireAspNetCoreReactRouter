import { Link } from "react-router";
import type { Route } from "./+types/index";
import type { BreadcrumbHandle } from "~/components/layout";

export const handle: BreadcrumbHandle = {
  breadcrumb: "Features",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Features - Your App" },
    { name: "description", content: "Explore our features" },
  ];
}

/**
 * Example features list page demonstrating breadcrumbs.
 */
export default function FeaturesIndex() {
  const features = [
    {
      id: "authentication",
      title: "Authentication",
      description: "Secure user authentication with multiple providers",
    },
    {
      id: "api-integration",
      title: "API Integration",
      description: "RESTful API with automatic documentation",
    },
    {
      id: "real-time",
      title: "Real-time Updates",
      description: "WebSocket support for live data synchronization",
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "Built-in analytics and usage tracking",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Features
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Explore what our platform has to offer.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.id}
            to={feature.id}
            className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-900"
          >
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
