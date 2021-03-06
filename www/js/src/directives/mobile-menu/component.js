
/*
* File: mobile-menu-directive
* User: David
* Date: 2020/03/17
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileMenuDirective, exports;
  MobileMenuDirective = (function(_super) {
    __extends(MobileMenuDirective, _super);

    function MobileMenuDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-menu";
      MobileMenuDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileMenuDirective.prototype.setScope = function() {};

    MobileMenuDirective.prototype.setCSS = function() {
      return css;
    };

    MobileMenuDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileMenuDirective.prototype.show = function(scope, element, attrs) {
      var _ref;
      element.find(".sidenav").css("height", document.body.clientHeight + "px");
      element.find('.sidenav').sidenav();
      scope.stateSelectBtn = 0;
      scope.rankSelectBtn = 0;
      scope.query = {
        taskId: "",
        state: "",
        rank: "",
        startTime: moment().format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD")
      };
      scope.state = [
        {
          name: "所有",
          value: ""
        }, {
          name: "等待处理",
          value: "1"
        }, {
          name: "进行中",
          value: "2"
        }, {
          name: "已结束",
          value: "3"
        }, {
          name: "拒绝",
          value: "4"
        }, {
          name: "取消",
          value: "5"
        }
      ];
      scope.rank = [
        {
          name: "所有",
          value: ""
        }, {
          name: "低",
          value: "1"
        }, {
          name: "中",
          value: "2"
        }, {
          name: "高",
          value: "3"
        }
      ];
      scope.stateData = (function(_this) {
        return function(d, i) {
          scope.stateSelectBtn = i;
          return scope.query.state = d.value;
        };
      })(this);
      scope.rankData = (function(_this) {
        return function(d, i) {
          scope.rankSelectBtn = i;
          return scope.query.rank = d.value;
        };
      })(this);
      if ((_ref = this.subscription) != null) {
        _ref.dispose();
      }
      this.subscription = this.commonService.subscribeEventBus("task-date", (function(_this) {
        return function(msg) {
          var message;
          if (msg && msg.message) {
            message = msg.message;
            if (message.id === "start") {
              scope.query.startTime = moment(message.period.startTime).format('YYYY-MM-DD');
            }
            if (message.id === "end") {
              return scope.query.endTime = moment(message.period.startTime).format('YYYY-MM-DD');
            }
          }
        };
      })(this));
      return scope.search = (function(_this) {
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
          console.log("filter", filter);
          _this.commonService.publishEventBus("task-query", filter);
          return element.find('.sidenav').removeClass("show");
        };
      })(this);
    };

    MobileMenuDirective.prototype.resize = function(scope) {};

    MobileMenuDirective.prototype.dispose = function(scope) {};

    return MobileMenuDirective;

  })(base.BaseDirective);
  return exports = {
    MobileMenuDirective: MobileMenuDirective
  };
});
