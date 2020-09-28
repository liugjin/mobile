var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var PhoneNumberSettingCtrl, exports;
  PhoneNumberSettingCtrl = (function(_super) {
    __extends(PhoneNumberSettingCtrl, _super);

    function PhoneNumberSettingCtrl($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, httpService, $ionicHistory, $ionicPopup) {
      this.modelManager = modelManager;
      this.modelEngine = modelEngine;
      this.uploadService = uploadService;
      this.options = options;
      this.httpService = httpService;
      this.$ionicHistory = $ionicHistory;
      this.$ionicPopup = $ionicPopup;
      this.showPop = __bind(this.showPop, this);
      PhoneNumberSettingCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
    }

    PhoneNumberSettingCtrl.prototype.showPop = function() {
      this.$scope.data = {};
      this.popMsg = {
        template: '<input type="number" ng-model="data.phone">',
        title: '请输入您要修改的手机号',
        scope: this.$scope,
        buttons: [
          {
            text: '取消'
          }, {
            text: '确定',
            type: 'button-positive',
            onTap: (function(_this) {
              return function(e) {
                if (!_this.$scope.data.phone) {
                  return e.preventDefault();
                } else {
                  return _this.$scope.data.phone;
                }
              };
            })(this)
          }
        ]
      };
      this.myPop = this.$ionicPopup.show(this.popMsg);
      return this.myPop.then((function(_this) {
        return function(res) {
          var userService;
          if (!res) {
            return console.log("res为空");
          } else {
            console.log("result?" + res);
            userService = _this.modelManager.getService('user');
            _this.$rootScope.user.phone = res;
            return userService.update(_this.$rootScope.user, function(err, data) {
              return console.log(data);
            });
          }
        };
      })(this));
    };

    PhoneNumberSettingCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return PhoneNumberSettingCtrl;

  })(base.Controller);
  return exports = {
    PhoneNumberSettingCtrl: PhoneNumberSettingCtrl
  };
});
