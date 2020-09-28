var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/services/service', 'tripledes'], function(base, CryptoJS) {
  var CloudAuthService, exports;
  CloudAuthService = (function(_super) {
    __extends(CloudAuthService, _super);

    function CloudAuthService($rootScope, storage, httpService, settingService) {
      this.storage = storage;
      this.httpService = httpService;
      this.settingService = settingService;
      CloudAuthService.__super__.constructor.call(this, $rootScope);
      this.loginCookie = settingService.loginCookie;
      this.muSettingkey = settingService.muSettingCookie;
    }

    CloudAuthService.prototype.login = function(username, password, callback) {
      var _password;
      if (username == null) {
        username = '';
      }
      if (password == null) {
        password = '';
      }
      _password = this._encrypt(password, username);
      return this.httpService.post(this.settingService.urls.login, {
        username: username,
        password: _password
      }, (function(_this) {
        return function(err, resp) {
          if (!err) {
            resp.password = password;
            _this.$rootScope.user = resp;
            _this.$rootScope.muSetting = _this.getMuSetting();
            _this.setUserCookie(resp);
          }
          return typeof callback === "function" ? callback(err, resp) : void 0;
        };
      })(this));
    };

    CloudAuthService.prototype.logout = function() {
      return this.$rootScope.user = null;
    };

    CloudAuthService.prototype.register = function(user, callback) {
      user.password = this._encrypt(user.password, user.user);
      return this.httpService.post(this.settingService.urls.register, user, (function(_this) {
        return function(err, resp) {
          return typeof callback === "function" ? callback(err, resp) : void 0;
        };
      })(this));
    };

    CloudAuthService.prototype.getUserCookie = function(encryption) {
      var user;
      if (encryption == null) {
        encryption = true;
      }
      user = this.storage.get(this.loginCookie);
      if (encryption && (user != null ? user.password : void 0) && user.user) {
        user.password = this._decrypt(user.password, user.user);
      }
      return user;
    };

    CloudAuthService.prototype.setUserCookie = function(value, encryption) {
      if (encryption == null) {
        encryption = true;
      }
      if (encryption && (value != null ? value.password : void 0) && value.user) {
        value.password = this._encrypt(value.password, value.user);
      }
      return this.storage.set(this.loginCookie, value);
    };

    CloudAuthService.prototype.getMuSetting = function() {
      var muSetting;
      muSetting = this.storage.get(this.muSettingkey);
      if (!muSetting) {
        muSetting = this.settingService.muSetting;
      }
      return muSetting;
    };

    CloudAuthService.prototype._encrypt = function(message, secret) {
      return CryptoJS.DES.encrypt(message, secret).toString();
    };

    CloudAuthService.prototype._decrypt = function(encrypted, secret) {
      return CryptoJS.DES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    };

    return CloudAuthService;

  })(base.Service);
  return exports = {
    CloudAuthService: CloudAuthService
  };
});