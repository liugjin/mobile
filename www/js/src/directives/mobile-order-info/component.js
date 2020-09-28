
/*
* File: mobile-order-info-directive
* User: David
* Date: 2019/08/01
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileOrderInfoDirective, exports;
  MobileOrderInfoDirective = (function(_super) {
    __extends(MobileOrderInfoDirective, _super);

    function MobileOrderInfoDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-order-info";
      MobileOrderInfoDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileOrderInfoDirective.prototype.setScope = function() {};

    MobileOrderInfoDirective.prototype.setCSS = function() {
      return css;
    };

    MobileOrderInfoDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileOrderInfoDirective.prototype.show = function(scope, element, attrs) {
      scope.getMaxValue = function(variable) {
        var ret, values;
        if (!variable) {
          return;
        }
        values = _.values(variable);
        if (values.length > 0) {
          ret = _.max(values);
        }
        if (values.length === 0) {
          ret = "";
        }
        return ret;
      };
      return this.commonService.loadProjectModelByService('tasks', {
        task: scope.parameters.orderId
      }, 'user _id project type process name creator task phase nodes createtime', (function(_this) {
        return function(err, taskModels) {
          var contents, _ref;
          if (err || !taskModels) {
            return;
          }
          contents = [];
          _.map(taskModels.nodes[0].contents, function(content) {
            if (!content.type) {
              return contents.push(content);
            }
          });
          scope.contents = contents;
          scope.content = (_ref = contents[0]) != null ? _ref.content : void 0;
          return scope.task = taskModels;
        };
      })(this));
    };

    MobileOrderInfoDirective.prototype.resize = function(scope) {};

    MobileOrderInfoDirective.prototype.dispose = function(scope) {};

    return MobileOrderInfoDirective;

  })(base.BaseDirective);
  return exports = {
    MobileOrderInfoDirective: MobileOrderInfoDirective
  };
});
