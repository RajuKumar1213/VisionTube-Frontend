import axios from "axios";

export class TweetService {
  /**
   * Service to create a tweet using Axios.
   * @param {Object} tweetData - The details of the tweet to be created.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the tweet creation fails.
   */
  async createTweet(tweetData) {
    try {
      const response = await axios.post("/tweets/create-tweet", tweetData);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: creating tweet::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // GET USERS TWEET
  async getTweetById() {
    try {
      const response = await axios.get(`/tweets/user-tweets`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting tweet by id::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // UPDATE TWEET BY ID
  /**
   * Service to update a tweet by its ID using Axios.
   * @param {string} tweetId - The ID of the tweet to update.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the updating tweet by ID fails.
   */
  async updateTweetById(tweetId) {
    try {
      const response = await axios.patch(`/tweets/update-tweet/${tweetId}`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: updating tweet by id::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // DELETE TWEET BY ID

  /**
   * Service to delete a tweet by its ID using Axios.
   * @param {string} tweetId - The ID of the tweet to delete.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the deleting tweet by ID fails.
   */

  async deleteTweetById(tweetId) {
    try {
      const response = await axios.delete(`/tweets/delete-tweet/${tweetId}`);
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: deleting tweet by id::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
}

const tweetService = new TweetService();
export default tweetService;
