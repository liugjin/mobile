###
* File: mobile-events-statistic-directive
* User: David
* Date: 2019/07/17
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment", "echarts", "rx"], (base, css, view, _, moment, echarts, Rx) ->
  class MobileEventsStatisticDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-events-statistic"
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
        scope.severities = _.sortBy _.map(scope.project.dictionary.eventseverities.items, (item)->item.model), (ite)->ite.severity
        scope.events = {}

        subject = new Rx.Subject
        filter =
          user: scope.project.model.user
          project: scope.project.model.project
        scope.eventSubscription?.dispose()
        scope.eventSubscription = @commonService.eventLiveSession.subscribeValues filter, (err, d) =>
          return if not d.message?.event
          event = d.message
          key = "#{event.user}.#{event.project}.#{event.station}.#{event.equipment}.#{event.event}.#{event.severity}.#{event.startTime}"
          scope.events[key] = event
          if scope.events.hasOwnProperty key
            delete scope.events[key] if event.endTime or event.phase in ["end", "completed"]
          subject.onNext()

        subject.debounce(50).subscribe =>
          @processEvent scope
      @processEvent scope

    processEvent: (scope) =>
      events = _.values scope.events
      scope.station = _.find scope.project.stations.items, (item)->item.model.station is scope.station.model.station
      stations = @commonService.loadStationChildren scope.station, true
      scope.list = _.filter events, (evt)->evt.station in _.map stations, (item)->item.model.station
      statistic = _.countBy scope.list, (evt)->evt.severity
      for severity in scope.severities
        severity.value = statistic[severity.severity] ? 0
      scope.$applyAsync()
      options = @createChartOption scope
      scope.myChart?.setOption options

    # 创建图表option
    createChartOption: (scope) =>
      return if not scope.severities
      option =
        color: _.map scope.severities, (item)->item.color
        title: {
          text: "告警总数",
          subtext: scope.list.length || '0',
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
            name: "告警总数",
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
            data: scope.severities
          }
        ]
      option

    resize: (scope)->

    dispose: (scope)->
      scope.eventSubscription?.dispose()

  exports =
    MobileEventsStatisticDirective: MobileEventsStatisticDirective
