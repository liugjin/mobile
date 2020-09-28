
/*
* File: pdu
* User: Dow
* Date: 4/7/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./equipment-model'], function(base) {
  var Pdu, exports;
  Pdu = (function(_super) {
    __extends(Pdu, _super);

    function Pdu(parent, model) {
      Pdu.__super__.constructor.call(this, parent, model);
    }

    return Pdu;

  })(base.EquipmentModel);
  return exports = {
    Pdu: Pdu
  };
});
