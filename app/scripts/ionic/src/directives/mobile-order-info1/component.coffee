###
* File: mobile-order-info1-directive
* User: David
* Date: 2019/08/06
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileOrderInfo1Directive extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-order-info1"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.getMaxValue = (variable) ->
        return if not variable
        values = _.values variable
        ret = _.max values if values.length > 0
        ret = "" if values.length is 0
        ret

      @commonService.loadProjectModelByService 'tasks', { task: scope.parameters.orderId }, 'user _id project type process name creator task phase nodes createtime', (err, taskModels) =>
        return if err or not taskModels
        contents = []
        _.map taskModels.nodes[0].contents, (content) =>
          if not content.type
            contents.push content
        scope.contents = contents
        scope.content = contents[0]?.content
        scope.task = taskModels

    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileOrderInfo1Directive: MobileOrderInfo1Directive
