import React from "react";
import Button from "../Button";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VideoLibrarySharpIcon from "@mui/icons-material/VideoLibrarySharp";
import { Link } from "react-router-dom";

function NotUserThenYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <span className="mb-4">
        <VideoLibrarySharpIcon style={{ fontSize: "80px" }} />
      </span>
      <h1 className="text-2xl font-semibold mb-2">
        Enjoy you favorite videos.
      </h1>
      <p className="text-gray-500">
        Sign in to access videos that you’ve liked or saved.
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

export default NotUserThenYou;
