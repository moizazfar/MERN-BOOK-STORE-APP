import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiTable,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import userImg from "../assets/profile.jpg";

const UserDashboard = () => {
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Logo href="/" img={userImg} imgAlt="logo" className="w-16 h-16">
        Moiz
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/user/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            href="/user/dashboard/upload-book"
            icon={HiOutlineCloudUpload}
          >
            Upload Book
          </Sidebar.Item>

          <Sidebar.Item href="/sign-in" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default UserDashboard;
