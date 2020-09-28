var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller', 'clc.foundation.angular/services/http-service'], function(base, http) {
  var ChangeEmailSettingCtrl, exports;
  ChangeEmailSettingCtrl = (function(_super) {
    __extends(ChangeEmailSettingCtrl, _super);

    function ChangeEmailSettingCtrl($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, httpService, $ionicHistory, $ionicPopup) {
      this.modelManager = modelManager;
      this.modelEngine = modelEngine;
      this.uploadService = uploadService;
      this.options = options;
      this.httpService = httpService;
      this.$ionicHistory = $ionicHistory;
      this.$ionicPopup = $ionicPopup;
      this.showPop = __bind(this.showPop, this);
      ChangeEmailSettingCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
    }

    ChangeEmailSettingCtrl.prototype.showPop = function() {
      this.$scope.data = {};
      this.popMsg = {
        template: '<input type="email" ng-model="data.email">',
        title: '请输入您要修改的邮箱',
        scope: this.$scope,
        buttons: [
          {
            text: '取消'
          }, {
            text: '确定',
            type: 'button-positive',
            onTap: (function(_this) {
              return function(e) {
                if (!_this.$scope.data.email) {
                  return e.preventDefault();
                } else {
                  return _this.$scope.data.email;
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
            return console.log('res为空');
          } else {
            console.log("result?" + res);
            userService = _this.modelManager.getService('user');
            _this.$rootScope.user.email = res;
            return userService.update(_this.$rootScope.user);
          }
        };
      })(this));
    };

    ChangeEmailSettingCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return ChangeEmailSettingCtrl;

  })(base.Controller);
  return exports = {
    ChangeEmailSettingCtrl: ChangeEmailSettingCtrl
  };
});
