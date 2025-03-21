import React from "react";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component"; // Import from the library

function CustomInfiniteScroll({
  dataLength,
  children,
  hasMore,
  fetchMoreData,
}) {
  return (
    <InfiniteScroll // Use the library's InfiniteScroll component
      dataLength={dataLength}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Spinner />}
      scrollThreshold={0.4}
      endMessage={
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <b>Yay! You have seen it all</b>
        </div>
      }
    >
      {children}
    </InfiniteScroll>
  );
}

export default CustomInfiniteScroll;
