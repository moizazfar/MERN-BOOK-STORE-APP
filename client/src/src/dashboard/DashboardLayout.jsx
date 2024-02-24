import React from "react";
import { Outlet } from "react-router";

import "../dashboard/style.css"; // Include your custom styles file
import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout-container">
      <SideBar />

      {/* Content Area */}
      <div className="content-area">
        {/* Your content goes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

//  <div className="flex gap-g">
//               <div className="lg:w-1/2">
//                 <div className="mb-2 block">
//                <label htmlFor="bookTitle" value='Book Title'>Book Title</label>

//                 </div>
//               </div>
//            </div>

{
  /* <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/edit">Edit Profile</Link>
        </li>
        <li>
          <Link to="/manage">Manage Books</Link>
        </li>
        <li>
          <Link to="/upload">Upload Books</Link>
        </li>
      </ul>
    </nav> */
}
