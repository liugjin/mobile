
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../view-model', './properties', './signals', './events', './commands', './ports', 'underscore', 'rx'], function(base, ps, ss, es, cs, ps2, _, Rx) {
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
      this.ports = new ps2.Ports(this);
      this.sampleUnits = {};
      this.propertyValues = {};
      this.subject = new Rx.Subject;
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

    Equipment.prototype.setModel = function(model, key) {
      if (!Equipment.__super__.setModel.call(this, model, key)) {
        return false;
      }
      this.setImage();
      this.updatePropertyValues();
      return true;
    };

    Equipment.prototype.updatePropertyValues = function() {
      var k, p, pv, v, _i, _j, _len, _len1, _ref, _ref1;
      pv = {};
      _ref = this.properties.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        pv[p.model.property] = p.getValue();
      }
      if (this.model.properties) {
        _ref1 = this.model.properties;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          pv[p.id] = p.value;
        }
      }
      for (k in pv) {
        v = pv[k];
        this.setPropertyValue(k, v);
      }
      return this.propertyValues;
    };

    Equipment.prototype.setImage = function() {
      var _ref, _ref1;
      return this.image = (_ref = this.model.image) != null ? _ref : (_ref1 = this.equipmentTemplate) != null ? _ref1.getModelValue('image') : void 0;
    };

    Equipment.prototype.setEquipmentTemplate = function(template) {
      var sampleUnit, su, _i, _len, _ref;
      if (template) {
        this.setImage();
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
      var m, p, properties, property, sampleUnits, _i, _len, _ref;
      m = Equipment.__super__.getChanges.call(this, model);
      properties = [];
      _ref = this.properties.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        property = _ref[_i];
        if (!(property.isChanged())) {
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
      var item, items, models, property, units, _i, _j, _len, _len1, _ref;
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
      units = this.project.typeModels.units;
      for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
        item = items[_j];
        if (properties[item.model.property] == null) {
          this.setPropertyValue(item.model.property, item.getValue());
        }
        item.unit = (_ref = units.getItem(item.model.unit)) != null ? _ref.model : void 0;
      }
      return items;
    };

    Equipment.prototype.getPropertyValue = function(key, defaultValue) {
      var _ref;
      return (_ref = this.propertyValues[key]) != null ? _ref : defaultValue;
    };

    Equipment.prototype.setPropertyValue = function(key, value) {
      var oldValue, property;
      property = this.properties.getItemByIds({
        property: key
      });
      if (property) {
        value = property.setValue(value);
      }
      oldValue = this.propertyValues[key];
      if (value === oldValue) {
        return value;
      }
      this.propertyValues[key] = value;
      this.subject.onNext({
        type: 'property',
        key: key,
        value: value,
        oldValue: oldValue
      });
      return value;
    };

    Equipment.prototype.subscribePropertyValue = function(key, callback, initializedValue, throttle) {
      var data, handler, subject;
      if (initializedValue) {
        data = {
          type: 'property',
          key: key,
          value: this.propertyValues[key]
        };
        if (typeof callback === "function") {
          callback(data);
        }
      }
      subject = this.subject;
      subject = subject.where(function(d) {
        return d.type === 'property' && d.key === key;
      });
      if (throttle) {
        subject = subject.throttle(throttle);
      }
      handler = subject.subscribe(callback);
      this.addHandler(handler);
      return handler;
    };

    Equipment.prototype.subscribePropertiesValue = function(keys, callback, throttle) {
      var handler, subject;
      subject = this.subject;
      if (throttle) {
        subject = subject.throttle(throttle);
      }
      handler = subject.where(d(function() {
        return d.type === 'property' && keys.indexOf(d.key) >= 0;
      })).subscribe(callback);
      this.addHandler(handler);
      return handler;
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

    Equipment.prototype.loadPorts = function(fields, callback, refresh) {
      if (!refresh && this.portsLoaded) {
        return typeof callback === "function" ? callback(null, this.ports.items) : void 0;
      }
      return this.loadEquipmentTemplate(null, (function(_this) {
        return function(err, template) {
          _this.portsLoaded = true;
          if (!template) {
            return typeof callback === "function" ? callback(err) : void 0;
          }
          return template.loadPorts(fields, function(err, ports) {
            var result;
            if (!ports) {
              return typeof callback === "function" ? callback(err) : void 0;
            }
            result = _this.addPorts(ports);
            return typeof callback === "function" ? callback(err, result) : void 0;
          }, refresh);
        };
      })(this), refresh);
    };

    Equipment.prototype.addPorts = function(ports) {
      var item, items, models, port, _i, _len;
      models = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = ports.length; _i < _len; _i++) {
          port = ports[_i];
          _results.push(port.model);
        }
        return _results;
      })();
      items = this.ports.addItems(models);
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this.station.ports[item.key] = item;
        this.project.addPort(item);
      }
      return items;
    };

    Equipment.prototype.dispose = function(disposing) {
      Equipment.__super__.dispose.call(this, disposing);
      if (!disposing) {
        this.subject.dispose();
      }
      this.signals.dispose(disposing);
      this.events.dispose(disposing);
      this.commands.dispose(disposing);
      return this.ports.dispose(disposing);
    };

    Equipment.prototype.getTemplateValue2 = function(key, template) {
      var val;
      if (!template) {
        return;
      }
      val = template.model[key];
      if (val != null) {
        return val;
      }
      return this.getTemplateValue2(key, template.base);
    };

    Equipment.prototype.getTemplateValue = function(key) {
      var val;
      val = this.model[key];
      if (val != null) {
        return val;
      }
      return this.getTemplateValue2(key, this.equipmentTemplate);
    };

    Equipment.prototype.updateSignals = function(signals, callback) {
      var data, url;
      if (this.updateSignalsService == null) {
        this.updateSignalsService = this.engine.modelManager.getService('updateSignals');
      }
      url = this.updateSignalsService.getUrl(this.model, true);
      data = {
        signals: signals
      };
      return this.updateSignalsService.postData(url, data, (function(_this) {
        return function(err, model) {
          if (model) {
            _this.setModel(model);
          }
          _this.display(err, "更新信号实例成功！");
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    Equipment.prototype.updateEvents = function(events, callback) {
      var data, url;
      if (this.updateEventsService == null) {
        this.updateEventsService = this.engine.modelManager.getService('updateEvents');
      }
      url = this.updateEventsService.getUrl(this.model, true);
      data = {
        events: events
      };
      return this.updateEventsService.postData(url, data, (function(_this) {
        return function(err, model) {
          if (model) {
            _this.setModel(model);
          }
          _this.display(err, "更新事件实例成功！");
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    Equipment.prototype.updateCommands = function(commands, callback) {
      var data, url;
      if (this.updateCommandsService == null) {
        this.updateCommandsService = this.engine.modelManager.getService('updateCommands');
      }
      url = this.updateCommandsService.getUrl(this.model, true);
      data = {
        commands: commands
      };
      return this.updateCommandsService.postData(url, data, (function(_this) {
        return function(err, model) {
          if (model) {
            _this.setModel(model);
          }
          _this.display(err, "更新控制实例成功！");
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    return Equipment;

  })(base.ViewModel);
  return exports = {
    Equipment: Equipment
  };
});
