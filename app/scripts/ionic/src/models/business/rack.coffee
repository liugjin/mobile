###
* File: rack
* User: Dow
* Date: 4/7/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./equipment-model', './servers', './pdus'], (base, ss, ps) ->
  class Rack extends base.EquipmentModel
    constructor: (parent, model) ->
      super parent, model

      @servers = new ss.Servers @
      @pdus = new ps.Pdus @

    # factory method
    loadMe: (id, callback, refresh) ->
      m = @parent.model

      filter =
        user: m.user
        project: m.project
        station: m.station
        equipment: id
      fields = null

      # async load
      @load filter, fields, (err, model) =>
        @loadProperties null, null, refresh
        @loadServers null, null, refresh
        @loadPdus null, null, refresh

        callback? err, model
      , refresh

    loadServers: (fields, callback, refresh) ->
      m = @model

      filter =
        user: m.user
        project: m.project
        station: m.station
        type: 'server'
        parent: m.equipment

      @servers.load filter, fields, (err, servers) =>
        for server in servers
          server.loadProperties()

        callback? err,  servers
      , refresh

    addServer: (server) ->
      @servers.appendItem server

    removeServer: (key) ->
      # move server to unplaced servers
      @servers.removeItem key, false

    dispose: (disposing) ->
      super disposing

      @servers.dispose disposing

    updateModel: (m) ->
      if m.type is 'rack'
        # update rack model only
        @setModel m
      else if m.type is 'server'
        @updateServerModel m

    updateServerModel: (m) ->
      server = @servers.getItemByIds m

      if server
        # in the same rack
        if m.parent is @model.equipment
          server.setModel m
        else
          # remove from the rack
          @servers.removeItem server.key, false
      else
        # add to the rack
        if m.parent is @model.equipment
          server = @servers.addItem m
          server.loadProperties()

      server

    loadPdus: (fields, callback, refresh) ->
      m = @model

      filter =
        user: m.user
        project: m.project
        station: m.station
        type: 'pdu'
        parent: m.equipment

      @pdus.load filter, fields, (err, pdus) =>
        for pdu in pdus
          pdu.loadProperties()
          pdu.loadPorts()

        callback? err,  pdus
      , refresh



  exports =
    Rack: Rack
