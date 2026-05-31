import { createRoute, redirect } from "@tanstack/react-router";
import { Route as rootRoute } from "../__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account/signup",
  beforeLoad: () => {
    throw redirect({ to: "/account/login", search: { tab: "signup" } });
  },
  component: () => null,
});
