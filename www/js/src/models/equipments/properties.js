
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./items-model', './property'], function(base, p) {
  var Properties, exports;
  Properties = (function(_super) {
    __extends(Properties, _super);

    function Properties(parent, options) {
      var _base, _base1;
      Properties.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'equipmentproperties';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project', 'station', 'equipment', 'property'];
      }
      this.equipment = this.parent;
    }

    Properties.prototype.createItem = function(model) {
      var item;
      return item = new p.Property(this, model);
    };

    Properties.prototype.getKey = function(model) {
      var key, m, seperator;
      seperator = this.options.keysSeperator || '.';
      m = this.equipment.model;
      key = "" + m.user + seperator + m.project + seperator + m.station + seperator + m.equipment + seperator + model.property;
      return key;
    };

    return Properties;

  })(base.ItemsModel);
  return exports = {
    Properties: Properties
  };
});
