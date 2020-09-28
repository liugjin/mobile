
/*
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/project-item-model-controller'], function(base) {
  var ProjectModelController, exports;
  ProjectModelController = (function(_super) {
    __extends(ProjectModelController, _super);

    function ProjectModelController($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options) {
      ProjectModelController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options);
    }

    ProjectModelController.prototype.load = function(callback, refresh) {
      if (this.$routeParams.project) {
        return this.loadProject(callback, refresh);
      } else {
        return this.createProject(callback, refresh);
      }
    };

    ProjectModelController.prototype.loadProject = function(callback, refresh) {
      var data;
      data = {
        user: this.$routeParams.user,
        project: this.$routeParams.project
      };
      return this.get(data, (function(_this) {
        return function(err, result) {
          return typeof callback === "function" ? callback(err, result) : void 0;
        };
      })(this), refresh);
    };

    ProjectModelController.prototype.createProject = function(callback, refresh) {
      this.current = {
        user: this.$rootScope.user.user,
        project: this.getGuid(),
        enable: true,
        "private": false
      };
      return typeof callback === "function" ? callback(null, this.current) : void 0;
    };

    ProjectModelController.prototype.pasteLon = function($event) {
      var data, lat, lon, _ref;
      data = $event.originalEvent.clipboardData.getData('text/plain');
      _ref = data.split(','), lon = _ref[0], lat = _ref[1];
      return this.$timeout((function(_this) {
        return function() {
          if (lon != null) {
            _this.current.longitude = lon;
          }
          if (lat != null) {
            return _this.current.latitude = lat;
          }
        };
      })(this), 50);
    };

    ProjectModelController.prototype.pasteLat = function($event) {
      var data, lat, lon, _ref;
      data = $event.originalEvent.clipboardData.getData('text/plain');
      _ref = data.split(','), lon = _ref[0], lat = _ref[1];
      return this.$timeout((function(_this) {
        return function() {
          if ((lon != null) && (lat != null)) {
            _this.current.longitude = lon;
            return _this.current.latitude = lat;
          }
        };
      })(this), 50);
    };

    ProjectModelController.prototype.save = function(callback, action) {
      if (action == null) {
        action = '/projects';
      }
      if (this.current.project && !this.current._removed) {
        action = "/projects/" + this.current.user + "/" + this.current.project;
      }
      return ProjectModelController.__super__.save.call(this, callback, action);
    };

    ProjectModelController.prototype.addFeature = function() {
      var newFeature, _base;
      if (!this.current) {
        return;
      }
      if ((_base = this.current).features == null) {
        _base.features = [];
      }
      newFeature = {
        desc: '',
        image: ''
      };
      return this.current.features.push(newFeature);
    };

    ProjectModelController.prototype.removeFeature = function(feature) {
      var features;
      if (!this.current) {
        return;
      }
      features = this.current.features;
      return features.splice(features.indexOf(feature), 1);
    };

    ProjectModelController.prototype.uploadFeatureImage = function(index) {
      return (function(_this) {
        return function(input) {
          return _this.uploadFeatureImage2(input, index);
        };
      })(this);
    };

    ProjectModelController.prototype.uploadFeatureImage2 = function(input, index) {
      var feature, file, url;
      if (input.files.length > 0) {
        file = input.files[0];
        url = "" + this.options.uploadUrl + "/" + file.name;
        feature = this.current.features[index];
        return this.uploadService.upload(file, url, (function(_this) {
          return function(err, name) {
            _this.$rootScope.err = err;
            return feature.image = name;
          };
        })(this));
      }
    };

    return ProjectModelController;

  })(base.ProjectItemModelController);
  return exports = {
    ProjectModelController: ProjectModelController
  };
});
