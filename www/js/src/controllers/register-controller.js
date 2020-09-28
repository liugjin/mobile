var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/controller'], function(base) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $state, cloudAuthService, toastService, $timeout, settingService, $ionicModal, $http, modelManager, modelEngine, $ionicPopup) {
      this.$state = $state;
      this.cloudAuthService = cloudAuthService;
      this.toastService = toastService;
      this.$timeout = $timeout;
      this.settingService = settingService;
      this.$ionicModal = $ionicModal;
      this.$http = $http;
      this.modelManager = modelManager;
      this.modelEngine = modelEngine;
      this.$ionicPopup = $ionicPopup;
      this.hasPhone = __bind(this.hasPhone, this);
      this.sendSmsCode = __bind(this.sendSmsCode, this);
      this.checkPhone = __bind(this.checkPhone, this);
      this.changeInput = __bind(this.changeInput, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window);
      this.init();
      this.ismail = false;
      this.isAll = false;
      this.code = null;
      this.TIME = null;
    }

    Ctrl.prototype.init = function() {
      this.registerData = {};
      this.btnTxt = '下一步';
      this.isRegister = false;
      return this.initModal();
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
      return this.$ionicModal.fromTemplateUrl('templates/modals/reg.html', {
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

    Ctrl.prototype.doRegister = function() {
      var onFailure, onSuccess;
      if (!this.registerData.name) {
        M.toast({
          html: '公司名称不能为空！',
          displayLength: 1500
        });
        return;
      }
      if (!this.isNameAvailable(this.registerData.name)) {
        M.toast({
          html: '公司名称必须为中文！',
          displayLength: 1500
        });
        return;
      }
      if (!this.registerData.user) {
        M.toast({
          html: '账号名称不能为空！',
          displayLength: 1500
        });
        return;
      }
      if (!this.isUserAvailable(this.registerData.user)) {
        M.toast({
          html: '账号名称只能包含字母数字和_！',
          displayLength: 1500
        });
        return;
      }
      if (!this.registerData.email) {
        M.toast({
          html: '邮箱不能为空！',
          displayLength: 1500
        });
        return;
      }
      if (!this.isEmailAvailable(this.registerData.email)) {
        M.toast({
          html: '邮箱格式不正确！',
          displayLength: 1500
        });
        return;
      }
      if (!this.registerData.password) {
        M.toast({
          html: '密码不能为空！',
          displayLength: 1500
        });
        return;
      }
      if (!this.registerData.passwordAgain) {
        M.toast({
          html: '确认密码不能为空！',
          displayLength: 1500
        });
        return;
      }
      if (this.registerData.password !== this.registerData.passwordAgain) {
        M.toast({
          html: '两次输入的密码不一致',
          displayLength: 1500
        });
        return;
      }
      if (!this.registerData.phone) {
        M.toast({
          html: '手机号码不能为空！',
          displayLength: 1500
        });
        return;
      }
      if (!this.registerData.code) {
        M.toast({
          html: '验证码不能为空',
          displayLength: 1500
        });
        return;
      }
      if (!this.code || !this.registerData.code || this.code.toString() !== this.registerData.code.toString()) {
        M.toast({
          html: '验证码不正确',
          displayLength: 1500
        });
        return;
      }
      if (this.phone !== this.registerData.phone) {
        M.toast({
          html: '已经修改手机号码，请重新获取验证码',
          displayLength: 1500
        });
        return;
      }
      this.btnTxt = '注册中...';
      this.isRegister = true;
      onSuccess = (function(_this) {
        return function(resp) {
          if (!(resp != null ? resp._err : void 0)) {
            _this.toastService('注册成功！');
            if (_this.$rootScope.preference) {
              _this.$rootScope.preference.user = _this.registerData.user;
              _this.$rootScope.preference.name = _this.registerData.name;
            } else {
              _this.$rootScope.preference = {
                user: _this.registerData.user,
                name: _this.registerData.name
              };
            }
            return _this.$timeout(function() {
              return _this.$ionicPopup.show({
                title: '注册成功!',
                buttons: [
                  {
                    text: "确认",
                    type: "button-positive",
                    onTap: function(e) {
                      return _this.$state.go('supplier');
                    }
                  }
                ]
              });
            }, 600);
          } else {
            _this.btnTxt = '注 册';
            _this.isRegister = false;
            return M.toast({
              html: resp._err
            });
          }
        };
      })(this);
      onFailure = (function(_this) {
        return function(resp) {
          _this.btnTxt = '注 册';
          _this.isRegister = false;
          console.info('resp', resp);
          return M.toast({
            html: resp
          });
        };
      })(this);
      this.user = {
        name: this.registerData.user,
        password: this.registerData.password,
        phone: this.phone,
        user: this.registerData.user,
        email: this.registerData.email,
        visible: true
      };
      return this.cloudAuthService.register(this.user, (function(_this) {
        return function(err, resp) {
          if (err) {
            return onFailure(err);
          }
          return onSuccess(resp);
        };
      })(this));
    };

    Ctrl.prototype.changeInput = function() {
      if (this.registerData.name && this.registerData.user && this.registerData.email && this.registerData.password && this.registerData.passwordAgain && this.registerData.phone && this.registerData.code) {
        return this.isAll = true;
      } else {
        return this.isAll = false;
      }
    };

    Ctrl.prototype.checkPhone = function() {
      if (!this.registerData.phone) {
        M.toast({
          html: '请输入手机号码！',
          displayLength: 1500
        });
        return;
      }
      if (!this.isPoneAvailable(this.registerData.phone)) {
        return M.toast({
          html: "手机号码格式不正确"
        });
      }
      return this.hasPhone((function(_this) {
        return function(users) {
          var people;
          people = _.find(users, function(user) {
            return user.phone === _this.registerData.phone;
          });
          if (people) {
            return M.toast({
              html: "手机号码已经注册，请重新输入！"
            });
          }
          return _this.sendSmsCode();
        };
      })(this));
    };

    Ctrl.prototype.sendSmsCode = function() {
      var url;
      this.phone = this.registerData.phone;
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
      url = "http://" + this.$rootScope.preference.ip + "/auth/sendsmscode/" + this.registerData.phone;
      return this.$http.post(url, {}).then((function(_this) {
        return function(res) {
          if (res.data && res.data.code) {
            _this.code = res.data.code;
            return M.toast({
              html: "手机验证码已发送到您手机上，5分钟内有效"
            });
          } else {
            return _this.$http.post(url, {}).then(function(r) {
              console.info('r', r.data);
              return _this.code = r.data.code;
            });
          }
        };
      })(this), (function(_this) {
        return function(err) {
          return console.info('err', err);
        };
      })(this));
    };

    Ctrl.prototype.hasPhone = function(callback) {
      var url;
      url = "http://" + this.$rootScope.preference.ip + "/model/clc/api/v1/users?token=" + this.$rootScope.preference.token;
      return this.$http.get(url).then((function(_this) {
        return function(res) {
          return typeof callback === "function" ? callback(res.data) : void 0;
        };
      })(this));
    };

    Ctrl.prototype.isNameAvailable = function(str) {
      return true;
    };

    Ctrl.prototype.isUserAvailable = function(str) {
      var strReg;
      strReg = /^\w+$/;
      if (!strReg.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    Ctrl.prototype.isPoneAvailable = function(str) {
      var strReg;
      strReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!strReg.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    Ctrl.prototype.isEmailAvailable = function(str) {
      var strReg;
      strReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z\-_]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
      if (!strReg.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    Ctrl.prototype.sendMail = function(phone) {
      var data, errorCallback, successCallback;
      successCallback = function(resp) {
        console.info('success', resp);
      };
      errorCallback = function(resp) {
        console.info('error', resp);
      };
      data = {
        phone: phone
      };
      return this.$http.post('/industry/mail', data).then(successCallback, errorCallback);
    };

    Ctrl.prototype.copyProject = function() {
      var data, generateProjectUrl, service, url;
      data = {
        user0: 'admin',
        project0: 'ups-monitoring',
        user: this.registerData.user,
        project: 'ups-monitoring',
        name: '物联智能云监控平台'
      };
      service = this.modelManager.getService('project');
      console.log(service, '<-- service');
      generateProjectUrl = "http://127.0.0.1/model/clc/api/v1/generateProject/:user/:project";
      url = service.replaceUrlParam(generateProjectUrl, data);
      return service.postData(url, data, (function(_this) {
        return function(err, result) {
          console.log(err, '<-- err');
          return console.log(result, '<-- result');
        };
      })(this));
    };

    return Ctrl;

  })(base.Controller);
  return exports = {
    Ctrl: Ctrl
  };
});
