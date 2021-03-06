var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'underscore'], function(base, fsf, _) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $state) {
      this.$state = $state;
      this.goToOrigin = __bind(this.goToOrigin, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
    }

    Ctrl.prototype.load = function(callback, refresh) {
      return Ctrl.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Ctrl.prototype.goToOrigin = function() {
      if (this.$routeParams.origin === 'tab.event') {
        return this.$state.go('tab.event', {
          user: this.$routeParams.user,
          project: this.$routeParams.project
        });
      } else if (this.$routeParams.origin === 'equipment') {
        return this.$state.go('equipment', {
          user: this.$routeParams.user,
          project: this.$routeParams.project,
          station: this.$routeParams.station,
          equipment: this.$routeParams.equipment
        });
      } else {

      }
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
