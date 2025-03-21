import React from "react";
import { VideoCard } from "../components";
import videoService from "../services/video.service";

function ChannelHomePage({ channelId }) {
  videoService.getAllVideosOfChannel();
  return (
    <div>
      <h1>For You.</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <VideoCard className="md:h-48 h-24 min-w-36 md:min-w-80 " />
      </div>
    </div>
  );
}

export default ChannelHomePage;
