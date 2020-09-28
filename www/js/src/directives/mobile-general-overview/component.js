
/*
* File: mobile-general-overview-directive
* User: David
* Date: 2020/03/09
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echarts) {
  var MobileGeneralOverviewDirective, exports;
  MobileGeneralOverviewDirective = (function(_super) {
    __extends(MobileGeneralOverviewDirective, _super);

    function MobileGeneralOverviewDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.createChartOption = __bind(this.createChartOption, this);
      this.chartData = __bind(this.chartData, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-general-overview";
      MobileGeneralOverviewDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileGeneralOverviewDirective.prototype.setScope = function() {};

    MobileGeneralOverviewDirective.prototype.setCSS = function() {
      return css;
    };

    MobileGeneralOverviewDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileGeneralOverviewDirective.prototype.show = function(scope, element, attrs) {
      scope.showVertical = false;
      scope.count = 0;
      scope.data = [
        {
          id: "excepequips-defect",
          key: "故障设备",
          stack: "异常设备",
          val: 0,
          sort: 0
        }, {
          id: "excepequips-plan",
          key: "巡检设备",
          stack: "异常设备",
          val: 0,
          sort: 1
        }, {
          id: "excepequips-predict",
          key: "维保设备",
          stack: "异常设备",
          val: 0,
          sort: 2
        }, {
          id: "task-defect",
          key: "故障工单",
          stack: "待处理工单",
          val: 0,
          sort: 0
        }, {
          id: "task-plan",
          key: "巡检工单",
          stack: "待处理工单",
          val: 0,
          sort: 1
        }, {
          id: "task-predict",
          key: "维保工单",
          stack: "待处理工单",
          val: 0,
          sort: 2
        }
      ];
      scope.changeVertical = (function(_this) {
        return function() {
          scope.showVertical = !scope.showVertical;
          return scope.$applyAsync();
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var count;
          _.each(scope.data, function(d, i) {
            return scope.data[i].val = 0;
          });
          _.mapObject(param.data, function(d, i) {
            var defectItem, index, tmpDefects, _i, _len, _results;
            if (i === "task") {
              return _.each(d, function(item) {
                var index, key;
                if (!(_.isEmpty(item.phase))) {
                  key = i + "-" + item.type;
                  index = _.findIndex(scope.data, function(m) {
                    return m.id === key;
                  });
                  if (index > -1) {
                    return scope.data[index].val += item.val;
                  }
                }
              });
            } else if (i === "excepequips") {
              return _.each(d, function(item) {
                var index, key;
                key = i + "-" + item.type;
                index = _.findIndex(scope.data, function(m) {
                  return m.id === key;
                });
                if (index > -1) {
                  return scope.data[index].val += item.val;
                }
              });
            } else if (i === "equipment") {
              tmpDefects = _.filter(param.data["equipment"], function(equipItem) {
                return equipItem.type === "defect";
              });
              if (tmpDefects.length > 0) {
                index = _.findIndex(scope.data, function(m) {
                  return m.id === "excepequips-defect";
                });
                _results = [];
                for (_i = 0, _len = tmpDefects.length; _i < _len; _i++) {
                  defectItem = tmpDefects[_i];
                  _results.push(scope.data[index].val += defectItem.val);
                }
                return _results;
              }
            }
          });
          count = 0;
          _this.chartData(scope, element);
          _.each(param.data.task, function(task) {
            return count += task.val;
          });
          if (scope.count !== count) {
            return scope.count = count;
          }
        };
      })(this));
    };

    MobileGeneralOverviewDirective.prototype.chartData = function(scope, element) {
      var e1, e2, options1, options2, _ref, _ref1, _ref2, _ref3;
      scope.states1 = [
        {
          name: "故障设备",
          value: 0,
          color: '#7B46FA'
        }, {
          name: "巡检设备",
          value: 0,
          color: '#FD5916'
        }, {
          name: "维保设备",
          value: 0,
          color: '#01A4F7'
        }
      ];
      scope.states1[0].value = scope.data[0].val;
      scope.states1[1].value = scope.data[1].val;
      scope.states1[2].value = scope.data[2].val;
      scope.count1 = scope.data[0].val + scope.data[1].val + scope.data[2].val;
      scope.states2 = [
        {
          name: "故障工单",
          value: 0,
          color: '#7B46FA'
        }, {
          name: "巡检工单",
          value: 0,
          color: '#FD5916'
        }, {
          name: "维保工单",
          value: 0,
          color: '#01A4F7'
        }
      ];
      scope.states2[0].value = scope.data[3].val;
      scope.states2[1].value = scope.data[4].val;
      scope.states2[2].value = scope.data[5].val;
      scope.count2 = scope.data[3].val + scope.data[4].val + scope.data[5].val;
      scope.subtext = ["异常设备", "待处理工单"];
      scope.$applyAsync();
      e1 = element.find('.echarts1');
      e2 = element.find('.echarts2');
      if ((_ref = scope.myChart1) != null) {
        _ref.dispose();
      }
      if ((_ref1 = scope.myChart2) != null) {
        _ref1.dispose();
      }
      scope.myChart1 = echarts.init(e1[0]);
      scope.myChart2 = echarts.init(e2[0]);
      options1 = this.createChartOption(scope, scope.states1, scope.count1, scope.subtext[0]);
      options2 = this.createChartOption(scope, scope.states2, scope.count2, scope.subtext[1]);
      if ((_ref2 = scope.myChart1) != null) {
        _ref2.setOption(options1);
      }
      return (_ref3 = scope.myChart2) != null ? _ref3.setOption(options2) : void 0;
    };

    MobileGeneralOverviewDirective.prototype.createChartOption = function(scope, states, count, subtext) {
      var option;
      if (!states) {
        return;
      }
      option = {
        color: _.map(states, function(item) {
          return item.color;
        }),
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: count || '0',
          subtext: subtext,
          textStyle: {
            color: '#737373',
            fontSize: 18
          },
          subtextStyle: {
            fontSize: 12,
            color: '#737373'
          },
          x: 'center',
          top: '38%'
        },
        series: [
          {
            name: subtext,
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
                show: true
              }
            },
            data: states
          }
        ]
      };
      return option;
    };

    MobileGeneralOverviewDirective.prototype.resize = function(scope) {};

    MobileGeneralOverviewDirective.prototype.dispose = function(scope) {};

    return MobileGeneralOverviewDirective;

  })(base.BaseDirective);
  return exports = {
    MobileGeneralOverviewDirective: MobileGeneralOverviewDirective
  };
});
