`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class ATS extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("line1VoltageA" , message["203026001"])
      @bindSignal("line1VoltageB", message["203028001"])
      @bindSignal("line1VoltageC", message["203030001"])
      @bindSignal("line2VoltageA", message["203026002"])
      @bindSignal("line2VoltageB", message["203028002"])
      @bindSignal("line2VoltageC", message["203030002"])
      @bindSignal("autoOrManualState", message["203154001"])
      @bindSignal("switch1Status", message["203156001"])
      @bindSignal("switch2Status", message["203156002"])
      @bindSignal("inputCurrentA", message["203032001"])
      @bindSignal("inputCurrentB", message["203033001"])
      @bindSignal("inputCurrentC", message["203034001"])

      @signals

    setCommands: (msg) ->
      message = @translateObject msg, 'command'
      @bindCommand("autoOrManualState", message["203009001"])

      @commands

  exports =
    ATS: ATS