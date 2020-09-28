

define ['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'underscore'], (base, fsf, _) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$state) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options
      @scanCode()

    scanCode: () =>
      window.QRScanner?.prepare (err, status) =>
        if err
          #console.error(err)
          @display err
        else
          #console.log('QRScanner is initialized. Status:')
          #console.log(status)
          window.QRScanner.scan (err, text) =>
            if err
              #console.error "err: ", err
              @display err
            else
              @$state.go 'scan', {user: @$routeParams.user, project: @$routeParams.project, station: @$routeParams.station, origin: @$routeParams.origin, strScan: text}
          window.QRScanner.show()

  exports =
    Ctrl: Ctrl

