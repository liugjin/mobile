###
* File: mobile-order-detail-directive
* User: bingo
* Date: 2019/06/28
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileOrderDetailDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-order-detail"
      super $timeout, $window, $compile, $routeParams, commonService
      @taskService = commonService.modelEngine.modelManager.getService("tasks")

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: ($scope, element, attrs) =>
      $scope.equipSubscription = {}
      $scope.task = null
      $scope.checkContent = null
      $scope.checkAllValues = {}
      $scope.currTask =
        memo: ""
        name: ""
      #console.log @taskService

      # 初始化工单数据
      initData = () =>
        $scope.currTask =
          memo: ""
          name: ""
        $scope.checkContent = [
          {
            equiptype: "ups",
            equiptypeName: "UPS状态",
            equips: [
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "ups1",
                equipmentName: "艾默生1#",
                value: [
                  { signal: "phase--output-load-percentage", name: "负载容量", value: 0, checked: true },
                  { signal: "communication-status", name: "运行状态", value: 0, checked: true }
                ],
                checked: true
              },
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "ups2",
                equipmentName: "艾默生2#",
                value: [
                  { signal: "phase--output-load-percentage", name: "负载容量", value: 0, checked: true },
                  { signal: "communication-status", name: "运行状态", value: 0, checked: true }
                ],
                checked: true
              }]
          }
          {
            equiptype: "environmental",
            equiptypeName: "温湿状态",
            equips: [
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "th1",
                equipmentName: "中心机房",
                value: [
                  { signal: "temperature", name: "温度", value: 0, checked: true },
                  { signal: "humidity", name: "湿度", value: 0, checked: true }
                ],
                checked: true
              },
              {
                station: "battery-room",
                stationName: "中心机房",
                equipment: "th16",
                equipmentName: "电池室",
                value: [
                  { signal: "temperature", name: "温度", value: 0, checked: true },
                  { signal: "humidity", name: "湿度", value: 0, checked: true }
                ],
                checked: true
              }]
          }
          {
            equiptype: "meter",
            equiptypeName: "配电柜电压值",
            equips: [
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "meter4",
                equipmentName: "一楼总配电柜",
                value: 0,
                checked: true
              }
            ]
          }
          {
            equiptype: "systemstatus",
            equiptypeName: "系统状况",
            equips: [
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "ac1",
                equipmentName: "空调1#",
                value: "",
                checked: true
              }
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "spm1",
                equipmentName: "SPM1#",
                value: "",
                checked: true
              }
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "donghuan",
                equipmentName: "动环系统",
                value: "",
                checked: true
              }
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "video",
                equipmentName: "摄像系统",
                value: "",
                checked: true
              }
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "access",
                equipmentName: "门禁系统",
                value: "",
                checked: true
              }
              {
                station: "center-qianjiang",
                stationName: "中心机房",
                equipment: "xinfeng",
                equipmentName: "新风系统",
                value: "",
                checked: true
              }
            ]
          }
        ]
        $scope.checkAllValues[$scope.checkContent[0].equips[0].equipmentName+$scope.checkContent[0].equips[0].value[0].name] = $scope.checkContent[0].equips[0].value[0].checked
        $scope.checkAllValues[$scope.checkContent[0].equips[0].equipmentName+$scope.checkContent[0].equips[0].value[1].name] = $scope.checkContent[0].equips[0].value[1].checked
        $scope.checkAllValues[$scope.checkContent[0].equips[1].equipmentName+$scope.checkContent[0].equips[1].value[0].name] = $scope.checkContent[0].equips[1].value[0].checked
        $scope.checkAllValues[$scope.checkContent[0].equips[1].equipmentName+$scope.checkContent[0].equips[1].value[1].name] = $scope.checkContent[0].equips[1].value[1].checked
        $scope.checkAllValues[$scope.checkContent[1].equips[0].equipmentName+$scope.checkContent[1].equips[0].value[0].name] = $scope.checkContent[1].equips[0].value[0].checked
        $scope.checkAllValues[$scope.checkContent[1].equips[0].equipmentName+$scope.checkContent[1].equips[0].value[1].name] = $scope.checkContent[1].equips[0].value[1].checked
        $scope.checkAllValues[$scope.checkContent[1].equips[1].equipmentName+$scope.checkContent[1].equips[1].value[0].name] = $scope.checkContent[1].equips[1].value[0].checked
        $scope.checkAllValues[$scope.checkContent[1].equips[1].equipmentName+$scope.checkContent[1].equips[1].value[1].name] = $scope.checkContent[1].equips[1].value[1].checked
        $scope.checkAllValues[$scope.checkContent[2].equips[0].equipmentName] = $scope.checkContent[2].equips[0].checked
        $scope.checkAllValues[$scope.checkContent[3].equips[0].equipmentName] = $scope.checkContent[3].equips[0].checked
        $scope.checkAllValues[$scope.checkContent[3].equips[1].equipmentName] = $scope.checkContent[3].equips[1].checked
        $scope.checkAllValues[$scope.checkContent[3].equips[2].equipmentName] = $scope.checkContent[3].equips[2].checked
        $scope.checkAllValues[$scope.checkContent[3].equips[3].equipmentName] = $scope.checkContent[3].equips[3].checked
        $scope.checkAllValues[$scope.checkContent[3].equips[4].equipmentName] = $scope.checkContent[3].equips[4].checked
        $scope.checkAllValues[$scope.checkContent[3].equips[5].equipmentName] = $scope.checkContent[3].equips[5].checked

      # 查询工单报表
      queryTaskReport = () =>
        @commonService.loadProjectModelByService 'tasks', {task: $scope.parameters.orderId}, 'user _id  project type process name creator task phase nodes createtime', (err, taskModels) =>
          #console.log(taskModels)
          return if err or not taskModels
          $scope.task = taskModels

      # 通讯状态数据转换
      getStatus = (value) =>
        str = ""
        if value == 0
          str = "正常"
        else
          str = "异常"
        return str

      # 处理信号
