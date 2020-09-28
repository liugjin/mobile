###
* File: model
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/services/service', './common/projects'], (base, pm) ->
  class ModelEngine extends base.Service
    constructor: (@$rootScope, @modelManager, @storage) ->
      super

#      @usersService = @modelManager.getService 'users'
#      @projectsService = @modelManager.getService 'projects'
#      @vendorsService = @modelManager.getService 'vendors'
#      @datatypesService = @modelManager.getService 'datatypes'
#      @signaltypesService = @modelManager.getService 'signaltypes'
#      @stationtypesService = @modelManager.getService 'stationtypes'
#      @eventtypessService = @modelManager.getService 'eventtypes'
#      @eventseveritiesService = @modelManager.getService 'eventseverities'
#      @unitsService = @modelManager.getService 'units'
#      @equipmentTypesService = @modelManager.getService 'equipmenttypes'
#      @equipmentTemplatesService = @modelManager.getService 'equipmenttemplates'
#      @stationsService = @modelManager.getService 'stations'
#      @equipmentsService = @modelManager.getService 'equipments'
#      @equipmentSiganlsService = @modelManager.getService 'equipmentsignals'

      # to cache query/statistic result
      @caches = {}
      @options = window.setting

      @projects = new pm.Projects engine: @

    loadProjects: (filter, fields, callback, refresh) ->
      @projects.load filter, fields, callback, refresh

      @projects

    loadProject: (filter, fields, callback, refresh) ->
      @projects.load filter, fields, (err, projects) =>
        return callback err if err

        for p in projects
          model = p.model
          if model.user is filter.user and model.project is filter.project
            # save current project for next access
            myproject =
              user: model.user
              userName: model.userName
              project: model.project
              name: model.name

              role: model._role?.role
              portal: model._role?.portal

            @storage.set "myproject", myproject
            return callback? err, p

        return callback? "无效项目：#{filter.user}.#{filter.project}"
      , refresh

    # query external service
    query: (url, filter, fields, callback, refresh) ->
      key = url + '&' + JSON.stringify(filter) + '&' + fields

      cache = @caches[key]

      if not refresh and cache
        callback? null, cache
        return

      id = url
      url2 = "#{@options.services.model}/#{@options.services.api}/#{url}"

      service = @modelManager.getService id, url2
      service.query filter, fields, (err, model) =>
        @caches[key] = model

        callback? err, model
      , refresh


  exports =
    ModelEngine: ModelEngine
