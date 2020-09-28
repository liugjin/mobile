
/*
* File: equipment-manager-controller
* User: Dow
* Date: 04/06/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./graphic-base-controller', 'moment', 'underscore'], function(base, moment, _) {
  var EquipmentManagerController, exports;
  EquipmentManagerController = (function(_super) {
    __extends(EquipmentManagerController, _super);

    function EquipmentManagerController($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) {
      EquipmentManagerController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
    }

    EquipmentManagerController.prototype.load = function(callback, refresh) {
      return EquipmentManagerController.__super__.load.call(this, (function(_this) {
        return function(err, model) {
          _this.loadEquipmentTemplates(null, refresh);
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    EquipmentManagerController.prototype.dispose = function() {
      EquipmentManagerController.__super__.dispose.apply(this, arguments);
      return this.clearEquipment();
    };

    EquipmentManagerController.prototype.loadEquipmentsByType = function(types, callback, refresh) {
      var fields, filter;
      if (!types) {
        return typeof callback === "function" ? callback('null type') : void 0;
      }
      if (types instanceof Array) {
        filter = {
          type: {
            $in: types
          }
        };
      } else {
        filter = {
          type: types
        };
      }
      fields = null;
      return this.station.loadEquipments(filter, fields, (function(_this) {
        return function(err, model) {
          _this.equipments = model;
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    EquipmentManagerController.prototype.loadEquipments = function(callback, refresh) {
      var fields, filter, _ref;
      fields = 'user project station equipment name type image index group vendor';
      filter = {
        type: {
          $regex: '^[^_]',
          $options: 'i'
        }
      };
      return (_ref = this.station) != null ? _ref.loadEquipments(filter, fields, (function(_this) {
        return function(err, model) {
          var equipment, _base, _i, _len, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
          _this.equipments = model;
          _ref1 = _this.equipments;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            equipment = _ref1[_i];
            equipment.model.typeName = (_ref2 = _.find(_this.project.dictionary.equipmenttypes.items, function(type) {
              return type.key === equipment.model.type;
            })) != null ? _ref2.model.name : void 0;
            equipment.model.templateName = (_ref3 = _.find(_this.equipmentTemplates, function(template) {
              return template.model.type === equipment.model.type && template.model.template === equipment.model.template;
            })) != null ? _ref3.model.name : void 0;
            equipment.model.vendorName = (_ref4 = _.find(_this.project.dictionary.vendors.items, function(vendor) {
              return vendor.key === equipment.model.vendor;
            })) != null ? _ref4.model.name : void 0;
            equipment.model.stationName = (_ref5 = _.find(_this.project.stations.items, function(station) {
              return station.model.station === equipment.model.station;
            })) != null ? _ref5.model.name : void 0;
            if ((_base = equipment.model).image == null) {
              _base.image = (_ref6 = _.find(_this.equipmentTemplates, function(tmp) {
                return tmp.model.template === equipment.model.template;
              })) != null ? _ref6.model.image : void 0;
            }
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh) : void 0;
    };

    EquipmentManagerController.prototype.getEquipmentsByType = function(type) {
      var equipment, _i, _len, _ref, _results;
      if (!this.equipments) {
        return [];
      }
      _ref = this.equipments;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        equipment = _ref[_i];
        if (equipment.model.type === type) {
          _results.push(equipment);
        }
      }
      return _results;
    };

    EquipmentManagerController.prototype.createEquipment = function(type, parent) {
      var last, model, _ref, _ref1, _ref2;
      if (type == null) {
        type = (_ref = (_ref1 = this.type) != null ? _ref1.type : void 0) != null ? _ref : (_ref2 = this.equipmentType) != null ? _ref2.model.type : void 0;
      }
      model = {
        type: type,
        enable: true
      };
      last = this.equipment;
      if (angular.isArray(this.equipments)) {
        if (last == null) {
          last = this.equipments[this.equipments.length - 1];
        }
      }
      if (last) {
        model.equipment = this.getNextName(last.model.equipment);
        model.name = this.getNextName(last.model.name);
        if (model.type == null) {
          model.type = last.model.type;
        }
        model.vendor = last.model.vendor;
        model.template = last.model.template;
        model.owner = last.model.owner;
        model.image = last.model.image;
        model.desc = last.model.desc;
      }
      this.clearEquipment();
      this.equipment = this.station.createEquipment(model, parent != null ? parent : last != null ? last.parentElement : void 0);
      return this.equipment;
    };

    EquipmentManagerController.prototype.saveEquipment = function(callback) {
      return EquipmentManagerController.__super__.saveEquipment.call(this, (function(_this) {
        return function(err, model) {
          _this.equipment.loadEquipmentTemplate(null, function() {
            return _this.loadProperties(null);
          });
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    EquipmentManagerController.prototype.selectEquipment = function(equipment, callback, refresh) {
      if (!refresh && this.equipment === equipment) {
        return false;
      }
      this.clearEquipment();
      this.loadEquipment(equipment != null ? equipment.model.equipment : void 0, (function(_this) {
        return function(err, model) {
          var type, _ref, _ref1;
          type = _this.project.typeModels.equipmenttypes.getItemByIds({
            type: (_ref = _this.equipment) != null ? _ref.model.type : void 0
          });
          _this.selectEquipmentType(type);
          _this.$location.search('equipment', (_ref1 = _this.equipment) != null ? _ref1.model.equipment : void 0).replace();
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
      return true;
    };

    EquipmentManagerController.prototype.clearEquipment = function() {
      return this.disposePopovers();
    };

    EquipmentManagerController.prototype.parseEquipmentId = function(id) {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      if (id != null) {
        return id;
      }
      if (this.station.model.station === this.$routeParams.station) {
        id = (_ref = this.$routeParams.equipment) != null ? _ref : (_ref1 = this.equipments) != null ? (_ref2 = _ref1[0]) != null ? _ref2.model.equipment : void 0 : void 0;
      } else {
        id = (_ref3 = this.equipments) != null ? (_ref4 = _ref3[0]) != null ? _ref4.model.equipment : void 0 : void 0;
      }
      return id;
    };

    EquipmentManagerController.prototype.loadEquipment = function(equipmentId, callback, refresh) {
      var _ref;
      if (!this.station) {
        return typeof callback === "function" ? callback('null station') : void 0;
      }
      equipmentId = this.parseEquipmentId(equipmentId);
      if (equipmentId == null) {
        return typeof callback === "function" ? callback('null equipment') : void 0;
      }
      return (_ref = this.station) != null ? _ref.loadEquipment(equipmentId, null, (function(_this) {
        return function(err, model) {
          _this.equipment = model;
          if (!model) {
            return typeof callback === "function" ? callback(err, model) : void 0;
          }
          return _this.loadProperties(function() {
            return typeof callback === "function" ? callback(err, model) : void 0;
          }, refresh);
        };
      })(this), refresh) : void 0;
    };

    EquipmentManagerController.prototype.loadProperties = function(callback, refresh) {
      var fields, _ref;
      fields = null;
      return (_ref = this.equipment) != null ? _ref.loadProperties(fields, (function(_this) {
        return function(err, model) {
          _this.properties = model;
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh) : void 0;
    };

    EquipmentManagerController.prototype.loadSignals = function(callback, refresh, equipment) {
      var fields, instances, sgl, signals, _i, _len;
      if (equipment == null) {
        equipment = this.equipment;
      }
      if (!equipment) {
        return callback('null equipment');
      }
      instances = {};
      signals = equipment.model.signals;
      if (signals) {
        for (_i = 0, _len = signals.length; _i < _len; _i++) {
          sgl = signals[_i];
          instances[sgl.id] = sgl.signal;
        }
      }
      equipment.signalInstances = instances;
      fields = null;
      return equipment.loadSignals(fields, (function(_this) {
        return function(err, model) {
          var signal, _j, _len1;
          _this.signals = model;
          if (model) {
            for (_j = 0, _len1 = model.length; _j < _len1; _j++) {
              signal = model[_j];
              _this.initializeSignal(signal, equipment);
            }
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    EquipmentManagerController.prototype.initializeSignal = function(signal, equipment) {
      var instance, _ref, _ref1;
      if (equipment == null) {
        equipment = this.equipment;
      }
      instance = (_ref = equipment.signalInstances[signal.model.signal]) != null ? _ref : {};
      if (instance.name == null) {
        instance.name = signal.model.name;
      }
      if (instance.enable == null) {
        instance.enable = signal.model.enable;
      }
      signal.instance = instance;
      return signal.unit = (_ref1 = this.project.typeModels.signaltypes.getItem(signal.model.unit)) != null ? _ref1.model : void 0;
    };

    EquipmentManagerController.prototype.loadEvents = function(callback, refresh, equipment) {
      var events, evt, fields, instances, _i, _len;
      if (equipment == null) {
        equipment = this.equipment;
      }
      if (!equipment) {
        return callback('null equipment');
      }
      instances = {};
      events = equipment.model.events;
      if (events) {
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          evt = events[_i];
          instances[evt.id] = evt.event;
        }
      }
      equipment.eventInstances = instances;
      fields = null;
      return equipment.loadEvents(fields, (function(_this) {
        return function(err, model) {
          var event, _j, _len1;
          _this.events = model;
          if (model) {
            for (_j = 0, _len1 = model.length; _j < _len1; _j++) {
              event = model[_j];
              _this.initializeEvent(event, equipment);
            }
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    EquipmentManagerController.prototype.initializeEvent = function(event, equipment) {
      var instance, _ref;
      if (equipment == null) {
        equipment = this.equipment;
      }
      instance = (_ref = equipment.eventInstances[event.model.event]) != null ? _ref : {};
      if (instance.name == null) {
        instance.name = event.model.name;
      }
      if (instance.enable == null) {
        instance.enable = event.model.enable;
      }
      return event.instance = instance;
    };

    EquipmentManagerController.prototype.loadCommands = function(callback, refresh, equipment) {
      var cmd, commands, fields, instances, _i, _len;
      if (equipment == null) {
        equipment = this.equipment;
      }
      if (!equipment) {
        return callback('null equipment');
      }
      instances = {};
      commands = equipment.model.commands;
      if (commands) {
        for (_i = 0, _len = commands.length; _i < _len; _i++) {
          cmd = commands[_i];
          instances[cmd.id] = cmd.command;
        }
      }
      equipment.commandInstances = instances;
      fields = null;
      return equipment.loadCommands(fields, (function(_this) {
        return function(err, model) {
          var command, _j, _len1;
          _this.commands = model;
          if (model) {
            for (_j = 0, _len1 = model.length; _j < _len1; _j++) {
              command = model[_j];
              _this.initializeCommand(command, equipment);
            }
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    EquipmentManagerController.prototype.initializeCommand = function(command, equipment) {
      var instance, _ref;
      if (equipment == null) {
        equipment = this.equipment;
      }
      instance = (_ref = equipment.commandInstances[command.model.command]) != null ? _ref : {};
      if (instance.name == null) {
        instance.name = command.model.name;
      }
      if (instance.enable == null) {
        instance.enable = command.model.enable;
      }
      return command.instance = instance;
    };

    EquipmentManagerController.prototype.loadPorts = function(callback, refresh, equipment) {
      var fields, instances, port, ports, _i, _len;
      if (equipment == null) {
        equipment = this.equipment;
      }
      if (!equipment) {
        return callback('null equipment');
      }
      instances = {};
      ports = equipment.model.ports;
      if (ports) {
        for (_i = 0, _len = ports.length; _i < _len; _i++) {
          port = ports[_i];
          instances[port.id] = port;
        }
      }
      equipment.portInstances = instances;
      fields = null;
      return equipment.loadPorts(fields, (function(_this) {
        return function(err, model) {
          var _j, _len1;
          _this.ports = model;
          if (model) {
            for (_j = 0, _len1 = model.length; _j < _len1; _j++) {
              port = model[_j];
              _this.initializePort(port, equipment);
            }
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh);
    };

    EquipmentManagerController.prototype.initializePort = function(port, equipment) {
      var ids, instance, p, properties, type, val, _i, _len, _ref, _ref1, _ref2;
      if (equipment == null) {
        equipment = this.equipment;
      }
      instance = (_ref = equipment.portInstances[port.model.port]) != null ? _ref : {};
      if (instance.name == null) {
        instance.name = port.model.name;
      }
      if (instance.enable == null) {
        instance.enable = port.model.enable;
      }
      ids = {
        user: port.model.user,
        project: port.model.project,
        type: port.model.portType
      };
      type = this.project.typeModels.porttypes.getItemByIds(ids);
      if (type) {
        instance.definition = angular.copy(type.model);
        properties = (_ref1 = instance.port) != null ? _ref1.properties : void 0;
        if (properties && instance.definition.properties) {
          _ref2 = instance.definition.properties;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            p = _ref2[_i];
            val = properties[p.property];
            if (val != null) {
              p.value = val;
            }
          }
        }
      }
      return port.instance = instance;
    };

    EquipmentManagerController.prototype.getPortPropertyValues = function(port) {
      var ids, p, properties, properties0, type, values, values0, _i, _j, _len, _len1, _ref, _ref1;
      properties = (_ref = port.instance.definition) != null ? _ref.properties : void 0;
      if (!properties) {
        return;
      }
      ids = {
        user: port.model.user,
        project: port.model.project,
        type: port.model.portType
      };
      type = this.project.typeModels.porttypes.getItemByIds(ids);
      if (!type) {
        return;
      }
      properties0 = (_ref1 = type.model) != null ? _ref1.properties : void 0;
      if (!properties0) {
        return;
      }
      values0 = {};
      for (_i = 0, _len = properties0.length; _i < _len; _i++) {
        p = properties0[_i];
        values0[p.property] = p.value;
      }
      values = {};
      for (_j = 0, _len1 = properties.length; _j < _len1; _j++) {
        p = properties[_j];
        if (values0[p.property] !== p.value) {
          values[p.property] = p.value;
        }
      }
      return values;
    };

    EquipmentManagerController.prototype.initializeLifeCycle = function(equipment) {
      var createTime, life, periods, productionTime, used;
      if (equipment == null) {
        equipment = this.equipment;
      }
      if (!equipment) {
        return;
      }
      productionTime = equipment.getPropertyValue('production-time', equipment.model.createtime);
      createTime = new Date(productionTime);
      life = equipment.getPropertyValue('life', 36);
      periods = equipment.getPropertyValue('periods');
      periods = periods ? JSON.parse(periods) : [];
      this.lifecycleOptions = {
        createTime: createTime,
        life: life,
        periods: periods
      };
      used = moment().diff(createTime, 'months');
      return this.life = used / life * 100;
    };

    EquipmentManagerController.prototype.saveEventInstance = function(event, callback) {
      var data, events, evt, id, instance, model, _i, _len;
      model = event.model;
      instance = event.instance;
      if (instance.name === model.name && instance.enable === model.enable) {
        return;
      }
      events = this.equipment.model.events;
      if (events == null) {
        events = [];
      }
      this.equipment.model.events = events;
      id = model.event;
      data = null;
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        evt = events[_i];
        if (evt.id === id) {
          data = evt;
          break;
        }
      }
      if (data) {
        if (data.event == null) {
          data.event = {};
        }
        if (instance.name !== model.name) {
          data.event.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.event.enable = instance.enable;
        }
      } else {
        data = {
          id: id,
          event: {}
        };
        if (instance.name !== model.name) {
          data.event.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.event.enable = instance.enable;
        }
        events.push(data);
      }
      return this.saveEquipment(callback);
    };

    EquipmentManagerController.prototype.saveCommandInstance = function(command, callback) {
      var commands, data, evt, id, instance, model, _i, _len;
      model = command.model;
      instance = command.instance;
      if (instance.name === model.name && instance.enable === model.enable) {
        return;
      }
      commands = this.equipment.model.commands;
      if (commands == null) {
        commands = [];
      }
      this.equipment.model.commands = commands;
      id = model.command;
      data = null;
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        evt = commands[_i];
        if (evt.id === id) {
          data = evt;
          break;
        }
      }
      if (data) {
        if (data.command == null) {
          data.command = {};
        }
        if (instance.name !== model.name) {
          data.command.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.command.enable = instance.enable;
        }
      } else {
        data = {
          id: id,
          command: {}
        };
        if (instance.name !== model.name) {
          data.command.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.command.enable = instance.enable;
        }
        commands.push(data);
      }
      return this.saveEquipment(callback);
    };

    EquipmentManagerController.prototype.saveSignalInstance = function(signal, callback) {
      var data, evt, id, instance, model, signals, _i, _len;
      model = signal.model;
      instance = signal.instance;
      signals = this.equipment.model.signals;
      if (signals == null) {
        signals = [];
      }
      this.equipment.model.signals = signals;
      id = model.signal;
      data = null;
      for (_i = 0, _len = signals.length; _i < _len; _i++) {
        evt = signals[_i];
        if (evt.id === id) {
          data = evt;
          break;
        }
      }
      if (data) {
        if (data.signal == null) {
          data.signal = {};
        }
        if (instance.name !== model.name) {
          data.signal.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.signal.enable = instance.enable;
        }
      } else {
        data = {
          id: id,
          signal: {}
        };
        if (instance.name !== model.name) {
          data.signal.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.signal.enable = instance.enable;
        }
        signals.push(data);
      }
      return this.saveEquipment(callback);
    };

    EquipmentManagerController.prototype.savePortInstance = function(port, callback) {
      var data, evt, id, instance, model, ports, _i, _len;
      model = port.model;
      instance = port.instance;
      if (instance.name === model.name && instance.enable === model.enable) {
        return;
      }
      ports = this.equipment.model.ports;
      if (ports == null) {
        ports = [];
      }
      this.equipment.model.ports = ports;
      id = model.port;
      data = null;
      for (_i = 0, _len = ports.length; _i < _len; _i++) {
        evt = ports[_i];
        if (evt.id === id) {
          data = evt;
          break;
        }
      }
      if (data) {
        if (data.port == null) {
          data.port = {};
        }
        if (instance.name !== model.name) {
          data.port.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.port.enable = instance.enable;
        }
      } else {
        data = {
          id: id,
          port: {}
        };
        if (instance.name !== model.name) {
          data.port.name = instance.name;
        }
        if (instance.enable !== model.enable) {
          data.port.enable = instance.enable;
        }
        ports.push(data);
      }
      return this.saveEquipment(callback);
    };

    EquipmentManagerController.prototype.selectEquipmentByIds = function(ids) {
      var equipment, model, _ref;
      model = (_ref = this.equipment.model) != null ? _ref : {};
      if (model.station === ids.station && model.equipment === ids.equipment) {
        return;
      }
      if (ids.user == null) {
        ids.user = this.$routeParams.user;
      }
      if (ids.project == null) {
        ids.project = this.$routeParams.project;
      }
      this.$routeParams.station = ids.station;
      this.$routeParams.equipment = ids.equipment;
      if (model.station === ids.station) {
        equipment = this.station.equipments.getItemByIds(ids);
        return this.selectEquipment(equipment);
      } else {
        this.initializeStations();
        if (this.station) {
          return this.loadEquipments((function(_this) {
            return function() {
              equipment = _this.station.equipments.getItemByIds(ids);
              return _this.selectEquipment(equipment);
            };
          })(this));
        }
      }
    };

    EquipmentManagerController.prototype.refreshEquipment = function(equipment) {
      if (equipment == null) {
        equipment = this.equipment;
      }
      return this.selectEquipment(equipment, null, true);
    };

    EquipmentManagerController.prototype.selectPrevious = function() {
      var index;
      if (!this.equipments.length) {
        return;
      }
      index = this.equipments.indexOf(this.equipment) + 1;
      if (index >= this.equipments.length) {
        return;
      }
      return this.selectEquipment(this.equipments[index]);
    };

    EquipmentManagerController.prototype.selectNext = function() {
      var index;
      if (!this.equipments.length) {
        return;
      }
      index = this.equipments.indexOf(this.equipment) - 1;
      if (index < 0) {
        return;
      }
      return this.selectEquipment(this.equipments[index]);
    };

    EquipmentManagerController.prototype.filterProperties = function(filter, isNot) {
      var p, properties, _i, _len, _results;
      if (isNot == null) {
        isNot = false;
      }
      properties = _.filter(this.properties, function(p) {
        if (isNot) {
          return !(~p.model.property.indexOf(filter));
        } else {
          return ~p.model.property.indexOf(filter);
        }
      });
      this.properties = {};
      _results = [];
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        p = properties[_i];
        _results.push(this.properties[p.model.property] = p);
      }
      return _results;
    };

    EquipmentManagerController.prototype.filterEvents = function(events, filter) {
      var e, es, _i, _len, _results;
      es = _.filter(events, function(e) {
        return ~e.key.indexOf(filter);
      });
      events = {};
      _results = [];
      for (_i = 0, _len = es.length; _i < _len; _i++) {
        e = es[_i];
        _results.push(events[e.model.event] = e);
      }
      return _results;
    };

    return EquipmentManagerController;

  })(base.GraphicBaseController);
  return exports = {
    EquipmentManagerController: EquipmentManagerController
  };
});
