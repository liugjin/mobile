// Generated by IcedCoffeeScript 108.0.11
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var WAC, exports;
  WAC = (function(_super) {
    __extends(WAC, _super);

    function WAC() {
      WAC.__super__.constructor.apply(this, arguments);
    }

    WAC.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("freezeWaterInTemp", message["705211001"]);
      this.bindSignal("freezeWaterOutTemp", message["705210001"]);
      this.bindSignal("coolingWaterInTemp", message["705209001"]);
      this.bindSignal("coolingWaterOutTemp", message["705208001"]);
      this.bindSignal("freezeStatus", message["705332001"]);
      this.bindSignal("freezePumpStatus", message["705333001"]);
      this.bindSignal("coolingPumpStatus", message["705334001"]);
      this.bindSignal("fanStatus", message["705335001"]);
      this.bindSignal("freezeSwitch", message.freezeSwitch);
      this.bindSignal("freezePumpSwitch", message.freezePumpSwitch);
      this.bindSignal("coolingPumpSwitch", message.coolingPumpSwitch);
      this.bindSignal("fanSwitch", message.fanSwitch);
      return this.signals;
    };

    WAC.prototype.setCommands = function(msg) {
      return this.commands;
    };

    return WAC;

  })(base.DeviceModel);
  return exports = {
    WAC: WAC
  };
});
