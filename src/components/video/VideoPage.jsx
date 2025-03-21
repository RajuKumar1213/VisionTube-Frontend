import React, { useEffect, useState } from "react";
import { Comment, Button } from "../../components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import SortIcon from "@mui/icons-material/Sort";
import ShareIcon from "@mui/icons-material/Share";
import { Link, useParams } from "react-router-dom";
import videoService from "../../services/video.service";
import { format } from "timeago.js";
import subscriptionService from "../../services/subscription.service";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../redux/features/progressSlice";
import { useForm } from "react-hook-form";
import commentService from "../../services/comment.service";
import likeService from "../../services/like.service";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import CancelScheduleSendOutlinedIcon from "@mui/icons-material/CancelScheduleSendOutlined";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import { showTimedAlert } from "../../redux/features/alertSlice";
import extractErrorMessage from "../../utils/extractErrorMessage";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SmallSpinner from "../SmallSpinner";

const VideoPage = () => {
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [content, setContent] = useState("");
  const [commentId, setCommentId] = useState("");

  const { handleSubmit, register, reset, setValue, getValues, watch } =
    useForm();
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const userStatus = useSelector((state) => state.auth.status);
  const [comments, setComment] = useState(null);
  const [commentChange, setCommentChange] = useState(false);
  const [subscriberChange, setSubscriberChange] = useState(false);
  const [likeChange, setLikeChange] = useState(false);
  const [likeCommentChange, setLikeCommentChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoLikeLoading, setVideoLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    dispatch(setProgress(70));
    dispatch(setProgress(100));
    videoService.getVideoById(videoId, dispatch).then((response) => {
      setVideo(response.data);
    });
  }, [videoService, dispatch, subscriberChange, likeChange]);

  useEffect(() => {
    // getching all commments
    if (video) {
      commentService.getCommentsOfVideo(video._id).then((response) => {
        if (response.statusCode === 200) {
          setComment(response.data);
        }
      });
    }
  }, [video, commentService, commentChange, likeCommentChange]);

  useEffect(() => {
    if (video) {
      subscriptionService
        .getChannelIsSubscribed(video?.owner?._id)
        .then((response) => {
          if (response.statusCode === 200) {
            setIsSubscribed(response.data);
          }
        });
    }
  }, [subscriberChange, video]);

  // like a video
  const handleLikeVideo = () => {
    if (video) {
      setVideoLikeLoading(true);
      likeService.likeVideo(video._id).then((response) => {
        if (response.statusCode === 200) {
          setLikeChange(!likeChange);
          setVideoLikeLoading(false);
        }
      });
    }
  };

  // like a comment.

  const toggleSubscribe = () => {
    if (userData) {
      setLoading(true);
      subscriptionService
        .toggleSubscribe(video?.owner?._id)
        .then((response) => {
          if (response.statusCode === 200) {
            setIsSubscribed(!isSubscribed);
            setSubscriberChange(!subscriberChange);
            setLoading(false);
          }
        });
    } else {
      dispatch(
        showTimedAlert({
          message: "Please login to subscribe",
          duration: 3000,
        })
      );
    }
  };

  const handleComment = (data) => {
    setCommentLoading(true);
    commentService
      .createComment(video?._id, data)
      .then((response) => {
        if (response.statusCode === 201) {
          dispatch(
            showTimedAlert({
              message: "Comment added successfully",
              type: "success",
            })
          );
          setCommentLoading(false);
          setCommentChange(!commentChange);
          reset();
        }
      })
      .catch((error) => {
        dispatch(
          showTimedAlert({
            message: extractErrorMessage(error),
            type: "error",
            duration: 5000,
          })
        );
      });
  };

  setValue("content", content);

  const handleEditComment = () => {
    const newContent = getValues("content");
    setCommentLoading(true);
    commentService
      .updateComment(commentId, { content: newContent, videoId: video?._id })
      .then((response) => {
        if (response.statusCode === 200) {
          dispatch(
            showTimedAlert({
              message: "Comment updated successfully",
              type: "success",
            })
          );
          setCommentLoading(false);
          setContent("");
          setCommentChange(!commentChange);
        }
      })
      .catch((error) => {
        dispatch(
          showTimedAlert({
            message: extractErrorMessage(error),
            type: "error",
            duration: 5000,
          })
        );
      });
  };

  return (
    <div className="min-h-screen md:p-4">
      {/* Video Section */}
      <div className="mx-auto md:rounded-lg shadow-md overflow-hidden">
        {/* Video Player */}
        <div className="w-full z-[19] aspect-video mr-4 h-fit bg-black fixed md:relative">
          <video
            src={video?.videoFile}
            controls
            autoPlay
            className="w-full h-full md:rounded-lg "
          ></video>
        </div>
        {/* Video Info Section */}
        <div className="p-4 mt-56 md:mt-0">
          <h1 className="text-lg md:text-xl font-semibold ">{video?.title}</h1>
          <p className="text-gray-500 text-xs md:text-sm mb-4">
            {video?.views} views • <span>{format(video?.createdAt)}</span>
          </p>

          <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
            {/* Left: Channel Info */}
            <div className="flex w-full md:w-auto items-center justify-between md:justify-normal">
              <div className="flex items-center space-x-2 ">
                <Link to={`/profile/${video?.owner?.username}`}>
                  <img
                    src={video?.owner?.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </Link>
                <div>
                  <h3 className="text-sm md:text-base font-medium line-clamp-1 ">
                    {video?.owner?.fullName}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {video?.owner?.subscriberCount} Subscribers
                  </p>
                </div>
              </div>

              <Button
                hover={`${isSubscribed ? "bg-gray-700" : "bg-red-700"}`}
                onClick={toggleSubscribe}
                py={2}
                className={`ml-6 min-w-28  md:text-sm ${
                  isSubscribed
                    ? "bg-gray-500 text-white"
                    : "bg-red-600 text-white"
                }   font-semibold `}
              >
                {loading ? (
                  <SmallSpinner />
                ) : isSubscribed ? (
                  "Subscribed"
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {/* Right: Interaction Buttons */}
            <div className="flex md:items-center items-start my-4 rounded-r-none md:ml-6 ">
              <Button
                onClick={handleLikeVideo}
                className="flex text-sm items-center rounded-r-lg m-0"
                py={1}
              >
                {videoLikeLoading ? (
                  <SmallSpinner h={6} />
                ) : !likeChange ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpAltOutlinedIcon />
                )}
                <span className="ml-1">{video?.totalLikes}</span>
              </Button>
              <Button className="flex items-center rounded-l-lg m-0" py={1}>
                <ThumbDownAltOutlinedIcon />
                <span className="ml-1"></span>
              </Button>

              <Button className="ml-4 flex items-center" py={1}>
                Share <ShareIcon />
              </Button>
            </div>
          </div>
        </div>
        {/* bg-[#272727]  bg for description*/}
        {/* Description Section */}
        <div className="bg-secondary p-4 rounded-xl text-gray-200">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className=" mt-2 text-gray-400">{video?.description}</p>
        </div>
        {/* Comments Section */}
        <div className="pt-6 px-4">
          <div className="flex items-center space-x-10 pb-4 mb-4">
            <h3 className="text-base md:text-xl font-semibold ">{} Comments</h3>
            <Button>
              <SortIcon />
              Sort by
            </Button>
          </div>

          <div className="relative flex items-center space-x-4 pb-8">
            <img
              src={
                userData?.avatar ||
                "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <form
              className="w-full  gap-x-2"
              onSubmit={handleSubmit(handleComment)}
            >
              <textarea
                type="text"
                placeholder="Add a comment..."
                className=" w-full bg-none border-b bg-transparent outline-none  relative bottom-3 text-gray-100"
                {...register("content", { required: true })}
              ></textarea>
              <div className="flex justify-between gap-x-2">
                <EmojiEmotionsOutlinedIcon style={{ color: "gold" }} />
                <div className="flex items-center">
                  <Button
                    disabled={!userStatus}
                    onClick={() => {
                      reset();
                      setContent("");
                    }}
                    className="mr-2"
                    py={1}
                  >
                    <span className="flex items-center text-sm gap-x-2">
                      <CancelScheduleSendOutlinedIcon
                        style={{ color: "red", height: "20px" }}
                      />
                      Cancel
                    </span>{" "}
                  </Button>
                  {content ? (
                    <Button
                      disabled={!userStatus}
                      py={1}
                      onClick={handleEditComment}
                    >
                      <span className="flex items-center text-sm gap-x-2">
                        <BrowserUpdatedIcon
                          style={{ color: "green", height: "20px" }}
                        />
                        {commentLoading ? <SmallSpinner /> : "Update"}
                      </span>{" "}
                    </Button>
                  ) : (
                    <Button disabled={!userStatus} py={1} type="submit">
                      <span className="flex items-center text-sm gap-x-2 ">
                        <AddCommentOutlinedIcon
                          style={{ color: "green", height: "20px" }}
                        />
                        {commentLoading ? <SmallSpinner /> : "Comment"}
                      </span>{" "}
                    </Button>
                  )}
                </div>
              </div>
              {/* {showEmojiPicker && (
                <div className="absolute min-h-32  bottom-0 right-2 bg-secondary shadow-lg z-10">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    style={{ height: "500px" }}
                  />
                </div>
              )} */}
            </form>
          </div>

          {/* Comment here  */}

          <div className="mb-20">
            {comments?.length === 0 && (
              <h1 className="text-2xl p-4 text-gray-600 font-thin">
                No any comments yet, be the first one to comment.
              </h1>
            )}

            {comments?.length >= 0 && userStatus ? (
              comments?.map((comment) => (
                <Comment
                  key={comment._id}
                  props={comment}
                  video={video}
                  userData={userData}
                  setComment={setComment}
                  setContent={setContent}
                  setCommentId={setCommentId}
                  setLikeCommentChange={setLikeCommentChange}
                  likeCommentChange={likeCommentChange}
                />
              ))
            ) : (
              <h1 className="text-2xl p-4 text-gray-600 font-thin">
                {userStatus
                  ? "No any comments yet, be the first one to comment."
                  : "Please login to see comments."}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
