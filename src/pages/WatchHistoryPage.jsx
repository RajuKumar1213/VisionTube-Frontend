import React, { useEffect, useState } from "react";
import { VideoCard } from "../components";
import authService from "../services/auth.service";
import Spinner from "../components/Spinner";

function WatchHistoryPage() {
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    authService
      .getWatchHistory()
      .then((res) => {
        if (res.statusCode === 200) {
          setVideo(res.data);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, [authService]);

  return (
    <div className="mt-20 min-h-fit">
      <h1 className="text-xl md:text-2xl font-bold mb-6 m-8">Watch History</h1>

      {loading ? (
        <Spinner />
      ) : video?.length === 0 ? (
        <h1 className="text-center text-gray-500 pt-20 text-2xl font-thin">
          No watch history found, Start watching videos to make a beatiful watch
          history.
        </h1>
      ) : (
        video.map((video) => (
          <VideoCard
            key={video._id}
            props={video}
            className="md:h-48 h-24 min-w-36 md:min-w-80 "
            flexcol="flex"
            hidden="hidden"
          />
        ))
      )}
    </div>
  );
}

export default WatchHistoryPage;
