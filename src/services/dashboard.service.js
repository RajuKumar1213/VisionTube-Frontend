import axios from "axios";
import api from "../utils/api";

export class DashboardService {
  /**
   * Fetches channel statistics for the user's dashboard.
   * @returns {Promise} - Resolves with the dashboard data.
   * @throws Will throw an error if the request fails.
   */

  async getChannelStats() {
    try {
      const response = await api.get("/dashboard/my-dashboard");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: getting dashboard data::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }

  // GET CHANNEL VIDEOS
  async getChannelVideos(queries) {
    try {
      const response = await api.get("/dashboard/my-videos", {
        params: queries,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
