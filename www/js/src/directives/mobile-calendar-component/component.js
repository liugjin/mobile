
/*
* File: mobile-calendar-component-directive
* User: David
* Date: 2020/03/19
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileCalendarComponentDirective, exports;
  MobileCalendarComponentDirective = (function(_super) {
    __extends(MobileCalendarComponentDirective, _super);

    function MobileCalendarComponentDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-calendar-component";
      MobileCalendarComponentDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileCalendarComponentDirective.prototype.setScope = function() {};

    MobileCalendarComponentDirective.prototype.setCSS = function() {
      return css;
    };

    MobileCalendarComponentDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileCalendarComponentDirective.prototype.show = function(scope, element, attrs) {
      var calendar, getPeriod, nextPeriod, previousPeriod;
      console.log("456", scope.parameters);
      element.find('.datepicker').attr("id", scope.parameters.id);
      getPeriod = function(mode) {
        var endTime, startTime;
        if (mode == null) {
          mode = 'day';
        }
        switch (mode) {
          case 'day':
            startTime = moment().startOf('day');
            endTime = moment().endOf('day');
            break;
          default:
            startTime = moment().subtract(60, 'minutes');
            endTime = moment();
        }
        return scope.period = {
          startTime: startTime,
          endTime: endTime,
          mode: mode
        };
      };
      nextPeriod = (function(_this) {
        return function(mode) {
          var endTime, startTime;
          if (mode == null) {
            mode = 'day';
          }
          if (!scope.period) {
            return getPeriod(mode);
          }
          switch (scope.period.mode) {
            case 'day':
              startTime = moment(scope.period.startTime).add(1, 'day').startOf('day');
              endTime = moment(scope.period.startTime).add(1, 'day').endOf('day');
              console.log("startTime", startTime);
              console.log("endTime", endTime);
              break;
            default:
              startTime = scope.period.endTime;
              endTime = moment(scope.period.endTime).add(60, 'minutes');
          }
          return scope.period = {
            startTime: startTime,
            endTime: endTime,
            mode: scope.period.mode
          };
        };
      })(this);
      previousPeriod = (function(_this) {
        return function(mode) {
          var endTime, startTime;
          if (mode == null) {
            mode = 'day';
          }
          if (!scope.period) {
            return getPeriod(mode);
          }
          switch (scope.period.mode) {
            case 'day':
              startTime = moment(scope.period.startTime).subtract(1, 'day').startOf('day');
              endTime = moment(scope.period.startTime).subtract(1, 'day').endOf('day');
              break;
            default:
              startTime = moment(scope.period.startTime).subtract(60, 'minutes');
              endTime = scope.period.startTime;
          }
          return scope.period = {
            startTime: startTime,
            endTime: endTime,
            mode: scope.period.mode
          };
        };
      })(this);
      scope.period = getPeriod(scope.mode);
      scope.formatStartTime = moment(scope.period.startTime).format('YYYY-MM-DD');
      calendar = new LCalendar();
      calendar.init({
        trigger: '#' + scope.parameters.id,
        type: 'date',
        minDate: moment().subtract(10, 'years').format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD')
      });
      scope.selectDates = (function(_this) {
        return function() {
          scope.period.startTime = scope.formatStartTime;
          return scope.selectDate();
        };
      })(this);
      return scope.selectDate = (function(_this) {
        return function(periodType) {
          var _ref;
          switch (periodType) {
            case 'next':
              scope.period = nextPeriod();
              break;
            case 'previous':
              scope.period = previousPeriod();
              break;
            case 'refresh':
              scope.period = (_ref = scope.period) != null ? _ref : getPeriod();
              break;
            default:
              scope.period.startTime = moment(scope.period.startTime).startOf('day');
              scope.period.endTime = moment(scope.period.startTime).endOf('day');
          }
          scope.formatStartTime = moment(scope.period.startTime).format('YYYY-MM-DD');
          scope.period.mode = 'day';
          _this.commonService.publishEventBus("task-date", {
            period: scope.period,
            id: scope.parameters.id
          });
          return console.log("period", scope.period);
        };
      })(this);
    };

    MobileCalendarComponentDirective.prototype.resize = function(scope) {};

    MobileCalendarComponentDirective.prototype.dispose = function(scope) {};

    return MobileCalendarComponentDirective;

  })(base.BaseDirective);
  return exports = {
    MobileCalendarComponentDirective: MobileCalendarComponentDirective
  };
});
