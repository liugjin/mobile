
/*
* File: bar-vertical-stack2-directive
* User: David
* Date: 2020/02/17
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var BarVerticalStack2Directive, exports;
  BarVerticalStack2Directive = (function(_super) {
    __extends(BarVerticalStack2Directive, _super);

    function BarVerticalStack2Directive($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "bar-vertical-stack2";
      BarVerticalStack2Directive.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    BarVerticalStack2Directive.prototype.setScope = function() {};

    BarVerticalStack2Directive.prototype.setCSS = function() {
      return css;
    };

    BarVerticalStack2Directive.prototype.setTemplate = function() {
      return view;
    };

    BarVerticalStack2Directive.prototype.show = function(scope, element, attrs) {
      var colorArr, dom, option;
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: "none"
          }
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
        series: []
      };
      dom = element.find(".bar-vertical-stack2")[0];
      scope.echart = new echart.init(dom);
      scope.element = element;
      colorArr = ['#7E47FF', '#FD5916', '#01A4F7'];
      return scope.$watch("parameters.data", (function(_this) {
        return function(data) {
          var groups, sortList;
          groups = _.map(_.groupBy(data, function(d) {
            return d.stack;
          }), function(d, stack) {
            return stack;
          });
          option.xAxis.data = groups;
          sortList = _.groupBy(data, function(d) {
            return d.sort;
          });
          if (option.series.length !== sortList.length) {
            scope.echart.clear();
          }
          option.series = _.map(sortList, function(g, index) {
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
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: function() {
                    return g[0].key + ":" + g[0].val;
                  }
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

    BarVerticalStack2Directive.prototype.resize = function(scope) {
      return scope.echart.resize();
    };

    BarVerticalStack2Directive.prototype.dispose = function(scope) {};

    return BarVerticalStack2Directive;

  })(base.BaseDirective);
  return exports = {
    BarVerticalStack2Directive: BarVerticalStack2Directive
  };
});
