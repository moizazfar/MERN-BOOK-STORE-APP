import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiTable,
  HiUser,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import userImg from "../assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/auth/controller";
import { useDispatch, useSelector } from "react-redux";
import { userReset } from "../redux/slices/auth/auth.slice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    dispatch(userReset());
  };

  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Link to="/">
        <Sidebar.Logo img={userImg} imgAlt="logo" className="w-16 h-16">
          Book Store
        </Sidebar.Logo>
      </Link>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={`/${user?.userType?.toLowerCase()}/dashboard`}>
            <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
          </Link>
          <Link to="upload-book">
            <Sidebar.Item icon={HiOutlineCloudUpload}>Upload Book</Sidebar.Item>
          </Link>
          <Link to="manage">
            <Sidebar.Item icon={HiInbox}>Manage Book</Sidebar.Item>
          </Link>
          <Link to="auction/list">
            <Sidebar.Item icon={HiOutlineCloudUpload}>
              Auctioned Books
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
            icon={HiTable}
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
