
/*
* File: rack
* User: Dow
* Date: 4/7/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./equipment-model', './servers', './pdus'], function(base, ss, ps) {
  var Rack, exports;
  Rack = (function(_super) {
    __extends(Rack, _super);

    function Rack(parent, model) {
      Rack.__super__.constructor.call(this, parent, model);
      this.servers = new ss.Servers(this);
      this.pdus = new ps.Pdus(this);
    }

    Rack.prototype.loadMe = function(id, callback, refresh) {
      var fields, filter, m;
      m = this.parent.model;
      filter = {
        user: m.user,
        project: m.project,
        station: m.station,
        equipment: id
      };
      fields = null;
      return this.load(filter, fields, (function(_this) {
        return function(err, model) {
          _this.loadProperties(null, null, refresh);
          _this.loadServers(null, null, refresh);
          _this.loadPdus(null, null, refresh);
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    Rack.prototype.loadServers = function(fields, callback, refresh) {
      var filter, m;
      m = this.model;
      filter = {
        user: m.user,
        project: m.project,
        station: m.station,
        type: 'server',
        parent: m.equipment
      };
      return this.servers.load(filter, fields, (function(_this) {
        return function(err, servers) {
          var server, _i, _len;
          for (_i = 0, _len = servers.length; _i < _len; _i++) {
            server = servers[_i];
            server.loadProperties();
          }
          return typeof callback === "function" ? callback(err, servers) : void 0;
        };
      })(this), refresh);
    };

    Rack.prototype.addServer = function(server) {
      return this.servers.appendItem(server);
    };

    Rack.prototype.removeServer = function(key) {
      return this.servers.removeItem(key, false);
    };

    Rack.prototype.dispose = function(disposing) {
      Rack.__super__.dispose.call(this, disposing);
      return this.servers.dispose(disposing);
    };

    Rack.prototype.updateModel = function(m) {
      if (m.type === 'rack') {
        return this.setModel(m);
      } else if (m.type === 'server') {
        return this.updateServerModel(m);
      }
    };

    Rack.prototype.updateServerModel = function(m) {
      var server;
      server = this.servers.getItemByIds(m);
      if (server) {
        if (m.parent === this.model.equipment) {
          server.setModel(m);
        } else {
          this.servers.removeItem(server.key, false);
        }
      } else {
        if (m.parent === this.model.equipment) {
          server = this.servers.addItem(m);
          server.loadProperties();
        }
      }
      return server;
    };

    Rack.prototype.loadPdus = function(fields, callback, refresh) {
      var filter, m;
      m = this.model;
      filter = {
        user: m.user,
        project: m.project,
        station: m.station,
        type: 'pdu',
        parent: m.equipment
      };
      return this.pdus.load(filter, fields, (function(_this) {
        return function(err, pdus) {
          var pdu, _i, _len;
          for (_i = 0, _len = pdus.length; _i < _len; _i++) {
            pdu = pdus[_i];
            pdu.loadProperties();
            pdu.loadPorts();
          }
          return typeof callback === "function" ? callback(err, pdus) : void 0;
        };
      })(this), refresh);
    };

    return Rack;

  })(base.EquipmentModel);
  return exports = {
    Rack: Rack
  };
});
