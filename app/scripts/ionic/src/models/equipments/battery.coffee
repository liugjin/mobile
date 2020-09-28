`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class Battery extends base.DeviceModel
    constructor: () ->
      super

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal("batteryVoltage", message["1101170001"])
      @bindSignal("batteryCurrent", message["1101174001"])
      @bindSignal("batteryTemperature", message["1101193001"])
      @bindModuleSignal("cellVoltage12V", (n)->
        message["11011910"+ if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("cellVoltage6V", (n)->
        message["11013090"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("cellVoltage2V", (n)->
        message["11011920"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g1CellVoltage12V", (n)->
        message["11011790"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g1CellVoltage6V", (n)->
        message["11013010"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g1CellVoltage2V", (n)->
        message["11011800"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g2CellVoltage12V", (n)->
        message["11011820"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g2CellVoltage6V", (n)->
        message["11013030"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g2CellVoltage2V", (n)->
        message["11011830"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g3CellVoltage12V", (n)->
        message["11011850"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g3CellVoltage6V", (n)->
        message["11013050"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g3CellVoltage2V", (n)->
        message["11011860"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g4CellVoltage12V", (n)->
        message["11011880"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g4CellVoltage6V", (n)->
        message["11013070"+if n>9 then n else "0"+n]
      ,1)
      @bindModuleSignal("g4CellVoltage2V", (n)->
        message["11011890"+if n>9 then n else "0"+n]
      ,1)

      @signals

    setCommands: (msg) ->

      @commands

  exports =
    Battery: Battery