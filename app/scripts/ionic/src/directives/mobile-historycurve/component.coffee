###
* File: mobile-historycurve-directive
* User: David
* Date: 2018/12/08
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts", 'rx', 'clc.foundation.angular/filters/format-string-filter', 'gl-datepicker', 'calendar'], (base, css, view, _, moment, echarts, Rx, fsf, gl, lc) ->
  class MobileHistorycurveDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-historycurve"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: ($scope, element, attrs) =>
      $scope.subscriptions = {}
      getPeriod = (mode='day') ->
        switch mode
          when 'now'
            startTime = moment().subtract 60, 'minutes'
            endTime = moment()
          when '60minutes'
            startTime = moment().subtract 60, 'minutes'
            endTime = moment()
          when 'hour'
            startTime = moment().startOf('hour')
            endTime = moment().endOf('hour')
          when 'day'
            startTime = moment().startOf('day')
            endTime = moment().endOf('day')
          when 'week'
            startTime = moment().startOf 'week'
            endTime = moment().endOf 'week'
          when 'month'
            startTime = moment().startOf 'month'
            endTime = moment().endOf 'month'
          when 'year'
            startTime = moment().startOf 'year'
            endTime = moment().endOf 'year'
          else
            startTime = moment().subtract 60, 'minutes'
            endTime = moment()
        $scope.period =
          startTime: startTime
          endTime: endTime
          mode: mode

      nextPeriod = (mode='day') =>
        if not $scope.period
          return getPeriod mode
        switch $scope.period.mode
          when '60minutes'
            startTime = $scope.period.endTime
            endTime = moment($scope.period.endTime).add(60, 'minutes')
          when 'hour'
            startTime = moment($scope.period.startTime).add(1, 'hour').startOf 'hour'
            endTime = moment($scope.period.startTime).add(1, 'hour').endOf 'hour'
          when 'day'
            startTime = moment($scope.period.startTime).add(1, 'day').startOf 'day'
            endTime = moment($scope.period.startTime).add(1, 'day').endOf 'day'
          when 'week'
            startTime = moment($scope.period.startTime).add(1, 'week').startOf 'week'
            endTime =moment($scope.period.startTime).add(1, 'week').endOf 'week'
          when 'month'
            startTime = moment($scope.period.startTime).add(1, 'month').startOf 'month'
            endTime = moment($scope.period.startTime).add(1, 'month').endOf 'month'
          when 'year'
            startTime = moment($scope.period.startTime).add(1, 'year').startOf 'year'
            endTime = moment($scope.period.startTime).add(1, 'year').endOf 'year'
          else
            startTime = $scope.period.endTime
            endTime = moment($scope.period.endTime).add(60, 'minutes')
        $scope.period =
          startTime: startTime
          endTime: endTime
          mode: $scope.period.mode

      previousPeriod = (mode='day') =>
        if not $scope.period
          return getPeriod mode

        switch $scope.period.mode
          when '60minutes'
            startTime = moment($scope.period.startTime).subtract(60, 'minutes')
            endTime = $scope.period.startTime
          when 'hour'
            startTime = moment($scope.period.startTime).subtract(1, 'hour').startOf 'hour'
            endTime = moment($scope.period.startTime).subtract(1, 'hour').endOf 'hour'
          when 'day'
            startTime = moment($scope.period.startTime).subtract(1, 'day').startOf 'day'
            endTime = moment($scope.period.startTime).subtract(1, 'day').endOf 'day'
          when 'week'
            startTime = moment($scope.period.startTime).subtract(1, 'week').startOf 'week'
            endTime =moment($scope.period.startTime).subtract(1, 'week').endOf 'week'
          when 'month'
            startTime = moment($scope.period.startTime).subtract(1, 'month').startOf 'month'
            endTime = moment($scope.period.startTime).subtract(1, 'month').endOf 'month'
          when 'year'
            startTime = moment($scope.period.startTime).subtract(1, 'year').startOf 'year'
            endTime = moment($scope.period.startTime).subtract(1, 'year').endOf 'year'
          else
            startTime = moment($scope.period.startTime).subtract(60, 'minutes')
            endTime = $scope.period.startTime
        $scope.period =
          startTime: startTime
          endTime: endTime
          mode: $scope.period.mode

      formatString = fsf.FormatStringFilter()
      e = element.find('.ss-chart')
      $scope.mode = 'now'
      $scope.myChart = null
      $scope.oneSignal = null
      $scope.signals = []
      $scope.selectSignals = []
      option = null
      series = []
      maxPoints = 20
      $scope.period = getPeriod $scope.mode
      $scope.formatStartTime = moment($scope.period.startTime).format('YYYY-MM-DD')
      calendar = new LCalendar()
      calendar.init {
        trigger: '#calendar',
        type: 'date',
        minDate: moment().subtract(10, 'years').format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD')
      }

      setGlDatePicker = (element, value)->
        return if not value
        setTimeout ->
          $scope.gl = $(element).glDatePicker({
            dowNames:["日","一","二","三","四","五","六"],
            monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
            selectedDate: moment(value).toDate(),
            onClick: (target, cell, date, data) ->
              month = date.getMonth() + 1
              if month < 10
                month = "0"+ month
              day = date.getDate()
              if day < 10
                day = "0"+ day
              target.val(date.getFullYear()+"-"+month+"-"+day).trigger("change")
          })
        ,500

      waitingLayout = ($timeout, element, callback) =>
        $timeout ->
          if element.width() <= 100
            waitingLayout $timeout, element, callback
          else
            callback()
        , 200

      waitingEcharts = (callback) =>
        console.log 'waiting echarts'
        setTimeout () =>
          if !$scope.myChart
            console.log "echarts没初始化完"
            waitingEcharts callback
          else
            console.log "-echarts初始化完成--"
            callback()
        , 200

      # chart container is created dynamically so that render the chart until the layout is completed after the container is visible
      waitingLayout @$timeout, e, () =>
        renderChart e
