###
* File: mobile-equip-event-directive
* User: bingo
* Date: 2019/01/19
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileEquipEventDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-equip-event"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.alarmImg = @getComponentPath('image/alarm.svg')
      scope.alarmEImg = @getComponentPath('image/e-alarm.svg')
      events = {}
      startEvents = {}
      scope.eventItems = []
      scope.toggle = false

      scope.selectEvent = (event) ->
        if scope.currentEvent and event.event is scope.currentEvent.event
          scope.toggle = !scope.toggle
        else
          scope.toggle = true
          endTime = if event.endTime then new Date(event.endTime) else new Date
          event.duration = moment(endTime).diff(event.startTime, 'hours', true).toFixed(2)
          scope.currentEvent = event

      scope.returnEvents = ->
        scope.currentEvent = null

      processEvent = (data) ->
        return if not data
        message = data
        key = "#{message.user}.#{message.project}.#{message.station}.#{message.equipment}.#{message.event}.#{message.severity}.#{message.startTime}"
        if events.hasOwnProperty key
          event = events[key]
          for k, v of message
            event[k] = v
          if event.endTime
            delete startEvents[key]
        else
          event = angular.copy message
          events[key] = event
          if event.phase is 'start' or event.phase is 'confirm'
            scope.eventItems.push event
          startEvents[key] = event if not event.endTime
        if message.phase is 'completed'
          event = events[key]
          delete events[key]
          scope.eventItems.splice scope.eventItems.indexOf(event), 1
          delete startEvents[key]

      scope.eventSubscriptions?.dispose()
      scope.eventSubscriptions = @commonService.subscribeEquipmentEventValues scope.equipment, (event) =>
        processEvent(event.data)

    resize: (scope)->

    dispose: (scope)->
      scope.eventSubscriptions?.dispose()


  exports =
    MobileEquipEventDirective: MobileEquipEventDirective
