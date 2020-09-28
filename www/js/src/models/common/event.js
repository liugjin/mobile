
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../view-model'], function(base) {
  var Event, exports;
  Event = (function(_super) {
    __extends(Event, _super);

    function Event(parent, model) {
      Event.__super__.constructor.call(this, parent, model);
      this.equipment = this.parent.parent;
      this.station = this.equipment.station;
      this.data = {};
    }

    Event.prototype.getIds = function() {
      var ids;
      ids = this.equipment.getIds();
      ids.event = this.model.event;
      return ids;
    };

    Event.prototype.setValue = function(message) {
      var data;
      if (message.startTime < this.data.startTime) {
        return;
      }
      this.data = data = message;
      return data;
    };

    return Event;

  })(base.ViewModel);
  return exports = {
    Event: Event
  };
});
