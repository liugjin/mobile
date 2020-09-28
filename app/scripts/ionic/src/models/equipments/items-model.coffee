###
* File: model
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./paging-model', './view-model'], (base, vm) ->
  #TODO: paging model base is conflict with this class
  class ItemsModel extends base.PagingModel
    constructor: (@parent, options) ->
      super options

      @engine = @parent.engine

      @items = []
      @keys = {}
      @index = 0

      @caches = {}

    load: (filter, fields, callback, refresh) ->
      # cache
      key = JSON.stringify(filter) + '&' + fields

      if refresh
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

        # invoke all pending callbacks
        for cb in cache.callbacks
          cb? err, items

        cache.loaded = true
        cache.items = items
        cache.callbacks = []

      , refresh

    getKey: (model) ->
      if @options.keys?.length
        seperator = @options.keysSeperator || '_'
        key = ''

        for k, i in @options.keys
          key += seperator if i > 0
          key += model[k]
      else
        key = model._id

      key

    getItem: (key) ->
      @keys[key]

    getItemByIds: (ids) ->
      key = @getKey ids
      @getItem key

    getModels: ->
      models = (item.model for item in @items)

    addItems: (models) ->
      return [] if not models

      result = []
      # allow set array or single object
      if models instanceof Array
        for model in models
          item = @addItem model
          result.push item
      else
        item = @addItem models
        result.push item

      result

    addItem: (model) ->
      item = @createItem model
      return if not item

      key = @getKey model
      item.setModel key, model

      @appendItem item

    createItem: (model) ->
      # this should be override by sub-class
      item = new vm.ViewModel @, model

    addNewItem: (item) ->
      @appendItem item

    appendItem: (item) ->
      item.index = ++@index

      @items.push item
      @keys[item.key] = item

      item

    removeItem: (key) ->
      item = @keys[key]
      return if not item

      delete @keys[key]
      @items.splice @items.indexOf(item), 1

      item.dispose()
      item

    reset: ->
      for item in @items
        @removeItem item.key

      return

    dispose: ->
      super

      @reset()


  exports =
    ItemsModel: ItemsModel
