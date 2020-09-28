
/*
* File: bar-vertical-stack-directive
* User: David
* Date: 2020/02/12
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var BarVerticalStackDirective, exports;
  BarVerticalStackDirective = (function(_super) {
    __extends(BarVerticalStackDirective, _super);

    function BarVerticalStackDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "bar-vertical-stack";
      BarVerticalStackDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    BarVerticalStackDirective.prototype.setScope = function() {};

    BarVerticalStackDirective.prototype.setCSS = function() {
      return css;
    };

    BarVerticalStackDirective.prototype.setTemplate = function() {
      return view;
    };

    BarVerticalStackDirective.prototype.show = function(scope, element, attrs) {
      var colorArr, dom, option;
      option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "white",
            fontSize: 16
          },
          type: 'category',
          data: []
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 20,
            stack: 'vertical',
            data: [0, 0],
            itemStyle: {
              normal: {
                color: '#7E47FF'
              },
              emphasis: {
                color: '#7E47FF'
              }
            }
          }, {
            name: '',
            type: 'bar',
            stack: 'vertical',
            data: [0, 0],
            itemStyle: {
              normal: {
                color: '#FD5916'
              },
              emphasis: {
                color: '#FD5916'
              }
            }
          }, {
            name: '',
            type: 'bar',
            stack: 'vertical',
            data: [0, 0],
            itemStyle: {
              normal: {
                color: '#01A4F7'
              },
              emphasis: {
                color: '#01A4F7'
              }
            }
          }
        ]
      };
      dom = element.find(".bar-vertical-stack")[0];
      scope.echart = new echart.init(dom);
      scope.element = element;
      colorArr = ['#7E47FF', '#FD5916', '#01A4F7'];
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var data, groups, height, show, width;
          data = param.data;
          show = param.show;
          if (!show) {
            return;
          }
          width = $($(element).parent()[0]).innerWidth();
          height = $($(element).parent()[0]).innerHeight();
          scope.echart.resize({
            width: width,
            height: height
          });
          groups = _.map(_.groupBy(data, function(d) {
            return d.stack;
          }), function(d, stack) {
            return stack;
          });
          option.xAxis.data = groups;
          option.series = _.map(_.groupBy(data, function(d) {
            return d.sort;
          }), function(g, index) {
            var _data;
            _data = _.map(_.sortBy(g, function(j) {
              return groups.indexOf(j.stack);
            }), function(i) {
              return i.val;
            });
            return {
              name: index,
              type: 'bar',
              stack: 'vertical',
              data: _data,
              barWidth: 20,
              itemStyle: {
                normal: {
                  color: colorArr[index]
                },
                emphasis: {
                  color: colorArr[index]
                }
              }
            };
          });
          option.tooltip.formatter = function(n) {
            var html;
            html = n[0].name;
            _.each(n, function(p) {
              var item;
              item = _.find(data, function(q) {
                return q.stack === n[0].name && p.seriesIndex === q.sort;
              });
              return html += "<br />" + p.marker + item.key + ": " + item.val;
            });
            return html;
          };
          return scope.echart.setOption(option);
        };
      })(this));
    };

    BarVerticalStackDirective.prototype.resize = function(scope) {
      var height, width;
      width = $($(scope.element).parent()[0]).innerWidth();
      height = $($(scope.element).parent()[0]).innerHeight();
      return scope.echart.resize({
        width: width,
        height: height
      });
    };

    BarVerticalStackDirective.prototype.dispose = function(scope) {};

    return BarVerticalStackDirective;

  })(base.BaseDirective);
  return exports = {
    BarVerticalStackDirective: BarVerticalStackDirective
  };
});
