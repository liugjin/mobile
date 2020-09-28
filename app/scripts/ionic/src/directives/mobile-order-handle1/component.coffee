###
* File: mobile-order-handle1-directive
* User: David
* Date: 2019/08/06
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileOrderHandle1Directive extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-order-handle1"
      super $timeout, $window, $compile, $routeParams, commonService
      @taskService = commonService.modelEngine.modelManager.getService("tasks")

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.signalSubscriptions = {}
      scope.severities = {}
      _.each scope.project.dictionary.eventseverities.items, (item)->
        scope.severities[item.model.severity] = {name: item.model.name, color: item.model.color, value: 0}

      @queryTaskReport scope
      scope.getMaxValue = (variable) ->
        return if not variable
        values = _.values variable
        ret = _.max values if values.length > 0
        ret = "" if values.length is 0
        ret

      # 重新填写
      scope.refreshData = () =>
        scope.comment = ""

      # 提交上传
      scope.uploadData = () =>
        content = {}
        node = _.find scope.task.nodes, (node) => node.node is scope.task.phase.nextNode
        if node
          if _.isEmpty node.contents
            node.contents = []
          content.severities = scope.severities
          content.ups1 = scope.ups1
          content.ups2 = scope.ups2
          content.distributor = scope.distributor
          content.battery = scope.battery
          content.ac1 = scope.ac1
          content.ac2 = scope.ac2
          content.ac3 = scope.ac3
          content.th1 = scope.th1
          content.th2 = scope.th2
          content.th3 = scope.th3
          content.th4 = scope.th4
          content.th5 = scope.th5
          content.th6 = scope.th6
          content.water1 = scope.water1
          content.water2 = scope.water2
          content.water3 = scope.water3
          content.water4 = scope.water4
          content.water5 = scope.water5
          content.comment = scope.comment if scope.comment
          node.contents.push { content: content }
          @updateNode scope, node, "approval", (err, result) =>
            if result
              @publishEventBus "updateNodeResult", { result: true, err: err }
            else
              @publishEventBus "updateNodeResult", { result: false, err: err }

      @subscribeEvents scope
      scope.ups1 = {loadRate:{}}
      @subscribeSignal scope, "center-wuhan", "ups1", "a-phase--output-load-percentage", (msg) ->
        scope.ups1.loadRate.a = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "ups1", "b-phase--output-load-percentage", (msg) ->
        scope.ups1.loadRate.b = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "ups1", "c-phase--output-load-percentage", (msg) ->
        scope.ups1.loadRate.c = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "ups1", "_alarms", (msg) ->
        scope.ups1.alarms = msg.value > 0

      scope.ups2 = {loadRate:{}}
      @subscribeSignal scope, "center-wuhan", "ups2", "a-phase--output-load-percentage", (msg) ->
        scope.ups2.loadRate.a = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "ups2", "b-phase--output-load-percentage", (msg) ->
        scope.ups2.loadRate.b = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "ups2", "c-phase--output-load-percentage", (msg) ->
        scope.ups2.loadRate.c = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "ups2", "_alarms", (msg) ->
        scope.ups2.alarms = msg.value > 0

      scope.distributor = {voltage:{}}
      @subscribeSignal scope, "center-wuhan", "meter4", "phase-a-voltage", (msg) ->
        scope.distributor.voltage.a = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "meter4", "phase-b-voltage", (msg) ->
        scope.distributor.voltage.b = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "meter4", "phase-c-voltage", (msg) ->
        scope.distributor.voltage.c = parseFloat msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "meter4", "_alarms", (msg) ->
        scope.distributor.alarms = msg.value > 0

      scope.battery = {}
      @subscribeSignal scope, "center-wuhan", "th13", "temperature", (msg) ->
        scope.battery.temperature = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th13", "humidity", (msg) ->
        scope.battery.humidity = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th13", "_alarms", (msg) ->
        scope.battery.alarms = msg.value > 0

      scope.ac1 = {}
      @subscribeSignal scope, "center-wuhan", "ac1", "_alarms", (msg) ->
        scope.ac1.alarms = msg.value > 0
        scope.ac1.status = if msg.value > 0 then "告警" else "正常"
      scope.ac2 = {}
      @subscribeSignal scope, "center-wuhan", "ac2", "_alarms", (msg) ->
        scope.ac2.alarms = msg.value > 0
        scope.ac2.status = if msg.value > 0 then "告警" else "正常"
      scope.ac3 = {}
      @subscribeSignal scope, "center-wuhan", "ac3", "_alarms", (msg) ->
        scope.ac3.alarms = msg.value > 0
        scope.ac3.status = if msg.value > 0 then "告警" else "正常"

      scope.th1 = {}
      @subscribeSignal scope, "center-wuhan", "th1", "temperature", (msg) ->
        scope.th1.temperature = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th1", "humidity", (msg) ->
        scope.th1.humidity = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th1", "_alarms", (msg) ->
        scope.th1.alarms = msg.value > 0

      scope.th2 = {}
      @subscribeSignal scope, "center-wuhan", "th4", "temperature", (msg) ->
        scope.th2.temperature = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th4", "humidity", (msg) ->
        scope.th2.humidity = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th4", "_alarms", (msg) ->
        scope.th2.alarms = msg.value > 0

      scope.th3 = {}
      @subscribeSignal scope, "center-wuhan", "th5", "temperature", (msg) ->
        scope.th3.temperature = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th5", "humidity", (msg) ->
        scope.th3.humidity = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th5", "_alarms", (msg) ->
        scope.th3.alarms = msg.value > 0

      scope.th4 = {}
      @subscribeSignal scope, "center-wuhan", "th7", "temperature", (msg) ->
        scope.th4.temperature = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th7", "humidity", (msg) ->
        scope.th4.humidity = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th7", "_alarms", (msg) ->
        scope.th4.alarms = msg.value > 0

      scope.th5 = {}
      @subscribeSignal scope, "center-wuhan", "th9", "temperature", (msg) ->
        scope.th5.temperature = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th9", "humidity", (msg) ->
        scope.th5.humidity = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th9", "_alarms", (msg) ->
        scope.th5.alarms = msg.value > 0

      scope.th6 = {}
      @subscribeSignal scope, "center-wuhan", "th12", "temperature", (msg) ->
        scope.th6.temperature = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th12", "humidity", (msg) ->
        scope.th6.humidity = msg.value.toFixed(1)
      @subscribeSignal scope, "center-wuhan", "th12", "_alarms", (msg) ->
        scope.th6.alarms = msg.value > 0

      scope.water1 = {}
      @subscribeSignal scope, "center-wuhan", "water1", "location-water2", (msg) ->
        scope.water1.alarms = msg.value > 0
      scope.water2 = {}
      @subscribeSignal scope, "center-wuhan", "water2", "location-water2", (msg) ->
        scope.water2.alarms = msg.value > 0
      scope.water3 = {}
      @subscribeSignal scope, "center-wuhan", "water3", "location-water2", (msg) ->
        scope.water3.alarms = msg.value > 0
      scope.water4 = {}
      @subscribeSignal scope, "center-wuhan", "water4", "location-water2", (msg) ->
        scope.water4.alarms = msg.value > 0
      scope.water5 = {}
      @subscribeSignal scope, "center-wuhan", "water5", "location-water6", (msg) ->
        scope.water5.alarms = msg.value > 0

