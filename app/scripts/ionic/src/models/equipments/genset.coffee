`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class Genset extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("outputVoltageA" , message["301056001"])
      @bindSignal("outputVoltageB", message["301058001"])
      @bindSignal("outputVoltageC", message["301060001"])
      @bindSignal("outputCurrentA", message["301062001"])
      @bindSignal("outputFrequency", message["301067001"])
      @bindSignal("batteryVoltage", message["301225001"])
      @bindSignal("motorSpeed", message["301220001"])
      @bindSignal("oilTemperature", message["301222001"])
      @bindSignal("oilPressure", message["301221001"])
      @bindSignal("waterTemperature", message["301223001"])
      @bindSignal("oilLevel", message["301227001"])

      @signals

    setCommands: (msg) ->

      @commands

  exports =
    Genset: Genset