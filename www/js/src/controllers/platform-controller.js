var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $state, cloudAuthService, toastService, $timeout, settingService, $ionicModal, $http, modelManager, modelEngine) {
      this.$state = $state;
      this.cloudAuthService = cloudAuthService;
      this.toastService = toastService;
      this.$timeout = $timeout;
      this.settingService = settingService;
      this.$ionicModal = $ionicModal;
      this.$http = $http;
      this.modelManager = modelManager;
      this.modelEngine = modelEngine;
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
      this.platform = [
        {
          "ip": "192.168.0.128",
          "name": "iiot",
          "token": "2f2fbff0-3bfb-11ea-9248-4b5dea468c92"
        }
      ];
      if (this.platform[0]) {
        this.selectPlatform = this.platform[0].ip + '&' + this.platform[0].token;
      }
      this.doRegister();
    }

    Ctrl.prototype.doRegister = function() {
      var preference;
      if (!this.selectPlatform) {
        M.toast({
          html: '平台选择不能为空'
        });
        return;
      }
      if (localStorage.getItem('preference')) {
        preference = JSON.parse(localStorage.getItem('preference'));
        preference.ip = this.selectPlatform.split('&')[0];
        preference.token = this.selectPlatform.split('&')[1];
        localStorage.setItem('preference', JSON.stringify(preference));
      } else {
        preference = {
          ip: this.selectPlatform.split('&')[0],
          token: this.selectPlatform.split('&')[1]
        };
        localStorage.setItem('preference', JSON.stringify(preference));
      }
      this.$rootScope.preference = preference;
      this.settingService.changeIp(preference.ip);
      this.modelManager.options = window.setting;
      return this.$state.go('login');
    };

    return Ctrl;

  })(base.Controller);
  return exports = {
    Ctrl: Ctrl
  };
});
