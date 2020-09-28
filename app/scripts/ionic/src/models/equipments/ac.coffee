`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class AC extends base.DeviceModel
    constructor: () ->
      super
#
#      @equipment = @parent.parent
#      @station = @equipment.station

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("temperature" , message["702001001"])
      @bindSignal("humidity", message["702003001"])
      @bindSignal("runningTime", message["702218001"])
      @bindSignal("powerStatus", message["702155001"])
      @bindSignal("temperatureSet", message["702216001"])
      @bindSignal("humiditySet", message["702217001"])
      @bindSignal("supplyTemperature", message["702330001"])
      @bindSignal("supplyHumidity", message["702331001"])
      @bindSignal("fanState", message["702206001"])
      @bindSignal("coolState", message["702202001"])
      @bindSignal("hotState", message["702203001"])
      @bindSignal("compressorPressure", message["702205001"])
      @bindSignal("sumCoolTime", message["702316001"])
      @bindSignal("dischargeTemperature", message["702204001"])

      @signals

    setCommands: (msg) ->
      message = @translateObject msg, 'command'
      @bindCommand("powerStatus", message["702003001"])
      @bindCommand("temperatureSet", message["702053001"])
      @bindCommand("humiditySet", message["702054001"])

      @commands

  exports =
    AC: AC