#        $scope.$watch "mode", (mode) =>
#          if mode is "day" and not $scope.gl
#            setGlDatePicker(element.find('.datepicker')[0],$scope.formatStartTime)

      # 初始化地图
      renderChart = (element) =>
        $scope.myChart?.dispose()
        $scope.myChart = echarts.init(element[0])
        $scope.myChart?.setOption option if option

      $scope.stationIdSubscription?.dispose()
      $scope.stationIdSubscription = @subscribeEventBus 'stationId', (d)=>
        @getStation $scope, d.message.stationId

      $scope.equipmentIdSubscription?.dispose()
      $scope.equipmentIdSubscription = @subscribeEventBus 'equipmentId', (d)=>
        @getEquipment $scope, d.message.equipmentId,()=>
          $scope.$applyAsync()

      $scope.signalIdSubscription?.dispose()
      $scope.signalIdSubscription = @subscribeEventBus 'signalId', (d) =>
        #组件交互用
        return if $scope.equipment.model.station isnt d.message?.stationId and $scope.equipment.model.equipment isnt d.message?.equipmentId
        $scope.selectSignals = []
        $scope.$applyAsync()
        $scope.oneSignal = d.message?.signalId
        # signal = _.find $scope.signals, (sig)->sig.model.signal is $scope.oneSignal
        signal = _.find $scope.equipment.signals.items, (sig)->sig.model.signal is $scope.oneSignal
        $scope.selectSignals.push signal if signal

      $scope.$watch "equipment", (equipment) =>
        #console.log(equipment)
        return if not equipment
        getChartSignals(equipment)

      getChartSignals = (equipment) =>
        $scope.signals = []
        $scope.selectSignals = []
        equipment?.loadSignals null, (err, signals) =>
