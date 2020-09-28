`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class Door extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("doorStatus" , message["1001303001"])
      @bindSignal("lastOpenCardNo", message["1001305001"])
      @bindSignal("swapCardYear", message["1001306001"])
      @bindSignal("swapCardMonth", message["1001307001"])
      @bindSignal("swapCardDay", message["1001308001"])
      @bindSignal("swapCardHour", message["1001309001"])
      @bindSignal("swapCardMinute", message["1001310001"])
      @bindSignal("swapCardSecond", message["1001311001"])

      @signals

    setCommands: (msg) ->
      message = @translateObject msg, 'command'
      @bindCommand("openDoor", message["1001010001"])

      @commands

  exports =
    Door: Door