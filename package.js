Package.describe({
  summary: "Better OAuth 1 for API's - solves an issue with other (content, data) options being cut off.",
  version: "1.0.1",
  git: "https://github.com/timbrandin/meteor-oauth1-for-apis"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.use('http', 'server');
  api.use('oauth1', 'server');

  api.export('OAuth1Binding', 'server');
  api.export('OAuth1Test', 'server', {testOnly: true});

  api.addFiles('timbrandin:oauth1-for-apis.js', 'server');
});
