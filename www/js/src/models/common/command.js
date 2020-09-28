
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
  var Command, exports;
  Command = (function(_super) {
    __extends(Command, _super);

    function Command(parent, model) {
      Command.__super__.constructor.call(this, parent, model);
      this.equipment = this.parent.parent;
      this.station = this.equipment.station;
      this.data = {};
    }

    Command.prototype.setModel = function(model, key) {
      var enums, kv, kvs, parameter, ps, val, _i, _j, _len, _len1, _ref;
      if (!Command.__super__.setModel.call(this, model, key)) {
        return false;
      }
      if (this.model.parameters) {
        _ref = this.model.parameters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          parameter = _ref[_i];
          if (parameter.type === 'enum' && parameter.definition) {
            enums = [];
            kvs = parameter.definition.split(',');
            for (_j = 0, _len1 = kvs.length; _j < _len1; _j++) {
              kv = kvs[_j];
              ps = kv.split(':');
              val = ps[0];
              val = isNaN(val) ? val : Number(val);
              enums.push({
                key: "" + ps[1] + " (" + val + ")",
                value: val
              });
            }
            parameter.enums = enums;
          }
        }
      }
      return true;
    };

    Command.prototype.getIds = function() {
      var ids;
      ids = this.equipment.getIds();
      ids.command = this.model.command;
      return ids;
    };

    Command.prototype.setValue = function(message) {
      var data, k, p, parameters, parameters3, v, _i, _len, _ref;
      data = {};
      for (k in message) {
        v = message[k];
        data[k] = v;
      }
      parameters = {};
      parameters3 = '';
      if (data.parameters) {
        _ref = data.parameters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          parameters[p.key] = p.value;
          if (parameters3) {
            parameters3 += ", ";
          }
          parameters3 += "" + p.key + "=" + p.value;
        }
      }
      data.parameters3 = parameters3;
      if (data.trigger === 'user') {
        data.triggerName = data.operatorName;
      } else {
        data.triggerName = data.trigger;
      }
      this._data = message;
      return this.data = data;
    };

    Command.prototype.getParameterValue = function(parameter) {
      var val;
      val = parameter.value;
      switch (parameter.type) {
        case 'float':
          val = parseFloat(val);
          break;
        case 'int':
          val = parseInt(val);
          break;
        case 'bool':
          val = Bool(val);
          break;
        case 'enum':
          if (!isNaN(val)) {
            val = Number(val);
          }
      }
      return val;
    };

    Command.prototype.getParameterValues = function() {
      var p, parameters, _i, _len, _ref;
      parameters = [];
      _ref = this.model.parameters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        parameters.push({
          key: p.key,
          value: this.getParameterValue(p)
        });
      }
      return parameters;
    };

    return Command;

  })(base.ViewModel);
  return exports = {
    Command: Command
  };
});
