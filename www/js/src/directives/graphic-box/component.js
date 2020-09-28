
/*
* File: graphic-box-directive
* User: David
* Date: 2018/11/16
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var GraphicBoxDirective, exports;
  GraphicBoxDirective = (function(_super) {
    __extends(GraphicBoxDirective, _super);

    function GraphicBoxDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "graphic-box";
      GraphicBoxDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    GraphicBoxDirective.prototype.setScope = function() {
      return {
        templateId: "@",
        templateParameters: '@'
      };
    };

    GraphicBoxDirective.prototype.setCSS = function() {
      return css;
    };

    GraphicBoxDirective.prototype.applyChange = function() {
      return (function(_this) {
        return function() {
          console.log("applyChange", scope);
          return scope.$applyAsync();
        };
      })(this);
    };

    GraphicBoxDirective.prototype.setTemplate = function() {
      return view;
    };

    GraphicBoxDirective.prototype.show = function(scope, element, attrs) {
      var ele, html, initializeGraphicOptions, initializeView;
      initializeView = (function(_this) {
        return function() {
          _this.placeholder = $('#element-placeholder');
          _this.placeholder.draggable();
          _this.placeholderSize = {
            width: _this.placeholder.width(),
            height: _this.placeholder.height(),
            width2: _this.placeholder.width() / 2,
            height2: _this.placeholder.height() / 2
          };
          _this.popover = $('#element-placeholder-popover');
          return _this.viewerPosition = $('#player').offset();
        };
      })(this);
      initializeGraphicOptions = (function(_this) {
        return function() {
          var _ref, _ref1, _ref2, _ref3, _ref4;
          return scope.graphicOptions = {
            engineOptions: {
              parameters: _this.$routeParams
            },
            renderOptions: {
              editable: false,
              type: (_ref = (_ref1 = _this.$routeParams.renderer) != null ? _ref1 : (_ref2 = _this.$rootScope) != null ? _ref2.renderType : void 0) != null ? _ref : 'snapsvg',
              uploadUrl: typeof window !== "undefined" && window !== null ? (_ref3 = window.setting) != null ? (_ref4 = _ref3.urls) != null ? _ref4.uploadUrl : void 0 : void 0 : void 0
            }
          };
        };
      })(this);
      initializeGraphicOptions();
      initializeView();
      html = '<div id="player" ng-dblclick="controller.showPopover($event)">\n    <div graphic-player="graphic-player" options="graphicOptions" template-id="templateId"\n         controller="controller" on-template-load="controller.onTemplateLoad()"\n         on-element-changed="controller.onElementChanged()" parameters="parameters.templateParameters"\n         class="graphic-viewer"></div>\n</div>';
      ele = this.$compile(html)(scope);
      element.find("#graphic").empty();
      element.find("#graphic").append(ele);
      if (typeof scope.watch === "function") {
        scope.watch();
      }
      return scope.watch = scope.$watch("parameters.templateId", (function(_this) {
        return function(templateId) {
          if (!templateId) {
            return;
          }
          scope.templateId = {
            user: _this.$routeParams.user,
            project: _this.$routeParams.project,
            template: scope.parameters.templateId,
            parameters: scope.parameters.templateParameters
          };
          initializeGraphicOptions();
          initializeView();
          ele = _this.$compile(html)(scope);
          element.find("#graphic").empty();
          return element.find("#graphic").append(ele);
        };
      })(this));
    };

    GraphicBoxDirective.prototype.resize = function(scope) {};

    GraphicBoxDirective.prototype.dispose = function(scope) {
      return typeof scope.watch === "function" ? scope.watch() : void 0;
    };

    return GraphicBoxDirective;

  })(base.BaseDirective);
  return exports = {
    GraphicBoxDirective: GraphicBoxDirective
  };
});
