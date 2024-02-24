import PublicMiddleware from "./middleware/public";
import AuthenticatedMiddleware from "./middleware/authenticated";

import { publicRoutes } from "./sub-routes/public";
import { privateRoutes } from "./sub-routes/private";

export const routes = ({ isLoggedIn, role }) => [
  {
    path: "/",
    element: <PublicMiddleware isLoggedIn={isLoggedIn} />,
    children: publicRoutes || [],
  },
  {
    path: "/",
    element: <AuthenticatedMiddleware isLoggedIn={isLoggedIn} role={role} />,
    children: privateRoutes || [],
  },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
];
