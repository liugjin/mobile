var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller', 'json!../../update.json'], function(base, version) {
  var AboutAppCtrl, exports;
  AboutAppCtrl = (function(_super) {
    __extends(AboutAppCtrl, _super);

    function AboutAppCtrl($scope, $rootScope, $routeParams, $location, $window, $ionicHistory) {
      this.$ionicHistory = $ionicHistory;
      AboutAppCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
      this.init();
    }

    AboutAppCtrl.prototype.init = function() {
      this.versionIndex = [];
      this.versionUpdate = version;
      return _.map(this.versionUpdate, (function(_this) {
        return function(value, key) {
          return _this.versionIndex.push(key);
        };
      })(this));
    };

    AboutAppCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return AboutAppCtrl;

  })(base.Controller);
  return exports = {
    AboutAppCtrl: AboutAppCtrl
  };
});
