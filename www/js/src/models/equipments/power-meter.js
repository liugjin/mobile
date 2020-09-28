if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var PowerMeter, exports;
  PowerMeter = (function(_super) {
    __extends(PowerMeter, _super);

    function PowerMeter() {
      PowerMeter.__super__.constructor.apply(this, arguments);
    }

    PowerMeter.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("powerFactor", message["1501036001"]);
      this.bindSignal("frequency", message["1501037001"]);
      this.bindSignal("voltageA", message["1501026001"]);
      this.bindSignal("voltageB", message["1501028001"]);
      this.bindSignal("voltageC", message["1501030001"]);
      this.bindSignal("powerA", message["1501303001"]);
      this.bindSignal("powerB", message["1501304001"]);
      this.bindSignal("powerC", message["1501305001"]);
      this.bindSignal("energy", message["1501039001"]);
      this.bindSignal("currentA", message["1501032001"]);
      this.bindSignal("currentB", message["1501033001"]);
      this.bindSignal("currentC", message["1501034001"]);
      return this.signals;
    };

    PowerMeter.prototype.setCommands = function(msg) {
      return this.commands;
    };

    return PowerMeter;

  })(base.DeviceModel);
  return exports = {
    PowerMeter: PowerMeter
  };
});
