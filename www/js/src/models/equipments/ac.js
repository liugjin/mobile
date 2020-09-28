if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var AC, exports;
  AC = (function(_super) {
    __extends(AC, _super);

    function AC() {
      AC.__super__.constructor.apply(this, arguments);
    }

    AC.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("temperature", message["702001001"]);
      this.bindSignal("humidity", message["702003001"]);
      this.bindSignal("runningTime", message["702218001"]);
      this.bindSignal("powerStatus", message["702155001"]);
      this.bindSignal("temperatureSet", message["702216001"]);
      this.bindSignal("humiditySet", message["702217001"]);
      this.bindSignal("supplyTemperature", message["702330001"]);
      this.bindSignal("supplyHumidity", message["702331001"]);
      this.bindSignal("fanState", message["702206001"]);
      this.bindSignal("coolState", message["702202001"]);
      this.bindSignal("hotState", message["702203001"]);
      this.bindSignal("compressorPressure", message["702205001"]);
      this.bindSignal("sumCoolTime", message["702316001"]);
      this.bindSignal("dischargeTemperature", message["702204001"]);
      return this.signals;
    };

    AC.prototype.setCommands = function(msg) {
      var message;
      message = this.translateObject(msg, 'command');
      this.bindCommand("powerStatus", message["702003001"]);
      this.bindCommand("temperatureSet", message["702053001"]);
      this.bindCommand("humiditySet", message["702054001"]);
      return this.commands;
    };

    return AC;

  })(base.DeviceModel);
  return exports = {
    AC: AC
  };
});
