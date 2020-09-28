`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class WAC extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("freezeWaterInTemp" , message["705211001"])
      @bindSignal("freezeWaterOutTemp", message["705210001"])
      @bindSignal("coolingWaterInTemp", message["705209001"])
      @bindSignal("coolingWaterOutTemp", message["705208001"])
      @bindSignal("freezeStatus", message["705332001"])
      @bindSignal("freezePumpStatus", message["705333001"])
      @bindSignal("coolingPumpStatus", message["705334001"])
      @bindSignal("fanStatus", message["705335001"])
      @bindSignal("freezeSwitch", message.freezeSwitch)
      @bindSignal("freezePumpSwitch", message.freezePumpSwitch)
      @bindSignal("coolingPumpSwitch", message.coolingPumpSwitch)
      @bindSignal("fanSwitch", message.fanSwitch)

      @signals

    setCommands: (msg) ->

      @commands

  exports =
    WAC: WAC