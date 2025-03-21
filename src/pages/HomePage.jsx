import React, { useEffect, useState } from "react";
import { VideoCard } from "../components";
import videoService from "../services/video.service";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function HomePage() {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVideoId, setLastVideoId] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  // Initial fetch
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setVideos([]);
    setLastVideoId(null);
    setHasMore(true);

    videoService
      .getAllVideos({
        limit: 10,
        lastVideoId: null,
        sortType: "desc",
        sortBy: "views",
        query,
      })
      .then((response) => {
        console.log("Initial Fetch Response:", response?.data); // Debugging API response

        if (response?.data?.data?.length > 0) {
          setVideos(response.data.data);
          setHasMore(response?.data?.hasMore);
          setLastVideoId(response?.data?.lastVideoId);
        } else {
          console.warn("No videos in response, state not updated");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, [query]);

  // Fetch more data
  const fetchMoreData = async () => {
    if (!hasMore || !lastVideoId || loadingMore) return;

    setLoadingMore(true);

    videoService
      .getAllVideos({
        limit: 10,
        lastVideoId,
        sortType: "desc",
        sortBy: "views",
        query,
      })
      .then((response) => {
        setError(""); // Clear any previous errors
        if (response?.data?.data?.length > 0) {
          setVideos((prevVideos) => [...prevVideos, ...response.data.data]);
          setLastVideoId(response?.data?.lastVideoId);
          setHasMore(response?.data?.hasMore);
        } else {
          console.warn("No videos in response, state not updated");
        }
      })
      .catch((err) => {
        console.error("Error fetching more videos:", err);
        setError(err.message || "Something went wrong");
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    console.log("Videos updated:", videos);
  }, [videos]);

  console.log("checking the data of video", videos);

  return (
    <div>
      {error && (
        <h1 className="text-center pt-20 text-2xl">
          {error} . Server is not running.
        </h1>
      )}
      <div>
        {loading ? (
          <Spinner className="mt-24" h={12} />
        ) : videos?.length === 0 ? (
          <h1 className="text-center text-2xl font-thin text-gray-500 mt-20 p-2">
            {query
              ? `No results found for "${query}". Try searching for something else.`
              : "No videos found. There is some problem occurred."}
          </h1>
        ) : (
          <InfiniteScroll
            dataLength={videos?.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spinner />}
            endMessage={
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <b>Yay! You have seen it all</b>
              </div>
            }
          >
            <div className="md:pt-20 pt-14 pb-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {videos.map((video) => (
                <VideoCard
                  key={video._id}
                  props={video}
                  className="h-56 md:h-52 w-full"
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}

export default HomePage;
