import React, { useEffect, useState } from "react";
import Card from "./Card";
import RecentSubscribers from "./RecentSubscribers";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import dashboardService from "../services/dashboard.service";
import subscriptionService from "../services/subscription.service";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import MyRecentVideos from "./MyRecentVideos";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";
import authService from "../services/auth.service";
import spinner from "/spinner.svg";
import { showTimedAlert } from "../redux/features/alertSlice";

const Dashboard = () => {
  const userData = useSelector((state) => state.auth.userData);

  const [channelStatus, setChannelStatus] = useState(null);
  const [recentUploaedVideos, setRecentUploadedVideos] = useState([]);
  const [recentSubscribers, setRecentSubscribers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldImageUrl, setOldImageUrl] = useState(channelStatus?.coverImage);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dashboardService
      .getChannelStats()
      .then((data) => {
        setChannelStatus(data.data);
        setOldImageUrl(data.data?.coverImage);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    dashboardService
      .getChannelVideos({
        limit: 10,
        page: 1,
        sortBy: "createdAt",
      })
      .then((data) => {
        setRecentUploadedVideos(data?.data?.videos);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { message, errors } = error.response.data;
          console.error("Error message:", message);
          console.error("Details:", errors);
          alert(message);
        } else {
          console.error("Unexpected error:", error.message);
        }
      });
  }, []);

  useEffect(() => {
    subscriptionService
      .getChannelSubscribers(userData?._id)
      .then((data) => {
        setRecentSubscribers(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewImagePreview(URL.createObjectURL(file));
      authService.updateCoverImage(file).then((res) => {
        if (res.statusCode === 200) {
          window.location.reload();
        }
      });
    } else {
      setNewImagePreview(null);
    }
  };

  const handleUpload = () => {
    // Logic to upload the new image
    setUploadLoading(true);
    if (newImagePreview) {
      authService
        .updateCoverImage(newImagePreview)
        .then((res) => {
          if (res.statusCode === 200) {
            setUploadLoading(false);
            setIsModalOpen(false);
            dispatch(
              showTimedAlert({
                message: "Cover image updated successfully",
                type: "success",
                duration: 3000,
              })
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className=" flex-1 text-white min-h-screen py-2 rounded-lg m-2 mb-8">
      {/* User Profile Section */}
      <div className="relative ">
        <img
          src={userData?.coverImage || "https://via.placeholder.com/150"}
          alt="Channel Cover"
          className="min-w-screen h-48 w-full object-cover rounded-lg shadow-md"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-2 right-2 text-sm flex justify-center items-center  bg-black py-1 px-2 bg-opacity-50 rounded-lg"
        >
          <EditOutlinedIcon />
          {channelStatus?.coverImage == "" ? "Upload Cover" : "Change Cover"}
        </button>
      </div>

      {/* Modal */}
      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Update Cover Image</h2>
        <div>
          <p className="mb-2 text-gray-500">Current Image:</p>
          {!oldImageUrl && (
            <h2 className="text-gray-500 mb-4">No Previous Image</h2>
          )}
          {oldImageUrl && (
            <img
              src={oldImageUrl}
              alt="Old Cover"
              className="mb-4 w-full h-40 object-cover rounded-md"
            />
          )}
        </div>
        <div>
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

          {newImagePreview && (
            <div className="mb-3">
              <p className="text-gray-500">Preview:</p>
              <img
                src={newImagePreview}
                alt="New Preview"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-24 flex justify-center items-center"
          >
            {uploadLoading ? <img src={spinner} alt="Spinner" /> : "Upload"}
          </button>
        </div>
      </Modal>

      <div className="relative flex items-center flex-col justify-center gap-4">
        <div className="relative -top-16 group w-36 h-36 -mb-16">
          <img
            src={channelStatus?.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-36 h-36 rounded-full border-4 object-cover border-white"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <EditOutlinedIcon />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold ">{channelStatus?.fullName}</h1>
          <h2 className="text-gray-400">{channelStatus?.username}</h2>
          <p className="text-sm text-gray-300"> {channelStatus?.email}</p>
        </div>

        <Link to={`/profile/${userData?.username}`}>
          <Button>Visit your channel</Button>
        </Link>
      </div>

      <div className="mt-8 bg-secondary p-4 rounded-lg">
        <h2 className="text-2xl font-bold">Channel Description</h2>
        <p className="text-gray-300 mt-4">
          Welcome to VisionTube! Here, I share tutorials, tech reviews, and tips
          to help you grow in your tech journey. Subscribe and join the
          community!
        </p>
      </div>

      {/* Analytics Section */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        <Card>
          <h2 className="text-xl font-semibold">Total Views</h2>
          <p className="text-3xl font-bold mt-2">{channelStatus?.totalViews}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Total Likes</h2>
          <p className="text-3xl font-bold mt-2">{channelStatus?.totalLikes}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Recent Subscribers</h2>
          <p className="text-3xl font-bold mt-2">
            {channelStatus?.subscribersCount}
          </p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Total Videos</h2>
          <p className="text-3xl font-bold mt-2">
            {channelStatus?.totalVideos}
          </p>
        </Card>
      </div>

      {/* Recently Uploaded Videos Section */}
      <div className="mt-8  border-t  border-gray-700">
        <h2 className="text-2xl font-bold mt-6">Recently Uploaded Videos</h2>
        <div className="mt-4 w-full gap-6 ">
          {recentUploaedVideos?.length === 0 && (
            <p className="text-2xl text-gray-500 font-thin">
              No videos uploaded yet. Click on ceate button to upload a video
            </p>
          )}
          {recentUploaedVideos?.map((video) => (
            <MyRecentVideos key={video._id} props={video} />
          ))}
        </div>
      </div>

      {/* User Channel Description Section */}

      {/* Recent Subscribers Section */}
      <div className="mt-8 ">
        <h2 className="text-2xl font-bold mt-6">Recent Subscribers</h2>

        {recentSubscribers?.length === 0 ? (
          <p className="text-2xl text-gray-500 font-thin">
            No recent subscribers yet.
          </p>
        ) : (
          <div className=" flex mt-6 mx-3 gap-6 overflow-x-scroll">
            {recentSubscribers?.map((subscriber) => (
              <RecentSubscribers key={subscriber._id} props={subscriber} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
