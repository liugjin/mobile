###
* File: mobile-order-node-directive
* User: bingo
* Date: 2019/07/04
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileOrderNodeDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-order-node"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: ($scope, element, attrs) =>
      $scope.contents = null

      # 查询工单报表
      queryTaskReport = () =>
        @commonService.loadProjectModelByService 'tasks', { task: $scope.parameters.orderId }, 'user _id project type process name creator task phase nodes createtime', (err, taskModels) =>
          #console.log(taskModels)
          return if err or not taskModels
          contents = []
          _.map taskModels.nodes[0].contents, (content) =>
            if not content.type
              contents.push content
#            if content.type
#              contents.push JSON.parse(content.content)
#            else
#              contents.push content
          $scope.contents = contents
          $scope.task = taskModels
          #console.log $scope.task
          #console.log $scope.contents

      queryTaskReport()

    resize: ($scope)->

    dispose: ($scope)->


  exports =
    MobileOrderNodeDirective: MobileOrderNodeDirective
