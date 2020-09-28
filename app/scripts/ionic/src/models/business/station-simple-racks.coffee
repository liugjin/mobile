###
* File: station-simple-racks
* User: Dow
* Date: 4/27/2016
* Desc: don't load servers of rack
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/disposable', './racks'], (base, rs) ->
  class StationSimpleRacks extends base.Disposable
    constructor: (@station) ->
      super

      @racks = new rs.Racks @station

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
#            rack.loadServers null, null, refresh

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
#      else if m.type is 'server'
#        @rack?.updateModel m
#        for rack in @racks.items
#          result = rack.updateModel m
#          return result if result


  exports =
    StationSimpleRacks: StationSimpleRacks
