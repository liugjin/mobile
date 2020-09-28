
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../view-model', '../items-model', './equipment-templates', './stations', './equipment-types'], function(base, im, etm, sm, et) {
  var Project, exports;
  Project = (function(_super) {
    __extends(Project, _super);

    function Project(parent, model) {
      Project.__super__.constructor.call(this, parent, model);
      this.equipmentTemplates = new etm.EquipmentTemplates(this);
      this.stations = new sm.Stations(this);
      this.equipments = {};
      this.signals = {};
      this.signalTopics = {};
      this.statisticTopics = {};
      this.events = {};
      this.eventTopics = {};
      this.commands = {};
      this.commandTopics = {};
      this.ports = {};
      this.loadModels();
    }

    Project.prototype.loadModels = function() {
      this.dictionary = this.typeModels = {};
      this.createTypeModel('datatypes', 'type');
      this.createTypeModel('stationtypes', 'type');
      this.createTypeModel('signaltypes', 'type');
      this.createTypeModel('eventtypes', 'type');
      this.createTypeModel('eventseverities', 'severity');
      this.createTypeModel('eventphases', 'phase');
      this.createTypeModel('units', 'unit');
      this.createTypeModel('vendors', 'vendor');
      this.createTypeModel('capacities', 'capacity');
      this.createTypeModel('porttypes', 'type');
      return this.createTypeModel('equipmenttypes', 'type', et.EquipmentTypes);
    };

    Project.prototype.getIds = function() {
      var ids;
      return ids = {
        user: this.model.user,
        project: this.model.project
      };
    };

    Project.prototype.createTypeModel = function(id, key, ModelType) {
      var model;
      if (ModelType == null) {
        ModelType = im.ItemsModel;
      }
      model = new ModelType(this, {
        id: id,
        keys: [key]
      });
      this.typeModels[id] = model;
      return model;
    };

    Project.prototype.loadTypeModel = function(type, fields, callback, refresh) {
      var filter, model;
      model = this.typeModels[type];
      if (!model) {
        if (typeof callback === "function") {
          callback("unknown type: " + type);
        }
        return;
      }
      filter = {
        user: this.model.user,
        project: this.model.project
      };
      return model.load(filter, fields, callback, refresh);
    };

    Project.prototype.loadTypeModels = function(callback, refresh) {
      var filter, id, model, _ref;
      filter = {
        user: this.model.user,
        project: this.model.project
      };
      _ref = this.typeModels;
      for (id in _ref) {
        model = _ref[id];
        model.load(filter, null, callback, refresh);
      }
    };

    Project.prototype.getTypeProperty = function(type, key, property) {
      var _ref, _ref1;
      return (_ref = this.typeModels[type]) != null ? (_ref1 = _ref.getItem(key)) != null ? _ref1.model[property] : void 0 : void 0;
    };

    Project.prototype.loadStations = function(fields, callback, refresh) {
      var filter;
      filter = {
        user: this.model.user,
        project: this.model.project
      };
      return this.stations.load(filter, fields, callback, refresh);
    };

    Project.prototype.loadEquipmentTemplates = function(filter, fields, callback, refresh) {
      if (filter == null) {
        filter = {};
      }
      if (filter.user == null) {
        filter.user = this.model.user;
      }
      if (filter.project == null) {
        filter.project = this.model.project;
      }
      return this.equipmentTemplates.load(filter, fields, callback, refresh);
    };

    Project.prototype.loadEquipmentTemplate = function(filter, fields, callback, refresh) {
      if (filter == null) {
        filter = {};
      }
      if (filter.user == null) {
        filter.user = this.model.user;
      }
      if (filter.project == null) {
        filter.project = this.model.project;
      }
      return this.equipmentTemplates.loadEquipmentTemplate(filter, fields, callback, refresh);
    };

    Project.prototype.dispose = function() {
      var id, type, _ref;
      Project.__super__.dispose.apply(this, arguments);
      _ref = this.typeModels;
      for (id in _ref) {
        type = _ref[id];
        type.dispose();
      }
      this.equipmentTemplates.dispose();
      this.stations.dispose();
      this.signals = {};
      this.events = {};
      this.commands = {};
      this.ports = {};
    };

    Project.prototype.addEquipment = function(equipment) {
      return this.equipments[equipment.key] = equipment;
    };

    Project.prototype.getEquipment = function(key) {
      return this.equipments[key];
    };

    Project.prototype.getEquipmentByIds = function(ids) {
      var equipment, station;
      station = this.stations.getItemByIds(ids);
      if (!station) {
        return;
      }
      return equipment = station.equipments.getItemByIds(ids);
    };

    Project.prototype.addSignal = function(signal) {
      var model, topic, topic2;
      model = signal.equipment.model;
      topic = "signal-values/" + model.user + "/" + model.project + "/" + model.station + "/" + model.equipment + "/" + signal.model.signal;
      this.signalTopics[topic] = signal;
      topic2 = "signal-statistics/" + model.user + "/" + model.project + "/" + model.station + "/" + model.equipment + "/" + signal.model.signal;
      this.statisticTopics[topic2] = signal;
      this.signals[signal.key] = signal;
      return signal;
    };

    Project.prototype.getSignal = function(key) {
      return this.signals[key];
    };

    Project.prototype.getSignalByTopic = function(topic) {
      return this.signalTopics[topic];
    };

    Project.prototype.getSignalByStatisticTopic = function(topic) {
      return this.statisticTopics[topic];
    };

    Project.prototype.addEvent = function(event) {
      var model, topic;
      model = event.equipment.model;
      topic = "event-values/" + model.user + "/" + model.project + "/" + model.station + "/" + model.equipment + "/" + event.model.event;
      this.eventTopics[topic] = event;
      this.events[event.key] = event;
      return event;
    };

    Project.prototype.getEvent = function(key) {
      return this.events[key];
    };

    Project.prototype.getEventByTopic = function(topic) {
      return this.eventTopics[topic];
    };

    Project.prototype.addCommand = function(command) {
      var model, topic;
      model = command.equipment.model;
      topic = "command-values/" + model.user + "/" + model.project + "/" + model.station + "/" + model.equipment + "/" + command.model.command;
      this.commandTopics[topic] = command;
      this.commands[command.key] = command;
      return command;
    };

    Project.prototype.getCommand = function(key) {
      return this.commands[key];
    };

    Project.prototype.getCommandByTopic = function(topic) {
      return this.commandTopics[topic];
    };

    Project.prototype.addPort = function(port) {
      return this.ports[port.key] = port;
    };

    Project.prototype.getPort = function(key) {
      return this.ports[key];
    };

    Project.prototype.createStation = function(parentStation) {
      var model;
      model = {
        user: this.model.user,
        project: this.model.project,
        parent: parentStation != null ? parentStation.model.station : void 0
      };
      this.station = this.stations.createItem(model);
      this.station.parentStation = parentStation;
      this.station.root = this;
      return this.station;
    };

    return Project;

  })(base.ViewModel);
  return exports = {
    Project: Project
  };
});
