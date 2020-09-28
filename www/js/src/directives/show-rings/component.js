
/*
* File: show-rings-directive
* User: David
* Date: 2019/12/28
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var ShowRingsDirective, exports;
  ShowRingsDirective = (function(_super) {
    var option;

    __extends(ShowRingsDirective, _super);

    option = {
      color: [],
      tooltip: {
        padding: [4, 8],
        show: true,
        trigger: "item",
        icon: "circle"
      },
      grid: {
        top: '10%',
        bottom: '58%',
        left: "53%",
        containLabel: false
      },
      yAxis: [
        {
          offset: 12,
          type: 'category',
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            inside: true,
            textStyle: {
              color: "white",
              fontSize: 14
            },
            show: true
          },
          data: []
        }
      ],
      xAxis: [
        {
          show: false
        }
      ],
      series: []
    };

    function ShowRingsDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "show-rings";
      ShowRingsDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    ShowRingsDirective.prototype.setScope = function() {};

    ShowRingsDirective.prototype.setCSS = function() {
      return css;
    };

    ShowRingsDirective.prototype.setTemplate = function() {
      return view;
    };

    ShowRingsDirective.prototype.show = function(scope, element, attrs) {
      var colorArr, drawChart, getSeries;
      if (!scope.firstload) {
        return;
      }
      scope.ringChart = new echart.init(element.find(".ring-canvas")[0]);
      scope.ringChart.on('click', (function(_this) {
        return function(params) {
          if ((params != null ? params.seriesName : void 0) === "execepequips") {
            return _this.publishEventBus("showrings-plantask", {
              id: "execepequips"
            });
          } else if ((params != null ? params.seriesName : void 0) === "allworkitems") {
            return _this.publishEventBus("showrings-plantask", {
              id: "allworkitems"
            });
          } else if ((params != null ? params.seriesName : void 0) === "handling") {
            return _this.publishEventBus("showrings-plantask", {
              id: "handling"
            });
          }
        };
      })(this));
      colorArr = [
        new echart.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#75EA81'
          }, {
            offset: 1,
            color: '#2DA0E1'
          }
        ]), new echart.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#3DFFE1'
          }, {
            offset: 1,
            color: '#2DA0E1'
          }
        ]), new echart.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#5597FC'
          }, {
            offset: 1,
            color: '#7EDFD7'
          }
        ]), new echart.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#5580FC'
          }, {
            offset: 1,
            color: '#7EDFD7'
          }
        ])
      ];
      if (option.color.length === 0) {
        option.color = colorArr;
      }
      getSeries = (function(_this) {
        return function(data) {
          var i, series, _i, _ref;
          series = [];
          for (i = _i = 0, _ref = data.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            series.push({
              name: data[i].type,
              type: 'pie',
              clockWise: false,
              hoverAnimation: false,
              radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
              center: ["50%", "50%"],
              label: {
                show: false
              },
              itemStyle: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderWidth: 5
              },
              data: [
                {
                  value: 0,
                  name: data[i].title
                }, {
                  value: 0,
                  name: '',
                  itemStyle: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0
                  },
                  tooltip: {
                    show: false
                  },
                  hoverAnimation: false
                }
              ]
            });
            series.push({
              name: '',
              type: 'pie',
              silent: true,
              z: 1,
              clockWise: false,
              hoverAnimation: false,
              radius: [73 - i * 15 + '%', 68 - i * 15 + '%'],
              center: ["50%", "50%"],
              label: {
                show: false
              },
              itemStyle: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderWidth: 5
              },
              data: [
                {
                  value: 7.5,
                  itemStyle: {
                    color: "rgba(120, 139, 221, 0.3)",
                    borderWidth: 0
                  },
                  tooltip: {
                    show: false
                  },
                  hoverAnimation: false
                }, {
                  value: 2.5,
                  name: '',
                  itemStyle: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0
                  },
                  tooltip: {
                    show: false
                  },
                  hoverAnimation: false
                }
              ]
            });
          }
          return series;
        };
      })(this);
      drawChart = (function(_this) {
        return function(param) {
          option.tooltip.formatter = function(d) {
            var current;
            current = _.find(param.data, function(m) {
              return m.type === d.seriesName;
            });
            return d.name + "<br />实时值: " + current.val;
          };
          option.yAxis[0].data = _.map(param.data, function(d) {
            return d.title;
          });
          option.series = getSeries(param.data);
          return scope.ringChart.setOption(option);
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          if (!param) {
            return;
          }
          return drawChart(param);
        };
      })(this));
    };

    ShowRingsDirective.prototype.resize = function(scope) {
      return scope.ringChart.resize();
    };

    ShowRingsDirective.prototype.dispose = function(scope) {};

    return ShowRingsDirective;

  })(base.BaseDirective);
  return exports = {
    ShowRingsDirective: ShowRingsDirective
  };
});
