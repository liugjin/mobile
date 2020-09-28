###
* File: event-detail-directive
* User: David
* Date: 2019/01/19
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class EventDetailDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "event-detail"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: ($scope, element, attrs) =>
      $scope.ngMsgImg = @getComponentPath('image/no-msg.svg')
      $scope.currentEvent = null
      #console.log $scope.parameters

#      $scope.$watch 'event', (event) =>
#        console.log event
#        return if not event
#        @commonService.subscribeEventValue event, (event) =>
#          console.log event
#          return if not event or not event.data
#          processEvent event.data

#      $scope.$watch 'parameters.eventId', (event)=>
#        return if not event
#        subscribeEvents()

      # 订阅告警信息
      subscribeEvents = ()=>
        filter =
          user: $scope.project.model.user
          project: $scope.parameters.project
          station: $scope.parameters.stationId
          equipment: $scope.parameters.equipmentId
          event: $scope.parameters.eventId
        $scope.eventSubscriptions?.dispose()
        $scope.eventSubscriptions = @commonService.eventLiveSession.subscribeValues filter, (err, d) =>
          return if err
          processEvent d.message if d.message.startTime.toString() is $scope.parameters.startTime

      # 处理告警信号
      processEvent = (event) =>
        return if not event
        $scope.$applyAsync ()=>
          $scope.currentEvent = decorateEvent(event)
          # console.log $scope.currentEvent

      # 格式化告警信息
      decorateEvent = (event) ->
        #event.updateTime = event.endTime ? event.confirmTime ? event.startTime
        event.eventSeverity = $scope.project.typeModels.eventseverities.getItem(event.severity)?.model
        event.color = event.eventSeverity?.color ? @endColor
        endTime = if event.endTime then new Date(event.endTime) else new Date
        #event.duration = endTime - new Date(event.startTime)
        event.duration = moment(endTime).diff(event.startTime, 'hours', true).toFixed(2)
        event.startTime2 = new Date event.startTime
        event.endTime2 = new Date event.endTime if event.endTime
        event

      event = $scope.parameters.detail
      if event
        $scope.currentEvent = decorateEvent(JSON.parse(event))
        #console.log $scope.currentEvent

      if $scope.parameters.eventId
        subscribeEvents()

      $scope.goToEquip = (event) =>
        @publishEventBus "goEquip", {user: event.user, project: event.project, station: event.station, equipment: event.equipment}

    resize: ($scope)->

    dispose: ($scope)->
      $scope.eventSubscriptions?.dispose()

  exports =
    EventDetailDirective: EventDetailDirective
