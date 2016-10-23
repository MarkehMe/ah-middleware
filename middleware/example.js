module.exports = function(api) {
  return {
    name: 'authentication Middleware',
    global: true,
    preProcessor: function(data, next) {
      if (data.actionTemplate.authenticated === true) {
        api.users.authenticate(data.params.userName, data.params.password, function(error, match) {
          if (match === true) {
            next();
          } else {
            error = new Error("Authentication Failed.  userName and password required");
            next(error);
          }
        });
      } else {
        next();
      }
    }
  };
};
