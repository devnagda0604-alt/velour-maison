import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./routes/__root";
import { Route as aboutRoute } from "./routes/about";
import { Route as dashboardRoute } from "./routes/account/dashboard";
import { Route as loginRoute } from "./routes/account/login";
import { Route as signupRoute } from "./routes/account/signup";
import { Route as cartRoute } from "./routes/cart";
import { Route as checkoutRoute } from "./routes/checkout";
import { Route as confirmationRoute } from "./routes/checkout/confirmation";
import { Route as collectionsRoute } from "./routes/collections";
import { Route as atelierRoute } from "./routes/collections/atelier";
import { Route as comfortRoute } from "./routes/collections/comfort";
import { Route as heritageRoute } from "./routes/collections/heritage";
import { Route as productDetailRoute } from "./routes/collections/product-detail";
import { Route as indexRoute } from "./routes/index";
import { Route as lookbookStoryRoute } from "./routes/lookbook/$storyId";
import { Route as lookbookRoute } from "./routes/lookbook/index";
import { Route as sizeGuideRoute } from "./routes/size-guide";
import { Route as vipRoute } from "./routes/vip";

const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionsRoute,
  atelierRoute,
  heritageRoute,
  comfortRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute.addChildren([confirmationRoute]),
  aboutRoute,
  lookbookRoute,
  lookbookStoryRoute,
  sizeGuideRoute,
  loginRoute,
  signupRoute,
  dashboardRoute,
  vipRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
