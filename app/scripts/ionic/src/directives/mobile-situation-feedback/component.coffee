###
* File: mobile-situation-feedback-directive
* User: David
* Date: 2019/11/13
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileSituationFeedbackDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-situation-feedback"
      super $timeout, $window, $compile, $routeParams, commonService
      @taskService = commonService.modelEngine.modelManager.getService("tasks")
    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      element.find('.modal').modal()
      # 新增
      scope.addFeedback = (type)=>
        scope.handle = false
        scope.detailType = type
        scope.addModel = {
          content: "", memo: "", id: "",
          utl: "", type: "", name: ""
        }

      severityMap = {}
      _.each(scope.project.dictionary.eventseverities.items, (d) =>
        severityMap[d.model.severity] = d.model.name
      )
      # 工作内容 - 展示数据
      scope.works = []
      scope.memos = []
      scope.files = []
      
      timeTranform = (d) => (
        return null if !d
        return moment(d).utcOffset(480).format('YYYY-MM-DD HH:MM:SS')
      )
      
      # 实时订阅
      if scope.subscribeSigs
        for x in scope.subscribeSigs
          x?.dispose()
      scope.subscribeSigs = {}
      scope.subscribeSigVal = {}
      
      # task: 2: 修改,  1: 信息查看
      scope.showType = 1

      scope.showBtns = {
        accept: false, # 接收
        approval: false, # 批准
        reject: false, # 拒绝
        cancel: false, # 撤销
        save: false # 保存
      }

      scope.detailType = 1
      scope.handle = false
      

      getData = (data, attr) => (
        filter = scope.project.getIds()
        if _.has(data, attr) and data[attr]?.length > 0
          if attr == "content" && scope.task.type == "plan"
            return _.map(data[attr], (d, i) =>
              filter.station = d.station
              filter.equipment = d.equipment
              filter.signal = d.signal
              key = d.station + "-" + d.equipment + "-" + d.signal
              scope.subscribeSigs[key] = @commonService.signalLiveSession.subscribeValues(filter, (err, m) =>
                scope.subscribeSigVal[key] = m?.message?.value if m
              )
              if !d["status"]
                d["status"] = 0
              if typeof(d["status"]) == "string" 
                d["status"] = parseInt(d["status"])

              if typeof(d["work_status"]) != "boolean" 
                d["work_status"] = if parseInt(d["work_status"]) == 1 then true else false

              return d
            )
          else if attr == "content" && scope.task.type == "defect"
            return _.map(data[attr], (d, i) =>
              if typeof(d["work_status"]) != "boolean" 
                d["work_status"] = if d["work_status"] == 1 then true else false
              return d
            )
          else if attr == "attachments"
            return _.map(data[attr], (d, i) =>
              d.url = if typeof(d?.url) == "string" then d.url else ""
              return d
            )
          return data[attr]
        return []
      )

      getCurrentNode = () => (
        nodes = getData(scope.task, "nodes")
        nextNode = scope.task?.phase?.nextNode
        node = scope.task?.phase?.node
        if nextNode
          return _.find(nodes, (n) => n.node == nextNode)
        else if node
          return _.find(nodes, (n) => n.node == node)
        return nodes?[0]
      )

      # 更新工作项链
      scope.workRouter = []
      nodeImage = @getComponentPath('images/startnode.png')
      nodeImage2 = @getComponentPath('images/startnode-red.png')
      endNodeImage = @getComponentPath('images/endnode.png')
      endNodeImage2 = @getComponentPath('images/endnode-red.png')

      updateWorkLine = (works, state, isEdit) => (
        scope.works = _.map(works, (d) =>
          d.severityName = severityMap[d.severity]
          return d
        )
        scope.workRouter = _.map(_.groupBy(works, (d) -> d.station + "_" + d.equipment), (m, i) => (
          isWarn = _.find(m, (n) => n.status == 1 or n.status == '1')
          return {
            name: m[0].stationName + "." + m[0].equipName,
            station: m[0].station,
            equipment: m[0].equipment,
            signals: _.map(m, (n) -> n.signalName),
            imgurl: if isWarn then nodeImage2 else nodeImage,
            isWarn: if isWarn then true else false
          }
        ))
        if scope.workRouter.length > 0
          scope.workRouter[scope.workRouter.length - 1].imgurl = if scope.workRouter[scope.workRouter.length - 1].isWarn then endNodeImage2 else endNodeImage
      )
    
      # 接受传来的task, 更新页面数据
      updateData = (msg) => (
        showBtns = { accept: false, approval: false, reject: false, cancel: false, save: false }
        
        scope.showType = if msg.isEdit then 2 else 1

        scope.task = msg.task
        
        if scope.subscribeSigs
          for x in scope.subscribeSigs
            x?.dispose()
            
        state = @getStatusName(scope.task?.phase)
        
        if scope.showType == 2
          if state == 1
            scope.showType = 1
            showBtns.accept = true
            if scope.task?.creator?.id == scope.$root.user.user
              showBtns.cancel = true
          else if state == 2 or state == 3 or state == 5
            scope.showType = 1
          else if state == 4
            showType = 2
            showBtns.save = true
            showBtns.approval = true
            showBtns.reject = true
            if scope.task?.creator?.id == scope.$root.user.user
              showBtns.cancel = true
          
        scope.showBtns = showBtns
          
        # 获取当前节点
        scope.selectNode = getCurrentNode()
        
        # 详情
        if scope.selectNode
          if scope.task.type == "defect"
            scope.works = [scope.task.source]
            scope.works[0].equipName = scope.works[0].equipmentName
            scope.memos = []
            scope.files = []
            updateWorkLine(scope.works, state, msg.isEdit)
            scope.$applyAsync()
          detail = _.find(scope.selectNode?.contents, (d) -> d.type == "json")
          if detail
            json = detail.content 
            if typeof(json) == "string"
              json = JSON.parse(json)
            scope.works = getData(json, "content")
            scope.memos = getData(json, "handle_details")
            console.log("memos",scope.memos)
            scope.files = getData(json, "attachments")
            updateWorkLine(scope.works, state, msg.isEdit)
            return scope.$applyAsync()
        scope.state = 0
        scope.works = []
        scope.memos = []
        scope.files = []
        scope.$applyAsync()
      )

      # 操作工单
      scope.setTask = (d) => (
        if d == 1 && _.find(scope.works, (work) => !work.work_status)
          return @display("您还有工作项未处理, 不可进行批准操作 !!")
        map = { 1: 'approval', 2: 'reject', 3: 'cancel' }
        schema = @taskService.url
        url = @taskService.replaceUrlParam(schema, scope.task, true)
        node = scope.selectNode
        if node?.node
          url += "/#{node.node}"
          user = scope.$root.user
          scope.saveTask((taskData) =>
            data = {
              _id: scope.task._id
              data: {
                _id: node._id,
                node: node.node,
                parameters: node?.parameters,
                contents: node?.contents,
                state: map[d],
                timestamp: new Date(),
                manager: { id: user.user, name: user.name }
              }
            }
            @taskService.postData(url, data, (err, result) =>
              if result
                @display("操作成功", 500)
              else
                @display("操作失败", 500)
            )
          )
        else
          @display("无法获取当前节点", 500)
      )


      scope.saveAddModel = () => (
        if scope.detailType == 1
          if scope.addModel.content != ''
            _memo = _.max(scope.memos, (memo) -> parseInt(memo.id))
            id = if scope.memos.length != 0 then parseInt(_memo.id) + 1 else 1
            memo = { 
              id: id, 
              content: scope.addModel.content, 
              memo: scope.addModel.memo
            }
            scope.memos = scope.memos.concat([memo])
            console.log("memos",scope.memos)
          else
            @display("内容不可为空!!", 500) 
        else
          scope.handle = true
          if scope.addModel.name != ""
            _file = _.max(scope.files, (file) -> parseInt(file.id))
            id = if scope.files.length != 0 then parseInt(_file.id) + 1 else 1
            scope.files = scope.files.concat([{
              id: id, 
              name: scope.addModel.name, 
              type: scope.addModel.type, 
              url: scope.addModel.url
            }])
          else
            @display("请先上传文件!!", 500) 
      )
        
      # 删除file
      scope.removeFiles = (file) => (
        scope.files = _.filter(scope.files, (f) => f.id != file.id)
        scope.$applyAsync()
      )

      # 删除memo
      scope.removeMemos = (memo) => (
        scope.memos = _.filter(scope.memos, (m) => m.id != memo.id)
        scope.$applyAsync()
      )

      # 取消
      scope.closeDetail = () => (
        scope.addModel = {
          content: "", memo: "", id: "",
          utl: "", type: "", name: ""
        }
      )
      
      # 保存修改
      scope.saveTask = (callback) => (
        scope.selectNode?.contents[0].content = {
          content: _.map(scope.works, (d) -> 
            if typeof(d.work_status) == "string"
              d.work_status = parseInt(d.work_status)
            else if typeof(d.work_status) == "boolean"
              d.work_status = if d.work_status then 1 else 0
            d.status = parseInt(d.status)
            return d
          ),
          handle_details: scope.memos,
          attachments: scope.files
        }
        scope.task?.nodes = _.map(scope.task?.nodes, (node) =>
          if scope.selectNode.node == node.node
            return scope.selectNode
          return node
        )
        @taskService.save(scope.task, (err, taskData) =>
          if typeof(callback) == "function" 
            callback(taskData)
            return
          if taskData
            updateData({ isEdit: true, task: taskData })
            @display("操作成功", 500)
          else
            @display("操作失败", 500)
        , true)
      )
      msg = scope.parameters.message
      return if !msg?.message
      if typeof(msg.message) == "string"
        filter = scope.project.getIds()
        filter.task = msg.message
        @commonService.loadProjectModelByService('tasks', filter, null, (err, resp) =>
          return @dispose("未查询到该工单!!", 500) if !resp or resp?.task != msg.message
          updateData({ isEdit: true, task: resp })
        , true)
      else if typeof(msg.message?.task) == "object"
        updateData(msg.message)
      


    getStatusName: (phase) -> (
      state = phase?.state
      manager = phase?.nextManager
      progress = phase?.progress
      if _.isEmpty(manager) && !(progress >= 0)
        return 1
      else if state is "reject"
        return 2
      else if state is "cancel"
        return 3
      else if (progress < 1) || !_.isEmpty(manager)
        return 4
      else
        return 5
    )

    resize: (scope) ->

    dispose: (scope) ->
      scope.subModel?.dispose()
      if scope.subscribeSigs
        for x in scope.subscribeSigs
          x?.dispose()

  exports =
    MobileSituationFeedbackDirective: MobileSituationFeedbackDirective