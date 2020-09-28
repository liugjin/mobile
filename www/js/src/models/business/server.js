
/*
* File: server
* User: Dow
* Date: 4/7/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./equipment-model'], function(base) {
  var Server, exports;
  Server = (function(_super) {
    __extends(Server, _super);

    function Server(parent, model) {
      Server.__super__.constructor.call(this, parent, model);
    }

    Server.prototype.initialize = function(callback) {
      Server.__super__.initialize.call(this, callback);
      return this.capacity = {
        space: 1,
        power: 0.1,
        cooling: 0.1,
        weight: 10,
        ports: 1
      };
    };

    Server.prototype.addToRack = function(rack, row, callback) {
      if (!rack || (row == null) || row < 0) {
        return typeof callback === "function" ? callback('null rack') : void 0;
      }
      this.model.parent = rack.model.equipment;
      this.setPropertyValue('row', row);
      return this.update((function(_this) {
        return function(err, model) {
          if (!err) {
            rack.addServer(_this);
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    Server.prototype.removeFromRack = function(rack, callback) {
      var key;
      if (!rack) {
        return typeof callback === "function" ? callback('null rack') : void 0;
      }
      this.model.parent = '';
      key = this.key;
      return this.update((function(_this) {
        return function(err, model) {
          if (!err) {
            rack.removeServer(key);
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    Server.prototype.loadProperties = function(fields, callback, refresh) {
      return Server.__super__.loadProperties.call(this, fields, (function(_this) {
        return function(err, model) {
          var capacity;
          capacity = _this.capacity != null ? _this.capacity : _this.capacity = {};
          capacity.space = _this.getPropertyValue('space', 1);
          capacity.power = _this.getPropertyValue('power', 0.1);
          capacity.cooling = _this.getPropertyValue('cooling', 0.1);
          capacity.weight = _this.getPropertyValue('weight', 10);
          capacity.ports = _this.getPropertyValue('space', 1);
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    return Server;

  })(base.EquipmentModel);
  return exports = {
    Server: Server
  };
});
