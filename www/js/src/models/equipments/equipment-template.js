
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./view-model', './items-model'], function(base, im) {
  var EquipmentTemplate, exports;
  EquipmentTemplate = (function(_super) {
    __extends(EquipmentTemplate, _super);

    function EquipmentTemplate(parent, model) {
      EquipmentTemplate.__super__.constructor.call(this, parent, model);
      this.properties = new im.ItemsModel(this, {
        id: 'equipmentproperties',
        keys: ['user', 'project', 'type', 'template', 'property']
      });
      this.signals = new im.ItemsModel(this, {
        id: 'equipmentsignals',
        keys: ['user', 'project', 'type', 'template', 'signal']
      });
      this.events = new im.ItemsModel(this, {
        id: 'equipmentevents',
        keys: ['user', 'project', 'type', 'template', 'event']
      });
      this.commands = new im.ItemsModel(this, {
        id: 'equipmentcommands',
        keys: ['user', 'project', 'type', 'template', 'command']
      });
    }

    EquipmentTemplate.prototype.loadProperties = function(fields, callback, refresh) {
      var filter;
      filter = {
        user: this.model.user,
        project: this.model.project,
        type: this.model.type,
        template: this.model.template
      };
      if (this.base) {
        return this.base.loadProperties(fields, (function(_this) {
          return function(err, baseProperties) {
            return _this.properties.load(filter, fields, function(err, properties) {
              var keys, n, result, s, _i, _j, _len, _len1;
              result = [];
              keys = {};
              if (properties) {
                for (_i = 0, _len = properties.length; _i < _len; _i++) {
                  s = properties[_i];
                  result.push(s);
                  keys[s.key] = s;
                }
              }
              n = 0;
              if (baseProperties) {
                for (_j = 0, _len1 = baseProperties.length; _j < _len1; _j++) {
                  s = baseProperties[_j];
                  if (!keys[s.key]) {
                    result.splice(n++, 0, s);
                  }
                }
              }
              return typeof callback === "function" ? callback(err, result) : void 0;
            }, refresh);
          };
        })(this), refresh);
      } else {
        return this.properties.load(filter, fields, callback, refresh);
      }
    };

    EquipmentTemplate.prototype.loadSignals = function(fields, callback, refresh) {
      var filter;
      filter = {
        user: this.model.user,
        project: this.model.project,
        type: this.model.type,
        template: this.model.template
      };
      if (this.base) {
        return this.base.loadSignals(fields, (function(_this) {
          return function(err, baseSignals) {
            return _this.signals.load(filter, fields, function(err, signals) {
              var keys, n, result, s, _i, _j, _len, _len1;
              result = [];
              keys = {};
              if (signals) {
                for (_i = 0, _len = signals.length; _i < _len; _i++) {
                  s = signals[_i];
                  result.push(s);
                  keys[s.key] = s;
                }
              }
              n = 0;
              if (baseSignals) {
                for (_j = 0, _len1 = baseSignals.length; _j < _len1; _j++) {
                  s = baseSignals[_j];
                  if (!keys[s.key]) {
                    result.splice(n++, 0, s);
                  }
                }
              }
              return typeof callback === "function" ? callback(err, result) : void 0;
            }, refresh);
          };
        })(this), refresh);
      } else {
        return this.signals.load(filter, fields, callback, refresh);
      }
    };

    EquipmentTemplate.prototype.loadEvents = function(fields, callback, refresh) {
      var filter;
      filter = {
        user: this.model.user,
        project: this.model.project,
        type: this.model.type,
        template: this.model.template
      };
      if (this.base) {
        return this.base.loadEvents(fields, (function(_this) {
          return function(err, baseEvents) {
            return _this.events.load(filter, fields, function(err, events) {
              var keys, n, result, s, _i, _j, _len, _len1;
              result = [];
              keys = {};
              if (events) {
                for (_i = 0, _len = events.length; _i < _len; _i++) {
                  s = events[_i];
                  result.push(s);
                  keys[s.key] = s;
                }
              }
              n = 0;
              if (baseEvents) {
                for (_j = 0, _len1 = baseEvents.length; _j < _len1; _j++) {
                  s = baseEvents[_j];
                  if (!keys[s.key]) {
                    result.splice(n++, 0, s);
                  }
                }
              }
              return typeof callback === "function" ? callback(err, result) : void 0;
            }, refresh);
          };
        })(this), refresh);
      } else {
        return this.events.load(filter, fields, callback, refresh);
      }
    };

    EquipmentTemplate.prototype.loadCommands = function(fields, callback, refresh) {
      var filter;
      filter = {
        user: this.model.user,
        project: this.model.project,
        type: this.model.type,
        template: this.model.template
      };
      if (this.base) {
        return this.base.loadCommands(fields, (function(_this) {
          return function(err, baseCommands) {
            return _this.commands.load(filter, fields, function(err, commands) {
              var keys, n, result, s, _i, _j, _len, _len1;
              result = [];
              keys = {};
              if (commands) {
                for (_i = 0, _len = commands.length; _i < _len; _i++) {
                  s = commands[_i];
                  result.push(s);
                  keys[s.key] = s;
                }
              }
              n = 0;
              if (baseCommands) {
                for (_j = 0, _len1 = baseCommands.length; _j < _len1; _j++) {
                  s = baseCommands[_j];
                  if (!keys[s.key]) {
                    result.splice(n++, 0, s);
                  }
                }
              }
              return typeof callback === "function" ? callback(err, result) : void 0;
            }, refresh);
          };
        })(this), refresh);
      } else {
        return this.commands.load(filter, fields, callback, refresh);
      }
    };

    EquipmentTemplate.prototype.getModelValue = function(name) {
      var val, _ref;
      val = this.model[name];
      if (val) {
        return val;
      }
      return (_ref = this.base) != null ? _ref.getModelValue(name) : void 0;
    };

    EquipmentTemplate.prototype.getSampleUnits = function() {
      var k, sampleUnits, su, sus, _i, _len, _ref;
      sampleUnits = {};
      if (this.model.sampleUnits) {
        _ref = this.model.sampleUnits;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          su = _ref[_i];
          sampleUnits[su.id] = su;
        }
      }
      if (this.base) {
        sus = this.base.getSampleUnits();
        if (sus) {
          for (k in sus) {
            su = sus[k];
            if (!sampleUnits.hasOwnProperty(k)) {
              sampleUnits[k] = su;
            }
          }
        }
      }
      return sampleUnits;
    };

    EquipmentTemplate.prototype.dispose = function() {
      EquipmentTemplate.__super__.dispose.apply(this, arguments);
      this.signals.dispose();
      this.events.dispose();
      return this.commands.dispose();
    };

    return EquipmentTemplate;

  })(base.ViewModel);
  return exports = {
    EquipmentTemplate: EquipmentTemplate
  };
});
