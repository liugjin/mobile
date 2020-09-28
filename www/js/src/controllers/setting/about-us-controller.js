var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller', 'json!../../update.json'], function(base, version) {
  var AboutUsCtrl, exports;
  AboutUsCtrl = (function(_super) {
    __extends(AboutUsCtrl, _super);

    function AboutUsCtrl($scope, $rootScope, $routeParams, $location, $window, $ionicHistory) {
      this.$ionicHistory = $ionicHistory;
      AboutUsCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
      this.init();
    }

    AboutUsCtrl.prototype.init = function() {
      this.versionIndex = [];
      this.versionUpdate = version;
      return _.map(this.versionUpdate, (function(_this) {
        return function(value, key) {
          return _this.versionIndex.push(key);
        };
      })(this));
    };

    AboutUsCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return AboutUsCtrl;

  })(base.Controller);
  return exports = {
    AboutUsCtrl: AboutUsCtrl
  };
});