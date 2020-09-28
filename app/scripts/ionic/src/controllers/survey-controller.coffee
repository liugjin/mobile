
define [
  './base/feature-base-controller',
  'clc.foundation.angular/filters/format-string-filter',
  'moment',
  'rx'
  'underscore'
], (base, fsf, moment, Rx, _) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$ionicPopover, @$ionicModal, @commonService, @$state, @$ionicPopup, @$ionicActionSheet,@$cordovaCamera,@$ionicHistory) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

    dispose: ->
      
  exports =
    Ctrl: Ctrl
