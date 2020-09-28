
/*
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc:
 */
if (typeof define !== 'function') { var define = require('amdefine')(module) };
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./project-base-controller', 'clc.foundation.angular/live/live-session', 'clc.foundation.angular/live/signal-live-session', 'clc.foundation.angular/live/event-live-session', 'clc.foundation.angular/live/statistic-live-session', 'clc.foundation.angular/live/command-live-session', 'clc.foundation.angular/live/signal-statistic-live-session'], function(base, ls, sls, els, sls2, cls, ssls) {
  var LiveController, exports;
  LiveController = (function(_super) {
    __extends(LiveController, _super);

    function LiveController($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) {
      this.$interval = $interval;
      this.liveService = liveService;
      this.reportingService = reportingService;
      this.liveSession = new ls.LiveSession(this.liveService);
      this.signalLiveSession = new sls.SignalLiveSession(this.liveService);
      this.eventLiveSession = new els.EventLiveSession(this.liveService);
      this.statisticLiveSession = new sls2.StatisticLiveSession(this.liveService);
      this.commandLiveSession = new cls.CommandLiveSession(this.liveService);
      this.signalStatisticLiveSession = new ssls.SignalStatisticLiveSession(this.liveService);
      LiveController.__super__.constructor.call(this, $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options);
    }

    LiveController.prototype.dispose = function() {
      LiveController.__super__.dispose.apply(this, arguments);
      this.liveSession.dispose();
      this.signalLiveSession.dispose();
      this.eventLiveSession.dispose();
      this.statisticLiveSession.dispose();
      return this.commandLiveSession.dispose();
    };

    return LiveController;

  })(base.ProjectBaseController);
  return exports = {
    LiveController: LiveController
  };
});
