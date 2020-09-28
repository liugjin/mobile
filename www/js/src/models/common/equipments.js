
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../items-model', './equipment'], function(base, cm) {
  var Equipments, exports;
  Equipments = (function(_super) {
    __extends(Equipments, _super);

    function Equipments(parent, options) {
      var _base, _base1;
      Equipments.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'equipments';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project', 'station', 'equipment'];
      }
    }

    Equipments.prototype.createItem = function(model) {
      var item;
      return item = new cm.Equipment(this, model);
    };

    return Equipments;

  })(base.ItemsModel);
  return exports = {
    Equipments: Equipments
  };
});