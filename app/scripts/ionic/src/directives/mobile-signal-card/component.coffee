###
* File: mobile-signal-card-directive
* User: David
* Date: 2019/01/19
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileSignalCardDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-signal-card"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.navigate = =>
        @publishEventBus "navigateTo", {stationId: scope.equipment.model.station, equipmentId:scope.equipment.model.equipment, signalId:scope.signal.model.signal}

    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileSignalCardDirective: MobileSignalCardDirective
