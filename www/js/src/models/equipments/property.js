
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./view-model'], function(base) {
  var Property, exports;
  Property = (function(_super) {
    __extends(Property, _super);

    function Property(parent, model) {
      Property.__super__.constructor.call(this, parent, model);
      this.equipment = this.parent.parent;
      this.station = this.equipment.station;
    }

    Property.prototype.getIds = function() {
      var ids;
      ids = this.equipment.getIds();
      ids.property = this.model.property;
      return ids;
    };

    Property.prototype.setValue = function(value) {
      if (value != null) {
        return this.value = this.parseValue(value);
      }
    };

    Property.prototype.getValue = function() {
      if (this.value) {
        return this.value;
      }
      return this.model.value;
    };

    Property.prototype.setModel = function(key, model) {
      var result;
      result = Property.__super__.setModel.call(this, key, model);
      this.value = this.parseValue(model.value);
      return result;
    };

    Property.prototype.parseValue = function(value) {
      var result;
      if (typeof value !== 'string') {
        return value;
      }
      switch (this.model.dataType) {
        case 'int':
          result = parseInt(value);
          break;
        case 'float':
          result = parseFloat(value);
          break;
        default:
          result = value;
      }
      return result;
    };

    return Property;

  })(base.ViewModel);
  return exports = {
    Property: Property
  };
});
