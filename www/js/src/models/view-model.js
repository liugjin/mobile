
/*
* File: model
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/disposable'], function(base) {
  var ViewModel, exports;
  ViewModel = (function(_super) {
    __extends(ViewModel, _super);

    function ViewModel(parent, model) {
      this.parent = parent;
      this.model = model != null ? model : {};
      ViewModel.__super__.constructor.apply(this, arguments);
      this.engine = this.parent.engine;
    }

    ViewModel.prototype.getIds = function() {
      return {};
    };

    ViewModel.prototype.getKey = function(model, parent) {
      var _ref;
      return (_ref = this.parent) != null ? _ref.getKey(model, parent) : void 0;
    };

    ViewModel.prototype.setModel = function(model, key) {
      var k, v;
      if (!model) {
        return false;
      }
      if (key == null) {
        key = this.getKey(model);
      }
      if (this.key && this.key !== key) {
        return false;
      }
      this.key = key;
      if (model !== this.model) {
        for (k in model) {
          v = model[k];
          this.model[k] = v;
        }
      }
      return true;
    };

    ViewModel.prototype.updateModel = function(model) {
      var k, key, v;
      key = this.getKey(model);
      if (key !== this.key) {
        return;
      }
      if (!model || model === this.model) {
        return model;
      }
      for (k in model) {
        v = model[k];
        this.model[k] = v;
      }
      return this.model;
    };

    ViewModel.prototype.getModelService = function() {
      if (this.service == null) {
        this.service = this.engine.modelManager.getService(this.parent.options.id);
      }
      return this.service;
    };

    ViewModel.prototype.load = function(callback, refresh) {
      var filter, modelService;
      if (!refresh && this.loaded) {
        if (typeof callback === "function") {
          callback(null, this.model);
        }
        return;
      }
      modelService = this.getModelService();
      filter = this.getIds();
      return modelService.get(filter, (function(_this) {
        return function(err, model) {
          _this.loaded = true;
          _this.setModel(model);
          return typeof callback === "function" ? callback(err, _this.model) : void 0;
        };
      })(this), refresh);
    };

    ViewModel.prototype.reset = function() {
      var k, v, _ref;
      _ref = this.model;
      for (k in _ref) {
        v = _ref[k];
        delete this.model[k];
      }
    };

    ViewModel.prototype.display = function(err, info, period) {
      var delay, message;
      delay = period || 5000;
      message = this.formatErrorInfo(err, info);
      if (message) {
        return Materialize.toast(message, delay);
      }
    };

    ViewModel.prototype.formatErrorInfo = function(err, info) {
      var result;
      if (err) {
        if (typeof err === 'object') {
          result = JSON.stringify(err);
        } else {
          result = err;
        }
        console.log(result);
      } else {
        result = info;
      }
      return result;
    };

    ViewModel.prototype.getChanges = function(model) {
      var changes, k, v;
      if (model == null) {
        model = this.model;
      }
      changes = {
        _id: model._id
      };
      for (k in model) {
        v = model[k];
        if (k[0] !== '_') {
          changes[k] = v;
        }
      }
      return changes;
    };

    ViewModel.prototype.update = function(callback) {
      var changes, modelService;
      changes = this.getChanges();
      modelService = this.getModelService();
      return modelService.update(changes, (function(_this) {
        return function(err, model) {
          _this.setModel(model);
          _this.display(err, '数据更新成功！');
          return typeof callback === "function" ? callback(err, _this.model) : void 0;
        };
      })(this));
    };

    ViewModel.prototype.remove = function(callback) {
      var changes, modelService;
      changes = this.getChanges();
      modelService = this.getModelService();
      return modelService.remove(changes, (function(_this) {
        return function(err, model) {
          var _ref;
          if (!err && model) {
            if ((_ref = _this.parent) != null) {
              _ref.removeItem(_this.key);
            }
          }
          _this.display(err, '数据删除成功！');
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    ViewModel.prototype.create = function(callback) {
      var changes, modelService;
      changes = this.getChanges();
      modelService = this.getModelService();
      return modelService.create(changes, (function(_this) {
        return function(err, model) {
          var _ref;
          if (!err && model) {
            _this.setModel(model);
            if ((_ref = _this.parent) != null) {
              _ref.addNewItem(_this);
            }
          }
          _this.display(err, '数据创建成功！');
          return typeof callback === "function" ? callback(err, _this.model) : void 0;
        };
      })(this));
    };

    ViewModel.prototype.save = function(callback) {
      if (this.model._removed) {
        return this.remove(callback);
      } else if (!this.model._id) {
        return this.create(callback);
      } else {
        return this.update(callback);
      }
    };

    return ViewModel;

  })(base.Disposable);
  return exports = {
    ViewModel: ViewModel
  };
});