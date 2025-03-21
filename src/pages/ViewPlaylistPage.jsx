import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import playlistService from "../services/playlist.service";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import videoService from "../services/video.service";
import { Button, VideoCard } from "../components";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";

const ViewPlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    window.scrollTo(0, 0);
    playlistService.getPlaylistById(playlistId).then((response) => {
      if (response.statusCode === 200) {
        setPlaylist(response.data);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    playlistService.getAllVideosOfPlaylist(playlistId).then((response) => {
      if (response.statusCode === 200) {
        setVideos(response?.data?.videoDetails);
      }
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-2 md:p-6 mt-14">
      {/* Left Section */}
      <div className="lg:w-1/3 rounded-lg p-5 shadow-lg bg-gradient-to-r from-cyan-950 via-purple-950 to-blue-900">
        <img
          src={playlist?.videoDetails?.thumbnail}
          alt={playlist?.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold text-white mb-2">{playlist?.name}</h2>
        <p className="text-gray-400 mb-2">{playlist?.description}</p>
        <img
          className="h-8 w-8 rounded-full object-cover inline mr-2"
          src={playlist?.owner?.avatar}
          alt=""
        />
        <span className="text-xs">by {playlist?.owner?.fullName}</span>
        <p className="text-gray-400 mt-1 text-sm">
          Playlist • {playlist?.totalVideos}{" "}
          {playlist?.totalVideos === 1 ? "Video" : "Videos"}
        </p>

        <div className=" flex justify-between mt-4">
          <button className="flex gap-2 items-center bg-white text-black font-bold px-6 py-2 rounded-full ">
            <PlayArrowIcon /> Play all
          </button>
          <div>
            <RouterLink to={`/playlist/${playlist?._id}/create`}>
              {userData?._id === playlist?.owner?._id && (
                <Button>Edit playlist</Button>
              )}
            </RouterLink>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-2/3 flex flex-col gap-4">
        {!videos || videos.length === 0 ? (
          <h1 className="text-2xl font-thin text-gray-600">
            No videos found in this playlist.{" "}
            <RouterLink to={`/playlist/${playlistId}/create`}>
              <Link>Add videos</Link>
            </RouterLink>{" "}
            to this playlist
          </h1>
        ) : (
          videos?.map((video, index) => (
            <div className="flex ">
              <span className="mr-2">{index + 1}</span>
              <VideoCard
                key={video._id}
                props={video}
                className="h-20 md:h-28 min-w-28 md:w-44 gap-1 "
                flexcol="flex"
                hidden="hidden"
                padding={0}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewPlaylistPage;
