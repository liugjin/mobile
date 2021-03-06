
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./items-model', './command'], function(base, cmd) {
  var Commands, exports;
  Commands = (function(_super) {
    __extends(Commands, _super);

    function Commands(parent, options) {
      var _base, _base1;
      Commands.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'equipmentcommands';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project', 'station', 'equipment', 'command'];
      }
      this.equipment = this.parent;
    }

    Commands.prototype.createItem = function(model) {
      var item;
      return item = new cmd.Command(this, model);
    };

    Commands.prototype.getKey = function(model) {
      var key, m, seperator;
      seperator = this.options.keysSeperator || '.';
      m = this.equipment.model;
      key = "" + m.user + seperator + m.project + seperator + m.station + seperator + m.equipment + seperator + model.command;
      return key;
    };

    return Commands;

  })(base.ItemsModel);
  return exports = {
    Commands: Commands
  };
});
