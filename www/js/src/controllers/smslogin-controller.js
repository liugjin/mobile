var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $state, cloudAuthService, toastService, $timeout, settingService, $ionicModal, $http, modelManager, modelEngine) {
      this.$state = $state;
      this.cloudAuthService = cloudAuthService;
      this.toastService = toastService;
      this.$timeout = $timeout;
      this.settingService = settingService;
      this.$ionicModal = $ionicModal;
      this.$http = $http;
      this.modelManager = modelManager;
      this.modelEngine = modelEngine;
      this.sendsmscode = __bind(this.sendsmscode, this);
      this.doLogin = __bind(this.doLogin, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
      this.ismail = false;
      this.isLogin = false;
      this.TIME = null;
    }

    Ctrl.prototype.doLogin = function() {
      var url;
      if (!this.smscode) {
        M.toast({
          html: '验证码不能为空'
        });
        return;
      }
      if (!this.code || !this.smscode || this.smscode.toString() !== this.code.toString()) {
        M.toast({
          html: '验证码不正确'
        });
        return;
      }
      this.isLogin = true;
      url = "http://" + this.$rootScope.preference.ip + "/auth/loginbysmscode/" + this.phone + "/" + this.code;
      return this.$http.post(url, {}).then((function(_this) {
        return function(res) {
          var preference;
          if (res.data && res.data.user) {
            M.toast({
              html: '登录成功'
            });
            if (localStorage.getItem('preference')) {
              preference = JSON.parse(localStorage.getItem('preference'));
              preference.user = res.data.user;
              localStorage.setItem('preference', JSON.stringify(preference));
            } else {
              preference = {
                user: res.data.user
              };
              localStorage.setItem('preference', JSON.stringify(preference));
            }
            _this.$rootScope.preference = preference;
            _this.$rootScope.user = res.data;
            return _this.$timeout(function() {
              return _this.$state.go('portal', {}, {
                reload: true
              });
            }, 1000);
          } else {
            return M.toast({
              html: '登录失败'
            });
          }
        };
      })(this));
    };

    Ctrl.prototype.isPoneAvailable = function(str) {
      var strreg;
      strreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!strreg.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    Ctrl.prototype.sendsmscode = function() {
      var url;
      if (!this.phone) {
        return;
      }
      if (!this.isPoneAvailable(this.phone)) {
        return M.toast({
          html: "手机号码格式不正确"
        });
      }
      this.ismail = true;
      this.TIME = 30;
      this.timer = setInterval((function(_this) {
        return function() {
          return _this.$scope.$applyAsync(function() {
            _this.TIME--;
            if (_this.TIME < 0) {
              clearInterval(_this.timer);
              _this.TIME = null;
              return _this.ismail = false;
            }
          });
        };
      })(this), 1000);
      url = "http://" + this.$rootScope.preference.ip + "/auth/sendsmscode/" + this.phone;
      return this.$http.post(url, {}).then((function(_this) {
        return function(res) {
          console.info('res', res.data);
          if (res.data && res.data.code) {
            _this.code = res.data.code;
            return M.toast({
              html: "手机验证码已发送到您手机上，10分钟内有效"
            });
          } else {
            return _this.$http.post(url, {}).then(function(res) {
              return _this.code = res.data.code;
            });
          }
        };
      })(this), (function(_this) {
        return function(err) {
          return console.info('err', err);
        };
      })(this));
    };

    return Ctrl;

  })(base.Controller);
  return exports = {
    Ctrl: Ctrl
  };
});
