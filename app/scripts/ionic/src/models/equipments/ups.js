// Generated by IcedCoffeeScript 108.0.11
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var Ups, exports;
  Ups = (function(_super) {
    __extends(Ups, _super);

    function Ups() {
      Ups.__super__.constructor.apply(this, arguments);
    }

    Ups.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal('outFrequency', message['501067001']);
      this.bindSignal('bypassFrequency', message['501097001']);
      this.bindSignal('loadCurrentA', message['501062001']);
      this.bindSignal('loadCurrentB', message['501063001']);
      this.bindSignal('loadCurrentC', message['501064001']);
      this.bindSignal('outputLoadRateA', message['501502001']);
      this.bindSignal('outputLoadRateB', message['501503001']);
      this.bindSignal('outputLoadRateC', message['501504001']);
      this.bindSignal('loadVoltageA', message['501056001']);
      this.bindSignal('loadVoltageB', message['501058001']);
      this.bindSignal('loadVoltageC', message['501060001']);
      this.bindSignal('bypassVoltageA', message['501086001']);
      this.bindSignal('bypassVoltageB', message['501088001']);
      this.bindSignal('bypassVoltageC', message['501090001']);
      this.bindSignal('inputVoltageAB', message['501020001']);
      this.bindSignal('inputVoltageBC', message['501022001']);
      this.bindSignal('inputVoltageCA', message['501024001']);
      this.bindSignal('batteryVoltage', message['501172001']);
      this.bindSignal('batteryCurrent', message['501174001']);
      this.bindSignal('batteryTemperature', message['501181001']);
      return this.signals;
    };

    Ups.prototype.setCommands = function(msg) {
      return this.commands;
    };

    return Ups;

  })(base.DeviceModel);
  return exports = {
    Ups: Ups
  };
});
