if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var Genset, exports;
  Genset = (function(_super) {
    __extends(Genset, _super);

    function Genset() {
      Genset.__super__.constructor.apply(this, arguments);
    }

    Genset.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("outputVoltageA", message["301056001"]);
      this.bindSignal("outputVoltageB", message["301058001"]);
      this.bindSignal("outputVoltageC", message["301060001"]);
      this.bindSignal("outputCurrentA", message["301062001"]);
      this.bindSignal("outputFrequency", message["301067001"]);
      this.bindSignal("batteryVoltage", message["301225001"]);
      this.bindSignal("motorSpeed", message["301220001"]);
      this.bindSignal("oilTemperature", message["301222001"]);
      this.bindSignal("oilPressure", message["301221001"]);
      this.bindSignal("waterTemperature", message["301223001"]);
      this.bindSignal("oilLevel", message["301227001"]);
      return this.signals;
    };

    Genset.prototype.setCommands = function(msg) {
      return this.commands;
    };

    return Genset;

  })(base.DeviceModel);
  return exports = {
    Genset: Genset
  };
});
