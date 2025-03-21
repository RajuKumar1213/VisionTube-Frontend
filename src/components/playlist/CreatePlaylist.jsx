import React, { useState } from "react";

const PlaylistCreationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoInput, setVideoInput] = useState("");

  const addVideo = () => {
    if (videoInput.trim()) {
      setVideos([...videos, videoInput]);
      setVideoInput("");
    }
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const playlistData = {
      title,
      description,
      videos,
    };
    console.log("Playlist Created:", playlistData);
    // Add functionality to save the playlist
  };

  return (
    <div className="bg-secondary text-white min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Create Playlist</h1>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Playlist Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter playlist title"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Playlist Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter playlist description"
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="video" className="block text-sm font-medium mb-2">
            Add Video
          </label>
          <div className="flex items-center gap-2">
            <input
              id="video"
              type="text"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              className="flex-1 p-2 bg-gray-700 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video URL"
            />
            <button
              onClick={addVideo}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>

        {videos.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Videos in Playlist</h2>
            <ul className="space-y-2">
              {videos.map((video, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
                >
                  <span className="truncate">{video}</span>
                  <button
                    onClick={() => removeVideo(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
};

export default PlaylistCreationPage;
