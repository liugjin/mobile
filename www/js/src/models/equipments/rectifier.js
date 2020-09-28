if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var Rectifier, exports;
  Rectifier = (function(_super) {
    __extends(Rectifier, _super);

    function Rectifier() {
      Rectifier.__super__.constructor.apply(this, arguments);
    }

    Rectifier.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("inputVoltageA", message["401026001"]);
      this.bindSignal("inputCurrentA", message["401032001"]);
      this.bindSignal("outputVoltage", message["401110001"]);
      this.bindSignal("loadCurrent", message["401113001"]);
      this.bindModuleSignal("switchStatus", function(n) {
        return message["4011150" + (n > 9 ? n : "0" + n)];
      }, 1);
      return this.signals;
    };

    Rectifier.prototype.setCommands = function(msg) {
      return this.commands;
    };

    return Rectifier;

  })(base.DeviceModel);
  return exports = {
    Rectifier: Rectifier
  };
});
