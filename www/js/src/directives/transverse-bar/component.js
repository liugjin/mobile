
/*
* File: transverse-bar-directive
* User: David
* Date: 2019/12/30
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var TransverseBarDirective, exports, option;
  option = {
    color: [
      new echart.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgb(85, 151, 252)'
        }, {
          offset: 1,
          color: 'rgb(126, 223, 215)'
        }
      ])
    ],
    grid: {
      left: '8%',
      top: '8%',
      right: '10%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      show: false
    },
    yAxis: {
      axisTick: 'none',
      axisLine: 'none',
      axisLabel: {
        textStyle: {
          color: '#ffffff',
          fontSize: '16'
        }
      },
      data: []
    },
    series: [
      {
        type: 'bar',
        yAxisIndex: 0,
        data: [],
        label: {
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#ffffff',
              fontSize: '16'
            }
          }
        },
        barWidth: 12,
        z: 2
      }
    ]
  };
  TransverseBarDirective = (function(_super) {
    __extends(TransverseBarDirective, _super);

    function TransverseBarDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "transverse-bar";
      TransverseBarDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    TransverseBarDirective.prototype.setScope = function() {};

    TransverseBarDirective.prototype.setCSS = function() {
      return css;
    };

    TransverseBarDirective.prototype.setTemplate = function() {
      return view;
    };

    TransverseBarDirective.prototype.show = function(scope, element, attrs) {
      var drawChart;
      scope.barChart = echart.init(element.find(".transverse-bar")[0]);
      drawChart = (function(_this) {
        return function(data) {
          option.yAxis.data = _.map(data, function(d) {
            return d.key;
          });
          option.series[0].data = _.map(data, function(d) {
            return d.val;
          });
          return scope.barChart.setOption(option);
        };
      })(this);
      return scope.$watch("parameters.data", (function(_this) {
        return function(data) {
          if (!data) {
            return;
          }
          return drawChart(data);
        };
      })(this));
    };

    TransverseBarDirective.prototype.resize = function(scope) {
      return scope.barChart.resize();
    };

    TransverseBarDirective.prototype.dispose = function(scope) {};

    return TransverseBarDirective;

  })(base.BaseDirective);
  return exports = {
    TransverseBarDirective: TransverseBarDirective
  };
});
