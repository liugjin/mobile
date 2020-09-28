###
* File: graphic-box-directive
* User: David
* Date: 2018/11/16
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class GraphicBoxDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "graphic-box"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->
      templateId:"@"
      templateParameters: '@'

    setCSS: ->
      css

    applyChange:->
      return ()=>
        console.log("applyChange",scope)
        scope.$applyAsync()

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
#      window.debugR = scope
#      scope.controller = @
#      scope.templateId =
#        user: @$routeParams.user
#        project: @$routeParams.project
#        template: scope.parameters.templateId

      initializeView=()=>
        @placeholder = $('#element-placeholder')
        @placeholder.draggable()

        @placeholderSize =
          width: @placeholder.width()
          height: @placeholder.height()
          width2: @placeholder.width() / 2
          height2: @placeholder.height() / 2

        @popover = $('#element-placeholder-popover')

        @viewerPosition = $('#player').offset()

      initializeGraphicOptions=() =>
        scope.graphicOptions =
          engineOptions:
            parameters: @$routeParams
          renderOptions:
            editable: false
            type: @$routeParams.renderer ? @$rootScope?.renderType ? 'snapsvg'
            uploadUrl: window?.setting?.urls?.uploadUrl

      initializeGraphicOptions()
      initializeView()
      html = '''
          <div id="player" ng-dblclick="controller.showPopover($event)">
              <div graphic-player="graphic-player" options="graphicOptions" template-id="templateId"
                   controller="controller" on-template-load="controller.onTemplateLoad()"
                   on-element-changed="controller.onElementChanged()" parameters="parameters.templateParameters"
                   class="graphic-viewer"></div>
          </div>
      '''
      ele = @$compile(html)(scope)
      element.find("#graphic").empty()
      element.find("#graphic").append(ele)

      scope.watch?()
      scope.watch = scope.$watch "parameters.templateId",(templateId)=>
        return if not templateId
#        element.find(".box-hexagon").remove()
        scope.templateId =
          user: @$routeParams.user
          project: @$routeParams.project
          template: scope.parameters.templateId
          parameters: scope.parameters.templateParameters

        initializeGraphicOptions()
        initializeView()
        ele = @$compile(html)(scope)
        element.find("#graphic").empty()
        element.find("#graphic").append(ele)

    resize: (scope)->

    dispose: (scope)->
      scope.watch?()


  exports =
    GraphicBoxDirective: GraphicBoxDirective
