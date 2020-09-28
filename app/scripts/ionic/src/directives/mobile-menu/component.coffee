###
* File: mobile-menu-directive
* User: David
* Date: 2020/03/17
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileMenuDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-menu"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      element.find(".sidenav").css("height",document.body.clientHeight + "px")
      element.find('.sidenav').sidenav()
      scope.stateSelectBtn = 0
      scope.rankSelectBtn = 0
      scope.query = { 
        taskId: "", state: "", rank: "", 
        startTime: moment().format("YYYY-MM-DD"),
        endTime: moment().format("YYYY-MM-DD")
      }
      scope.state=[{name:"所有",value:""},{name:"等待处理",value:"1"},{name:"进行中",value:"2"},{name:"已结束",value:"3"},{name:"拒绝",value:"4"},{name:"取消",value:"5"}]
      scope.rank = [{name:"所有",value:""},{name:"低",value:"1"},{name:"中",value:"2"},{name:"高",value:"3"}]
      scope.stateData = (d,i) =>
        scope.stateSelectBtn = i
        scope.query.state = d.value
      scope.rankData = (d,i) =>
        scope.rankSelectBtn = i
        scope.query.rank = d.value
      @subscription?.dispose()
      @subscription = @commonService.subscribeEventBus "task-date", (msg) =>
        if msg and msg.message
          message = msg.message
          if message.id == "start"
            scope.query.startTime = moment(message.period.startTime).format('YYYY-MM-DD')
          if message.id == "end"
            scope.query.endTime = moment(message.period.startTime).format('YYYY-MM-DD')
      # 搜索
      scope.search = () => (
        filter = scope.project.getIds()
        filter["createtime"] = {}
        _.mapObject(scope.query, (d, i) =>
          return if d == ''
          if i == "taskId"
            filter["task"] = { $regex: d } 
          else if i == "rank"
            filter["rank"] = d
          else if i == "startTime"
            filter["createtime"]["$gte"] = d
          else if i == "endTime"
            filter["createtime"]["$lte"] = d
          else if i == "state" and d == '1'
            filter["$or"] = [{ "phase.nextManager": null }]
            filter["phase.progress"] = { '$exists': false }
          else if (i == "state" and d == '2')
            filter["$or"] = [{"phase.progress": {'$exists': true, '$gte': 0, '$lt': 1}}, {"phase.nextManager": {'$exists': true }}]
            filter["$nor"] = [{"phase.state": "reject"}, {"phase.state": "cancel"}, {"phase.progress": 1}]
          else if (i == "state" and d == '3')
            filter["phase.progress"] = 1
            filter["$nor"] = [ { "phase.state": "reject" }, { "phase.state": "cancel" } ]
          else if (i == "state" and d == '4')
            filter["phase.state"] = "reject"
          else if (i == "state" and d == '5')
            filter["phase.state"] = "cancel"
        )
        console.log("filter",filter)
        @commonService.publishEventBus("task-query", filter)
        element.find('.sidenav').removeClass("show")
      )
    resize: (scope)->
    dispose: (scope)->


  exports =
    MobileMenuDirective: MobileMenuDirective