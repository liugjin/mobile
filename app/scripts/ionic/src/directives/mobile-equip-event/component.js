// Generated by IcedCoffeeScript 108.0.11

/*
* File: mobile-equip-event-directive
* User: bingo
* Date: 2019/01/19
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileEquipEventDirective, exports;
  MobileEquipEventDirective = (function(_super) {
    __extends(MobileEquipEventDirective, _super);

    function MobileEquipEventDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-equip-event";
      MobileEquipEventDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEquipEventDirective.prototype.setScope = function() {};

    MobileEquipEventDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEquipEventDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEquipEventDirective.prototype.show = function(scope, element, attrs) {
      var events, processEvent, startEvents, _ref;
      scope.alarmImg = this.getComponentPath('image/alarm.svg');
      scope.alarmEImg = this.getComponentPath('image/e-alarm.svg');
      events = {};
      startEvents = {};
      scope.eventItems = [];
      scope.toggle = false;
      scope.selectEvent = function(event) {
        var endTime;
        if (scope.currentEvent && event.event === scope.currentEvent.event) {
          return scope.toggle = !scope.toggle;
        } else {
          scope.toggle = true;
          endTime = event.endTime ? new Date(event.endTime) : new Date;
          event.duration = moment(endTime).diff(event.startTime, 'hours', true).toFixed(2);
          return scope.currentEvent = event;
        }
      };
      scope.returnEvents = function() {
        return scope.currentEvent = null;
      };
      processEvent = function(data) {
        var event, k, key, message, v;
        if (!data) {
          return;
        }
        message = data;
        key = "" + message.user + "." + message.project + "." + message.station + "." + message.equipment + "." + message.event + "." + message.severity + "." + message.startTime;
        if (events.hasOwnProperty(key)) {
          event = events[key];
          for (k in message) {
            v = message[k];
            event[k] = v;
          }
          if (event.endTime) {
            delete startEvents[key];
          }
        } else {
          event = angular.copy(message);
          events[key] = event;
          if (event.phase === 'start' || event.phase === 'confirm') {
            scope.eventItems.push(event);
          }
          if (!event.endTime) {
            startEvents[key] = event;
          }
        }
        if (message.phase === 'completed') {
          event = events[key];
          delete events[key];
          scope.eventItems.splice(scope.eventItems.indexOf(event), 1);
          return delete startEvents[key];
        }
      };
      if ((_ref = scope.eventSubscriptions) != null) {
        _ref.dispose();
      }
      return scope.eventSubscriptions = this.commonService.subscribeEquipmentEventValues(scope.equipment, (function(_this) {
        return function(event) {
          return processEvent(event.data);
        };
      })(this));
    };

    MobileEquipEventDirective.prototype.resize = function(scope) {};

    MobileEquipEventDirective.prototype.dispose = function(scope) {
      var _ref;
      return (_ref = scope.eventSubscriptions) != null ? _ref.dispose() : void 0;
    };

    return MobileEquipEventDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEquipEventDirective: MobileEquipEventDirective
  };
});