if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/controllers/project-item-model-controller', 'moment'], function(base, moment) {
  var ProjectController, exports;
  ProjectController = (function(_super) {
    __extends(ProjectController, _super);

    function ProjectController($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, $state) {
      this.modelEngine = modelEngine;
      this.$state = $state;
      ProjectController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, uploadService, options);
      this.init();
    }

    ProjectController.prototype.init = function() {
      this.btnTxt = '创 建';
      return this.isSave = false;
    };

    ProjectController.prototype.load = function(callback, refresh) {
      if (this.$routeParams.project) {
        return this.loadProject(callback, refresh);
      } else {
        return this.createProject(callback, refresh);
      }
    };

    ProjectController.prototype.loadProject = function(callback, refresh) {
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

    ProjectController.prototype.createProject = function(callback, refresh) {
      var project;
      project = 'industry-' + moment().format('YYYYMMDDHHmmss');
      this.current = {
        user: this.$rootScope.user.user,
        project: project,
        name: project,
        enable: true,
        "private": false,
        type: 'industry',
        keywords: ['model', 'industry', 'visualization', 'app']
      };
      return typeof callback === "function" ? callback(null, this.current) : void 0;
    };

    ProjectController.prototype.pasteLon = function($event) {
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

    ProjectController.prototype.pasteLat = function($event) {
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

    ProjectController.prototype.save = function(callback, action) {
      if (action == null) {
        action = '/projects';
      }
      if (this.current.project && !this.current._removed) {
        action = '/portal';
      }
      return ProjectController.__super__.save.call(this, (function(_this) {
        return function(err, project) {
          var modelService, station, stationId;
          if (err) {
            return;
          }
          modelService = _this.modelManager.getService('stations');
          stationId = 'station-' + moment().format('HHmmss');
          station = {
            user: project.user,
            project: project.project,
            enable: true,
            station: stationId,
            name: stationId,
            parent: ''
          };
          modelService.save(station, function(err, model) {});
          return _this.$timeout(function() {
            return _this.$state.go('portal', {}, {
              reload: true
            });
          }, 1000);
        };
      })(this), '创建成功');
    };

    ProjectController.prototype.addFeature = function() {
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

    ProjectController.prototype.removeFeature = function(feature) {
      var features;
      if (!this.current) {
        return;
      }
      features = this.current.features;
      return features.splice(features.indexOf(feature), 1);
    };

    ProjectController.prototype.uploadFeatureImage = function(index) {
      return (function(_this) {
        return function(input) {
          return _this.uploadFeatureImage2(input, index);
        };
      })(this);
    };

    ProjectController.prototype.uploadFeatureImage2 = function(input, index) {
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

    return ProjectController;

  })(base.ProjectItemModelController);
  return exports = {
    ProjectController: ProjectController
  };
});
