`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/disposable', 'underscore'], (base, _) ->
  class DeviceModel extends base.Disposable
    # @parent: items-model
    constructor: () ->
      super
      @signals = {}
      @events = {}
      @commands = {}

    translateObject : (msg, type) ->
      message = {}
      return message if !msg
      for m in msg
#        key = eval("m.model."+type)
        key = m.model[type]
        message[key] = m
      message

    bindSignal: (name, originSignal) ->
#      eval("this.signals."+name+"={}")
#      modelSignal = eval("this.signals."+name)
      modelSignal = @signals[name] = {}

      if originSignal
        modelSignal.oid = originSignal.model.signal
        modelSignal.id = name
        modelSignal.value = originSignal.data.value
        modelSignal.name = originSignal.model.name
        modelSignal.unit = originSignal.unit?.unit
        modelSignal.eventSeverity = originSignal.data.eventSeverity.severity if originSignal.data.eventSeverity?

    bindModuleSignal: (name, callback, n) ->
      originSignal = callback(n)
      if originSignal
        this.bindSignal name+n, originSignal
        this.signals.moduleNum = n
        this.bindModuleSignal name, callback, n+1

    updateSignal: (originSignal) ->
      signal = _.findWhere(@signals, {oid: originSignal.model.signal})
      if signal
        signal.value = originSignal.data.value
        signal.unit = originSignal.unit?.unit
        signal.eventSeverity = originSignal.data.eventSeverity?.severity

    bindEvent: (name, originEvent) ->
      if originEvent
#        eval("this.events."+name+"=originEvent")
        @events[name] = originEvent

    updateEvent: (originEvent) ->
      event = @events[originEvent.model.event]
      event.model = originEvent.model
      event.data = originEvent.data

    bindCommand: (name, originCommand) ->
      if originCommand
#        eval("this.commands."+name+"=originCommand")
        @commands[name] = originCommand

    setEvents: (msg) ->
      return @events if !msg?
      for m in msg
        key = m.model.event
        @events[key] = {}
        @events[key].model = m.model
        @events[key].data = m.data

      @events

    # add some base method to avoid exception without implementation in sub-class
    setPorts: () ->

    setSignals: () ->

    setCommands: () ->


  exports =
    DeviceModel: DeviceModel