import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../redux/features/toggleSidebarSlice";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import Users from "../Users";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebarTState = useSelector((state) => state.toggleSide.toggleState);
  const userStatus = useSelector((state) => state.auth.status);

  const sideNavList = [
    {
      name: "Home",
      icon: <HomeOutlinedIcon />,
      url: "/",
    },
    {
      name: "History",
      icon: <HistoryOutlinedIcon />,
      url: userStatus ? "/watch-history" : "/feed/history",
    },
    {
      name: "You",
      icon: <AccountCircleOutlinedIcon />,
      url: userStatus ? "/feed-you" : "/feed/you",
    },
    {
      name: "Subscriptions",
      icon: <SubscriptionsOutlinedIcon />,
      url: userStatus ? "/subscriptions" : "/feed/subscriptions",
    },
    {
      name: "Liked",
      icon: <ThumbUpAltOutlinedIcon />,
      url: userStatus ? "/liked-videos" : "/feed/liked-videos",
    },
  ];

  return (
    <div className={`relative`}>
      {/* Overlay (Blur effect) */}
      {sidebarTState && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-35 transition-all duration-300"></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 md:w-64 bg-secondary text-white z-20 px-4 py-4 transition-transform duration-300 overflow-y-scroll custom-scrollbar ${
          sidebarTState ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-4">
          <ul className="space-y-3">
            <li>
              <div className="flex items-center space-x-4 ">
                <button onClick={() => dispatch(closeSidebar())}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>

                <span className="text-xl font-bold text-gray-300">
                  VisionTube
                </span>
              </div>
            </li>

            {sideNavList.map((item) => (
              <Link to={item.url} key={item.url}>
                <li
                  onClick={() => dispatch(closeSidebar())}
                  className="flex items-center space-x-2  hover:bg-slate-700 p-2 rounded-md transition duration-200 my-3"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </li>
              </Link>
            ))}

            <h2 className="border-t border-gray-600 mt-4 pt-4">
              Subscriptions
            </h2>

            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />
            <Users />

            {/* Add more links as required */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
