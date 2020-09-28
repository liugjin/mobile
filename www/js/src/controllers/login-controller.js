var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $state, cloudAuthService, toastService, $timeout, settingService, $ionicModal) {
      this.$state = $state;
      this.cloudAuthService = cloudAuthService;
      this.toastService = toastService;
      this.$timeout = $timeout;
      this.settingService = settingService;
      this.$ionicModal = $ionicModal;
      this.changeInput = __bind(this.changeInput, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
      this.getPreference((function(_this) {
        return function(preference) {};
      })(this));
      this.init();
    }

    Ctrl.prototype.getPreference = function(callback) {
      var preference;
      if (!this.$rootScope.preference) {
        if (localStorage.getItem('preference')) {
          preference = JSON.parse(localStorage.getItem('preference'));
          if (!preference.ip) {
            return this.$state.go('platform', {});
          } else {
            this.$rootScope.preference = preference;
            return typeof callback === "function" ? callback(preference) : void 0;
          }
        } else {
          return this.$state.go('platform', {});
        }
      } else {
        return typeof callback === "function" ? callback(this.$rootScope.preference) : void 0;
      }
    };

    Ctrl.prototype.init = function() {
      var user;
      this.loginData = {};
      this.btnTxt = '登  录';
      this.isLogin = false;
      this.isAll = false;
      user = this.cloudAuthService.getUserCookie();
      this.initModal();
      if (user && user.user && user.password) {
        this.loginData.username = user.user;
        this.loginData.password = user.password;
        this.changeInput();
        if (this.$routeParams.fromUrl === 'logout') {
          return;
        }
        if (this.$routeParams.fromUrl === 'changepassword') {
          this.loginData.password = '';
        }
      }
    };

    Ctrl.prototype.dispose = function() {
      var _ref;
      Ctrl.__super__.dispose.apply(this, arguments);
      return (_ref = this.modal) != null ? _ref.remove() : void 0;
    };

    Ctrl.prototype.openModal = function() {
      return this.modal.show();
    };

    Ctrl.prototype.initModal = function() {
      return this.$ionicModal.fromTemplateUrl('templates/modals/terms.html', {
        scope: this.$scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          _this.modal = modal;
          _this.$scope.modal = modal;
          return _this.$scope.controller = _this;
        };
      })(this));
    };

    Ctrl.prototype.doLogin = function() {
      var onFailure, onSuccess;
      if (!this.loginData.username) {
        M.toast({
          html: '请填写账号！',
          displayLength: 1000
        });
        return;
      }
      if (!this.loginData.password) {
        M.toast({
          html: '请填写密码！',
          displayLength: 1000
        });
        return;
      }
      this.btnTxt = '登录中...';
      this.isLogin = true;
      onSuccess = (function(_this) {
        return function(resp) {
          var preference;
          if (!(resp != null ? resp._err : void 0)) {
            if (localStorage.getItem('preference')) {
              preference = JSON.parse(localStorage.getItem('preference'));
              preference.user = resp.user;
              preference.name = resp.name;
              localStorage.setItem('preference', JSON.stringify(preference));
            } else {
              preference = {
                user: resp.user,
                name: resp.name
              };
              localStorage.setItem('preference', JSON.stringify(preference));
            }
            return _this.$timeout(function() {
              return _this.$state.go('portal', {
                origin: 'login'
              }, {
                reload: true
              });
            }, 1000);
          } else {
            _this.btnTxt = '登  录';
            _this.isLogin = false;
            return _this.toastService('用户或密码错误');
          }
        };
      })(this);
      onFailure = (function(_this) {
        return function(err) {
          _this.btnTxt = '登  录';
          _this.isLogin = false;
          return _this.toastService(err);
        };
      })(this);
      return this.cloudAuthService.login(this.loginData.username, this.loginData.password, (function(_this) {
        return function(err, resp) {
          if (err) {
            return onFailure(err);
          }
          return onSuccess(resp);
        };
      })(this));
    };

    Ctrl.prototype.changeInput = function() {
      if (this.loginData.username && this.loginData.password) {
        return this.isAll = true;
      } else {
        return this.isAll = false;
      }
    };

    return Ctrl;

  })(base.Controller);
  return exports = {
    Ctrl: Ctrl
  };
});
