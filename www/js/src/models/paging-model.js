
/*
* File: paging-controller
* User: Dow
* Date: 3/21/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/disposable'], function(base) {
  var PagingModel, exports;
  PagingModel = (function(_super) {
    __extends(PagingModel, _super);

    function PagingModel(options) {
      var _ref, _ref1, _ref2;
      this.options = options != null ? options : {};
      PagingModel.__super__.constructor.apply(this, arguments);
      this.predicate = (_ref = this.options.predicate) != null ? _ref : '';
      this.reverse = (_ref1 = this.options.reverse) != null ? _ref1 : false;
      this.pageItems = (_ref2 = this.options.pageItems) != null ? _ref2 : 10;
      this.page = 1;
      this.pages = [];
      this.pageCount = 0;
      this.itemCount = 0;
      this.items = [];
    }

    PagingModel.prototype.predicateItem = function(item) {
      return true;
    };

    PagingModel.prototype.setItems = function(items) {
      var item, items2, key, v, _i, _len;
      items2 = [];
      if (!items) {

      } else if (items instanceof Array) {
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          v = items[_i];
          if (this.predicateItem(item)) {
            items2.push(v);
          }
        }
      } else {
        for (key in items) {
          item = items[key];
          if (this.predicateItem(item)) {
            items2.push(item);
          }
        }
      }
      this.items = items2;
      this.processPages();
      return this.items;
    };

    PagingModel.prototype.addItem = function(item) {
      var item2, key, value, _i, _len, _ref;
      if (!item) {
        return;
      }
      _ref = this.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item2 = _ref[_i];
        if (item2._id === item._id) {
          for (key in item) {
            value = item[key];
            item2[key] = value;
          }
          return item2;
        }
      }
      if (!this.predicateItem(item)) {
        return;
      }
      this.items.push(item);
      this.processPages();
      return item;
    };

    PagingModel.prototype.removeItem = function(item) {
      var index;
      if (!item) {
        return;
      }
      index = this.items.indexOf(item);
      this.items.splice(index, 1);
      this.processPages();
      return index;
    };

    PagingModel.prototype.removeById = function(id) {
      var index, item, _i, _len, _ref;
      _ref = this.items;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        item = _ref[index];
        if (item._id === id) {
          this.items.splice(index, 1);
          this.processPages();
          return index;
        }
      }
      return -1;
    };

    PagingModel.prototype.sortBy = function(predicate) {
      if (this.predicate === predicate) {
        return this.reverse = !this.reverse;
      } else {
        this.predicate = predicate;
        return this.reverse = true;
      }
    };

    PagingModel.prototype.nextPage = function() {
      if (this.page < this.pageCount) {
        return this.page++;
      }
    };

    PagingModel.prototype.previousPage = function() {
      if (this.page > 1) {
        return this.page--;
      }
    };

    PagingModel.prototype.setPage = function(page) {
      if (!page || page > this.pageCount) {
        page = 1;
      }
      return this.page = page;
    };

    PagingModel.prototype.processPages = function(refresh) {
      var count, page, _i, _ref, _results;
      count = this.items.length;
      if (!refresh && this.itemCount === count) {
        return;
      }
      this.itemCount = count;
      this.pageCount = Math.ceil(count / this.pageItems);
      if (this.pageCount === 0) {
        this.pages = [];
      } else {
        this.pages = (function() {
          _results = [];
          for (var _i = 1, _ref = this.pageCount; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
      }
      if (page > this.pageCount) {
        return page = this.pageCount - 1;
      }
    };

    PagingModel.prototype.filter = function(searchText, keys, ignoreCase) {
      if (keys == null) {
        keys = ['name'];
      }
      if (ignoreCase == null) {
        ignoreCase = true;
      }
      return (function(_this) {
        return function(item) {
          var key, _i, _len;
          if (!searchText) {
            return true;
          }
          for (_i = 0, _len = keys.length; _i < _len; _i++) {
            key = keys[_i];
            if (_this.filterItemField(searchText, item, key, ignoreCase)) {
              return true;
            }
          }
          return false;
        };
      })(this);
    };

    PagingModel.prototype.filterItemField = function(text, item, key, ignoreCase) {
      var value, _ref, _ref1;
      value = (_ref = item[key]) != null ? _ref : (_ref1 = item.model) != null ? _ref1[key] : void 0;
      if (!value) {
        return false;
      }
      if (ignoreCase) {
        text = text.toLowerCase();
        if (value.toLowerCase().indexOf(text) >= 0) {
          return true;
        }
      } else {
        if (value.indexOf(text) >= 0) {
          return true;
        }
      }
      return false;
    };

    return PagingModel;

  })(base.Disposable);
  return exports = {
    PagingModel: PagingModel
  };
});
