###
* File: unplaced-servers
* User: Dow
* Date: 4/26/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/disposable', './servers'], (base, ss) ->
  class UnplacedServers extends base.Disposable
    constructor: (@station) ->
      super

      @servers = new ss.Servers @station

    loadServers: (fields, callback, refresh) ->
      m = @station.model

      filter =
        user: m.user
        project: m.project
        station: m.station

        type: 'server'

        $or: [
          {parent: ""}
          {parent: null}
        ]

      @servers.load filter, fields, (err, servers) =>
        for server in servers
          server.loadProperties()

        callback? err,  servers
      , refresh

    addServer: (server) ->
      @servers.appendItem server

    removeServer: (key) ->
      # move unplaced server to rack
      @servers.removeItem key, false

    dispose: (disposing) ->
      super disposing

      @servers.dispose disposing

    updateModel: (m) ->
      if m.type is 'server'
        @updateServerModel m

    updateServerModel: (m) ->
      server = @servers.getItemByIds m

      if server
        # remove from unplaced pool
        if m.parent
          @servers.removeItem server.key, false
        else
          server.setModel m
      else
        # add to unplaced pool
        if not m.parent
          server = @servers.addItem m
          server.loadProperties()

      server


  exports =
    UnplacedServers: UnplacedServers
