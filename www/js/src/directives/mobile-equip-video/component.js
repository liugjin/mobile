
/*
* File: mobile-equip-video-directive
* User: bingo
* Date: 2019/04/22
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileEquipVideoDirective, exports;
  MobileEquipVideoDirective = (function(_super) {
    __extends(MobileEquipVideoDirective, _super);

    function MobileEquipVideoDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-equip-video";
      MobileEquipVideoDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileEquipVideoDirective.prototype.setScope = function() {};

    MobileEquipVideoDirective.prototype.setCSS = function() {
      return css;
    };

    MobileEquipVideoDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileEquipVideoDirective.prototype.show = function($scope, element, attrs) {
      var _ref;
      if ((_ref = window.proxy) != null) {
        _ref.connect({
          server_addr: "106.14.145.247",
          server_port: 7000,
          server_name: "mu2000",
          ctype: "stcp",
          bind_addr: "127.0.0.1",
          bind_port: 8554
        }, (function(_this) {
          return function(res) {
            return console.log("success:", res);
          };
        })(this), (function(_this) {
          return function(err) {
            return _this.prompt("错误", "error: " + err);
          };
        })(this));
      }
      $scope.$watch("equipment", (function(_this) {
        return function(equipment) {
          if (!equipment) {
            return;
          }
          return equipment.loadProperties();
        };
      })(this));
      return $scope.playVideo = (function(_this) {
        return function() {
          var options, url, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
          url = null;
          url = ((_ref1 = $scope.equipment) != null ? _ref1.getPropertyValue('url') : void 0) || ((_ref2 = $scope.equipment) != null ? _ref2.getPropertyValue('rtsp') : void 0) || ((_ref3 = $scope.equipment) != null ? _ref3.getPropertyValue('rtmp') : void 0) || ((_ref4 = $scope.equipment) != null ? _ref4.getPropertyValue('http') : void 0) || ((_ref5 = $scope.equipment) != null ? _ref5.getPropertyValue('hls') : void 0);
          if (!url) {
            _this.prompt("错误", "请配置视频推送地址！");
            return;
          }
          options = {
            successCallback: function() {
              return console.log("Video was closed without error.");
            },
            errorCallback: function(errMsg) {
              return _this.prompt("错误", errMsg);
            },
            orientation: 'landscape',
            shouldAutoClose: true,
            controls: true
          };
          return (_ref6 = window.plugins) != null ? (_ref7 = _ref6.streamingMedia) != null ? _ref7.playVideo(url, options) : void 0 : void 0;
        };
      })(this);
    };

    MobileEquipVideoDirective.prototype.resize = function($scope) {};

    MobileEquipVideoDirective.prototype.dispose = function($scope) {};

    return MobileEquipVideoDirective;

  })(base.BaseDirective);
  return exports = {
    MobileEquipVideoDirective: MobileEquipVideoDirective
  };
});
