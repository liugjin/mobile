var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var ProblemFeedbackSettingCtrl, exports;
  ProblemFeedbackSettingCtrl = (function(_super) {
    __extends(ProblemFeedbackSettingCtrl, _super);

    function ProblemFeedbackSettingCtrl($scope, $rootScope, $routeParams, $location, $window, $ionicHistory) {
      this.$ionicHistory = $ionicHistory;
      ProblemFeedbackSettingCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
    }

    ProblemFeedbackSettingCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    ProblemFeedbackSettingCtrl.prototype.onSubmit = function() {
      console.log('点击onSubmit');
      return console.log(this.data.feedback);
    };

    return ProblemFeedbackSettingCtrl;

  })(base.Controller);
  return exports = {
    ProblemFeedbackSettingCtrl: ProblemFeedbackSettingCtrl
  };
});