#      processSignal = (data) =>
#        if data.equipment is "ups1"
#          if data.signal is "a-phase--output-load-percentage" or data.signal is "b-phase--output-load-percentage" or data.signal is "c-phase--output-load-percentage"
#            if $scope.checkContent[0].equips[0].value[0].value < data.value
#              $scope.checkContent[0].equips[0].value[0].value = data.value.toFixed(2)
#          if data.signal is "communication-status"
#            $scope.checkContent[0].equips[0].value[1].value = getStatus(data.value)
#        if data.equipment is "ups2"
#          if data.signal is "a-phase--output-load-percentage" or data.signal is "b-phase--output-load-percentage" or data.signal is "c-phase--output-load-percentage"
#            if $scope.checkContent[0].equips[1].value[0].value < data.value
#              $scope.checkContent[0].equips[1].value[0].value = data.value.toFixed(2)
#          if data.signal is "communication-status"
#            $scope.checkContent[0].equips[1].value[1].value = getStatus(data.value)
#        if data.equipment is "th1"
#          if data.signal is "temperature"
#            $scope.checkContent[1].equips[0].value[0].value = data.value.toFixed(2)
#          if data.signal is "humidity"
#            $scope.checkContent[1].equips[0].value[1].value = data.value.toFixed(2)
#        if data.equipment is "th15"
#          if data.signal is "temperature"
#            $scope.checkContent[1].equips[1].value[0].value = data.value.toFixed(2)
#          if data.signal is "humidity"
#            $scope.checkContent[1].equips[1].value[1].value = data.value.toFixed(2)
#        if data.equipment is "meter4"
#          if data.signal is "phase-a-voltage" or data.signal is "phase-b-voltage" or data.signal is "phase-c-voltage"
#            if $scope.checkContent[2].equips[0].value < data.value
#              $scope.checkContent[2].equips[0].value = data.value.toFixed(2)
#        return

      # 订阅站点中设备的信号
      subscribeStationSignal = () =>
        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups1"
          signal:"a-phase--output-load-percentage"

        $scope.equipSubscription["center-qianjiang"+"ups1"+"a-phase--output-load-percentage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups1"+"a-phase--output-load-percentage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[0].equips[0].value[0].value < d.message.value
            $scope.checkContent[0].equips[0].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups1"
          signal:"b-phase--output-load-percentage"

        $scope.equipSubscription["center-qianjiang"+"ups1"+"b-phase--output-load-percentage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups1"+"b-phase--output-load-percentage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[0].equips[0].value[0].value < d.message.value
            $scope.checkContent[0].equips[0].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups1"
          signal:"c-phase--output-load-percentage"

        $scope.equipSubscription["center-qianjiang"+"ups1"+"c-phase--output-load-percentage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups1"+"c-phase--output-load-percentage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[0].equips[0].value[0].value < d.message.value
            $scope.checkContent[0].equips[0].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups2"
          signal:"a-phase--output-load-percentage"

        $scope.equipSubscription["center-qianjiang"+"ups2"+"a-phase--output-load-percentage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups2"+"a-phase--output-load-percentage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[0].equips[1].value[0].value < d.message.value
            $scope.checkContent[0].equips[1].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups2"
          signal:"b-phase--output-load-percentage"

        $scope.equipSubscription["center-qianjiang"+"ups2"+"b-phase--output-load-percentage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups2"+"b-phase--output-load-percentage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[0].equips[1].value[0].value < d.message.value
            $scope.checkContent[0].equips[1].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups2"
          signal:"c-phase--output-load-percentage"

        $scope.equipSubscription["center-qianjiang"+"ups2"+"c-phase--output-load-percentage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups2"+"c-phase--output-load-percentage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[0].equips[1].value[0].value < d.message.value
            $scope.checkContent[0].equips[1].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups1"
          signal:"communication-status"

        $scope.equipSubscription["center-qianjiang"+"ups1"+"communication-status"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups1"+"communication-status"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          $scope.checkContent[0].equips[0].value[1].value = getStatus(d.message.value)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "ups2"
          signal:"communication-status"

        $scope.equipSubscription["center-qianjiang"+"ups2"+"communication-status"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"ups2"+"communication-status"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          $scope.checkContent[0].equips[1].value[1].value = getStatus(d.message.value)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "th1"
          signal:"temperature"

        $scope.equipSubscription["center-qianjiang"+"th1"+"temperature"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"th1"+"temperature"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          $scope.checkContent[1].equips[0].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "th1"
          signal:"humidity"

        $scope.equipSubscription["center-qianjiang"+"th1"+"humidity"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"th1"+"humidity"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          $scope.checkContent[1].equips[0].value[1].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "battery-room"
          equipment: "th16"
          signal:"temperature"

        $scope.equipSubscription["battery-room"+"th16"+"temperature"]?.dispose()
        $scope.equipSubscription["battery-room"+"th16"+"temperature"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          $scope.checkContent[1].equips[1].value[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "battery-room"
          equipment: "th16"
          signal:"humidity"

        $scope.equipSubscription["battery-room"+"th16"+"humidity"]?.dispose()
        $scope.equipSubscription["battery-room"+"th16"+"humidity"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          $scope.checkContent[1].equips[1].value[1].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "meter4"
          signal:"phase-a-voltage"

        $scope.equipSubscription["center-qianjiang"+"meter4"+"phase-a-voltage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"meter4"+"phase-a-voltage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[2].equips[0].value < d.message.value
            $scope.checkContent[2].equips[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "meter4"
          signal:"phase-b-voltage"

        $scope.equipSubscription["center-qianjiang"+"meter4"+"phase-b-voltage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"meter4"+"phase-b-voltage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[2].equips[0].value < d.message.value
            $scope.checkContent[2].equips[0].value = d.message.value.toFixed(2)
        ,true

        filter =
          user: $scope.project.model.user
          project: $scope.project.model.project
          station: "center-qianjiang"
          equipment: "meter4"
          signal:"phase-c-voltage"

        $scope.equipSubscription["center-qianjiang"+"meter4"+"phase-c-voltage"]?.dispose()
        $scope.equipSubscription["center-qianjiang"+"meter4"+"phase-c-voltage"] = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if err
          if $scope.checkContent[2].equips[0].value < d.message.value
            $scope.checkContent[2].equips[0].value = d.message.value.toFixed(2)
        ,true
      initData()
      queryTaskReport()
      subscribeStationSignal()

      $scope.checkedChange = (objId, data) =>
        $scope.checkAllValues[objId] = data

      # 重新填写数据
      $scope.refreshData = () =>
        initData()
        subscribeStationSignal()

      # 提交上传
      $scope.uploadData = () =>
        #console.log $scope.checkContent
        tmpAllValues = _.values $scope.checkAllValues
        for item in tmpAllValues
          if !item
            @display "温馨提示：有部分漏巡检，请查证！"
            return
        node = _.find $scope.task.nodes, (node) => node.node is $scope.task.phase.nextNode
        if node
#          node.contents = []
#          node.contents.push $scope.checkContent
#          node.contents.push $scope.currTask.memo
#          if _.isEmpty node.contents
#            node.contents = []
#            node.contents[0] = $scope.checkContent
#            node.contents[1] = $scope.currTask.memo
#          else
#            $scope.checkContent.push $scope.currTask.memo
#            scope.selectNode.contents.push { content: $scope.checkContent }
          if _.isEmpty node.contents
            node.contents = []
          $scope.checkContent.push $scope.currTask.memo
          node.contents.push { content: $scope.checkContent }
          updateNode node, "approval", (err, result) =>
            #console.log result
            if result
              @publishEventBus "updateNodeResult", { result: true, err: err }
            else
              @publishEventBus "updateNodeResult", { result: false, err: err }

      # 更新节点
      updateNode = (node, action, callback) =>
        #console.log node
        schema = @taskService.url
        url = @taskService.replaceUrlParam schema, $scope.task, true
        url += "/#{node.node}"
        #@updateNodeTemplates node
        user = $scope.$root.user
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
          _id: $scope.task._id
          data: phase
        #console.log url, data
        # update node to server
        @taskService.postData url, data, (err, result) =>
  #        @display err, "流程节点[#{node.node}]提交成功"
          callback? err, result

    resize: ($scope)->

    dispose: ($scope)->
      _.mapObject $scope.equipSubscription,(equipSubscriptionItem)->
        equipSubscriptionItem?.dispose()

  exports =
    MobileOrderDetailDirective: MobileOrderDetailDirective
