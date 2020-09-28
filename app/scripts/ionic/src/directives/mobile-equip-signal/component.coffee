###
* File: mobile-equip-signal-directive
* User: bingo
* Date: 2019/02/28
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileEquipSignalDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-equip-signal"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attr) =>
      scope.communicationStatus = true

      scope.equipment.loadProperties null, (err, properties) =>
        signals = scope.equipment.getPropertyValue("_signals")
        scope.items = _.map(JSON.parse(signals), (item)->item.signal) if !_.isEmpty signals
      ,true

      # 监听设备变化
      scope.subscribeEquipSignal?.dispose()
      scope.subscribeEquipSignal = @commonService.subscribeEquipmentSignalValues scope.equipment, (signal) =>
        if signal
          if signal.model.signal is "communication-status"
            if signal.data.value == 0
              scope.communicationStatus = true
            else
              scope.communicationStatus = false
#          signal.setValue d.message
#          processSignalData signal.data

      scope.getColorBySeverity = (severity) ->
        return '#bdbdbd' if not severity?
        item = scope.project?.typeModels.eventseverities.getItem(severity)?.model
        item?.color ? "#0faa57"

      scope.getNameBySeverity = (severity) ->
        return "信号无值" if not severity?
        item = scope.project?.typeModels.eventseverities.getItem(severity)?.model
        item?.name ? "正常"

      processSignalData = (data) =>
        return if not data
        severity = scope.project?.typeModels.eventseverities.getItem(data.severity)?.model
        data.color = severity?.color ? '#0faa57'
        data.tooltip = severity?.name ? '正常'
        data.eventSeverity = severity
        data.unitName = scope.project?.typeModels.signaltypes.getItem(data.unit)?.model?.unit
        data.tooltip = '信号无值' if not data.value and not data.formatValue.toString()
        data.color = '#bdbdbd' if not data.value and not data.formatValue.toString()

      scope.selectSignal = (signal) =>
        return if not signal
        @publishEventBus 'signalId', { stationId: signal.equipment.model.station, equipmentId: signal.equipment.model.equipment, signalId: signal.model.signal }

      scope.navigate = (signal) =>
        if signal.model.dataType is 'float'
          @publishEventBus "navigateTo", {stationId: scope.equipment.model.station, equipmentId: scope.equipment.model.equipment, signalId: signal.model.signal}
        return

      # 过滤信号
      scope.filterSignal = () =>
        (signal) =>
          return false if signal.model.visible is false
          return false if scope.items and signal.model.signal not in scope.items
          return true

    resize: (scope)->

    dispose: (scope)->
      scope.subscribeEquipSignal?.dispose()

  exports =
    MobileEquipSignalDirective: MobileEquipSignalDirective
