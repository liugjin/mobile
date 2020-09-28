
/*
* File: mobile-order-handle1-directive
* User: David
* Date: 2019/08/06
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileOrderHandle1Directive, exports;
  MobileOrderHandle1Directive = (function(_super) {
    __extends(MobileOrderHandle1Directive, _super);

    function MobileOrderHandle1Directive($timeout, $window, $compile, $routeParams, commonService) {
      this.queryTaskReport = __bind(this.queryTaskReport, this);
      this.subscribeSignal = __bind(this.subscribeSignal, this);
      this.subscribeEvents = __bind(this.subscribeEvents, this);
      this.updateNode = __bind(this.updateNode, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-order-handle1";
      MobileOrderHandle1Directive.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
      this.taskService = commonService.modelEngine.modelManager.getService("tasks");
    }

    MobileOrderHandle1Directive.prototype.setScope = function() {};

    MobileOrderHandle1Directive.prototype.setCSS = function() {
      return css;
    };

    MobileOrderHandle1Directive.prototype.setTemplate = function() {
      return view;
    };

    MobileOrderHandle1Directive.prototype.show = function(scope, element, attrs) {
      scope.signalSubscriptions = {};
      scope.severities = {};
      _.each(scope.project.dictionary.eventseverities.items, function(item) {
        return scope.severities[item.model.severity] = {
          name: item.model.name,
          color: item.model.color,
          value: 0
        };
      });
      this.queryTaskReport(scope);
      scope.getMaxValue = function(variable) {
        var ret, values;
        if (!variable) {
          return;
        }
        values = _.values(variable);
        if (values.length > 0) {
          ret = _.max(values);
        }
        if (values.length === 0) {
          ret = "";
        }
        return ret;
      };
      scope.refreshData = (function(_this) {
        return function() {
          return scope.comment = "";
        };
      })(this);
      scope.uploadData = (function(_this) {
        return function() {
          var content, node;
          content = {};
          node = _.find(scope.task.nodes, function(node) {
            return node.node === scope.task.phase.nextNode;
          });
          if (node) {
            if (_.isEmpty(node.contents)) {
              node.contents = [];
            }
            content.severities = scope.severities;
            content.ups1 = scope.ups1;
            content.ups2 = scope.ups2;
            content.distributor = scope.distributor;
            content.battery = scope.battery;
            content.ac1 = scope.ac1;
            content.ac2 = scope.ac2;
            content.ac3 = scope.ac3;
            content.th1 = scope.th1;
            content.th2 = scope.th2;
            content.th3 = scope.th3;
            content.th4 = scope.th4;
            content.th5 = scope.th5;
            content.th6 = scope.th6;
            content.water1 = scope.water1;
            content.water2 = scope.water2;
            content.water3 = scope.water3;
            content.water4 = scope.water4;
            content.water5 = scope.water5;
            if (scope.comment) {
              content.comment = scope.comment;
            }
            node.contents.push({
              content: content
            });
            return _this.updateNode(scope, node, "approval", function(err, result) {
              if (result) {
                return _this.publishEventBus("updateNodeResult", {
                  result: true,
                  err: err
                });
              } else {
                return _this.publishEventBus("updateNodeResult", {
                  result: false,
                  err: err
                });
              }
            });
          }
        };
      })(this);
      this.subscribeEvents(scope);
      scope.ups1 = {
        loadRate: {}
      };
      this.subscribeSignal(scope, "center-wuhan", "ups1", "a-phase--output-load-percentage", function(msg) {
        return scope.ups1.loadRate.a = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "ups1", "b-phase--output-load-percentage", function(msg) {
        return scope.ups1.loadRate.b = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "ups1", "c-phase--output-load-percentage", function(msg) {
        return scope.ups1.loadRate.c = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "ups1", "_alarms", function(msg) {
        return scope.ups1.alarms = msg.value > 0;
      });
      scope.ups2 = {
        loadRate: {}
      };
      this.subscribeSignal(scope, "center-wuhan", "ups2", "a-phase--output-load-percentage", function(msg) {
        return scope.ups2.loadRate.a = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "ups2", "b-phase--output-load-percentage", function(msg) {
        return scope.ups2.loadRate.b = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "ups2", "c-phase--output-load-percentage", function(msg) {
        return scope.ups2.loadRate.c = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "ups2", "_alarms", function(msg) {
        return scope.ups2.alarms = msg.value > 0;
      });
      scope.distributor = {
        voltage: {}
      };
      this.subscribeSignal(scope, "center-wuhan", "meter4", "phase-a-voltage", function(msg) {
        return scope.distributor.voltage.a = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "meter4", "phase-b-voltage", function(msg) {
        return scope.distributor.voltage.b = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "meter4", "phase-c-voltage", function(msg) {
        return scope.distributor.voltage.c = parseFloat(msg.value.toFixed(1));
      });
      this.subscribeSignal(scope, "center-wuhan", "meter4", "_alarms", function(msg) {
        return scope.distributor.alarms = msg.value > 0;
      });
      scope.battery = {};
      this.subscribeSignal(scope, "center-wuhan", "th13", "temperature", function(msg) {
        return scope.battery.temperature = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th13", "humidity", function(msg) {
        return scope.battery.humidity = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th13", "_alarms", function(msg) {
        return scope.battery.alarms = msg.value > 0;
      });
      scope.ac1 = {};
      this.subscribeSignal(scope, "center-wuhan", "ac1", "_alarms", function(msg) {
        scope.ac1.alarms = msg.value > 0;
        return scope.ac1.status = msg.value > 0 ? "告警" : "正常";
      });
      scope.ac2 = {};
      this.subscribeSignal(scope, "center-wuhan", "ac2", "_alarms", function(msg) {
        scope.ac2.alarms = msg.value > 0;
        return scope.ac2.status = msg.value > 0 ? "告警" : "正常";
      });
      scope.ac3 = {};
      this.subscribeSignal(scope, "center-wuhan", "ac3", "_alarms", function(msg) {
        scope.ac3.alarms = msg.value > 0;
        return scope.ac3.status = msg.value > 0 ? "告警" : "正常";
      });
      scope.th1 = {};
      this.subscribeSignal(scope, "center-wuhan", "th1", "temperature", function(msg) {
        return scope.th1.temperature = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th1", "humidity", function(msg) {
        return scope.th1.humidity = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th1", "_alarms", function(msg) {
        return scope.th1.alarms = msg.value > 0;
      });
      scope.th2 = {};
      this.subscribeSignal(scope, "center-wuhan", "th4", "temperature", function(msg) {
        return scope.th2.temperature = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th4", "humidity", function(msg) {
        return scope.th2.humidity = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th4", "_alarms", function(msg) {
        return scope.th2.alarms = msg.value > 0;
      });
      scope.th3 = {};
      this.subscribeSignal(scope, "center-wuhan", "th5", "temperature", function(msg) {
        return scope.th3.temperature = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th5", "humidity", function(msg) {
        return scope.th3.humidity = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th5", "_alarms", function(msg) {
        return scope.th3.alarms = msg.value > 0;
      });
      scope.th4 = {};
      this.subscribeSignal(scope, "center-wuhan", "th7", "temperature", function(msg) {
        return scope.th4.temperature = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th7", "humidity", function(msg) {
        return scope.th4.humidity = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th7", "_alarms", function(msg) {
        return scope.th4.alarms = msg.value > 0;
      });
      scope.th5 = {};
      this.subscribeSignal(scope, "center-wuhan", "th9", "temperature", function(msg) {
        return scope.th5.temperature = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th9", "humidity", function(msg) {
        return scope.th5.humidity = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th9", "_alarms", function(msg) {
        return scope.th5.alarms = msg.value > 0;
      });
      scope.th6 = {};
      this.subscribeSignal(scope, "center-wuhan", "th12", "temperature", function(msg) {
        return scope.th6.temperature = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th12", "humidity", function(msg) {
        return scope.th6.humidity = msg.value.toFixed(1);
      });
      this.subscribeSignal(scope, "center-wuhan", "th12", "_alarms", function(msg) {
        return scope.th6.alarms = msg.value > 0;
      });
      scope.water1 = {};
      this.subscribeSignal(scope, "center-wuhan", "water1", "location-water2", function(msg) {
        return scope.water1.alarms = msg.value > 0;
      });
      scope.water2 = {};
      this.subscribeSignal(scope, "center-wuhan", "water2", "location-water2", function(msg) {
        return scope.water2.alarms = msg.value > 0;
      });
      scope.water3 = {};
      this.subscribeSignal(scope, "center-wuhan", "water3", "location-water2", function(msg) {
        return scope.water3.alarms = msg.value > 0;
      });
      scope.water4 = {};
      this.subscribeSignal(scope, "center-wuhan", "water4", "location-water2", function(msg) {
        return scope.water4.alarms = msg.value > 0;
      });
      scope.water5 = {};
      return this.subscribeSignal(scope, "center-wuhan", "water5", "location-water6", function(msg) {
        return scope.water5.alarms = msg.value > 0;
      });
    };

    MobileOrderHandle1Directive.prototype.updateNode = function(scope, node, action, callback) {
      var data, phase, schema, url, user;
      schema = this.taskService.url;
      url = this.taskService.replaceUrlParam(schema, scope.task, true);
      url += "/" + node.node;
      user = scope.$root.user;
      phase = {
        _id: node._id,
        node: node.node,
        parameters: node.parameters,
        contents: node.contents,
        state: action,
        timestamp: new Date,
        manager: {
          id: user.user,
          name: user.name
        }
      };
      if (action === 'forward') {
        phase.forwarder = node.forwarder;
      }
      data = {
        _id: scope.task._id,
        data: phase
      };
      return this.taskService.postData(url, data, (function(_this) {
        return function(err, result) {
          return typeof callback === "function" ? callback(err, result) : void 0;
        };
      })(this));
    };

    MobileOrderHandle1Directive.prototype.subscribeEvents = function(scope) {
      var events, filter, _ref;
      events = {};
      filter = {
        user: scope.project.model.user,
        project: scope.project.model.project
      };
      if ((_ref = scope.eventSubscriptions) != null) {
        _ref.dispose();
      }
      return scope.eventSubscriptions = this.commonService.eventLiveSession.subscribeValues(filter, (function(_this) {
        return function(err, event) {
          var evt, key;
          evt = event != null ? event.message : void 0;
          key = "" + evt.user + "." + evt.project + "." + evt.station + "." + evt.equipment + "." + evt.evt + "." + evt.severity + "." + evt.startTime;
          if (!events[key] && !evt.endTime) {
            if (scope.severities[evt.severity]) {
              scope.severities[evt.severity].value += 1;
            }
          } else if (events[key] && !events[key].endTime && evt.endTime) {
            scope.severities[evt.severity].value -= 1;
          }
          return events[key] = evt;
        };
      })(this));
    };

    MobileOrderHandle1Directive.prototype.subscribeSignal = function(scope, station, equipment, signal, callback) {
      var filter, _ref;
      filter = {
        user: scope.project.model.user,
        project: scope.project.model.project,
        station: station != null ? station : "+",
        equipment: equipment != null ? equipment : "+",
        signal: signal != null ? signal : "+"
      };
      if ((_ref = scope.signalSubscriptions[station + "." + equipment + "." + signal]) != null) {
        _ref.dispose();
      }
      return scope.signalSubscriptions[station + "." + equipment + "." + signal] = this.commonService.signalLiveSession.subscribeValues(filter, (function(_this) {
        return function(err, signal) {
          var sig;
          sig = signal != null ? signal.message : void 0;
          return typeof callback === "function" ? callback(sig) : void 0;
        };
      })(this));
    };

    MobileOrderHandle1Directive.prototype.queryTaskReport = function(scope) {
      return this.commonService.loadProjectModelByService('tasks', {
        task: scope.parameters.orderId
      }, 'user _id  project type process name creator task phase nodes createtime', (function(_this) {
        return function(err, taskModels) {
          if (err || !taskModels) {
            return;
          }
          return scope.task = taskModels;
        };
      })(this));
    };

    MobileOrderHandle1Directive.prototype.resize = function(scope) {};

    MobileOrderHandle1Directive.prototype.dispose = function(scope) {};

    return MobileOrderHandle1Directive;

  })(base.BaseDirective);
  return exports = {
    MobileOrderHandle1Directive: MobileOrderHandle1Directive
  };
});
