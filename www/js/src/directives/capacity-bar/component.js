
/*
* File: capacity-bar-directive
* User: David
* Date: 2020/01/02
* Desc:
 */
if (typeof define !== 'function') { define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echart) {
  var CapacityBarDirective, exports;
  CapacityBarDirective = (function(_super) {
    __extends(CapacityBarDirective, _super);

    function CapacityBarDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "capacity-bar";
      CapacityBarDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    CapacityBarDirective.prototype.setScope = function() {};

    CapacityBarDirective.prototype.setCSS = function() {
      return css;
    };

    CapacityBarDirective.prototype.setTemplate = function() {
      return view;
    };

    CapacityBarDirective.prototype.show = function(scope, element, attrs) {
      var bgImg, fillImg, getOption;
      scope.barChart = echart.init(element.find(".capacity-bar")[0]);
      bgImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAilJREFUeNrs1rENwjAURdEfC0pmQAwBDfuwE8wDDSULIGagTGEcFNHQpfPXseT0V0ryzrA/XzcRsWt3HX2fsd1XSRITc8O2JIn5RZVIdsr87mU54xT0TBL1/Sms2uPd7qPXivvp+PfKpfuGBAkStPxMf7muLXe43FiO5ViO5VjOsAoSxHIsx3Isx3Isx3KGVZAglmM5lmM5lmM5liMFQYJYjuVYjuVYjuVYTpAgQSzHcizHcizHcoZVkCCWYzmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcIEGCWI7lWI7lWI7lDKsgQYJYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLGdYBQliOZZjOZZjOZZjOUGCBLEcy7Ecy7EcyxlWQYJYjuVYjuVYjuVYzrAKEsRyLMdyLMdyLMdypCBIEMuxHMuxHMuxnGEVJEgQy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUMqyBBLMdyLMdyLMdyLCdIkCCWYzmWYzmWYznDKkgQy7Ecy7Ecy7EcyxlWQYJYjuVYjuVYjuVYjhQECWI5lmM5lmM5ljOsggQJYjmWYzmWYzmWM6yCBLEcy7Ecy7Ecy7GcYRUkiOVYjuVYjuVYjuUECRLEcizHcizHcixnWAUJYjmWYzmWYzmWYznDKkgQy7Ecy7Ecy7Ecy5GCIEEsx3Isx3Isx3IsJ0iQIJZjOZZjOZZjOcMqSBDLsRzLsRzL9Wy5odZqhwQJWn4+AgwApGqd0LftHcgAAAAASUVORK5CYII=';
      fillImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAF+CAYAAADNzDlVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABFhJREFUeNrs3U+O1DgUgHHblUFzhb7GCCHNtnfMFUasOA9HYEWfAQlpZq6AEOIIdPcFZgMVe5L6Q6pLzQjFLZK2fpZSKbVioQ8n9b68+Dnxz39fXYYYrkIIF+Fxt5the5kagQkHhtepEZhvUCk01tLh3Gul3aZQwovxSwMwn8cfhW74+Lul66jJawgQIEB1QJfDdj1s5ZFvI8NzLsfluByX43KAlmzjKRdyTkYIEJeb6XK5JC7H5bhchculmLmcOASoAqjPGyMEiMtVuFyMhctxOS5X4XKlRC4nDgECBIjLLeVyXSnpqhQux+W43FyXi/Jy4hCgKqC+74wQIC5XkZdLKcvLcTkuV+FyOScuJw4Bmt/MlwPE5WprH4LaBy7H5WpcbvjgcuIQIECAuByXe0iXy4eJtOONXilx2NJh238PIYbpmPP9qvpc7O5YU+r351/KB9hyAl7C3WPO9+vqs3O5hkZocrn9H+PJwdP3Y87h/n9sNX24HKBFgLaesQLiclUul9Q+yMvJy1Xl5bLaB3EIUE3biVzvGSsgLjfb5Yb7ci7H5bhchcvFWLicOAQIECAux+W43P1QXcmpuWuotbyc2gdxCFBF29c+FHk5QFzOfDl5OS63jMsFtQ/iECBAgLgcl+Ny34PqcoMrot+cFkzEWIbtuN9/H0/R/yuyWFGf2zR8vBiLIHa5hTsFE3FGkcWifT4Pey63fqDt9hemsOYWSylGaM2t++P6zWUjS7KNuZGX1pdbO5S83Mqb9eXEIUC1gfV4r2GEAP08IHk5LsfluNzkcsEzVnEIULXLFS4HiMvNdrnh+uFyXI7LVbhcTN7hJQ4BqnU5eTlAXG6+y/XbjstxOS5X4XJ93nA5cQhQrcupYwXE5Wa7XLRWMJfjclUuV6wVLA4BAgSIyy3ncl0p6aoULsfluNxcl4vRM1ZxCBAgQFxuybWC25ov1+Wc2nK543tOj/tpeYxpOz9mzX3GERpd7uI4PWZcGuO8Hf82vSr07n5FfW7TZrPlcuIQoAqgL19+NUKAuFyFyw1xyDPWVbtci9dQY/Pl+o7LiUOA5rdD7cPGCAHicubLcTkut4jLmS8nDgF6CJdT+wCIy3kfK5fjcsu43HA/xOXEIUCVLnffhAYjBIjL/ZjLZevLcTkuV+Vyyfpy4hCgKqCvX58YIUBcbr7Lxd8/vb1u6Gf7hstxuZ/tcp6xikOAAAHicubLPYz2BHk5LsfluJzA+tja7hlrr/YBEJeb63Lx2cd38nJcjstVuFyyvpw4BAgQIC7H5bgcl3u0Lpd77/AShwBVNGuSAOJylS739MNf7blcSv1+uFI+LFmbT5avzbv/gOmY8/2q+lzc+ZWbqvZPK76OS9duvrNfV5/2XG4YMS4nDgECBIjLcbmHdLmGzjh5OS7H5cShxoGsLweIy1W63G/v/+FyXI7LVbic+XLiECBAgLgcl+NyXI7LrcXlYilFHAIEaH77T4ABAKzsRPWz+TQ7AAAAAElFTkSuQmCCgg';
      getOption = (function(_this) {
        return function(param) {
          var bgData, chartData, itemData, maxValue, option, xAxisData;
          chartData = [
            {
              name: param.key,
              value: param.val
            }
          ];
          xAxisData = [param.key];
          bgData = [
            {
              name: param.key,
              value: param.max
            }
          ];
          itemData = [param.val];
          maxValue = param.max;
          option = {
            tooltip: {
              formatter: '{b} : {c}'
            },
            grid: {
              left: '3%',
              right: '6%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: xAxisData,
              boundaryGap: ['20%', '20%'],
              splitLine: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  fontSize: 16,
                  color: '#3fdaff'
                }
              }
            },
            yAxis: [
              {
                type: 'value',
                splitLine: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false,
                  inside: true,
                  length: 10,
                  lineStyle: {
                    color: '#0b5263'
                  }
                },
                axisLabel: {
                  show: false,
                  textStyle: {
                    color: '#0b5263',
                    fontSize: 14
                  }
                }
              }
            ],
            series: [
              {
                name: 'bg',
                type: 'pictorialBar',
                barWidth: '45%',
                silent: true,
                label: {
                  normal: {
                    show: true,
                    position: "top",
                    distance: 20,
                    formatter: function() {
                      return param.val;
                    },
                    textStyle: {
                      color: "#d81212d9",
                      fontSize: 20
                    }
                  }
                },
                symbol: 'image://' + bgImg,
                symbolClip: false,
                symbolBoundingData: maxValue,
                symbolSize: [52, '100%'],
                data: bgData
              }, {
                name: '数据',
                type: 'pictorialBar',
                barWidth: '45%',
                barGap: '-100%',
                data: chartData,
                z: 3,
                symbol: 'image://' + fillImg,
                symbolClip: true,
                symbolBoundingData: maxValue,
                symbolSize: [52, '100%']
              }
            ]
          };
          return option;
        };
      })(this);
      return scope.$watch("parameters", (function(_this) {
        return function(param) {
          var option;
          if (!param) {
            return;
          }
          option = getOption({
            key: param.key,
            val: param.val,
            max: param.max
          });
          if (typeof (param != null ? param.titleLen : void 0) === "number") {
            option.xAxis.axisLabel.textStyle.fontSize = 14;
            option.xAxis.axisLabel.formatter = function(d) {
              var html, strLine, x, _i, _ref;
              strLine = Math.ceil(d.length / param.titleLen);
              html = "";
              for (x = _i = 0, _ref = strLine - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
                html += d.slice(x * param.titleLen, (x + 1) * param.titleLen) + "\n";
              }
              return html;
            };
          }
          return scope.barChart.setOption(option);
        };
      })(this));
    };

    CapacityBarDirective.prototype.resize = function(scope) {
      return scope.barChart.resize();
    };

    CapacityBarDirective.prototype.dispose = function(scope) {};

    return CapacityBarDirective;

  })(base.BaseDirective);
  return exports = {
    CapacityBarDirective: CapacityBarDirective
  };
});
