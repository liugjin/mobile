###
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./feature-base-controller'
        'moment'
        'underscore'
        '../../models/paging-model'
        'rx'
], (base, moment, _, pm, rx) ->
  EVENT_COMPLETED = 'completed'
  ALL_EVENT_STATISTIC = 'event-statistic/all'

  class EventManagerController extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

      @selectAllEquipmentTypes()

      @loadEventNotificationSetting()

    load: (callback, refresh) ->
      super (err, model) =>
        @initializeStatistic()
        @initializeEvents()
#        console.log @project.typeModels, '<-- @project.typeModels'
        callback? err, model
      , refresh

    dispose: ->
      super

      @saveEventNotificationSetting()
      @eventSubject?.dispose()

    initializeEvents: ->
      @endColor = 'grey'

      @eventRecords = new pm.PagingModel
        predicate: 'name'
        reverse: false

      @eventRecordsParameters = {}

      # to throttle event statistic
      @eventSubject = new rx.Subject
#      @eventSubject.where((event) => @predicateStationEvent event )
#      .throttle(500).subscribe (d) =>
#        @statisticStationEvents()
      @eventSubject
      .sample @options.statisticPeriod || 1000
      .subscribe (d) =>
        @statisticEvents()

      # TODO: event expected duration should be configured in equipment template
      @eventExpectedDuration = 3600000

      @events = {}
      @eventItems = []
      @startEvents = {}
      @subscribeEvents()
      @updateDuration()

      @eventStatisticSetting =
        title: "站点告警"
        subTitle: '按告警状态类型统计'
        severities: @project.typeModels.eventseverities.items
#      @subscribeEventStatistic()

    predicateStationEvent: (event) ->
      return false if not event
      return true if not @station

      @station.containsStation event.station

    subscribeEvents: () ->
      filter =
        user: @project.model.user
        project: @project.model.project

      @eventSubscriptions?.dispose()
      @eventSubscriptions = @eventLiveSession.subscribeValues filter, (err, d) =>
#        console.log err ? d
        @processEvent d

    processEvent: (data) ->
      return if not data

      message = data.message
      key = "#{message.user}.#{message.project}.#{message.station}.#{message.equipment}.#{message.event}.#{message.severity}.#{message.startTime}"

      if @events.hasOwnProperty key
        event = @events[key]
        # update existing event
        for k, v of message
          event[k] = v

        if event.endTime
          delete @startEvents[key]
      else
        # add new event
        event = angular.copy message

        @events[key] = event
        @eventItems.push event

        @addItem event
        @stationEvents.addItem event
        @startEvents[key] = event if not event.endTime

      @decorateEvent event

#      if message.endTime
#        event.color = @endColor
#      else
#        event.color = event.eventSeverity?.color ? @endColor

#      console.log @stationEvents, '<-- @stationEvents'

      # remove the completed event
      if message.phase is 'completed'
        event = @events[key]
        delete @events[key]
        @eventItems.splice @eventItems.indexOf(event), 1

        @removeItem event
        @stationEvents.removeItem event
        delete @startEvents[key]

      # to trigger event statistic
      @eventSubject.onNext event
      event

    decorateEvent: (event) ->
      event.updateTime = event.endTime ? event.confirmTime ? event.startTime
      event.eventSeverity = @project.typeModels.eventseverities.getItem(event.severity)?.model
      event.color = event.eventSeverity?.color ? @endColor

      endTime = if event.endTime then new Date(event.endTime) else new Date
      event.duration = endTime - new Date(event.startTime)
      event.startTime2 = new Date event.startTime

      event

    # deprecated
#    filterEvent2: () ->
#      (event) =>
#        if not @station?.containsStation event.station
#          return false
#
#        return @filterItemFunc event

    filterEvent: () ->
      (event) =>
        if @statisticLegends[event.phase] is false or @statisticLegends[event.severity] is false
          return false

        return false if @eventType and @eventType.model.type isnt event.eventType

        return false if @equipmentTypesCount and not @equipmentTypes.hasOwnProperty(event.equipmentType)

