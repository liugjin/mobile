if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/disposable', './ups', './ac', './ats', './distributor', './door', './genset', './power-meter', './rectifier', './wac', './battery'], function(base, ups, ac, ats, distributor, door, genset, powerMeter, rectifier, wac, battery) {
  var DeviceModelFactory, exports;
  DeviceModelFactory = (function(_super) {
    __extends(DeviceModelFactory, _super);

    function DeviceModelFactory() {
      DeviceModelFactory.__super__.constructor.apply(this, arguments);
    }

    DeviceModelFactory.prototype.getDeviceModel2 = function(type, template) {
      if (template === '1014') {
        return new ups.Ups;
      }
      if (template === '1020') {
        return new ac.AC;
      }
      if (template === '1004') {
        return new ats.ATS;
      }
      if (template === '1003') {
        return new distributor.Distributor;
      }
      if (template === '1009') {
        return new rectifier.Rectifier;
      }
      if (template === '1028') {
        return new door.Door;
      }
      if (type === '3') {
        return new genset.Genset;
      }
      if (type === '12') {
        return new powerMeter.PowerMeter;
      }
      if (template === '1022') {
        return new wac.WAC;
      }
      if (type === '11') {
        return new battery.Battery;
      }
    };

    DeviceModelFactory.prototype.getDeviceModel = function(equipment) {
      var Type, directive;
      directive = equipment.getTemplateValue('directive');
      switch (directive) {
        case 'ups':
          Type = ups.Ups;
          break;
        case 'ac':
          Type = ac.AC;
          break;
        case 'ats':
          Type = ats.ATS;
          break;
        case 'distributor':
          Type = distributor.Distributor;
          break;
        case 'rectifier':
          Type = rectifier.Rectifier;
          break;
        case 'door':
          Type = door.Door;
          break;
        case 'genset':
          Type = genset.Genset;
          break;
        case 'power-meter':
          Type = powerMeter.PowerMeter;
          break;
        case 'wac':
          Type = wac.WAC;
          break;
        case 'battery':
          Type = battery.Battery;
      }
      if (Type) {
        return new Type;
      }
    };

    return DeviceModelFactory;

  })(base.Disposable);
  return exports = {
    DeviceModelFactory: DeviceModelFactory
  };
});
