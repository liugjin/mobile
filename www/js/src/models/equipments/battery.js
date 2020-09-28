if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var Battery, exports;
  Battery = (function(_super) {
    __extends(Battery, _super);

    function Battery() {
      Battery.__super__.constructor.apply(this, arguments);
    }

    Battery.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("batteryVoltage", message["1101170001"]);
      this.bindSignal("batteryCurrent", message["1101174001"]);
      this.bindSignal("batteryTemperature", message["1101193001"]);
      this.bindModuleSignal("cellVoltage12V", function(n) {
        return message["11011910" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("cellVoltage6V", function(n) {
        return message["11013090" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("cellVoltage2V", function(n) {
        return message["11011920" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g1CellVoltage12V", function(n) {
        return message["11011790" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g1CellVoltage6V", function(n) {
        return message["11013010" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g1CellVoltage2V", function(n) {
        return message["11011800" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g2CellVoltage12V", function(n) {
        return message["11011820" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g2CellVoltage6V", function(n) {
        return message["11013030" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g2CellVoltage2V", function(n) {
        return message["11011830" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g3CellVoltage12V", function(n) {
        return message["11011850" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g3CellVoltage6V", function(n) {
        return message["11013050" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g3CellVoltage2V", function(n) {
        return message["11011860" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g4CellVoltage12V", function(n) {
        return message["11011880" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g4CellVoltage6V", function(n) {
        return message["11013070" + (n > 9 ? n : "0" + n)];
      }, 1);
      this.bindModuleSignal("g4CellVoltage2V", function(n) {
        return message["11011890" + (n > 9 ? n : "0" + n)];
      }, 1);
      return this.signals;
    };

    Battery.prototype.setCommands = function(msg) {
      return this.commands;
    };

    return Battery;

  })(base.DeviceModel);
  return exports = {
    Battery: Battery
  };
});
