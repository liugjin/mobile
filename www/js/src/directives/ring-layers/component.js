
/*
* File: ring-layers-directive
* User: David
* Date: 2019/12/30
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var RingLayersDirective, exports, option;
  option = {
    legend: {
      show: true,
      bottom: 10,
      icon: "circle",
      textStyle: {
        color: "rgb(167, 182, 204)"
      }
    },
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '75%'],
        center: ['50%', '40%'],
        hoverAnimation: false,
        z: 10,
        label: {
          position: 'center',
          formatter: (function(_this) {
            return function() {
              return '';
            };
          })(this),
          color: '#7a8c9f',
          fontSize: 16,
          lineHeight: 30
        },
        data: [],
        labelLine: {
          show: false
        }
      }, {
        type: 'pie',
        radius: ['54%', '64%'],
        center: ['50%', '40%'],
        hoverAnimation: false,
        label: {
          show: false
        },
        data: [],
        labelLine: {
          show: false
        }
      }, {
        type: 'pie',
        radius: ['43%', '53%'],
        center: ['50%', '40%'],
        hoverAnimation: false,
        label: {
          show: false
        },
        data: [
          {
            value: 0,
            name: '',
            itemStyle: {
              color: '#0286ff',
              opacity: 0.1
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              color: '#ffd302',
              opacity: 0.1
            }
          }, {
            value: 0,
            name: '',
            itemStyle: {
              color: '#fb5274',
              opacity: 0.1
            }
          }
        ],
        labelLine: {
          show: false
        }
      }
    ]
  };
  RingLayersDirective = (function(_super) {
    __extends(RingLayersDirective, _super);

    function RingLayersDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "ring-layers";
      RingLayersDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    RingLayersDirective.prototype.setScope = function() {};

    RingLayersDirective.prototype.setCSS = function() {
      return css;
    };

    RingLayersDirective.prototype.setTemplate = function() {
      return view;
    };

    RingLayersDirective.prototype.show = function(scope, element, attrs) {
      scope.ringChart = echart.init(element.find(".ring-layers")[0]);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var map;
          if (!param) {
            return;
          }
          map = [0.9, 0.4, 0.1];
          _.each(option.series, function(series, index) {
            return option.series[index].data = _.map(param.data, function(d) {
              return {
                value: 0,
                name: d.key,
                itemStyle: {
                  color: d.color,
                  opacity: map[index]
                }
              };
            });
          });
          return scope.ringChart.setOption(option);
        };
      })(this));
    };

    RingLayersDirective.prototype.resize = function(scope) {};

    RingLayersDirective.prototype.dispose = function(scope) {};

    return RingLayersDirective;

  })(base.BaseDirective);
  return exports = {
    RingLayersDirective: RingLayersDirective
  };
});
