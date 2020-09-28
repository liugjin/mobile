###
* File: mobile-fault-yun-directive
* User: David
* Date: 2020/03/09
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment","echarts"], (base, css, view, _, moment,echarts) ->
  class MobileFaultYunDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-fault-yun"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      # 故障工单

      scope.count = 0


      scope.warnSeries = [
        { key: "common", name: "故障工单", color: 'rgb(193, 201, 80)' }
      ]

      scope.date = []

      scope.warnData = [
        # { key: "common", time: "2019-5-12", val: 51 },
        # { key: "dangerous", time: "2019-5-12", val: 51 },
        # { key: "serious", time: "2019-5-12", val: 51 },
        # { key: "common", time: "2019-5-13", val: 51 }
      ]

      scope.transData = [
        { key: "待处理", val: 0 },
        { key: "进行中", val: 0 }
      ]

      scope.type = "day"

      keyMap = {
        day: ["本日待处理故障", "近五日前十故障设备"],
        month: ["本月待处理故障", "近五月前十故障设备"],
        year: ["今年待处理故障", "近三年前十故障设备"]
      }

      scope.equipData = [
        { key: "待处理故障", val: 0, max: 100 }
#        { key: "故障数前十设备", val: 0, max: 100 }
      ]
      scope.rankData = [
        # { id: "task-defect", key: "故障工单", stack: "defect", val: 30, sort: 0 }
      ]
      scope.$watch("parameters", (param) =>
        return if !param
        scope.date = param.date if scope.date.length == 0

        if scope.type != param.type
          scope.type = param.type
          scope.date = param.date
        tmpHandlingCounts = 0
        count = 0
        scope.warnData = _.map param.data.task, (task) ->
          if !(_.isEmpty task.phase)
            tmpHandlingCounts += task.val
          count += task.val
          {key: 'common', val: task.val, time: task.time}

        scope.count = count

        handleResult =  _.find scope.equipData,{key:"待处理故障"}
        handleResult.val = tmpHandlingCounts

        scope.$applyAsync()


      )
      scope.$watch "parameters.type", (type) =>
        return if not scope.firstload
          scope.rankData = [
            { id: "task-defect", key: "故障工单", stack: "defect", val: 30, sort: 0 }
            { id: "task-plan", key: "巡检工单", stack: "defect", val: 30, sort: 1 }
            { id: "task-predict", key: "维保工单", stack: "defect", val: 30, sort: 2 }
          ]
          @getEquipDefectCount(scope,element)
          scope.$applyAsync()
    
    # 根据站点设备统计故障数
    getEquipDefectCount: (scope,element) =>
      aggregateCons = []
      matchObj = {}
      groupObj = {}

      type = scope.parameters.type
      execCount = if scope.parameters.type == "year" then 3 else 5

      # 格式化返回的时间
      formatTypeMap = {
        day: "%Y-%m-%d",
        month: "%Y-%m",
        year: "%Y"
      }
      formatTypeMap2 = {
        day: "MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      }

      filter = scope.project.getIds()
      filter.type = "defect"
      filter.createtime = {$gte:moment().subtract(execCount, type).startOf(type),$lte:moment().endOf(type)}
      groupObj.$group = {_id:{station:"$source.station",equipment:"$source.equipment",stationName:"$source.stationName",equipmentName:"$source.equipmentName"},defects:{$sum:1}}

      matchObj.$match = filter

      aggregateCons.push matchObj
      aggregateCons.push groupObj
      aggregateCons.push {$sort:{defects:-1}}
      @commonService.reportingService.aggregateTasks {filter:scope.project.getIds(),pipeline:aggregateCons,options:{allowDiskUse:true}}, (err, records) =>
         return if !records
         scope.rankData = []
         recount = 0

         for rec in records
           scope.rankData.push {
             id: rec._id.station + "." + rec._id.equipment,
             key: rec._id.stationName + "." + rec._id.equipmentName,
             stack: "故障数前十设备",
             val: rec.defects,
             sort: recount
             type: "bar"
           }
           recount++
          param = { data: scope.rankData}
          @createChartOption(scope,element,param)
    # 创建图表option
    createChartOption: (scope,element,param) =>
      # 数据处理
      xdata = []
      seriesData = []
      param.data.sort(@equipmentSort("val"))
      for da in param.data
        xdata.push(da.key)
        seriesData.push(da.val)
      e = element.find('.echarts')
      scope.chart?.dispose()
      option = {
        color: ['#F1A700'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            # 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        # 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: "4%",
          bottom: "30%"
        },
        legend: { 
          selectedMode: false, 
          data: ["故障数前十"], 
          icon: "circle"
          right: 0,
          top: 0, 
          textStyle: { 
            color: "#A6A6A6" 
          } 
        },
        xAxis: [
          type : 'category',
          data : ["用气区域2#.1#燃气表", "水务区1#.1#水房"],
          nameLocation:'end',
          axisLabel: { 
            color: "#A6A6A6",
            interval:0,
            formatter : (params,index)=>
              if (index % 2 != 0)
                return '\n\n' + params;
              else
                return params;
          },
          axisLine: { 
            lineStyle: {
              color: "#F0F3F4"
            } 
          },
          splitLine: { 
            show: false 
          }
        ],
        yAxis: [
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
        ],
        series: [
          {
            name: '故障数前10排名',
            type: 'bar',
            barWidth: '60%',
            data: seriesData
          }
        ]
      };
       # 1. 取出两个系列的最大值, 然后向上取整
      countMax = _.mapObject(_.groupBy(param.data, (d) -> d.type), (n) => 
        max = _.max(n, (m) -> m.val).val
        if max < 10
          return 10
        return Math.ceil(max / 30) * 30
      )
      option.yAxis[0].max = if countMax.bar then countMax.bar else 500
      option.yAxis[0].interval = if countMax.bar then countMax.bar / 5 else 100
      scope.chart = echarts.init(e[0])
      scope.chart.setOption(option)

    # 按照工单数进行排序
    equipmentSort:(key)=>
      return (a,b)=>
        value1 = a[key]
        value2 = b[key]
        return value2 - value1 
    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileFaultYunDirective: MobileFaultYunDirective