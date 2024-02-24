import React from "react";
import { Outlet } from "react-router";

import "../dashboard/style.css"; // Include your custom styles file
import UserDashboard from "./UserDashboard";

const UserDLayout = () => {
  return (
    <div className="dashboard-layout-container">
      <UserDashboard />

      {/* Content Area */}
      <div className="content-area">
        {/* Your content goes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default UserDLayout;
