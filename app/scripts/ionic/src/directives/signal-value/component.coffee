###
* File: signal-value-directive
* User: David
* Date: 2019/01/24
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class SignalValueDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "signal-value"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->
      name: '='
      image: '='
      value: '='

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>

    resize: (scope)->

    dispose: (scope)->


  exports =
    SignalValueDirective: SignalValueDirective
