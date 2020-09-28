###
* File: mobile-focus-equip-directive
* User: David
* Date: 2019/07/19
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileFocusEquipDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-focus-equip"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.equips = []
      scope.statusSubscription = {}
      scope.alarmSubscription = {}
      stations = @commonService.loadStationChildren scope.station, true
      for station in stations
        station.loadEquipments null, null, (err, equips)=>
          _.each equips, (equip) => @checkEquipFollow scope, equip

    checkEquipFollow: (scope, equip)=>
      if @filterType scope, equip.model.type
        equip.loadProperties null, (err, properties) =>
          follow = JSON.parse equip.getPropertyValue("follow", "{}")
          if follow[@commonService.$rootScope.user.user]
            equip.loadSignals null, (err, signals) =>
              communication = _.find signals, (sig)->sig.model.signal is "communication-status"
              scope.statusSubscription[equip.key]?.dispose()
              scope.statusSubscription[equip.key] = @commonService.subscribeSignalValue communication
              alarms = _.find signals, (sig)->sig.model.signal is "alarms"
              scope.alarmSubscription[equip.key]?.dispose()
              scope.alarmSubscription[equip.key] = @commonService.subscribeSignalValue alarms
            scope.equips.push equip

    filterType: (scope, type) ->
      item = _.find scope.project.dictionary.equipmenttypes.items, (tp)->tp.model.type is type
      return false if item?.model?.visible is false
      return false if type.substr(0,1) is "_"
      return true

    resize: (scope)->

    dispose: (scope)->
      for key, value of scope.statusSubscription
        value?.dispose()
      for key, value of scope.alarmSubscription
        value?.dispose()

  exports =
    MobileFocusEquipDirective: MobileFocusEquipDirective
