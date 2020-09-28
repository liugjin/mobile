
/*
* File: mobile-event-list-directive
* User: David
* Date: 2019/07/17
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "rx"], function(base, css, view, _, moment, Rx) {
  var MobileEventListDirective, exports;
  MobileEventListDirective = (function(_super) {
    __extends(MobileEventListDirective, _super);

    function MobileEventListDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.processEvents = __bind(this.processEvents, this);
      this.show = __bind(this.show, this);
      this.id = "mobile-event-list";
      MobileEventListDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEventListDirective.prototype.setScope = function() {};

    MobileEventListDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEventListDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEventListDirective.prototype.show = function(scope, element, attrs) {
      var filter, station, subject, _i, _len, _ref, _ref1;
      scope.alarmImg = this.getComponentPath('image/alarm.svg');
      scope.alarm1Img = this.getComponentPath('image/alarm1.svg');
      scope.alarm2Img = this.getComponentPath('image/alarm2.svg');
      scope.alarm3Img = this.getComponentPath('image/alarm3.svg');
      scope.filterImg = this.getComponentPath('image/filter.svg');
      scope.events = [];
      scope.list = {};
      scope.allStation = {
        key: 'all',
        model: {
          station: 'all',
          name: '所有站点'
        }
      };
      scope.allSeverity = {
        key: 'all',
        model: {
          severity: 'all',
          name: '所有告警'
        }
      };
      scope.allPhase = {
        key: 'all',
        model: {
          phase: 'all',
          name: '所有状态'
        }
      };
      scope.eventSeverity = scope.allSeverity;
      scope.stations = _.filter(scope.project.stations.nitems);
      scope.eventSeverities = _.sortBy(scope.project.typeModels.eventseverities.items, (function(_this) {
        return function(item) {
          return item.model.severity;
        };
      })(this));
      scope.eventPhases = _.filter(scope.project.typeModels.eventphases.items, (function(_this) {
        return function(item) {
          return item.model.phase !== 'completed';
        };
      })(this));
      scope.getEventColor = (function(_this) {
        return function(severity) {
          var color, _ref, _ref1, _ref2, _ref3;
          color = (_ref = scope.project) != null ? (_ref1 = _ref.dictionary) != null ? (_ref2 = _ref1.eventseverities) != null ? (_ref3 = _ref2.getItem(severity)) != null ? _ref3.model.color : void 0 : void 0 : void 0 : void 0;
          return color;
        };
      })(this);
      scope.selectEvent = (function(_this) {
        return function(event) {
          return _this.publishEventBus("selectEvent", {
            project: scope.project.model.project,
            station: scope.station.model.station,
            event: event.event,
            origin: 'tab.event',
            detail: JSON.stringify(event)
          });
        };
      })(this);
      scope.filterEvent = (function(_this) {
        return function() {
          return function(event) {
            var text, _ref;
            text = (_ref = scope.searchLists) != null ? _ref.toLowerCase() : void 0;
            if (text && text !== "" && event.equipmentName.indexOf(text) === -1 && event.eventName.indexOf(text) === -1) {
              return false;
            }
            if (scope.eventSeverity.model.severity !== "all" && event.severity !== scope.eventSeverity.model.severity) {
              return false;
            }
            return true;
          };
        };
      })(this);
      scope.selectStation = (function(_this) {
        return function(station) {
          scope.station = station;
          element.find('#stations').hide();
          return true;
        };
      })(this);
      scope.selectEventSeverity = (function(_this) {
        return function(event) {
          scope.eventSeverity = event;
          element.find('#events').hide();
          return true;
        };
      })(this);
      scope.filter = (function(_this) {
        return function() {
          var instance;
          _this.processEvents(scope);
          instance = M.Modal.getInstance(element.find('#filter-event-modal')[0]);
          instance.close();
        };
      })(this);
      if (scope.firstload) {
        _ref = scope.project.stations.nitems;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          station = _ref[_i];
          scope.list[station.model.station] = {};
        }
        subject = new Rx.Subject;
        filter = {
          user: scope.project.model.user,
          project: scope.project.model.project
        };
        if ((_ref1 = scope.eventSubscription) != null) {
          _ref1.dispose();
        }
        scope.eventSubscription = this.commonService.eventLiveSession.subscribeValues(filter, (function(_this) {
          return function(err, d) {
            var event, key, _ref2, _ref3, _ref4, _ref5;
            if (!((_ref2 = d.message) != null ? _ref2.event : void 0)) {
              return;
            }
            event = d.message;
            key = "" + event.user + "." + event.project + "." + event.station + "." + event.equipment + "." + event.event + "." + event.severity + "." + event.startTime;
            if ((_ref3 = scope.list[event.station]) != null) {
              _ref3[key] = event;
            }
            if ((_ref4 = scope.list[event.station]) != null ? _ref4.hasOwnProperty(key) : void 0) {
              if (event.endTime || ((_ref5 = event.phase) === "end" || _ref5 === "completed")) {
                delete scope.list[event.station][key];
              }
            }
            return subject.onNext();
          };
        })(this));
        subject.debounce(50).subscribe((function(_this) {
          return function() {
            return _this.processEvents(scope);
          };
        })(this));
      }
      return this.processEvents(scope);
    };

    MobileEventListDirective.prototype.processEvents = function(scope) {
      var key, list, stations, value, _ref;
      scope.events = [];
      scope.station = _.find(scope.project.stations.items, function(item) {
        return item.model.station === scope.station.model.station;
      });
      stations = this.commonService.loadStationChildren(scope.station, true);
      list = _.map(stations, function(station) {
        return station.model.station;
      });
      _ref = scope.list;
      for (key in _ref) {
        value = _ref[key];
        if (__indexOf.call(list, key) >= 0) {
          scope.events = scope.events.concat(_.values(value));
        }
      }
      return scope.$applyAsync();
    };

    MobileEventListDirective.prototype.resize = function(scope) {};

    MobileEventListDirective.prototype.dispose = function(scope) {
      var _ref;
      return (_ref = scope.eventSubscription) != null ? _ref.dispose() : void 0;
    };

    return MobileEventListDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEventListDirective: MobileEventListDirective
  };
});
