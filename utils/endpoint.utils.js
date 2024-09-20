const convertEndpoint = (endpointUrl) => {
  // make sure the endpoint starts and end with a '/'

  if (!endpointUrl.startsWith("/")) {
    endpointUrl = "/" + endpointUrl;
  }
  if (!endpointUrl.endsWith("/")) {
    endpointUrl = endpointUrl + "/";
  }
  return endpointUrl;
};

module.exports = { convertEndpoint };
