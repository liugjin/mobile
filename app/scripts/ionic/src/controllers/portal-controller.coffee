
# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./base/project-base-controller'], (base) ->
  class PortalController extends base.ProjectBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options, @$state, @$ionicModal) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, modelManager, modelEngine, uploadService, options

      @pageItems = 30
      @predicate = ['stared', 'updatetime']


    onLoad: (callback, refresh) ->
      @load callback, refresh

#    initialize: ->
#      super

    load: (callback, refresh) ->
      # last time access project
      @myproject = @modelEngine.storage.get 'myproject'

#      @copyProject () =>
      #加载时先去掉之前登录的角色缓存信息
#      service = @modelManager.getService 'project'
#      service.itemsByUrl = {}
#      service = @modelManager.getService 'equipments'
#      service.itemsByUrl = {}

      @loadProjects (err, model) =>
        return if @$routeParams.auto is 'false'
        project = JSON.parse(localStorage.getItem 'project-preference')
        itemId = project?[@$rootScope.user.user]
        itm = _.find @items, (it)->it.user+"."+it.project is itemId
        item = itm ? @items[0]
#        item = @items[2]
        @$state.go 'tab.overview', {user: item.user, project: item.project} if item
      , true

    copyProject: (callback) ->
      data =
        user0: 'admin'
        project0: 'ups-monitoring'
        user: @$rootScope.user.user
        project: 'ups-monitoring'
        name: '云监控平台'

      service = @modelManager.getService 'project'

      generateProjectUrl = "http://192.168.1.76/model/clc/api/v1/generateProject/:user/:project"

      url = service.replaceUrlParam generateProjectUrl, data
      service.postData url, data, (err, result) =>
#        console.log err, '<-- err'
#        console.log result, '<-- result'
        callback? err, result


    loadProjects: (callback, refresh) ->
      # load project including dcim keyword (case insensitive)
      filter =
        user: @$rootScope.user?.user
#        keywords: 'industry'
#        keywords:
#          $elemMatch:
#            $regex: 'industry'
#            $options: 'i'

      fields = 'user _id project name image updatetime stars keywords desc group'

      @query filter, fields, (err, model) =>
        @items = _.filter @items, (item) -> ~(item.keywords.indexOf 'app')
        # @items = _.filter @items, (item) -> item.group == 'supplier'
        if model?.length > 0
          # mark project star
          for p in model
            p.stared = @isStared p

            # select the first star project by default if no last time access record
            @myproject = p if not @myproject and p.stared

#            @removeUnauthorizedProject p, @$rootScope.user.user

        callback? err, model
      , refresh

    doRefresh: () ->
      @loadProjects (err, model) =>
        @$timeout =>
          @$scope.$broadcast 'scroll.refreshComplete'
        , 2000
      , true

#      @$state.reload()
#      @$state.go(@$state.current, {}, {reload: true})

    getImage: (image) ->
      return 'url(img/svg/background.png)'
      #return 'url(img/svg/background.png)' if not image
      #return "url(#{@options.uploadUrl}/#{image})"

    goToOrigin: ()=>
      if @$routeParams.origin is 'login'
        @$state.go 'logout', {}
      else if @$routeParams.origin is 'overview'
        @$state.go 'tab.overview', {user: @$routeParams.user, project: @$routeParams.project}
      else if @$routeParams.origin is 'setting'
        @$state.go 'tab.setting', {user: @$routeParams.user, project: @$routeParams.project}
      else
        @$state.go 'logout', {}

  exports =
    PortalController: PortalController
