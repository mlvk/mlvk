module.exports = function() {
  return {
    clientAllowedKeys: [
      'JWPLAYER_KEY'
    ],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false,
  };
};
