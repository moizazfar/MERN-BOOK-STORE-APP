import Dashboard from "../../dashboard/Dashboard";

import UploadBooks from "../../dashboard/UploadBooks";
import ManageBooks from "../../dashboard/ManageBooks";
import EditBooks from "../../dashboard/EditBooks";

import DashboardUser from "../../dashboard/DashboardUser";
import SingleBook from "../../components/SingleBook";

import UserDLayout from "../../dashboard/UserDLayout";
import DashboardLayout from "../../dashboard/DashboardLayout";
import UserManageBooks from "../../dashboard/UserManageBook";

import AuctionForm from "../../dashboard/AuctionForm";
import AuctionList from "../../dashboard/AuctionList";
import AllAuctionList from "../../dashboard/AllAuctionList";

export const privateRoutes = [
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "upload-book",
        element: <UploadBooks />,
      },
      {
        path: "manage",
        element: <ManageBooks />,
      },
      {
        path: "edit-book/:id",
        element: <EditBooks />,
      },
      {
        path: "auction-book/:id",
        element: <AuctionForm />,
      },
      {
        path: "auction/list",
        element: <AllAuctionList />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserDLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardUser />,
      },
      {
        path: "manage",
        element: <UserManageBooks />,
      },
      {
        path: "upload-book",
        element: <UploadBooks />,
      },
      {
        path: "edit-book/:id",
        element: <EditBooks />,
      },
      {
        path: "auction-book/:id",
        element: <AuctionForm />,
      },
      {
        path: "auction/list",
        element: <AuctionList />,
      },
    ],
  },
];
