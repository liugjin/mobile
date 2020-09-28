`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class Distributor extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("powerFactor" , message["201036001"])
      @bindSignal("frequency", message["201037001"])
      @bindSignal("inputVoltageA", message["201026001"])
      @bindSignal("inputVoltageB", message["201028001"])
      @bindSignal("inputVoltageC", message["201030001"])
      @bindSignal("protectionStatus", message["201013001"])
      @bindModuleSignal("branchSwitchStatus", (n)->
        message["20115600"+n]
      ,1)
      @bindModuleSignal("branchPower", (n)->
        message["20131600"+n]
      ,1)
      @bindModuleSignal("branchCurrentA", (n)->
        message["20130200"+n]
      ,1)
      @bindModuleSignal("branchCurrentB", (n)->
        message["20130300"+n]
      ,1)
      @bindModuleSignal("branchCurrentC", (n)->
        message["20130400"+n]
      ,1)

      @signals

    setCommands: (msg) ->

      @commands
  exports =
    Distributor: Distributor