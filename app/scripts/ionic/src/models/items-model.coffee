###
* File: model
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-base', './view-model'], (base, vm) ->
  #TODO: paging model base is conflict with this class
  class ItemsModel extends base.ItemsBase
    constructor: (@parent, options) ->
      super options

      @engine = @parent.engine
      @caches = {}

    load: (filter, fields, callback, refresh) ->
      # cache
      key = JSON.stringify(filter) + '&' + fields

      if refresh
        @reset()
        delete @caches[key]

      cache = @caches[key]
      if cache
        # load from cache
        if cache.loaded
          callback? null, cache.items
        else
          # all pending callbacks should be invoked after query completed
          cache.callbacks.push callback

        # call service once only
        return

      cache =
        filter: filter
        fields: fields
        callbacks: [callback]
      @caches[key] = cache

      # load
      @service ?= @engine.modelManager.getService @options.id

      @service.query filter, fields, (err, model) =>
        items = @addItems model

        # load flag for rendering
        @loaded = true
        cache.loaded = true
        cache.items = items

        # invoke all pending callbacks
        for cb in cache.callbacks
          cb? err, items
        cache.callbacks = []

      , refresh

    loadOne: (filter, fields, callback, refresh) ->
      item = @getItemByIds filter
      if item
        item.load (err, model) =>
          item = @addItem model
          callback? err, item
        , refresh
      else
        @load filter, fields, (err, items) =>
          callback? err, items?[0]
        , refresh

    createItem: (model) ->
      # this should be override by sub-class
      item = new vm.ViewModel @, model

    dispose: (disposing) ->
      super disposing

      if not disposing
        @cache = {}

      return

  exports =
    ItemsModel: ItemsModel
