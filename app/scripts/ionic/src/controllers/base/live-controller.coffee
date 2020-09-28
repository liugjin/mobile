###
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./project-base-controller',
        'clc.foundation.angular/live/live-session',
        'clc.foundation.angular/live/signal-live-session',
        'clc.foundation.angular/live/event-live-session',
        'clc.foundation.angular/live/statistic-live-session',
        'clc.foundation.angular/live/command-live-session',
        'clc.foundation.angular/live/signal-statistic-live-session'
], (base, ls, sls, els, sls2, cls, ssls) ->
  class LiveController extends base.ProjectBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, @$interval, modelManager, modelEngine, uploadService, @liveService, @reportingService, options) ->
      @liveSession = new ls.LiveSession @liveService
      @signalLiveSession = new sls.SignalLiveSession @liveService
      @eventLiveSession = new els.EventLiveSession @liveService
      @statisticLiveSession = new sls2.StatisticLiveSession @liveService
      @commandLiveSession = new cls.CommandLiveSession @liveService
      @signalStatisticLiveSession = new ssls.SignalStatisticLiveSession @liveService

      super $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options

    dispose: ->
      super

      @liveSession.dispose()
      @signalLiveSession.dispose()
      @eventLiveSession.dispose()
      @statisticLiveSession.dispose()
      @commandLiveSession.dispose()


  exports =
    LiveController: LiveController
