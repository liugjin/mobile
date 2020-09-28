
/*
* File: servers
* User: Dow
* Date: 4/26/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./equipments-model', './pdu'], function(base, p) {
  var Pdus, exports;
  Pdus = (function(_super) {
    __extends(Pdus, _super);

    function Pdus(parent, options) {
      Pdus.__super__.constructor.call(this, parent, options);
    }

    Pdus.prototype.createItem = function(model) {
      var item;
      return item = new p.Pdu(this, model);
    };

    return Pdus;

  })(base.EquipmentsModel);
  return exports = {
    Pdus: Pdus
  };
});
