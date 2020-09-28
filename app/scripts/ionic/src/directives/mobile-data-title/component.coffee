###
* File: mobile-data-title-directive
* User: David
* Date: 2020/03/09
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileDataTitleDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-data-title"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      dateMap = {
        day: "YYYY-MM-DD",
        month: "YYYY-MM",
        year: "YYYY"
      }
      scope.currdate = moment().subtract(5, "day").format(dateMap["day"]) + " ~ " + moment().format(dateMap["day"])
      @subscription?.dispose()
      @subscription = @commonService.subscribeEventBus "task-type", (msg) =>
        if msg and msg.message
          type = msg.message.type
          exec = if type == "year" then 3 else 5
          scope.currdate = moment().subtract(exec, type).format(dateMap[type]) + " ~ " + moment().format(dateMap[type])
    resize: (scope)->

    dispose: (scope)->
      @subscription?.dispose()

  exports =
    MobileDataTitleDirective: MobileDataTitleDirective