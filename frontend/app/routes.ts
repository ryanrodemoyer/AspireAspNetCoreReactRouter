import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("paintings", "routes/paintings.tsx"),
] satisfies RouteConfig;
