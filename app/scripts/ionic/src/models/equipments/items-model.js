// Generated by IcedCoffeeScript 108.0.11

/*
* File: model
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./paging-model', './view-model'], function(base, vm) {
  var ItemsModel, exports;
  ItemsModel = (function(_super) {
    __extends(ItemsModel, _super);

    function ItemsModel(parent, options) {
      this.parent = parent;
      ItemsModel.__super__.constructor.call(this, options);
      this.engine = this.parent.engine;
      this.items = [];
      this.keys = {};
      this.index = 0;
      this.caches = {};
    }

    ItemsModel.prototype.load = function(filter, fields, callback, refresh) {
      var cache, key;
      key = JSON.stringify(filter) + '&' + fields;
      if (refresh) {
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
          _ref = cache.callbacks;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cb = _ref[_i];
            if (typeof cb === "function") {
              cb(err, items);
            }
          }
          cache.loaded = true;
          cache.items = items;
          return cache.callbacks = [];
        };
      })(this), refresh);
    };

    ItemsModel.prototype.getKey = function(model) {
      var i, k, key, seperator, _i, _len, _ref, _ref1;
      if ((_ref = this.options.keys) != null ? _ref.length : void 0) {
        seperator = this.options.keysSeperator || '_';
        key = '';
        _ref1 = this.options.keys;
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          k = _ref1[i];
          if (i > 0) {
            key += seperator;
          }
          key += model[k];
        }
      } else {
        key = model._id;
      }
      return key;
    };

    ItemsModel.prototype.getItem = function(key) {
      return this.keys[key];
    };

    ItemsModel.prototype.getItemByIds = function(ids) {
      var key;
      key = this.getKey(ids);
      return this.getItem(key);
    };

    ItemsModel.prototype.getModels = function() {
      var item, models;
      return models = (function() {
        var _i, _len, _ref, _results;
        _ref = this.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.model);
        }
        return _results;
      }).call(this);
    };

    ItemsModel.prototype.addItems = function(models) {
      var item, model, result, _i, _len;
      if (!models) {
        return [];
      }
      result = [];
      if (models instanceof Array) {
        for (_i = 0, _len = models.length; _i < _len; _i++) {
          model = models[_i];
          item = this.addItem(model);
          result.push(item);
        }
      } else {
        item = this.addItem(models);
        result.push(item);
      }
      return result;
    };

    ItemsModel.prototype.addItem = function(model) {
      var item, key;
      item = this.createItem(model);
      if (!item) {
        return;
      }
      key = this.getKey(model);
      item.setModel(key, model);
      return this.appendItem(item);
    };

    ItemsModel.prototype.createItem = function(model) {
      var item;
      return item = new vm.ViewModel(this, model);
    };

    ItemsModel.prototype.addNewItem = function(item) {
      return this.appendItem(item);
    };

    ItemsModel.prototype.appendItem = function(item) {
      item.index = ++this.index;
      this.items.push(item);
      this.keys[item.key] = item;
      return item;
    };

    ItemsModel.prototype.removeItem = function(key) {
      var item;
      item = this.keys[key];
      if (!item) {
        return;
      }
      delete this.keys[key];
      this.items.splice(this.items.indexOf(item), 1);
      item.dispose();
      return item;
    };

    ItemsModel.prototype.reset = function() {
      var item, _i, _len, _ref;
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        this.removeItem(item.key);
      }
    };

    ItemsModel.prototype.dispose = function() {
      ItemsModel.__super__.dispose.apply(this, arguments);
      return this.reset();
    };

    return ItemsModel;

  })(base.PagingModel);
  return exports = {
    ItemsModel: ItemsModel
  };
});
