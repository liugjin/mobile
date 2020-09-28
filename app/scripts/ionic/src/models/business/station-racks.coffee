###
* File: station-racks
* User: Dow
* Date: 4/27/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/disposable', './racks', 'iced-coffee-script'], (base, rs, iced) ->
  iced = iced.iced if iced.iced

  class StationRacks extends base.Disposable
    constructor: (@station) ->
      super

      @racks = new rs.Racks @station

    loadRack: (id, callback, refresh) ->
      m = @station.model

      filter =
        user: m.user
        project: m.project
        station: m.station
        type: 'rack'
        equipment: id

      await @racks.load filter, null, defer(err, model), refresh
      @rack = rack = model?[0]
      if rack
        await rack.loadProperties null, defer(err), refresh
        await rack.loadSignals null, defer(err), refresh
        await rack.loadServers null, defer(err), refresh
        await rack.loadPdus null, defer(err), refresh

      callback? err, rack

    loadRacks: (ids, callback, refresh) ->
      m = @station.model

      filter =
        user: m.user
        project: m.project
        station: m.station
        type: 'rack'

      filter.equipment = ids if ids

      @racks.load filter, null, (err, model) =>
        if model
          for rack in model
            rack.loadProperties null, null, refresh
            rack.loadSignals null, null, refresh
            rack.loadServers null, null, refresh
            rack.loadPdus null, null, refresh

          @rack = model[0]

        callback? err, model
      , refresh

    dispose: (disposing) ->
      super disposing

      @racks.dispose disposing

    updateModel: (m) ->
      if m.type is 'rack'
        rack = @racks.getItemByIds m
        rack?.updateModel m
      else if m.type is 'server'
#        @rack?.updateModel m
        for rack in @racks.items
          result = rack.updateModel m
          return result if result


  exports =
    StationRacks: StationRacks
