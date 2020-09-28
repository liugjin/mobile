
/*
* File: racks
* User: Dow
* Date: 4/26/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./equipments-model', './rack'], function(base, r) {
  var Racks, exports;
  Racks = (function(_super) {
    __extends(Racks, _super);

    function Racks(parent, options) {
      Racks.__super__.constructor.call(this, parent, options);
    }

    Racks.prototype.createItem = function(model) {
      var item;
      return item = new r.Rack(this, model);
    };

    return Racks;

  })(base.EquipmentsModel);
  return exports = {
    Racks: Racks
  };
});
