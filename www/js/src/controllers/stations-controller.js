var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter'], function(base, fsf) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) {
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.formatString = fsf.FormatStringFilter();
    }

    Ctrl.prototype.load = function(callback, refresh) {
      return Ctrl.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          _this.subscribeStationSignal();
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Ctrl.prototype.subscribeStationSignal = function() {
      var filter, model, _ref;
      model = this.project.model;
      filter = {
        user: model.user,
        project: model.project,
        station: '+',
        equipment: '_station_management',
        signal: '+'
      };
      if ((_ref = this.stationSignalSubscription) != null) {
        _ref.dispose();
      }
      return this.stationSignalSubscription = this.signalLiveSession.subscribeValues(filter, (function(_this) {
        return function(err, d) {
          var signal, station, unit;
          if (!d) {
            return;
          }
          signal = d.message;
          station = _this.project.stations.getItemByIds(signal);
          if (station) {
            if (station.stationSignal == null) {
              station.stationSignal = {};
            }
            signal.value = _this.formatString(signal.value, 'float', '0.00');
            station.stationSignal[signal.signal] = signal;
            if (signal.unit) {
              if (station.unit == null) {
                station.unit = {};
              }
              unit = _.find(_this.project.dictionary.signaltypes.items, function(item) {
                return item.key === signal.unit;
              });
              station.unit[signal.signal] = unit.model.unit;
            }
            if (signal.signal === 'real-time-power-overview') {
              return _this.signalValue = signal;
            }
          }
        };
      })(this));
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
