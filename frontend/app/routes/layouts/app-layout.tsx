import { Outlet } from "react-router";
import { Header, Footer, Breadcrumbs } from "~/components/layout";

/**
 * Main application layout with header, footer, and breadcrumbs.
 * Wrap your routes with this layout to get the shared app shell.
 */
export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
