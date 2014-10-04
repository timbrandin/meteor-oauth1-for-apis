var urlModule = Npm.require("url");

OAuth1Binding.prototype._call = function(method, url, headers, options, callback) {
  var self = this;

  // all URLs to be functions to support parameters/customization
  if(typeof url === "function") {
    url = url(self);
  }

  headers = headers || {};
  options = options || {};

  // Make sure we don't cut off content or data, it is used by HTTP methods POST, PUT and DELETE.
  // Support params (by itself) being passed for options.
  if (_.intersection(_.keys(options), ['content', 'data', 'params']).length == 0) {
    options.params = options;
  }

  // Extract all query string parameters from the provided URL
  var parsedUrl = urlModule.parse(url, true);
  // Merge them in a way that params given to the method call have precedence
  options.params = _.extend({}, parsedUrl.query, options.params);

  // Reconstruct the URL back without any query string parameters
  // (they are now in params)
  parsedUrl.query = {};
  parsedUrl.search = '';
  url = urlModule.format(parsedUrl);

  // Get the signature
  headers.oauth_signature =
    self._getSignature(method, url, headers, self.accessTokenSecret, options.params);

  // Make a authorization string according to oauth1 spec
  var authString = self._getAuthHeaderString(headers);

  // Set the auth string for the headers.
  options.headers = {
    Authorization: authString
  };

  // Make signed request
  try {
    var response = HTTP.call(method, url, options, callback && function (error, response) {
      if (! error) {
        response.nonce = headers.oauth_nonce;
      }
      callback(error, response);
    });
    // We store nonce so that JWTs can be validated
    if (response)
      response.nonce = headers.oauth_nonce;
    return response;
  } catch (err) {
    throw _.extend(new Error("Failed to send OAuth1 request to " + url + ". " + err.message),
                   {response: err.response});
  }
};
