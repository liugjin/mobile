
/*
* File: reporting-service
* User: Dow
* Date: 9/2/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./query-service'], function(base) {
  var ReportingService, exports;
  ReportingService = (function(_super) {
    __extends(ReportingService, _super);

    function ReportingService($rootScope, $http, urls) {
      this.urls = urls;
      ReportingService.__super__.constructor.call(this, $rootScope, $http);
    }

    ReportingService.prototype.queryRecords = function(key, parameters, callback) {
      var url;
      url = this.urls[key];
      if (!url) {
        return callback("" + key + " url is not defined");
      }
      return this.query(url, parameters, callback);
    };

    ReportingService.prototype.querySignalRecords = function(parameters, callback) {
      var key;
      key = 'reporting.records.signal';
      return this.queryRecords(key, parameters, callback);
    };

    ReportingService.prototype.querySignalGroupRecords = function(parameters, callback) {
      var key;
      key = 'reporting.records.signal-group';
      return this.queryRecords(key, parameters, callback);
    };

    ReportingService.prototype.queryEventRecords = function(parameters, callback) {
      var key;
      key = 'reporting.records.event';
      return this.queryRecords(key, parameters, callback);
    };

    ReportingService.prototype.queryCommandRecords = function(parameters, callback) {
      var key;
      key = 'reporting.records.command';
      return this.queryRecords(key, parameters, callback);
    };

    ReportingService.prototype.querySignalStatistics = function(parameters, callback) {
      var key;
      key = 'reporting.records.signal-statistic';
      return this.queryRecords(key, parameters, callback);
    };

    ReportingService.prototype.aggregate = function(key, parameters, callback) {
      var url;
      url = this.urls[key];
      if (!url) {
        return callback("" + key + " url is not defined");
      }
      return this.query(url, parameters, callback);
    };

    ReportingService.prototype.aggregateSignalValues = function(parameter, callback) {
      var key;
      key = 'reporting.aggregate.signal';
      return this.aggregate(key, parameters, callback);
    };

    ReportingService.prototype.aggregateSignalStatistics = function(parameter, callback) {
      var key;
      key = 'reporting.aggregate.signal-statistic';
      return this.aggregate(key, parameters, callback);
    };

    ReportingService.prototype.aggregateCommandValues = function(parameter, callback) {
      var key;
      key = 'reporting.aggregate.command';
      return this.aggregate(key, parameters, callback);
    };

    ReportingService.prototype.aggregateEventValues = function(parameter, callback) {
      var key;
      key = 'reporting.aggregate.event';
      return this.aggregate(key, parameters, callback);
    };

    return ReportingService;

  })(base.QueryService);
  return exports = {
    ReportingService: ReportingService
  };
});
