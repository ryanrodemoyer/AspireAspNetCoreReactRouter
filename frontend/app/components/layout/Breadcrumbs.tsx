import { Link, useMatches } from "react-router";

/**
 * Breadcrumb item configuration.
 * Add this to your route's handle export to customize breadcrumbs.
 *
 * @example
 * // In your route file:
 * export const handle: BreadcrumbHandle = {
 *   breadcrumb: "Dashboard",
 * };
 *
 * // Or with dynamic breadcrumb based on loader data:
 * export const handle: BreadcrumbHandle = {
 *   breadcrumb: (data) => data?.user?.name ?? "User",
 * };
 */
export interface BreadcrumbHandle {
  breadcrumb: string | ((data: unknown) => string);
}

interface BreadcrumbItem {
  label: string;
  to: string;
  isLast: boolean;
}

/**
 * Breadcrumbs component that automatically generates breadcrumb trail
 * based on the current route hierarchy.
 *
 * Uses React Router's useMatches hook to access route handles.
 */
export function Breadcrumbs() {
  const matches = useMatches();

  const breadcrumbs: BreadcrumbItem[] = matches
    .filter((match) => {
      // Only include routes that have a breadcrumb handle
      const handle = match.handle as BreadcrumbHandle | undefined;
      return handle?.breadcrumb !== undefined;
    })
    .map((match, index, filtered) => {
      const handle = match.handle as BreadcrumbHandle;
      const label =
        typeof handle.breadcrumb === "function"
          ? handle.breadcrumb(match.data)
          : handle.breadcrumb;

      return {
        label,
        to: match.pathname,
        isLast: index === filtered.length - 1,
      };
    });

  // Don't render if there's only one breadcrumb (just the current page)
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.to} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            )}
            {crumb.isLast ? (
              <span
                className="font-medium text-gray-900 dark:text-white"
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.to}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Simpler breadcrumbs that you can manually control.
 * Use this when you need full control over the breadcrumb items.
 */
export interface ManualBreadcrumbItem {
  label: string;
  to?: string;
}

interface ManualBreadcrumbsProps {
  items: ManualBreadcrumbItem[];
  className?: string;
}

export function ManualBreadcrumbs({ items, className = "" }: ManualBreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`mb-4 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              )}
              {isLast || !item.to ? (
                <span
                  className="font-medium text-gray-900 dark:text-white"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
