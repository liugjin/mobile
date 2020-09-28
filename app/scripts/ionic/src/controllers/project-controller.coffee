
# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/controllers/project-item-model-controller', 'moment'], (base, moment) ->
  class ProjectController extends base.ProjectItemModelController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, @modelEngine, uploadService, options, @$state) ->
#      super $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, uploadService, options

      @init()


    init: ->
      @btnTxt = '创 建'
      @isSave = false

    load: (callback, refresh) ->
      if @$routeParams.project
        @loadProject callback, refresh
      else
        @createProject callback, refresh

    loadProject: (callback, refresh) ->
      data =
        user: @$routeParams.user
        project: @$routeParams.project

      @get data, (err, result) =>
        callback? err, result
      , refresh

    createProject: (callback, refresh) ->
      project = 'industry-' + moment().format 'YYYYMMDDHHmmss'
      @current =
        user: @$rootScope.user.user
#        project: @getGuid()
        project: project
        name: project
        enable: true
        private: false
        type: 'industry'
        keywords: ['model', 'industry', 'visualization', 'app']

      callback? null, @current

    pasteLon: ($event) ->
      data = $event.originalEvent.clipboardData.getData('text/plain')
      [lon, lat] = data.split ','

      # ensure angular model trigger after paste content
      @$timeout =>
        @current.longitude = lon if lon?
        @current.latitude = lat if lat?
      , 50

    pasteLat: ($event) ->
      data = $event.originalEvent.clipboardData.getData('text/plain')
      [lon, lat] = data.split ','

      # ensure angular model trigger after paste content
      @$timeout =>
        if lon? and lat?
          @current.longitude = lon
          @current.latitude = lat
      , 50

    save: (callback, action = '/projects') ->
      # return to project after edit but create or remove will return to projects list
      if @current.project and not @current._removed
#        action = "/projects/#{@current.user}/#{@current.project}"
        action = '/portal'

      super (err, project) =>
        return if err
#        console.log model, '<-- model'

        modelService = @modelManager.getService 'stations'
        stationId = 'station-' + moment().format 'HHmmss'
        station =
          user: project.user
          project: project.project
          enable: true
          station: stationId
          name: stationId
          parent: ''

        modelService.save station, (err, model) =>
        @$timeout =>
          @$state.go 'portal', {}, {reload: true}
        , 1000
      , '创建成功'

    addFeature: ->
      if not @current
        return

      @current.features ?= []

      newFeature =
        desc: ''
        image: ''
      @current.features.push newFeature

    removeFeature: (feature) ->
      if not @current
        return

      features = @current.features
      features.splice features.indexOf(feature), 1

    uploadFeatureImage: (index) ->
      (input) => @uploadFeatureImage2 input, index

    uploadFeatureImage2: (input, index) ->
      if input.files.length > 0
        file = input.files[0]
        url = "#{@options.uploadUrl}/#{file.name}"

        feature = @current.features[index]

        @uploadService.upload file, url, (err, name) =>
          @$rootScope.err = err
          feature.image = name


  exports =
    ProjectController: ProjectController
