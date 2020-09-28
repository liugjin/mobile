var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller', 'tripledes'], function(base, tripledes) {
  var ResetPasswordSettingCtrl, exports;
  ResetPasswordSettingCtrl = (function(_super) {
    __extends(ResetPasswordSettingCtrl, _super);

    function ResetPasswordSettingCtrl($scope, $rootScope, $routeParams, $location, $window, $state, toastService, $timeout, settingService, $ionicHistory, modelManager) {
      this.$state = $state;
      this.toastService = toastService;
      this.$timeout = $timeout;
      this.settingService = settingService;
      this.$ionicHistory = $ionicHistory;
      this.modelManager = modelManager;
      this.submitChange = __bind(this.submitChange, this);
      ResetPasswordSettingCtrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
    }

    ResetPasswordSettingCtrl.prototype.submitChange = function() {
      var changePswService, newPsw, psw;
      this.oldPsw;
      this.newPsw;
      this.confirmPsw;
      psw = this._decrypt(this.$rootScope.user.password, this.$rootScope.user.name);
      if (!this.oldPsw === void 0 || this.newPsw === void 0 || this.confirmPsw === void 0) {
        return this.toastService('输入不能为空');
      } else {
        if (psw !== this.oldPsw) {
          console.log('旧密码不对!');
          return this.toastService('您输入的旧密码有误!');
        } else {
          if (this.newPsw !== this.confirmPsw) {
            return this.toastService('两次密码输入不一致');
          } else {
            newPsw = this._encrypt(this.newPsw, this.$rootScope.user.name);
            changePswService = this.modelManager.getService('changePassword');
            this.data = {
              oldPassword: this.$rootScope.user.password,
              password: newPsw,
              user: this.$rootScope.user.name
            };
            return changePswService.create(this.data, (function(_this) {
              return function(err, result) {};
            })(this));
          }
        }
      }
    };

    ResetPasswordSettingCtrl.prototype._decrypt = function(encrypted, secret) {
      return CryptoJS.DES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    };

    ResetPasswordSettingCtrl.prototype._encrypt = function(message, secret) {
      return CryptoJS.DES.encrypt(message, secret).toString();
    };

    ResetPasswordSettingCtrl.prototype.onBackPress = function() {
      return this.$ionicHistory.goBack();
    };

    return ResetPasswordSettingCtrl;

  })(base.Controller);
  return exports = {
    ResetPasswordSettingCtrl: ResetPasswordSettingCtrl
  };
});
