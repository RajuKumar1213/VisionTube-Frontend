import React from "react";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { Link } from "react-router-dom";
import Button from "../Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function NotUserThenHistory() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <span className="mb-4">
        <HistoryOutlinedIcon style={{ fontSize: "80px" }} />
      </span>
      <h1 className="text-2xl font-semibold mb-2">
        Keep track of what you watch.
      </h1>
      <p className="text-gray-500">
        Watch history isn't viewable when signed out. Sign in to access it.
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

export default NotUserThenHistory;
