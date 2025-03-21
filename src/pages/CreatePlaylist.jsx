import React, { useEffect, useState } from "react";
import { Button } from "../components";
import { Link, useParams, useNavigate } from "react-router-dom";
import videoService from "../services/video.service";
import { useDispatch, useSelector } from "react-redux";
import playlistService from "../services/playlist.service";
import { showTimedAlert } from "../redux/features/alertSlice";
import { Modal } from "@mui/material";

const CreatePlaylist = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { playlistId } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // fetching all videos of user
  useEffect(() => {
    videoService.getAllVideosOfChannel(userData?._id).then((res) => {
      if (res.statusCode == 200) {
        setVideos(res.data);
      }
    });
  }, [userData]);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    playlistService.getAllVideosOfPlaylist(playlistId).then((res) => {
      if (res.statusCode == 200) {
        setSelectedVideos(res.data.videoDetails);
      }
    });
  }, []);

  // Add or remove video from selection
  const toggleVideoSelection = (video) => {
    // Check if the video is already selected
    // const isAlreadySelected = selectedVideos.some(
    //   (selected) => selected._id === video._id
    // );

    // if (isAlreadySelected) {
    //   // If selected, remove the video
    //   // setSelectedVideos((prev) =>
    //   //   prev.filter((selected) => selected._id !== video._id)
    //   // );
    // } else {
    // Add the video to the selection

    // if already selected then not add to playlist

    if (selectedVideos.some((selected) => selected._id === video._id)) {
      return;
    }
    setSelectedVideos((prev) => [...prev, video]);

    playlistService.addVideoToPlaylist(playlistId, video._id);
    // }
  };

  const handleRemoveSelectedVideo = (video) => {
    setSelectedVideos((prev) =>
      prev.filter((selected) => selected._id !== video._id)
    );

    // call api to remove video from playlist
    playlistService.deleteVideoFromPlaylist(playlistId, video?._id);
  };

  const handlePlaylistDelete = () => {
    playlistService.deletePlaylist(playlistId).then((res) => {
      if (res.statusCode == 200) {
        dispatch(
          showTimedAlert({
            message: "Playlist deleted successfully!",
            type: "success",
          })
        );
        navigate(`/profile/${userData?.username}`);
      }
    });
  };

  return (
    <div className=" mx-auto p-6 space-y-8 mt-14">
      <h1 className="text-2xl font-semibold text-gray-200">
        Add Videos to Playlist
      </h1>

      {/* Playlist Details */}

      {/* Video Selection */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search Videos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-secondary p-3 border-b rounded-md focus:outline-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {filteredVideos?.map((video) => (
            <div
              key={video._id}
              onClick={() => toggleVideoSelection(video)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300  ${
                selectedVideos?.some((v) => v?._id === video?._id)
                  ? "bg-blue-950 border-blue-500 shadow-lg"
                  : "hover:bg-slate-900"
              }`}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs font-semibold px-2 py-1 rounded">
                  {(video?.duration / 60).toFixed(2)}
                </span>
              </div>
              <h2 className="mt-3 text-md font-semibold text-gray-200">
                {video.title}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Videos Preview */}
      <div>
        <h2 className="text-xl font-semibold text-gray-400 mb-4">
          Selected Videos
        </h2>
        {selectedVideos.length > 0 ? (
          <ul className="space-y-2">
            {selectedVideos.map((video) => (
              <li
                key={video.id}
                className="p-3 border rounded-md flex items-center justify-between"
              >
                <span>{video.title}</span>
                <button
                  onClick={() => handleRemoveSelectedVideo(video)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No videos selected yet.</p>
        )}
      </div>

      <div className="flex gap-4 ">
        <Button
          onClick={() => {
            dispatch(
              showTimedAlert({
                message: "Playlist saved successfully",
                type: "success",
              })
            );
            navigate(`/playlist/${playlistId}`);
          }}
        >
          Save playlist
        </Button>
        <Button className="text-red-500" onClick={handlePlaylistDelete}>
          Delete this playlist
        </Button>

        {/* popup for confirm delete. */}
        {/* TODO: */}
      </div>
    </div>
  );
};

export default CreatePlaylist;
