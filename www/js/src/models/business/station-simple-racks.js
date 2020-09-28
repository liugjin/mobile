
/*
* File: station-simple-racks
* User: Dow
* Date: 4/27/2016
* Desc: don't load servers of rack
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/disposable', './racks'], function(base, rs) {
  var StationSimpleRacks, exports;
  StationSimpleRacks = (function(_super) {
    __extends(StationSimpleRacks, _super);

    function StationSimpleRacks(station) {
      this.station = station;
      StationSimpleRacks.__super__.constructor.apply(this, arguments);
      this.racks = new rs.Racks(this.station);
    }

    StationSimpleRacks.prototype.loadRacks = function(ids, callback, refresh) {
      var filter, m;
      m = this.station.model;
      filter = {
        user: m.user,
        project: m.project,
        station: m.station,
        type: 'rack'
      };
      if (ids) {
        filter.equipment = ids;
      }
      return this.racks.load(filter, null, (function(_this) {
        return function(err, model) {
          var rack, _i, _len;
          if (model) {
            for (_i = 0, _len = model.length; _i < _len; _i++) {
              rack = model[_i];
              rack.loadProperties(null, null, refresh);
            }
            _this.rack = model[0];
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    StationSimpleRacks.prototype.dispose = function(disposing) {
      StationSimpleRacks.__super__.dispose.call(this, disposing);
      return this.racks.dispose(disposing);
    };

    StationSimpleRacks.prototype.updateModel = function(m) {
      var rack;
      if (m.type === 'rack') {
        rack = this.racks.getItemByIds(m);
        return rack != null ? rack.updateModel(m) : void 0;
      }
    };

    return StationSimpleRacks;

  })(base.Disposable);
  return exports = {
    StationSimpleRacks: StationSimpleRacks
  };
});