#          for signal in signals
#            signal.model.unitName = $scope.project.dictionary.signaltypes.keys[signal.model.unit]?.model.unit if signal.model.unit
#            signal.model.unitName = "" if not signal.model.unitName
          $scope.signals = signals if not err
          #_signal = _.find $scope.signals, (s) -> s.model.dataType is 'float'
          #$scope.selectSignals = [_signal] if _signal
          @getProperty $scope, '_signals'
          $scope.$applyAsync()
        ,true

      $scope.$watch 'property', (property) =>
        if not property or not property.value
          value = "[]"
        else
          value = property.value

        _signals = JSON.parse(value)
        mySignals = []
        $scope.signals = []
        for s in _signals
          item = _.find $scope.equipment.signals.items, (item) -> item.model.signal is s.signal
          $scope.signals.push item if item
        if $scope.signals.length < 1
          $scope.signals = $scope.equipment.signals.items
        if $scope.selectSignals.length < 1
          _signal = _.find $scope.signals, (s) -> s.model.dataType is 'float'
          for item in $scope.signals
            if item.model.signal == $scope.oneSignal
              mySignals = [item]
          $scope.selectSignals = if not (_.isEmpty mySignals) then mySignals else (if _signal then [_signal] else [])
          $scope.$applyAsync()

      $scope.$watch 'selectSignals', (selectSignals) =>
        # console.log selectSignals
        if (selectSignals instanceof Array) == false
          $scope.selectSignals = [selectSignals]
          $scope.$applyAsync()
        #return if not selectSignals.length
        if not selectSignals
          $scope.myChart?.clear()
          return
        return if not $scope.selectSignals or $scope.selectSignals.length < 1 or not $scope.selectSignals[0]
        $scope.selectStatisticMode $scope.mode

