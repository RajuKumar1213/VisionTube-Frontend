import React, { useEffect, useState, useRef } from "react";
import { VideoCard, VideoPage } from "../components";
import videoService from "../services/video.service";
import Spinner from "../components/Spinner";
import CustomInfiniteScroll from "../components/CustomInfiniteScroll"; // Use the fixed component

function VideoWatchPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastVideoId, setLastVideoId] = useState(null);
  const [error, setError] = useState(null);
  const seenVideos = useRef(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setVideos([]);
    setLastVideoId(null);
    seenVideos.current = new Set();

    videoService
      .getAllVideos({
        limit: 10,
        lastVideoId: null,
        sortType: "desc",
        sortBy: "views",
      })
      .then((response) => {
        const newVideos = response?.data?.videos || [];
        setVideos(newVideos);
        setHasMore(response?.data?.hasMore);
        setLastVideoId(response?.data?.lastVideoId);
        setLoading(false);

        newVideos.forEach((video) => seenVideos.current.add(video._id));
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  const fetchMoreData = async () => {
    if (!hasMore || !lastVideoId) return;

    try {
      const response = await videoService.getAllVideos({
        limit: 8,
        lastVideoId,
        sortType: "desc",
        sortBy: "views",
      });

      const newVideos = response?.data?.videos || [];

      const uniqueVideos = newVideos.filter((video) => {
        if (seenVideos.current.has(video._id)) return false;
        seenVideos.current.add(video._id);
        return true;
      });

      setVideos((prevVideos) => [...prevVideos, ...uniqueVideos]);
      setLastVideoId(response?.data?.lastVideoId);
      setHasMore(response?.data?.hasMore);
    } catch (err) {
      console.error("Error fetching more videos:", err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="md:mt-16 mt-10 grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* Left Section - VideoPage */}
      <div className="md:col-span-7">
        <VideoPage />
      </div>

      {/* Right Section - Related Videos */}
      <div className="md:col-span-5">
        <h1 className="mt-2 text-xl md:text-2xl font-semibold">
          Watch more related videos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mt-2 mb-16 ">
          {loading ? (
            <Spinner />
          ) : (
            <CustomInfiniteScroll // Use the fixed component
              dataLength={videos?.length}
              hasMore={hasMore}
              fetchMoreData={fetchMoreData}
            >
              {videos.map((video) => (
                <div
                  onClick={() => (window.location.href = `/watch/${video._id}`)}
                  key={video._id}
                >
                  <VideoCard
                    className={
                      "h-24 md:h-28 md:min-w-48 md:max-w-48 min-w-40 max-w-40"
                    }
                    flexcol="flex flex-row"
                    hidden="hidden"
                    props={video}
                  />
                </div>
              ))}
            </CustomInfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoWatchPage;
