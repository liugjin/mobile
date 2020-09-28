
/*
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['clc.foundation.angular/controllers/project-base-controller'], function(base) {
  var ProjectBaseController, exports;
  ProjectBaseController = (function(_super) {
    __extends(ProjectBaseController, _super);

    function ProjectBaseController($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options) {
      ProjectBaseController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options);
    }

    ProjectBaseController.prototype.load = function(callback, refresh) {
      return ProjectBaseController.__super__.load.call(this, (function(_this) {
        return function(err, project) {
          if (err) {
            return typeof callback === "function" ? callback(err, project) : void 0;
          }
          return _this.loadProject(callback, refresh);
        };
      })(this), refresh);
    };

    ProjectBaseController.prototype.loadProject = function(callback, refresh, typesModel) {
      var fields, filter, model, _ref;
      if (typesModel == null) {
        typesModel = true;
      }
      filter = {
        user: this.$routeParams.user,
        project: this.$routeParams.project
      };
      if (!refresh) {
        this.project = this.$rootScope.project;
        model = (_ref = this.project) != null ? _ref.model : void 0;
        if (model && model.user === filter.user && model.project === filter.project) {
          return typeof callback === "function" ? callback(null, this.project) : void 0;
        }
      }
      fields = null;
      return this.modelEngine.loadProject(filter, fields, (function(_this) {
        return function(err, project) {
          var k, setting, v;
          _this.$rootScope.project = _this.project = project;
          if (project) {
            setting = project.model.setting;
            if (setting) {
              for (k in setting) {
                v = setting[k];
                _this.setting[k] = v;
              }
            }
            if (typesModel) {
              project.loadTypeModels(null, refresh);
            }
          }
          return typeof callback === "function" ? callback(err, project) : void 0;
        };
      })(this), refresh);
    };

    ProjectBaseController.prototype.removeUnauthorizedProject = function(project, userId) {
      var invalidMsg, unauthorizedMsg;
      unauthorizedMsg = '未授权项目';
      invalidMsg = '';
      return this.modelEngine.loadProject({
        user: project.user,
        project: project.project
      }, null, (function(_this) {
        return function(err, model) {
          var isRemove, role;
          isRemove = false;
          if (err && (err === unauthorizedMsg || ~err.indexOf('无效项目')) && !model) {
            isRemove = true;
          } else if (model && model.model && model.model._role) {
            role = model.model._role || {
              users: []
            };
            if (!(role.isAdmin || __indexOf.call(role.users, userId) >= 0)) {
              isRemove = true;
            }
          }
          if (isRemove) {
            _this.items = _.filter(_this.items, function(item) {
              return !(item.user === project.user && item.project === project.project);
            });
            return _this.processPages(true);
          }
        };
      })(this));
    };

    ProjectBaseController.prototype.getDbKv = function(key, callback, refresh) {
      var service;
      service = this.modelManager.getService('keyvalues');
      return service.query({
        user: this.project.model.user,
        project: this.project.model.project,
        key: key
      }, null, function(err, values) {
        return typeof callback === "function" ? callback(err, values) : void 0;
      }, refresh);
    };

    ProjectBaseController.prototype.saveDbKv = function(key, value, callback) {
      var service, values;
      service = this.modelManager.getService('keyvalues');
      values = {
        user: this.project.model.user,
        project: this.project.model.project,
        key: key,
        value: value
      };
      return service.save(values, function(err, result) {
        return typeof callback === "function" ? callback(err, result) : void 0;
      });
    };

    return ProjectBaseController;

  })(base.ProjectBaseController);
  return exports = {
    ProjectBaseController: ProjectBaseController
  };
});