#      $scope.$watch 'equipment',(equipment)=>
##        console.log controller
##        console.log equipment
##        return if not equipment
#        waitingEcharts ()=>
#          $scope.getChartSignals(equipment)
#      $scope.getChartSignals $scope.equipment

      $scope.selectStatisticMode = (mode, period) =>
        $scope.mode = mode
        $scope.period.mode = $scope.mode
        return if mode is 'heatmap'

        queryStatisticRecords $scope.selectSignals, $scope.mode, period, (err, records) ->
          #console.log records
          option = createOption null, $scope.selectSignals, records
          $scope.myChart?.clear()
          $scope.myChart?.setOption option
          series = option.series

      $scope.selectDates = () =>
        $scope.period.startTime = $scope.formatStartTime
        $scope.selectDate()

      $scope.selectSignal = (sig) ->
        $scope.selectSignals = [sig]
        element.find('.mysignals').hide()
        return true

      $scope.selectDate = (periodType) =>
        switch periodType
          when 'next'
            $scope.period = nextPeriod()
          when 'previous'
            $scope.period = previousPeriod()
          when 'refresh'
            $scope.period = $scope.period ? getPeriod()
          else
            $scope.period.startTime = moment($scope.period.startTime).startOf 'day'
            $scope.period.endTime = moment($scope.period.startTime).endOf 'day'
        $scope.formatStartTime = moment($scope.period.startTime).format('YYYY-MM-DD')
        $scope.period.mode = 'day'
        $scope.selectStatisticMode $scope.period.mode, $scope.period

      $scope.queryRecords = (periodType) =>
        switch periodType
          when 'next'
            $scope.period = nextPeriod()
          when 'previous'
            $scope.period = previousPeriod()
          when 'refresh'
            $scope.period = getPeriod $scope.mode
          else
            $scope.period = getPeriod $scope.period.mode
        $scope.selectStatisticMode $scope.period.mode, $scope.period

      $scope.shiftCalendar = (action) =>
        if action is 'next'
          @publishEventBus 'history-curve-heat-map', {action: 'next'}
        else if action is 'prev'
          @publishEventBus 'history-curve-heat-map', {action: 'prev'}
        else if action is 'rewind'
          @publishEventBus 'history-curve-heat-map', {action: 'rewind'}

      subscribeSignal = (signal) =>
        $scope.subscriptions[signal.model.signal]?.dispose()
        $scope.subscriptions[signal.model.signal] = @commonService.subscribeSignalValue signal, (d)=>
          if $scope.mode is 'now'
            addPointToSerie signal, d.data
            $scope.myChart?.setOption
              series: series

      addPointToSerie = (signal, data) =>
        serie = _.find series, (s) -> s.name is signal.model.name
        return if not serie
        points = serie.data
        point = getPoint signal, data
        points.push point
        if points.length > maxPoints
          points.shift()
        point

      querySignalRecords = (signals, page=1, pageItems=6, sorting={'timestamp': 1}, mode, period, callback) =>
        return if not signals or signals.length < 1
        filter =
          startTime: moment($scope.formatStartTime).startOf 'day'
          endTime: moment($scope.formatStartTime).endOf 'day'
        if mode is 'day'
          if period and period.mode is 'day'
            $scope.period = period
          else
            $scope.period = getPeriod mode
          $scope.period.startTime = filter.startTime
          $scope.period.endTime = filter.endTime
        #          filter.startTime = $scope.period.startTime
        #          filter.endTime = $scope.period.endTime
        paging =
          page: page
          pageItems: pageItems
        @commonService.querySignalsHistoryData signals, filter.startTime, filter.endTime, (err, records, pageInfo)=>
          callback? err, records
        , paging, sorting

      queryStatisticRecords = (signals, mode='day', period, callback) =>
        return if not signals or (not signals.length)
        if mode is 'now'
          _querySignalRecords = Rx.Observable.fromCallback querySignalRecords
          observableBatch = _.map signals, (s) -> (_querySignalRecords [s], 1, 8, {timestamp: -1}, null, period)
          Rx.Observable.forkJoin(observableBatch).subscribe(
            (resArr) ->
              result = {}
              _.each resArr, (item) -> _.extend result, item[1]
              for signal in signals
                subscribeSignal signal
              return callback? null, result
          )
        else if mode is 'day'
          _querySignalRecords = Rx.Observable.fromCallback querySignalRecords
          observableBatch = _.map signals, (s) -> (_querySignalRecords [s], 1, 10000, {timestamp: 1}, 'day', period)
          Rx.Observable.forkJoin(observableBatch).subscribe(
            (resArr) ->
              result = {}
              _.each resArr, (item) -> _.extend result, item[1]
              return callback? null, result
          )
        else
          filter = {}
          $scope.period = getPeriod mode if not period
          period = $scope.period
          switch mode
            when "week"
              filter.mode = "hour"
              filter.startTime = period.startTime.startOf("week").format("YYYY-MM-DD HH:mm:ss")
              filter.endTime = period.endTime.endOf("week").format("YYYY-MM-DD HH:mm:ss")
              $scope.formatStatisticTime = period.startTime.startOf("week").format("MM/DD") + "-" + period.endTime.endOf("week").format("MM/DD")
            when "month"
              filter.mode = "day"
              filter.startTime = period.startTime.startOf("month").format("YYYY-MM-DD HH:mm:ss")
              filter.endTime = period.endTime.endOf("month").format("YYYY-MM-DD HH:mm:ss")
              $scope.formatStatisticTime = moment(filter.startTime).format("YYYY-MM")
            when "year"
              filter.mode = "month"
              filter.startTime = period.startTime.startOf("year").format("YYYY-MM-DD HH:mm:ss")
              filter.endTime = period.endTime.endOf("year").format("YYYY-MM-DD HH:mm:ss")
              $scope.formatStatisticTime = moment(filter.startTime).format("YYYY")
          @commonService.querySignalsStatisticData signals, filter.startTime, filter.endTime, filter.mode, (err, records, pageInfo)=>
            callback? err, records

      getSeverity = (data) ->
        severity = $scope.project?.typeModels.eventseverities.getItem(data.severity)?.model
        color = severity?.color ? '#0faa57'
        tooltip = severity?.name ? '信号正常'
        return {color: color, tooltip: tooltip}

      getLegend = (signals) ->
        legend = []
        for s in signals
          legend.push s.model.name
        legend

      getPoints = (signal, values) ->
        points = []
        for value in values
          point = getPoint signal, value
          points.push point
