###
* File: reporting-service
* User: Dow
* Date: 9/2/2015
* Desc: 
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['./query-service'], (base) ->
  class ReportingService extends base.QueryService
    constructor: ($rootScope, $http, @urls) ->
      super $rootScope, $http

    queryRecords: (key, parameters, callback) ->
      url = @urls[key]
      return callback "#{key} url is not defined" if not url

      @query url, parameters, callback

    querySignalRecords: (parameters, callback) ->
      key = 'reporting.records.signal'
      @queryRecords key, parameters, callback

    querySignalGroupRecords: (parameters, callback) ->
      key = 'reporting.records.signal-group'
      @queryRecords key, parameters, callback

    queryEventRecords: (parameters, callback) ->
      key = 'reporting.records.event'
      @queryRecords key, parameters, callback

    queryCommandRecords: (parameters, callback) ->
      key = 'reporting.records.command'
      @queryRecords key, parameters, callback

    querySignalStatistics: (parameters, callback) ->
      key = 'reporting.records.signal-statistic'
      @queryRecords key, parameters, callback

    aggregate: (key, parameters, callback) ->
      url = @urls[key]
      return callback "#{key} url is not defined" if not url

      @query url, parameters, callback

    aggregateSignalValues: (parameter, callback) ->
      key = 'reporting.aggregate.signal'
      @aggregate key, parameters, callback

    aggregateSignalStatistics: (parameter, callback) ->
      key = 'reporting.aggregate.signal-statistic'
      @aggregate key, parameters, callback

    aggregateCommandValues: (parameter, callback) ->
      key = 'reporting.aggregate.command'
      @aggregate key, parameters, callback

    aggregateEventValues: (parameter, callback) ->
      key = 'reporting.aggregate.event'
      @aggregate key, parameters, callback


  exports =
    ReportingService: ReportingService
