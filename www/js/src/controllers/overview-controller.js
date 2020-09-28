var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'moment', 'rx', 'underscore'], function(base, fsf, moment, Rx, _) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, commonService) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.commonService = commonService;
      this.goBack = __bind(this.goBack, this);
      this.filterTasks = __bind(this.filterTasks, this);
      this.subscribeTasks = __bind(this.subscribeTasks, this);
      this.queryTaskReport = __bind(this.queryTaskReport, this);
      this.closeModal = __bind(this.closeModal, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.init();
    }

    Ctrl.prototype.init = function() {
      return this.equipments = [];
    };

    Ctrl.prototype.dispose = function() {
      var _ref, _ref1;
      Ctrl.__super__.dispose.apply(this, arguments);
      if ((_ref = this.modal) != null) {
        _ref.remove();
      }
      return (_ref1 = this.maintasksSubscri) != null ? _ref1.dispose() : void 0;
    };

    Ctrl.prototype.openModal = function() {
      this.datacenters = this.project.stations.roots;
      this.datacenters = _.filter(this.datacenters, (function(_this) {
        return function(station) {
          return station.model.station.charAt(0) !== "_";
        };
      })(this));
      return this.initModal();
    };

    Ctrl.prototype.closeModal = function() {
      var _ref;
      return (_ref = this.modal) != null ? _ref.remove() : void 0;
    };

    Ctrl.prototype.initModal = function() {
      return this.$ionicModal.fromTemplateUrl('templates/modals/station.html', {
        scope: this.$scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          _this.modal = modal;
          _this.$scope.vm = _this;
          return _this.modal.show();
        };
      })(this));
    };

    Ctrl.prototype.selectOrder = function(order) {
      this.$routeParams.orderId = order.task;
      this.$routeParams.name = order.name;
      return this.$ionicModal.fromTemplateUrl('templates/order-node.html', {
        scope: this.$scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          _this.emodal = modal;
          _this.$scope.vm = _this;
          return _this.emodal.show();
        };
      })(this));
    };

    Ctrl.prototype.modalSelectStation = function(station) {
      this.modal.remove();
      return this.$timeout((function(_this) {
        return function() {
          return _this.selectStation(station);
        };
      })(this), 10);
    };

    Ctrl.prototype.initializeStations = function() {
      var ids, station, _ref;
      this.datacenters = this.project.stations.roots;
      this.datacenters = _.filter(this.datacenters, (function(_this) {
        return function(station) {
          return station.model.station.charAt(0) !== "_";
        };
      })(this));
      if (!this.$routeParams.station && this.$rootScope.station) {
        this.$routeParams.station = this.$rootScope.station.station;
      }
      ids = {
        user: this.$routeParams.user,
        project: this.$routeParams.project,
        station: this.$routeParams.station
      };
      station = this.project.stations.getItemByIds(ids);
      this.datacenter = (_ref = station != null ? station.root : void 0) != null ? _ref : this.datacenters[0];
      station = station || this.datacenter;
      return this.selectStation(station);
    };

    Ctrl.prototype.selectStation = function(station) {
      if (!station || this.station === station) {
        return false;
      }
      this.station = station;
      this.$rootScope.station = this.station.model;
      return true;
    };

    Ctrl.prototype.load = function(callback, refresh) {
      return Ctrl.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          var preference, _ref;
          preference = (_ref = JSON.parse(localStorage.getItem('project-preference'))) != null ? _ref : {};
          preference[_this.$rootScope.user.user] = _this.project.model.user + "." + _this.project.model.project;
          localStorage.setItem('project-preference', JSON.stringify(preference));
          _this.allTasks = [];
          _this.startTasks = [];
          _this.endTasks = [];
          _this.queryTaskReport();
          _this.subscribeTasks();
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Ctrl.prototype.queryTaskReport = function() {
      return this.commonService.loadProjectModelByService('tasks', {}, null, (function(_this) {
        return function(err, taskModels) {
          if (err || !taskModels || taskModels.length < 1) {
            return;
          }
          _this.allTasks = taskModels;
          return _this.filterTasks();
        };
      })(this), true);
    };

    Ctrl.prototype.subscribeTasks = function() {
      var topic, user, _ref;
      user = this.$rootScope.user.user;
      topic = "tasks/" + user + "/#";
      if ((_ref = this.maintasksSubscri) != null) {
        _ref.dispose();
      }
      return this.maintasksSubscri = this.commonService.configurationLiveSession.subscribe(topic, (function(_this) {
        return function(err, d) {
          var index;
          if (!d) {
            return;
          }
          if (d.topic.indexOf("configuration/task/create/") === 0 || d.topic.indexOf("configuration/task/update/") === 0) {
            index = _.findIndex(_this.allTasks, function(task) {
              return task._id === d.message._id;
            });
            if (index >= 0) {
              _this.allTasks.splice(index, 1, d.message);
            } else {
              _this.allTasks.push(d.message);
            }
          }
          if (d.topic.indexOf("configuration/task/delete/") === 0) {
            index = _.findIndex(_this.allTasks, function(task) {
              return task._id === d.message._id;
            });
            if (index >= 0) {
              _this.allTasks.splice(index, 1);
            }
          }
          return _this.filterTasks();
        };
      })(this));
    };

    Ctrl.prototype.filterTasks = function() {
      this.startTasks = [];
      this.endTasks = [];
      return _.each(this.allTasks, (function(_this) {
        return function(task) {
          var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
          if (_.isEmpty((_ref = task.phase) != null ? _ref.nextManager : void 0) && !(((_ref1 = task.phase) != null ? _ref1.progress : void 0) >= 0)) {
            console.log("等待处理");
            return _this.startTasks.push(task);
          } else if (((_ref2 = task.phase) != null ? _ref2.state : void 0) === "reject") {
            return console.log("拒绝");
          } else if (((_ref3 = task.phase) != null ? _ref3.state : void 0) === "cancel") {
            return console.log("取消");
          } else if ((((_ref4 = task.phase) != null ? _ref4.progress : void 0) < 1) || !_.isEmpty((_ref5 = task.phase) != null ? _ref5.nextManager : void 0)) {
            console.log("进行中");
            return _this.startTasks.push(task);
          } else {
            console.log("已结束");
            return _this.endTasks.push(task);
          }
        };
      })(this));
    };

    Ctrl.prototype.goBack = function(refresh) {
      var _ref;
      return (_ref = this.emodal) != null ? _ref.remove() : void 0;
    };

    Ctrl.prototype.loadEquipments = function(callback) {
      var observableBatch, _loadStationEquipments;
      this.showStations = this.getStations(this.station);
      _loadStationEquipments = Rx.Observable.fromCallback(this.loadStationEquipments);
      observableBatch = _.map(this.showStations, function(s) {
        return _loadStationEquipments(s);
      });
      return Rx.Observable.forkJoin(observableBatch).subscribe(function(resArr) {
        var result;
        result = [];
        _.each(resArr, function(item) {
          return result = result.concat(item[1]);
        });
        return typeof callback === "function" ? callback(null, result) : void 0;
      });
    };

    Ctrl.prototype.loadStationEquipments = function(station, callback) {
      var fields, filter;
      filter = null;
      fields = 'user project station equipment name template properties type parent';
      return station.loadEquipments(filter, fields, (function(_this) {
        return function(err, equips) {
          if (err) {
            return typeof callback === "function" ? callback(err, []) : void 0;
          }
          equips = _.filter(equips, function(e) {
            return e.model.type !== '_station_management' && e.model.equipment.substr(0, 1) !== "_";
          });
          return typeof callback === "function" ? callback(err, equips) : void 0;
        };
      })(this), true);
    };

    Ctrl.prototype.getStations = function(station) {
      var s, stations, _i, _len, _ref;
      if (!station) {
        return [];
      }
      stations = [station];
      if (station.stations && station.stations.length) {
        stations = stations.concat(station.stations);
      }
      _ref = station.stations;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        if (s.stations && s.stations.length) {
          stations = stations.concat(s.stations);
        }
      }
      return stations;
    };

    return Ctrl;

  })(base.FeatureBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
