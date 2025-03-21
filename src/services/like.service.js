import api from "../utils/api";

export class LikeService {
  // LIKE A VIDEO
  /**
   * Service to like a video using Axios.
   * @param {string} videoId - The ID of the video to like.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the liking video fails.
   * */

  async likeVideo(videoId) {
    try {
      const response = await api.patch(`/likes/like-video/${videoId}`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: liking video::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // LIKE A COMMENT
  /**
   * Service to like a comment using Axios.
   * @param {string} commentId - The ID of the comment to like.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the liking comment fails.
   * */
  async likeComment(commentId) {
    try {
      const response = await api.patch(`/likes/like-comment/${commentId}`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: liking comment::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // LIKE A TWEET
  /**
   * Service to like a tweet using Axios.
   * @param {string} tweetId - The ID of the tweet to like.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the liking tweet fails.
   * */
  async likeTweet(tweetId) {
    try {
      const response = await api.patch(`/likes/like-tweet/${tweetId}`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: liking tweet::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  //  GET ALL LIKED VIDEOS
  /**
   * Service to get all liked videos using Axios.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the getting all liked videos fails.
   * */

  async getAllLikedVideos() {
    try {
      const response = await api.get(`/likes/all-videos`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting all liked videos::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
}

const likeService = new LikeService();

export default likeService;
