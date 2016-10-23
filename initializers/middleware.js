const fs = require('fs'),
      path = require('path');

module.exports = {
  initialize: function(api, next) {
    api.middleware = [];

    if ( ! fs.existsSync(api.projectRoot + path.sep + 'middleware')) {
      fs.mkdirSync(api.projectRoot + path.sep + 'middleware');
    }

    fs.readdir(api.projectRoot + path.sep + 'middleware', (err, files) => {
      files.forEach(file => {
        var middleware = require(api.projectRoot + path.sep + 'middleware' + path.sep + file)(api);

        api.middleware.push(middleware);
        api.actions.addMiddleware(middleware);
      });
    });

    next();
  },

  start: function(api, next){
    next();
  },

  stop: function(api, next){
    next();
  },
};
