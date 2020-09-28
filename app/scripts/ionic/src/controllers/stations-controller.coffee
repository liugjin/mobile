
define ['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter'], (base, fsf) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

      @formatString = fsf.FormatStringFilter()


    load: (callback, refresh) ->
      super (err, model) =>
        @subscribeStationSignal()
        callback? err, model
      , refresh


    subscribeStationSignal: ->
      model = @project.model
      filter =
        user: model.user
        project: model.project
        station: '+'
#        station: @station.model.station
        equipment: '_station_management'
        signal: '+'

      @stationSignalSubscription?.dispose()
      @stationSignalSubscription = @signalLiveSession.subscribeValues filter, (err, d) =>
        return if not d

        signal = d.message
        #        console.log signal, '<-- signal'
        station = @project.stations.getItemByIds signal
        if station
          station.stationSignal ?= {}
          signal.value = @formatString signal.value, 'float', '0.00'
          station.stationSignal[signal.signal] = signal
          if signal.unit
            station.unit ?= {}
            unit = _.find @project.dictionary.signaltypes.items, (item) -> item.key is signal.unit
            station.unit[signal.signal] = unit.model.unit
          if signal.signal is 'real-time-power-overview'
            @signalValue = signal



  exports =
    Ctrl: Ctrl
