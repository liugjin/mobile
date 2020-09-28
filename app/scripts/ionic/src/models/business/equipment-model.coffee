###
* File: business-model
* User: Dow
* Date: 4/21/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../common/equipment'], (base) ->
  class EquipmentModel extends base.Equipment
    constructor: (parent, model) ->
      super parent, model

  #    dispose: ->
#      super
#
#      @equipment.dispose()
#
#    getPropertyValue: (key, defaultValue) ->
#      @equipment.getPropertyValue key, defaultValue
#
#    setPropertyValue: (key, value) ->
#      @equipment.setPropertyValue key, value
#
#    subscribePropertyValue: (key, callback, initializedValue, throttle) ->
#      @equipment.subscribePropertyValue key, callback, initializedValue, throttle
#
#    subscribePropertiesValue: (keys, callback, throttle) ->
#      @equipment.subscribePropertiesValue keys, callback, throttle


  exports =
    EquipmentModel: EquipmentModel
