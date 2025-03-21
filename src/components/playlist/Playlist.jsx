// PlaylistComponent.jsx
import React from "react";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import { Link } from "react-router-dom";

const Playlist = ({ playlist }) => {
  return (
    <div className="relative flex  flex-col ">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={
            playlist?.videoDetails?.thumbnail ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s"
          }
          alt="Playlist Cover"
          className="w-full h-44 rounded-lg object-cover"
        />
      </div>
      <p className="bg-secondary px-2 rounded-md bg-opacity-75 text-xs  absolute bottom-14 right-2 ">
        {" "}
        <PlaylistPlayOutlinedIcon />
        <span>{playlist?.totalVideos} vidoes</span>
      </p>
      <div>
        <h3 className="text-md font-medium line-clamp-1">{playlist?.name}</h3>
        <Link to={`/playlist/${playlist?._id}`}>
          <button className="text-slate-400">View full playlist</button>
        </Link>
      </div>
    </div>
  );
};

export default Playlist;
