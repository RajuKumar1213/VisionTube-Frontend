import axios from "axios";

export class HealthCheck {
  /**
   * Service to check the health of the system using Axios.
   * @returns {Promise} - Resolves with the API response indicating the health status.
   * @throws Will throw an error if the health check fails.
   */

  async checkHealth() {
    try {
      const response = await axios.get("/health/health-check");
      return response.data;
    } catch (error) {
      console.error(
        "ERROR :: checking health::",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
}

const healthCheck = new HealthCheck();
export default healthCheck;
