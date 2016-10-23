const fs = require('fs');

module.exports = {
  initialize: function(api, next) {
    api.middleware = [];

    if ( ! fs.existsSync('middleware')) {
      fs.mkdirSync(dir);
    }

    fs.readdir('middleware', (err, files) => {
      files.forEach(file => {
        var middleware = require('../middleware/' + file)(api);

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
