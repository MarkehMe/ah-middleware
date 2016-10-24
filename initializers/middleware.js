const fs = require('fs'),
      path = require('path');

module.exports = {
  initialize: function(api, next) {
    api.middleware = [];

    var middlewareDir = api.projectRoot + path.sep + 'middleware';

    if ( ! fs.existsSync(middlewareDir)) {
      fs.mkdirSync(middlewareDir);
    }

    fs.readdir(middlewareDir, (err, files) => {
      files.forEach(file => {
        try {
          var currentMiddlewarePath = middlewareDir + path.sep + file;

          var middleware = require(currentMiddlewarePath)(api);

          api.middleware.push(middleware);
          api.actions.addMiddleware(middleware);
        } catch(e) {
          var error = new Error('Failed to add middleware ' + file + '.  ' + e.message);

          next(error);
          return;
        }
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
