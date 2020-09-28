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

define(['clc.foundation.angular/services/service', './common/projects'], function(base, pm) {
  var ModelEngine, exports;
  ModelEngine = (function(_super) {
    __extends(ModelEngine, _super);

    function ModelEngine($rootScope, modelManager, storage) {
      this.$rootScope = $rootScope;
      this.modelManager = modelManager;
      this.storage = storage;
      ModelEngine.__super__.constructor.apply(this, arguments);
      this.caches = {};
      this.options = window.setting;
      this.projects = new pm.Projects({
        engine: this
      });
    }

    ModelEngine.prototype.loadProjects = function(filter, fields, callback, refresh) {
      this.projects.load(filter, fields, callback, refresh);
      return this.projects;
    };

    ModelEngine.prototype.loadProject = function(filter, fields, callback, refresh) {
      return this.projects.load(filter, fields, (function(_this) {
        return function(err, projects) {
          var model, myproject, p, _i, _len, _ref, _ref1;
          if (err) {
            return callback(err);
          }
          for (_i = 0, _len = projects.length; _i < _len; _i++) {
            p = projects[_i];
            model = p.model;
            if (model.user === filter.user && model.project === filter.project) {
              myproject = {
                user: model.user,
                userName: model.userName,
                project: model.project,
                name: model.name,
                role: (_ref = model._role) != null ? _ref.role : void 0,
                portal: (_ref1 = model._role) != null ? _ref1.portal : void 0
              };
              _this.storage.set("myproject", myproject);
              return typeof callback === "function" ? callback(err, p) : void 0;
            }
          }
          return typeof callback === "function" ? callback("无效项目：" + filter.user + "." + filter.project) : void 0;
        };
      })(this), refresh);
    };

    ModelEngine.prototype.query = function(url, filter, fields, callback, refresh) {
      var cache, id, key, service, url2;
      key = url + '&' + JSON.stringify(filter) + '&' + fields;
      cache = this.caches[key];
      if (!refresh && cache) {
        if (typeof callback === "function") {
          callback(null, cache);
        }
        return;
      }
      id = url;
      url2 = "" + this.options.services.model + "/" + this.options.services.api + "/" + url;
      service = this.modelManager.getService(id, url2);
      return service.query(filter, fields, (function(_this) {
        return function(err, model) {
          _this.caches[key] = model;
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    return ModelEngine;

  })(base.Service);
  return exports = {
    ModelEngine: ModelEngine
  };
});
