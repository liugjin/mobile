###
* File: mobile-equipment-overview-directive
* User: David
* Date: 2019/01/19
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileEquipmentOverviewDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-equipment-overview"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.setting = setting
      scope.navigate = (signal)=>
        @publishEventBus "navigateTo", {stationId: scope.equipment.model.station, equipmentId:scope.equipment.model.equipment, signalId:signal.model.signal}

      closeFullScreen =  ->
        if document.exitFullscreen
          document.exitFullscreen()
        else if document.mozCancelFullScreen
          document.mozCancelFullScreen()
        else if document.webkitCancelFullScreen
          document.webkitCancelFullScreen()
        else if document.msExitFullscreen
          document.msExitFullscreen()

      scope.fullGraphic = =>
        if document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
          closeFullScreen()
        else
          scope.controller.fullscreen "#graphic"

      scope.$watch "equipment", (equipment) =>
        scope.equipmentStatus = 0
        scope.equipmentSubscription?.dispose()
        return if not equipment
#        equipment.loadEquipmentTemplate null, (err, template) =>
#          scope.templateId = scope.equipment.getTemplateValue 'graphic'
#          scope.templateParameters = {station: scope.station.model.station, equipment: scope.equipment.model.equipment}

        scope.equipmentSubscription = @commonService.subscribeEquipmentSignalValues equipment, (signal) =>
          if signal.model.signal is "communication-status"
            scope.equipmentStatus = signal.data.value
          @processSignalData scope,signal.data
          scope.$applyAsync()

        getShowSignal equipment,(signalDatas) =>
          scope.signalComponent = signalDatas
          @getProperty scope, '_signals'

      scope.$watch 'property', (property)=>
        return if not property
        _signals = JSON.parse(property.value)
        signals = []
        for s in _signals
          item = _.find scope.equipment.signals.items, (item) -> item.model.signal is s.signal
          signals.push item if item
        scope.signalComponent = signals

      getShowSignal = (equip,callback) =>
        equip.loadSignals null, (err, signals)=>
          unit = getUnit()
          signalList = []
          _.map signals, (a) ->
            signalList.push a if a.model.signal != "communication-status"
          callback? signalList
        ,true

      getUnit = () ->
        return scope.project.dictionary.units.items

    processSignalData:(scope,data) ->
      severity = scope.project?.typeModels.eventseverities.getItem(data.severity)?.model
      data.color = severity?.color ? '#0faa57'
      data.tooltip = severity?.name ? '信号正常'
      data.eventSeverity = severity
      data.unit = scope.project?.typeModels.signaltypes.getItem(data.unit)?.model?.unit
      if severity && !data.isalarm && navigator.vibrate
        data.isalarm = true  #已经告警过
        navigator.vibrate 200

    resize: (scope)->

    dispose: (scope)->
      scope.equipmentSubscription?.dispose()


  exports =
    MobileEquipmentOverviewDirective: MobileEquipmentOverviewDirective
