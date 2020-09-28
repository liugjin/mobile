###
* File: reporting-service
* User: Dow
* Date: 9/2/2015
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/services/service'], (base) ->
  class QueryService extends base.Service
    constructor: (@$rootScope, @$http) ->
      super

    onSuccess: (response, callback) ->
      @$rootScope.loading = false

      data = response.data ? {}

      if data._err
        err = data._err.message ? data._err
        return callback? err

      # csv
      if typeof data is 'string'
        callback? null, data
      else
        callback? null, data.data, data.paging

    onError: (response, callback) ->
      @$rootScope.loading = false

      data = response.data ? {}

      if data?._err
        err = data._err.message ? data._err
      else
        err = "error: #{response.status}"

      callback? err

    beforeAction: ->
      @$rootScope.loading = true

    query: (url, parameters, callback) ->
      url = @replaceUrlParam url, parameters.filter ? {}

      parameters = @appendToken parameters

      @beforeAction()

      @$http.get(url, params: parameters)
      .then (response) =>
        @onSuccess response, callback
      .catch (response) =>
        @onError response, callback

    replaceUrlParam: (url, ps, immutable) ->
      url2 = url.replace /\/:([^/\s]*)/g, (m, p1) ->
        value = ps[p1]

        # to avoid duplicated filter parameters and route parameters
        delete ps[p1] if not immutable

        if value?
          data = "/#{value}"
        else
          data = "/+"

        data

      # remove the last +
      url2 = url2.substr 0, url2.length - 2 if url2[url2.length - 1] is '+'
      url2


  exports =
    QueryService: QueryService
