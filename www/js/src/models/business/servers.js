
/*
* File: servers
* User: Dow
* Date: 4/26/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./equipments-model', './server'], function(base, s) {
  var Servers, exports;
  Servers = (function(_super) {
    __extends(Servers, _super);

    function Servers(parent, options) {
      Servers.__super__.constructor.call(this, parent, options);
    }

    Servers.prototype.createItem = function(model) {
      var item;
      return item = new s.Server(this, model);
    };

    return Servers;

  })(base.EquipmentsModel);
  return exports = {
    Servers: Servers
  };
});
