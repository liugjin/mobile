
/*
* File: mobile-equipproperty-directive
* User: David
* Date: 2018/12/08
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileEquippropertyDirective, exports;
  MobileEquippropertyDirective = (function(_super) {
    __extends(MobileEquippropertyDirective, _super);

    function MobileEquippropertyDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-equipproperty";
      MobileEquippropertyDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEquippropertyDirective.prototype.setScope = function() {};

    MobileEquippropertyDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEquippropertyDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEquippropertyDirective.prototype.show = function(scope, element, attrs) {
      var oldValue;
      scope.setting = setting;
      oldValue = '';
      scope.$watch('equipment', (function(_this) {
        return function(equip) {
          var _ref, _ref1;
          if (!equip) {
            return;
          }
          equip.loadEquipmentTemplate();
          scope.equipment.model.typeName = (_ref = _.find(scope.project.dictionary.equipmenttypes.items, function(type) {
            return type.key === scope.equipment.model.type;
          })) != null ? _ref.model.name : void 0;
          scope.equipment.model.vendorName = (_ref1 = _.find(scope.project.dictionary.vendors.items, function(vendor) {
            return vendor.key === scope.equipment.model.vendor;
          })) != null ? _ref1.model.name : void 0;
          return _this.getProperty(scope, 'life', function() {
            return scope.$applyAsync();
          });
        };
      })(this));
      scope.formatValue = (function(_this) {
        return function(property) {
          var arr, i, val, _i, _len;
          val = '';
          if (property.model.dataType === 'enum') {
            arr = property.model.format.split(',');
            for (_i = 0, _len = arr.length; _i < _len; _i++) {
              i = arr[_i];
              if (i.split(':')[0] === property.value) {
                val = i.split(':')[1];
              }
            }
          } else if (property.model.dataType === 'date') {
            val = moment(property.value).format('YYYY-MM-DD');
          }
          return val;
        };
      })(this);
      scope.saveValue = (function(_this) {
        return function(value) {
          return oldValue = value;
        };
      })(this);
      scope.checkValue = (function(_this) {
        return function(value) {
          if (oldValue === value) {

          } else {
            return scope.saveEquipment();
          }
        };
      })(this);
      scope.saveEquipment = (function(_this) {
        return function() {
          return scope.equipment.save();
        };
      })(this);
      return scope.filterItems = function() {
        return function(item) {
          if (item.model.visible === false) {
            return false;
          }
          if (item.model.dataType === "json") {
            return false;
          }
          return true;
        };
      };
    };

    MobileEquippropertyDirective.prototype.resize = function(scope) {};

    MobileEquippropertyDirective.prototype.dispose = function(scope) {};

    return MobileEquippropertyDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEquippropertyDirective: MobileEquippropertyDirective
  };
});
