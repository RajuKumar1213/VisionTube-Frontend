import React, { useEffect, useState } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import commentService from "../services/comment.service";
import likeService from "../services/like.service";
import { useDispatch } from "react-redux";
import { showTimedAlert } from "../redux/features/alertSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import spinner from "/spinner.svg";

function Comment({
  props,
  userData,
  video,
  setComment,
  setCommentId,
  setContent,
  setLikeCommentChange,
  likeCommentChange,
}) {
  const dispatch = useDispatch();
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentLikeLoading, setCommentLikeLoading] = useState(false);

  // Function to toggle menu visibility
  const handleMenuToggle = (commentId) => {
    setActiveCommentId((prev) => (prev === commentId ? null : commentId));
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-box")) {
        setActiveCommentId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCommentLike = () => {
    if (props) {
      setCommentLikeLoading(true);
      likeService.likeComment(props._id).then((response) => {
        if (response.statusCode === 200) {
          setLikeCommentChange(!likeCommentChange);
          setCommentLikeLoading(false);
        }
      });
    }
  };

  return (
    <div
      className={`mb-3 p-2 rounded-lg ${
        userData?._id == video?.owner?._id
          ? "bg-yellow-950  border-l-4 border-yellow-500 shadow-md"
          : ""
      }`}
    >
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          {userData?._id == video?.owner?._id && (
            <span className="text-sm font-semibold text-yellow-600 mr-2">
              Creator
            </span>
          )}
          <div className="space-y-4">
            {/* Comment */}
            <div className="flex items-center justify-between w-full flex-wrap ">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    props?.owner?.avatar || "https://via.placeholder.com/150"
                  }
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="w-full min-w-72">
                  <h4 className="text-sm text-gray-500">
                    {props?.owner?.username}
                  </h4>
                  <p className="text-gray-200  ">{props?.content}</p>
                  <div className="flex mt-2">
                    <span
                      onClick={handleCommentLike}
                      className=" flex items-center space-x-2 mr-4 text-xs cursor-pointer"
                    >
                      {commentLikeLoading ? (
                        <img
                          className="w-5 h-5"
                          src={spinner}
                          alt="loading..."
                        />
                      ) : (
                        <ThumbUpAltOutlinedIcon style={{ fontSize: "20px" }} />
                      )}
                      <span> {props?.totalCommentLikes}</span>
                    </span>
                    <span className="text-xs cursor-pointer">
                      <ThumbDownAltOutlinedIcon style={{ fontSize: "20px" }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {userData?._id === props.owner?._id && (
          <div className="text-xs text-gray-400 ">
            <MoreVertOutlinedIcon
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event from bubbling up
                handleMenuToggle(props?._id);
              }}
            />
          </div>
        )}

        {activeCommentId === props?._id && (
          <div className="menu-box absolute top-8 right-0 bg-gray-800 text-white p-2 rounded-md shadow-lg z-40">
            <ul className="">
              <li
                className="cursor-pointer rounded-md hover:bg-gray-700 px-4 py-2 flex items-start gap-x-2"
                onClick={() => {
                  setCommentId(props?._id);
                  setContent(props?.content);
                  setActiveCommentId(null);
                }}
              >
                <EditOutlinedIcon /> <span>Edit</span>
              </li>
              <li
                className="cursor-pointer rounded-md hover:bg-gray-700 px-4 py-2 flex items-start gap-x-2 "
                onClick={() => {
                  commentService.deleteComment(props?._id).then((res) => {
                    if (res.statusCode === 200) {
                      dispatch(
                        showTimedAlert({
                          message: "Comment deleted successfully",
                          type: "success",
                        })
                      );
                      setComment((prev) =>
                        prev.filter((comment) => comment._id !== props?._id)
                      );
                    }
                  });
                  setActiveCommentId(null); // Close menu after action
                }}
              >
                <DeleteForeverOutlinedIcon style={{ color: "red" }} />{" "}
                <span>Delete</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
