
/*
* File: command-manager
* User: Dow
* Date: 12/4/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./record-manager-base'], function(base) {
  var CommandManager, exports;
  CommandManager = (function(_super) {
    __extends(CommandManager, _super);

    function CommandManager(options, reportingService) {
      CommandManager.__super__.constructor.call(this, options, reportingService);
    }

    CommandManager.prototype.initialize = function(callback) {
      CommandManager.__super__.initialize.call(this, callback);
      this.recordTypes = [
        {
          type: 'hour',
          name: '小时控制记录'
        }, {
          type: 'day',
          name: '今日控制记录'
        }, {
          type: 'week',
          name: '本周控制记录'
        }, {
          type: 'month',
          name: '本月控制记录'
        }, {
          type: 'year',
          name: '本年控制记录'
        }
      ];
      return this.selectRecordType(this.recordTypes[1]);
    };

    CommandManager.prototype.queryReport = function(data, callback) {
      return this.reportingService.queryCommandRecords(data, callback);
    };

    CommandManager.prototype.processRecord = function(record) {
      var command, p, parameters, parameters3, _i, _len, _ref;
      command = record;
      parameters = {};
      parameters3 = '';
      if (command.parameters) {
        _ref = command.parameters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          parameters[p.key] = p.value;
          parameters3 += "" + p.key + "=" + p.value + "; ";
        }
      }
      command.parameters3 = parameters3;
      if (command.trigger === 'user') {
        command.triggerName = command.operatorName;
      } else {
        command.triggerName = command.trigger;
      }
      return command;
    };

    return CommandManager;

  })(base.RecordManagerBase);
  return exports = {
    CommandManager: CommandManager
  };
});
