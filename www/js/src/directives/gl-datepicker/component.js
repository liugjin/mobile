
/*
* File: gl-datepicker-directive
* User: David
* Date: 2019/02/21
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment", "gl-datepicker"], function(base, css, view, _, moment, gl) {
  var GlDatepickerDirective, exports;
  GlDatepickerDirective = (function(_super) {
    __extends(GlDatepickerDirective, _super);

    function GlDatepickerDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "gl-datepicker";
      GlDatepickerDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    GlDatepickerDirective.prototype.setScope = function() {};

    GlDatepickerDirective.prototype.setCSS = function() {
      return css;
    };

    GlDatepickerDirective.prototype.setTemplate = function() {
      return view;
    };

    GlDatepickerDirective.prototype.show = function(scope, element, attrs) {
      return this.waitingLayout(this.$timeout, element, function() {
        var datepicker;
        datepicker = element.find(".datepicker");
        if (datepicker.hasClass("datepicker") && datepicker[0].style.width === "") {
          datepicker.css("width", (element.width() - 40) + "px");
        }
        gl = null;
        return scope.$watch('ngModel', function(value) {
          setTimeout(function() {
            var options;
            options = {
              zIndex: 1008,
              dowNames: ["日", "一", "二", "三", "四", "五", "六"],
              monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
              onClick: function(target, cell, date, data) {
                return target.val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()).trigger("change");
              }
            };
            if (value) {
              options.selectedDate = moment(value).toDate();
            }
            return gl = datepicker.glDatePicker(options);
          }, 500);
          if (value) {
            return datepicker.val(moment(value).format("YYYY-MM-DD"));
          }
        });
      });
    };

    GlDatepickerDirective.prototype.resize = function(scope) {};

    GlDatepickerDirective.prototype.dispose = function(scope) {};

    return GlDatepickerDirective;

  })(base.BaseDirective);
  return exports = {
    GlDatepickerDirective: GlDatepickerDirective
  };
});