#                points
        _.sortBy points, (p) -> p.value[0]

      getPoint = (signal, value) ->
        return if not signal
        severity = getSeverity value
        timestamp = moment(value.timestamp).format 'HH:mm:ss'
        tooltip = "#{signal.model.name}: #{formatString(value.value, 'float', '0.[00]')}#{$scope.project.dictionary.signaltypes.keys[signal.model.unit]?.model.unit ? ""}<br/>#{moment(value.timestamp).format('YYYY-MM-DD HH:mm:ss')}"
        tooltip += '<br/><span style="display:inline-block;border-radius:10px;width:9px;height:9px;background-color:' + severity.color + '"></span>'
        tooltip += " #{severity.tooltip}"
        point =
          name: timestamp
          value: [
            new Date value.timestamp
            value.value
            tooltip
          ]
        point

      getSeries = (signals, values) ->
        areaColors = [
          [{offset: 0, color: '#32CD32'},{offset: 1, color: '#ffffff'}],
          [{offset: 0, color: '#00ff00'},{offset: 1, color: '#ffffff'}],
          [{offset: 0, color: '#0000ff'},{offset: 1, color: '#ffffff'}],
          [{offset: 0, color: '#FFC0CB'},{offset: 1, color: '#ffffff'}],
          [{offset: 0, color: '#9400D3'},{offset: 1, color: '#ffffff'}],
          [{offset: 0, color: '#00BFFF'},{offset: 1, color: '#ffffff'}],
          [{offset: 0, color: '#000000'},{offset: 1, color: '#ffffff'}]]
        return if not signals.length
        series = []
        index = 0
        for k, v of values
          signal = _.find signals, (s) -> s.key is k
          points = getPoints signal, v.values
          sere =
            name: signal?.model.name
            type: 'line'
            data: points
            smooth:true,
#            symbol:"none"
            itemStyle:
              color:
                type:'linear'
              normal:
                lineStyle:
                  width: 2
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0,
                    [
                      {offset: 0, color: '#10A858'},
                      {offset: 0.5, color: '#0D9D7A'},
                      {offset: 1, color: '#098CAA'}
                    ]
                  )
                areaStyle:
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,areaColors[index]
                  )
          index += 1
          series.push sere
        if _.isEmpty values
          for signal in signals
            sere =
              name: signal?.model.name
              type: 'line'
              data: []
              smooth:true,
              itemStyle:
                color:
                  type:'linear'
                normal:
                  lineStyle:
                    width: 2
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 1, 0,
                      [
                        {offset: 0, color: '#10A858'},
                        {offset: 0.5, color: '#0D9D7A'},
                        {offset: 1, color: '#098CAA'}
                      ]
                    )
                  areaStyle:
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,areaColors[index]
                    )
            index += 1
            series.push sere
        series

      getUnit = (unitId) ->
        return '' if not unitId
        for item in $scope.project.dictionary?.signaltypes.items
          unitItem = item.model
          if unitItem.type == unitId
            return unitItem.unit
        return unitId

      createOption = (title, signals, values) =>
        series = getSeries signals, values
        legend = getLegend signals
        option =
          color: ['#0faa57']
          grid:
#            left: 0,
            top: 50,
            bottom: 50,
#            right: 0,
            containLabel: false
          tooltip:
            trigger: 'axis'
            formatter: (params) ->
              params[0]?.data?.value?[2] ? ''
          legend:
            data: legend
          dataZoom: [{
            type: 'inside'
          }, {
            type: 'slider'
          }],
          xAxis:
            type: 'time'
            axisTick:
              show: false
            axisLabel:
              show: true
              formatter: "{value}"
              textStyle:
                color: '#c3c3c3'
            axisLine:  # x轴
              show:false
              lineStyle:
                color: '#000'
            splitLine:
              show: false
          yAxis:
            type: 'value'
            axisTick:
              show: false
            axisLabel:
              show: true
              formatter: "{value}"
              textStyle:
                color: '#c3c3c3'
            axisLine:     #y轴
              show:false
              lineStyle:
                color: '#000'
            splitLine:
              show: true
              lineStyle:    #属性lineStyle（详见lineStyle）控制线条样式
                color: ['#dedede'],
                width: 1,
                type: 'dashed'
          series: series
        option

      $scope.filterSignal = () =>
        (signal) =>
          if signal.model.dataType is 'float'
            return true
#          if signal.model.dataType is 'int'
#            return true
          return false

    resize: ($scope)->
      $scope.myChart?.resize()

    dispose: ($scope)->
      $scope.myChart?.dispose()
      $scope.myChart = null
      $scope.signalIdSubscription?.dispose()
      $scope.equipmentIdSubscription?.dispose()
      $scope.stationIdSubscription?.dispose()
      for key, value of $scope.subscriptions
        value?.dispose()


  exports =
    MobileHistorycurveDirective: MobileHistorycurveDirective
