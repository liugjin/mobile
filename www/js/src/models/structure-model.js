
/*
* File: Structure-model
* User: Dow
* Date: 7/30/2017
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(item) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  var SELECTED_ALL, StructureModel, exports;
  SELECTED_ALL = '_all';
  StructureModel = (function() {
    function StructureModel(key, parentKey) {
      this.key = key;
      this.parentKey = parentKey;
      this.selectItems = __bind(this.selectItems, this);
      this.buildItemTree = __bind(this.buildItemTree, this);
      this.items = [];
      this.keys = {};
      this.model = [];
    }

    StructureModel.prototype.setItems = function(model) {
      var m, _i, _len;
      if (model == null) {
        model = [];
      }
      this.keys = {};
      this.model = model;
      for (_i = 0, _len = model.length; _i < _len; _i++) {
        m = model[_i];
        this.keys[m[this.key]] = m;
      }
      if (this.parentKey) {
        this.buildItemTree(model);
      } else {
        this.items = this.model;
      }
      this.selectItems(model);
      return this.items;
    };

    StructureModel.prototype.buildItemTree = function(items, parent) {
      var item, parentId, _i, _j, _len, _len1;
      if (parent) {
        parentId = parent[this.key];
        if (this.keys[parentId]) {
          return;
        }
        this.keys[parentId] = parent;
        if (parent.items == null) {
          parent.items = [];
        }
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (!(item[this.parentKey] === parentId)) {
            continue;
          }
          parent.items.push(item);
          this.buildItemTree(items, item);
        }
      } else {
        this.items = [];
        for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
          item = items[_j];
          if (!(!item[this.parentKey])) {
            continue;
          }
          this.items.push(item);
          this.buildItemTree(items, item);
        }
      }
      return this.items;
    };

    StructureModel.prototype.selectItems = function(items) {
      var keys, s, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      if (!(items != null ? items.length : void 0)) {
        this.all = false;
        _ref = this.model;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          s._selected = false;
        }
        return;
      }
      if (items[0] === SELECTED_ALL) {
        this.all = true;
      } else {
        this.all = false;
      }
      keys = {};
      for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
        s = items[_j];
        keys[s] = s;
      }
      _ref1 = this.model;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        s = _ref1[_k];
        s._selected = keys[s[this.key]] ? true : false;
      }
    };

    StructureModel.prototype.toggleItems = function() {
      var item, _i, _len, _ref;
      _ref = this.model;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item._selected = !item._selected;
      }
    };

    StructureModel.prototype.selectItem = function(item) {
      var child, _i, _len, _ref;
      if (!item.items) {
        return;
      }
      _ref = item.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child._selected = item._selected;
        this.selectItem(child);
      }
    };

    StructureModel.prototype.getSelectedItems = function() {
      var result, s, _i, _len, _ref;
      result = [];
      if (this.all) {
        result.push(SELECTED_ALL);
      } else if (this.model) {
        _ref = this.model;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if (s._selected) {
            result.push(s[this.key]);
          }
        }
      }
      return result;
    };

    StructureModel.prototype.groupBy = function(type) {
      var group, groups, item, _i, _len, _ref;
      groups = {};
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        group = item[type];
        if (groups[group] == null) {
          groups[group] = [];
        }
        groups[group].push(item);
      }
      return this.groups = groups;
    };

    return StructureModel;

  })();
  return exports = {
    StructureModel: StructureModel
  };
});
