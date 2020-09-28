###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './station'], (base, cm) ->
  class Stations extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      @options.id ?= 'stations'
      @options.keys ?= ['user', 'project', 'station']

      @roots = []

    createItem: (model) ->
      item = new cm.Station @, model

    load: (filter, fields, callback, refresh) ->
      super filter, fields, (err, stations) =>
        @processStations stations
        callback? err, stations
      , refresh

    processStations: (stations) ->
      return if not stations

      processStation =  (station, root) ->
        station.root = root
        station.stations.length = 0

        id = station.model.station
        for s in stations when s.model.parent is id
          s.parentStation = station
          station.appendStation s

          processStation s, root

        station

      # clear roots firstly
      @roots.length = 0
      for s in stations when not s.model.parent
        s2 = processStation s, s
        @roots.push s2

      @roots

    addNewItem: (item) ->
      newItem = super item

      # add new item into parent's stations
      parentStation = newItem.parentStation
      if parentStation
        newItem.root = parentStation.root
        parentStation.appendStation newItem
      else
        @roots.push newItem

      newItem

    removeItem: (key) ->
      item = super key
      return if not item

      # add new item into parent's stations
      parentStation = item.parentStation
      if parentStation
        parentStation.stations.splice parentStation.stations.indexOf(item), 1
      else
        @roots.splice @roots.indexOf(item), 1

      item


  exports =
    Stations: Stations
