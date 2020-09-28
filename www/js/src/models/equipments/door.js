if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./device-model'], function(base) {
  var Door, exports;
  Door = (function(_super) {
    __extends(Door, _super);

    function Door() {
      Door.__super__.constructor.apply(this, arguments);
    }

    Door.prototype.setSignals = function(msg) {
      var message;
      message = this.translateObject(msg, 'signal');
      this.bindSignal("doorStatus", message["1001303001"]);
      this.bindSignal("lastOpenCardNo", message["1001305001"]);
      this.bindSignal("swapCardYear", message["1001306001"]);
      this.bindSignal("swapCardMonth", message["1001307001"]);
      this.bindSignal("swapCardDay", message["1001308001"]);
      this.bindSignal("swapCardHour", message["1001309001"]);
      this.bindSignal("swapCardMinute", message["1001310001"]);
      this.bindSignal("swapCardSecond", message["1001311001"]);
      return this.signals;
    };

    Door.prototype.setCommands = function(msg) {
      var message;
      message = this.translateObject(msg, 'command');
      this.bindCommand("openDoor", message["1001010001"]);
      return this.commands;
    };

    return Door;

  })(base.DeviceModel);
  return exports = {
    Door: Door
  };
});
