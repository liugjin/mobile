#关于我们
define ['clc.foundation.angular/controllers/controller', 'json!../../update.json'], (base, version)->
  class AboutAppCtrl extends base.Controller
    constructor:($scope, $rootScope, $routeParams, $location, $window, @$ionicHistory)->
      super $scope, $rootScope, $routeParams, $location, $window
      @init()

    init: () ->
      @versionIndex = []
      @versionUpdate = version
      _.map @versionUpdate, (value, key) =>
        @versionIndex.push key
      #@versionIndex.reverse()

    onBackPress: ->
      @$ionicHistory.goBack()

  exports =
    AboutAppCtrl:AboutAppCtrl
