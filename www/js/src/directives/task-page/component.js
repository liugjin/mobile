
/*
* File: task-page-directive
* User: David
* Date: 2019/11/11
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", 'clc.foundation.angular/models/structure-model', 'gl-datepicker'], function(base, css, view, _, moment, sm, gl) {
  var TaskPageDirective, exports;
  TaskPageDirective = (function(_super) {
    __extends(TaskPageDirective, _super);

    function TaskPageDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "task-page";
      TaskPageDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    TaskPageDirective.prototype.setScope = function() {};

    TaskPageDirective.prototype.setCSS = function() {
      return css;
    };

    TaskPageDirective.prototype.setTemplate = function() {
      return view;
    };

    TaskPageDirective.prototype.show = function(scope, element, attrs) {
      var setGlDatePicker, _ref;
      scope.query = {
        taskId: "",
        state: "",
        rank: "",
        startTime: moment().subtract(7, 'days').format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD")
      };
      scope.modal = M.Modal.getInstance($("#task-modal"));
      scope.search = (function(_this) {
        return function() {
          var filter;
          filter = scope.project.getIds();
          filter["createtime"] = {};
          _.mapObject(scope.query, function(d, i) {
            if (d === '') {
              return;
            }
            if (i === "taskId") {
              return filter["task"] = {
                $regex: d
              };
            } else if (i === "rank") {
              return filter["rank"] = d;
            } else if (i === "startTime") {
              return filter["createtime"]["$gte"] = d;
            } else if (i === "endTime") {
              return filter["createtime"]["$lte"] = d;
            } else if (i === "state" && d === '1') {
              filter["$or"] = [
                {
                  "phase.nextManager": null
                }
              ];
              return filter["phase.progress"] = {
                '$exists': false
              };
            } else if (i === "state" && d === '2') {
              filter["$or"] = [
                {
                  "phase.progress": {
                    '$exists': true,
                    '$gte': 0,
                    '$lt': 1
                  }
                }, {
                  "phase.nextManager": {
                    '$exists': true
                  }
                }
              ];
              return filter["$nor"] = [
                {
                  "phase.state": "reject"
                }, {
                  "phase.state": "cancel"
                }, {
                  "phase.progress": 1
                }
              ];
            } else if (i === "state" && d === '3') {
              filter["phase.progress"] = 1;
              return filter["$nor"] = [
                {
                  "phase.state": "reject"
                }, {
                  "phase.state": "cancel"
                }
              ];
            } else if (i === "state" && d === '4') {
              return filter["phase.state"] = "reject";
            } else if (i === "state" && d === '5') {
              return filter["phase.state"] = "cancel";
            }
          });
          return _this.commonService.publishEventBus("task-query", filter);
        };
      })(this);
      setGlDatePicker = (function(_this) {
        return function(element, value) {
          if (!value) {
            return;
          }
          return setTimeout(function() {
            return gl = $(element).glDatePicker({
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
                target.val(date.getFullYear() + "-" + month + "-" + day).trigger("change");
                scope.query.startTime = moment(scope.query.startTime).startOf('day').format('YYYY-MM-DD');
                return scope.query.endTime = moment(scope.query.endTime).endOf('day').format('YYYY-MM-DD');
              }
            });
          }, 500);
        };
      })(this);
      setGlDatePicker(element.find('#startInput')[0], scope.query.startTime);
      setGlDatePicker(element.find('#endInput')[0], scope.query.endTime);
      scope.myenter = (function(_this) {
        return function(id) {
          var nowvalue;
          nowvalue = $('#' + id).offset().left;
          $('.gldp-default').css("left", nowvalue + 'px');
          return $('.gldp-default').css("position", 'absolute');
        };
      })(this);
      scope.formatDate = (function(_this) {
        return function(d) {
          if (d === "startInput") {
            return scope.query.startTime = moment(scope.query.startTime).format('YYYY-MM-DD');
          } else if (d === "endInput") {
            return scope.query.endTime = moment(scope.query.endTime).format('YYYY-MM-DD');
          }
        };
      })(this);
      if ((_ref = scope.subscribeModel) != null) {
        _ref.dispose();
      }
      return scope.subscribeModel = this.commonService.subscribeEventBus("task-model", (function(_this) {
        return function(msg) {
          var _ref1, _ref2, _ref3, _ref4;
          if (typeof (msg != null ? (_ref1 = msg.message) != null ? _ref1.open : void 0 : void 0) !== "boolean") {
            return;
          }
          scope.task = (_ref2 = msg.message) != null ? (_ref3 = _ref2.task) != null ? _ref3.task : void 0 : void 0;
          if (typeof ((_ref4 = scope.model) != null ? _ref4.open : void 0) !== "function") {
            scope.modal = M.Modal.getInstance($("#task-modal"));
            if (msg.message.open) {
              return scope.modal.open();
            } else {
              return scope.modal.close();
            }
          } else {
            if (msg.message.open) {
              return scope.modal.open();
            } else {
              return scope.modal.close();
            }
          }
        };
      })(this));
    };

    TaskPageDirective.prototype.resize = function(scope) {
      var _ref;
      return (_ref = scope.subscribeModel) != null ? _ref.dispose() : void 0;
    };

    TaskPageDirective.prototype.dispose = function(scope) {};

    return TaskPageDirective;

  })(base.BaseDirective);
  return exports = {
    TaskPageDirective: TaskPageDirective
  };
});
