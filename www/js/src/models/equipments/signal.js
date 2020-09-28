
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./view-model'], function(base) {
  var Signal, exports;
  Signal = (function(_super) {
    __extends(Signal, _super);

    function Signal(parent, model) {
      Signal.__super__.constructor.call(this, parent, model);
      this.equipment = this.parent.parent;
      this.station = this.equipment.station;
      this.data = {};
    }

    Signal.prototype.getIds = function() {
      var ids;
      ids = this.equipment.getIds();
      ids.signal = this.model.signal;
      return ids;
    };

    Signal.prototype.setValue = function(message) {
      this.data.unit = message.unit;
      this.data.severity = message.severity;
      this.data.value = message.value;
      this.data.formatValue = message.value;
      this.data.timestamp = message.timestamp;
      return this.data;
    };

    return Signal;

  })(base.ViewModel);
  return exports = {
    Signal: Signal
  };
});
