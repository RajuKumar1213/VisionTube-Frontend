import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import videoService from "../../services/video.service";
import { showTimedAlert } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const VideoEditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isPublished, setIsPublished] = useState("");
  const [video, setVideo] = useState({});

  const [newImagePreview, setNewImagePreview] = useState(null);

  const { videoId } = useParams();

  useEffect(() => {
    videoService.getVideoById(videoId).then((video) => {
      if (video.statusCode === 200) {
        setVideo(video.data);
        setTitle(video.data.title);
        setDescription(video.data.description);
        setThumbnail(video.data.thumbnail);
        setIsPublished(video.data.isPublished);
      }
    });
  }, [videoId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImagePreview(URL.createObjectURL(file));
    }
    const formData = new FormData();
    formData.append("thumbnail", file);
    videoService.updateThumbnail(videoId, formData).then((res) => {
      if (res.statusCode === 200) {
        console.log("Thumbnail updated successfully");
      }
    });
  };

  const handleSave = () => {
    const videoData = {
      title,
      description,
    };

    videoService.updateVideo(videoId, videoData).then((res) => {
      if (res.statusCode === 200) {
        navigate("/dashboard");
        dispatch(
          showTimedAlert({
            message: "Video updated successfully",
            type: "success",
          })
        );
      }
    });
  };

  const handlePublish = (e) => {
    setIsPublished(e.target.checked);
    videoService.togglePublishState(videoId);
  };

  const handleDelete = () => {
    videoService.deleteVideo(videoId).then((res) => {
      if (res.statusCode === 200) {
        navigate("/dashboard");
        dispatch(
          showTimedAlert({
            message: "Video deleted successfully",
            type: "success",
          })
        );
      }
    });
  };

  return (
    <div className="mt-10 min-h-screen text-white py-8 px-4">
      <div className="max-w-4xl mx-auto bg-secondary text-800 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold mb-4 text-center">Edit Video</h1>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-lg font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Choose new thumbnail
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="mb-4 block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100
             cursor-pointer"
            />
            <div className="flex md:flex-row flex-col  justify-between w-full ">
              <div>
                <h1 className="text-lg font-medium pb-2">Previous Thumbnail</h1>
                <img
                  src={thumbnail}
                  className="w-72 h-52 object-contain rounded-md"
                  alt="thumbnail"
                />
              </div>
              {newImagePreview && (
                <div>
                  <h1 className="text-lg font-medium pb-2 ">
                    New Thumbnail Preview
                  </h1>
                  <img
                    src={newImagePreview}
                    className="w-72 h-52 object-contain rounded-md"
                    alt="thumbnail"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Publish Toggle */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <label className="text-lg font-medium">Publish</label>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={handlePublish}
                className="rounded-full w-6 h-6 text-blue-500 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-gray-400 text-xs my-2">
              Checking publish will make the video visible to other users
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>

            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditPage;
