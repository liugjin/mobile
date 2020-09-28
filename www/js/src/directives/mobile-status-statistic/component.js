
/*
* File: mobile-status-statistic-directive
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
  var MobileStatusStatisticDirective, exports;
  MobileStatusStatisticDirective = (function(_super) {
    __extends(MobileStatusStatisticDirective, _super);

    function MobileStatusStatisticDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.createChartOption = __bind(this.createChartOption, this);
      this.processState = __bind(this.processState, this);
      this.loadStationEquipStatistics = __bind(this.loadStationEquipStatistics, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-status-statistic";
      MobileStatusStatisticDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileStatusStatisticDirective.prototype.setScope = function() {};

    MobileStatusStatisticDirective.prototype.setCSS = function() {
      return css;
    };

    MobileStatusStatisticDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileStatusStatisticDirective.prototype.show = function(scope, element, attrs) {
      var e, n, station, subject, _i, _len, _ref, _ref1, _results;
      e = element.find('.ratio-pie');
      if ((_ref = scope.myChart) != null) {
        _ref.dispose();
      }
      scope.myChart = echarts.init(e[0]);
      if (scope.firstload) {
        scope.status = {};
        scope.states = [
          {
            name: "在线设备",
            value: 0,
            color: '#1B98F5'
          }, {
            name: "离线设备",
            value: 0,
            color: '#d2cdcd'
          }
        ];
        scope.equips = [];
        n = 0;
        subject = new Rx.Subject;
        _ref1 = scope.project.stations.nitems;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          station = _ref1[_i];
          scope.status[station.model.station] = {
            count: 0,
            equipments: {}
          };
          _results.push(this.loadStationEquipStatistics(scope, station, (function(_this) {
            return function() {
              var filter, _ref2;
              n++;
              if (n === scope.project.stations.nitems.length) {
                _this.processState(scope);
                filter = scope.project.getIds();
                filter.station = "+";
                filter.equipment = "+";
                filter.signal = "communication-status";
                if ((_ref2 = scope.statusSubscription) != null) {
                  _ref2.dispose();
                }
                scope.statusSubscription = _this.commonService.signalLiveSession.subscribeValues(filter, function(err, d) {
                  var _ref3;
                  if (!_this.filterType(scope, d.message.equipmentType) || (_ref3 = d.message.station + "." + d.message.equipment, __indexOf.call(scope.equips, _ref3) < 0)) {
                    return;
                  }
                  scope.status[d.message.station].equipments[d.message.equipment] = d.message.value;
                  return subject.onNext();
                });
                return subject.debounce(200).subscribe(function() {
                  return _this.processState(scope);
                });
              }
            };
          })(this)));
        }
        return _results;
      } else {
        return this.processState(scope);
      }
    };

    MobileStatusStatisticDirective.prototype.loadStationEquipStatistics = function(scope, station, callback) {
      return station.loadEquipments(null, null, (function(_this) {
        return function(err, equips) {
          var items;
          items = _.filter(equips, function(equip) {
            scope.equips.push(equip.model.station + "." + equip.model.equipment);
            return _this.filterType(scope, equip.model.type);
          });
          scope.status[station.model.station].count += items.length;
          return typeof callback === "function" ? callback() : void 0;
        };
      })(this), true);
    };

    MobileStatusStatisticDirective.prototype.filterType = function(scope, type) {
      var item, _ref;
      item = _.find(scope.project.dictionary.equipmenttypes.items, function(tp) {
        return tp.model.type === type;
      });
      if ((item != null ? (_ref = item.model) != null ? _ref.visible : void 0 : void 0) === false) {
        return false;
      }
      if (type.substr(0, 1) === "_") {
        return false;
      }
      return true;
    };

    MobileStatusStatisticDirective.prototype.processState = function(scope) {
      var count, key, list, onlines, options, stations, value, _ref, _ref1;
      stations = this.commonService.loadStationChildren(scope.station, true);
      list = _.map(stations, function(station) {
        return station.model.station;
      });
      count = 0;
      onlines = 0;
      _ref = scope.status;
      for (key in _ref) {
        value = _ref[key];
        if (__indexOf.call(list, key) >= 0) {
          count += value.count;
          onlines += _.reduce(_.values(value.equipments), (function(memo, num) {
            return memo + (num === 0 ? 1 : 0);
          }), 0);
        }
      }
      scope.states[0].value = onlines;
      scope.states[1].value = count - onlines;
      scope.$applyAsync();
      options = this.createChartOption(scope, count);
      return (_ref1 = scope.myChart) != null ? _ref1.setOption(options) : void 0;
    };

    MobileStatusStatisticDirective.prototype.createChartOption = function(scope, count) {
      var option;
      if (!scope.states) {
        return;
      }
      option = {
        color: _.map(scope.states, function(item) {
          return item.color;
        }),
        title: {
          text: "设备总数",
          subtext: count || '0',
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
            name: "设备总数",
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
            data: scope.states
          }
        ]
      };
      return option;
    };

    MobileStatusStatisticDirective.prototype.resize = function(scope) {};

    MobileStatusStatisticDirective.prototype.dispose = function(scope) {
      var _ref;
      return (_ref = scope.statusSubscription) != null ? _ref.dispose() : void 0;
    };

    return MobileStatusStatisticDirective;

  })(base.BaseDirective);
  return exports = {
    MobileStatusStatisticDirective: MobileStatusStatisticDirective
  };
});
