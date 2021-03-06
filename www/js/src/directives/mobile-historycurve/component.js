
/*
* File: mobile-historycurve-directive
* User: David
* Date: 2018/12/08
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts", 'rx', 'clc.foundation.angular/filters/format-string-filter', 'gl-datepicker', 'calendar'], function(base, css, view, _, moment, echarts, Rx, fsf, gl, lc) {
  var MobileHistorycurveDirective, exports;
  MobileHistorycurveDirective = (function(_super) {
    __extends(MobileHistorycurveDirective, _super);

    function MobileHistorycurveDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-historycurve";
      MobileHistorycurveDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileHistorycurveDirective.prototype.setScope = function() {};

    MobileHistorycurveDirective.prototype.setCSS = function() {
      return css;
    };

    MobileHistorycurveDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileHistorycurveDirective.prototype.show = function($scope, element, attrs) {
      var addPointToSerie, calendar, createOption, e, formatString, getChartSignals, getLegend, getPeriod, getPoint, getPoints, getSeries, getSeverity, getUnit, maxPoints, nextPeriod, option, previousPeriod, querySignalRecords, queryStatisticRecords, renderChart, series, setGlDatePicker, subscribeSignal, waitingEcharts, waitingLayout, _ref, _ref1, _ref2;
      $scope.subscriptions = {};
      getPeriod = function(mode) {
        var endTime, startTime;
        if (mode == null) {
          mode = 'day';
        }
        switch (mode) {
          case 'now':
            startTime = moment().subtract(60, 'minutes');
            endTime = moment();
            break;
          case '60minutes':
            startTime = moment().subtract(60, 'minutes');
            endTime = moment();
            break;
          case 'hour':
            startTime = moment().startOf('hour');
            endTime = moment().endOf('hour');
            break;
          case 'day':
            startTime = moment().startOf('day');
            endTime = moment().endOf('day');
            break;
          case 'week':
            startTime = moment().startOf('week');
            endTime = moment().endOf('week');
            break;
          case 'month':
            startTime = moment().startOf('month');
            endTime = moment().endOf('month');
            break;
          case 'year':
            startTime = moment().startOf('year');
            endTime = moment().endOf('year');
            break;
          default:
            startTime = moment().subtract(60, 'minutes');
            endTime = moment();
        }
        return $scope.period = {
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
          if (!$scope.period) {
            return getPeriod(mode);
          }
          switch ($scope.period.mode) {
            case '60minutes':
              startTime = $scope.period.endTime;
              endTime = moment($scope.period.endTime).add(60, 'minutes');
              break;
            case 'hour':
              startTime = moment($scope.period.startTime).add(1, 'hour').startOf('hour');
              endTime = moment($scope.period.startTime).add(1, 'hour').endOf('hour');
              break;
            case 'day':
              startTime = moment($scope.period.startTime).add(1, 'day').startOf('day');
              endTime = moment($scope.period.startTime).add(1, 'day').endOf('day');
              break;
            case 'week':
              startTime = moment($scope.period.startTime).add(1, 'week').startOf('week');
              endTime = moment($scope.period.startTime).add(1, 'week').endOf('week');
              break;
            case 'month':
              startTime = moment($scope.period.startTime).add(1, 'month').startOf('month');
              endTime = moment($scope.period.startTime).add(1, 'month').endOf('month');
              break;
            case 'year':
              startTime = moment($scope.period.startTime).add(1, 'year').startOf('year');
              endTime = moment($scope.period.startTime).add(1, 'year').endOf('year');
              break;
            default:
              startTime = $scope.period.endTime;
              endTime = moment($scope.period.endTime).add(60, 'minutes');
          }
          return $scope.period = {
            startTime: startTime,
            endTime: endTime,
            mode: $scope.period.mode
          };
        };
      })(this);
      previousPeriod = (function(_this) {
        return function(mode) {
          var endTime, startTime;
          if (mode == null) {
            mode = 'day';
          }
          if (!$scope.period) {
            return getPeriod(mode);
          }
          switch ($scope.period.mode) {
            case '60minutes':
              startTime = moment($scope.period.startTime).subtract(60, 'minutes');
              endTime = $scope.period.startTime;
              break;
            case 'hour':
              startTime = moment($scope.period.startTime).subtract(1, 'hour').startOf('hour');
              endTime = moment($scope.period.startTime).subtract(1, 'hour').endOf('hour');
              break;
            case 'day':
              startTime = moment($scope.period.startTime).subtract(1, 'day').startOf('day');
              endTime = moment($scope.period.startTime).subtract(1, 'day').endOf('day');
              break;
            case 'week':
              startTime = moment($scope.period.startTime).subtract(1, 'week').startOf('week');
              endTime = moment($scope.period.startTime).subtract(1, 'week').endOf('week');
              break;
            case 'month':
              startTime = moment($scope.period.startTime).subtract(1, 'month').startOf('month');
              endTime = moment($scope.period.startTime).subtract(1, 'month').endOf('month');
              break;
            case 'year':
              startTime = moment($scope.period.startTime).subtract(1, 'year').startOf('year');
              endTime = moment($scope.period.startTime).subtract(1, 'year').endOf('year');
              break;
            default:
              startTime = moment($scope.period.startTime).subtract(60, 'minutes');
              endTime = $scope.period.startTime;
          }
          return $scope.period = {
            startTime: startTime,
            endTime: endTime,
            mode: $scope.period.mode
          };
        };
      })(this);
      formatString = fsf.FormatStringFilter();
      e = element.find('.ss-chart');
      $scope.mode = 'now';
      $scope.myChart = null;
      $scope.oneSignal = null;
      $scope.signals = [];
      $scope.selectSignals = [];
      option = null;
      series = [];
      maxPoints = 20;
      $scope.period = getPeriod($scope.mode);
      $scope.formatStartTime = moment($scope.period.startTime).format('YYYY-MM-DD');
      calendar = new LCalendar();
      calendar.init({
        trigger: '#calendar',
        type: 'date',
        minDate: moment().subtract(10, 'years').format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD')
      });
      setGlDatePicker = function(element, value) {
        if (!value) {
          return;
        }
        return setTimeout(function() {
          return $scope.gl = $(element).glDatePicker({
            dowNames: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            selectedDate: moment(value).toDate(),
            onClick: function(target, cell, date, data) {
              var day, month;
              month = date.getMonth() + 1;
              if (month < 10) {
                month = "0" + month;
              }
              day = date.getDate();
              if (day < 10) {
                day = "0" + day;
              }
              return target.val(date.getFullYear() + "-" + month + "-" + day).trigger("change");
            }
          });
        }, 500);
      };
      waitingLayout = (function(_this) {
        return function($timeout, element, callback) {
          return $timeout(function() {
            if (element.width() <= 100) {
              return waitingLayout($timeout, element, callback);
            } else {
              return callback();
            }
          }, 200);
        };
      })(this);
      waitingEcharts = (function(_this) {
        return function(callback) {
          console.log('waiting echarts');
          return setTimeout(function() {
            if (!$scope.myChart) {
              console.log("echarts没初始化完");
              return waitingEcharts(callback);
            } else {
              console.log("-echarts初始化完成--");
              return callback();
            }
          }, 200);
        };
      })(this);
      waitingLayout(this.$timeout, e, (function(_this) {
        return function() {
          return renderChart(e);
        };
      })(this));
      renderChart = (function(_this) {
        return function(element) {
          var _ref, _ref1;
          if ((_ref = $scope.myChart) != null) {
            _ref.dispose();
          }
          $scope.myChart = echarts.init(element[0]);
          if (option) {
            return (_ref1 = $scope.myChart) != null ? _ref1.setOption(option) : void 0;
          }
        };
      })(this);
      if ((_ref = $scope.stationIdSubscription) != null) {
        _ref.dispose();
      }
      $scope.stationIdSubscription = this.subscribeEventBus('stationId', (function(_this) {
        return function(d) {
          return _this.getStation($scope, d.message.stationId);
        };
      })(this));
      if ((_ref1 = $scope.equipmentIdSubscription) != null) {
        _ref1.dispose();
      }
      $scope.equipmentIdSubscription = this.subscribeEventBus('equipmentId', (function(_this) {
        return function(d) {
          return _this.getEquipment($scope, d.message.equipmentId, function() {
            return $scope.$applyAsync();
          });
        };
      })(this));
      if ((_ref2 = $scope.signalIdSubscription) != null) {
        _ref2.dispose();
      }
      $scope.signalIdSubscription = this.subscribeEventBus('signalId', (function(_this) {
        return function(d) {
          var signal, _ref3, _ref4, _ref5;
          if ($scope.equipment.model.station !== ((_ref3 = d.message) != null ? _ref3.stationId : void 0) && $scope.equipment.model.equipment !== ((_ref4 = d.message) != null ? _ref4.equipmentId : void 0)) {
            return;
          }
          $scope.selectSignals = [];
          $scope.$applyAsync();
          $scope.oneSignal = (_ref5 = d.message) != null ? _ref5.signalId : void 0;
          signal = _.find($scope.equipment.signals.items, function(sig) {
            return sig.model.signal === $scope.oneSignal;
          });
          if (signal) {
            return $scope.selectSignals.push(signal);
          }
        };
      })(this));
      $scope.$watch("equipment", (function(_this) {
        return function(equipment) {
          if (!equipment) {
            return;
          }
          return getChartSignals(equipment);
        };
      })(this));
      getChartSignals = (function(_this) {
        return function(equipment) {
          $scope.signals = [];
          $scope.selectSignals = [];
          return equipment != null ? equipment.loadSignals(null, function(err, signals) {
            if (!err) {
              $scope.signals = signals;
            }
            _this.getProperty($scope, '_signals');
            return $scope.$applyAsync();
          }, true) : void 0;
        };
      })(this);
      $scope.$watch('property', (function(_this) {
        return function(property) {
          var item, mySignals, s, value, _i, _j, _len, _len1, _ref3, _signal, _signals;
          if (!property || !property.value) {
            value = "[]";
          } else {
            value = property.value;
          }
          _signals = JSON.parse(value);
          mySignals = [];
          $scope.signals = [];
          for (_i = 0, _len = _signals.length; _i < _len; _i++) {
            s = _signals[_i];
            item = _.find($scope.equipment.signals.items, function(item) {
              return item.model.signal === s.signal;
            });
            if (item) {
              $scope.signals.push(item);
            }
          }
          if ($scope.signals.length < 1) {
            $scope.signals = $scope.equipment.signals.items;
          }
          if ($scope.selectSignals.length < 1) {
            _signal = _.find($scope.signals, function(s) {
              return s.model.dataType === 'float';
            });
            _ref3 = $scope.signals;
            for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
              item = _ref3[_j];
              if (item.model.signal === $scope.oneSignal) {
                mySignals = [item];
              }
            }
            $scope.selectSignals = !(_.isEmpty(mySignals)) ? mySignals : (_signal ? [_signal] : []);
            return $scope.$applyAsync();
          }
        };
      })(this));
      $scope.$watch('selectSignals', (function(_this) {
        return function(selectSignals) {
          var _ref3;
          if ((selectSignals instanceof Array) === false) {
            $scope.selectSignals = [selectSignals];
            $scope.$applyAsync();
          }
          if (!selectSignals) {
            if ((_ref3 = $scope.myChart) != null) {
              _ref3.clear();
            }
            return;
          }
          if (!$scope.selectSignals || $scope.selectSignals.length < 1 || !$scope.selectSignals[0]) {
            return;
          }
          return $scope.selectStatisticMode($scope.mode);
        };
      })(this));
      $scope.selectStatisticMode = (function(_this) {
        return function(mode, period) {
          $scope.mode = mode;
          $scope.period.mode = $scope.mode;
          if (mode === 'heatmap') {
            return;
          }
          return queryStatisticRecords($scope.selectSignals, $scope.mode, period, function(err, records) {
            var _ref3, _ref4;
            option = createOption(null, $scope.selectSignals, records);
            if ((_ref3 = $scope.myChart) != null) {
              _ref3.clear();
            }
            if ((_ref4 = $scope.myChart) != null) {
              _ref4.setOption(option);
            }
            return series = option.series;
          });
        };
      })(this);
      $scope.selectDates = (function(_this) {
        return function() {
          $scope.period.startTime = $scope.formatStartTime;
          return $scope.selectDate();
        };
      })(this);
      $scope.selectSignal = function(sig) {
        $scope.selectSignals = [sig];
        element.find('.mysignals').hide();
        return true;
      };
      $scope.selectDate = (function(_this) {
        return function(periodType) {
          var _ref3;
          switch (periodType) {
            case 'next':
              $scope.period = nextPeriod();
              break;
            case 'previous':
              $scope.period = previousPeriod();
              break;
            case 'refresh':
              $scope.period = (_ref3 = $scope.period) != null ? _ref3 : getPeriod();
              break;
            default:
              $scope.period.startTime = moment($scope.period.startTime).startOf('day');
              $scope.period.endTime = moment($scope.period.startTime).endOf('day');
          }
          $scope.formatStartTime = moment($scope.period.startTime).format('YYYY-MM-DD');
          $scope.period.mode = 'day';
          return $scope.selectStatisticMode($scope.period.mode, $scope.period);
        };
      })(this);
      $scope.queryRecords = (function(_this) {
        return function(periodType) {
          switch (periodType) {
            case 'next':
              $scope.period = nextPeriod();
              break;
            case 'previous':
              $scope.period = previousPeriod();
              break;
            case 'refresh':
              $scope.period = getPeriod($scope.mode);
              break;
            default:
              $scope.period = getPeriod($scope.period.mode);
          }
          return $scope.selectStatisticMode($scope.period.mode, $scope.period);
        };
      })(this);
      $scope.shiftCalendar = (function(_this) {
        return function(action) {
          if (action === 'next') {
            return _this.publishEventBus('history-curve-heat-map', {
              action: 'next'
            });
          } else if (action === 'prev') {
            return _this.publishEventBus('history-curve-heat-map', {
              action: 'prev'
            });
          } else if (action === 'rewind') {
            return _this.publishEventBus('history-curve-heat-map', {
              action: 'rewind'
            });
          }
        };
      })(this);
      subscribeSignal = (function(_this) {
        return function(signal) {
          var _ref3;
          if ((_ref3 = $scope.subscriptions[signal.model.signal]) != null) {
            _ref3.dispose();
          }
          return $scope.subscriptions[signal.model.signal] = _this.commonService.subscribeSignalValue(signal, function(d) {
            var _ref4;
            if ($scope.mode === 'now') {
              addPointToSerie(signal, d.data);
              return (_ref4 = $scope.myChart) != null ? _ref4.setOption({
                series: series
              }) : void 0;
            }
          });
        };
      })(this);
      addPointToSerie = (function(_this) {
        return function(signal, data) {
          var point, points, serie;
          serie = _.find(series, function(s) {
            return s.name === signal.model.name;
          });
          if (!serie) {
            return;
          }
          points = serie.data;
          point = getPoint(signal, data);
          points.push(point);
          if (points.length > maxPoints) {
            points.shift();
          }
          return point;
        };
      })(this);
      querySignalRecords = (function(_this) {
        return function(signals, page, pageItems, sorting, mode, period, callback) {
          var filter, paging;
          if (page == null) {
            page = 1;
          }
          if (pageItems == null) {
            pageItems = 6;
          }
          if (sorting == null) {
            sorting = {
              'timestamp': 1
            };
          }
          if (!signals || signals.length < 1) {
            return;
          }
          filter = {
            startTime: moment($scope.formatStartTime).startOf('day'),
            endTime: moment($scope.formatStartTime).endOf('day')
          };
          if (mode === 'day') {
            if (period && period.mode === 'day') {
              $scope.period = period;
            } else {
              $scope.period = getPeriod(mode);
            }
            $scope.period.startTime = filter.startTime;
            $scope.period.endTime = filter.endTime;
          }
          paging = {
            page: page,
            pageItems: pageItems
          };
          return _this.commonService.querySignalsHistoryData(signals, filter.startTime, filter.endTime, function(err, records, pageInfo) {
            return typeof callback === "function" ? callback(err, records) : void 0;
          }, paging, sorting);
        };
      })(this);
      queryStatisticRecords = (function(_this) {
        return function(signals, mode, period, callback) {
          var filter, observableBatch, _querySignalRecords;
          if (mode == null) {
            mode = 'day';
          }
          if (!signals || (!signals.length)) {
            return;
          }
          if (mode === 'now') {
            _querySignalRecords = Rx.Observable.fromCallback(querySignalRecords);
            observableBatch = _.map(signals, function(s) {
              return _querySignalRecords([s], 1, 8, {
                timestamp: -1
              }, null, period);
            });
            return Rx.Observable.forkJoin(observableBatch).subscribe(function(resArr) {
              var result, signal, _i, _len;
              result = {};
              _.each(resArr, function(item) {
                return _.extend(result, item[1]);
              });
              for (_i = 0, _len = signals.length; _i < _len; _i++) {
                signal = signals[_i];
                subscribeSignal(signal);
              }
              return typeof callback === "function" ? callback(null, result) : void 0;
            });
          } else if (mode === 'day') {
            _querySignalRecords = Rx.Observable.fromCallback(querySignalRecords);
            observableBatch = _.map(signals, function(s) {
              return _querySignalRecords([s], 1, 10000, {
                timestamp: 1
              }, 'day', period);
            });
            return Rx.Observable.forkJoin(observableBatch).subscribe(function(resArr) {
              var result;
              result = {};
              _.each(resArr, function(item) {
                return _.extend(result, item[1]);
              });
              return typeof callback === "function" ? callback(null, result) : void 0;
            });
          } else {
            filter = {};
            if (!period) {
              $scope.period = getPeriod(mode);
            }
            period = $scope.period;
            switch (mode) {
              case "week":
                filter.mode = "hour";
                filter.startTime = period.startTime.startOf("week").format("YYYY-MM-DD HH:mm:ss");
                filter.endTime = period.endTime.endOf("week").format("YYYY-MM-DD HH:mm:ss");
                $scope.formatStatisticTime = period.startTime.startOf("week").format("MM/DD") + "-" + period.endTime.endOf("week").format("MM/DD");
                break;
              case "month":
                filter.mode = "day";
                filter.startTime = period.startTime.startOf("month").format("YYYY-MM-DD HH:mm:ss");
                filter.endTime = period.endTime.endOf("month").format("YYYY-MM-DD HH:mm:ss");
                $scope.formatStatisticTime = moment(filter.startTime).format("YYYY-MM");
                break;
              case "year":
                filter.mode = "month";
                filter.startTime = period.startTime.startOf("year").format("YYYY-MM-DD HH:mm:ss");
                filter.endTime = period.endTime.endOf("year").format("YYYY-MM-DD HH:mm:ss");
                $scope.formatStatisticTime = moment(filter.startTime).format("YYYY");
            }
            return _this.commonService.querySignalsStatisticData(signals, filter.startTime, filter.endTime, filter.mode, function(err, records, pageInfo) {
              return typeof callback === "function" ? callback(err, records) : void 0;
            });
          }
        };
      })(this);
      getSeverity = function(data) {
        var color, severity, tooltip, _ref3, _ref4, _ref5, _ref6;
        severity = (_ref3 = $scope.project) != null ? (_ref4 = _ref3.typeModels.eventseverities.getItem(data.severity)) != null ? _ref4.model : void 0 : void 0;
        color = (_ref5 = severity != null ? severity.color : void 0) != null ? _ref5 : '#0faa57';
        tooltip = (_ref6 = severity != null ? severity.name : void 0) != null ? _ref6 : '信号正常';
        return {
          color: color,
          tooltip: tooltip
        };
      };
      getLegend = function(signals) {
        var legend, s, _i, _len;
        legend = [];
        for (_i = 0, _len = signals.length; _i < _len; _i++) {
          s = signals[_i];
          legend.push(s.model.name);
        }
        return legend;
      };
      getPoints = function(signal, values) {
        var point, points, value, _i, _len;
        points = [];
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          point = getPoint(signal, value);
          points.push(point);
        }
        return _.sortBy(points, function(p) {
          return p.value[0];
        });
      };
      getPoint = function(signal, value) {
        var point, severity, timestamp, tooltip, _ref3, _ref4;
        if (!signal) {
          return;
        }
        severity = getSeverity(value);
        timestamp = moment(value.timestamp).format('HH:mm:ss');
        tooltip = "" + signal.model.name + ": " + (formatString(value.value, 'float', '0.[00]')) + ((_ref3 = (_ref4 = $scope.project.dictionary.signaltypes.keys[signal.model.unit]) != null ? _ref4.model.unit : void 0) != null ? _ref3 : "") + "<br/>" + (moment(value.timestamp).format('YYYY-MM-DD HH:mm:ss'));
        tooltip += '<br/><span style="display:inline-block;border-radius:10px;width:9px;height:9px;background-color:' + severity.color + '"></span>';
        tooltip += " " + severity.tooltip;
        point = {
          name: timestamp,
          value: [new Date(value.timestamp), value.value, tooltip]
        };
        return point;
      };
      getSeries = function(signals, values) {
        var areaColors, index, k, points, sere, signal, v, _i, _len;
        areaColors = [
          [
            {
              offset: 0,
              color: '#32CD32'
            }, {
              offset: 1,
              color: '#ffffff'
            }
          ], [
            {
              offset: 0,
              color: '#00ff00'
            }, {
              offset: 1,
              color: '#ffffff'
            }
          ], [
            {
              offset: 0,
              color: '#0000ff'
            }, {
              offset: 1,
              color: '#ffffff'
            }
          ], [
            {
              offset: 0,
              color: '#FFC0CB'
            }, {
              offset: 1,
              color: '#ffffff'
            }
          ], [
            {
              offset: 0,
              color: '#9400D3'
            }, {
              offset: 1,
              color: '#ffffff'
            }
          ], [
            {
              offset: 0,
              color: '#00BFFF'
            }, {
              offset: 1,
              color: '#ffffff'
            }
          ], [
            {
              offset: 0,
              color: '#000000'
            }, {
              offset: 1,
              color: '#ffffff'
            }
          ]
        ];
        if (!signals.length) {
          return;
        }
        series = [];
        index = 0;
        for (k in values) {
          v = values[k];
          signal = _.find(signals, function(s) {
            return s.key === k;
          });
          points = getPoints(signal, v.values);
          sere = {
            name: signal != null ? signal.model.name : void 0,
            type: 'line',
            data: points,
            smooth: true,
            itemStyle: {
              color: {
                type: 'linear'
              },
              normal: {
                lineStyle: {
                  width: 2,
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#10A858'
                    }, {
                      offset: 0.5,
                      color: '#0D9D7A'
                    }, {
                      offset: 1,
                      color: '#098CAA'
                    }
                  ])
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, areaColors[index])
                }
              }
            }
          };
          index += 1;
          series.push(sere);
        }
        if (_.isEmpty(values)) {
          for (_i = 0, _len = signals.length; _i < _len; _i++) {
            signal = signals[_i];
            sere = {
              name: signal != null ? signal.model.name : void 0,
              type: 'line',
              data: [],
              smooth: true,
              itemStyle: {
                color: {
                  type: 'linear'
                },
                normal: {
                  lineStyle: {
                    width: 2,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: '#10A858'
                      }, {
                        offset: 0.5,
                        color: '#0D9D7A'
                      }, {
                        offset: 1,
                        color: '#098CAA'
                      }
                    ])
                  },
                  areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, areaColors[index])
                  }
                }
              }
            };
            index += 1;
            series.push(sere);
          }
        }
        return series;
      };
      getUnit = function(unitId) {
        var item, unitItem, _i, _len, _ref3, _ref4;
        if (!unitId) {
          return '';
        }
        _ref4 = (_ref3 = $scope.project.dictionary) != null ? _ref3.signaltypes.items : void 0;
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          item = _ref4[_i];
          unitItem = item.model;
          if (unitItem.type === unitId) {
            return unitItem.unit;
          }
        }
        return unitId;
      };
      createOption = (function(_this) {
        return function(title, signals, values) {
          var legend;
          series = getSeries(signals, values);
          legend = getLegend(signals);
          option = {
            color: ['#0faa57'],
            grid: {
              top: 50,
              bottom: 50,
              containLabel: false
            },
            tooltip: {
              trigger: 'axis',
              formatter: function(params) {
                var _ref3, _ref4, _ref5, _ref6;
                return (_ref3 = (_ref4 = params[0]) != null ? (_ref5 = _ref4.data) != null ? (_ref6 = _ref5.value) != null ? _ref6[2] : void 0 : void 0 : void 0) != null ? _ref3 : '';
              }
            },
            legend: {
              data: legend
            },
            dataZoom: [
              {
                type: 'inside'
              }, {
                type: 'slider'
              }
            ],
            xAxis: {
              type: 'time',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                formatter: "{value}",
                textStyle: {
                  color: '#c3c3c3'
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#000'
                }
              },
              splitLine: {
                show: false
              }
            },
            yAxis: {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                formatter: "{value}",
                textStyle: {
                  color: '#c3c3c3'
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#000'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#dedede'],
                  width: 1,
                  type: 'dashed'
                }
              }
            },
            series: series
          };
          return option;
        };
      })(this);
      return $scope.filterSignal = (function(_this) {
        return function() {
          return function(signal) {
            if (signal.model.dataType === 'float') {
              return true;
            }
            return false;
          };
        };
      })(this);
    };

    MobileHistorycurveDirective.prototype.resize = function($scope) {
      var _ref;
      return (_ref = $scope.myChart) != null ? _ref.resize() : void 0;
    };

    MobileHistorycurveDirective.prototype.dispose = function($scope) {
      var key, value, _ref, _ref1, _ref2, _ref3, _ref4, _results;
      if ((_ref = $scope.myChart) != null) {
        _ref.dispose();
      }
      $scope.myChart = null;
      if ((_ref1 = $scope.signalIdSubscription) != null) {
        _ref1.dispose();
      }
      if ((_ref2 = $scope.equipmentIdSubscription) != null) {
        _ref2.dispose();
      }
      if ((_ref3 = $scope.stationIdSubscription) != null) {
        _ref3.dispose();
      }
      _ref4 = $scope.subscriptions;
      _results = [];
      for (key in _ref4) {
        value = _ref4[key];
        _results.push(value != null ? value.dispose() : void 0);
      }
      return _results;
    };

    return MobileHistorycurveDirective;

  })(base.BaseDirective);
  return exports = {
    MobileHistorycurveDirective: MobileHistorycurveDirective
  };
});
