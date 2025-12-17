import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Home page without app layout (full-width landing page)
  index("routes/home.tsx"),

  // Routes with the shared app layout (header, footer, breadcrumbs)
  layout("routes/layouts/app-layout.tsx", [
    // Example: Features section with nested routes to demonstrate breadcrumbs
    route("features", "routes/features/index.tsx", [
      route(":featureId", "routes/features/feature-detail.tsx"),
    ]),

    // About page
    route("about", "routes/about.tsx"),

    // Paintings demo (from original project)
    route("paintings", "routes/paintings.tsx"),
  ]),
] satisfies RouteConfig;
