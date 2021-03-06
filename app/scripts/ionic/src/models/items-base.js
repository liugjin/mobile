// Generated by IcedCoffeeScript 108.0.11

/*
* File: collection
* User: Dow
* Date: 4/27/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./paging-model', 'rx'], function(base, Rx) {
  var ItemsBase, exports;
  ItemsBase = (function(_super) {
    __extends(ItemsBase, _super);

    function ItemsBase(options) {
      ItemsBase.__super__.constructor.call(this, options);
      this.items = [];
      this.keys = {};
      this.index = 0;
      this.subject = new Rx.Subject;
    }

    ItemsBase.prototype.getKey = function(model, parent) {
      var i, k, key, keys, last, len, seperator, val, _i;
      keys = this.options.keys;
      len = keys != null ? keys.length : void 0;
      if (len) {
        seperator = this.options.keysSeperator || '_';
        key = '';
        last = len - 1;
        for (i = _i = 0; 0 <= last ? _i < last : _i > last; i = 0 <= last ? ++_i : --_i) {
          k = keys[i];
          key += model[k] + seperator;
        }
        if (parent) {
          val = model['parent'];
        } else {
          k = keys[last];
          val = model[k];
        }
        key += val;
      } else {
        key = model._id;
      }
      return key;
    };

    ItemsBase.prototype.getItem = function(key) {
      return this.keys[key];
    };

    ItemsBase.prototype.getItemByIds = function(ids, parent) {
      var key;
      key = this.getKey(ids, parent);
      return this.getItem(key);
    };

    ItemsBase.prototype.getModels = function() {
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

    ItemsBase.prototype.addItems = function(models) {
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

    ItemsBase.prototype.addItem = function(model) {
      var item, key;
      key = this.getKey(model);
      item = this.keys[key];
      if (item) {
        item.setModel(model, key);
        return item;
      }
      item = this.createItem(model);
      if (!item) {
        return;
      }
      item.setModel(model, key);
      return this.appendItem(item);
    };

    ItemsBase.prototype.createItem = function(model) {
      return model;
    };

    ItemsBase.prototype.addNewItem = function(item) {
      return this.appendItem(item);
    };

    ItemsBase.prototype.appendItem = function(item) {
      var flag, index, oldItem;
      item.index = ++this.index;
      flag = false;
      oldItem = this.keys[item.key];
      if (oldItem) {
        index = this.items.indexOf(oldItem);
        if (index >= 0) {
          this.items[index] = item;
          flag = true;
        }
      }
      if (!flag) {
        this.items.push(item);
      }
      this.keys[item.key] = item;
      this.subject.onNext({
        type: 'add',
        item: item
      });
      return item;
    };

    ItemsBase.prototype.removeItem = function(key, disposing) {
      var index, item;
      if (disposing == null) {
        disposing = true;
      }
      item = this.keys[key];
      if (!item) {
        return;
      }
      delete this.keys[key];
      index = this.items.indexOf(item);
      if (index >= 0) {
        this.items.splice(index, 1);
      }
      this.subject.onNext({
        type: 'remove',
        item: item
      });
      if (disposing) {
        item.dispose();
      }
      return item;
    };

    ItemsBase.prototype.reset = function() {
      var item, key, keys, _i, _len;
      keys = (function() {
        var _i, _len, _ref, _results;
        _ref = this.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.key);
        }
        return _results;
      }).call(this);
      for (_i = 0, _len = keys.length; _i < _len; _i++) {
        key = keys[_i];
        this.removeItem(key, false);
      }
      return this.index = 0;
    };

    ItemsBase.prototype.dispose = function(disposing) {
      ItemsBase.__super__.dispose.apply(this, arguments);
      if (!disposing) {
        this.reset();
        this.subject.dispose();
      }
    };

    ItemsBase.prototype.subscribe = function(type, callback, throttle) {
      var handler, subject;
      subject = this.subject;
      if (type) {
        subject = subject.where(function(d) {
          return d.type === type;
        });
      }
      if (throttle) {
        subject = subject.throttle(throttle);
      }
      handler = subject.subscribe(callback);
      return this.addHandler(handler);
    };

    return ItemsBase;

  })(base.PagingModel);
  return exports = {
    ItemsBase: ItemsBase
  };
});
