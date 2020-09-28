
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./view-model', './properties', './signals', './events', './commands', 'underscore'], function(base, ps, ss, es, cs, _) {
  var Equipment, exports;
  Equipment = (function(_super) {
    __extends(Equipment, _super);

    function Equipment(parent, model) {
      Equipment.__super__.constructor.call(this, parent, model);
      this.station = this.parent.parent;
      this.project = this.station.project;
      this.properties = new ps.Properties(this);
      this.signals = new ss.Signals(this);
      this.events = new es.Events(this);
      this.commands = new cs.Commands(this);
      this.sampleUnits = {};
    }

    Equipment.prototype.getIds = function() {
      var ids;
      ids = this.station.getIds();
      ids.equipment = this.model.equipment;
      return ids;
    };

    Equipment.prototype.loadEquipmentTemplate = function(fields, callback, refresh) {
      var filter;
      if (!refresh && this.templateLoaded) {
        return typeof callback === "function" ? callback(null, this.equipmentTemplate) : void 0;
      }
      filter = {
        type: this.model.type,
        template: this.model.template
      };
      return this.project.loadEquipmentTemplate(filter, fields, (function(_this) {
        return function(err, template) {
          _this.templateLoaded = true;
          _this.setEquipmentTemplate(template);
          return typeof callback === "function" ? callback(err, _this.equipmentTemplate) : void 0;
        };
      })(this), refresh);
    };

    Equipment.prototype.setModel = function(key, model) {
      var p, properties, result, _i, _len, _ref;
      result = Equipment.__super__.setModel.call(this, key, model);
      this.image = this.model.image;
      properties = {};
      if (this.model.properties) {
        _ref = this.model.properties;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          properties[p.id] = p.value;
        }
      }
      this.propertyValues = properties;
      return result;
    };

    Equipment.prototype.setEquipmentTemplate = function(template) {
      var sampleUnit, su, _i, _len, _ref;
      if (template) {
        if (!this.model.image) {
          this.image = template.getModelValue('image');
        }
        this.sampleUnits = template.getSampleUnits();
        if (this.model.sampleUnits) {
          _ref = this.model.sampleUnits;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            su = _ref[_i];
            sampleUnit = this.sampleUnits[su.id];
            if (sampleUnit && (su.value != null)) {
              sampleUnit.value = su.value;
            }
          }
        }
      }
      return this.equipmentTemplate = template;
    };

    Equipment.prototype.getChanges = function(model) {
      var m, p, properties, property, sampleUnits, _i, _len, _ref, _ref1, _ref2;
      m = Equipment.__super__.getChanges.call(this, model);
      properties = [];
      _ref = this.properties.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        property = _ref[_i];
        if (!(((_ref1 = property.value) != null ? _ref1.toString() : void 0) !== ((_ref2 = property.model.value) != null ? _ref2.toString() : void 0))) {
          continue;
        }
        p = {
          id: property.model.property,
          value: property.value
        };
        properties.push(p);
      }
      m.properties = properties;
      sampleUnits = _.map(this.sampleUnits, function(su) {
        var result;
        return result = {
          id: su.id,
          value: su.value
        };
      });
      m.sampleUnits = sampleUnits;
      return m;
    };

    Equipment.prototype.loadProperties = function(fields, callback, refresh) {
      if (!refresh && this.propertiesLoaded) {
        return typeof callback === "function" ? callback(null, this.properties.items) : void 0;
      }
      return this.loadEquipmentTemplate(null, (function(_this) {
        return function(err, template) {
          _this.propertiesLoaded = true;
          if (!template) {
            return typeof callback === "function" ? callback(err) : void 0;
          }
          return template.loadProperties(fields, function(err, properties) {
            var result;
            if (!properties) {
              return typeof callback === "function" ? callback(err) : void 0;
            }
            result = _this.addProperties(properties);
            return typeof callback === "function" ? callback(err, result) : void 0;
          }, refresh);
        };
      })(this), refresh);
    };

    Equipment.prototype.addProperties = function(properties) {
      var item, items, models, property, _i, _len;
      models = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = properties.length; _i < _len; _i++) {
          property = properties[_i];
          _results.push(property.model);
        }
        return _results;
      })();
      items = this.properties.addItems(models);
      properties = this.propertyValues;
      if (properties) {
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          item.setValue(properties[item.model.property]);
        }
      }
      return items;
    };

    Equipment.prototype.loadSignals = function(fields, callback, refresh) {
      if (!refresh && this.signalsLoaded) {
        return typeof callback === "function" ? callback(null, this.signals.items) : void 0;
      }
      return this.loadEquipmentTemplate(null, (function(_this) {
        return function(err, template) {
          _this.signalsLoaded = true;
          if (!template) {
            return typeof callback === "function" ? callback(err) : void 0;
          }
          return template.loadSignals(fields, function(err, signals) {
            var result;
            if (!signals) {
              return typeof callback === "function" ? callback(err) : void 0;
            }
            result = _this.addSignals(signals);
            return typeof callback === "function" ? callback(err, result) : void 0;
          }, refresh);
        };
      })(this), refresh);
    };

    Equipment.prototype.addSignals = function(signals) {
      var item, items, models, signal, _i, _len;
      models = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = signals.length; _i < _len; _i++) {
          signal = signals[_i];
          _results.push(signal.model);
        }
        return _results;
      })();
      items = this.signals.addItems(models);
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this.station.signals[item.key] = item;
        this.project.addSignal(item);
      }
      return items;
    };

    Equipment.prototype.loadEvents = function(fields, callback, refresh) {
      if (!refresh && this.eventsLoaded) {
        return typeof callback === "function" ? callback(null, this.events.items) : void 0;
      }
      return this.loadEquipmentTemplate(null, (function(_this) {
        return function(err, template) {
          _this.eventsLoaded = true;
          if (!template) {
            return typeof callback === "function" ? callback(err) : void 0;
          }
          return template.loadEvents(fields, function(err, events) {
            var result;
            if (!events) {
              return typeof callback === "function" ? callback(err) : void 0;
            }
            result = _this.addEvents(events);
            return typeof callback === "function" ? callback(err, result) : void 0;
          }, refresh);
        };
      })(this), refresh);
    };

    Equipment.prototype.addEvents = function(events) {
      var event, item, items, models, _i, _len;
      models = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          _results.push(event.model);
        }
        return _results;
      })();
      items = this.events.addItems(models);
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this.station.events[item.key] = item;
        this.project.addEvent(item);
      }
      return items;
    };

    Equipment.prototype.loadCommands = function(fields, callback, refresh) {
      if (!refresh && this.commandsLoaded) {
        return typeof callback === "function" ? callback(null, this.commands.items) : void 0;
      }
      return this.loadEquipmentTemplate(null, (function(_this) {
        return function(err, template) {
          _this.commandsLoaded = true;
          if (!template) {
            return typeof callback === "function" ? callback(err) : void 0;
          }
          return template.loadCommands(fields, function(err, commands) {
            var result;
            if (!commands) {
              return typeof callback === "function" ? callback(err) : void 0;
            }
            result = _this.addCommands(commands);
            return typeof callback === "function" ? callback(err, result) : void 0;
          }, refresh);
        };
      })(this), refresh);
    };

    Equipment.prototype.addCommands = function(commands) {
      var command, item, items, models, _i, _len;
      models = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = commands.length; _i < _len; _i++) {
          command = commands[_i];
          _results.push(command.model);
        }
        return _results;
      })();
      items = this.commands.addItems(models);
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this.station.commands[item.key] = item;
        this.project.addCommand(item);
      }
      return items;
    };

    Equipment.prototype.dispose = function() {
      Equipment.__super__.dispose.apply(this, arguments);
      this.signals.dispose();
      this.events.dispose();
      return this.commands.dispose();
    };

    return Equipment;

  })(base.ViewModel);
  return exports = {
    Equipment: Equipment
  };
});
