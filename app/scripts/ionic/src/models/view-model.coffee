###
* File: model
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/disposable'], (base) ->
  class ViewModel extends base.Disposable
    # @parent: items-model
    constructor: (@parent, @model = {}) ->
      super

      @engine = @parent.engine

    getIds: ->
      {}

    getKey: (model, parent) ->
      @parent?.getKey model, parent

    setModel: (model, key) ->
      return false if not model

      key ?= @getKey model

      # update
      return false if @key and @key isnt key

      @key = key

#      return false if model is @model

#      @reset()

      if model isnt @model
        for k, v of model
          @model[k] = v

      return true

    updateModel: (model) ->
      key = @getKey model
      return if key isnt @key

      return model if not model or model is @model

      #      @reset()
      for k, v of model
        @model[k] = v

      @model

    getModelService: ->
      @service ?= @engine.modelManager.getService @parent.options.id
      @service

    load: (callback, refresh) ->
      if not refresh and @loaded
        callback? null, @model
        return

      modelService = @getModelService()

      filter = @getIds()
      modelService.get filter, (err, model) =>
        @loaded = true

        @setModel model
        callback? err, @model
      , refresh

    reset: ->
      for k, v of @model
        delete @model[k]

      return

#    dispose: ->
#      super
#
#      @reset()

    display: (err, info, period) ->
      delay = period || 5000
      message = @formatErrorInfo err, info

      Materialize.toast message, delay if message

    formatErrorInfo: (err, info) ->
      if err
        if typeof err is 'object'
          result = JSON.stringify err
        else
          result = err

        # output error info on console
        console.log result
      else
        result = info

      result


    getChanges: (model = @model) ->
      changes =
        _id: model._id

      for k, v of model
        # ignore all keys start with underline
        if k[0] isnt '_'
          changes[k] = v

      changes

    update: (callback) ->
      changes = @getChanges()

      modelService = @getModelService()
      modelService.update changes, (err, model) =>
        @setModel model

        @display err, '数据更新成功！'
        callback? err, @model

    remove: (callback) ->
      # remove confirmation prompt should be done in controller
#      ok = confirm "确认删除 #{@model.name} ?"
#      return callback? "取消删除" if not ok

      changes = @getChanges()

      modelService = @getModelService()
      modelService.remove changes, (err, model) =>
        if not err and model
          @parent?.removeItem @key

        @display err, '数据删除成功！'
        callback? err, model

    create: (callback) ->
      changes = @getChanges()

      modelService = @getModelService()
      modelService.create changes, (err, model) =>
        if not err and model
          @setModel model
          @parent?.addNewItem @

        @display err, '数据创建成功！'
        callback? err, @model

    save: (callback) ->
      if @model._removed
        @remove callback
      else if not @model._id
        @create callback
      else
        @update callback



  exports =
    ViewModel: ViewModel
