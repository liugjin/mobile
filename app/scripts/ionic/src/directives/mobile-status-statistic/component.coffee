###
* File: mobile-status-statistic-directive
* User: David
* Date: 2019/07/17
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts", "rx"], (base, css, view, _, moment, echarts, Rx) ->
  class MobileStatusStatisticDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-status-statistic"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      e = element.find('.ratio-pie')
      scope.myChart?.dispose()
      scope.myChart = echarts.init(e[0])

      if scope.firstload
        scope.status = {}
        scope.states = [
          {name:"在线设备", value: 0, color: '#1B98F5'},
          {name:"离线设备", value: 0, color: '#d2cdcd'}
        ]
        scope.equips = []

        n = 0
        subject = new Rx.Subject
        for station in scope.project.stations.nitems
          scope.status[station.model.station] = {count: 0, equipments:{}}
          @loadStationEquipStatistics scope, station, =>
            n++
            if n is scope.project.stations.nitems.length
              @processState scope

              filter = scope.project.getIds()
              filter.station = "+"
              filter.equipment = "+"
              filter.signal = "communication-status"
              scope.statusSubscription?.dispose()
              scope.statusSubscription = @commonService.signalLiveSession.subscribeValues filter, (err, d)=>
                return if not @filterType(scope, d.message.equipmentType) or d.message.station+"."+d.message.equipment not in scope.equips
                scope.status[d.message.station].equipments[d.message.equipment] = d.message.value
                subject.onNext()
              subject.debounce(200).subscribe =>
                @processState scope
      else
        @processState scope

    loadStationEquipStatistics: (scope, station, callback) =>
      station.loadEquipments null, null, (err, equips) =>
        items = _.filter equips, (equip)=>
          scope.equips.push equip.model.station+"."+equip.model.equipment
          @filterType scope, equip.model.type
        scope.status[station.model.station].count += items.length
        callback?()
      ,true

    filterType: (scope, type) ->
      item = _.find scope.project.dictionary.equipmenttypes.items, (tp)->tp.model.type is type
      return false if item?.model?.visible is false
      return false if type.substr(0,1) is "_"
      return true

    processState: (scope) =>
      stations = @commonService.loadStationChildren scope.station, true
      list = _.map stations, (station)->station.model.station
      count = 0
      onlines = 0
      for key, value of scope.status
        if key in list
          count += value.count
          onlines += _.reduce _.values(value.equipments), ((memo,num)->memo+(if num is 0 then 1 else 0)), 0
      scope.states[0].value = onlines
      scope.states[1].value = count - onlines
      scope.$applyAsync()
      options = @createChartOption scope, count
      scope.myChart?.setOption options

    # 创建图表option
    createChartOption: (scope, count) =>
      return if not scope.states
      option =
        color: _.map scope.states, (item)->item.color
        title: {
          text: "设备总数",
          subtext: count || '0',
          textStyle: {
            color: '#000',
            fontSize: 12
          },
          subtextStyle: {
            fontSize: 14,
            color: ['#000']
          },
          x: 'center',
          top: '35%'
        },
        series:[
          {
            name: "设备总数",
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
                show: false
              }
            },
            data: scope.states
          }
        ]
      option


    resize: (scope)->

    dispose: (scope)->
      scope.statusSubscription?.dispose()


  exports =
    MobileStatusStatisticDirective: MobileStatusStatisticDirective
