###
* File: project
* User: Dow
* Date: 8/14/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./items-model', './project'], (base, cm) ->
  class Projects extends base.ItemsModel
    constructor: (parent, options) ->
      super parent, options

      # use project instead of projects to adapt to model api
      @options.id ?= 'project'
      @options.keys ?= ['user', 'project']

    createItem: (model) ->
      item = new cm.Project @, model



  exports =
    Projects: Projects
