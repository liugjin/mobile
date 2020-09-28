
/*
* File: business-model
* User: Dow
* Date: 4/21/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../common/equipment'], function(base) {
  var EquipmentModel, exports;
  EquipmentModel = (function(_super) {
    __extends(EquipmentModel, _super);

    function EquipmentModel(parent, model) {
      EquipmentModel.__super__.constructor.call(this, parent, model);
    }

    return EquipmentModel;

  })(base.Equipment);
  return exports = {
    EquipmentModel: EquipmentModel
  };
});
