
/*
* File: history-event-report
* User: Dow
* Date: 12/4/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./record-manager-base'], function(base) {
  var EventManager, exports;
  EventManager = (function(_super) {
    __extends(EventManager, _super);

    function EventManager(options, reportingService, eventSeverities) {
      this.eventSeverities = eventSeverities;
      EventManager.__super__.constructor.call(this, options, reportingService);
    }

    EventManager.prototype.initialize = function(callback) {
      EventManager.__super__.initialize.call(this, callback);
      this.recordTypes = [
        {
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
      return this.selectRecordType(this.recordTypes[1]);
    };

    EventManager.prototype.queryReport = function(data, callback) {
      return this.reportingService.queryEventRecords(data, callback);
    };

    EventManager.prototype.processRecord = function(record) {
      var endTime, event, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      event = record;
      event.updateTime = (_ref = (_ref1 = event.endTime) != null ? _ref1 : event.confirmTime) != null ? _ref : event.startTime;
      event.eventSeverity = (_ref2 = this.eventSeverities) != null ? (_ref3 = _ref2.getItem(event.severity)) != null ? _ref3.model : void 0 : void 0;
      event.color = (_ref4 = (_ref5 = event.eventSeverity) != null ? _ref5.color : void 0) != null ? _ref4 : this.endColor;
      endTime = event.endTime ? new Date(event.endTime) : new Date;
      event.duration = endTime - new Date(event.startTime);
      event.startTime2 = new Date(event.startTime);
      return event;
    };

    return EventManager;

  })(base.RecordManagerBase);
  return exports = {
    EventManager: EventManager
  };
});
