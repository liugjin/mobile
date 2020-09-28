var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var AccountSettingCtrl, exports;
  AccountSettingCtrl = (function(_super) {
    __extends(AccountSettingCtrl, _super);

    function AccountSettingCtrl($scope, $rootScope, $routeParams, $location, $window, $ionicHistory) {
      this.$ionicHistory = $ionicHistory;
      AccountSettingCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
    }

    AccountSettingCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return AccountSettingCtrl;

  })(base.Controller);
  return exports = {
    AccountSettingCtrl: AccountSettingCtrl
  };
});
