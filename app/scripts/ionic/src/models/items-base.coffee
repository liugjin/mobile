###
* File: collection
* User: Dow
* Date: 4/27/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./paging-model', 'rx'], (base, Rx) ->
#TODO: paging model base is conflict with this class
  class ItemsBase extends base.PagingModel
    constructor: (options) ->
      super options

      @items = []
      @keys = {}
      @index = 0

      @subject = new Rx.Subject

    getKey: (model, parent) ->
      keys = @options.keys
      len = keys?.length
      if len
        # use _ instead of . for DOM id reference
        seperator = @options.keysSeperator || '_'
        key = ''

        last = len - 1
        for i in [0...last]
          k = keys[i]
          key += model[k] + seperator

        # to get parent's key, replace last one by parent key
        if parent
          val = model['parent']
        else
          k = keys[last]
          val = model[k]

        key += val
      else
        key = model._id

      key

    getItem: (key) ->
      @keys[key]

    getItemByIds: (ids, parent) ->
      key = @getKey ids, parent
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
      key = @getKey model

      # update model if it has been exist
      item = @keys[key]
      if item
        item.setModel model, key
        return item

      item = @createItem model
      return if not item

      item.setModel model, key

      @appendItem item

    createItem: (model) ->
      # this should be override by sub-class
      model

    addNewItem: (item) ->
      @appendItem item

    appendItem: (item) ->
      item.index = ++@index

      # to replace existing item
      flag = false
      oldItem = @keys[item.key]
      if oldItem
        index = @items.indexOf(oldItem)
        if index >= 0
          @items[index] = item
          flag = true

      @items.push item if not flag
      @keys[item.key] = item

      @subject.onNext
        type: 'add'
        item: item

      item

    removeItem: (key, disposing = true) ->
      item = @keys[key]
      return if not item

      delete @keys[key]
      index = @items.indexOf(item)
      @items.splice index, 1 if index >= 0

      @subject.onNext
        type: 'remove'
        item: item

      # dispose by default
      item.dispose() if disposing
      item

    reset: ->
      keys = (item.key for item in @items)
      for key in keys
        @removeItem key, false

      @index = 0

    dispose: (disposing) ->
      super

      if not disposing
        @reset()
        @subject.dispose()

      return

    subscribe: (type, callback, throttle) ->
      subject = @subject
      subject = subject.where( (d) -> d.type is type) if type
      subject = subject.throttle throttle if throttle

      handler = subject.subscribe callback
      @addHandler handler


  exports =
    ItemsBase: ItemsBase
