define([], function() {
  var exports, service;
  service = (function() {
    function service() {
      var preference;
      service.__super__.constructor.apply(this, arguments);
      if (!this.$rootScope.preference) {
        if (localStorage.getItem('preference')) {
          preference = JSON.parse(localStorage.getItem('preference'));
          if (!preference.ip) {
            this.$state.go('platform', {});
          } else {
            this.$rootScope.preference = preference;
            if (typeof callback === "function") {
              callback(preference);
            }
          }
        } else {
          this.$state.go('platform', {});
        }
      } else {
        if (typeof callback === "function") {
          callback(this.$rootScope.preference);
        }
      }
    }

    return service;

  })();
  return exports = {
    service: service
  };
});
