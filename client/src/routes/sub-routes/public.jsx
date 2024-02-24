// import Home from "../home/Home";
import Home from "../../home/Home";
import Signup from "../../components/Signup";
import Signin from "../../components/Signin";
import About from "../../components/About";

import Shop from "../../shop/Shop";
import SingleBook from "../../components/SingleBook";

export const publicRoutes = [
  {
    path: "/book/:id",
    element: <SingleBook />,
  },
  {
    index: true,
    element: <Home />,
  },
  {
    path: "sign-in",
    element: <Signin />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/about",
    element: <About />,
  },
];
