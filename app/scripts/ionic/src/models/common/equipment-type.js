// Generated by IcedCoffeeScript 108.0.11

/*
* File: equipment-type
* User: Dow
* Date: 11/8/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../view-model'], function(base) {
  var EquipmentType, exports;
  EquipmentType = (function(_super) {
    __extends(EquipmentType, _super);

    function EquipmentType(parent, model) {
      EquipmentType.__super__.constructor.call(this, parent, model);
    }

    return EquipmentType;

  })(base.ViewModel);
  return exports = {
    EquipmentType: EquipmentType
  };
});
