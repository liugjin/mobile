var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/graphic-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'moment'], function(base, fsf, moment) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) {
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
    }

    Ctrl.prototype.load = function(callback, refresh) {
      this.formatString = fsf.FormatStringFilter();
      this.signalSetting = {
        title: ''
      };
      this.signalValues = null;
      this.managementEquipment = '_station_management';
      this.signalRecordTypes = [
        {
          type: 'now',
          name: '实时曲线图'
        }, {
          type: 'day',
          name: '今日曲线图'
        }, {
          type: 'week',
          name: '本周曲线图'
        }, {
          type: 'month',
          name: '本月曲线图'
        }, {
          type: 'year',
          name: '本年曲线图'
        }
      ];
      this.signalRecordType = this.signalRecordTypes[1];
      this.period = this.getPeriod();
      return Ctrl.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          _this.queryRecentSignalRecords();
          _this.subscribeStationSignal();
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Ctrl.prototype.selectStation = function(station) {
      if (!Ctrl.__super__.selectStation.call(this, station)) {
        return false;
      }
      this.loadStationGraphic(station);
      this.loadEquipments();
      return true;
    };

    Ctrl.prototype.loadStationGraphic = function(station, refresh) {
      if (station == null) {
        station = this.station;
      }
      if (!station) {
        return;
      }
      this.templateId = {
        user: this.$routeParams.user,
        project: this.$routeParams.project,
        template: station.model.graphic || station.model.map
      };
      if (refresh) {
        this.templateId.timestamp = new Date;
      }
      return this.templateId;
    };

    Ctrl.prototype.loadEquipments = function(callback, refresh) {
      var fields, _ref;
      fields = 'user project station equipment name type image index group';
      return (_ref = this.station) != null ? _ref.loadEquipments({}, fields, (function(_this) {
        return function(err, model) {
          _this.equipments = model;
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh) : void 0;
    };

    Ctrl.prototype.subscribeStationSignal = function() {
      var filter, model, _ref;
      model = this.project.model;
      filter = {
        user: model.user,
        project: model.project,
        station: this.station.model.station,
        equipment: this.managementEquipment,
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
            if (signal.signal === 'real-time-power') {
              return _this.signalValue = signal;
            }
          }
        };
      })(this));
    };

    Ctrl.prototype.queryRecentSignalRecords = function(signal) {
      var data, filter, paging, signalKey, sorting;
      if (signal == null) {
        signal = 'real-time-power';
      }
      if (!signal) {
        return;
      }
      filter = {
        user: this.station.model.user,
        project: this.station.model.project,
        station: this.station.model.station,
        equipment: this.managementEquipment,
        signal: signal
      };
      signalKey = (Object.values(filter)).join('.');
      paging = {
        page: 1,
        pageItems: 20
      };
      sorting = {
        timestamp: -1
      };
      this.parameters = {
        filter: filter,
        queryTime: moment(),
        paging: paging,
        sorting: sorting
      };
      data = {
        filter: filter,
        fields: null,
        paging: paging,
        sorting: sorting
      };
      this.signalRecordsParameters = {
        signal: signal,
        queryTime: new Date
      };
      this.signalValues = null;
      return this.reportingService.querySignalGroupRecords(data, (function(_this) {
        return function(err, records) {
          var m, svs;
          if (records.hasOwnProperty(signalKey)) {
            return _this.signalValues = records;
          } else {
            m = _this.station.model;
            svs = {};
            svs[signalKey] = {
              user: m.user,
              project: m.project,
              station: m.station,
              equipment: _this.managementEquipment,
              signal: signal,
              values: []
            };
            return _this.signalValues = svs;
          }
        };
      })(this));
    };

    Ctrl.prototype.querySignalRecords = function(signal, periodType, page, pageItems) {
      var data, filter, paging, period, signalKey, sorting, _ref;
      if (signal == null) {
        signal = 'real-time-power';
      }
      if (page == null) {
        page = 1;
      }
      if (pageItems == null) {
        pageItems = 1000;
      }
      switch (periodType) {
        case 'next':
          period = this.nextPeriod();
          break;
        case 'previous':
          period = this.previousPeriod();
          break;
        case 'refresh':
          period = (_ref = this.period) != null ? _ref : this.getPeriod();
          break;
        default:
          period = this.getPeriod(this.signalRecordType);
      }
      filter = {
        user: this.station.model.user,
        project: this.station.model.project,
        station: this.station.model.station,
        equipment: this.managementEquipment,
        signal: signal
      };
      signalKey = (_.values(filter)).join('.');
      filter.startTime = period.startTime;
      filter.endTime = period.endTime;
      paging = {
        page: page,
        pageItems: pageItems
      };
      sorting = {};
      sorting['startTime'] = 1;
      this.signalRecordsParameters = {
        signal: signal,
        startTime: period.startTime,
        endTime: period.endTime,
        queryTime: moment(),
        periodType: periodType,
        paging: paging,
        sorting: sorting
      };
      data = {
        filter: filter,
        fields: null,
        paging: paging,
        sorting: sorting
      };
      return this.reportingService.querySignalGroupRecords(data, (function(_this) {
        return function(err, records, paging2) {
          var m, svs;
          if (records.hasOwnProperty(signalKey)) {
            return _this.signalValues = records;
          } else {
            m = _this.station.model;
            svs = {};
            svs[signal.key] = {
              user: m.user,
              project: m.project,
              station: m.station,
              equipment: _this.managementEquipment,
              signal: signal,
              values: []
            };
            return _this.signalValues = svs;
          }
        };
      })(this));
    };

    Ctrl.prototype.nextPeriod = function() {
      var endTime, startTime;
      if (!this.period) {
        return this.getPeriod();
      }
      switch (this.period.type) {
        case '60minutes':
          startTime = this.period.endTime;
          endTime = moment(this.period.endTime).add(60, 'minutes');
          break;
        case 'hour':
          startTime = moment(this.period.startTime).add(1, 'hour').startOf('hour');
          endTime = moment(this.period.startTime).add(1, 'hour').endOf('hour');
          break;
        case 'day':
          startTime = moment(this.period.startTime).add(1, 'day').startOf('day');
          endTime = moment(this.period.startTime).add(1, 'day').endOf('day');
          break;
        case 'week':
          startTime = moment(this.period.startTime).add(1, 'week').startOf('week');
          endTime = moment(this.period.startTime).add(1, 'week').endOf('week');
          break;
        case 'month':
          startTime = moment(this.period.startTime).add(1, 'month').startOf('month');
          endTime = moment(this.period.startTime).add(1, 'month').endOf('month');
          break;
        case 'year':
          startTime = moment(this.period.startTime).add(1, 'year').startOf('year');
          endTime = moment(this.period.startTime).add(1, 'year').endOf('year');
          break;
        default:
          startTime = this.period.endTime;
          endTime = moment(this.period.endTime).add(60, 'minutes');
      }
      this.period.startTime = startTime;
      this.period.endTime = endTime;
      return this.period;
    };

    Ctrl.prototype.previousPeriod = function() {
      var endTime, startTime;
      if (!this.period) {
        return this.getPeriod();
      }
      switch (this.period.type) {
        case '60minutes':
          startTime = moment(this.period.startTime).subtract(60, 'minutes');
          endTime = this.period.startTime;
          break;
        case 'hour':
          startTime = moment(this.period.startTime).subtract(1, 'hour').startOf('hour');
          endTime = moment(this.period.startTime).subtract(1, 'hour').endOf('hour');
          break;
        case 'day':
          startTime = moment(this.period.startTime).subtract(1, 'day').startOf('day');
          endTime = moment(this.period.startTime).subtract(1, 'day').endOf('day');
          break;
        case 'week':
          startTime = moment(this.period.startTime).subtract(1, 'week').startOf('week');
          endTime = moment(this.period.startTime).subtract(1, 'week').endOf('week');
          break;
        case 'month':
          startTime = moment(this.period.startTime).subtract(1, 'month').startOf('month');
          endTime = moment(this.period.startTime).subtract(1, 'month').endOf('month');
          break;
        case 'year':
          startTime = moment(this.period.startTime).subtract(1, 'year').startOf('year');
          endTime = moment(this.period.startTime).subtract(1, 'year').endOf('year');
          break;
        default:
          startTime = moment(this.period.startTime).subtract(60, 'minutes');
          endTime = this.period.startTime;
      }
      this.period.startTime = startTime;
      this.period.endTime = endTime;
      return this.period;
    };

    Ctrl.prototype.getPeriod = function(type) {
      var endTime, startTime;
      if (type == null) {
        type = this.signalRecordType;
      }
      switch (type.type) {
        case 'now':
          startTime = moment().subtract(60, 'minutes');
          endTime = moment();
          break;
        case '60minutes':
          startTime = moment().subtract(60, 'minutes');
          endTime = moment();
          break;
        case 'hour':
          startTime = moment().startOf('hour');
          endTime = moment().endOf('hour');
          break;
        case 'day':
          startTime = moment().startOf('day');
          endTime = moment().endOf('day');
          break;
        case 'week':
          startTime = moment().startOf('week');
          endTime = moment().endOf('week');
          break;
        case 'month':
          startTime = moment().startOf('month');
          endTime = moment().endOf('month');
          break;
        case 'year':
          startTime = moment().startOf('year');
          endTime = moment().endOf('year');
          break;
        default:
          startTime = moment().subtract(60, 'minutes');
          endTime = moment();
      }
      return this.period = {
        startTime: startTime,
        endTime: endTime,
        type: type.type
      };
    };

    return Ctrl;

  })(base.GraphicBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
