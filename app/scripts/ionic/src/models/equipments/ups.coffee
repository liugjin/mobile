`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./device-model'], (base) ->
  class Ups extends base.DeviceModel
    constructor: () ->
      super
#
#      @equipment = @parent.parent
#      @station = @equipment.station

    setSignals: (msg) ->
      message = @translateObject msg, 'signal'
      @bindSignal('outFrequency', message['501067001'])
      @bindSignal('bypassFrequency', message['501097001'])
      @bindSignal('loadCurrentA', message['501062001'])
      @bindSignal('loadCurrentB', message['501063001'])
      @bindSignal('loadCurrentC', message['501064001'])
      @bindSignal('outputLoadRateA', message['501502001'])
      @bindSignal('outputLoadRateB', message['501503001'])
      @bindSignal('outputLoadRateC', message['501504001'])
      @bindSignal('loadVoltageA', message['501056001'])
      @bindSignal('loadVoltageB', message['501058001'])
      @bindSignal('loadVoltageC', message['501060001'])
      @bindSignal('bypassVoltageA', message['501086001'])
      @bindSignal('bypassVoltageB', message['501088001'])
      @bindSignal('bypassVoltageC', message['501090001'])
      @bindSignal('inputVoltageAB', message['501020001'])
      @bindSignal('inputVoltageBC', message['501022001'])
      @bindSignal('inputVoltageCA', message['501024001'])
      @bindSignal('batteryVoltage', message['501172001'])
      @bindSignal('batteryCurrent', message['501174001'])
      @bindSignal('batteryTemperature', message['501181001'])

      @signals

    setCommands: (msg) ->

      @commands

  exports =
    Ups: Ups