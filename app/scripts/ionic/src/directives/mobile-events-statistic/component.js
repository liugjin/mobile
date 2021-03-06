// Generated by IcedCoffeeScript 108.0.11

/*
* File: mobile-events-statistic-directive
* User: David
* Date: 2019/07/17
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts", "rx"], function(base, css, view, _, moment, echarts, Rx) {
  var MobileEventsStatisticDirective, exports;
  MobileEventsStatisticDirective = (function(_super) {
    __extends(MobileEventsStatisticDirective, _super);

    function MobileEventsStatisticDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.createChartOption = __bind(this.createChartOption, this);
      this.processEvent = __bind(this.processEvent, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-events-statistic";
      MobileEventsStatisticDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEventsStatisticDirective.prototype.setScope = function() {};

    MobileEventsStatisticDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEventsStatisticDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEventsStatisticDirective.prototype.show = function(scope, element, attrs) {
      var e, filter, subject, _ref, _ref1;
      e = element.find('.ratio-pie');
      if ((_ref = scope.myChart) != null) {
        _ref.dispose();
      }
      scope.myChart = echarts.init(e[0]);
      if (scope.firstload) {
        scope.severities = _.sortBy(_.map(scope.project.dictionary.eventseverities.items, function(item) {
          return item.model;
        }), function(ite) {
          return ite.severity;
        });
        scope.events = {};
        subject = new Rx.Subject;
        filter = {
          user: scope.project.model.user,
          project: scope.project.model.project
        };
        if ((_ref1 = scope.eventSubscription) != null) {
          _ref1.dispose();
        }
        scope.eventSubscription = this.commonService.eventLiveSession.subscribeValues(filter, (function(_this) {
          return function(err, d) {
            var event, key, _ref2, _ref3;
            if (!((_ref2 = d.message) != null ? _ref2.event : void 0)) {
              return;
            }
            event = d.message;
            key = "" + event.user + "." + event.project + "." + event.station + "." + event.equipment + "." + event.event + "." + event.severity + "." + event.startTime;
            scope.events[key] = event;
            if (scope.events.hasOwnProperty(key)) {
              if (event.endTime || ((_ref3 = event.phase) === "end" || _ref3 === "completed")) {
                delete scope.events[key];
              }
            }
            return subject.onNext();
          };
        })(this));
        subject.debounce(50).subscribe((function(_this) {
          return function() {
            return _this.processEvent(scope);
          };
        })(this));
      }
      return this.processEvent(scope);
    };

    MobileEventsStatisticDirective.prototype.processEvent = function(scope) {
      var events, options, severity, stations, statistic, _i, _len, _ref, _ref1, _ref2;
      events = _.values(scope.events);
      scope.station = _.find(scope.project.stations.items, function(item) {
        return item.model.station === scope.station.model.station;
      });
      stations = this.commonService.loadStationChildren(scope.station, true);
      scope.list = _.filter(events, function(evt) {
        var _ref;
        return _ref = evt.station, __indexOf.call(_.map(stations, function(item) {
          return item.model.station;
        }), _ref) >= 0;
      });
      statistic = _.countBy(scope.list, function(evt) {
        return evt.severity;
      });
      _ref = scope.severities;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        severity = _ref[_i];
        severity.value = (_ref1 = statistic[severity.severity]) != null ? _ref1 : 0;
      }
      scope.$applyAsync();
      options = this.createChartOption(scope);
      return (_ref2 = scope.myChart) != null ? _ref2.setOption(options) : void 0;
    };

    MobileEventsStatisticDirective.prototype.createChartOption = function(scope) {
      var option;
      if (!scope.severities) {
        return;
      }
      option = {
        color: _.map(scope.severities, function(item) {
          return item.color;
        }),
        title: {
          text: "告警总数",
          subtext: scope.list.length || '0',
          textStyle: {
            color: '#000',
            fontSize: 12
          },
          subtextStyle: {
            fontSize: 14,
            color: ['#000']
          },
          x: 'center',
          top: '35%'
        },
        series: [
          {
            name: "告警总数",
            type: 'pie',
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            clockwise: true,
            hoverAnimation: false,
            hoverOffset: 0,
            startAngle: 0,
            label: {
              normal: {
                show: false,
                position: 'outside'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: scope.severities
          }
        ]
      };
      return option;
    };

    MobileEventsStatisticDirective.prototype.resize = function(scope) {};

    MobileEventsStatisticDirective.prototype.dispose = function(scope) {
      var _ref;
      return (_ref = scope.eventSubscription) != null ? _ref.dispose() : void 0;
    };

    return MobileEventsStatisticDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEventsStatisticDirective: MobileEventsStatisticDirective
  };
});
