if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var ATS, exports;
  ATS = (function(_super) {
    __extends(ATS, _super);

    function ATS() {
      ATS.__super__.constructor.apply(this, arguments);
    }

    ATS.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("line1VoltageA", message["203026001"]);
      this.bindSignal("line1VoltageB", message["203028001"]);
      this.bindSignal("line1VoltageC", message["203030001"]);
      this.bindSignal("line2VoltageA", message["203026002"]);
      this.bindSignal("line2VoltageB", message["203028002"]);
      this.bindSignal("line2VoltageC", message["203030002"]);
      this.bindSignal("autoOrManualState", message["203154001"]);
      this.bindSignal("switch1Status", message["203156001"]);
      this.bindSignal("switch2Status", message["203156002"]);
      this.bindSignal("inputCurrentA", message["203032001"]);
      this.bindSignal("inputCurrentB", message["203033001"]);
      this.bindSignal("inputCurrentC", message["203034001"]);
      return this.signals;
    };

    ATS.prototype.setCommands = function(msg) {
      var message;
      message = this.translateObject(msg, 'command');
      this.bindCommand("autoOrManualState", message["203009001"]);
      return this.commands;
    };

    return ATS;

  })(base.DeviceModel);
  return exports = {
    ATS: ATS
  };
});
