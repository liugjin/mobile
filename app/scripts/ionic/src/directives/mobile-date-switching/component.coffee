###
* File: mobile-date-switching-directive
* User: David
* Date: 2020/03/09
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileDateSwitchingDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-date-switching"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      element.find('.dropdown-trigger').dropdown()
      type = "day"
      scope.typeList = [
        { name: '日', key: 'day' },
        { name: '月', key: 'month' },
        { name: '年', key: 'year' }
      ]
      # 点击事件
      scope.selectStaticsType = (type) => (
        console.log("type",type)
        return if !type
        if type != scope.staticsType
          scope.staticsType = type
          @commonService.publishEventBus("task-type", { type })
      )

    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileDateSwitchingDirective: MobileDateSwitchingDirective