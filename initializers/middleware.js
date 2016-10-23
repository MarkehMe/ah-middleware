const fs = require('fs');

module.exports = {
  initialize: function(api, next){
    api.middleware = [];
    
    fs.readdir('middleware', (err, files) => {
      console.log(files);

      files.forEach(file => {
        var middleware = require("../middleware/" + file)(api);

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