#        return @filterItemFunc event
        return @stationEvents.filter(@search, ['event', 'name', 'title', 'stationName', 'equipmentName'], true) event

    selectEventType: (type) ->
      @eventType = type

    selectEvent: (event) ->
      return false if @event is event
      @event = event

      @queryEventRecords event
      return true

    updateDuration: ->
      timer = @$interval =>
        for key, event of @startEvents
          event.duration = new Date() - event.startTime2
          progress = (event.duration / @eventExpectedDuration * 100).toFixed(1)
          event.progress = "#{progress}%"
      , 1000

      @addHandle
        dispose: =>
          @$interval.cancel timer

    subscribeEventStatistic: () ->
      filter =
        user: @project.model.user
        project: @project.model.project

      @statisticSubscription?.dispose()
      @statisticSubscription = @statisticLiveSession.subscribeValues filter, (err, d) =>
#        console.log err ? d
        @eventStatistic = d?.message

    getPeriod: (type = @eventRecordType) ->
      switch type.type
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

    nextPeriod: () ->
      if not @period
        return getPeriod()

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

      @period =
        startTime: startTime
        endTime: endTime
        type: @period.type

    previousPeriod: () ->
      if not @period
        return getPeriod()

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

      @period =
        startTime: startTime
        endTime: endTime
        type: @period.type

    queryEventRecords: (event, periodType, page = 1, pageItems = 20) ->
      switch periodType
        when 'next'
          period = @nextPeriod()
        when 'previous'
          period = @previousPeriod()
        when 'refresh'
          period = @period ? @getPeriod()
        else
          period = @getPeriod()

      filter =
        user: event.user
        project: event.project
        station: event.station
        equipment: event.equipment
        event: event.event

        startTime: period.startTime
        endTime: period.endTime

      paging =
        page: page
        pageItems: pageItems

      sorting = {}
      sorting[@stationEvents.predicate] = if @stationEvents.reverse then -1 else 1

      @eventRecordsParameters =
        event: event
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

      @reportingService.queryEventRecords data, (err, records, paging2) =>
        if records
          for event in records
            @decorateEvent event
        @eventRecords.setItems records

        paging2?.pages = [1..paging2.pageCount]
        @eventRecordsParameters.paging = paging2

    queryEventPage: (page) ->
      paging = @eventRecordsParameters?.paging
      return if not paging

      if page is 'next'
        page = paging.page + 1
      else if page is 'previous'
        page = paging.page - 1

      return if page > paging.pageCount or page < 1

      @queryEventRecords @eventRecordsParameters.event, @eventRecordsParameters.periodType, page, paging.pageItems


    initializeStatistic: ->
      @calendarTypes = [
        {type: 'day', name: '24小时事件日历'}
        {type: 'week', name: '7天事件日历'}
        {type: 'month', name: '月度事件日历'}
        {type: 'year', name: '年度事件日历'}
      ]

      @selectCalendarType @calendarTypes[0]

      @valueTypes = [
        {type: 'max', name: '最高事件等级'}
        {type: 'unconfirm', name: '未确认事件总数'}
        {type: 'start', name: '未结束事件总数'}
        {type: 'active', name: '活动事件总数'}
      ]

      @selectValueType @valueTypes[0]

      @eventRecordTypes = [
        {type: '60minutes', name: '60分钟事件记录'}
        {type: 'hour', name: '小时事件记录'}
        {type: 'day', name: '今日事件记录'}
        {type: 'week', name: '本周事件记录'}
        {type: 'month', name: '本月事件记录'}
        {type: 'year', name: '本年事件记录'}
      ]

      @selectEventRecordType @eventRecordTypes[2]

      # subscribe event-statistic-directive select event
      @statisticLegends = {}
      @subscribeEventBus 'event-statistic-phase-severity', (d) =>
        for k, v of d.message.data.legends
          @statisticLegends[k] = v

        return

    selectValueType: (type = @valueType) ->
      @valueType = type

      @setHeatmapOptions()

    selectCalendarType: (type = @calendarType) ->
      @calendarType = type

      @setHeatmapOptions()

    selectEventRecordType: (type = @eventRecordType) ->
      @eventRecordType = type

    setHeatmapOptions: ->
      min = 0
      max = 10

      data = @createMockData min, max

      options =
        cellSize: 35
        cellPadding: 5
        domainMargin: 5
        domainGutter: 20
