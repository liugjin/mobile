if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var Distributor, exports;
  Distributor = (function(_super) {
    __extends(Distributor, _super);

    function Distributor() {
      Distributor.__super__.constructor.apply(this, arguments);
    }

    Distributor.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("powerFactor", message["201036001"]);
      this.bindSignal("frequency", message["201037001"]);
      this.bindSignal("inputVoltageA", message["201026001"]);
      this.bindSignal("inputVoltageB", message["201028001"]);
      this.bindSignal("inputVoltageC", message["201030001"]);
      this.bindSignal("protectionStatus", message["201013001"]);
      this.bindModuleSignal("branchSwitchStatus", function(n) {
        return message["20115600" + n];
      }, 1);
      this.bindModuleSignal("branchPower", function(n) {
        return message["20131600" + n];
      }, 1);
      this.bindModuleSignal("branchCurrentA", function(n) {
        return message["20130200" + n];
      }, 1);
      this.bindModuleSignal("branchCurrentB", function(n) {
        return message["20130300" + n];
      }, 1);
      this.bindModuleSignal("branchCurrentC", function(n) {
        return message["20130400" + n];
      }, 1);
      return this.signals;
    };

    Distributor.prototype.setCommands = function(msg) {
      return this.commands;
    };

    return Distributor;

  })(base.DeviceModel);
  return exports = {
    Distributor: Distributor
  };
});