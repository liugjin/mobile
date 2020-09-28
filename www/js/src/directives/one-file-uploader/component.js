
/*
* File: one-file-uploader-directive
* User: David
* Date: 2019/11/21
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var OneFileUploaderDirective, exports;
  OneFileUploaderDirective = (function(_super) {
    __extends(OneFileUploaderDirective, _super);

    function OneFileUploaderDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "one-file-uploader";
      OneFileUploaderDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    OneFileUploaderDirective.prototype.setScope = function() {};

    OneFileUploaderDirective.prototype.setCSS = function() {
      return css;
    };

    OneFileUploaderDirective.prototype.setTemplate = function() {
      return view;
    };

    OneFileUploaderDirective.prototype.show = function(scope, element, attrs) {
      var input, publish;
      scope.uploadUrl = setting.urls.uploadUrl;
      scope.file = null;
      scope.handle = false;
      publish = (function(_this) {
        return function() {
          _this.publishEventBus("file", scope.file);
          return scope.$applyAsync();
        };
      })(this);
      input = element.find("input[type='file']");
      scope.addFile = function() {
        return input.click();
      };
      if (scope.firstload) {
        input.bind("change", (function(_this) {
          return function(evt) {
            var file, _ref, _ref1;
            file = (_ref = input[0]) != null ? (_ref1 = _ref.files) != null ? _ref1[0] : void 0 : void 0;
            if (!file) {
              return;
            }
            return _this.commonService.uploadService.upload(file, null, scope.uploadUrl + "/" + file.name, function(err, resource) {
              if (err) {
                return _this.display("上传失败!!", 500);
              }
              scope.file = {
                name: resource.name,
                path: resource.path,
                type: file.type
              };
              return publish();
            });
          };
        })(this));
      }
      return scope.$watch("parameters.handle", (function(_this) {
        return function(handle) {
          if (typeof handle === "boolean" && handle) {
            scope.handle = true;
            return scope.file = null;
          } else if (typeof handle === "boolean" && !handle) {
            return scope.handle = false;
          }
        };
      })(this));
    };

    OneFileUploaderDirective.prototype.resize = function(scope) {};

    OneFileUploaderDirective.prototype.dispose = function(scope) {};

    return OneFileUploaderDirective;

  })(base.BaseDirective);
  return exports = {
    OneFileUploaderDirective: OneFileUploaderDirective
  };
});
