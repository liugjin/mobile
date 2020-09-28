
/*
* File: GraphicBaseController
* User: Dow
* Date: 04/09/2016
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./feature-base-controller'], function(base) {
  var GraphicBaseController, exports;
  GraphicBaseController = (function(_super) {
    __extends(GraphicBaseController, _super);

    function GraphicBaseController($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) {
      GraphicBaseController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options);
      this.initializeGraphicOptions();
      this.initializeEvents();
      this.initializeView();
    }

    GraphicBaseController.prototype.initializeGraphicOptions = function() {
      var _ref, _ref1;
      return this.graphicOptions = {
        engineOptions: {
          parameters: this.$routeParams
        },
        renderOptions: {
          editable: false,
          type: (_ref = (_ref1 = this.$routeParams.renderer) != null ? _ref1 : this.$rootScope.renderType) != null ? _ref : 'snapsvg',
          uploadUrl: this.options.uploadUrl
        }
      };
    };

    GraphicBaseController.prototype.initializeView = function() {
      this.placeholder = $('#element-placeholder');
      this.placeholder.draggable();
      this.placeholderSize = {
        width: this.placeholder.width(),
        height: this.placeholder.height(),
        width2: this.placeholder.width() / 2,
        height2: this.placeholder.height() / 2
      };
      this.popover = $('#element-placeholder-popover');
      return this.viewerPosition = $('#player').offset();
    };

    GraphicBaseController.prototype.movePlaceholderByEvent = function(evt) {
      var mode, offset;
      mode = this.template.getPropertyValue('placeholder-mode');
      if (mode === 'dynamic' || mode === 'element') {
        offset = {
          left: evt.pageX,
          top: evt.pageY
        };
        this.placeholder.offset(offset);
      }
    };

    GraphicBaseController.prototype.showPopover = function(evt) {
      var offset;
      if (this.placeholder == null) {
        this.placeholder = $('#element-placeholder');
      }
      offset = {
        left: evt.pageX,
        top: evt.pageY
      };
      this.placeholder.offset(offset);
      this.placeholder.webuiPopover('show');
      this.popoverState = true;
    };

    GraphicBaseController.prototype.togglePopover = function(evt) {
      if (this.placeholder == null) {
        this.placeholder = $('#element-placeholder');
      }
      this.popoverState = !this.popoverState;
      if (this.popoverState) {
        this.placeholder.webuiPopover('show');
      } else {
        this.placeholder.webuiPopover('hide');
      }
    };

    GraphicBaseController.prototype.onElementChanged = function() {
      return function(err, d) {
        if (err) {
          return console.log(err);
        }
      };
    };

    GraphicBaseController.prototype.onTemplateLoad = function() {
      return (function(_this) {
        return function(err, template) {
          if (err) {
            console.log(err);
          }
          if (!template) {
            return;
          }
          _this.element = _this.template = template;
          console.log("" + (new Date().toISOString()) + " load template " + template.id);
          _this.templateParameters = null;
          _this.initializePlaceholder();
          return template.subscribe(function(d) {
            var element, mode;
            element = d.element;
            mode = template.getPropertyValue('placeholder-mode');
            if (mode === 'element' && (element != null ? element.getPropertyValue('tooltip') : void 0)) {
              _this.movePlaceholderToElement(element);
            }
            _this.element = element != null ? element : template;
            return _this.applyChange();
          }, 'select', 100);
        };
      })(this);
    };

    GraphicBaseController.prototype.initializePlaceholder = function() {
      var template, updatePlaceholder;
      template = this.template;
      updatePlaceholder = (function(_this) {
        return function() {
          var css, height, image, mode, width, x, y;
          image = template.getPropertyValue('placeholder-image');
          x = template.getPropertyValue('placeholder-x', 50);
          y = template.getPropertyValue('placeholder-y', 50);
          width = template.getPropertyValue('placeholder-width', 20);
          height = template.getPropertyValue('placeholder-height', 20);
          _this.placeholderMode = mode = template.getPropertyValue('placeholder-mode', 'dynamic');
          _this.timelineEnable = template.getPropertyValue('timeline-enable', false);
          css = {
            left: x,
            top: y,
            width: width,
            height: height
          };
          css['background-image'] = image ? "url(" + _this.setting.urls.uploadUrl + "/" + image + ")" : "url(/visualization/res/img/popover.gif)";
          _this.placeholder.css(css);
          if (mode === 'none') {
            _this.placeholder.hide();
          } else if (mode === 'dynamic' || mode === 'element') {
            _this.placeholder.draggable('enable');
            _this.placeholder.show();
          } else {
            _this.placeholder.draggable('disable');
            _this.placeholder.show();
          }
          return _this.placeholderSize = {
            x: x,
            y: y,
            width: width,
            height: height,
            width2: width / 2,
            height2: height / 2
          };
        };
      })(this);
      template.subscribePropertiesValue(['placeholder-image', 'placeholder-x', 'placeholder-y', 'placeholder-width', 'placeholder-height', 'placeholder-mode'], function(d) {
        return updatePlaceholder();
      }, 100);
      return updatePlaceholder();
    };

    GraphicBaseController.prototype.exportImage = function() {
      return this.player.exportImage();
    };

    GraphicBaseController.prototype.stretch = function() {
      var _ref, _ref1;
      return (_ref = this.player.renderer) != null ? (_ref1 = _ref.transformControl) != null ? _ref1.stretch() : void 0 : void 0;
    };

    GraphicBaseController.prototype.zoom = function(scale) {
      var _ref, _ref1;
      return (_ref = this.player.renderer) != null ? (_ref1 = _ref.transformControl) != null ? _ref1.zoom(scale) : void 0 : void 0;
    };

    GraphicBaseController.prototype.reset = function() {
      var _ref, _ref1;
      return (_ref = this.player.renderer) != null ? (_ref1 = _ref.transformControl) != null ? _ref1.reset() : void 0 : void 0;
    };

    GraphicBaseController.prototype.pan = function(dx, dy) {
      var _ref, _ref1;
      return (_ref = this.player.renderer) != null ? (_ref1 = _ref.transformControl) != null ? _ref1.pan(dx, dy) : void 0 : void 0;
    };

    GraphicBaseController.prototype.getPropertyValue = function(elementId, propertyId, defaultValue) {
      var element, value;
      if (!this.template) {
        return null;
      }
      element = this.template.getElement(elementId, true);
      if (!element) {
        return defaultValue;
      }
      value = element.getPropertyValue(propertyId, defaultValue);
      return value;
    };

    GraphicBaseController.prototype.setPropertyValue = function(elementId, propertyId, value) {
      var element;
      if (!this.template) {
        return;
      }
      element = this.template.getElement(elementId, true);
      if (!element) {
        return;
      }
      return element.setPropertyValue(propertyId, value);
    };

    GraphicBaseController.prototype.initializeEvents = function() {
      var div, onKeyDown;
      onKeyDown = (function(_this) {
        return function(event) {
          if (document.activeElement !== document.body) {
            return;
          }
          if (!event.shiftKey) {
            return;
          }
          switch (event.keyCode) {
            case 87:
              _this.fullscreen(".graphic-viewer");
              break;
            case 80:
              _this.exportImage();
              break;
            case 69:
              _this.goto("/graphic-templates/" + _this.current.user + "/" + _this.current.project + "/" + _this.current.template + "/edit");
              break;
            case 73:
              _this.openParameters();
              $('#parameters-modal').modal('open');
              _this.applyChange();
          }
        };
      })(this);
      div = document.body;
      div.addEventListener('keydown', onKeyDown);
      return this.addHandler((function(_this) {
        return function() {
          return div.removeEventListener('keydown', onKeyDown);
        };
      })(this));
    };

    GraphicBaseController.prototype.openParameters = function() {
      var p, ps, _i, _len;
      if (!this.template) {
        return;
      }
      ps = this.template.getParameters();
      for (_i = 0, _len = ps.length; _i < _len; _i++) {
        p = ps[_i];
        p.value2 = p.getValue();
      }
      return this.templateParameters = ps;
    };

    GraphicBaseController.prototype.setParameters = function() {
      var p, parameters, _i, _len, _ref;
      if (!this.templateParameters) {
        return;
      }
      parameters = {};
      _ref = this.templateParameters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        parameters[p.id] = p.value2;
      }
      return this.parameters = parameters;
    };

    GraphicBaseController.prototype.getSignal = function(ids) {
      var signal, topic;
      if (!ids || !this.player) {
        return;
      }
      if (typeof ids !== 'string') {
        ids = "" + ids.station + "/" + ids.equipment + "/" + ids.signal;
      }
      topic = "signal-values/" + this.$routeParams.user + "/" + this.$routeParams.project + "/" + ids;
      signal = this.player.signalLiveSession.getItem(topic);
      return signal != null ? signal.message : void 0;
    };

    GraphicBaseController.prototype.subscribeSignalValues = function(ids, callback) {
      var topic;
      if (!ids || !this.player) {
        return;
      }
      if (typeof ids === 'string') {
        topic = "signal-values/" + this.$routeParams.user + "/" + this.$routeParams.project + "/" + ids;
        return this.player.signalLiveSession.subscribe(topic, callback);
      } else {
        ids.user = this.$routeParams.user;
        ids.project = this.$routeParams.project;
        return this.player.signalLiveSession.subscribeValues(ids, callback);
      }
    };

    GraphicBaseController.prototype.getSignalColor = function(signal, rangeColors) {
      var color, colors, d, ds, ex, value, vc, _i, _j, _len, _len1, _ref;
      if (!rangeColors) {
        return;
      }
      if (typeof signal === 'string') {
        signal = this.getSignal(signal);
      }
      if (!signal) {
        return;
      }
      if (this.colors == null) {
        this.colors = {};
      }
      colors = this.colors[rangeColors];
      if (!colors) {
        this.colors[rangeColors] = colors = [];
        try {
          ds = rangeColors.split(',');
          for (_i = 0, _len = ds.length; _i < _len; _i++) {
            d = ds[_i];
            vc = d.split(':');
            colors.push({
              value: parseFloat(vc[0]),
              color: vc[1].trim()
            });
          }
        } catch (_error) {
          ex = _error;
          console.log(ex);
        }
      }
      value = signal.value;
      for (_j = 0, _len1 = colors.length; _j < _len1; _j++) {
        color = colors[_j];
        if (value <= color.value) {
          return color.color;
        }
      }
      if (value != null) {
        return color != null ? color.color : void 0;
      } else {
        return (_ref = colors[0]) != null ? _ref.color : void 0;
      }
    };

    GraphicBaseController.prototype.subscribeOnTooltip = function(tooltipKey, singalIds, callback) {
      var _ref;
      if (this.tooltipKey === tooltipKey) {
        return;
      }
      this.tooltipKey = tooltipKey;
      if ((_ref = this.tooltipHandle) != null) {
        _ref.dispose();
      }
      return this.tooltipHandle = this.subscribeSignalValues(singalIds, callback);
    };

    GraphicBaseController.prototype.inspect = function(looping) {
      return this.player.inspect((function(_this) {
        return function(type, element) {
          return _this.showPopoverToElement(type, element);
        };
      })(this), looping);
    };

    GraphicBaseController.prototype.pauseInspecting = function() {
      return this.player.pauseInspecting();
    };

    GraphicBaseController.prototype.stopInspecting = function() {
      return this.player.stopInspecting();
    };

    GraphicBaseController.prototype.showPopoverToElement = function(type, element) {
      var x, y;
      if (type === 'end') {
        x = this.viewerPosition.left + this.placeholderSize.width;
        y = this.viewerPosition.top + this.placeholderSize.height;
        this.placeholder.offset;
        ({
          left: x,
          top: y
        });
        return this.popover.webuiPopover('hide');
      } else {
        return this.movePlaceholderToElement(element);
      }
    };

    GraphicBaseController.prototype.movePlaceholderToElement = function(element) {
      var box, x, y;
      if (!element) {
        return;
      }
      box = element._geometry.node.getBoundingClientRect();
      x = box.left + box.width / 2 - this.placeholderSize.width / 2;
      y = box.top + box.height / 2 - this.placeholderSize.height / 2;
      this.placeholder.offset({
        left: x,
        top: y
      });
    };

    return GraphicBaseController;

  })(base.FeatureBaseController);
  return exports = {
    GraphicBaseController: GraphicBaseController
  };
});
