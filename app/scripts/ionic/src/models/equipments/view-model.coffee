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

    setModel: (key, model) ->
      @key = key ? @parent?.getKey model

      return model if not model or model is @model

      @reset()

      for k, v of model
        @model[k] = v

      @model

    getModelService: ->
      @service ?= @engine.modelManager.getService @parent.options.id
      @service

    load: (filter, fields, callback, refresh) ->
      if not refresh and @loaded
        callback? null, @model
        return

      modelService = @getModelService()
      modelService.get filter, fields, (err, model) =>
        @loaded = true

        result = @setModel null, model
        callback? err, result
      , refresh

    reset: ->
      for k, v of @model
        delete @model[k]

      return

    dispose: ->
      super

      @reset()

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
        @setModel null, model

        @display err, '数据更新成功！'
        callback? err, model

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
          @setModel null, model
          @parent?.addNewItem @

        @display err, '数据创建成功！'
        callback? err, model

    save: (callback) ->
      if @model._removed
        @remove callback
      else if not @model._id
        @create callback
      else
        @update callback



  exports =
    ViewModel: ViewModel
