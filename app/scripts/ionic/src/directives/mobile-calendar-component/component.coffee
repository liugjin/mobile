###
* File: mobile-calendar-component-directive
* User: David
* Date: 2020/03/19
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileCalendarComponentDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-calendar-component"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      console.log("456",scope.parameters)
      element.find('.datepicker').attr("id",scope.parameters.id)
      getPeriod = (mode='day') ->
        switch mode
          when 'day'
            startTime = moment().startOf('day')
            endTime = moment().endOf('day')
          else
            startTime = moment().subtract 60, 'minutes'
            endTime = moment()
        scope.period =
          startTime: startTime
          endTime: endTime
          mode: mode

      nextPeriod = (mode='day') =>
        if not scope.period
          return getPeriod mode
        switch scope.period.mode
          when 'day'
            startTime = moment(scope.period.startTime).add(1, 'day').startOf 'day'
            endTime = moment(scope.period.startTime).add(1, 'day').endOf 'day'
            console.log("startTime",startTime)
            console.log("endTime",endTime)
          else
            startTime = scope.period.endTime
            endTime = moment(scope.period.endTime).add(60, 'minutes')
        scope.period =
          startTime: startTime
          endTime: endTime
          mode: scope.period.mode

      previousPeriod = (mode='day') =>
        if not scope.period
          return getPeriod mode
        switch scope.period.mode
          when 'day'
            startTime = moment(scope.period.startTime).subtract(1, 'day').startOf 'day'
            endTime = moment(scope.period.startTime).subtract(1, 'day').endOf 'day'
          else
            startTime = moment(scope.period.startTime).subtract(60, 'minutes')
            endTime = scope.period.startTime
        scope.period =
          startTime: startTime
          endTime: endTime
          mode: scope.period.mode

      scope.period = getPeriod scope.mode
      scope.formatStartTime = moment(scope.period.startTime).format('YYYY-MM-DD')
      calendar = new LCalendar()
      calendar.init {
        trigger: '#'+scope.parameters.id,
        type: 'date',
        minDate: moment().subtract(10, 'years').format('YYYY-MM-DD'),
        maxDate: moment().format('YYYY-MM-DD')
      }

      # 日期选择
      scope.selectDates = () =>
        scope.period.startTime = scope.formatStartTime
        scope.selectDate()

      # 上一天，下一天
      scope.selectDate = (periodType) =>
        switch periodType
          when 'next'
            scope.period = nextPeriod()
          when 'previous'
            scope.period = previousPeriod()
          when 'refresh'
            scope.period = scope.period ? getPeriod()
          else
            scope.period.startTime = moment(scope.period.startTime).startOf 'day'
            scope.period.endTime = moment(scope.period.startTime).endOf 'day'
        scope.formatStartTime = moment(scope.period.startTime).format('YYYY-MM-DD')
        scope.period.mode = 'day'
        @commonService.publishEventBus("task-date", {period:scope.period,id:scope.parameters.id})
        console.log("period",scope.period)
    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileCalendarComponentDirective: MobileCalendarComponentDirective