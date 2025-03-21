import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function FixedSidebar() {
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
    <div className="hidden md:block ">
      {/* Sidebar */}
      <div className="fixed top-14 left-0 h-screen w-20 bg-secondary text-white  px-1 py-2 transition-transform duration-300 custom-scrollbar ">
        <div className="space-y-4">
          <ul className="space-y-1 flex flex-col  ">
            {sideNavList.map((item) => (
              <Link to={item.url} key={item.url}>
                <li
                  key={item.url}
                  className="flex flex-col items-center justify-center hover:bg-slate-800 py-4 px-2 rounded-md"
                >
                  <span className="mb-1"> {item.icon}</span>
                  <span className="text-center text-xs">{item.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FixedSidebar;
