import React from "react";
import { Link } from "react-router-dom";

import { format } from "timeago.js";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PublicOffOutlinedIcon from "@mui/icons-material/PublicOffOutlined";

import Button from "./Button";

function MyRecentVideos({ props }) {
  return (
    <div className="relative p-4 sm:p-6 w-full bg-secondary my-4 rounded-xl">
      {/* Video Info Section */}
      <div className="flex items-start ">
        {/* Thumbnail */}
        <Link to={`/watch/${props?._id}`} className="mr-2 md:mr-6">
          <img
            src={props?.thumbnail}
            alt="Video Thumbnail"
            className="w-24 h-16 md:w-48 md:h-32 object-cover rounded-xl"
          />
        </Link>

        {/* Video Title & Description */}
        <div className="flex-1">
          <h3 className="text-sm mr-5 md:text-lg sm:text-2xl font-semibold text-gray-300 line-clamp-2 ">
            {props?.title.substring(0, 80)}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base md:mt-2 line-clamp-3">
            {props?.description}
          </p>
        </div>
        {/* Edit Button */}
        <Link
          to={`/edit-video/${props?._id}`}
          className="absolute top-6 right-6 md:top-3 md:right-3 hidden md:block sopacity-75 "
        >
          <Button className=" bg-secondary text-white flex items-center gap-x-1 px-4 py-1">
            <EditOutlinedIcon />
            <span>Edit</span>
          </Button>
        </Link>
        <Link
          to={`/edit-video/${props?._id}`}
          className="absolute top-2 right-2 block md:hidden sopacity-65 "
        >
          <span className="border border-gray-400 p-1 flex justify-center items-center rounded-full">
            <EditOutlinedIcon />
          </span>
        </Link>
      </div>

      {/* Stats & Actions */}
      <div className="mt-4 flex justify-between items-start sm:items-center pt-4 border-t border-slate-600  ">
        {/* Stats Section */}
        <div className="flex items-center text-sm text-gray-300 gap-x-4 md:gap-x-6 flex-wrap">
          <p className="flex items-center gap-x-1">
            <EqualizerOutlinedIcon className="text-gray-400" /> {props?.views}
          </p>
          <p className="flex items-center gap-x-1">
            <ThumbUpOutlinedIcon className="text-gray-400" /> 0
          </p>
          <p className="flex items-center gap-x-1">
            <CommentOutlinedIcon className="text-gray-400" /> 0
          </p>
        </div>

        {/* Publish Status & Date */}
        <p className="flex items-center gap-x-2 text-sm">
          {props.isPublished ? (
            <span className="text-green-400 flex items-center gap-x-1">
              Published <PublicOutlinedIcon />
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-x-1">
              Unpublished <PublicOffOutlinedIcon />
            </span>
          )}
          <span className="text-gray-400 ml-2">
            first {format(props?.createdAt).split("ago")[0]}
          </span>
        </p>
      </div>
    </div>
  );
}

export default MyRecentVideos;
