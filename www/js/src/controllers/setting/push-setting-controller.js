var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var PushSettingCtrl, exports;
  PushSettingCtrl = (function(_super) {
    __extends(PushSettingCtrl, _super);

    function PushSettingCtrl($scope, $rootScope, $routeParams, $location, $window, $ionicHistory) {
      this.$scope = $scope;
      this.$ionicHistory = $ionicHistory;
      PushSettingCtrl.__super__.constructor.call(this, this.$scope, $rootScope, $routeParams, $location, $window);
      this.init();
    }

    PushSettingCtrl.prototype.init = function() {
      this.$scope.push = false;
      this.$scope.SMS = false;
      return this.$scope.email = false;
    };

    PushSettingCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    PushSettingCtrl.prototype.pushChange = function() {
      this.$scope.push = !this.$scope.push;
      return console.log('push的值:' + this.$scope.push);
    };

    PushSettingCtrl.prototype.SMSChange = function() {
      this.$scope.SMS = !this.$scope.SMS;
      return console.log("SMS的值:" + this.$scope.SMS);
    };

    PushSettingCtrl.prototype.emailChange = function() {
      this.$scope.email = !this.$scope.email;
      return console.log("email的值:" + this.$scope.email);
    };

    return PushSettingCtrl;

  })(base.Controller);
  return exports = {
    PushSettingCtrl: PushSettingCtrl
  };
});
