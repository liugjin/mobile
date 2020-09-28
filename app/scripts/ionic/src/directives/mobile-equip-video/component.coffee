###
* File: mobile-equip-video-directive
* User: bingo
* Date: 2019/04/22
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileEquipVideoDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-equip-video"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: ($scope, element, attrs) =>
      window.proxy?.connect {
        server_addr: "106.14.145.247",
        server_port: 7000,
        server_name: "mu2000",
        ctype: "stcp",    # 连接协议（穿透协议）
        bind_addr: "127.0.0.1",
        bind_port: 8554
      }, (res) =>
        console.log("success:", res)
      , (err) =>
        @prompt "错误", "error: " + err

      $scope.$watch "equipment", (equipment) =>
        #console.log equipment
        return if not equipment
        equipment.loadProperties()

      # 播放视频
      $scope.playVideo = () =>
        url = null
        url = $scope.equipment?.getPropertyValue('url') || $scope.equipment?.getPropertyValue('rtsp') || $scope.equipment?.getPropertyValue('rtmp') || $scope.equipment?.getPropertyValue('http') || $scope.equipment?.getPropertyValue('hls')
        if not url
          #alert("请配置视频推送地址！")
          @prompt "错误", "请配置视频推送地址！"
          return
        options = {
          successCallback: ()=>
            console.log("Video was closed without error.");
          errorCallback: (errMsg)=>
            @prompt "错误", errMsg
            #alert("Error! " + errMsg);
          orientation: 'landscape',
          shouldAutoClose: true,
          controls: true
        };
        window.plugins?.streamingMedia?.playVideo(url, options)

    resize: ($scope)->

    dispose: ($scope)->


  exports =
    MobileEquipVideoDirective: MobileEquipVideoDirective
