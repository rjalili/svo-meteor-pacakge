Package.describe({
  name: 'appmill:svo',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Subject-Verb-Object database and query API',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rjalili/svo-meteor-package.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('appmill:svo.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('appmill:svo');
  api.addFiles('appmill:svo-tests.js');
});
