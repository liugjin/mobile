###
* File: mobile-order-list-directive
* User: bingo
* Date: 2019/06/28
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileOrderListDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-order-list"
      super $timeout, $window, $compile, $routeParams, commonService
      @taskService = commonService.modelEngine.modelManager.getService("tasks")
      @processtypesService = commonService.modelEngine.modelManager.getService("processtypes")

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.orderImg = @getComponentPath('image/order.svg')
      prioritiesMap = { 1: "低", 2: "中", 3: "高" }
      @allData = []
      scope.processtypes = {}
      scope.data = []
      scope.currentType = ''
      scope.count = {}
      scope.openIndex = 0
      scope.toggle = false
      scope.lastQuery = scope.project.getIds()
      #展开工单
      scope.openTask = (index)=>
        if index != scope.openIndex
          scope.toggle = true
          scope.openIndex = index
        else
          scope.toggle = !scope.toggle
          scope.openIndex = index

      # 选择工单
      scope.selectOrder = (task) =>
        @commonService.publishEventBus("task-model", { open: true, task: task, isEdit: true })
      timeTranform = (d) => (
        return null if !d
        str = moment(d).format()
        return str.slice(0, 19).split("T").join(" ")
      ) 
      
      # 完成状态label
      colorMap = { 1: "#14C3F5", 2: "#F53914", 3: "#FF800B", 4: "#32CA59", 5: "#BECA32" }
      # 优先级label
      colorMap2 = { 1: "#14C3F5", 2: "#F53914", 3: "#FF800B", 4: "#32CA59", 5: "#BECA32" }
      # 告警等级
      colorMap3 = { 1: "#c0ca33", 2: "#ff9800", 3: "#ff8000", 4: "#ff0000" }
      
      scope.tableConfig = []

      changeTable = (type) => (
        if type == "defect"
          scope.tableConfig = [
            # { title: "工单号", id: "task", class: "task" },
            # { title: "工单类型", id: "type", class: "" },
            { title: "完成状态", id: "phase", class: "colorItem", color: colorMap, formate: (d) => @getStatusName(d) },
            { title: "最近更新时间", id: "updatetime", class: "time", formate: timeTranform },
            { title: "故障值", id: "source", formate: (d) -> d.startValue },
            { title: "故障原因", id: "source", formate: (d) -> d.title },
            { title: "故障开始时间", id: "source", formate: (d) => timeTranform(d?.startTime) },
            { title: "优先级", id: "priority", class: "colorItem", color: colorMap2, formate: (d) => prioritiesMap[d] },
            { title: "告警等级", id: "source", class: "colorItem", color: colorMap3 },
            { title: "创建人", id: "creator", class: "name", formate: (d) => d.name },
            { title: "备注", id: "memo", class: "" }
          ]
        else 
          scope.tableConfig = [
            # { title: "工单号", id: "task", class: "task" },
            { title: "工单名称", id: "name", class: "task" },
            # { title: "工单类型", id: "type", class: "" },
            { title: "完成状态", id: "phase", class: "colorItem", color: colorMap, formate: (d) => @getStatusName(d) },
            { title: "工单创建时间", id: "createtime", class: "time", formate: timeTranform }, 
            { title: "最近更新时间", id: "updatetime", class: "time", formate: timeTranform },
            { title: "优先级", id: "priority", class: "colorItem", color: colorMap2, formate: (d) => prioritiesMap[d] },
            { title: "创建人", id: "creator", class: "name", formate: (d) => d.name },
            { title: "备注", id: "memo", class: "" }
          ]
      )
      
      # 数据源获取
      getDataSource = (param, isInit) => (
        filter = scope.project.getIds()
        if isInit && !param
          filter["createtime"] = { 
            "$gte": moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'), 
            "$lte": moment().format('YYYY-MM-DD 23:59:59')
          }
        else
          filter = param
        scope.lastQuery = filter
        @commonService.loadProjectModelByService('tasks', filter, null, (err, resp) =>
          return @display("工单查询失败!!", 500) if !resp
          _data = _.filter(resp, (m) -> m.visible)
          @allData = _.groupBy(_data, (d) -> d.type)
          scope.count = _.mapObject(scope.count, (d, i) => 
            if _.has(@allData, i)
              return @allData[i].length
            else
              @allData[i] = []
              return 0
          )
          changeTable(scope.currentType)
          if isInit
            scope.data = @allData[scope.currentType]
          else
            scope.data = @allData[scope.currentType]
          scope.$applyAsync()
        , true)
      )
      
      getDataSourceLazy = _.throttle(getDataSource, 1000, { leading: false })

      # 初始化
      init = () => (
        if _.isEmpty(scope.processtypes)
          filter = scope.project.getIds()
          @processtypesService.query(filter, null, (err, datas) =>
            return @display("查询工单类型失败/为空!!", 500) if !datas or datas?.length == 0
            _datas = _.sortBy(_.filter(datas, (m) -> m.visible), (d) -> d._index)
            scope.currentType = _datas[0].type
            scope.processtypes = _.object(_.map(_datas, (d) -> d.type), _.map(_datas, (d) -> d.name))
            scope.count = _.mapObject(scope.processtypes, (d) -> 0)
            getDataSourceLazy(null, true)
          )
        else
          getDataSourceLazy(null, true)
      )

      init()

      # 工单操作
      scope.edit = (task) => @commonService.publishEventBus("task-model", { open: true, task, isEdit: true })

      # 详情查看
      scope.info = (task) => @commonService.publishEventBus("task-model", { open: true, task, isEdit: false })

      # 删除工单
      scope.delete = (task) => (
        @taskService.remove(task, (err, taskdata) =>
          return if err
          @dispose("删除成功", 500)
          getDataSourceLazy(scope.lastQuery, false)
        )
      )

      # 类型切换
      scope.changeType = (type) => (
        return if scope.currentType == type
        changeTable(type)
        scope.currentType = type
        scope.data = @allData[type]
        scope.$applyAsync()
      )

      

      # 订阅查询参数
      scope.subscribePage?.dispose()
      scope.subscribePage = @commonService.subscribeEventBus("task-query", (msg) =>
        return if !msg?.message
        if typeof(msg.message) != "string"
          query = msg.message
          query["createtime"] = { 
            "$gte": moment(msg.message.createtime["$gte"]).format('YYYY-MM-DD 00:00:00'), 
            "$lte": moment(msg.message.createtime["$lte"]).format('YYYY-MM-DD 23:59:59')
          }
          getDataSourceLazy(query, true) 
      )
      
      # 处理故障工单
      warpSource = (d, data) => (
        if data == ""
          return {
            "startTime": d.startTime,
            "station": d.station,
            "stationName": d.stationName,
            "equipment": d.equipment,
            "equipName": d.equipmentName,
            "event": d.event,
            "eventName": d.eventName,
            "startValue": d.startValue,
            "defect_representation": "",
            "defect_reason": d.title,
            "defect_analysis": "",
            "loss_situation": "",
            "work_status": d.work_status,
            "startTime": timeTranform(d.startTime),
            "severity": d.severity,
            "severityName": d.severityName
          }
        if data.startValue != d.startValue or data.startTime != timeTranform(d.startTime) or data.severity != d.severity
          return false
        data.startValue = d.startValue 
        data.startTime = timeTranform(d.startTime)
        data.severity = d.severity
        return data
      )  
      
      # 订阅工单变化
      scope.subPlanTaskChange?.dispose()
      scope.subPlanTaskChange = @commonService.configurationLiveSession.subscribe("tasks/" + scope.$root.user.user + "/#", (err, d) =>
        return if not d
        if d.topic.indexOf("configuration/task/create/") is 0 or d.topic.indexOf("configuration/task/update/") is 0
          if d.message.type == "defect"
            # 当为故障工单时, 先使用update更新json
            data = d.message.nodes[0].contents[0].content
            status = @getStatusName(d.message.phase)
            if status == 1 || status == 4
              task = d.message
              node = warpSource(d.message.source, data)
              if node
                task.nodes[0].contents[0].content = { 
                  content: [node], 
                  handle_details: [], 
                  attachments: [] 
                }
                @taskService.save(task, (err, taskData) =>
                  getDataSourceLazy(scope.lastQuery, false)
                , true)
                return
          getDataSourceLazy(scope.lastQuery, false)
      )
      
      scope.stateMap = { 1: "等待处理", 2: "拒绝", 3: "取消", 4: "进行中", 5: "已结束" }
      
    getStatusName: (phase) -> (
      status = 0
      if _.isEmpty(phase?.nextManager) && !(phase?.progress >= 0)
        status = 1
      else if phase?.state is "reject"
        status = 2
      else if phase?.state is "cancel"
        status = 3
      else if (phase?.progress < 1) || !_.isEmpty(phase?.nextManager)
        status = 4
      else
        status = 5
      return status
    )


    resize: (scope)->

    dispose: (scope)->
      scope.subscribePage?.dispose()
      scope.subPlanTaskChange?.dispose()

  exports =
    MobileOrderListDirective: MobileOrderListDirective
