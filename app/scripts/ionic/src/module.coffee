# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['angular', 'clc.materialize', 'clc.graphic'], (angular) ->
  angular.module 'clc.mobile', ['clc.materialize', 'clc.graphic']
