
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../view-model', '../../filters/format-string-filter'], function(base, fsf) {
  var Signal, exports;
  Signal = (function(_super) {
    __extends(Signal, _super);

    function Signal(parent, model) {
      Signal.__super__.constructor.call(this, parent, model);
      this.equipment = this.parent.parent;
      this.station = this.equipment.station;
      this.data = {};
      this.formatString = fsf.FormatStringFilter();
    }

    Signal.prototype.getIds = function() {
      var ids;
      ids = this.equipment.getIds();
      ids.signal = this.model.signal;
      return ids;
    };

    Signal.prototype.setValue = function(message) {
      return this.data = {
        unit: message.unit,
        severity: message.severity,
        value: message.value,
        lastValue: message.lastValue,
        formatValue: this.formatString(message.value, this.model.dataType, this.model.format),
        timestamp: new Date(message.timestamp)
      };
    };

    return Signal;

  })(base.ViewModel);
  return exports = {
    Signal: Signal
  };
});
