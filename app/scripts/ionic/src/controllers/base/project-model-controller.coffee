###
* File: project-model-controller
* User: Dow
* Date: 4/18/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/controllers/project-item-model-controller'], (base) ->
  class ProjectModelController extends base.ProjectItemModelController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options

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
      @current =
        user: @$rootScope.user.user
        project: @getGuid()
        enable: true
        private: false

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
        action = "/projects/#{@current.user}/#{@current.project}"

      super callback, action

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
    ProjectModelController: ProjectModelController
