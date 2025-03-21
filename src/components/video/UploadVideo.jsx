import React, { useState } from "react";
import spinner from "/spinner.svg";
import { Button, Input } from "../../components";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import extractErrorMessage from "../../utils/extractErrorMessage";
import videoService from "../../services/video.service";
import { useDispatch } from "react-redux";
import { showTimedAlert } from "../../redux/features/alertSlice";

const UploadVideo = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async (data) => {
    setLoading(true);
    setError("");
    if (!data) {
      console.log("No data found");
    }
    videoService
      .uploadVideo(data, setProgress)
      .then((response) => {
        if (response.statusCode === 200 || response.statusCode === 201) {
          dispatch(
            showTimedAlert({
              message: "Video uploaded successfully",
              type: "success",
            })
          );
          setError("");
          navigate("/dashboard");
          setLoading(false);
        }
      })
      .catch((error) => {
        dispatch(
          showTimedAlert({
            message: extractErrorMessage(error),
            type: "error",
            duration: 7000,
          })
        );
        setError(extractErrorMessage(error));
        console.log("Error uploading video:", error);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Upload Video</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(handleUpload)}>
        {/* Drag and Drop Section */}
        <div
          className="border-dashed border-2 border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-gray-800 transition"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {videoFile ? (
            <div className="text-center">
              <p className="text-lg font-semibold">{videoFile.name}</p>
              <p className="text-gray-400 text-sm">
                {(videoFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 mb-2">
                Drag and drop your video here{" "}
              </p>
              <p className="text-gray-500 text-sm">or</p>
              <label
                className="cursor-pointer text-blue-400 mt-2 hover:underline"
                htmlFor="videoFileInput"
              >
                Browse Files
              </label>
              <input
                className="my-4 block  text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100
             cursor-pointer"
                id="videoFileInput"
                type="file"
                // className="hidden"
                onChange={(e) => setVideoFile(e.target.files[0])}
                accept="video/*"
                {...register("videoFile", { required: "Video is required" })}
              />
            </>
          )}
        </div>
        {/* Form Fields */}

        <div className="flex justify-between gap-4 flex-wrap md:flex-nowrap">
          <div className="w-full">
            <Input
              type="text"
              label="Title"
              placeholder="Enter video title"
              className="mb-4 "
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 mt-2">{errors.title.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              type="file"
              label="Thumbnail"
              placeholder="Enter video title"
              className="mb-4"
              {...register("thumbnail", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 mt-2">{errors.thumbnail.message}</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <label className="block mb-2 text-gray-300">Description</label>
          <textarea
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
            rows="4"
            placeholder="Enter video description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 mt-2">{errors.description.message}</p>
          )}
        </div>

        {isUploading && (
          <div className="w-full bg-gray-600 rounded h-4 mb-4">
            <div
              className="h-4 bg-blue-500 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Submit Button */}

        <div className="flex gap-8 mt-4">
          <Button
            type="submit"
            className="flex justify-center items-center my-4 min-w-28 md:min-w-56 rounded-lg "
          >
            {loading && <img src={spinner} alt="" className="w-6 mr-3" />}
            {/* {isUploading ? `Uploading... ${progress}%` : "Upload"} */}
            Upload
          </Button>

          {progress && (
            <div className="w-full max-w-lg flex flex-col justify-center items-start ">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {" "}
                {progress}%
              </div>
              <p className="text-gray-400 text-sm mt-2">Uploading...</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
