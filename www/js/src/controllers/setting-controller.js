var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'json!../update.json'], function(base, fsf, version) {
  var SettingController, exports;
  SettingController = (function(_super) {
    __extends(SettingController, _super);

    function SettingController($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.commonService = commonService;
      this.$state = $state;
      this.$ionicPopup = $ionicPopup;
      this.showConfirm = __bind(this.showConfirm, this);
      SettingController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.pageItems = 30;
      this.predicate = ['stared', 'updatetime'];
      this.init();
    }

    SettingController.prototype.init = function() {
      this.versionIndex = [];
      this.versionUpdate = version;
      _.map(this.versionUpdate, (function(_this) {
        return function(value, key) {
          return _this.versionIndex.push(key);
        };
      })(this));
      return this.initModal();
    };

    SettingController.prototype.dispose = function() {
      var _ref;
      SettingController.__super__.dispose.apply(this, arguments);
      return (_ref = this.modal) != null ? _ref.remove() : void 0;
    };

    SettingController.prototype.openModal = function() {
      return this.modal.show();
    };

    SettingController.prototype.initModal = function() {
      return this.$ionicModal.fromTemplateUrl('templates/modals/user.html', {
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

    SettingController.prototype.load = function(callback, refresh) {
      return SettingController.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          _this.loadProjects(callback, refresh);
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    SettingController.prototype.loadProjects = function(callback, refresh) {
      var fields, filter;
      filter = {
        keywords: {
          $elemMatch: {
            $regex: 'industry',
            $options: 'i'
          }
        }
      };
      fields = 'user _id project name image updatetime stars keywords desc';
      return this.query(filter, fields, (function(_this) {
        return function(err, model) {
          _this.items = _.filter(_this.items, function(item) {
            return ~(item.keywords.indexOf('app'));
          });
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    SettingController.prototype.showConfirm = function() {
      var confirmPopup;
      confirmPopup = this.$ionicPopup.confirm({
        title: '退出确认',
        template: '确定退出登录？'
      });
      return confirmPopup.then((function(_this) {
        return function(res) {
          if (res) {
            return _this.$state.go('logout', {});
          }
        };
      })(this));
    };

    return SettingController;

  })(base.FeatureBaseController);
  return exports = {
    SettingController: SettingController
  };
});
