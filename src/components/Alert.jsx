import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../redux/features/alertSlice";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.alert);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed md:top-16 bottom-4 md:bottom-auto z-50 md:right-[-290px] right-[-300px] p-4 rounded-l-lg rounded-r-sm shadow-md transition-transform duration-500 ease-in-out transform border-l-8 
        ${isVisible ? "translate-x-[-300px]" : "translate-x-0"}
        ${
          type === "success"
            ? "bg-green-500 text-white border-green-800 "
            : type === "error"
            ? "bg-red-500 text-white border-red-800"
            : "bg-orange-500 text-white border-orange-800"
        }`}
      style={{ width: "350px" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{message}</span>
        <button
          onClick={() => dispatch(hideAlert())}
          className="ml-4 text-white font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
