
/*
* File: event-detail-directive
* User: David
* Date: 2019/01/19
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var EventDetailDirective, exports;
  EventDetailDirective = (function(_super) {
    __extends(EventDetailDirective, _super);

    function EventDetailDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "event-detail";
      EventDetailDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    EventDetailDirective.prototype.setScope = function() {};

    EventDetailDirective.prototype.setCSS = function() {
      return css;
    };

    EventDetailDirective.prototype.setTemplate = function() {
      return view;
    };

    EventDetailDirective.prototype.show = function($scope, element, attrs) {
      var decorateEvent, event, processEvent, subscribeEvents;
      $scope.ngMsgImg = this.getComponentPath('image/no-msg.svg');
      $scope.currentEvent = null;
      subscribeEvents = (function(_this) {
        return function() {
          var filter, _ref;
          filter = {
            user: $scope.project.model.user,
            project: $scope.parameters.project,
            station: $scope.parameters.stationId,
            equipment: $scope.parameters.equipmentId,
            event: $scope.parameters.eventId
          };
          if ((_ref = $scope.eventSubscriptions) != null) {
            _ref.dispose();
          }
          return $scope.eventSubscriptions = _this.commonService.eventLiveSession.subscribeValues(filter, function(err, d) {
            if (err) {
              return;
            }
            if (d.message.startTime.toString() === $scope.parameters.startTime) {
              return processEvent(d.message);
            }
          });
        };
      })(this);
      processEvent = (function(_this) {
        return function(event) {
          if (!event) {
            return;
          }
          return $scope.$applyAsync(function() {
            return $scope.currentEvent = decorateEvent(event);
          });
        };
      })(this);
      decorateEvent = function(event) {
        var endTime, _ref, _ref1, _ref2;
        event.eventSeverity = (_ref = $scope.project.typeModels.eventseverities.getItem(event.severity)) != null ? _ref.model : void 0;
        event.color = (_ref1 = (_ref2 = event.eventSeverity) != null ? _ref2.color : void 0) != null ? _ref1 : this.endColor;
        endTime = event.endTime ? new Date(event.endTime) : new Date;
        event.duration = moment(endTime).diff(event.startTime, 'hours', true).toFixed(2);
        event.startTime2 = new Date(event.startTime);
        if (event.endTime) {
          event.endTime2 = new Date(event.endTime);
        }
        return event;
      };
      event = $scope.parameters.detail;
      if (event) {
        $scope.currentEvent = decorateEvent(JSON.parse(event));
      }
      if ($scope.parameters.eventId) {
        subscribeEvents();
      }
      return $scope.goToEquip = (function(_this) {
        return function(event) {
          return _this.publishEventBus("goEquip", {
            user: event.user,
            project: event.project,
            station: event.station,
            equipment: event.equipment
          });
        };
      })(this);
    };

    EventDetailDirective.prototype.resize = function($scope) {};

    EventDetailDirective.prototype.dispose = function($scope) {
      var _ref;
      return (_ref = $scope.eventSubscriptions) != null ? _ref.dispose() : void 0;
    };

    return EventDetailDirective;

  })(base.BaseDirective);
  return exports = {
    EventDetailDirective: EventDetailDirective
  };
});
