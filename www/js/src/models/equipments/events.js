
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./items-model', './event'], function(base, evt) {
  var Events, exports;
  Events = (function(_super) {
    __extends(Events, _super);

    function Events(parent, options) {
      var _base, _base1;
      Events.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'equipmentevents';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project', 'station', 'equipment', 'event'];
      }
      this.equipment = this.parent;
    }

    Events.prototype.createItem = function(model) {
      var item;
      return item = new evt.Event(this, model);
    };

    Events.prototype.getKey = function(model) {
      var key, m, seperator;
      seperator = this.options.keysSeperator || '.';
      m = this.equipment.model;
      key = "" + m.user + seperator + m.project + seperator + m.station + seperator + m.equipment + seperator + model.event;
      return key;
    };

    return Events;

  })(base.ItemsModel);
  return exports = {
    Events: Events
  };
});
