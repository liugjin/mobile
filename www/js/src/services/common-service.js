
/*
* File: common-service
* User: David
* Date: 7/16/2018
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/services/service', 'clc.foundation.angular/live/signal-live-session', 'clc.foundation.angular/live/event-live-session', 'clc.foundation.angular/live/statistic-live-session', 'clc.foundation.angular/live/command-live-session', 'clc.foundation.angular/live/signal-statistic-live-session', 'clc.foundation.angular/live/configuration-live-session', 'underscore', 'rx', 'moment'], function(base, sls, els, esls, cls, ssls, confs, _, Rx, moment) {
  var CommonService, exports;
  CommonService = (function(_super) {
    __extends(CommonService, _super);

    function CommonService($rootScope, $http, modelEngine, liveService, reportingService, uploadService) {
      this.modelEngine = modelEngine;
      this.liveService = liveService;
      this.reportingService = reportingService;
      this.uploadService = uploadService;
      this.signalLiveSession = new sls.SignalLiveSession(this.liveService);
      this.eventLiveSession = new els.EventLiveSession(this.liveService);
      this.eventStatisticLiveSession = new esls.StatisticLiveSession(this.liveService);
      this.commandLiveSession = new cls.CommandLiveSession(this.liveService);
      this.signalStatisticLiveSession = new ssls.SignalStatisticLiveSession(this.liveService);
      this.configurationLiveSession = new confs.ConfigurationLiveSession(this.liveService);
      this.subscriptions = {};
      this.bus = new Rx.Subject;
      this.patterns = {};
      CommonService.__super__.constructor.call(this, $rootScope);
    }

    CommonService.prototype.loadProject = function(filter, fields, callback, refresh) {
      var model, project;
      if (!refresh) {
        project = this.$rootScope.project;
        model = project != null ? project.model : void 0;
        if (model && model.user === filter.user && model.project === filter.project) {
          return typeof callback === "function" ? callback(null, project) : void 0;
        }
      }
      return this.modelEngine.loadProject(filter, fields, (function(_this) {
        return function(err, project) {
          var n;
          if (err) {
            return;
          }
          _this.$rootScope.project = project;
          _this.$rootScope.myproject = {
            user: project.model.user,
            project: project.model.project
          };
          n = 0;
          return project != null ? project.loadTypeModels(function(err, data) {
            n++;
            if (n === _.keys(project.typeModels).length) {
              return typeof callback === "function" ? callback(err, project) : void 0;
            }
          }, refresh) : void 0;
        };
      })(this), refresh);
    };

    CommonService.prototype.loadStations = function(field, callback, refresh) {
      var _ref;
      return (_ref = this.$rootScope.project) != null ? _ref.loadStations(field, function(err, stations) {
        return callback(err, stations);
      }, refresh) : void 0;
    };

    CommonService.prototype.loadStationChildren = function(station, includeSelf) {
      var ret, sta, _i, _len, _ref;
      ret = [];
      if (includeSelf) {
        ret = [station];
      }
      _ref = station.stations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sta = _ref[_i];
        ret = ret.concat(this.loadStationChildren(sta, true));
      }
      return ret;
    };

    CommonService.prototype.loadStation = function(stationId, callback, refresh) {
      return this.loadStations(null, function(err, stations) {
        var station;
        if (err || stations.length < 1) {
          return callback(err);
        }
        station = _.find(stations, function(st) {
          return st.model.station === stationId;
        });
        return callback(err, station);
      }, refresh);
    };

    CommonService.prototype.loadEquipmentById = function(station, equipmentId, callback, refresh) {
      if (!station || !equipmentId) {
        return callback(null);
      }
      return station.loadEquipment(equipmentId, null, function(err, equip) {
        return callback(err, equip);
      }, refresh);
    };

    CommonService.prototype.loadEquipmentsByType = function(station, typeId, callback, refresh) {
      if (!station || !typeId) {
        return callback(null);
      }
      return station.loadEquipments({
        type: typeId
      }, null, function(err, equips) {
        return callback(err, equips);
      }, refresh);
    };

    CommonService.prototype.loadEquipmentsByTemplate = function(station, templateId, callback, refresh) {
      if (!station || !templateId) {
        return callback(null);
      }
      return station.loadEquipments({
        template: templateId
      }, null, function(err, equips) {
        return callback(err, equips);
      }, refresh);
    };

    CommonService.prototype.querySignalHistoryData = function(signal, startTime, endTime, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      filter = signal != null ? signal.getIds() : void 0;
      if (startTime) {
        filter.startTime = moment(startTime);
      }
      if (endTime) {
        filter.endTime = moment(endTime);
      }
      if (sorting == null) {
        sorting = {
          timestamp: 1
        };
      }
      return this.reportingService.querySignalRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.querySignalsHistoryData = function(signals, startTime, endTime, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      filter = this.$rootScope.project.getIds();
      filter["$or"] = _.map(signals, function(sig) {
        return {
          station: sig.equipment.model.station,
          equipment: sig.equipment.model.equipment,
          signal: sig.model.signal
        };
      });
      if (startTime) {
        filter.startTime = moment(startTime);
      }
      if (endTime) {
        filter.endTime = moment(endTime);
      }
      if (sorting == null) {
        sorting = {
          station: 1,
          equipment: 1,
          signal: 1,
          timestamp: 1
        };
      }
      return this.reportingService.querySignalGroupRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.querySignalStatisticData = function(signal, startTime, endTime, mode, callback, paging, sorting) {
      var filter;
      if (mode == null) {
        mode = "day";
      }
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      filter = signal != null ? signal.getIds() : void 0;
      filter.mode = mode;
      if (mode === "year") {
        filter.period = {
          $gte: moment(startTime).format("YYYY"),
          $lt: moment(endTime).format("YYYY-MM")
        };
      } else if (mode === "month") {
        filter.period = {
          $gte: moment(startTime).format("YYYY-MM"),
          $lt: moment(endTime).format("YYYY-MM-DD")
        };
      } else if (mode === "day") {
        filter.period = {
          $gte: moment(startTime).format("YYYY-MM-DD"),
          $lt: moment(endTime).format("YYYY-MM-DD HH")
        };
      } else if (mode === "hour") {
        filter.period = {
          $gte: moment(startTime).format("YYYY-MM-DD HH"),
          $lt: moment(endTime).format("YYYY-MM-DD HH:mm")
        };
      }
      if (sorting == null) {
        sorting = {
          timestamp: 1
        };
      }
      return this.reportingService.querySignalStatistics({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.querySignalsStatisticData = function(signals, startTime, endTime, mode, callback, paging, sorting) {
      var filter;
      if (mode == null) {
        mode = "day";
      }
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      if (!signals || signals.length < 1) {
        return typeof callback === "function" ? callback("no signals") : void 0;
      }
      filter = this.$rootScope.project.getIds();
      filter["$or"] = _.map(signals, function(sig) {
        return {
          station: sig.equipment.model.station,
          equipment: sig.equipment.model.equipment,
          signal: sig.model.signal
        };
      });
      filter.mode = mode;
      if (mode === "year") {
        filter.period = {
          $gte: moment(startTime).format("YYYY"),
          $lt: moment(endTime).format("YYYY-MM")
        };
      } else if (mode === "month") {
        filter.period = {
          $gte: moment(startTime).format("YYYY-MM"),
          $lt: moment(endTime).format("YYYY-MM-DD")
        };
      } else if (mode === "day") {
        filter.period = {
          $gte: moment(startTime).format("YYYY-MM-DD"),
          $lt: moment(endTime).format("YYYY-MM-DD HH")
        };
      } else if (mode === "hour") {
        filter.period = {
          $gte: moment(startTime).format("YYYY-MM-DD HH"),
          $lt: moment(endTime).format("YYYY-MM-DD HH:mm")
        };
      }
      if (sorting == null) {
        sorting = {
          station: 1,
          equipment: 1,
          signal: 1,
          timestamp: 1
        };
      }
      return this.reportingService.querySignalStatistics({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.queryEventRecords = function(event, startTime, endTime, severity, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      filter = event != null ? event.getIds() : void 0;
      if (startTime) {
        filter.startTime = moment(startTime).startOf("day");
      }
      if (endTime) {
        filter.endTime = moment(endTime).endOf("day");
      }
      if (severity) {
        filter.severity = severity;
      }
      if (sorting == null) {
        sorting = {
          startTime: 1
        };
      }
      return this.reportingService.queryEventRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.queryEventsRecords = function(events, startTime, endTime, severity, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      if (!signals || signals.length < 1) {
        return typeof callback === "function" ? callback("no signals") : void 0;
      }
      filter = this.$rootScope.project.getIds();
      filter["$or"] = _.map(events, function(evt) {
        return {
          station: evt.equipment.model.station,
          equipment: evt.equipment.model.equipment,
          event: evt.model.event
        };
      });
      if (startTime) {
        filter.startTime = moment(startTime).startOf("day");
      }
      if (endTime) {
        filter.endTime = moment(endTime).endOf("day");
      }
      if (severity) {
        filter.severity = severity;
      }
      if (sorting == null) {
        sorting = {
          station: 1,
          equipment: 1,
          event: 1,
          startTime: 1
        };
      }
      return this.reportingService.queryEventRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.queryCommandRecords = function(command, startTime, endTime, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      filter = command != null ? command.getIds() : void 0;
      if (startTime) {
        filter.startTime = moment(startTime).startOf("day");
      }
      if (endTime) {
        filter.endTime = moment(endTime).endOf("day");
      }
      if (sorting == null) {
        sorting = {
          startTime: 1
        };
      }
      return this.reportingService.queryCommandRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.queryCommandsRecords = function(commands, startTime, endTime, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      if (!signals || signals.length < 1) {
        return typeof callback === "function" ? callback("no signals") : void 0;
      }
      filter = this.$rootScope.project.getIds();
      filter["$or"] = _.map(commands, function(cmd) {
        return {
          station: cmd.equipment.model.station,
          equipment: cmd.equipment.model.equipment,
          command: cmd.model.command
        };
      });
      if (startTime) {
        filter.startTime = moment(startTime).startOf("day");
      }
      if (endTime) {
        filter.endTime = moment(endTime).endOf("day");
      }
      if (sorting == null) {
        sorting = {
          station: 1,
          equipment: 1,
          command: 1,
          startTime: 1
        };
      }
      return this.reportingService.queryCommandRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.queryEquipmentEventRecords = function(equipment, startTime, endTime, severity, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      filter = equipment != null ? equipment.getIds() : void 0;
      if (startTime) {
        filter.startTime = moment(startTime).startOf("day");
      }
      if (endTime) {
        filter.endTime = moment(endTime).endOf("day");
      }
      if (severity) {
        filter.severity = severity;
      }
      if (sorting == null) {
        sorting = {
          event: 1,
          startTime: 1
        };
      }
      return this.reportingService.queryEventRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.queryEquipmentCommandRecords = function(equipment, startTime, endTime, severity, callback, paging, sorting) {
      var filter;
      if (paging == null) {
        paging = null;
      }
      if (sorting == null) {
        sorting = null;
      }
      filter = equipment != null ? equipment.getIds() : void 0;
      if (startTime) {
        filter.startTime = moment(startTime).startOf("day");
      }
      if (endTime) {
        filter.endTime = moment(endTime).endOf("day");
      }
      if (sorting == null) {
        sorting = {
          command: 1,
          startTime: 1
        };
      }
      return this.reportingService.queryEventRecords({
        filter: filter,
        paging: paging,
        sorting: sorting
      }, function(err, records, pageInfo) {
        return typeof callback === "function" ? callback(err, records, pageInfo) : void 0;
      });
    };

    CommonService.prototype.subscribeSignalValue = function(signal, callback) {
      var filter, topic, _ref;
      if (!(signal != null ? (_ref = signal.model) != null ? _ref.signal : void 0 : void 0)) {
        return;
      }
      topic = "signal-values/" + signal.model.user + "/" + signal.model.project + "/" + signal.equipment.model.station + "/" + signal.equipment.model.equipment + "/" + signal.model.signal;
      if (this.subscriptions[topic] == null) {
        this.subscriptions[topic] = {
          count: 0,
          callbacks: [],
          dispose: (function(_this) {
            return function() {
              var cnt, _ref1, _ref2, _ref3, _ref4;
              cnt = eval("this.count");
              if ((_ref1 = _this.subscriptions[topic]) != null) {
                _ref1.callbacks[cnt] = null;
              }
              if ((_ref2 = _this.subscriptions[topic]) != null) {
                _ref2.count--;
              }
              if (((_ref3 = _this.subscriptions[topic]) != null ? _ref3.count : void 0) === 0) {
                if ((_ref4 = _this.subscriptions[topic].handler) != null) {
                  _ref4.dispose();
                }
                return delete _this.subscriptions[topic];
              }
            };
          })(this)
        };
      }
      this.subscriptions[topic].count++;
      this.subscriptions[topic].callbacks.push(callback);
      if (!this.subscriptions[topic].handler) {
        filter = {
          user: signal.model.user,
          project: signal.model.project,
          station: signal.equipment.model.station,
          equipment: signal.equipment.model.equipment,
          signal: signal.model.signal
        };
        this.subscriptions[topic].handler = this.signalLiveSession.subscribeValues(filter, (function(_this) {
          return function(err, d) {
            var _i, _len, _ref1, _ref2, _results;
            if (d.topic === topic) {
              signal.setValue(d.message);
            }
            _ref2 = (_ref1 = _this.subscriptions[d.topic]) != null ? _ref1.callbacks : void 0;
            _results = [];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              callback = _ref2[_i];
              _results.push(typeof callback === "function" ? callback(signal) : void 0);
            }
            return _results;
          };
        })(this));
      } else {
        if (typeof callback === "function") {
          callback(signal);
        }
      }
      return {
        count: this.subscriptions[topic].count - 1,
        dispose: this.subscriptions[topic].dispose
      };
    };

    CommonService.prototype.subscribeEquipmentSignalValues = function(equipment, callback) {
      var key, signal, signals, _i, _len, _ref;
      if (!(equipment != null ? (_ref = equipment.model) != null ? _ref.equipment : void 0 : void 0)) {
        return;
      }
      key = "signals_" + equipment.key;
      if (this.subscriptions[key] == null) {
        this.subscriptions[key] = {
          count: 0,
          callbacks: [],
          dispose: (function(_this) {
            return function() {
              var cnt, _ref1, _ref2, _ref3, _ref4;
              cnt = eval("this.count");
              if ((_ref1 = _this.subscriptions[key]) != null) {
                _ref1.callbacks[cnt] = null;
              }
              if ((_ref2 = _this.subscriptions[key]) != null) {
                _ref2.count--;
              }
              if (((_ref3 = _this.subscriptions[key]) != null ? _ref3.count : void 0) === 0) {
                if ((_ref4 = _this.subscriptions[key].handler) != null) {
                  _ref4.dispose();
                }
                return delete _this.subscriptions[key];
              }
            };
          })(this)
        };
      }
      this.subscriptions[key].count++;
      this.subscriptions[key].callbacks.push(callback);
      if (!this.subscriptions[key].handler) {
        equipment.loadSignals(null, (function(_this) {
          return function(err, signals) {
            var filter, _ref1;
            filter = {
              user: equipment.model.user,
              project: equipment.model.project,
              station: equipment.model.station,
              equipment: equipment.model.equipment
            };
            if (_this.subscriptions[key]) {
              if ((_ref1 = _this.subscriptions[key].handler) != null) {
                _ref1.dispose();
              }
              return _this.subscriptions[key].handler = _this.signalLiveSession.subscribeValues(filter, function(err, d) {
                var signal, _i, _len, _ref2, _ref3, _results;
                signal = _.find(equipment.signals.items, function(sig) {
                  return "signal-values/" + sig.model.user + "/" + sig.model.project + "/" + sig.equipment.model.station + "/" + sig.equipment.model.equipment + "/" + sig.model.signal === d.topic;
                });
                if (signal) {
                  signal.setValue(d.message);
                  _ref3 = (_ref2 = _this.subscriptions["signals_" + signal.equipment.key]) != null ? _ref2.callbacks : void 0;
                  _results = [];
                  for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                    callback = _ref3[_i];
                    _results.push(typeof callback === "function" ? callback(signal) : void 0);
                  }
                  return _results;
                }
              });
            }
          };
        })(this));
      } else {
        signals = _.filter(equipment.signals.items, function(sig) {
          var _ref1;
          return ((_ref1 = sig.data) != null ? _ref1.value : void 0) != null;
        });
        for (_i = 0, _len = signals.length; _i < _len; _i++) {
          signal = signals[_i];
          if (typeof callback === "function") {
            callback(signal);
          }
        }
      }
      return {
        count: this.subscriptions[key].count - 1,
        dispose: this.subscriptions[key].dispose
      };
    };

    CommonService.prototype.subscribeEventValue = function(event, callback) {
      var filter, topic, _ref;
      if (!(event != null ? (_ref = event.model) != null ? _ref.event : void 0 : void 0)) {
        return;
      }
      topic = "event-values/" + event.model.user + "/" + event.model.project + "/" + event.equipment.model.station + "/" + event.equipment.model.equipment + "/" + event.model.event;
      if (this.subscriptions[topic] == null) {
        this.subscriptions[topic] = {
          count: 0,
          callbacks: [],
          dispose: (function(_this) {
            return function() {
              var cnt, _ref1, _ref2, _ref3, _ref4;
              cnt = eval("this.count");
              if ((_ref1 = _this.subscriptions[topic]) != null) {
                _ref1.callbacks[cnt] = null;
              }
              if ((_ref2 = _this.subscriptions[topic]) != null) {
                _ref2.count--;
              }
              if (((_ref3 = _this.subscriptions[topic]) != null ? _ref3.count : void 0) === 0) {
                if ((_ref4 = _this.subscriptions[topic].handler) != null) {
                  _ref4.dispose();
                }
                return delete _this.subscriptions[topic];
              }
            };
          })(this)
        };
      }
      this.subscriptions[topic].count++;
      this.subscriptions[topic].callbacks.push(callback);
      if (!this.subscriptions[topic].handler) {
        filter = {
          user: event.model.user,
          project: event.model.project,
          station: event.equipment.model.station,
          equipment: event.equipment.model.equipment,
          event: event.model.event
        };
        this.subscriptions[topic].handler = this.eventLiveSession.subscribeValues(filter, (function(_this) {
          return function(err, d) {
            var _i, _len, _ref1, _ref2, _results;
            if (d.topic === topic) {
              event.setValue(d.message);
            }
            _ref2 = (_ref1 = _this.subscriptions[d.topic]) != null ? _ref1.callbacks : void 0;
            _results = [];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              callback = _ref2[_i];
              _results.push(typeof callback === "function" ? callback(event) : void 0);
            }
            return _results;
          };
        })(this));
      } else {
        if (typeof callback === "function") {
          callback(event);
        }
      }
      return {
        count: this.subscriptions[topic].count - 1,
        dispose: this.subscriptions[topic].dispose
      };
    };

    CommonService.prototype.subscribeEquipmentEventValues = function(equipment, callback) {
      var event, events, key, _i, _len, _ref;
      if (!(equipment != null ? (_ref = equipment.model) != null ? _ref.equipment : void 0 : void 0)) {
        return;
      }
      key = "events_" + equipment.key;
      if (this.subscriptions[key] == null) {
        this.subscriptions[key] = {
          count: 0,
          callbacks: [],
          dispose: (function(_this) {
            return function() {
              var cnt, _ref1, _ref2, _ref3, _ref4;
              cnt = eval("this.count");
              if ((_ref1 = _this.subscriptions[key]) != null) {
                _ref1.callbacks[cnt] = null;
              }
              if ((_ref2 = _this.subscriptions[key]) != null) {
                _ref2.count--;
              }
              if (((_ref3 = _this.subscriptions[key]) != null ? _ref3.count : void 0) === 0) {
                if ((_ref4 = _this.subscriptions[key].handler) != null) {
                  _ref4.dispose();
                }
                return delete _this.subscriptions[key];
              }
            };
          })(this)
        };
      }
      this.subscriptions[key].count++;
      this.subscriptions[key].callbacks.push(callback);
      if (!this.subscriptions[key].handler) {
        equipment.loadEvents(null, (function(_this) {
          return function(err, events) {
            var filter, _ref1;
            filter = {
              user: equipment.model.user,
              project: equipment.model.project,
              station: equipment.model.station,
              equipment: equipment.model.equipment
            };
            if (_this.subscriptions[key]) {
              if ((_ref1 = _this.subscriptions[key].handler) != null) {
                _ref1.dispose();
              }
              return _this.subscriptions[key].handler = _this.eventLiveSession.subscribeValues(filter, function(err, d) {
                var event, _i, _len, _ref2, _ref3, _results;
                event = _.find(equipment.events.items, function(evt) {
                  return "event-values/" + evt.model.user + "/" + evt.model.project + "/" + evt.equipment.model.station + "/" + evt.equipment.model.equipment + "/" + evt.model.event === d.topic;
                });
                if (event) {
                  event.setValue(d.message);
                  _ref3 = (_ref2 = _this.subscriptions["events_" + event.equipment.key]) != null ? _ref2.callbacks : void 0;
                  _results = [];
                  for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                    callback = _ref3[_i];
                    _results.push(typeof callback === "function" ? callback(event) : void 0);
                  }
                  return _results;
                }
              });
            }
          };
        })(this));
      } else {
        events = _.filter(equipment.events.items, function(evt) {
          var _ref1, _ref2;
          return (_ref1 = (_ref2 = evt.data) != null ? _ref2.phase : void 0) === "start" || _ref1 === "comfirm";
        });
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          if (typeof callback === "function") {
            callback(event);
          }
        }
      }
      return {
        count: this.subscriptions[key].count - 1,
        dispose: this.subscriptions[key].dispose
      };
    };

    CommonService.prototype.subscribeCommandValue = function(command, callback) {
      var filter, topic, _ref;
      if (!(command != null ? (_ref = command.model) != null ? _ref.command : void 0 : void 0)) {
        return;
      }
      topic = "command-values/" + command.model.user + "/" + command.model.project + "/" + command.equipment.model.station + "/" + command.equipment.model.equipment + "/" + command.model.command;
      if (this.subscriptions[topic] == null) {
        this.subscriptions[topic] = {
          count: 0,
          callbacks: [],
          dispose: (function(_this) {
            return function() {
              var cnt, _ref1, _ref2, _ref3, _ref4;
              cnt = eval("this.count");
              if ((_ref1 = _this.subscriptions[topic]) != null) {
                _ref1.callbacks[cnt] = null;
              }
              if ((_ref2 = _this.subscriptions[topic]) != null) {
                _ref2.count--;
              }
              if (((_ref3 = _this.subscriptions[topic]) != null ? _ref3.count : void 0) === 0) {
                if ((_ref4 = _this.subscriptions[topic].handler) != null) {
                  _ref4.dispose();
                }
                return delete _this.subscriptions[topic];
              }
            };
          })(this)
        };
      }
      this.subscriptions[topic].count++;
      this.subscriptions[topic].callbacks.push(callback);
      if (!this.subscriptions[topic].handler) {
        filter = {
          user: command.model.user,
          project: command.model.project,
          station: command.equipment.model.station,
          equipment: command.equipment.model.equipment,
          command: command.model.command
        };
        this.subscriptions[topic].handler = this.commandLiveSession.subscribeValues(filter, (function(_this) {
          return function(err, d) {
            var _i, _len, _ref1, _ref2, _results;
            if (d.topic === topic) {
              command.setValue(d.message);
            }
            _ref2 = (_ref1 = _this.subscriptions[d.topic]) != null ? _ref1.callbacks : void 0;
            _results = [];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              callback = _ref2[_i];
              _results.push(typeof callback === "function" ? callback(command) : void 0);
            }
            return _results;
          };
        })(this));
      } else {
        if (typeof callback === "function") {
          callback(command);
        }
      }
      return {
        count: this.subscriptions[topic].count - 1,
        dispose: this.subscriptions[topic].dispose
      };
    };

    CommonService.prototype.subscribeEquipmentCommandValues = function(equipment, callback) {
      var command, commands, key, _i, _len, _ref;
      if (!(equipment != null ? (_ref = equipment.model) != null ? _ref.equipment : void 0 : void 0)) {
        return;
      }
      key = "commands_" + equipment.key;
      if (this.subscriptions[key] == null) {
        this.subscriptions[key] = {
          count: 0,
          callbacks: [],
          dispose: (function(_this) {
            return function() {
              var cnt, _ref1, _ref2, _ref3, _ref4;
              cnt = eval("this.count");
              if ((_ref1 = _this.subscriptions[key]) != null) {
                _ref1.callbacks[cnt] = null;
              }
              if ((_ref2 = _this.subscriptions[key]) != null) {
                _ref2.count--;
              }
              if (((_ref3 = _this.subscriptions[key]) != null ? _ref3.count : void 0) === 0) {
                if ((_ref4 = _this.subscriptions[key].handler) != null) {
                  _ref4.dispose();
                }
                return delete _this.subscriptions[key];
              }
            };
          })(this)
        };
      }
      this.subscriptions[key].count++;
      this.subscriptions[key].callbacks.push(callback);
      if (!this.subscriptions[key].handler) {
        equipment.loadCommands(null, (function(_this) {
          return function(err, commands) {
            var filter, _ref1;
            filter = {
              user: equipment.model.user,
              project: equipment.model.project,
              station: equipment.model.station,
              equipment: equipment.model.equipment
            };
            if (_this.subscriptions[key]) {
              if ((_ref1 = _this.subscriptions[key].handler) != null) {
                _ref1.dispose();
              }
              return _this.subscriptions[key].handler = _this.commandLiveSession.subscribeValues(filter, function(err, d) {
                var command, _i, _len, _ref2, _ref3, _results;
                command = _.find(equipment.commands.items, function(cmd) {
                  return "command-values/" + cmd.model.user + "/" + cmd.model.project + "/" + cmd.equipment.model.station + "/" + cmd.equipment.model.equipment + "/" + cmd.model.command === d.topic;
                });
                if (command) {
                  command.setValue(d.message);
                  _ref3 = (_ref2 = _this.subscriptions["commands_" + command.equipment.key]) != null ? _ref2.callbacks : void 0;
                  _results = [];
                  for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                    callback = _ref3[_i];
                    _results.push(typeof callback === "function" ? callback(command) : void 0);
                  }
                  return _results;
                }
              });
            }
          };
        })(this));
      } else {
        commands = _.filter(equipment.commands.items, function(cmd) {
          var _ref1, _ref2;
          return (_ref1 = (_ref2 = cmd.data) != null ? _ref2.phase : void 0) === "complete" || _ref1 === "error" || _ref1 === "timeout";
        });
        for (_i = 0, _len = commands.length; _i < _len; _i++) {
          command = commands[_i];
          if (typeof callback === "function") {
            callback(command);
          }
        }
      }
      return {
        count: this.subscriptions[key].count - 1,
        dispose: this.subscriptions[key].dispose
      };
    };

    CommonService.prototype.executeCommand = function(command, comment) {
      var data, model, parameters;
      model = command.model;
      parameters = command.getParameterValues();
      data = command.getIds();
      data.priority = model.priority;
      data.phase = 'executing';
      data.parameters = parameters;
      data.startTime = new Date;
      data.endTime = null;
      data.result = null;
      data.trigger = 'user';
      data.operator = this.$rootScope.user.user;
      data.operatorName = this.$rootScope.user.name;
      data.comment = comment != null ? comment : model.comment;
      return this.commandLiveSession.executeCommand(data);
    };

    CommonService.prototype.cancelCommand = function(command, comment) {
      var data, k, v, _ref;
      if (!command._data) {
        return;
      }
      data = {};
      _ref = command._data;
      for (k in _ref) {
        v = _ref[k];
        data[k] = v;
      }
      data.phase = 'cancel';
      data.trigger = 'user';
      data.endTime = new Date;
      data.operator = this.$rootScope.user.user;
      data.operatorName = this.$rootScope.user.name;
      data.comment = comment != null ? comment : command.model.comment;
      return this.commandLiveSession.executeCommand(data);
    };

    CommonService.prototype.publishEventBus = function(topic, message) {
      return this.bus.onNext({
        topic: topic,
        message: message
      });
    };

    CommonService.prototype.subscribeEventBus = function(topic, callback, throttle) {
      var subject;
      subject = this.bus.where((function(_this) {
        return function(d) {
          return _this.matchTopic(topic, d.topic);
        };
      })(this));
      if (throttle) {
        subject = subject.throttle(throttle);
      }
      return subject.subscribe(callback);
    };

    CommonService.prototype.matchTopic = function(pattern, topic) {
      var expression, regex;
      regex = this.patterns[pattern];
      if (!regex) {
        expression = pattern.replace(/\+/g, '[^\/]+').replace(/#$/, '.+') + '$';
        regex = new RegExp(expression);
        this.patterns[pattern] = regex;
      }
      return regex.test(topic);
    };

    CommonService.prototype.loadProjectModelByService = function(name, filter, fields, callback, refresh) {
      if (filter == null) {
        filter = {};
      }
      filter.user = this.$rootScope.project.model.user;
      filter.project = this.$rootScope.project.model.project;
      return this.loadModelByService(name, filter, fields, callback, refresh);
    };

    CommonService.prototype.loadModelByService = function(name, filter, fields, callback, refresh) {
      var service;
      service = this.modelEngine.modelManager.getService(name);
      return service.query(filter, fields, callback, refresh);
    };

    return CommonService;

  })(base.Service);
  return exports = {
    CommonService: CommonService
  };
});
