import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function You() {
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="mt-20 ml-5 ">
      <div className="flex ">
        <img
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-700 mr-5"
          src={userData?.avatar}
          alt="profileImg"
        />
        <div>
          <h1 className="text-4xl ">{userData?.fullName}</h1>
          <p className="text-lg inline-block mr-3">{userData?.username}</p>
          <Link to={`/profile/${userData?.username}`}>
            <span className="text-gray-400">view channel</span>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold my-6">History</h1>
        <p className="text-gray-400">No history found.</p>
      </div>
    </div>
  );
}

export default You;
