
/*
* File: reporting-service
* User: Dow
* Date: 9/2/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['clc.foundation.angular/services/service'], function(base) {
  var QueryService, exports;
  QueryService = (function(_super) {
    __extends(QueryService, _super);

    function QueryService($rootScope, $http) {
      this.$rootScope = $rootScope;
      this.$http = $http;
      QueryService.__super__.constructor.apply(this, arguments);
    }

    QueryService.prototype.onSuccess = function(response, callback) {
      var data, err, _ref, _ref1;
      this.$rootScope.loading = false;
      data = (_ref = response.data) != null ? _ref : {};
      if (data._err) {
        err = (_ref1 = data._err.message) != null ? _ref1 : data._err;
        return typeof callback === "function" ? callback(err) : void 0;
      }
      if (typeof data === 'string') {
        return typeof callback === "function" ? callback(null, data) : void 0;
      } else {
        return typeof callback === "function" ? callback(null, data.data, data.paging) : void 0;
      }
    };

    QueryService.prototype.onError = function(response, callback) {
      var data, err, _ref, _ref1;
      this.$rootScope.loading = false;
      data = (_ref = response.data) != null ? _ref : {};
      if (data != null ? data._err : void 0) {
        err = (_ref1 = data._err.message) != null ? _ref1 : data._err;
      } else {
        err = "error: " + response.status;
      }
      return typeof callback === "function" ? callback(err) : void 0;
    };

    QueryService.prototype.beforeAction = function() {
      return this.$rootScope.loading = true;
    };

    QueryService.prototype.query = function(url, parameters, callback) {
      var _ref;
      url = this.replaceUrlParam(url, (_ref = parameters.filter) != null ? _ref : {});
      parameters = this.appendToken(parameters);
      this.beforeAction();
      return this.$http.get(url, {
        params: parameters
      }).then((function(_this) {
        return function(response) {
          return _this.onSuccess(response, callback);
        };
      })(this))["catch"]((function(_this) {
        return function(response) {
          return _this.onError(response, callback);
        };
      })(this));
    };

    QueryService.prototype.replaceUrlParam = function(url, ps, immutable) {
      var url2;
      url2 = url.replace(/\/:([^/\s]*)/g, function(m, p1) {
        var data, value;
        value = ps[p1];
        if (!immutable) {
          delete ps[p1];
        }
        if (value != null) {
          data = "/" + value;
        } else {
          data = "/+";
        }
        return data;
      });
      if (url2[url2.length - 1] === '+') {
        url2 = url2.substr(0, url2.length - 2);
      }
      return url2;
    };

    return QueryService;

  })(base.Service);
  return exports = {
    QueryService: QueryService
  };
});
