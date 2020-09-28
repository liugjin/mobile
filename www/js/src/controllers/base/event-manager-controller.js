
/*
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./feature-base-controller', 'moment', 'underscore', '../../models/paging-model', 'rx'], function(base, moment, _, pm, rx) {
  var ALL_EVENT_STATISTIC, EVENT_COMPLETED, EventManagerController, exports;
  EVENT_COMPLETED = 'completed';
  ALL_EVENT_STATISTIC = 'event-statistic/all';
  EventManagerController = (function(_super) {
    __extends(EventManagerController, _super);

    function EventManagerController($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) {
      EventManagerController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.selectAllEquipmentTypes();
      this.loadEventNotificationSetting();
    }

    EventManagerController.prototype.load = function(callback, refresh) {
      return EventManagerController.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          _this.initializeStatistic();
          _this.initializeEvents();
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    EventManagerController.prototype.dispose = function() {
      var _ref;
      EventManagerController.__super__.dispose.apply(this, arguments);
      this.saveEventNotificationSetting();
      return (_ref = this.eventSubject) != null ? _ref.dispose() : void 0;
    };

    EventManagerController.prototype.initializeEvents = function() {
      this.endColor = 'grey';
      this.eventRecords = new pm.PagingModel({
        predicate: 'name',
        reverse: false
      });
      this.eventRecordsParameters = {};
      this.eventSubject = new rx.Subject;
      this.eventSubject.sample(this.options.statisticPeriod || 1000).subscribe((function(_this) {
        return function(d) {
          return _this.statisticEvents();
        };
      })(this));
      this.eventExpectedDuration = 3600000;
      this.events = {};
      this.eventItems = [];
      this.startEvents = {};
      this.subscribeEvents();
      this.updateDuration();
      return this.eventStatisticSetting = {
        title: "站点告警",
        subTitle: '按告警状态类型统计',
        severities: this.project.typeModels.eventseverities.items
      };
    };

    EventManagerController.prototype.predicateStationEvent = function(event) {
      if (!event) {
        return false;
      }
      if (!this.station) {
        return true;
      }
      return this.station.containsStation(event.station);
    };

    EventManagerController.prototype.subscribeEvents = function() {
      var filter, _ref;
      filter = {
        user: this.project.model.user,
        project: this.project.model.project
      };
      if ((_ref = this.eventSubscriptions) != null) {
        _ref.dispose();
      }
      return this.eventSubscriptions = this.eventLiveSession.subscribeValues(filter, (function(_this) {
        return function(err, d) {
          return _this.processEvent(d);
        };
      })(this));
    };

    EventManagerController.prototype.processEvent = function(data) {
      var event, k, key, message, v;
      if (!data) {
        return;
      }
      message = data.message;
      key = "" + message.user + "." + message.project + "." + message.station + "." + message.equipment + "." + message.event + "." + message.severity + "." + message.startTime;
      if (this.events.hasOwnProperty(key)) {
        event = this.events[key];
        for (k in message) {
          v = message[k];
          event[k] = v;
        }
        if (event.endTime) {
          delete this.startEvents[key];
        }
      } else {
        event = angular.copy(message);
        this.events[key] = event;
        this.eventItems.push(event);
        this.addItem(event);
        this.stationEvents.addItem(event);
        if (!event.endTime) {
          this.startEvents[key] = event;
        }
      }
      this.decorateEvent(event);
      if (message.phase === 'completed') {
        event = this.events[key];
        delete this.events[key];
        this.eventItems.splice(this.eventItems.indexOf(event), 1);
        this.removeItem(event);
        this.stationEvents.removeItem(event);
        delete this.startEvents[key];
      }
      this.eventSubject.onNext(event);
      return event;
    };

    EventManagerController.prototype.decorateEvent = function(event) {
      var endTime, _ref, _ref1, _ref2, _ref3, _ref4;
      event.updateTime = (_ref = (_ref1 = event.endTime) != null ? _ref1 : event.confirmTime) != null ? _ref : event.startTime;
      event.eventSeverity = (_ref2 = this.project.typeModels.eventseverities.getItem(event.severity)) != null ? _ref2.model : void 0;
      event.color = (_ref3 = (_ref4 = event.eventSeverity) != null ? _ref4.color : void 0) != null ? _ref3 : this.endColor;
      endTime = event.endTime ? new Date(event.endTime) : new Date;
      event.duration = endTime - new Date(event.startTime);
      event.startTime2 = new Date(event.startTime);
      return event;
    };

    EventManagerController.prototype.filterEvent = function() {
      return (function(_this) {
        return function(event) {
          if (_this.statisticLegends[event.phase] === false || _this.statisticLegends[event.severity] === false) {
            return false;
          }
          if (_this.eventType && _this.eventType.model.type !== event.eventType) {
            return false;
          }
          if (_this.equipmentTypesCount && !_this.equipmentTypes.hasOwnProperty(event.equipmentType)) {
            return false;
          }
          return _this.stationEvents.filter(_this.search, ['event', 'name', 'title', 'stationName', 'equipmentName'], true)(event);
        };
      })(this);
    };

    EventManagerController.prototype.selectEventType = function(type) {
      return this.eventType = type;
    };

    EventManagerController.prototype.selectEvent = function(event) {
      if (this.event === event) {
        return false;
      }
      this.event = event;
      this.queryEventRecords(event);
      return true;
    };

    EventManagerController.prototype.updateDuration = function() {
      var timer;
      timer = this.$interval((function(_this) {
        return function() {
          var event, key, progress, _ref, _results;
          _ref = _this.startEvents;
          _results = [];
          for (key in _ref) {
            event = _ref[key];
            event.duration = new Date() - event.startTime2;
            progress = (event.duration / _this.eventExpectedDuration * 100).toFixed(1);
            _results.push(event.progress = "" + progress + "%");
          }
          return _results;
        };
      })(this), 1000);
      return this.addHandle({
        dispose: (function(_this) {
          return function() {
            return _this.$interval.cancel(timer);
          };
        })(this)
      });
    };

    EventManagerController.prototype.subscribeEventStatistic = function() {
      var filter, _ref;
      filter = {
        user: this.project.model.user,
        project: this.project.model.project
      };
      if ((_ref = this.statisticSubscription) != null) {
        _ref.dispose();
      }
      return this.statisticSubscription = this.statisticLiveSession.subscribeValues(filter, (function(_this) {
        return function(err, d) {
          return _this.eventStatistic = d != null ? d.message : void 0;
        };
      })(this));
    };

    EventManagerController.prototype.getPeriod = function(type) {
      var endTime, startTime;
      if (type == null) {
        type = this.eventRecordType;
      }
      switch (type.type) {
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

    EventManagerController.prototype.nextPeriod = function() {
      var endTime, startTime;
      if (!this.period) {
        return getPeriod();
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
      return this.period = {
        startTime: startTime,
        endTime: endTime,
        type: this.period.type
      };
    };

    EventManagerController.prototype.previousPeriod = function() {
      var endTime, startTime;
      if (!this.period) {
        return getPeriod();
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
      return this.period = {
        startTime: startTime,
        endTime: endTime,
        type: this.period.type
      };
    };

    EventManagerController.prototype.queryEventRecords = function(event, periodType, page, pageItems) {
      var data, filter, paging, period, sorting, _ref;
      if (page == null) {
        page = 1;
      }
      if (pageItems == null) {
        pageItems = 20;
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
          period = this.getPeriod();
      }
      filter = {
        user: event.user,
        project: event.project,
        station: event.station,
        equipment: event.equipment,
        event: event.event,
        startTime: period.startTime,
        endTime: period.endTime
      };
      paging = {
        page: page,
        pageItems: pageItems
      };
      sorting = {};
      sorting[this.stationEvents.predicate] = this.stationEvents.reverse ? -1 : 1;
      this.eventRecordsParameters = {
        event: event,
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
      return this.reportingService.queryEventRecords(data, (function(_this) {
        return function(err, records, paging2) {
          var _i, _j, _len, _ref1, _results;
          if (records) {
            for (_i = 0, _len = records.length; _i < _len; _i++) {
              event = records[_i];
              _this.decorateEvent(event);
            }
          }
          _this.eventRecords.setItems(records);
          if (paging2 != null) {
            paging2.pages = (function() {
              _results = [];
              for (var _j = 1, _ref1 = paging2.pageCount; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; 1 <= _ref1 ? _j++ : _j--){ _results.push(_j); }
              return _results;
            }).apply(this);
          }
          return _this.eventRecordsParameters.paging = paging2;
        };
      })(this));
    };

    EventManagerController.prototype.queryEventPage = function(page) {
      var paging, _ref;
      paging = (_ref = this.eventRecordsParameters) != null ? _ref.paging : void 0;
      if (!paging) {
        return;
      }
      if (page === 'next') {
        page = paging.page + 1;
      } else if (page === 'previous') {
        page = paging.page - 1;
      }
      if (page > paging.pageCount || page < 1) {
        return;
      }
      return this.queryEventRecords(this.eventRecordsParameters.event, this.eventRecordsParameters.periodType, page, paging.pageItems);
    };

    EventManagerController.prototype.initializeStatistic = function() {
      this.calendarTypes = [
        {
          type: 'day',
          name: '24小时事件日历'
        }, {
          type: 'week',
          name: '7天事件日历'
        }, {
          type: 'month',
          name: '月度事件日历'
        }, {
          type: 'year',
          name: '年度事件日历'
        }
      ];
      this.selectCalendarType(this.calendarTypes[0]);
      this.valueTypes = [
        {
          type: 'max',
          name: '最高事件等级'
        }, {
          type: 'unconfirm',
          name: '未确认事件总数'
        }, {
          type: 'start',
          name: '未结束事件总数'
        }, {
          type: 'active',
          name: '活动事件总数'
        }
      ];
      this.selectValueType(this.valueTypes[0]);
      this.eventRecordTypes = [
        {
          type: '60minutes',
          name: '60分钟事件记录'
        }, {
          type: 'hour',
          name: '小时事件记录'
        }, {
          type: 'day',
          name: '今日事件记录'
        }, {
          type: 'week',
          name: '本周事件记录'
        }, {
          type: 'month',
          name: '本月事件记录'
        }, {
          type: 'year',
          name: '本年事件记录'
        }
      ];
      this.selectEventRecordType(this.eventRecordTypes[2]);
      this.statisticLegends = {};
      return this.subscribeEventBus('event-statistic-phase-severity', (function(_this) {
        return function(d) {
          var k, v, _ref;
          _ref = d.message.data.legends;
          for (k in _ref) {
            v = _ref[k];
            _this.statisticLegends[k] = v;
          }
        };
      })(this));
    };

    EventManagerController.prototype.selectValueType = function(type) {
      if (type == null) {
        type = this.valueType;
      }
      this.valueType = type;
      return this.setHeatmapOptions();
    };

    EventManagerController.prototype.selectCalendarType = function(type) {
      if (type == null) {
        type = this.calendarType;
      }
      this.calendarType = type;
      return this.setHeatmapOptions();
    };

    EventManagerController.prototype.selectEventRecordType = function(type) {
      if (type == null) {
        type = this.eventRecordType;
      }
      return this.eventRecordType = type;
    };

    EventManagerController.prototype.setHeatmapOptions = function() {
      var data, legend, max, min, options, quantity, step;
      min = 0;
      max = 10;
      data = this.createMockData(min, max);
      options = {
        cellSize: 35,
        cellPadding: 5,
        domainMargin: 5,
        domainGutter: 20,
        legendCellSize: 20,
        highlight: ['now'],
        start: new Date,
        legendColors: {
          empty: "#ededed",
          min: "#40ffd8",
          max: "#f20013"
        },
        tooltip: false,
        legendTitleFormat: {
          lower: "< {min}",
          inner: "[{down}, {up}]",
          upper: "> {max}"
        },
        subDomainTitleFormat: {
          empty: "{date}",
          filled: "{count} @ {date}"
        },
        subDomainDateFormat: "%Y-%m-%d",
        subDomainTextFormat: '%d',
        domainLabelFormat: "%Y-%m-%d",
        data: data
      };
      switch (this.calendarType.type) {
        case 'day':
          options.domain = 'day';
          options.subDomain = 'hour';
          options.subDomainTextFormat = "%H";
          options.subDomainDateFormat = "%Y-%m-%d %Hh";
          options.domainLabelFormat = "%Y-%m-%d";
          break;
        case 'week':
          options.domain = 'week';
          options.subDomain = 'day';
          options.domainGutter = 40;
          min = min * 24;
          max = max * 24;
          break;
        case 'month':
          options.domain = 'month';
          options.subDomain = 'x_day';
          min = min * 24;
          max = max * 24;
          break;
        case 'year':
          options.domain = 'year';
          options.subDomain = 'month';
          options.subDomainTextFormat = "%m";
          options.subDomainDateFormat = "%Y-%m";
          options.domainLabelFormat = "%Y-%m-%d";
          min = min * 24 * 30;
          max = max * 24 * 30;
          break;
        default:
          options.domain = 'day';
          options.subDomain = 'hour';
      }
      quantity = 5;
      step = Math.floor(max / quantity);
      legend = _.range(min + step, max, step);
      options.legend = legend;
      return this.heatmapOptions = options;
    };

    EventManagerController.prototype.createMockData = function(min, max) {
      var count, data, i, now, timestamp, _i;
      if (min == null) {
        min = 0;
      }
      if (max == null) {
        max = 10;
      }
      data = {};
      now = moment().startOf('hour');
      count = 24 * 365 * 3;
      for (i = _i = 0; 0 <= count ? _i < count : _i > count; i = 0 <= count ? ++_i : --_i) {
        timestamp = now.subtract(1, 'hours').unix();
        data[timestamp] = this.getRandomInt(min, max);
      }
      return data;
    };

    EventManagerController.prototype.selectDate = function() {
      return (function(_this) {
        return function(date, value) {
          return _this.selectedDate = {
            date: date,
            value: value
          };
        };
      })(this);
    };

    EventManagerController.prototype.initializeStationEvents = function() {
      var event, key, _ref;
      if (this.stationEvents) {
        this.stationEvents.setItems([]);
      } else {
        this.stationEvents = new pm.PagingModel({
          predicate: 'startTime',
          reverse: false
        });
        this.stationEvents.predicateItem = (function(_this) {
          return function(event) {
            return _this.predicateStationEvent(event);
          };
        })(this);
      }
      _ref = this.events;
      for (key in _ref) {
        event = _ref[key];
        this.stationEvents.addItem(event);
      }
      return this.stationEvents;
    };

    EventManagerController.prototype.selectStation = function(station) {
      if (!EventManagerController.__super__.selectStation.call(this, station)) {
        return;
      }
      this.selectAllEquipmentTypes();
      this.initializeStationEvents();
      this.statisticStationEvents();
      return true;
    };

    EventManagerController.prototype.statisticStationEvents = function() {
      var event, statistic, _i, _len, _ref;
      statistic = this.getStatistic();
      _ref = this.stationEvents.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        switch (event.phase) {
          case 'start':
            statistic.counts.startEvents++;
            break;
          case 'confirm':
            statistic.counts.confirmedEvents++;
            break;
          case 'end':
            statistic.counts.endEvents++;
            break;
          default:
            continue;
        }
        statistic.counts.allEvents++;
        if (statistic.severities.hasOwnProperty(event.severity)) {
          statistic.severities[event.severity] += 1;
        } else {
          statistic.severities[event.severity] = 1;
        }
        if (event.severity > statistic.severity) {
          statistic.severity = event.severity;
        }
      }
      return this.eventStatistic = statistic;
    };

    EventManagerController.prototype.getEventColor = function(severity) {
      var color, _ref, _ref1;
      return color = (_ref = this.project) != null ? (_ref1 = _ref.dictionary.eventseverities.getItem(severity)) != null ? _ref1.model.color : void 0 : void 0;
    };

    EventManagerController.prototype.statisticEvents = function() {
      var all, datacenter, datacenterCounts, datacenterSeverities, datacenterStatistic, event, k, key, station, stationCounts, stationSeverities, stationStatistic, statistic, statisticType, type, v, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      all = this.getStatistic();
      this.statistics = {};
      this.statistics[ALL_EVENT_STATISTIC] = all;
      _ref = this.events;
      for (key in _ref) {
        event = _ref[key];
        if (!(event.phase !== EVENT_COMPLETED)) {
          continue;
        }
        key = "event-statistic/" + event.user + "/" + event.project + "/" + event.station;
        statistic = this.statistics[key];
        if (!statistic) {
          statistic = this.getStatistic();
          this.statistics[key] = statistic;
        }
        switch (event.phase) {
          case 'start':
            all.counts.startEvents++;
            statistic.counts.startEvents++;
            break;
          case 'end':
            all.endEvents++;
            statistic.counts.endEvents++;
            break;
          case 'confirm':
            all.confirmedEvents++;
            statistic.counts.confirmedEvents++;
        }
        if (statistic.severities.hasOwnProperty(event.severity)) {
          statistic.severities[event.severity] += 1;
        } else {
          statistic.severities[event.severity] = 1;
        }
        if (all.severities.hasOwnProperty(event.severity)) {
          all.severities[event.severity] += 1;
        } else {
          all.severities[event.severity] = 1;
        }
        if (statistic.severity < event.severity) {
          statistic.severity = event.severity;
        }
        all.counts.allEvents++;
        statistic.counts.allEvents++;
        if (statistic.types == null) {
          statistic.types = {};
        }
        type = event.equipmentType;
        if (statistic.types.hasOwnProperty(type)) {
          statisticType = statistic.types[type];
          statisticType.count++;
          if (event.severity > statisticType.severity) {
            statisticType.severity = event.severity;
          }
        } else {
          statistic.types[type] = {
            name: (_ref1 = _.find(this.project.dictionary.equipmenttypes.items, function(tp) {
              return tp.key === type;
            })) != null ? _ref1.model.name : void 0,
            type: type,
            count: 1,
            severity: event.severity
          };
        }
      }
      _ref2 = this.project.stations.items;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        station = _ref2[_i];
        key = "event-statistic/" + station.model.user + "/" + station.model.project + "/" + station.model.station;
        station.statistic = (_ref3 = this.statistics[key]) != null ? _ref3 : this.getStatistic();
      }
      _ref4 = this.datacenters;
      for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
        datacenter = _ref4[_j];
        datacenterStatistic = datacenter.statistic;
        datacenterCounts = datacenterStatistic.counts;
        datacenterSeverities = datacenterStatistic.severities;
        if (datacenterStatistic.types == null) {
          datacenterStatistic.types = {};
        }
        _ref5 = datacenter.stations;
        for (_k = 0, _len2 = _ref5.length; _k < _len2; _k++) {
          station = _ref5[_k];
          stationStatistic = station.statistic;
          stationCounts = stationStatistic.counts;
          datacenterCounts.startEvents += stationCounts.startEvents;
          datacenterCounts.endEvents += stationCounts.endEvents;
          datacenterCounts.confirmedEvents += stationCounts.confirmedEvents;
          datacenterCounts.allEvents += stationCounts.allEvents;
          stationSeverities = stationStatistic.severities;
          for (k in stationSeverities) {
            v = stationSeverities[k];
            datacenterSeverities[k] = ((_ref6 = datacenterSeverities[k]) != null ? _ref6 : 0) + v;
          }
          if (datacenterStatistic.severity < stationStatistic.severity) {
            datacenterStatistic.severity = stationStatistic.severity;
          }
          _ref7 = stationStatistic.types;
          for (key in _ref7) {
            type = _ref7[key];
            if (datacenterStatistic.types.hasOwnProperty(type.type)) {
              statisticType = datacenterStatistic.types[type.type];
              statisticType.count += type.count;
              if (type.severity > statisticType.severity) {
                statisticType.severity = type.severity;
              }
            } else {
              datacenterStatistic.types[type.type] = {
                type: type.type,
                count: type.count,
                severity: type.severity
              };
            }
          }
        }
      }
      this.eventStatistic = this.station.statistic;
    };

    EventManagerController.prototype.getStatistic = function() {
      var statistic;
      return statistic = {
        counts: {
          confirmedEvents: 0,
          startEvents: 0,
          endEvents: 0,
          allEvents: 0
        },
        severities: {},
        severity: 0
      };
    };

    EventManagerController.prototype.loadEventNotificationSetting = function() {
      var key, notification;
      key = 'event-notification-setting';
      notification = this.modelEngine.storage.get(key);
      return this.$rootScope.notificationSetting = notification != null ? notification : {
        text: {
          enable: true
        },
        audio: {
          enable: true
        }
      };
    };

    EventManagerController.prototype.saveEventNotificationSetting = function() {
      var key;
      key = 'event-notification-setting';
      return this.modelEngine.storage.set(key, this.$rootScope.notificationSetting);
    };

    EventManagerController.prototype.selectPrevious = function() {
      var index;
      if (!this.eventItems.length) {
        return;
      }
      index = this.eventItems.indexOf(this.event) + 1;
      if (index >= this.eventItems.length) {
        return;
      }
      return this.selectEvent(this.eventItems[index]);
    };

    EventManagerController.prototype.selectNext = function() {
      var index;
      if (!this.eventItems.length) {
        return;
      }
      index = this.eventItems.indexOf(this.event) - 1;
      if (index < 0) {
        return;
      }
      return this.selectEvent(this.eventItems[index]);
    };

    EventManagerController.prototype.selectEquipmentType = function(type) {
      if (this.equipmentTypes.hasOwnProperty(type.type)) {
        delete this.equipmentTypes[type.type];
        return this.equipmentTypesCount--;
      } else {
        this.equipmentTypes[type.type] = type.type;
        return this.equipmentTypesCount++;
      }
    };

    EventManagerController.prototype.selectAllEquipmentTypes = function() {
      this.equipmentTypes = {};
      return this.equipmentTypesCount = 0;
    };

    return EventManagerController;

  })(base.FeatureBaseController);
  return exports = {
    EventManagerController: EventManagerController
  };
});
