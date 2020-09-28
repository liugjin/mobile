
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./items-model', './station'], function(base, cm) {
  var Stations, exports;
  Stations = (function(_super) {
    __extends(Stations, _super);

    function Stations(parent, options) {
      var _base, _base1;
      Stations.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'stations';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project', 'station'];
      }
      this.roots = [];
    }

    Stations.prototype.createItem = function(model) {
      var item;
      return item = new cm.Station(this, model);
    };

    Stations.prototype.load = function(filter, fields, callback, refresh) {
      return Stations.__super__.load.call(this, filter, fields, (function(_this) {
        return function(err, stations) {
          _this.processStations(stations);
          return typeof callback === "function" ? callback(err, stations) : void 0;
        };
      })(this), refresh);
    };

    Stations.prototype.processStations = function(stations) {
      var processStation, s, s2, _i, _len;
      if (!stations) {
        return;
      }
      processStation = function(station, root) {
        var id, s, _i, _len;
        station.root = root;
        station.stations.length = 0;
        id = station.model.station;
        for (_i = 0, _len = stations.length; _i < _len; _i++) {
          s = stations[_i];
          if (!(s.model.parent === id)) {
            continue;
          }
          s.parentStation = station;
          station.appendStation(s);
          processStation(s, root);
        }
        return station;
      };
      this.roots.length = 0;
      for (_i = 0, _len = stations.length; _i < _len; _i++) {
        s = stations[_i];
        if (!(!s.model.parent)) {
          continue;
        }
        s2 = processStation(s, s);
        this.roots.push(s2);
      }
      return this.roots;
    };

    Stations.prototype.addNewItem = function(item) {
      var newItem, parentStation;
      newItem = Stations.__super__.addNewItem.call(this, item);
      parentStation = newItem.parentStation;
      if (parentStation) {
        newItem.root = parentStation.root;
        parentStation.appendStation(newItem);
      } else {
        this.roots.push(newItem);
      }
      return newItem;
    };

    Stations.prototype.removeItem = function(key) {
      var item, parentStation;
      item = Stations.__super__.removeItem.call(this, key);
      if (!item) {
        return;
      }
      parentStation = item.parentStation;
      if (parentStation) {
        parentStation.stations.splice(parentStation.stations.indexOf(item), 1);
      } else {
        this.roots.splice(this.roots.indexOf(item), 1);
      }
      return item;
    };

    return Stations;

  })(base.ItemsModel);
  return exports = {
    Stations: Stations
  };
});
