###
* File: mobile-maintenance-operation-directive
* User: David
* Date: 2020/03/09
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment","echarts"], (base, css, view, _, moment,echarts) ->
  class MobileMaintenanceOperationDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-maintenance-operation"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.states = [
        {name:"工单", value: 0, color: '#7B46FA'},
        {name:"设备", value: 0, color: '#FD5916'}
      ]
      scope.subtext = ["维保总单数"]
      scope.states[0].value = 300
      scope.states[1].value = 400
      scope.count = 500
      e = element.find('.echarts')
      scope.myChart?.dispose()
      scope.myChart = echarts.init(e[0])
      options = @createChartOption scope,scope.states,scope.count,scope.subtext[0]
      scope.myChart?.setOption options
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
    MobileMaintenanceOperationDirective: MobileMaintenanceOperationDirective