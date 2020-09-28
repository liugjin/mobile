
/*
* File: equipments-model
* User: Dow
* Date: 4/27/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../common/equipments'], function(base, r) {
  var EquipmentsModel, exports;
  EquipmentsModel = (function(_super) {
    __extends(EquipmentsModel, _super);

    function EquipmentsModel(parent, options) {
      EquipmentsModel.__super__.constructor.call(this, parent, options);
    }

    return EquipmentsModel;

  })(base.Equipments);
  return exports = {
    EquipmentsModel: EquipmentsModel
  };
});
