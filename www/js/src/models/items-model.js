
/*
* File: model
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./items-base', './view-model'], function(base, vm) {
  var ItemsModel, exports;
  ItemsModel = (function(_super) {
    __extends(ItemsModel, _super);

    function ItemsModel(parent, options) {
      this.parent = parent;
      ItemsModel.__super__.constructor.call(this, options);
      this.engine = this.parent.engine;
      this.caches = {};
    }

    ItemsModel.prototype.load = function(filter, fields, callback, refresh) {
      var cache, key;
      key = JSON.stringify(filter) + '&' + fields;
      if (refresh) {
        this.reset();
        delete this.caches[key];
      }
      cache = this.caches[key];
      if (cache) {
        if (cache.loaded) {
          if (typeof callback === "function") {
            callback(null, cache.items);
          }
        } else {
          cache.callbacks.push(callback);
        }
        return;
      }
      cache = {
        filter: filter,
        fields: fields,
        callbacks: [callback]
      };
      this.caches[key] = cache;
      if (this.service == null) {
        this.service = this.engine.modelManager.getService(this.options.id);
      }
      return this.service.query(filter, fields, (function(_this) {
        return function(err, model) {
          var cb, items, _i, _len, _ref;
          items = _this.addItems(model);
          _this.loaded = true;
          cache.loaded = true;
          cache.items = items;
          _ref = cache.callbacks;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cb = _ref[_i];
            if (typeof cb === "function") {
              cb(err, items);
            }
          }
          return cache.callbacks = [];
        };
      })(this), refresh);
    };

    ItemsModel.prototype.loadOne = function(filter, fields, callback, refresh) {
      var item;
      item = this.getItemByIds(filter);
      if (item) {
        return item.load((function(_this) {
          return function(err, model) {
            item = _this.addItem(model);
            return typeof callback === "function" ? callback(err, item) : void 0;
          };
        })(this), refresh);
      } else {
        return this.load(filter, fields, (function(_this) {
          return function(err, items) {
            return typeof callback === "function" ? callback(err, items != null ? items[0] : void 0) : void 0;
          };
        })(this), refresh);
      }
    };

    ItemsModel.prototype.createItem = function(model) {
      var item;
      return item = new vm.ViewModel(this, model);
    };

    ItemsModel.prototype.dispose = function(disposing) {
      ItemsModel.__super__.dispose.call(this, disposing);
      if (!disposing) {
        this.cache = {};
      }
    };

    return ItemsModel;

  })(base.ItemsBase);
  return exports = {
    ItemsModel: ItemsModel
  };
});
