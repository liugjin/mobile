###
* File: mobile-event-list-directive
* User: David
* Date: 2019/07/17
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment", "rx"], (base, css, view, _, moment, Rx) ->
  class MobileEventListDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-event-list"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.alarmImg = @getComponentPath('image/alarm.svg')
      scope.alarm1Img = @getComponentPath('image/alarm1.svg')
      scope.alarm2Img = @getComponentPath('image/alarm2.svg')
      scope.alarm3Img = @getComponentPath('image/alarm3.svg')
      scope.filterImg = @getComponentPath('image/filter.svg')
      scope.events = []
      scope.list = {}
      scope.allStation =
        key: 'all'
        model:
          station: 'all'
          name: '所有站点'
      scope.allSeverity =
        key: 'all'
        model:
          severity: 'all'
          name: '所有告警'
      scope.allPhase =
        key: 'all'
        model:
          phase: 'all'
          name: '所有状态'
      scope.eventSeverity = scope.allSeverity
      scope.stations = _.filter scope.project.stations.nitems
      scope.eventSeverities = _.sortBy scope.project.typeModels.eventseverities.items, (item) => item.model.severity
      scope.eventPhases = _.filter scope.project.typeModels.eventphases.items, (item) => item.model.phase isnt 'completed'

      scope.getEventColor = (severity) =>
        color = scope.project?.dictionary?.eventseverities?.getItem(severity)?.model.color
        color

      scope.selectEvent = (event) =>
        @publishEventBus "selectEvent", {
#          user: event.user,
          project: scope.project.model.project,
          station: scope.station.model.station,
#          equipment: event.equipment,
          event: event.event,
#          startTime: event.startTime,
          origin: 'tab.event',
          detail: JSON.stringify(event)
        }

      scope.filterEvent = () =>
        (event)=>
          text = scope.searchLists?.toLowerCase()
          return false if text and text != "" and event.equipmentName.indexOf(text) == -1 and event.eventName.indexOf(text) == -1
          return false if scope.eventSeverity.model.severity isnt "all" and event.severity isnt scope.eventSeverity.model.severity
          return true

      scope.selectStation = (station) =>
        scope.station = station
        element.find('#stations').hide()
        return true

      scope.selectEventSeverity = (event) =>
        scope.eventSeverity = event
        element.find('#events').hide()
        return true

      scope.filter = =>
        @processEvents scope
        instance = M.Modal.getInstance(element.find('#filter-event-modal')[0])
        instance.close()
        return

      if scope.firstload
        for station in scope.project.stations.nitems
          scope.list[station.model.station] = {}
        subject = new Rx.Subject
        filter =
          user: scope.project.model.user
          project: scope.project.model.project
        scope.eventSubscription?.dispose()
        scope.eventSubscription = @commonService.eventLiveSession.subscribeValues filter, (err, d) =>
          return if not d.message?.event
          event = d.message
          key = "#{event.user}.#{event.project}.#{event.station}.#{event.equipment}.#{event.event}.#{event.severity}.#{event.startTime}"
          scope.list[event.station]?[key] = event
          if scope.list[event.station]?.hasOwnProperty key
            delete scope.list[event.station][key] if event.endTime or event.phase in ["end", "completed"]
          subject.onNext()
        subject.debounce(50).subscribe =>
          @processEvents scope
      @processEvents scope

    processEvents: (scope) =>
      scope.events = []
      scope.station = _.find scope.project.stations.items, (item)->item.model.station is scope.station.model.station
      stations = @commonService.loadStationChildren scope.station, true
      list = _.map stations, (station)->station.model.station
      for key, value of scope.list
        if key in list
          scope.events = scope.events.concat _.values value
      scope.$applyAsync()

    resize: (scope)->

    dispose: (scope)->
      scope.eventSubscription?.dispose()

  exports =
    MobileEventListDirective: MobileEventListDirective
