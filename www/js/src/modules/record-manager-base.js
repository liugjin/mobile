
/*
* File: record-manager-base
* User: Dow
* Date: 12/4/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./module-base', '../models/paging-model', 'moment'], function(base, pm, moment) {
  var RecordManagerBase, exports;
  RecordManagerBase = (function(_super) {
    __extends(RecordManagerBase, _super);

    function RecordManagerBase(options, reportingService) {
      this.reportingService = reportingService;
      RecordManagerBase.__super__.constructor.call(this, options);
    }

    RecordManagerBase.prototype.initialize = function(callback) {
      RecordManagerBase.__super__.initialize.call(this, callback);
      this.records = new pm.PagingModel({
        predicate: '_index',
        reverse: false
      });
      return this.parameters = {};
    };

    RecordManagerBase.prototype.dispose = function() {
      RecordManagerBase.__super__.dispose.apply(this, arguments);
      this.records.setItems([]);
      return this.parameters = {};
    };

    RecordManagerBase.prototype.selectRecordType = function(type) {
      if (type == null) {
        type = this.recordType;
      }
      return this.recordType = type;
    };

    RecordManagerBase.prototype.getPeriod = function(type) {
      var endTime, startTime;
      if (type == null) {
        type = this.recordType;
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

    RecordManagerBase.prototype.nextPeriod = function() {
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

    RecordManagerBase.prototype.previousPeriod = function() {
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

    RecordManagerBase.prototype.queryRecords = function(item, periodType, page, pageItems) {
      var data, filter, paging, period, sorting, _ref;
      if (page == null) {
        page = 1;
      }
      if (pageItems == null) {
        pageItems = 20;
      }
      if (!item) {
        return;
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
      paging = {
        page: page,
        pageItems: pageItems
      };
      sorting = {};
      sorting[this.records.predicate] = this.records.reverse ? -1 : 1;
      this.parameters = {
        item: item,
        startTime: period.startTime,
        endTime: period.endTime,
        queryTime: moment(),
        periodType: periodType,
        paging: paging,
        sorting: sorting
      };
      filter = this.getFilter(item);
      data = {
        filter: filter,
        fields: null,
        paging: paging,
        sorting: sorting
      };
      return this.queryReport(data, (function(_this) {
        return function(err, records, paging2) {
          var _i, _ref1, _results;
          records = _this.processRecords(records);
          _this.records.setItems(records);
          if (paging2 && paging2.pageCount > 1) {
            paging2.pages = (function() {
              _results = [];
              for (var _i = 1, _ref1 = paging2.pageCount; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; 1 <= _ref1 ? _i++ : _i--){ _results.push(_i); }
              return _results;
            }).apply(this);
          }
          return _this.parameters.paging = paging2;
        };
      })(this));
    };

    RecordManagerBase.prototype.getFilter = function(item) {
      var filter;
      filter = item.getIds();
      filter.startTime = this.period.startTime;
      filter.endTime = this.period.endTime;
      return filter;
    };

    RecordManagerBase.prototype.queryReport = function(data, callback) {
      return this.reportingService[this.options.queryReportMethod](data, callback);
    };

    RecordManagerBase.prototype.processRecords = function(records) {
      var record, _i, _len;
      if (!records) {
        return;
      }
      for (_i = 0, _len = records.length; _i < _len; _i++) {
        record = records[_i];
        this.processRecord(record);
      }
      return records;
    };

    RecordManagerBase.prototype.processRecord = function(record) {
      return record;
    };

    RecordManagerBase.prototype.queryPage = function(page) {
      var paging, _ref;
      paging = (_ref = this.parameters) != null ? _ref.paging : void 0;
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
      return this.queryRecords(this.parameters.item, this.parameters.periodType, page, paging.pageItems);
    };

    return RecordManagerBase;

  })(base.ModuleBase);
  return exports = {
    RecordManagerBase: RecordManagerBase
  };
});
