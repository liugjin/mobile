
/*
* File: mobile-equip-list-directive
* User: David
* Date: 2019/07/09
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileEquipListDirective, exports;
  MobileEquipListDirective = (function(_super) {
    __extends(MobileEquipListDirective, _super);

    function MobileEquipListDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-equip-list";
      MobileEquipListDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEquipListDirective.prototype.setScope = function() {};

    MobileEquipListDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEquipListDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEquipListDirective.prototype.show = function(scope, element, attrs) {
      var filter1, filter2, n, station, stations, _i, _len, _ref, _ref1;
      scope.activeFollow = false;
      scope.offlineImg = this.getComponentPath('image/e-offline.png');
      scope.onlineImg = this.getComponentPath('image/e-online.svg');
      scope.normalImg = this.getComponentPath('image/e-normal.png');
      scope.alarmImg = this.getComponentPath('image/e-alarm.png');
      scope.addressImg = this.getComponentPath('image/map.svg');
      scope.followImg = this.getComponentPath('image/follow.svg');
      scope.followFocusImg = this.getComponentPath('image/follow-active.svg');
      scope.noEquipImg = this.getComponentPath('image/no-equip.svg');
      scope.equipTypeLists = [];
      scope.equipments = [];
      scope.status = {};
      scope.alarms = {};
      scope.project.loadEquipmentTemplates(null, null, (function(_this) {
        return function(err, templates) {
          return scope.templates = templates;
        };
      })(this));
      scope.selectEquipType = (function(_this) {
        return function(type) {
          if (!type) {
            return;
          }
          scope.currentType = type;
          return _this.selectType(scope, type, null, true);
        };
      })(this);
      scope.selectEquipment = (function(_this) {
        return function(equipment) {
          return equipment != null ? equipment.loadEquipmentTemplate(null, function(err, template) {
            var templateId;
            templateId = equipment.getTemplateValue('directive');
            return _this.publishEventBus("selectEquipment", {
              stationId: equipment.model.station,
              equipmentId: equipment.model.equipment,
              name: equipment.model.name,
              templateId: templateId,
              type: equipment.model.type,
              template: equipment.model.template
            });
          }) : void 0;
        };
      })(this);
      scope.filterEquipment = (function(_this) {
        return function() {
          return function(equipment) {
            var text, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
            if (equipment.model.template === 'card-sender' || equipment.model.template === 'card_template' || equipment.model.template === 'people_template') {
              return false;
            }
            if (scope.activeFollow && !scope.followEquip(equipment)) {
              return false;
            }
            text = (_ref = scope.searchLists) != null ? _ref.toLowerCase() : void 0;
            if (!text) {
              return true;
            }
            if (((_ref1 = equipment.model.equipment) != null ? _ref1.toLowerCase().indexOf(text) : void 0) >= 0) {
              return true;
            }
            if (((_ref2 = equipment.model.name) != null ? _ref2.toLowerCase().indexOf(text) : void 0) >= 0) {
              return true;
            }
            if (((_ref3 = equipment.model.tag) != null ? _ref3.toLowerCase().indexOf(text) : void 0) >= 0) {
              return true;
            }
            if (((_ref4 = equipment.model.typeName) != null ? _ref4.toLowerCase().indexOf(text) : void 0) >= 0) {
              return true;
            }
            if (((_ref5 = equipment.model.stationName) != null ? _ref5.toLowerCase().indexOf(text) : void 0) >= 0) {
              return true;
            }
            if (((_ref6 = equipment.model.vendorName) != null ? _ref6.toLowerCase().indexOf(text) : void 0) >= 0) {
              return true;
            }
            return false;
          };
        };
      })(this);
      scope.imgString = (function(_this) {
        return function(equip) {
          var str, url, _ref;
          str = _.isEmpty(equip.model.image) ? (_ref = _.find(scope.templates, function(item) {
            return item.model.template === equip.model.template;
          })) != null ? _ref.model.image : void 0 : equip.model.image;
          url = "";
          if (str) {
            return url = "url('" + scope.setting.urls.uploadUrl + "/" + str + "')";
          } else {
            return url = "url('" + scope.noEquipImg + "')";
          }
        };
      })(this);
      scope.selectFollow = (function(_this) {
        return function() {
          return scope.activeFollow = !scope.activeFollow;
        };
      })(this);
      scope.haveFollowProperty = (function(_this) {
        return function(equip) {
          var follow;
          follow = _.find(equip.properties.items, function(item) {
            return item.model.property === 'follow';
          });
          if (follow) {
            return true;
          }
          return false;
        };
      })(this);
      scope.followEquip = (function(_this) {
        return function(equip) {
          var follow, followValue;
          follow = _.find(equip.properties.items, function(item) {
            return item.model.property === 'follow';
          });
          if (follow) {
            followValue = {};
            if (follow.value) {
              followValue = JSON.parse(follow.value);
            }
            return followValue[_this.commonService.$rootScope.user.user];
          }
          return false;
        };
      })(this);
      scope.addFollowEquip = (function(_this) {
        return function(equip) {
          _.map(equip.properties.items, function(item) {
            var value;
            if (item.model.property === 'follow') {
              value = {};
              if (item.value) {
                value = JSON.parse(item.value);
              }
              if (value[_this.commonService.$rootScope.user.user]) {
                value[_this.commonService.$rootScope.user.user] = !value[_this.commonService.$rootScope.user.user];
              } else {
                value[_this.commonService.$rootScope.user.user] = true;
              }
              return item.value = JSON.stringify(value);
            }
          });
          return equip.save();
        };
      })(this);
      stations = this.commonService.loadStationChildren(scope.station, true);
      n = 0;
      for (_i = 0, _len = stations.length; _i < _len; _i++) {
        station = stations[_i];
        this.loadStationEquipStatistics(scope, station, (function(_this) {
          return function() {
            n++;
            if (n === stations.length) {
              return scope.selectEquipType(scope.equipTypeLists[0]);
            }
          };
        })(this));
      }
      if ((_ref = scope.statusSubscription) != null) {
        _ref.dispose();
      }
      filter1 = scope.project.getIds();
      filter1.station = "+";
      filter1.equipment = "+";
      filter1.signal = "communication-status";
      scope.statusSubscription = this.commonService.signalLiveSession.subscribeValues(filter1, (function(_this) {
        return function(err, d) {
          return scope.status[d.message.station + "." + d.message.equipment] = d.message.value;
        };
      })(this));
      if ((_ref1 = scope.alarmsSubscription) != null) {
        _ref1.dispose();
      }
      filter2 = scope.project.getIds();
      filter2.station = "+";
      filter2.equipment = "+";
      filter2.signal = "alarms";
      return scope.alarmsSubscription = this.commonService.signalLiveSession.subscribeValues(filter2, (function(_this) {
        return function(err, d) {
          return scope.alarms[d.message.station + "." + d.message.equipment] = d.message.value;
        };
      })(this));
    };

    MobileEquipListDirective.prototype.loadStationEquipStatistics = function(scope, station, callback) {
      return station.loadStatisticByEquipmentTypes((function(_this) {
        return function(err, statistic) {
          var key, val, value;
          value = JSON.parse(JSON.stringify(statistic.statistic));
          for (key in value) {
            val = value[key];
            if (_this.filterType(scope, val)) {
              scope.equipTypeLists.push(val);
            }
          }
          return typeof callback === "function" ? callback() : void 0;
        };
      })(this));
    };

    MobileEquipListDirective.prototype.filterType = function(scope, type) {
      var item, key, _ref;
      item = _.find(scope.project.dictionary.equipmenttypes.items, function(tp) {
        return tp.model.type === type.type;
      });
      type.index = item.model.index;
      if ((item != null ? (_ref = item.model) != null ? _ref.visible : void 0 : void 0) === false) {
        return false;
      }
      if (type.type.substr(0, 1) === "_") {
        return false;
      }
      if (type.count === 0) {
        return false;
      }
      key = _.find(scope.equipTypeLists, function(tp) {
        return tp.type === type.type;
      });
      if (key) {
        return false;
      }
      return true;
    };

    MobileEquipListDirective.prototype.selectType = function(scope, type, callback, refresh) {
      var station, stations, _i, _len, _results;
      scope.equipments = [];
      scope.groups = [];
      scope.station = _.find(scope.project.stations.items, function(item) {
        return item.model.station === scope.station.model.station;
      });
      stations = this.commonService.loadStationChildren(scope.station, true);
      _results = [];
      for (_i = 0, _len = stations.length; _i < _len; _i++) {
        station = stations[_i];
        _results.push(this.commonService.loadEquipmentsByType(station, type.type, (function(_this) {
          return function(err, equips) {
            var equip, _j, _len1;
            for (_j = 0, _len1 = equips.length; _j < _len1; _j++) {
              equip = equips[_j];
              equip.loadProperties();
            }
            scope.equipments = scope.equipments.concat(equips);
            return scope.$applyAsync();
          };
        })(this), refresh));
      }
      return _results;
    };

    MobileEquipListDirective.prototype.resize = function(scope) {};

    MobileEquipListDirective.prototype.dispose = function(scope) {
      var _ref, _ref1;
      if ((_ref = scope.statusSubscription) != null) {
        _ref.dispose();
      }
      return (_ref1 = scope.alarmsSubscription) != null ? _ref1.dispose() : void 0;
    };

    return MobileEquipListDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEquipListDirective: MobileEquipListDirective
  };
});
