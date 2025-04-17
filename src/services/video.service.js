import { setProgress } from "../redux/features/progressSlice";
import api from "../utils/api";

export class VideoService {
  /**
   * Service to upload a video using Axios.
   * @param {Object} videoData - Video details to be uploaded.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the upload fails.
   */

  async uploadVideo(data, setProgress) {
    const formData = new FormData();

    // Append avatar file
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);

    // Append other fields
    Object.keys(data).forEach((key) => {
      if (key !== "thumbnail" && key !== "videoFile") {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await api.post("/videos/upload-video", formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            if (setProgress) setProgress(percentCompleted);
          }
        },
      });

      return response.data;
    } catch (error) {
      if (setProgress) setProgress(0);
      console.error(
        "ERROR :: creating user::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  //GET ALL VIDEOS ACCORDING TO QUERIES

  /**
   * Service to get all videos according to queries using Axios.
   * @param {Object} queries - Query parameters to filter the videos.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the get videos fails.
   */
  async getAllVideos(queries) {
    try {
      const response = await api.get("/videos", {
        params: queries,
      });

      // Normalize response structure
      // const raw = response.data;

      // const data = raw?.data ?? raw; // <-- handle both wrapped and unwrapped
      // const hasMore = raw?.hasMore ?? raw?.data?.hasMore ?? false;
      // const lastVideoId = raw?.lastVideoId ?? raw?.data?.lastVideoId ?? null;

      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting all videos::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // GET VIDEO BY ID

  /**
   * Service to get a video by ID using Axios.
   * @param {string} videoId - The ID of the video to retrieve.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the get video by ID fails.
   * */

  async getVideoById(videoId) {
    try {
      const response = await api.get(`/videos/${videoId}`);

      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting video by id::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // UPDATE VIDEO

  /**
   * Service to update a video using Axios.
   * @param {Object} videoData - The updated video details.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the update video fails.
   */
  async updateVideo(videoId, videoData) {
    try {
      const response = await api.patch(`/videos/update/${videoId}`, videoData);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: updating video::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // UPDATE THUMBNAIL

  /**
   * Service to update the thumbnail of a video using Axios.
   * @param {Object} videoData - The updated thumbnail details.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the update thumbnail fails.
   */
  async updateThumbnail(vidoeId, thumbnail) {
    try {
      const response = await api.patch(
        `/videos/update-thumbnail/${vidoeId}`,
        thumbnail
      );
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: updating thumbnail::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // DELETE VIDEO

  /**
   * Service to delete a video using Axios.
   * @param {string} videoId - The ID of the video to delete.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the delete video fails.
   * */
  async deleteVideo(videoId) {
    try {
      const response = await api.delete(`/videos/delete/${videoId}`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: deleting video:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // TOGGLE PUBLISH STATE

  /**
   * Service to toggle the publish state of a video using Axios.
   * @param {string} videoId - The ID of the video to toggle the publish state.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the toggle publish state fails.
   */
  async togglePublishState(videoId) {
    try {
      const response = await api.patch(`/videos/toggle-publish/${videoId}`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: toggling publish state:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // INCREMENT VIEWS COUNT

  /**
   * Service to increment the views count of a video using Axios.
   * @param {string} videoId - The ID of the video to increment the views count.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the increment views count fails.
   */
  async incrementViewsCount(videoId) {
    try {
      const response = await api.patch(`/videos/${videoId}/views`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: incrementing views count:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  async getAllVideosOfChannel(channelId, queries) {
    try {
      const response = await api.get(`/videos/my-videos/${channelId}`, {
        params: queries,
      });
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting all videos of channel:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
}

const videoService = new VideoService();

export default videoService;