#        range: 3
        legendCellSize: 20
        highlight: ['now']
        start: new Date
        legendColors:
          empty: "#ededed"
          min: "#40ffd8"
          max: "#f20013"
        tooltip: false
        legendTitleFormat:
          lower: "< {min}"
          inner: "[{down}, {up}]"
          upper: "> {max}"
        subDomainTitleFormat:
          empty: "{date}"
          filled: "{count} @ {date}"
        subDomainDateFormat: "%Y-%m-%d"
        subDomainTextFormat: '%d'
        domainLabelFormat: "%Y-%m-%d"

        data: data

      switch @calendarType.type
        when 'day'
          options.domain = 'day'
          options.subDomain = 'hour'
          options.subDomainTextFormat = "%H"
          options.subDomainDateFormat = "%Y-%m-%d %Hh"
          options.domainLabelFormat = "%Y-%m-%d"
        when 'week'
          options.domain = 'week'
          options.subDomain = 'day'
          options.domainGutter = 40

          min = min * 24
          max = max * 24
        when 'month'
          options.domain = 'month'
          options.subDomain = 'x_day'

          min = min * 24
          max = max * 24
        when 'year'
          options.domain = 'year'
          options.subDomain = 'month'
          options.subDomainTextFormat = "%m"
          options.subDomainDateFormat = "%Y-%m"
          options.domainLabelFormat = "%Y-%m-%d"

          min = min * 24 * 30
          max = max * 24 * 30
        else
          options.domain = 'day'
          options.subDomain = 'hour'

      quantity = 5
      step = Math.floor max / quantity

      legend = _.range min + step, max, step
      options.legend = legend

      @heatmapOptions = options

    createMockData: (min = 0, max = 10) ->
      # generate values
#      timestamp = new Date().getTime() / 1000

      data = {}
      now = moment().startOf 'hour'


      # group by hour for three years data
      count = 24 * 365 * 3
      for i in [0...count]
#        timestamp = now.subtract(1, 'hours').toDate().getTime() / 1000
        timestamp = now.subtract(1, 'hours').unix()

        data[timestamp] = @getRandomInt min, max

      data

#    rewindCalendar: ->
#      @$scope.broadcast 'cal-heatmap-rewind', new Date

    selectDate: ->
      (date, value) =>
        @selectedDate =
          date: date
          value: value

#        @applyChange()

    initializeStationEvents: ->
      if @stationEvents
        # reset station events
        @stationEvents.setItems []
      else
        @stationEvents = new pm.PagingModel
          predicate: 'startTime'
          reverse: false
        @stationEvents.predicateItem = (event) =>
          @predicateStationEvent event

      # fill station events from events pool
      for key, event of @events
        @stationEvents.addItem event

      @stationEvents

    selectStation: (station) ->
      return if not super station

      @selectAllEquipmentTypes()

      @initializeStationEvents()
      @statisticStationEvents()

      return true

    statisticStationEvents: ->
      statistic = @getStatistic()

      for event in @stationEvents.items
        switch event.phase
          when 'start'
            statistic.counts.startEvents++
          when 'confirm'
            statistic.counts.confirmedEvents++
          when 'end'
            statistic.counts.endEvents++
          else
            # don't process completed event
            continue

        statistic.counts.allEvents++

        if statistic.severities.hasOwnProperty event.severity
          statistic.severities[event.severity] += 1
        else
          statistic.severities[event.severity] = 1

        if event.severity > statistic.severity
          statistic.severity = event.severity

