import api from "../utils/api";

class SubscriptionService {
  // TOGGLE SUBCRIBE

  /**
   * Service to toggle the subscribe state of a channel using Axios.
   * @param {string} channelId - The ID of the channel to toggle the subscribe state.
   * @returns {Promise} - Resolves with the API response.
   * @throws Will throw an error if the toggle subscribe fails.
   * */
  async toggleSubscribe(channelId) {
    try {
      const response = await api.post(
        `/subscriptions/t-subscribe/${channelId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: toggle subscribe:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // GET CHANNEL SUBSCRIBERS

  async getChannelSubscribers(channelId) {
    try {
      const response = await api.get(`/subscriptions/subscribers/${channelId}`);

      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: get channel subscribers:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // GET SUBCRIBED CHANNELS

  async getSubscribedChannels(channelId) {
    try {
      const response = await api.get(
        `/subscriptions/subscribed-channels/${channelId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: get subscribed channels:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
  async getChannelIsSubscribed(channelId) {
    try {
      const response = await api.get(
        `/subscriptions/channel-is-subscribed/${channelId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: get subscribed channels:: ",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
}

const subscriptionService = new SubscriptionService();

export default subscriptionService;
