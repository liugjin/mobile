
/*
* File: unplaced-servers
* User: Dow
* Date: 4/26/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/disposable', './servers'], function(base, ss) {
  var UnplacedServers, exports;
  UnplacedServers = (function(_super) {
    __extends(UnplacedServers, _super);

    function UnplacedServers(station) {
      this.station = station;
      UnplacedServers.__super__.constructor.apply(this, arguments);
      this.servers = new ss.Servers(this.station);
    }

    UnplacedServers.prototype.loadServers = function(fields, callback, refresh) {
      var filter, m;
      m = this.station.model;
      filter = {
        user: m.user,
        project: m.project,
        station: m.station,
        type: 'server',
        $or: [
          {
            parent: ""
          }, {
            parent: null
          }
        ]
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

    UnplacedServers.prototype.addServer = function(server) {
      return this.servers.appendItem(server);
    };

    UnplacedServers.prototype.removeServer = function(key) {
      return this.servers.removeItem(key, false);
    };

    UnplacedServers.prototype.dispose = function(disposing) {
      UnplacedServers.__super__.dispose.call(this, disposing);
      return this.servers.dispose(disposing);
    };

    UnplacedServers.prototype.updateModel = function(m) {
      if (m.type === 'server') {
        return this.updateServerModel(m);
      }
    };

    UnplacedServers.prototype.updateServerModel = function(m) {
      var server;
      server = this.servers.getItemByIds(m);
      if (server) {
        if (m.parent) {
          this.servers.removeItem(server.key, false);
        } else {
          server.setModel(m);
        }
      } else {
        if (!m.parent) {
          server = this.servers.addItem(m);
          server.loadProperties();
        }
      }
      return server;
    };

    return UnplacedServers;

  })(base.Disposable);
  return exports = {
    UnplacedServers: UnplacedServers
  };
});
