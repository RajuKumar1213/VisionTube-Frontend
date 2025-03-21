import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "../services/auth.service";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "../components";
import subscriptionService from "../services/subscription.service";
import PlaylistPage from "./PlaylistPage";
import { useSelector } from "react-redux";

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [channel, setChannel] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [subscriberChange, setSubscriberChange] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  const tabs = [
    { id: "home", label: "Home" },
    { id: "videos", label: "Videos" },
    { id: "playlists", label: "Playlists" },
    { id: "community", label: "Community" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <p>Welcome to the Home tab of this channel!</p>;
      case "videos":
        return <p>Here are the latest videos uploaded by this channel.</p>;
      case "playlists":
        return <PlaylistPage channel={channel} />;
      case "community":
        return <p>Community updates and discussions go here.</p>;
      default:
        return null;
    }
  };

  const { userId } = useParams();

  useEffect(() => {
    if (channel) {
      subscriptionService
        .getChannelIsSubscribed(channel?._id)
        .then((response) => {
          if (response.statusCode === 200) {
            setIsSubscribed(response.data);
          }
        });
    }
  }, [channel]);

  useEffect(() => {
    authService.getChannelProfile(userId).then((response) => {
      if (response.statusCode === 200) {
        setChannel(response.data);
      }
    });
  }, []);

  const toggleSubscribe = () => {
    subscriptionService.toggleSubscribe(channel?._id).then((response) => {
      if (response.statusCode === 200) {
        setIsSubscribed(!isSubscribed);
        setSubscriberChange(!subscriberChange);
      }
    });
  };

  return (
    <div className=" min-h-screen mt-16 ml-2">
      {/* Channel Banner */}
      <div className="relative ">
        <div className="h-44">
          <img
            className="w-full h-44 object-cover rounded-lg"
            src={channel?.coverImage || "https://via.placeholder.com/150"}
            alt=""
          />
        </div>
        <div className="mt-4">
          <div className="flex  space-x-4">
            <img
              src={channel?.avatar || "https://via.placeholder.com/150"}
              alt="Channel Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">
                {channel?.fullName}{" "}
                <CheckCircleIcon
                  className="text-gray-200 ml-1"
                  style={{ fontSize: "15px" }}
                />
              </h1>

              <p className="flex gap-x-2 items-center text-gray-400 mt-1">
                <span className="text-gray-200">{channel?.username} •</span>
                <span>{channel?.totalVideos} videos •</span>
                <span>{channel?.subscribersCount} Subscribers •</span>
                <span>{channel?.subscribedToCount} Subscribing </span>
              </p>
              {/* writing about the channel TODO: */}
              <div>
                <span className=" inline text-sm text-gray-500 mt-1 line-clamp-1 max-w-xl">
                  {`This is a very fantastic channel for you to watch new videos
                that is related to your interest Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Accusamus corrupti, et a illo,
                dignissimos eaque repudiandae aliquid voluptatum, odio quam
                tempore sapiente? Officia.`.substring(0, 150) + "..."}
                </span>
                <button className="inline">more</button>
              </div>
              {userData?.username !== channel?.username && (
                <Button
                  hover={`${isSubscribed ? "bg-gray-700" : "bg-red-700"}`}
                  onClick={toggleSubscribe}
                  className={`mt-4 ${
                    isSubscribed
                      ? "bg-gray-500 text-white"
                      : "bg-red-600 text-white"
                  }   font-semibold `}
                >
                  {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-b bg-slate-950 border-gray-600 shadow-md sticky top-14 z-10">
        <div className="container mx-auto flex space-x-8 px-6 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              } pb-2 text-lg font-medium`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-4">{renderContent()}</div>
    </div>
  );
}

export default UserProfilePage;
