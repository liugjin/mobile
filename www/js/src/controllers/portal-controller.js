if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/project-base-controller'], function(base) {
  var PortalController, exports;
  PortalController = (function(_super) {
    __extends(PortalController, _super);

    function PortalController($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, $state, $ionicModal) {
      this.$state = $state;
      this.$ionicModal = $ionicModal;
      this.goToOrigin = __bind(this.goToOrigin, this);
      PortalController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options);
      this.pageItems = 30;
      this.predicate = ['stared', 'updatetime'];
    }

    PortalController.prototype.onLoad = function(callback, refresh) {
      return this.load(callback, refresh);
    };

    PortalController.prototype.load = function(callback, refresh) {
      this.myproject = this.modelEngine.storage.get('myproject');
      return this.loadProjects((function(_this) {
        return function(err, model) {
          var item, itemId, itm, project;
          if (_this.$routeParams.auto === 'false') {
            return;
          }
          project = JSON.parse(localStorage.getItem('project-preference'));
          itemId = project != null ? project[_this.$rootScope.user.user] : void 0;
          itm = _.find(_this.items, function(it) {
            return it.user + "." + it.project === itemId;
          });
          item = itm != null ? itm : _this.items[0];
          if (item) {
            return _this.$state.go('tab.overview', {
              user: item.user,
              project: item.project
            });
          }
        };
      })(this), true);
    };

    PortalController.prototype.copyProject = function(callback) {
      var data, generateProjectUrl, service, url;
      data = {
        user0: 'admin',
        project0: 'ups-monitoring',
        user: this.$rootScope.user.user,
        project: 'ups-monitoring',
        name: '云监控平台'
      };
      service = this.modelManager.getService('project');
      generateProjectUrl = "http://192.168.1.76/model/clc/api/v1/generateProject/:user/:project";
      url = service.replaceUrlParam(generateProjectUrl, data);
      return service.postData(url, data, (function(_this) {
        return function(err, result) {
          return typeof callback === "function" ? callback(err, result) : void 0;
        };
      })(this));
    };

    PortalController.prototype.loadProjects = function(callback, refresh) {
      var fields, filter, _ref;
      filter = {
        user: (_ref = this.$rootScope.user) != null ? _ref.user : void 0
      };
      fields = 'user _id project name image updatetime stars keywords desc group';
      return this.query(filter, fields, (function(_this) {
        return function(err, model) {
          var p, _i, _len;
          _this.items = _.filter(_this.items, function(item) {
            return ~(item.keywords.indexOf('app'));
          });
          if ((model != null ? model.length : void 0) > 0) {
            for (_i = 0, _len = model.length; _i < _len; _i++) {
              p = model[_i];
              p.stared = _this.isStared(p);
              if (!_this.myproject && p.stared) {
                _this.myproject = p;
              }
            }
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    PortalController.prototype.doRefresh = function() {
      return this.loadProjects((function(_this) {
        return function(err, model) {
          return _this.$timeout(function() {
            return _this.$scope.$broadcast('scroll.refreshComplete');
          }, 2000);
        };
      })(this), true);
    };

    PortalController.prototype.getImage = function(image) {
      return 'url(img/svg/background.png)';
    };

    PortalController.prototype.goToOrigin = function() {
      if (this.$routeParams.origin === 'login') {
        return this.$state.go('logout', {});
      } else if (this.$routeParams.origin === 'overview') {
        return this.$state.go('tab.overview', {
          user: this.$routeParams.user,
          project: this.$routeParams.project
        });
      } else if (this.$routeParams.origin === 'setting') {
        return this.$state.go('tab.setting', {
          user: this.$routeParams.user,
          project: this.$routeParams.project
        });
      } else {
        return this.$state.go('logout', {});
      }
    };

    return PortalController;

  })(base.ProjectBaseController);
  return exports = {
    PortalController: PortalController
  };
});
