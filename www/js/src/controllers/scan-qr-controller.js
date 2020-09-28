var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'underscore'], function(base, fsf, _) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $state) {
      this.$state = $state;
      this.scanCode = __bind(this.scanCode, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.scanCode();
    }

    Ctrl.prototype.scanCode = function() {
      var _ref;
      return (_ref = window.QRScanner) != null ? _ref.prepare((function(_this) {
        return function(err, status) {
          if (err) {
            return _this.display(err);
          } else {
            window.QRScanner.scan(function(err, text) {
              if (err) {
                return _this.display(err);
              } else {
                return _this.$state.go('scan', {
                  user: _this.$routeParams.user,
                  project: _this.$routeParams.project,
                  station: _this.$routeParams.station,
                  origin: _this.$routeParams.origin,
                  strScan: text
                });
              }
            });
            return window.QRScanner.show();
          }
        };
      })(this)) : void 0;
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
