
/*
* File: mobile-maintenance-operation-directive
* User: David
* Date: 2020/03/09
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts"], function(base, css, view, _, moment, echarts) {
  var MobileMaintenanceOperationDirective, exports;
  MobileMaintenanceOperationDirective = (function(_super) {
    __extends(MobileMaintenanceOperationDirective, _super);

    function MobileMaintenanceOperationDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.createChartOption = __bind(this.createChartOption, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-maintenance-operation";
      MobileMaintenanceOperationDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileMaintenanceOperationDirective.prototype.setScope = function() {};

    MobileMaintenanceOperationDirective.prototype.setCSS = function() {
      return css;
    };

    MobileMaintenanceOperationDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileMaintenanceOperationDirective.prototype.show = function(scope, element, attrs) {
      var e, options, _ref, _ref1;
      scope.states = [
        {
          name: "工单",
          value: 0,
          color: '#7B46FA'
        }, {
          name: "设备",
          value: 0,
          color: '#FD5916'
        }
      ];
      scope.subtext = ["维保总单数"];
      scope.states[0].value = 300;
      scope.states[1].value = 400;
      scope.count = 500;
      e = element.find('.echarts');
      if ((_ref = scope.myChart) != null) {
        _ref.dispose();
      }
      scope.myChart = echarts.init(e[0]);
      options = this.createChartOption(scope, scope.states, scope.count, scope.subtext[0]);
      return (_ref1 = scope.myChart) != null ? _ref1.setOption(options) : void 0;
    };

    MobileMaintenanceOperationDirective.prototype.createChartOption = function(scope, states, count, subtext) {
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

    MobileMaintenanceOperationDirective.prototype.resize = function(scope) {};

    MobileMaintenanceOperationDirective.prototype.dispose = function(scope) {};

    return MobileMaintenanceOperationDirective;

  })(base.BaseDirective);
  return exports = {
    MobileMaintenanceOperationDirective: MobileMaintenanceOperationDirective
  };
});
