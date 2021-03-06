// Generated by IcedCoffeeScript 108.0.11

/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./items-model', './project'], function(base, cm) {
  var Projects, exports;
  Projects = (function(_super) {
    __extends(Projects, _super);

    function Projects(parent, options) {
      var _base, _base1;
      Projects.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'project';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project'];
      }
    }

    Projects.prototype.createItem = function(model) {
      var item;
      return item = new cm.Project(this, model);
    };

    return Projects;

  })(base.ItemsModel);
  return exports = {
    Projects: Projects
  };
});
