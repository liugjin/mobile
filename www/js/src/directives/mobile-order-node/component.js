
/*
* File: mobile-order-node-directive
* User: bingo
* Date: 2019/07/04
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../base-directive', 'text!./style.css', 'text!./view.html', 'underscore', "moment"], function(base, css, view, _, moment) {
  var MobileOrderNodeDirective, exports;
  MobileOrderNodeDirective = (function(_super) {
    __extends(MobileOrderNodeDirective, _super);

    function MobileOrderNodeDirective($timeout, $window, $compile, $routeParams, commonService) {
      this.show = __bind(this.show, this);
      this.id = "mobile-order-node";
      MobileOrderNodeDirective.__super__.constructor.call(this, $timeout, $window, $compile, $routeParams, commonService);
    }

    MobileOrderNodeDirective.prototype.setScope = function() {};

    MobileOrderNodeDirective.prototype.setCSS = function() {
      return css;
    };

    MobileOrderNodeDirective.prototype.setTemplate = function() {
      return view;
    };

    MobileOrderNodeDirective.prototype.show = function($scope, element, attrs) {
      var queryTaskReport;
      $scope.contents = null;
      queryTaskReport = (function(_this) {
        return function() {
          return _this.commonService.loadProjectModelByService('tasks', {
            task: $scope.parameters.orderId
          }, 'user _id project type process name creator task phase nodes createtime', function(err, taskModels) {
            var contents;
            if (err || !taskModels) {
              return;
            }
            contents = [];
            _.map(taskModels.nodes[0].contents, function(content) {
              if (!content.type) {
                return contents.push(content);
              }
            });
            $scope.contents = contents;
            return $scope.task = taskModels;
          });
        };
      })(this);
      return queryTaskReport();
    };

    MobileOrderNodeDirective.prototype.resize = function($scope) {};

    MobileOrderNodeDirective.prototype.dispose = function($scope) {};

    return MobileOrderNodeDirective;

  })(base.BaseDirective);
  return exports = {
    MobileOrderNodeDirective: MobileOrderNodeDirective
  };
});