# 更新节点
    updateNode: (scope, node, action, callback) =>
      schema = @taskService.url
      url = @taskService.replaceUrlParam schema, scope.task, true
      url += "/#{node.node}"
      user = scope.$root.user
      phase =
        _id: node._id
        node: node.node
        parameters: node.parameters
        contents: node.contents
        state: action
        timestamp: new Date
        manager:
          id: user.user
          name: user.name
      if action is 'forward'
        phase.forwarder = node.forwarder
      data =
        _id: scope.task._id
        data: phase
      @taskService.postData url, data, (err, result) =>
        callback? err, result

    subscribeEvents: (scope)=>
      events = {}
      filter =
        user: scope.project.model.user
        project: scope.project.model.project
      scope.eventSubscriptions?.dispose()
      scope.eventSubscriptions = @commonService.eventLiveSession.subscribeValues filter, (err, event) =>
        evt = event?.message
        key = "#{evt.user}.#{evt.project}.#{evt.station}.#{evt.equipment}.#{evt.evt}.#{evt.severity}.#{evt.startTime}"
        if not events[key] and not evt.endTime
          if scope.severities[evt.severity]
            scope.severities[evt.severity].value += 1
        else if events[key] and not events[key].endTime and evt.endTime
          scope.severities[evt.severity].value -= 1
        events[key] = evt

    subscribeSignal: (scope, station, equipment, signal, callback) =>
      filter =
        user: scope.project.model.user
        project: scope.project.model.project
        station: station ? "+"
        equipment: equipment ? "+"
        signal: signal ? "+"
      scope.signalSubscriptions[station+"."+equipment+"."+signal]?.dispose()
      scope.signalSubscriptions[station+"."+equipment+"."+signal] = @commonService.signalLiveSession.subscribeValues filter, (err, signal) =>
        sig = signal?.message
        callback? sig

    queryTaskReport: (scope) =>
      @commonService.loadProjectModelByService 'tasks', {task: scope.parameters.orderId}, 'user _id  project type process name creator task phase nodes createtime', (err, taskModels) =>
        return if err or not taskModels
        scope.task = taskModels

    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileOrderHandle1Directive: MobileOrderHandle1Directive
