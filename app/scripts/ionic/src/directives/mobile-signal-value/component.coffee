###
* File: mobile-signal-value-directive
* User: bingo
* Date: 2019/02/18
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileSignalValueDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-signal-value"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: ($scope, element, attrs) =>
      $scope.moreImg = @getComponentPath('image/more.svg')

      $scope.$watch 'station', (station)=>
        return if not station
        @getEquipment $scope, $scope.parameters.equipment ? '_station_management'

      $scope.$watch 'equipment', (equipment)=>
        return if not equipment
        @getSignal $scope, $scope.parameters.signal ? ''

      $scope.$watch 'signal', (signal)=>
        return if not signal
        filter =
          user: signal.model.user
          project: signal.model.project
          station: signal.equipment.model.station
          equipment: signal.equipment.model.equipment
          signal: signal.model.signal
        $scope.signalSubscrip = @commonService.signalLiveSession.subscribeValues filter, (err, d) =>
          return if not d
          signal.setValue d.message

    resize: ($scope)->

    dispose: ($scope)->
      $scope.signalSubscrip.dispose()


  exports =
    MobileSignalValueDirective: MobileSignalValueDirective
