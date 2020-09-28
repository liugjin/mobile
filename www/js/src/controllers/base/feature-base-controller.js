
/*
* File: feature-base-controller
* User: Dow
* Date: 12/6/2015
* Desc:
 */
var iced, __iced_k, __iced_k_noop,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

iced = {
  Deferrals: (function() {
    function _Class(_arg) {
      this.continuation = _arg;
      this.count = 1;
      this.ret = null;
    }

    _Class.prototype._fulfill = function() {
      if (!--this.count) {
        return this.continuation(this.ret);
      }
    };

    _Class.prototype.defer = function(defer_params) {
      ++this.count;
      return (function(_this) {
        return function() {
          var inner_params, _ref;
          inner_params = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (defer_params != null) {
            if ((_ref = defer_params.assign_fn) != null) {
              _ref.apply(null, inner_params);
            }
          }
          return _this._fulfill();
        };
      })(this);
    };

    return _Class;

  })(),
  findDeferral: function() {
    return null;
  },
  trampoline: function(_fn) {
    return _fn();
  }
};
__iced_k = __iced_k_noop = function() {};

if (typeof define !== 'function') { var define = require('amdefine')(module) };

define(['./live-controller', 'underscore'], function(base, _) {
  var FeatureBaseController, exports;
  FeatureBaseController = (function(_super) {
    __extends(FeatureBaseController, _super);

    function FeatureBaseController($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) {
      FeatureBaseController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.predicate = 'model.index';
      this.reverse = false;
    }

    FeatureBaseController.prototype.getRandomInt = function(min, max) {
      if (min == null) {
        min = 0;
      }
      if (max == null) {
        max = 100;
      }
      return Math.floor(Math.random() * (max - min)) + min;
    };

    FeatureBaseController.prototype.setTimeout = function(callback, period) {
      var timer;
      timer = this.$timeout((function(_this) {
        return function() {
          return callback();
        };
      })(this), period);
      return this.addHandler((function(_this) {
        return function() {
          return _this.$timeout.cancel(timer);
        };
      })(this));
    };

    FeatureBaseController.prototype.setInterval = function(callback, period) {
      var timer;
      timer = this.$interval((function(_this) {
        return function() {
          return callback();
        };
      })(this), period);
      return this.addHandler((function(_this) {
        return function() {
          return _this.$interval.cancel(timer);
        };
      })(this));
    };

    FeatureBaseController.prototype.load = function(callback, refresh) {
      return this.loadProject((function(_this) {
        return function(err, project) {
          if (err) {
            _this.display(err);
            if (typeof callback === "function") {
              callback(err, project);
            }
            return;
          }
          return _this.loadStations(function(err, stations) {
            _this.initializeStations();
            return typeof callback === "function" ? callback(err, stations) : void 0;
          }, true);
        };
      })(this), refresh);
    };

    FeatureBaseController.prototype.loadStations = function(callback, refresh) {
      var fields;
      fields = null;
      return this.project.loadStations(fields, (function(_this) {
        return function(err, stations) {
          return typeof callback === "function" ? callback(err, stations) : void 0;
        };
      })(this), refresh);
    };

    FeatureBaseController.prototype.initializeStations = function() {
      var ids, station, _ref;
      this.datacenters = this.project.stations.roots;
      ids = {
        user: this.$routeParams.user,
        project: this.$routeParams.project,
        station: this.$routeParams.station
      };
      station = this.project.stations.getItemByIds(ids);
      if (station == null) {
        station = this.project.stations.items[0];
      }
      this.datacenter = (_ref = station != null ? station.root : void 0) != null ? _ref : this.datacenters[0];
      return this.selectStation(station);
    };

    FeatureBaseController.prototype.loadUsers = function() {
      return this.users = this.project.model.starUsers;
    };

    FeatureBaseController.prototype.loadEquipmentTemplates = function(callback, refresh) {
      var fields, _ref;
      fields = 'user project type vendor template name base index image';
      return (_ref = this.project) != null ? _ref.loadEquipmentTemplates({}, fields, (function(_this) {
        return function(err, model) {
          _this.equipmentTemplates = model;
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh) : void 0;
    };

    FeatureBaseController.prototype.filterEquipmentTemplate = function() {
      return (function(_this) {
        return function(template) {
          var model;
          if (!_this.equipment) {
            return false;
          }
          model = _this.equipment.model;
          return template.model.type === model.type && template.model.vendor === model.vendor;
        };
      })(this);
    };

    FeatureBaseController.prototype.loadEquipment = function(equipmentId, callback, refresh) {
      var _ref;
      if (equipmentId == null) {
        return typeof callback === "function" ? callback('null equipment') : void 0;
      }
      return (_ref = this.station) != null ? _ref.loadEquipment(equipmentId, null, (function(_this) {
        return function(err, model) {
          _this.equipment = model;
          if (err || !model) {
            return typeof callback === "function" ? callback(err, model) : void 0;
          }
          return _this.loadProperties(function(err, ps) {
            return typeof callback === "function" ? callback(err, _this.equipment) : void 0;
          }, refresh);
        };
      })(this), refresh) : void 0;
    };

    FeatureBaseController.prototype.loadProperties = function(callback, refresh) {
      var fields, _ref;
      fields = null;
      return (_ref = this.equipment) != null ? _ref.loadProperties(fields, (function(_this) {
        return function(err, model) {
          _this.properties = model;
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this), refresh) : void 0;
    };

    FeatureBaseController.prototype.createStation = function(parent) {
      return this.station = this.project.createStation(parent);
    };

    FeatureBaseController.prototype.selectDatacenter = function(datacenter) {
      if (this.datacenter === datacenter) {
        return false;
      }
      this.datacenter = datacenter;
      this.selectStation(datacenter);
      return true;
    };

    FeatureBaseController.prototype.selectStation = function(station) {
      if (!station || this.station === station) {
        return false;
      }
      this.station = station;
      this.$location.search('station', station != null ? station.model.station : void 0).replace();
      this.publishEventBus('select-station', station);
      return true;
    };

    FeatureBaseController.prototype.selectEquipmentType = function(type) {
      if (this.equipmentType && this.equipmentType === type) {
        return false;
      }
      this.equipmentType = type;
      return true;
    };

    FeatureBaseController.prototype.filterEquipmentByType = function() {
      return (function(_this) {
        return function(item) {
          if (!_this.equipmentType) {
            return true;
          }
          return item.model.type === _this.equipmentType.model.type;
        };
      })(this);
    };

    FeatureBaseController.prototype.selectEquipment = function(equipment) {
      var type;
      if (this.equipment && this.equipment === equipment) {
        return false;
      }
      this.equipment = equipment;
      type = this.project.typeModels.equipmenttypes.getItemByIds({
        type: equipment.model.type
      });
      this.selectEquipmentType(type);
      this.$location.search('equipment', equipment != null ? equipment.model.equipment : void 0).replace();
      return true;
    };

    FeatureBaseController.prototype.saveProject = function(callback) {
      return this.project.save(callback);
    };

    FeatureBaseController.prototype.saveStation = function(callback) {
      return this.station.save(callback);
    };

    FeatureBaseController.prototype.removeStation = function(callback) {
      var message, title;
      title = "删除机房确认: " + this.datacenter.model.name + "/" + this.station.model.name;
      message = "请确认是否删除机房: " + this.datacenter.model.name + "/" + this.station.model.name + "？删除后机房包括下属机房和设备将从系统中移除不可恢复！";
      return this.prompt(title, message, (function(_this) {
        return function(ok) {
          if (!ok) {
            return;
          }
          return _this.station.remove(function(err, model) {
            _this.selectStation(_this.datacenter);
            $('#station-modal').modal('close');
            return typeof callback === "function" ? callback(err, model) : void 0;
          });
        };
      })(this));
    };

    FeatureBaseController.prototype.saveEquipment = function(callback, equipment) {
      if (equipment == null) {
        equipment = this.equipment;
      }
      return equipment.save((function(_this) {
        return function(err, model) {
          if (!err && (model != null ? model.equipment : void 0)) {
            _this.$location.search('equipment', model.equipment).replace();
            _this.$rootScope.reloadEquipment = true;
          }
          return typeof callback === "function" ? callback(err, model) : void 0;
        };
      })(this));
    };

    FeatureBaseController.prototype.removeEquipment = function(callback) {
      var message, title;
      title = "删除设备确认: " + this.datacenter.model.name + "/" + this.station.model.name + "/" + this.equipment.model.name;
      message = "请确认是否删除设备: " + this.datacenter.model.name + "/" + this.station.model.name + "/" + this.equipment.model.name + "？删除后设备和数据将从系统中移除不可恢复！";
      return this.prompt(title, message, (function(_this) {
        return function(ok) {
          if (!ok) {
            return;
          }
          return _this.equipment.remove(function(err, model) {
            _this.selectEquipment(_this.station.getFirstEquipmentByType(_this.equipment.model.type));
            _this.$rootScope.reloadEquipment = true;
            $('#equipment-modal').modal('close');
            return typeof callback === "function" ? callback(err, model) : void 0;
          });
        };
      })(this));
    };

    FeatureBaseController.prototype.getNextName = function(name, defaultName) {
      var name2;
      if (!name) {
        return defaultName;
      }
      return name2 = name.replace(/(\d*$)/, function(m, p1) {
        var num;
        return num = p1 ? parseInt(p1) + 1 : '-0';
      });
    };

    FeatureBaseController.prototype.confirmActiveEvent2 = function(event, comment, forceToEnd) {
      var data;
      data = {
        _id: event._id,
        user: event.user,
        project: event.project,
        station: event.station,
        equipment: event.equipment,
        event: event.event
      };
      this.confirmData(data, comment, forceToEnd);
      if (forceToEnd) {
        return this.eventLiveSession.forceEndEvent(data);
      } else {
        return this.eventLiveSession.confirmEvent(data);
      }
    };

    FeatureBaseController.prototype.confirmData = function(data, comment, forceToEnd) {
      data.operator = this.$rootScope.user.user;
      data.operatorName = this.$rootScope.user.name;
      data.confirmTime = new Date;
      data.comment = comment;
      data.forceToEnd = forceToEnd;
      return data;
    };

    FeatureBaseController.prototype.confirmActiveEvents2 = function(comment, forceToEnd) {
      var data;
      data = {
        user: this.project.model.user,
        project: this.project.model.project
      };
      this.confirmData(data, comment, forceToEnd);
      return this.eventLiveSession.confirmAllEvents(data);
    };

    FeatureBaseController.prototype.confirmEquipmentEvent2 = function(event, comment, forceToEnd) {
      var data;
      data = event.getIds();
      this.confirmData(data, comment, forceToEnd);
      return this.eventLiveSession.confirmAllEvents(data);
    };

    FeatureBaseController.prototype.confirmEquipmentEvents2 = function(equipment, comment, forceToEnd) {
      var data;
      data = equipment.getIds();
      this.confirmData(data, comment, forceToEnd);
      return this.eventLiveSession.confirmAllEvents(data);
    };

    FeatureBaseController.prototype.confirmStationEvents2 = function(station, comment, forceToEnd) {
      var data;
      data = station.getIds();
      data.stations = station.stationIds;
      this.confirmData(data, comment, forceToEnd);
      return this.eventLiveSession.confirmAllEvents(data);
    };

    FeatureBaseController.prototype.confirmActiveEvents = function(forceToEnd) {
      var action, message, title;
      action = forceToEnd ? "强制结束" : "确认";
      title = "" + action + "所有活动告警";
      message = "请输入备注信息：";
      return this.prompt(title, message, (function(_this) {
        return function(ok, comment) {
          if (!ok) {
            return;
          }
          return _this.confirmActiveEvents2(comment, forceToEnd);
        };
      })(this), true);
    };

    FeatureBaseController.prototype.confirmActiveEvent = function(event, forceToEnd) {
      var action, message, title;
      if (!event) {
        return;
      }
      action = forceToEnd ? "强制结束" : "确认";
      title = "" + action + "活动告警: " + event.stationName + " / " + event.equipmentName + " / " + event.name;
      message = "请输入备注信息：";
      return this.prompt(title, message, (function(_this) {
        return function(ok, comment) {
          if (!ok) {
            return;
          }
          return _this.confirmActiveEvent2(event, comment, forceToEnd);
        };
      })(this), true, event.comment);
    };

    FeatureBaseController.prototype.confirmStationEvents = function(station, forceToEnd) {
      var action, message, title;
      action = forceToEnd ? "强制结束" : "确认";
      title = "" + action + "机房及其子机房下属所有告警: " + station.model.name;
      message = "请输入备注信息：";
      return this.prompt(title, message, (function(_this) {
        return function(ok, comment) {
          if (!ok) {
            return;
          }
          return _this.confirmStationEvents2(station, comment, forceToEnd);
        };
      })(this), true);
    };

    FeatureBaseController.prototype.confirmEquipmentEvents = function(equipment, forceToEnd) {
      var action, message, title;
      action = forceToEnd ? "强制结束" : "确认";
      title = "" + action + "设备所有告警: " + equipment.station.model.name + " / " + equipment.model.name;
      message = "请输入备注信息：";
      return this.prompt(title, message, (function(_this) {
        return function(ok, comment) {
          if (!ok) {
            return;
          }
          return _this.confirmEquipmentEvents2(equipment, comment, forceToEnd);
        };
      })(this), true);
    };

    FeatureBaseController.prototype.confirmEquipmentEvent = function(event, forceToEnd) {
      var action, message, title;
      if (!event) {
        return;
      }
      action = forceToEnd ? "强制结束" : "确认";
      title = "" + action + "设备告警: " + event.station.model.name + " / " + event.equipment.model.name + " / " + event.model.name;
      message = "请输入备注信息：";
      return this.prompt(title, message, (function(_this) {
        return function(ok, comment) {
          if (!ok) {
            return;
          }
          return _this.confirmEquipmentEvent2(event, comment, forceToEnd);
        };
      })(this), true, event.data.comment);
    };

    FeatureBaseController.prototype.executeCommand2 = function(command, comment) {
      var data, model, parameters;
      model = command.model;
      parameters = command.getParameterValues();
      data = command.getIds();
      data.priority = model.priority;
      data.phase = 'executing';
      data.parameters = parameters;
      data.startTime = new Date;
      data.endTime = null;
      data.result = null;
      data.trigger = 'user';
      data.operator = this.$rootScope.user.user;
      data.operatorName = this.$rootScope.user.name;
      data.comment = comment != null ? comment : model.comment;
      return this.commandLiveSession.executeCommand(data);
    };

    FeatureBaseController.prototype.cancelCommand2 = function(command, comment) {
      var data, k, v, _ref;
      if (!command._data) {
        return;
      }
      data = {};
      _ref = command._data;
      for (k in _ref) {
        v = _ref[k];
        data[k] = v;
      }
      data.phase = 'cancel';
      data.trigger = 'user';
      data.endTime = new Date;
      data.operator = this.$rootScope.user.user;
      data.operatorName = this.$rootScope.user.name;
      data.comment = comment != null ? comment : command.model.comment;
      return this.commandLiveSession.executeCommand(data);
    };

    FeatureBaseController.prototype.executeCommand = function(command, cancelCallback) {
      var message, title;
      if (!command) {
        return;
      }
      title = "确认执行控制命令: " + command.station.model.name + " / " + command.equipment.model.name + " / " + command.model.name;
      message = "请输入备注信息：";
      return this.prompt(title, message, (function(_this) {
        return function(ok, comment) {
          if (!ok) {
            return typeof cancelCallback === "function" ? cancelCallback() : void 0;
          }
          return _this.executeCommand2(command, comment);
        };
      })(this), true, command.model.comment);
    };

    FeatureBaseController.prototype.cancelCommand = function(command, cancelCallback) {
      var message, title;
      if (!command) {
        return;
      }
      title = "确认取消控制命令: " + command.station.model.name + " / " + command.equipment.model.name + " / " + command.model.name;
      message = "请输入备注信息：";
      return this.prompt(title, message, (function(_this) {
        return function(ok, comment) {
          if (!ok) {
            return typeof cancelCallback === "function" ? cancelCallback() : void 0;
          }
          return _this.cancelCommand2(command, comment);
        };
      })(this), true, command.model.comment);
    };

    FeatureBaseController.prototype.dispose = function() {
      FeatureBaseController.__super__.dispose.apply(this, arguments);
    };

    FeatureBaseController.prototype.disposePopovers = function() {
      return $('[popover]').each(function() {
        return $(this).webuiPopover('destroy');
      });
    };

    FeatureBaseController.prototype.selectGroup = function(group) {
      return this.group = group;
    };

    FeatureBaseController.prototype.getDBKeyValues = function(key, cb) {
      var err, kvSrv, ___iced_passed_deferral, __iced_deferrals, __iced_k;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      kvSrv = this.modelManager.getService("keyvalues");
      (function(_this) {
        return (function(__iced_k) {
          __iced_deferrals = new iced.Deferrals(__iced_k, {
            parent: ___iced_passed_deferral,
            filename: "E:\\projects\\clc.mobile\\app\\scripts\\ionic\\src\\controllers\\base\\feature-base-controller.coffee",
            funcname: "FeatureBaseController.getDBKeyValues"
          });
          kvSrv.query({
            user: _this.project.model.user,
            project: _this.project.model.project,
            key: key
          }, null, __iced_deferrals.defer({
            assign_fn: (function(__slot_1) {
              return function() {
                err = arguments[0];
                return __slot_1.setting = arguments[1];
              };
            })(_this.$scope),
            lineno: 443
          }));
          __iced_deferrals._fulfill();
        });
      })(this)((function(_this) {
        return function() {
          var _ref;
          return cb((_ref = _this.$scope.setting) != null ? _ref.value : void 0);
        };
      })(this));
    };

    FeatureBaseController.prototype.saveDBKeyValues = function(key, value) {
      var kvSrv;
      kvSrv = this.modelManager.getService("keyvalues");
      if (_.isEmpty(this.$scope.setting)) {
        this.$scope.setting = {
          user: this.project.model.user,
          project: this.project.model.project,
          key: key
        };
      }
      this.$scope.setting.value = value;
      return kvSrv.save(this.$scope.setting, (function(_this) {
        return function(err, model) {
          if (err) {
            return _this.prompt("温馨提示：", err);
          }
        };
      })(this));
    };

    return FeatureBaseController;

  })(base.LiveController);
  return exports = {
    FeatureBaseController: FeatureBaseController
  };
});
