if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/disposable', 'underscore'], function(base, _) {
  var DeviceModel, exports;
  DeviceModel = (function(_super) {
    __extends(DeviceModel, _super);

    function DeviceModel() {
      DeviceModel.__super__.constructor.apply(this, arguments);
      this.signals = {};
      this.events = {};
      this.commands = {};
    }

    DeviceModel.prototype.translateObject = function(msg, type) {
      var key, m, message, _i, _len;
      message = {};
      if (!msg) {
        return message;
      }
      for (_i = 0, _len = msg.length; _i < _len; _i++) {
        m = msg[_i];
        key = m.model[type];
        message[key] = m;
      }
      return message;
    };

    DeviceModel.prototype.bindSignal = function(name, originSignal) {
      var modelSignal, _ref;
      modelSignal = this.signals[name] = {};
      if (originSignal) {
        modelSignal.oid = originSignal.model.signal;
        modelSignal.id = name;
        modelSignal.value = originSignal.data.value;
        modelSignal.name = originSignal.model.name;
        modelSignal.unit = (_ref = originSignal.unit) != null ? _ref.unit : void 0;
        if (originSignal.data.eventSeverity != null) {
          return modelSignal.eventSeverity = originSignal.data.eventSeverity.severity;
        }
      }
    };

    DeviceModel.prototype.bindModuleSignal = function(name, callback, n) {
      var originSignal;
      originSignal = callback(n);
      if (originSignal) {
        this.bindSignal(name + n, originSignal);
        this.signals.moduleNum = n;
        return this.bindModuleSignal(name, callback, n + 1);
      }
    };

    DeviceModel.prototype.updateSignal = function(originSignal) {
      var signal, _ref, _ref1;
      signal = _.findWhere(this.signals, {
        oid: originSignal.model.signal
      });
      if (signal) {
        signal.value = originSignal.data.value;
        signal.unit = (_ref = originSignal.unit) != null ? _ref.unit : void 0;
        return signal.eventSeverity = (_ref1 = originSignal.data.eventSeverity) != null ? _ref1.severity : void 0;
      }
    };

    DeviceModel.prototype.bindEvent = function(name, originEvent) {
      if (originEvent) {
        return this.events[name] = originEvent;
      }
    };

    DeviceModel.prototype.updateEvent = function(originEvent) {
      var event;
      event = this.events[originEvent.model.event];
      event.model = originEvent.model;
      return event.data = originEvent.data;
    };

    DeviceModel.prototype.bindCommand = function(name, originCommand) {
      if (originCommand) {
        return this.commands[name] = originCommand;
      }
    };

    DeviceModel.prototype.setEvents = function(msg) {
      var key, m, _i, _len;
      if (msg == null) {
        return this.events;
      }
      for (_i = 0, _len = msg.length; _i < _len; _i++) {
        m = msg[_i];
        key = m.model.event;
        this.events[key] = {};
        this.events[key].model = m.model;
        this.events[key].data = m.data;
      }
      return this.events;
    };

    DeviceModel.prototype.setPorts = function() {};

    DeviceModel.prototype.setSignals = function() {};

    DeviceModel.prototype.setCommands = function() {};

    return DeviceModel;

  })(base.Disposable);
  return exports = {
    DeviceModel: DeviceModel
  };
});
