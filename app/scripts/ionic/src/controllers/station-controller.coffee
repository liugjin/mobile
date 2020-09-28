
define ['./base/graphic-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'moment'], (base, fsf, moment) ->

  class Ctrl extends base.GraphicBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options


    load: (callback, refresh) ->
      @formatString = fsf.FormatStringFilter()
      @signalSetting =
        title: ''
      @signalValues = null
      @managementEquipment = '_station_management'
      @signalRecordTypes = [
        {type: 'now', name: '实时曲线图'}
        {type: 'day', name: '今日曲线图'}
        {type: 'week', name: '本周曲线图'}
        {type: 'month', name: '本月曲线图'}
        {type: 'year', name: '本年曲线图'}
      ]
      @signalRecordType = @signalRecordTypes[1]
      @period = @getPeriod()

      super (err, model) =>
        @queryRecentSignalRecords()
        @subscribeStationSignal()
        callback? err, model
      , refresh



    selectStation: (station) ->
      return false if not super station

      @loadStationGraphic station
      @loadEquipments()
      return true

    loadStationGraphic: (station = @station, refresh) ->
      return if not station

      @templateId =
        user: @$routeParams.user
        project: @$routeParams.project
        template: station.model.graphic or station.model.map

      @templateId.timestamp = new Date if refresh
      @templateId

    loadEquipments: (callback, refresh) ->
      fields = 'user project station equipment name type image index group'
      @station?.loadEquipments {}, fields, (err, model) =>
        @equipments = model
#        console.log @equipments, '<-- @equipments'
        callback? err, model
      , refresh



    subscribeStationSignal: ->
      model = @project.model
      filter =
        user: model.user
        project: model.project
        station: @station.model.station
        equipment: @managementEquipment
        signal: '+'

      @stationSignalSubscription?.dispose()
      @stationSignalSubscription = @signalLiveSession.subscribeValues filter, (err, d) =>
        return if not d

        signal = d.message
        station = @project.stations.getItemByIds signal
        if station
          station.stationSignal ?= {}
          signal.value = @formatString signal.value, 'float', '0.00'
          station.stationSignal[signal.signal] = signal
          #          console.log signal, '<-- signal'
          if signal.unit
            station.unit ?= {}
            unit = _.find @project.dictionary.signaltypes.items, (item) -> item.key is signal.unit
            station.unit[signal.signal] = unit.model.unit
          if signal.signal is 'real-time-power'
            @signalValue = signal


    queryRecentSignalRecords: (signal='real-time-power') ->
      return if not signal
      filter =
        user: @station.model.user
        project: @station.model.project
        station: @station.model.station
        equipment: @managementEquipment
        signal: signal

      signalKey = (Object.values filter).join '.'

      # query last 20 points
      paging =
        page: 1
        pageItems: 20

      sorting = timestamp: -1

      @parameters =
        filter: filter

#        startTime: period.startTime
#        endTime: period.endTime
        queryTime: moment()
#        periodType: periodType

        paging: paging
        sorting: sorting

      data =
        filter: filter
        fields: null
        paging: paging
        sorting: sorting


      #      endTime = moment()
      #      startTime = moment().subtract 5, 'minutes'
      #
      #      filter.startTime = startTime
      #      filter.endTime = endTime

      @signalRecordsParameters =
        signal: signal
#        startTime: startTime
#        endTime: endTime
        queryTime: new Date

      @signalValues = null
      #      @signalSetting = null
      #      @signalValue = null

      @reportingService.querySignalGroupRecords data, (err, records) =>
        # what if return empty records
        if records.hasOwnProperty signalKey
          @signalValues = records
        else
          m = @station.model
          svs = {}
          svs[signalKey] =
            user: m.user
            project: m.project
            station: m.station
            equipment: @managementEquipment
            signal: signal
            values: []
          @signalValues = svs



    querySignalRecords: (signal='real-time-power', periodType, page = 1, pageItems = 1000) ->
      switch periodType
        when 'next'
          period = @nextPeriod()
        when 'previous'
          period = @previousPeriod()
        when 'refresh'
          period = @period ? @getPeriod()
        else
          period = @getPeriod @signalRecordType

      filter =
        user: @station.model.user
        project: @station.model.project
        station: @station.model.station
        equipment: @managementEquipment
        signal: signal

      #      signalKey = (Object.values filter).join '.'
      signalKey = (_.values filter).join '.'


      filter.startTime = period.startTime
      filter.endTime = period.endTime

      paging =
        page: page
        pageItems: pageItems

      sorting = {}
      sorting['startTime'] = 1

      @signalRecordsParameters =
        signal: signal
        startTime: period.startTime
        endTime: period.endTime
        queryTime: moment()
        periodType: periodType
        paging: paging
        sorting: sorting

      data =
        filter: filter
        fields: null
        paging: paging
        sorting: sorting

      @reportingService.querySignalGroupRecords data, (err, records, paging2) =>
        # what if return empty records
        if records.hasOwnProperty signalKey
          @signalValues = records
        else
          m = @station.model
          svs = {}
          svs[signal.key] =
            user: m.user
            project: m.project
            station: m.station
            equipment: @managementEquipment
            signal: signal
            values: []
          @signalValues = svs



    nextPeriod: () ->
      if not @period
        return @getPeriod()

      switch @period.type
        when '60minutes'
          startTime = @period.endTime
          endTime = moment(@period.endTime).add(60, 'minutes')
        when 'hour'
          startTime = moment(@period.startTime).add(1, 'hour').startOf 'hour'
          endTime = moment(@period.startTime).add(1, 'hour').endOf 'hour'
        when 'day'
          startTime = moment(@period.startTime).add(1, 'day').startOf 'day'
          endTime = moment(@period.startTime).add(1, 'day').endOf 'day'
        when 'week'
          startTime = moment(@period.startTime).add(1, 'week').startOf 'week'
          endTime =moment(@period.startTime).add(1, 'week').endOf 'week'
        when 'month'
          startTime = moment(@period.startTime).add(1, 'month').startOf 'month'
          endTime = moment(@period.startTime).add(1, 'month').endOf 'month'
        when 'year'
          startTime = moment(@period.startTime).add(1, 'year').startOf 'year'
          endTime = moment(@period.startTime).add(1, 'year').endOf 'year'
        else
          startTime = @period.endTime
          endTime = moment(@period.endTime).add(60, 'minutes')

      @period.startTime = startTime
      @period.endTime = endTime
      @period

    previousPeriod: () ->
      if not @period
        return @getPeriod()

      switch @period.type
        when '60minutes'
          startTime = moment(@period.startTime).subtract(60, 'minutes')
          endTime = @period.startTime
        when 'hour'
          startTime = moment(@period.startTime).subtract(1, 'hour').startOf 'hour'
          endTime = moment(@period.startTime).subtract(1, 'hour').endOf 'hour'
        when 'day'
          startTime = moment(@period.startTime).subtract(1, 'day').startOf 'day'
          endTime = moment(@period.startTime).subtract(1, 'day').endOf 'day'
        when 'week'
          startTime = moment(@period.startTime).subtract(1, 'week').startOf 'week'
          endTime =moment(@period.startTime).subtract(1, 'week').endOf 'week'
        when 'month'
          startTime = moment(@period.startTime).subtract(1, 'month').startOf 'month'
          endTime = moment(@period.startTime).subtract(1, 'month').endOf 'month'
        when 'year'
          startTime = moment(@period.startTime).subtract(1, 'year').startOf 'year'
          endTime = moment(@period.startTime).subtract(1, 'year').endOf 'year'
        else
          startTime = moment(@period.startTime).subtract(60, 'minutes')
          endTime = @period.startTime

      @period.startTime = startTime
      @period.endTime = endTime
      @period


    getPeriod: (type = @signalRecordType) ->
      switch type.type
        when 'now'
#          startTime = moment().startOf 'day'
          startTime = moment().subtract 60, 'minutes'
          endTime = moment()
        when '60minutes'
          startTime = moment().subtract 60, 'minutes'
          endTime = moment()
        when 'hour'
          startTime = moment().startOf 'hour'
          endTime = moment().endOf 'hour'
        when 'day'
          startTime = moment().startOf 'day'
          endTime = moment().endOf 'day'
        when 'week'
          startTime = moment().startOf 'week'
          endTime = moment().endOf 'week'
        when 'month'
          startTime = moment().startOf 'month'
          endTime = moment().endOf 'month'
        when 'year'
          startTime = moment().startOf 'year'
          endTime = moment().endOf 'year'
        else
          startTime = moment().subtract 60, 'minutes'
          endTime = moment()

      @period =
        startTime: startTime
        endTime: endTime
        type: type.type




  exports =
    Ctrl: Ctrl
