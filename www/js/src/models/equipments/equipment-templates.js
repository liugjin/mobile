
/*
* File: project
* User: Dow
* Date: 8/14/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./items-model', './equipment-template'], function(base, cm) {
  var EquipmentTemplates, exports;
  EquipmentTemplates = (function(_super) {
    __extends(EquipmentTemplates, _super);

    function EquipmentTemplates(parent, options) {
      var _base, _base1;
      EquipmentTemplates.__super__.constructor.call(this, parent, options);
      if ((_base = this.options).id == null) {
        _base.id = 'equipmenttemplates';
      }
      if ((_base1 = this.options).keys == null) {
        _base1.keys = ['user', 'project', 'type', 'template'];
      }
    }

    EquipmentTemplates.prototype.createItem = function(model) {
      var item;
      return item = new cm.EquipmentTemplate(this, model);
    };

    EquipmentTemplates.prototype.loadEquipmentTemplate = function(filter, fields, callback, refresh) {
      var template;
      if (!refresh) {
        template = this.getItemByIds(filter);
        if (template) {
          return typeof callback === "function" ? callback(null, template) : void 0;
        }
      }
      return this.load(filter, fields, (function(_this) {
        return function(err, templates) {
          var baseFilter, template2, type2, _ref;
          template = templates != null ? templates[0] : void 0;
          if (!template || template.base || !template.model.base) {
            return typeof callback === "function" ? callback(err, template) : void 0;
          }
          _ref = template.model.base.split('.'), type2 = _ref[0], template2 = _ref[1];
          baseFilter = {
            user: filter.user,
            project: filter.project,
            type: type2,
            template: template2
          };
          base = _this.getItemByIds(baseFilter);
          template.base = base;
          if (base) {
            return typeof callback === "function" ? callback(null, template) : void 0;
          }
          return _this.loadEquipmentTemplate(baseFilter, fields, function(err, base) {
            template.base = base;
            return typeof callback === "function" ? callback(err, template) : void 0;
          }, refresh);
        };
      })(this), refresh);
    };

    return EquipmentTemplates;

  })(base.ItemsModel);
  return exports = {
    EquipmentTemplates: EquipmentTemplates
  };
});
