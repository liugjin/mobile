
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../view-model'], function(base) {
  var Port, exports;
  Port = (function(_super) {
    __extends(Port, _super);

    function Port(parent, model) {
      Port.__super__.constructor.call(this, parent, model);
      this.equipment = this.parent.parent;
      this.station = this.equipment.station;
      this.data = {};
    }

    Port.prototype.getIds = function() {
      var ids;
      ids = this.equipment.getIds();
      ids.port = this.model.port;
      return ids;
    };

    Port.prototype.setValue = function(message) {
      var data;
      this.data = data = message;
      return data;
    };

    return Port;

  })(base.ViewModel);
  return exports = {
    Port: Port
  };
});
