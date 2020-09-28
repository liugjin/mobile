
/*
* File: base-directive
* User: David
* Date: 2018-07-10
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['underscore', "materialize-css"], function(_, M) {
  var BaseDirective, exports;
  BaseDirective = (function() {
    function BaseDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.$timeout = $timeout;
      this.$window = $window;
      this.$compile = $compile;
      this.$routeParams = $routeParams;
      this.commonService = commonService;
      this.waitingLayout = __bind(this.waitingLayout, this);
      this.link = __bind(this.link, this);
      this.restrict = "EA";
      this.scope = {
        controller: '=',
        parameters: '='
      };
      this.scope.parameters = _.extend(this.scope.parameters, this.setScope());
      this.template = "<style>" + this.parseCSS(this.setCSS()) + "</style>" + this.setTemplate() + this.defaultTemplate();
      this.templateUrl = this.template ? null : this.setTemplateUrl();
      if (!this.id) {
        this.id = "";
      }
    }

    BaseDirective.prototype.defaultTemplate = function() {
      return "<div id=\"" + this.id + "-prompt-modal\" class=\"modal\" md-modal>\n  <div class=\"modal-content\">\n      <h5> {{modal.title}} </h5>\n      <p> {{modal.message}} </p>\n      <input type='text' ng-model='modal.comment' ng-show='modal.enableComment'/>\n  </div>\n  <div class=\"modal-footer\">\n      <a class=\"modal-action modal-close waves-effect waves-green btn-flat\" ng-click='modal.confirm(false)'> 取消 </a>\n      <a class=\"modal-action modal-close waves-effect waves-green btn red\" ng-click='modal.confirm(true)'> 确认 </a>\n  </div>\n</div>";
    };

    BaseDirective.prototype.parseCSS = function(css) {
      var ret;
      ret = css.replace(/~([^~]+)~/g, (function(_this) {
        return function(str) {
          var path;
          path = str.substr(1, str.length - 2);
          return _this.getComponentPath(path);
        };
      })(this));
      return ret;
    };

    BaseDirective.prototype.checkParams = function(params) {
      var key, value;
      if (!params) {
        return true;
      }
      for (key in params) {
        value = params[key];
        if (value == null) {
          return true;
        }
      }
      return false;
    };

    BaseDirective.prototype.link = function(scope, element, attrs) {
      var resize, win, _ref;
      scope.date = (new Date()).getTime();
      scope.firstload = true;
      scope.setting = setting;
      this.getProject(scope);
      scope.$watch("project", (function(_this) {
        return function(project) {
          if (project == null) {
            return;
          }
          return scope.$watch("parameters", function(params) {
            var _ref;
            if (_this.checkParams(params)) {
              return;
            }
            return _this.getStation(scope, (_ref = params.station) != null ? _ref : _this.$routeParams.station, function() {
              var _ref1;
              return _this.getEquipment(scope, (_ref1 = params.equipment) != null ? _ref1 : _this.$routeParams.equipment, function() {
                scope.callbacknum = 0;
                _this.getSignal(scope, params.signal, function() {
                  return _this.setLink(scope, element, attrs);
                });
                _this.getEvent(scope, params.event, function() {
                  return _this.setLink(scope, element, attrs);
                });
                _this.getCommand(scope, params.command, function() {
                  return _this.setLink(scope, element, attrs);
                });
                return _this.getProperty(scope, params.property, function() {
                  return _this.setLink(scope, element, attrs);
                });
              });
            });
          }, true);
        };
      })(this));
      if ((_ref = scope.stationEventBus) != null) {
        _ref.dispose();
      }
      scope.stationEventBus = this.subscribeEventBus("stationId", (function(_this) {
        return function(msg) {
          if (scope.parameters._mode !== "fixed") {
            return scope.parameters.station = msg.message.stationId;
          }
        };
      })(this));
      win = angular.element(this.$window);
      resize = (function(_this) {
        return function() {
          return _this.resize(scope);
        };
      })(this);
      win.bind('resize', resize);
      scope.$on('$destroy', (function(_this) {
        return function() {
          var _ref1, _ref2, _ref3;
          win.unbind('resize', resize);
          if ((_ref1 = scope.signalSubscription) != null) {
            _ref1.dispose();
          }
          if ((_ref2 = scope.commandSubscription) != null) {
            _ref2.dispose();
          }
          if ((_ref3 = scope.stationEventBus) != null) {
            _ref3.dispose();
          }
          return _this.dispose(scope);
        };
      })(this));
      scope.getComponentPath = (function(_this) {
        return function(path) {
          return _this.getComponentPath(path);
        };
      })(this);
      scope.fullscreen = (function(_this) {
        return function(ele) {
          return _this.fullscreen(ele);
        };
      })(this);
      scope.prompt = (function(_this) {
        return function(title, message, callback, enableComment, comment) {
          scope.modal = {
            title: title,
            message: message,
            enableComment: enableComment,
            comment: comment,
            confirm: function(ok) {
              return typeof callback === "function" ? callback(ok, scope.modal.comment) : void 0;
            }
          };
          return $('#' + _this.id + '-prompt-modal').modal('open');
        };
      })(this);
      return scope.goto = function(path, immediately) {
        scope.controller.$location.url(path);
        if (immediately) {
          return scope.$applyAsync();
        }
      };
    };

    BaseDirective.prototype.getProject = function(scope, callback, refresh) {
      var fields, filter;
      filter = {
        user: this.$routeParams.user,
        project: this.$routeParams.project
      };
      fields = null;
      return this.commonService.loadProject(filter, fields, (function(_this) {
        return function(err, project) {
          if (!err) {
            return project.loadStations(null, function(err, stations) {
              var _ref, _ref1;
              scope.project = _this.project = project;
              if ((_ref = scope.project) != null) {
                if ((_ref1 = _ref.stations) != null) {
                  _ref1.nitems = _.filter(stations, function(sta) {
                    return sta.model.station.substr(0, 1) !== "_";
                  });
                }
              }
              return typeof callback === "function" ? callback() : void 0;
            });
          }
        };
      })(this), refresh);
    };

    BaseDirective.prototype.getStation = function(scope, id, callback, refresh) {
      var _ref, _ref1;
      if (!id) {
        scope.station = _.max(_.filter((_ref = scope.project.stations) != null ? _ref.nitems : void 0, function(sta) {
          return _.isEmpty(sta.model.parent);
        }), function(item) {
          return item.model.index;
        });
        return typeof callback === "function" ? callback() : void 0;
      }
      return (_ref1 = this.project) != null ? _ref1.loadStations(null, (function(_this) {
        return function(err, stations) {
          if (!err) {
            scope.station = _.find(stations, function(sta) {
              return sta.model.station === id;
            });
            return typeof callback === "function" ? callback() : void 0;
          }
        };
      })(this), refresh) : void 0;
    };

    BaseDirective.prototype.getEquipment = function(scope, id, callback, refresh) {
      var _ref;
      if (!id) {
        return typeof callback === "function" ? callback() : void 0;
      }
      return (_ref = scope.station) != null ? _ref.loadEquipment(id, null, (function(_this) {
        return function(err, equip) {
          if (!err && equip) {
            scope.equipment = equip;
            return typeof callback === "function" ? callback() : void 0;
          }
        };
      })(this), refresh) : void 0;
    };

    BaseDirective.prototype.getSignal = function(scope, id, callback, refresh) {
      var _ref;
      if (!id) {
        return typeof callback === "function" ? callback() : void 0;
      }
      return (_ref = scope.equipment) != null ? _ref.loadSignals(null, (function(_this) {
        return function(err, signals) {
          var _ref1;
          if (!err) {
            scope.signal = _.find(signals, function(sig) {
              return sig.model.signal === id;
            });
            if ((_ref1 = scope.signalSubscription) != null) {
              _ref1.dispose();
            }
            scope.signalSubscription = _this.commonService.subscribeSignalValue(scope.signal);
            return typeof callback === "function" ? callback() : void 0;
          }
        };
      })(this), refresh) : void 0;
    };

    BaseDirective.prototype.getEvent = function(scope, id, callback, refresh) {
      var _ref;
      if (!id) {
        return typeof callback === "function" ? callback() : void 0;
      }
      return (_ref = scope.equipment) != null ? _ref.loadEvents(null, (function(_this) {
        return function(err, events) {
          if (!err) {
            scope.event = _.find(events, function(evt) {
              return evt.model.event === id;
            });
            return typeof callback === "function" ? callback() : void 0;
          }
        };
      })(this), refresh) : void 0;
    };

    BaseDirective.prototype.getCommand = function(scope, id, callback, refresh) {
      var _ref;
      if (!id) {
        return typeof callback === "function" ? callback() : void 0;
      }
      return (_ref = scope.equipment) != null ? _ref.loadCommands(null, (function(_this) {
        return function(err, commands) {
          if (!err) {
            scope.command = _.find(commands, function(cmd) {
              return cmd.model.command === id;
            });
            return typeof callback === "function" ? callback() : void 0;
          }
        };
      })(this), refresh) : void 0;
    };

    BaseDirective.prototype.getProperty = function(scope, id, callback, refresh) {
      var _ref;
      if (!id) {
        return typeof callback === "function" ? callback() : void 0;
      }
      return (_ref = scope.equipment) != null ? _ref.loadProperties(null, (function(_this) {
        return function(err, properties) {
          if (!err) {
            scope.property = _.find(properties, function(sig) {
              return sig.model.property === id;
            });
            return typeof callback === "function" ? callback() : void 0;
          }
        };
      })(this), refresh) : void 0;
    };

    BaseDirective.prototype.getComponentPath = function(path) {
      var script, scripts;
      scripts = document.getElementsByTagName("script");
      script = _.find(scripts, (function(_this) {
        return function(sp) {
          return sp.src.indexOf("/" + _this.id) > 0 && sp.src.indexOf("/component.js") > 0;
        };
      })(this));
      return (script != null ? script.src : void 0) + "/../" + path;
    };

    BaseDirective.prototype.getHostType = function() {
      var Agents, os, system, userAgent, _i, _len;
      userAgent = navigator.userAgent;
      Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
      system = 'PC';
      for (_i = 0, _len = Agents.length; _i < _len; _i++) {
        os = Agents[_i];
        if (userAgent.indexOf(os) > 0) {
          system = os;
          break;
        }
      }
      return system;
    };

    BaseDirective.prototype.display = function(err, info, period) {
      var delay, message;
      delay = period || 2000;
      message = this.formatErrorInfo(err, info);
      if (message) {
        return M.toast({
          html: message,
          displayLength: delay
        });
      }
    };

    BaseDirective.prototype.formatErrorInfo = function(err, info) {
      var result;
      if (err) {
        if (typeof err === 'object') {
          result = JSON.stringify(err);
        } else {
          result = err;
        }
        console.log(result);
      } else {
        result = info;
      }
      return result;
    };

    BaseDirective.prototype.waitingLayout = function($timeout, element, callback) {
      return $timeout((function(_this) {
        return function() {
          if (element.width() <= 100) {
            return _this.waitingLayout($timeout, element, callback);
          } else {
            return callback();
          }
        };
      })(this), 200);
    };

    BaseDirective.prototype.subscribeEventBus = function(topic, callback, throttle) {
      return this.commonService.subscribeEventBus(topic, callback, throttle);
    };

    BaseDirective.prototype.publishEventBus = function(topic, message) {
      return this.commonService.publishEventBus(topic, message);
    };

    BaseDirective.prototype.executeCommand = function(scope, command) {
      this.commonService.executeCommand(command);
      this.commonService.$rootScope.executing = true;
      scope.noresponse = setTimeout((function(_this) {
        return function() {
          _this.commonService.$rootScope.executing = false;
          _this.commonService.$rootScope.$applyAsync();
          return _this.display("操作无响应");
        };
      })(this), 6000);
      return setTimeout((function(_this) {
        return function() {
          var _ref;
          if ((_ref = scope.commandSubscription) != null) {
            _ref.dispose();
          }
          return scope.commandSubscription = _this.commonService.subscribeCommandValue(command, function(cmd) {
            if (cmd.data.phase === "executing") {
              return;
            }
            _this.commonService.$rootScope.executing = false;
            clearTimeout(scope.noresponse);
            if (cmd.data.phase === "complete") {
              _this.display("操作成功");
            }
            if (cmd.data.phase === "error") {
              _this.display("操作失败");
            }
            if (cmd.data.phase === "timeout") {
              return _this.display("操作超时");
            }
          });
        };
      })(this), 100);
    };

    BaseDirective.prototype.fullscreen = function(element) {
      var el, exit;
      if (!element) {
        element = "#container";
      }
      if (typeof element === 'string') {
        el = angular.element(element);
        element = el[0];
      }
      exit = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      if (exit) {
        if (document.exitFullscreen) {
          return document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          return document.webkitExitFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (document.mozExitFullScreen) {
          return document.mozExitFullScreen();
        } else if (document.msExitFullscreen) {
          return document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          return element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          return element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.mozRequestFullScreen) {
          return element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          return element.msRequestFullscreen();
        }
      }
    };

    BaseDirective.prototype.setScope = function() {};

    BaseDirective.prototype.setCSS = function() {};

    BaseDirective.prototype.setTemplate = function() {};

    BaseDirective.prototype.setTemplateUrl = function() {};

    BaseDirective.prototype.setLink = function(scope, element, attrs) {
      scope.callbacknum++;
      if (scope.callbacknum === 4) {
        if (typeof this.show === "function") {
          this.show(scope, element, attrs);
        }
        return scope.firstload = false;
      }
    };

    BaseDirective.prototype.resize = function(scope) {};

    BaseDirective.prototype.dispose = function(scope) {};

    return BaseDirective;

  })();
  return exports = {
    BaseDirective: BaseDirective
  };
});
