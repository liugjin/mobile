
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../view-model', './equipments'], function(base, em) {
  var Station, exports;
  Station = (function(_super) {
    __extends(Station, _super);

    function Station(parent, model) {
      Station.__super__.constructor.call(this, parent, model);
      this.stations = [];
      this.stationKeys = {};
      this.stationIds = [model.station];
      this.project = this.parent.parent;
      this.equipments = new em.Equipments(this);
      this.signals = {};
      this.events = {};
      this.commands = {};
      this.ports = {};
      this.statistic = {
        alarms: 0,
        capacity: 0,
        pue: 0,
        equipments: 0,
        stockItems: 0,
        connections: 0
      };
    }

    Station.prototype.getIds = function() {
      var ids;
      ids = this.project.getIds();
      ids.station = this.model.station;
      return ids;
    };

    Station.prototype.appendStation = function(station) {
      this.stations.push(station);
      this.stationKeys[station.model.station] = station;
      return this.stationIds.push(station.model.station);
    };

    Station.prototype.containsStation = function(stationId) {
      return this.model.station === stationId || this.stationKeys.hasOwnProperty(stationId);
    };

    Station.prototype.loadEquipments = function(filter, fields, callback, refresh) {
      if (filter == null) {
        filter = {};
      }
      if (filter.user == null) {
        filter.user = this.model.user;
      }
      if (filter.project == null) {
        filter.project = this.model.project;
      }
      if (filter.station == null) {
        filter.station = this.model.station;
      }
      return this.equipments.load(filter, fields, (function(_this) {
        return function(err, model) {
          var m, _i, _len;
          if (model) {
            for (_i = 0, _len = model.length; _i < _len; _i++) {
              m = model[_i];
              _this.project.addEquipment(m);
            }
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Station.prototype.loadEquipment = function(equipmentId, fields, callback, refresh) {
      var filter;
      filter = {
        equipment: equipmentId,
        user: this.model.user,
        project: this.model.project,
        station: this.model.station
      };
      return this.equipments.loadOne(filter, fields, (function(_this) {
        return function(err, model) {
          if (model) {
            _this.project.addEquipment(model);
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Station.prototype.dispose = function() {
      Station.__super__.dispose.apply(this, arguments);
      this.equipments.dispose();
      this.signals = {};
      this.events = {};
      this.commands = {};
      this.ports = {};
    };

    Station.prototype.loadStatisticByEquipmentTypes = function(callback, refresh) {
      var fields, filter, url;
      url = "inventory.statisticByEquipmentTypes";
      filter = {
        user: this.model.user,
        project: this.model.project,
        station: this.model.station
      };
      fields = null;
      return this.engine.query(url, filter, fields, (function(_this) {
        return function(err, model) {
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Station.prototype.createEquipment = function(model, parentEquipment) {
      if (model == null) {
        model = {};
      }
      if (model.user == null) {
        model.user = this.model.user;
      }
      if (model.project == null) {
        model.project = this.model.project;
      }
      if (model.station == null) {
        model.station = this.model.station;
      }
      if (model.enable == null) {
        model.enable = true;
      }
      if (model.parent == null) {
        model.parent = parentEquipment != null ? parentEquipment.model.equipment : void 0;
      }
      this.equipment = this.equipments.createItem(model);
      this.equipment.parentEquipment = parentEquipment;
      return this.equipment;
    };

    Station.prototype.getEquipmentsByType = function(type) {
      var equipment, equipments;
      return equipments = (function() {
        var _i, _len, _ref, _results;
        _ref = this.equipments.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          equipment = _ref[_i];
          if (equipment.model.type === type) {
            _results.push(equipment);
          }
        }
        return _results;
      }).call(this);
    };

    Station.prototype.getFirstEquipmentByType = function(type) {
      var equipment, _i, _len, _ref;
      _ref = this.equipments.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        equipment = _ref[_i];
        if (equipment.model.type === type) {
          return equipment;
        }
      }
      return null;
    };

    return Station;

  })(base.ViewModel);
  return exports = {
    Station: Station
  };
});
