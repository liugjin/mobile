var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var FunctionIntroductionCtrl, exports;
  FunctionIntroductionCtrl = (function(_super) {
    __extends(FunctionIntroductionCtrl, _super);

    function FunctionIntroductionCtrl($scope, $rootScope, $routeParams, $location, $window, $ionicHistory) {
      this.$ionicHistory = $ionicHistory;
      FunctionIntroductionCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
    }

    FunctionIntroductionCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return FunctionIntroductionCtrl;

  })(base.Controller);
  return exports = {
    FunctionIntroductionCtrl: FunctionIntroductionCtrl
  };
});
