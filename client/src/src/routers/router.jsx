import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import SingleBook from "../components/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBooks from "../dashboard/UploadBooks";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import OtpEnter from "../components/OtpEnter";
import Logout from "../components/Logout";
import UserDLayout from "../dashboard/UserDLayout";
import DashboardUser from "../dashboard/DashboardUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`http://localhost:3050/book/${params.id}`),
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard/upload-book",
        element: <UploadBooks />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks />,
      },
      {
        path: "/admin/dashboard/edit-book/:id",
        element: <EditBooks />,
        loader: ({ params }) =>
          fetch(`http://localhost:3050/book/${params.id}`),
      },
    ],
  },

  {
    path: "/user/dashboard",
    element: <UserDLayout />,
    children: [
      {
        path: "/user/dashboard",
        element: <DashboardUser />,
      },
      {
        path: "/user/dashboard/upload-book",
        element: <UploadBooks />,
      },
    ],
  },

  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/otp",
    element: <OtpEnter />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);
export default router;
