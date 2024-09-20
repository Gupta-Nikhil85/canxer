const axios = require('axios');

  /**
   * @param {Object} requestConfig - The configuration for the API call
   * @param {string} requestConfig.requestMethod - The HTTP method to use
   * @param {string} requestConfig.url - The URL to call
   * @param {Object} [requestConfig.headers] - The headers to send
   * @param {Object} [requestConfig.body] - The body to send
   * @param {Object} [requestConfig.queryParams] - The query parameters to send
   * @param {number} [requestConfig.timeout] - The timeout for the request
   * @param {number} [requestConfig.retryCount] - The number of times to retry the request
   * @returns {Promise<Object>} The response from the API call
   * @description Execute an API call based on the request configuration
   * @example
   * const requestConfig = {
   *  requestMethod: 'GET',
   * url: 'https://jsonplaceholder.typicode.com/posts/1',
   * headers: {
   * 'Content-Type': 'application/json'
   * },
   * body: {},
   * queryParams: {},
   * timeout: 5000,
   * retryCount: 3
   * };
   * const response = await executeApicall(requestConfig);
   * console.log(response.data);
   * @throws {Error} When an error occurs
   */

const executeApiCall = async( requestConfig ) => {
    // Handle Optional Parameters
    const { requestMethod, url, headers, body, queryParams, timeout, retryCount } = requestConfig;

    // Set default values for optional parameters
    const headersToSend = headers || {};
    const bodyToSend = body || {};
    const queryParamsToSend = queryParams || {};
    const timeoutToSend = timeout || 5000;
    const retryCountToSend = retryCount || 0;
    // Execute the API call
    try {
      const response = await axios({
        method: requestMethod,
        url,
        headers: headersToSend,
        data: bodyToSend,
        params: queryParamsToSend,
        timeout: timeoutToSend
      });
      return response;
    } catch (error) {
      if (retryCountToSend > 0) {
        // Retry the request
        return executeApiCall({
          requestMethod,
          url,
          headers: headersToSend,
          body: bodyToSend,
          queryParams: queryParamsToSend,
          timeout: timeoutToSend,
          retryCount: retryCountToSend - 1
        });
      }
      throw new Error(`API call failed: ${error.message}`);
    }
}

module.exports = { executeApiCall };