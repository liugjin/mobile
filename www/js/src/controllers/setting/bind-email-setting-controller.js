var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var BindEmailSettingCtrl, exports;
  BindEmailSettingCtrl = (function(_super) {
    __extends(BindEmailSettingCtrl, _super);

    function BindEmailSettingCtrl($scope, $rootScope, $routeParams, $location, $window, $ionicHistory) {
      this.$ionicHistory = $ionicHistory;
      BindEmailSettingCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
    }

    BindEmailSettingCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return BindEmailSettingCtrl;

  })(base.Controller);
  return exports = {
    BindEmailSettingCtrl: BindEmailSettingCtrl
  };
});
