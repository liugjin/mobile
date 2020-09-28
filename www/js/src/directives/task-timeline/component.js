
/*
* File: task-timeline-directive
* User: David
* Date: 2019/06/28
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var TaskTimelineDirective, exports;
  TaskTimelineDirective = (function(_super) {
    __extends(TaskTimelineDirective, _super);

    function TaskTimelineDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "task-timeline";
      TaskTimelineDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    TaskTimelineDirective.prototype.setScope = function() {};

    TaskTimelineDirective.prototype.setCSS = function() {
      return css;
    };

    TaskTimelineDirective.prototype.setTemplate = function() {
      return view;
    };

    TaskTimelineDirective.prototype.show = function(scope, element, attrs) {
      var stateList, warpDetail;
      stateList = {
        reject: "拒绝",
        cancel: "取消",
        approval: "接受"
      };
      scope.taskId = null;
      scope.data = [];
      scope.selectNodeId = null;
      scope.openDetail = (function(_this) {
        return function(item, index) {
          if (scope.selectNodeId === index) {
            scope.selectNodeId = null;
            scope.currentContent = {};
            return;
          }
          scope.selectNodeId = index;
          return scope.currentContent = scope.data[index].contents;
        };
      })(this);
      scope.currentContent = {};
      warpDetail = (function(_this) {
        return function(data) {
          var arr;
          if (!data || (data != null ? data.length : void 0) <= 1) {
            return [];
          }
          arr = [];
          _.map(data[1].content, function(d) {
            if ((d != null ? d.equiptype : void 0) === "ups" || (d != null ? d.equiptype : void 0) === "environmental") {
              return _.map(d.equips, function(equip, index1) {
                return _.map(equip.value, function(m, index2) {
                  if (index2 === 0) {
                    return arr.push({
                      type: d != null ? d.equiptype : void 0,
                      typeName: d.equiptypeName,
                      equipment: equip.equipment,
                      equipmentName: equip.equipmentName,
                      value: m.name + "：" + m.value,
                      row: equip.value.length
                    });
                  } else {
                    return arr.push({
                      type: d != null ? d.equiptype : void 0,
                      typeName: d.equiptypeName,
                      value: m.name + "：" + m.value
                    });
                  }
                });
              });
            } else if ((d != null ? d.equiptype : void 0) === "meter") {
              return _.map(d.equips, function(equip) {
                return arr.push({
                  type: "meter",
                  typeName: d.equiptypeName,
                  equipment: equip.equipment,
                  value: equip.equipmentName + "：" + equip.value
                });
              });
            } else if ((d != null ? d.equiptype : void 0) === "systemstatus") {
              return _.map(d.equips, function(equip) {
                return arr.push({
                  type: "systemstatus",
                  typeName: d != null ? d.equiptypeName : void 0,
                  equipment: equip.equipment,
                  equipmentName: equip.equipmentName,
                  value: equip.checked
                });
              });
            } else if (typeof d === "string") {
              return arr.push({
                type: "memo",
                typeName: "备注",
                value: d
              });
            }
          });
          return _.groupBy(arr, function(d) {
            return d.type;
          });
        };
      })(this);
      return scope.$watch("parameters.datas", (function(_this) {
        return function(datas) {
          var _ref;
          if (!(datas != null ? datas.nodes : void 0)) {
            return;
          }
          scope.data = _.map(datas.nodes, function(node) {
            var _ref;
            return {
              nodeName: node.name,
              state: stateList[node.state],
              manager: node != null ? (_ref = node.manager) != null ? _ref.name : void 0 : void 0,
              timestamp: _.has(node, "timestamp") ? moment(node.timestamp).format("YYYY-MM-DD HH：MM：SS") : "",
              contents: warpDetail(node != null ? node.contents : void 0)
            };
          });
          scope.taskId = (datas != null ? (_ref = datas.phase) != null ? _ref.progress : void 0 : void 0) !== 1 ? datas.task + "  ( 进行中 )" : datas.task + "  ( 已完成 )";
          return scope.$applyAsync();
        };
      })(this));
    };

    TaskTimelineDirective.prototype.resize = function(scope) {};

    TaskTimelineDirective.prototype.dispose = function(scope) {};

    return TaskTimelineDirective;

  })(base.BaseDirective);
  return exports = {
    TaskTimelineDirective: TaskTimelineDirective
  };
});
