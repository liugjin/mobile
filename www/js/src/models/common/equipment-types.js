
/*
* File: equipment-types
* User: Dow
* Date: 11/8/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../items-model', './equipment-type'], function(base, et) {
  var EquipmentTypes, exports;
  EquipmentTypes = (function(_super) {
    __extends(EquipmentTypes, _super);

    function EquipmentTypes(parent, options) {
      this.buildCategoryTree = __bind(this.buildCategoryTree, this);
      var _base, _base1;
      EquipmentTypes.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'equipmenttypes';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project', 'type'];
      }
    }

    EquipmentTypes.prototype.createItem = function(model) {
      var item;
      return item = new et.EquipmentType(this, model);
    };

    EquipmentTypes.prototype.addItems = function(models) {
      var items;
      items = EquipmentTypes.__super__.addItems.call(this, models);
      this.buildCategoryTree(items);
      return items;
    };

    EquipmentTypes.prototype.buildCategoryTree = function(categories, parent) {
      var category, _i, _j, _len, _len1;
      if (parent) {
        parent.categories = [];
        for (_i = 0, _len = categories.length; _i < _len; _i++) {
          category = categories[_i];
          if (!(category.model.base === parent.model.type)) {
            continue;
          }
          parent.categories.push(category);
          this.buildCategoryTree(categories, category);
        }
      } else {
        this.categories = [];
        for (_j = 0, _len1 = categories.length; _j < _len1; _j++) {
          category = categories[_j];
          if (!(!category.model.base)) {
            continue;
          }
          this.categories.push(category);
          this.buildCategoryTree(categories, category);
        }
      }
      return this.categories;
    };

    return EquipmentTypes;

  })(base.ItemsModel);
  return exports = {
    EquipmentTypes: EquipmentTypes
  };
});
