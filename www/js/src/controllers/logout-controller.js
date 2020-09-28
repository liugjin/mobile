var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var LogoutController, exports;
  LogoutController = (function(_super) {
    __extends(LogoutController, _super);

    function LogoutController($scope, $rootScope, $routeParams, $location, $window, $state, cloudAuthService, storage) {
      var _ref;
      LogoutController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
      if ((_ref = this.$rootScope.station) != null ? _ref.model : void 0) {
        storage.set('station', this.$rootScope.station.model);
      }
      cloudAuthService.logout();
      $state.go('login', {
        fromUrl: 'logout'
      });
    }

    return LogoutController;

  })(base.Controller);
  return exports = {
    LogoutController: LogoutController
  };
});
