`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class Rectifier extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("inputVoltageA" , message["401026001"])
      @bindSignal("inputCurrentA", message["401032001"])
      @bindSignal("outputVoltage", message["401110001"])
      @bindSignal("loadCurrent", message["401113001"])
      @bindModuleSignal("switchStatus", (n)->
        message["4011150"+if n>9 then n else "0"+n]
      ,1)

      @signals

    setCommands: (msg) ->

      @commands

  exports =
    Rectifier: Rectifier