var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./base/graphic-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'moment', 'rx', 'underscore'], function(base, fsf, moment, Rx, _) {
  var Ctrl, exports;
  Ctrl = (function(_super) {
    __extends(Ctrl, _super);

    function Ctrl($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, $ionicPopover, $ionicModal, $ionicTabsDelegate, commonService, $state) {
      this.$ionicPopover = $ionicPopover;
      this.$ionicModal = $ionicModal;
      this.$ionicTabsDelegate = $ionicTabsDelegate;
      this.commonService = commonService;
      this.$state = $state;
      this.closeModal = __bind(this.closeModal, this);
      Ctrl.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.init();
    }

    Ctrl.prototype.init = function() {
      var _ref, _ref1;
      this.equipments = [];
      this.initModal();
      if ((_ref = this.equipSubscription) != null) {
        _ref.dispose();
      }
      this.equipSubscription = this.commonService.subscribeEventBus("selectEquipment", (function(_this) {
        return function(msg) {
          _this.currentEquipInfo = msg.message;
          _this.templateId = _this.currentEquipInfo.templateId;
          _this.templateParameters = {
            station: _this.currentEquipInfo.stationId,
            equipment: _this.currentEquipInfo.equipmentId
          };
          return _this.$ionicModal.fromTemplateUrl('templates/equipment.html', {
            scope: _this.$scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            _this.emodal = modal;
            _this.$scope.vm = _this;
            return _this.emodal.show();
          });
        };
      })(this));
      if ((_ref1 = this.subscription) != null) {
        _ref1.dispose();
      }
      return this.subscription = this.commonService.subscribeEventBus("navigateTo", (function(_this) {
        return function(msg) {
          var event;
          event = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          });
          event.isIonicTap = true;
          $("a[href='#history']")[0].dispatchEvent(event);
          return setTimeout(function() {
            return _this.commonService.publishEventBus("signalId", {
              stationId: msg.message.stationId,
              equipment: msg.message.equipmentId,
              signalId: msg.message.signalId
            });
          }, 10);
        };
      })(this));
    };

    Ctrl.prototype.onTemplateLoad = function() {};

    Ctrl.prototype.dispose = function() {
      var _ref, _ref1, _ref2, _ref3;
      Ctrl.__super__.dispose.apply(this, arguments);
      if ((_ref = this.modal) != null) {
        _ref.remove();
      }
      if ((_ref1 = this.emodal) != null) {
        _ref1.remove();
      }
      if ((_ref2 = this.equipSubscription) != null) {
        _ref2.dispose();
      }
      return (_ref3 = this.subscription) != null ? _ref3.dispose() : void 0;
    };

    Ctrl.prototype.openModal = function() {
      this.datacenters = this.project.stations.roots;
      this.datacenters = _.filter(this.datacenters, (function(_this) {
        return function(station) {
          return station.model.station.charAt(0) !== "_";
        };
      })(this));
      return this.modal.show();
    };

    Ctrl.prototype.closeModal = function() {
      var _ref;
      return (_ref = this.modal) != null ? _ref.hide() : void 0;
    };

    Ctrl.prototype.initModal = function() {
      return this.$ionicModal.fromTemplateUrl('templates/modals/station.html', {
        scope: this.$scope,
        animation: 'slide-in-up'
      }).then((function(_this) {
        return function(modal) {
          _this.modal = modal;
          return _this.$scope.vm = _this;
        };
      })(this));
    };

    Ctrl.prototype.modalSelectStation = function(station) {
      this.modal.hide();
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
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
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
      fields = 'user project station equipment name template properties type parent image';
      return station.loadEquipments(filter, fields, (function(_this) {
        return function(err, equips) {
          if (err) {
            return typeof callback === "function" ? callback(err, []) : void 0;
          }
          equips = _.filter(equips, function(e) {
            return e.model.type !== '_station_management';
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

    Ctrl.prototype.getItemHeight = function(index, length) {
      if (index === (length - 1)) {
        return '220px';
      } else {
        return '100px';
      }
    };

    Ctrl.prototype.goBack = function() {
      var _ref;
      return (_ref = this.emodal) != null ? _ref.remove() : void 0;
    };

    return Ctrl;

  })(base.GraphicBaseController);
  return exports = {
    Ctrl: Ctrl
  };
});
