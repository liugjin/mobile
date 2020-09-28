###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../view-model', '../items-model'], (base, im) ->
  class EquipmentTemplate extends base.ViewModel
    constructor: (parent, model) ->
      super parent, model

      @properties = new im.ItemsModel @,
        id: 'equipmentproperties'
        keys: ['user', 'project', 'type', 'template', 'property']

      @signals = new im.ItemsModel @,
        id: 'equipmentsignals'
        keys: ['user', 'project', 'type', 'template', 'signal']

      @events = new im.ItemsModel @,
        id: 'equipmentevents'
        keys: ['user', 'project', 'type', 'template', 'event']

      @commands = new im.ItemsModel @,
        id: 'equipmentcommands'
        keys: ['user', 'project', 'type', 'template', 'command']

      @ports = new im.ItemsModel @,
        id: 'equipmentports'
        keys: ['user', 'project', 'type', 'template', 'port']

    loadProperties: (fields, callback, refresh) ->
      filter =
        user: @model.user
        project: @model.project
        type: @model.type
        template: @model.template

      # load base template properties first
      if @base
        @base.loadProperties fields, (err, baseProperties) =>
          @properties.load filter, fields, (err, properties) =>
            # override base properties
            result = []
            keys = {}

            if properties
              for s in properties
                result.push s
                keys[s.model.property] = s

            # put base properties before current
            n = 0
            if baseProperties
              for s in baseProperties
                if not keys[s.model.property]
                  result.splice n++, 0, s

            callback? err, result
          , refresh
        , refresh
      else
        @properties.load filter, fields, callback, refresh

    loadSignals: (fields, callback, refresh) ->
      filter =
        user: @model.user
        project: @model.project
        type: @model.type
        template: @model.template

      # load base template signals first
      if @base
        @base.loadSignals fields, (err, baseSignals) =>
          @signals.load filter, fields, (err, signals) =>
            # override base signals
            result = []
            keys = {}

            if signals
              for s in signals
                result.push s
                keys[s.model.signal] = s

            # put base signals before current
            n = 0
            if baseSignals
              for s in baseSignals
                if not keys[s.model.signal]
                  result.splice n++, 0, s

            callback? err, result
          , refresh
        , refresh
      else
        @signals.load filter, fields, callback, refresh

    loadEvents: (fields, callback, refresh) ->
      filter =
        user: @model.user
        project: @model.project
        type: @model.type
        template: @model.template

      # load base template events first
      if @base
        @base.loadEvents fields, (err, baseEvents) =>
          @events.load filter, fields, (err, events) =>
            # override base events
            result = []
            keys = {}

            if events
              for s in events
                result.push s
                keys[s.model.event] = s

            # put base events before current
            n = 0
            if baseEvents
              for s in baseEvents
                if not keys[s.model.event]
                  result.splice n++, 0, s

            callback? err, result
          , refresh
        , refresh
      else
        @events.load filter, fields, callback, refresh

    loadCommands: (fields, callback, refresh) ->
      filter =
        user: @model.user
        project: @model.project
        type: @model.type
        template: @model.template

      # load base template commands first
      if @base
        @base.loadCommands fields, (err, baseCommands) =>
          @commands.load filter, fields, (err, commands) =>
            # override base commands
            result = []
            keys = {}

            if commands
              for s in commands
                result.push s
                keys[s.model.command] = s

            # put base commands before current
            n = 0
            if baseCommands
              for s in baseCommands
                if not keys[s.model.command]
                  result.splice n++, 0, s

            callback? err, result
          , refresh
        , refresh
      else
        @commands.load filter, fields, callback, refresh

    loadPorts: (fields, callback, refresh) ->
      filter =
        user: @model.user
        project: @model.project
        type: @model.type
        template: @model.template

      # load base template ports first
      if @base
        @base.loadPorts fields, (err, basePorts) =>
          @ports.load filter, fields, (err, ports) =>
            # override base ports
            result = []
            keys = {}

            if ports
              for s in ports
                result.push s
                keys[s.model.port] = s

            # put base ports before current
            n = 0
            if basePorts
              for s in basePorts
                if not keys[s.model.port]
                  result.splice n++, 0, s

            callback? err, result
          , refresh
        , refresh
      else
        @ports.load filter, fields, callback, refresh

    getModelValue: (name) ->
      val = @model[name]
      return val if val

      # return base model value
      @base?.getModelValue name

    getSampleUnits: ->
      sampleUnits = {}

      if @model.sampleUnits
        for su in @model.sampleUnits
          # equipment instance may change su value
          su2 = {}
          for k, v of su
            su2[k] = v
          sampleUnits[su2.id] = su2

      if @base
        sus = @base.getSampleUnits()

        if sus
          # override base
          for key, su of sus when not sampleUnits.hasOwnProperty(key)
            sampleUnits[key] = su

      sampleUnits

    dispose: ->
      super

      @signals.dispose()
      @events.dispose()
      @commands.dispose()
      @ports.dispose()


  exports =
    EquipmentTemplate: EquipmentTemplate
