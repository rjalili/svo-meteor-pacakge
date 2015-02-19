Package.describe({
  name: 'appmill:svo',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Subject-Verb-Object database and query API',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/rjalili/svo-meteor-package.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null //'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use("meteor");
  api.use("mongo-livedata");
  api.use("check");
  api.use("matb33:collection-hooks@0.7.6");
  api.use('iron:router@1.0.7');
  // Give users of this package access to the Templating package.
  api.imply('templating')
  // Export the object 'Email' to packages or apps that use this package.
  //api.export('SVOAPI', 'server');
  // Specify the source code for the package.

  api.addFiles('appmill:svo-both.js');
  api.addFiles('appmill:svo-server.js',"server");
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('appmill:svo');
  api.addFiles('appmill:svo-tests.js');
});
/*
Npm.depends({"iron:router":"1.0.7",
             "meteor-platform":"1.2.1",
             "underscore":"1.0.2"});
*/