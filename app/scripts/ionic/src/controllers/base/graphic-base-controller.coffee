###
* File: GraphicBaseController
* User: Dow
* Date: 04/09/2016
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./feature-base-controller'], (base) ->
  class GraphicBaseController extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

      @initializeGraphicOptions()
      @initializeEvents()
      @initializeView()

    initializeGraphicOptions: () ->
      @graphicOptions =
        engineOptions:
          parameters: @$routeParams
        renderOptions:
          editable: false
          type: @$routeParams.renderer ? @$rootScope.renderType ? 'snapsvg'
          uploadUrl: @options.uploadUrl

    initializeView: ->
      @placeholder = $('#element-placeholder')
      @placeholder.draggable()

      @placeholderSize =
        width: @placeholder.width()
        height: @placeholder.height()
        width2: @placeholder.width() / 2
        height2: @placeholder.height() / 2

      @popover = $('#element-placeholder-popover')

      @viewerPosition = $('#player').offset()

    movePlaceholderByEvent: (evt) ->
      mode = @template.getPropertyValue 'placeholder-mode'
      if mode in ['dynamic', 'element']
        offset =
          left: evt.pageX
          top: evt.pageY

        @placeholder.offset(offset)
      return

    showPopover: (evt) ->
      @placeholder ?= $('#element-placeholder')

      offset =
        left: evt.pageX
        top: evt.pageY
      @placeholder.offset(offset)

      @placeholder.webuiPopover 'show'
      @popoverState = true

      return

    togglePopover: (evt) ->
      @placeholder ?= $('#element-placeholder')

      @popoverState = !@popoverState

      if @popoverState
        @placeholder.webuiPopover 'show'
      else
        @placeholder.webuiPopover 'hide'

      return

    onElementChanged: ->
      (err, d) ->
        console.log err if err

    onTemplateLoad: ->
      (err, template) =>
        console.log err if err
        return if not template

        @element = @template = template
        console.log "#{new Date().toISOString()} load template #{template.id}"

        @templateParameters = null

        # set template parameters based on route parameters
        #        template.setParameters @$routeParams

        @initializePlaceholder()

        # element selection event
        template.subscribe (d) =>
          # move placeholder to the current element
          element = d.element

          mode = template.getPropertyValue 'placeholder-mode'

          # move placeholder only the element has tooltip defined
          if mode is 'element' and element?.getPropertyValue('tooltip')
            @movePlaceholderToElement element

          @element = element ? template

          # rx thread is different from angular
          @applyChange()
        , 'select', 100

    initializePlaceholder: ->
      template = @template

      updatePlaceholder = () =>
        image = template.getPropertyValue 'placeholder-image'
        x = template.getPropertyValue 'placeholder-x', 50
        y = template.getPropertyValue 'placeholder-y', 50
        width = template.getPropertyValue 'placeholder-width', 20
        height = template.getPropertyValue 'placeholder-height', 20
        @placeholderMode = mode = template.getPropertyValue 'placeholder-mode', 'dynamic'
        @timelineEnable = template.getPropertyValue 'timeline-enable', false

        # update placeholder
        css =
          left: x
          top: y
          width: width
          height: height
        css['background-image'] = if image then "url(#{@setting.urls.uploadUrl}/#{image})" else "url(/visualization/res/img/popover.gif)"
        @placeholder.css css

        if mode is 'none'
          @placeholder.hide()
        else if mode in ['dynamic', 'element']
          @placeholder.draggable 'enable'
          @placeholder.show()
        else
          @placeholder.draggable 'disable'
          @placeholder.show()

        # update placeholder size
        @placeholderSize =
          x: x
          y: y
          width: width
          height: height
          width2: width / 2
          height2: height / 2

      template.subscribePropertiesValue ['placeholder-image', 'placeholder-x', 'placeholder-y', 'placeholder-width', 'placeholder-height', 'placeholder-mode'], (d) ->
        updatePlaceholder()
      , 100

      updatePlaceholder()

    exportImage: ->
      @player.exportImage()

    stretch: ->
      @player.renderer?.transformControl?.stretch()

    zoom: (scale) ->
      @player.renderer?.transformControl?.zoom scale

    reset: () ->
      @player.renderer?.transformControl?.reset()

    pan: (dx, dy) ->
      @player.renderer?.transformControl?.pan dx, dy

    getPropertyValue: (elementId, propertyId, defaultValue) ->
      return null if not @template

      element = @template.getElement elementId, true
      return defaultValue if not element

      value = element.getPropertyValue propertyId, defaultValue
      return value

    setPropertyValue: (elementId, propertyId, value) ->
      return if not @template

      element = @template.getElement elementId, true
      return if not element

      element.setPropertyValue propertyId, value

    initializeEvents: ->
      onKeyDown = (event) =>
        # make sure the user is working on canvas
        return if document.activeElement isnt document.body

        # SHIFT + shortcut
        return if not event.shiftKey

        switch event.keyCode
          when 87 # W
            @fullscreen(".graphic-viewer")
          when 80 # P
            @exportImage()
          when 69 # E
            @goto "/graphic-templates/#{@current.user}/#{@current.project}/#{@current.template}/edit"

          when 73 # I
            @openParameters()
            $('#parameters-modal').modal('open')
            @applyChange()

        return

      div = document.body
      div.addEventListener 'keydown', onKeyDown
      @addHandler =>
        div.removeEventListener 'keydown', onKeyDown

    openParameters: ->
      return if not @template

      ps = @template.getParameters()
      # don't use p.value to enable parameter publish
      for p in ps
        p.value2 = p.getValue()
      @templateParameters = ps

    setParameters: ->
      return if not @templateParameters

      parameters = {}
      for p in @templateParameters
        parameters[p.id] = p.value2

      @parameters = parameters

    getSignal: (ids) ->
      return if not ids or not @player

      # ids should contain station/equipment/signal only
      if typeof ids isnt 'string'
        ids = "#{ids.station}/#{ids.equipment}/#{ids.signal}"

      topic = "signal-values/#{@$routeParams.user}/#{@$routeParams.project}/#{ids}"
      signal = @player.signalLiveSession.getItem topic

      signal?.message

    subscribeSignalValues: (ids, callback) ->
      return if not ids or not @player

      if typeof ids is 'string'
        topic = "signal-values/#{@$routeParams.user}/#{@$routeParams.project}/#{ids}"
        @player.signalLiveSession.subscribe topic, callback
      else
        ids.user = @$routeParams.user
        ids.project = @$routeParams.project
        @player.signalLiveSession.subscribeValues ids, callback

    getSignalColor: (signal, rangeColors) ->
      return if not rangeColors

      if typeof signal is 'string'
        signal = @getSignal signal

      return if not signal

      @colors ?= {}
      colors = @colors[rangeColors]

      if not colors
        @colors[rangeColors] = colors = []

        try
          ds = rangeColors.split ','
          for d in ds
            vc = d.split ':'
            colors.push
              value: parseFloat vc[0]
              color: vc[1].trim()
        catch ex
          console.log ex

      value = signal.value
      for color in colors
        if value <= color.value
          return color.color

      # return the last color
      return if value? then color?.color else colors[0]?.color

    # to be used on tooltip popover create to keep one subscription only
    subscribeOnTooltip: (tooltipKey, singalIds, callback) ->
      return if @tooltipKey is tooltipKey
      @tooltipKey = tooltipKey

      @tooltipHandle?.dispose()
      @tooltipHandle = @subscribeSignalValues singalIds, callback

    inspect: (looping) ->
      @player.inspect (type, element) =>
        @showPopoverToElement type, element
      , looping

    pauseInspecting: () ->
      @player.pauseInspecting()

    stopInspecting: () ->
      @player.stopInspecting()

    showPopoverToElement: (type, element) ->
      if type is 'end'
        # put on the left-top corner
        x = @viewerPosition.left + @placeholderSize.width
        y = @viewerPosition.top + @placeholderSize.height

        @placeholder.offset
        left: x
        top: y

        @popover.webuiPopover 'hide'
      else
        @movePlaceholderToElement element

    movePlaceholderToElement: (element) ->
      return if not element

      # put on element center
      box = element._geometry.node.getBoundingClientRect()
      x = box.left + box.width / 2 - @placeholderSize.width / 2
      y = box.top + box.height / 2 - @placeholderSize.height / 2

      @placeholder.offset
        left: x
        top: y

      return


  exports =
    GraphicBaseController: GraphicBaseController