#      @statisticColor = @getEventColor statistic.severity

      @eventStatistic = statistic

    getEventColor: (severity) ->
      color = @project?.dictionary.eventseverities.getItem(severity)?.model.color

    statisticEvents: ->
      # reset all count
      all = @getStatistic()
      @statistics = {}
      @statistics[ALL_EVENT_STATISTIC] = all

      for key, event of @events when event.phase isnt EVENT_COMPLETED
        key = "event-statistic/#{event.user}/#{event.project}/#{event.station}"
        statistic = @statistics[key]
        if not statistic
          statistic =  @getStatistic()
          @statistics[key] = statistic

        # count event phase
        switch event.phase
          when 'start'
            all.counts.startEvents++
            statistic.counts.startEvents++
          when 'end'
            all.endEvents++
            statistic.counts.endEvents++
          when 'confirm'
            all.confirmedEvents++
            statistic.counts.confirmedEvents++

        # count event severity
        if statistic.severities.hasOwnProperty event.severity
          statistic.severities[event.severity] += 1
        else
          statistic.severities[event.severity] = 1

        if all.severities.hasOwnProperty event.severity
          all.severities[event.severity] += 1
        else
          all.severities[event.severity] = 1

        if statistic.severity < event.severity
          statistic.severity = event.severity

        all.counts.allEvents++
        statistic.counts.allEvents++

#        statistic.color = @getEventColor statistic.severity

        # count by event type
        statistic.types ?= {}

        type = event.equipmentType

        if statistic.types.hasOwnProperty type
          statisticType = statistic.types[type]
          statisticType.count++
          statisticType.severity = event.severity if event.severity > statisticType.severity
        else
          statistic.types[type] =
            name: (_.find @project.dictionary.equipmenttypes.items, (tp)->tp.key is type)?.model.name
            type: type
            count: 1
            severity: event.severity
#            color: @getEventColor event.severity

      for station in @project.stations.items
        key = "event-statistic/#{station.model.user}/#{station.model.project}/#{station.model.station}"
        station.statistic = @statistics[key] ? @getStatistic()

      # count datacenters
      for datacenter in @datacenters
        datacenterStatistic = datacenter.statistic
        datacenterCounts = datacenterStatistic.counts
        datacenterSeverities = datacenterStatistic.severities

        # count by event type
        datacenterStatistic.types ?= {}

        for station in datacenter.stations
          stationStatistic = station.statistic
          stationCounts = stationStatistic.counts

          datacenterCounts.startEvents += stationCounts.startEvents
          datacenterCounts.endEvents += stationCounts.endEvents
          datacenterCounts.confirmedEvents += stationCounts.confirmedEvents
          datacenterCounts.allEvents += stationCounts.allEvents

          stationSeverities = stationStatistic.severities
          for k, v of stationSeverities
            datacenterSeverities[k] = (datacenterSeverities[k] ? 0) + v

          if datacenterStatistic.severity < stationStatistic.severity
            datacenterStatistic.severity = stationStatistic.severity
#            datacenterStatistic.color = stationStatistic.color

          for key, type of stationStatistic.types
            if datacenterStatistic.types.hasOwnProperty type.type
              statisticType = datacenterStatistic.types[type.type]
              statisticType.count += type.count
              statisticType.severity = type.severity if type.severity > statisticType.severity
            else
              datacenterStatistic.types[type.type] =
                type: type.type
                count: type.count
                severity: type.severity

      @eventStatistic = @station.statistic

      return

    getStatistic: () ->
      statistic =
        counts:
          confirmedEvents: 0
          startEvents: 0
          endEvents: 0
          allEvents: 0

        severities: {}
        severity: 0

    loadEventNotificationSetting: ->
      key = 'event-notification-setting'
      notification = @modelEngine.storage.get key

      @$rootScope.notificationSetting = notification ? {text: {enable: true}, audio: {enable: true}}

    saveEventNotificationSetting: ->
      key = 'event-notification-setting'
      @modelEngine.storage.set key, @$rootScope.notificationSetting

    selectPrevious: ->
      return if not @eventItems.length

      index = @eventItems.indexOf(@event) + 1
      return if index >= @eventItems.length

      @selectEvent @eventItems[index]

    selectNext: ->
      return if not @eventItems.length

      index = @eventItems.indexOf(@event) - 1
      return if index < 0

      @selectEvent @eventItems[index]

    selectEquipmentType: (type) ->
      if @equipmentTypes.hasOwnProperty(type.type)
        delete @equipmentTypes[type.type]
        @equipmentTypesCount--
      else
        @equipmentTypes[type.type] = type.type
        @equipmentTypesCount++

    selectAllEquipmentTypes: ->
      @equipmentTypes = {}
      @equipmentTypesCount = 0


  exports =
    EventManagerController: EventManagerController
