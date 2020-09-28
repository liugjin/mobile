###
* File: mobile-order-handle-directive
* User: David
* Date: 2019/07/30
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileOrderHandleDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-order-handle"
      super $timeout, $window, $compile, $routeParams, commonService
      #@taskService = commonService.modelEngine.modelManager.getService("tasks")
    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      element.find('.collapsible').collapsible()
      scope.focus = 1
      scope.selectEquipType=(i)=>
        scope.focus = i
        console.log("123",scope.focus)

    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileOrderHandleDirective: MobileOrderHandleDirective
