###
* File: mobile-general-overview-directive
* User: David
* Date: 2020/03/09
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment","echarts"], (base, css, view, _, moment,echarts) ->
  class MobileGeneralOverviewDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-general-overview"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.showVertical = false
      scope.count = 0
      scope.data = [
        { id: "excepequips-defect", key: "故障设备", stack: "异常设备", val: 0, sort: 0 },
        { id: "excepequips-plan", key: "巡检设备", stack: "异常设备", val: 0, sort: 1 },
        { id: "excepequips-predict", key: "维保设备", stack: "异常设备", val: 0, sort: 2 }
        { id: "task-defect", key: "故障工单", stack: "待处理工单", val: 0, sort: 0 },
        { id: "task-plan", key: "巡检工单", stack: "待处理工单", val: 0, sort: 1 },
        { id: "task-predict", key: "维保工单", stack: "待处理工单", val: 0, sort: 2 },
      ]

      scope.changeVertical = () => (
        scope.showVertical = !scope.showVertical
        scope.$applyAsync()
      )
      scope.$watch("parameters", (param) =>
        _.each(scope.data, (d, i) => scope.data[i].val = 0)
        _.mapObject(param.data, (d, i) =>
          if i == "task"
            _.each(d, (item) =>
              if !(_.isEmpty item.phase)
                key = i + "-" + item.type
                index = _.findIndex(scope.data, (m) => m.id == key)
                if index > -1
                  scope.data[index].val += item.val
            )
          else if i == "excepequips"
            _.each(d, (item) =>
              key = i + "-" + item.type
              index = _.findIndex(scope.data, (m) => m.id == key)
              if index > -1
                scope.data[index].val += item.val
            )
          else if i == "equipment"
            tmpDefects = _.filter param.data["equipment"],(equipItem)->
              return equipItem.type == "defect"
            if tmpDefects.length > 0
              index = _.findIndex(scope.data, (m) => m.id == "excepequips-defect")
              for defectItem in tmpDefects
                scope.data[index].val += defectItem.val
        )
        count = 0
        @chartData(scope,element)
        _.each(param.data.task, (task) => count += task.val)
        if scope.count != count
          scope.count = count
      )
      

    chartData:(scope,element)=>
      scope.states1 = [
        {name:"故障设备", value: 0, color: '#7B46FA'},
        {name:"巡检设备", value: 0, color: '#FD5916'}
        {name:"维保设备", value: 0, color: '#01A4F7'}
      ]
      scope.states1[0].value = scope.data[0].val
      scope.states1[1].value = scope.data[1].val
      scope.states1[2].value = scope.data[2].val
      scope.count1 = scope.data[0].val + scope.data[1].val + scope.data[2].val

      scope.states2 = [
        {name:"故障工单", value: 0, color: '#7B46FA'},
        {name:"巡检工单", value: 0, color: '#FD5916'}
        {name:"维保工单", value: 0, color: '#01A4F7'}
      ]
      scope.states2[0].value = scope.data[3].val
      scope.states2[1].value = scope.data[4].val
      scope.states2[2].value = scope.data[5].val
      scope.count2 = scope.data[3].val + scope.data[4].val + scope.data[5].val


      scope.subtext = ["异常设备","待处理工单"]
      scope.$applyAsync()
      e1 = element.find('.echarts1')
      e2 = element.find('.echarts2')
      scope.myChart1?.dispose()
      scope.myChart2?.dispose()
      scope.myChart1 = echarts.init(e1[0])
      scope.myChart2 = echarts.init(e2[0])
      options1 = @createChartOption scope,scope.states1,scope.count1,scope.subtext[0]
      options2 = @createChartOption scope,scope.states2,scope.count2,scope.subtext[1]
      scope.myChart1?.setOption options1
      scope.myChart2?.setOption options2
   # 创建图表option
    createChartOption: (scope,states,count,subtext) =>
      return if not states
      option =
        color: _.map states, (item)->item.color
        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          text: count || '0',
          subtext: subtext,
          textStyle: {
            color: '#737373'
            fontSize: 18
          },
          subtextStyle: {
            fontSize: 12
            color: '#737373'
          },
          x: 'center',
          top: '38%'
        },
        series:[
          {
            name: subtext,
            type:'pie',
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,
            clockwise: true,
            hoverAnimation: false,
            hoverOffset: 0,
            startAngle: 0,
            label: {
              normal: {
                show: false,
                position: 'outside'
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: states
          }
        ]
      option

      
    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileGeneralOverviewDirective: MobileGeneralOverviewDirective