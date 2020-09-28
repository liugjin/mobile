
/*
* File: module-base
* User: Dow
* Date: 12/4/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/disposable'], function(base) {
  var ModuleBase, exports;
  ModuleBase = (function(_super) {
    __extends(ModuleBase, _super);

    function ModuleBase(options) {
      this.options = options != null ? options : {};
      ModuleBase.__super__.constructor.apply(this, arguments);
    }

    return ModuleBase;

  })(base.Disposable);
  return exports = {
    ModuleBase: ModuleBase
  };
});
