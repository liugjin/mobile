`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class PowerMeter extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("powerFactor" , message["1501036001"])
      @bindSignal("frequency", message["1501037001"])
      @bindSignal("voltageA", message["1501026001"])
      @bindSignal("voltageB", message["1501028001"])
      @bindSignal("voltageC", message["1501030001"])
      @bindSignal("powerA", message["1501303001"])
      @bindSignal("powerB", message["1501304001"])
      @bindSignal("powerC", message["1501305001"])
      @bindSignal("energy", message["1501039001"])
      @bindSignal("currentA", message["1501032001"])
      @bindSignal("currentB", message["1501033001"])
      @bindSignal("currentC", message["1501034001"])

      @signals

    setCommands: (msg) ->

      @commands

  exports =
    PowerMeter: PowerMeter