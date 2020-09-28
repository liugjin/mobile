var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'moment', 'rx', 'underscore'], function(base, fsf, moment, Rx, _) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $ionicHistory) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.commonService = commonService;
      this.$state = $state;
      this.$ionicPopup = $ionicPopup;
      this.$ionicActionSheet = $ionicActionSheet;
      this.$cordovaCamera = $cordovaCamera;
      this.$ionicHistory = $ionicHistory;
      this.refreshTaskReport = __bind(this.refreshTaskReport, this);
      this.gotab = __bind(this.gotab, this);
      this.goBack = __bind(this.goBack, this);
      this.showConfirm = __bind(this.showConfirm, this);
      this.initModal = __bind(this.initModal, this);
      this.init = __bind(this.init, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.init();
    }

    Ctrl.prototype.init = function() {
      var _ref, _ref1;
      this.initModal();
      if ((_ref = this.equipSubscription) != null) {
        _ref.dispose();
      }
      this.equipSubscription = this.commonService.subscribeEventBus("task-model", (function(_this) {
        return function(msg) {
          console.log("msg", msg);
          _this.$routeParams.msg = msg;
          _this.$routeParams.task = msg.message.task.task;
          console.log("$routeParams", _this.$routeParams);
          return _this.$ionicModal.fromTemplateUrl('templates/order-detail.html', {
            scope: _this.$scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            _this.emodal = modal;
            _this.$scope.vm = _this;
            return _this.emodal.show();
          });
        };
      })(this));
      if ((_ref1 = this.updateNodeResult) != null) {
        _ref1.dispose();
      }
      return this.updateNodeResult = this.commonService.subscribeEventBus("updateNodeResult", (function(_this) {
        return function(msg) {
          if (!msg.message.err && msg.message.result) {
            return _this.$timeout(function() {
              return _this.$ionicPopup.show({
                title: '提交成功!',
                buttons: [
                  {
                    text: "确认",
                    type: "button-positive",
                    onTap: function(e) {
                      return _this.goBack(true);
                    }
                  }
                ]
              });
            }, 600);
          } else {
            return _this.$timeout(function() {
              return _this.$ionicPopup.show({
                title: '提交失败!',
                buttons: [
                  {
                    text: "确认",
                    type: "button-positive",
                    onTap: function(e) {}
                  }
                ]
              });
            }, 600);
          }
        };
      })(this));
    };

    Ctrl.prototype.initModal = function() {
      this.$ionicModal.fromTemplateUrl('templates/order-node.html', {
        scope: this.$scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          _this.nmodal = modal;
          return _this.$scope.vm = _this;
        };
      })(this));
      return this.$ionicModal.fromTemplateUrl('templates/order-detail.html', {
        scope: this.$scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          _this.emodal = modal;
          return _this.$scope.vm = _this;
        };
      })(this));
    };

    Ctrl.prototype.showConfirm = function() {
      return this.$timeout((function(_this) {
        return function() {
          var confirmPopup;
          confirmPopup = _this.$ionicPopup.confirm({
            title: '接收确认',
            template: '确定接收此工单？'
          });
          return confirmPopup.then(function(res) {
            var _ref;
            if (res) {
              return (_ref = _this.emodal) != null ? _ref.show() : void 0;
            }
          });
        };
      })(this), 600);
    };

    Ctrl.prototype.goBack = function(refresh) {
      var _ref, _ref1;
      console.log("返回了页面");
      if ((_ref = this.emodal) != null) {
        _ref.remove();
      }
      if ((_ref1 = this.nmodal) != null) {
        _ref1.remove();
      }
      return this.refreshTaskReport(true);
    };

    Ctrl.prototype.gotab = function() {
      return this.$state.go('tab.overview', {
        user: this.$routeParams.user,
        project: this.$routeParams.project
      });
    };

    Ctrl.prototype.refreshTaskReport = function(refresh) {
      return this.commonService.publishEventBus("refreshTaskReport", {
        refresh: refresh
      });
    };

    Ctrl.prototype.dispose = function() {
      var _ref, _ref1, _ref2, _ref3;
      if ((_ref = this.emodal) != null) {
        _ref.remove();
      }
      if ((_ref1 = this.nmodal) != null) {
        _ref1.remove();
      }
      if ((_ref2 = this.equipSubscription) != null) {
        _ref2.dispose();
      }
      return (_ref3 = this.updateNodeResult) != null ? _ref3.dispose() : void 0;
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
