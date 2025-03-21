import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

function NotUserThenLikedVid() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <span className="mb-4">
        <ThumbUpOutlinedIcon style={{ fontSize: "80px" }} />
      </span>
      <h1 className="text-2xl font-semibold mb-2">
        See all your liked videos at one palce.
      </h1>
      <p className="text-gray-500">
        Sign in to see the list of your all liked videos..
      </p>
      <Link to="/login">
        <Button className="mt-4 flex items-center text-blue-600">
          <AccountCircleOutlinedIcon style={{ color: "" }} />
          <span className="text-sm text-blue-600 ml-2">Sign in</span>
        </Button>
      </Link>
    </div>
  );
}

export default NotUserThenLikedVid;
