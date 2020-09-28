
define ['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'underscore'], (base, fsf, _) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$state) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options


    load: (callback, refresh) ->
      super (err, model) =>
        callback? err, model
      , refresh


    goToOrigin: ()=>
      if @$routeParams.origin is 'tab.event'
        @$state.go 'tab.event', {user: @$routeParams.user, project: @$routeParams.project}
      else if @$routeParams.origin is 'equipment'
        @$state.go 'equipment', {user: @$routeParams.user, project: @$routeParams.project ,station: @$routeParams.station, equipment: @$routeParams.equipment}
      else
        return


  exports =
    Ctrl: Ctrl


