
/*
* File: history-signal-report
* User: Dow
* Date: 12/4/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./record-manager-base'], function(base) {
  var SignalManager, exports;
  SignalManager = (function(_super) {
    __extends(SignalManager, _super);

    function SignalManager(options, reportingService, eventSeverities) {
      this.eventSeverities = eventSeverities;
      SignalManager.__super__.constructor.call(this, options, reportingService);
    }

    SignalManager.prototype.initialize = function(callback) {
      SignalManager.__super__.initialize.call(this, callback);
      this.recordTypes = [
        {
          type: 'hour',
          name: '小时信号记录'
        }, {
          type: 'day',
          name: '今日信号记录'
        }, {
          type: 'week',
          name: '本周信号记录'
        }, {
          type: 'month',
          name: '本月信号记录'
        }, {
          type: 'year',
          name: '本年信号记录'
        }
      ];
      this.signalStorageModes = {
        threshold: '绝对阈值',
        percentage: '百分比阈值',
        period: '存储周期',
        event: '事件触发',
        statistic: '统计数据',
        record: '远程抄表',
        communication: '通信异常'
      };
      return this.selectRecordType(this.recordTypes[0]);
    };

    SignalManager.prototype.queryReport = function(data, callback) {
      return this.reportingService.querySignalRecords(data, callback);
    };

    SignalManager.prototype.processRecord = function(record) {
      var signal, _ref, _ref1, _ref2, _ref3;
      signal = record;
      signal.eventSeverity = (_ref = this.eventSeverities) != null ? (_ref1 = _ref.getItem(signal.severity)) != null ? _ref1.model : void 0 : void 0;
      signal.color = (_ref2 = signal.eventSeverity) != null ? _ref2.color : void 0;
      signal.modeName = (_ref3 = this.signalStorageModes[signal.mode]) != null ? _ref3 : signal.mode;
      return signal;
    };

    return SignalManager;

  })(base.RecordManagerBase);
  return exports = {
    SignalManager: SignalManager
  };
});
