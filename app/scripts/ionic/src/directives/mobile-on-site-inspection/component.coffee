###
* File: mobile-on-site-inspection-directive
* User: David
* Date: 2020/03/09
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment","echarts"], (base, css, view, _, moment,echarts) ->
  class MobileOnSiteInspectionDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-on-site-inspection"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      # 巡检工单
      scope.workSeries = [
        { key: "bar", name: "工单", color: "rgb(85, 189, 255)" },
        { key: "line", name: "巡检项", color: "rgb(200, 134, 147)" }
      ]

      scope.rignData = [
        { type:"allworkitems",title: "巡检项总数", val: 30, peresent: 0 },
        { type:"handling",title: "待处理工单数", val: 10, peresent: 0 },
        { type:"execepequips",title: "异常巡检点", val: 10, peresent: 0 }
      ]

      scope.date = []
      scope.workData = []
      scope.type = "day"
      scope.count = 0



      scope.$watch("parameters", (param) =>
        return if !param
        scope.date = param.date if scope.date.length == 0
        if scope.type != param.type
          scope.type = param.type
          scope.date = param.date

        list = _.map(param.data.workitems, (workitem) -> {
          key: 'line', val: workitem.val, time: workitem.time
        })
        scope.workData = list.concat(_.map(param.data.task, (task) -> {
          key: 'bar', val: task.val, time: task.time
        }))
        count = 0
        handlecounts = 0
        for taskItem in param.data.task
          if !(_.isEmpty taskItem.phase)
            handlecounts += taskItem.val
          count += taskItem.val

        workitemCounts = 0
        for workItem in param.data.workitems
          workitemCounts += workItem.val

        excepworkitemCounts = 0
        for excepworkitem in param.data.excepworkitems
          excepworkitemCounts += excepworkitem.val

        for ringItem in scope.rignData
          if ringItem.type is "handling"
            ringItem.val = handlecounts
            ringItem.title += ": " + handlecounts
          else if ringItem.type is "allworkitems"
            ringItem.val = workitemCounts
            ringItem.title += ": " + workitemCounts
          else if ringItem.type is "execepequips"
            ringItem.val = excepworkitemCounts
            ringItem.title += ": " + excepworkitemCounts
        scope.count = count if scope.count != count
        param = { series: scope.workSeries, data: scope.workData, date:scope.date}
        @createChartOption(scope,element,param)
      )


    createChartOption: (scope,element,param) =>
      e = element.find('.echarts')
      scope.chart = echarts.init(e[0])
      option = {
        tooltip : {
          trigger: "axis",
          padding: [4, 8]
        },
        legend: { 
          selectedMode: false, 
          data: [], 
          right: 0,
          top: 0, 
          textStyle: { 
            color: "rgb(167, 182, 204)" 
          } 
        },
        grid: {
          top: "20%",
          bottom: "14%"
        },
        xAxis : {
          type : 'category',
          data : [],
          axisLabel: { 
            color: "#A6A6A6" 
          },
          axisLine: { 
            lineStyle: {
              color: "#F0F3F4"
            } 
          },
          splitLine: { 
            show: false 
          }
        },
        yAxis : [
          { 
            type : 'value', 
            scale: true, 
            min: 0, 
            max: 200, 
            axisLabel: { 
              color: "#A6A6A6", 
              interval: 1
            },
            axisLine: { 
              lineStyle: {
                color: "#F0F3F4"
              } 
            },
            splitLine: { 
              show: true, 
              lineStyle:{ 
                color: ['#F0F3F4'], 
                width: 1, 
                type: 'solid' 
              } 
            }
          },
          {
            type : 'value', 
            scale: true, 
            min: 0, 
            max: 50, 
            axisLabel: { 
              color: "#A6A6A6"
            },
            axisLine: { 
              lineStyle: {
                color: "#F0F3F4"
              } 
            },
            splitLine: { 
              show: true, 
              lineStyle:{ 
                color: ['#F0F3F4'], 
                width: 1, 
                type: 'solid' 
              } 
            }
          }
        ],
        series : []
      }
      multiple = 1
      getSeriesData = (data, dates, key) => (
        list = _.map([1..dates.length], (d) -> 0)
        _.each(_.filter(data, (d) => d.key == key), (d) => 
          index = dates.indexOf(d.time)
          list[index] = d.val if index != -1
        )
        return list
      )
      dates = param.date
      option.tooltip.formatter = (d) => (
        html = d[0].name + "<br />"
        _.each(d, (n) =>
          if n.seriesName != "background"
            html += n.marker + n.seriesName + ": " + n.data + "<br />"
        )
        return html
      ) 
      option.xAxis.data = dates
      _data = param.data
      # 1. 取出两个系列的最大值, 然后向上取整
      countMax = _.mapObject(_.groupBy(_data, (d) -> d.key), (n) => 
        max = _.max(n, (m) -> m.val).val
        if max < 10
          return 10
        return Math.ceil(max / 50) * 50
      )
      option.yAxis[0].max = if countMax.bar then countMax.bar else 500
      option.yAxis[0].interval = if countMax.bar then countMax.bar / 5 else 100
      option.yAxis[1].max = if countMax.line then countMax.line else 50
      option.yAxis[1].interval = if countMax.bar then countMax.line / 5 else 10
      # 2. 获得两个系列的倍数
      if _.has(countMax, "bar") && _.has(countMax, "line") && countMax?.line > 0
        multiple = countMax.bar / countMax.line
      else 
        multiple = 1
      # 3. 获取seriesData
      seriesData = _.map(param.series, (s) => {
        type: s.key,
        name: s.name,
        data: getSeriesData(_data, dates, s.key),
        color: s.color
      })
      _.each(seriesData, (item, index) =>
        if item.type == "bar"
          seriesData[index].stack = 'bar'
          seriesData.push({
            name: "background",
            type:'bar',
            color: "rgba(120, 139, 221, 0.6)",
            stack: 'bar',
            data: _.map(item.data, (d) => countMax.bar - d),
            barWidth: "50%"
          })
        else if item.type == "line"
          seriesData[index].data = _.map(item.data, (d) => multiple * d)
      )
      option.series = seriesData
      option.legend.data = _.map(param.series, (d) -> 
        item = { 
          name: d.name, 
          textStyle: { color: d.color }
        }
        item.icon = "circle" if d.key == "bar"
        return item
      )
      option.tooltip.formatter = (d) => (
        html = d[0].name + "<br />"
        html += d[0].marker + d[0].seriesName + ":" + d[0].value + "<br />"
        html += d[1].marker + d[1].seriesName + ":" + d[1].value / multiple
        # console.log(d);
        return html
      )
      scope.chart.setOption(option)
    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileOnSiteInspectionDirective: MobileOnSiteInspectionDirective