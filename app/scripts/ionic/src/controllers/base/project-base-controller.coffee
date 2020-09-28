###
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

#define ['clc.foundation.angular/controllers/project-item-model-controller'], (base) ->
define ['clc.foundation.angular/controllers/project-base-controller'], (base) ->

  class ProjectBaseController extends base.ProjectBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options

    load: (callback, refresh) ->
# this override controller load
      super (err, project) =>
        return callback? err, project if err

        @loadProject callback, refresh
      , refresh

    loadProject: (callback, refresh, typesModel = true) ->
      filter =
        user: @$routeParams.user
        project: @$routeParams.project

      # cache project
      if not refresh
        @project = @$rootScope.project
        model = @project?.model

        if model and model.user is filter.user and model.project is filter.project
          return callback? null, @project

      fields = null
      @modelEngine.loadProject filter, fields, (err, project) =>
        @$rootScope.project = @project = project

        # change system setting for customization
        if project
          setting = project.model.setting
          if setting
            for k, v of setting
              @setting[k]= v

          # load project types definition
          project.loadTypeModels null, refresh if typesModel

        callback? err, project
      , refresh

    removeUnauthorizedProject: (project, userId) ->
      unauthorizedMsg = '未授权项目'
      invalidMsg = ''

      @modelEngine.loadProject {user: project.user, project: project.project}, null, (err, model) =>
        isRemove = false
        if err and (err is unauthorizedMsg or ~err.indexOf '无效项目') and not model
          isRemove = true
        else if model and model.model and model.model._role
          role = model.model._role or {users: []}
          isRemove = true if not (role.isAdmin or userId in role.users)

        if isRemove
          @items = _.filter @items, (item) -> not (item.user is project.user and item.project is project.project)
          @processPages true

# add by cz@2018.06.05
    getDbKv: (key, callback, refresh) ->
      service = @modelManager.getService 'keyvalues'
      service.query {user:@project.model.user, project:@project.model.project, key: key}, null, (err, values) ->
        callback? err, values
      , refresh


    saveDbKv: (key, value, callback) ->
      service = @modelManager.getService 'keyvalues'
      values =
        user: @project.model.user
        project: @project.model.project
        key: key
        value: value

      service.save values, (err, result) ->
        callback? err, result



  exports =
    ProjectBaseController: ProjectBaseController
