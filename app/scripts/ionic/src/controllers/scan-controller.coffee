
define ['./base/feature-base-controller', 'clc.foundation.angular/filters/format-string-filter', 'underscore'], (base, fsf, _) ->

  class Ctrl extends base.FeatureBaseController
    constructor: ($scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options, @$state, @$ionicPopup) ->
      super $scope, $rootScope, $routeParams, $location, $window, $timeout, $interval, modelManager, modelEngine, uploadService, liveService, reportingService, options

      @formatString = fsf.FormatStringFilter()
      @qrcode = ''
      @flag = 0
      @templates = {}
      @device = null

    load: (callback, refresh) ->
      super (err, model) =>
        @init()
#        @subscribeStationSignal()
#        @createEquipment()
#        @project.loadEquipmentTemplates {desc: {$nin:[null,undefined, ""]}},null, (err, templates) =>
#          for template in templates
#            model = template.model
#            arr = model.desc.split("|")
#            key = arr[0]
#            model.sampleId = arr[1] if arr.length is 2
#            @templates[key] = model
#          if @$routeParams.strScan
#            @scanQr()
#        ,refresh
        callback? err, model
      , refresh

    init: () =>
      @createEquipment()
      @project.loadEquipmentTemplates {desc: {$nin:[null,undefined, ""]}},null, (err, templates) =>
        for template in templates
          model = template.model
          arr = model.desc.split("|")
          key = arr[0]
          model.sampleId = arr[1] if arr.length is 2
          @templates[key] = model
        @scanQr() if @$routeParams.strScan
      , false

    goToScan: () =>
      @$state.go 'scanQr', {user: @$routeParams.user, project: @$routeParams.project, station: @$routeParams.station, origin: @$routeParams.origin}, {reload: true}

    scanQr: () =>
      @device = null
      @flag = 0
      @qrcode = ''
      text = @$routeParams.strScan ? ""
      @handleCode text

    writeText: () =>
      @$scope.data = {}
      myPopup = @$ionicPopup.show {
        template: '<input type="text" ng-model="data.strScan">',
        title: '请输入设备的ID',
        scope: @$scope,
        buttons: [
          {
            text: '取消'
          }
          {
            text: '确认'
            type: 'button-positive'
            onTap: (e) =>
              if !@$scope.data.strScan
                e.preventDefault()
              else
                return @$scope.data.strScan
          }
        ]
      }
      myPopup.then (res) =>
        if res
          @handleCode res

    scanCode: ->
#      @handleCode "9H1Z0A1800035"
#      return
      @$cordovaBarcodeScanner
        .scan()
        .then (result) =>
          @device = null
          @flag = 0
          @qrcode = ''
          text = result?.text or ''
          @handleCode text

        , (error) =>
          @device = null
          @display '扫码错误 ' + error

    handleCode: (code) ->
      if not code or code.length isnt 13
        @display null, "无效二维码"
      else
        keys = _.keys @templates
        key = _.find keys, (ky)->code.substr(0,6).indexOf(ky)>= 0
        template = @templates[key] if key
        if template
          @qrcode = code
          id = code+"-"+template.type
          data =
            user: @project.model.user
            project: @project.model.project
            station: '+'
            equipment: id
          @queryEquipment data, (err, equipment) =>
            return if err
            if not (_.isEmpty equipment)
              @project.loadStations null, (err, stations) =>
                station = _.find stations, (station) => station.model.station is equipment.station
                if station
                  @$state.go 'equipment', {user: equipment.user, project: equipment.project, station: equipment.station, equipment: equipment.equipment, origin: @$routeParams.origin}
                else
                  @display null, "此设备已被添加！"
            else
              @device = JSON.parse(JSON.stringify(template))
              @device.id = id
              @device.name = code + "-" + template.type + "-" + template.template
              @device.station = @station.model.station
              @device.time = new Date()
              @device.typeName = (_.find @project.dictionary.equipmenttypes.items, (item)=>item.model.type is @device.type)?.model.name
              @device.vendorName = (_.find @project.dictionary.vendors.items, (item)=>item.model.vendor is @device.vendor)?.model.name
              @device.templateName = template.name
        else
          @display null, "项目不支持此类设备添加"

    goToEquipment: (equipment = @equipment) ->
      @$state.go 'equipment', {user: equipment.model.user, project: equipment.model.project, station: equipment.model.station, equipment: equipment.model.equipment}

    queryEquipment: (data, callback) ->
      service = @modelManager.getService "equipments"
      service.query data, null, (err, values) ->
        callback? err, values
      ,true

    createEquipment: (callback, refresh) ->
      # new equipment
      return if not @station
      model =
        user: @project.user
        project: @project.project
        station: @station.model.station
        equipment: ""
        name: ""
        enable: true
        owner: @project.user
#        type: 'UPS'
#        template: 'ita2'
#        vendor: 'emerson'
      @equipment = @station.createEquipment model, null
      callback? null, @equipment

    saveEquipment: (callback) ->
      @equipment.loadProperties null, (err, properties) =>
        @equipment.model.equipment = @device.id
        #@equipment.model.name = @device?.name
        @equipment.model.name = @device.id + "-" + @device.template
        @equipment.model.type = @device.type
        @equipment.model.typeName = @device.typeName
        @equipment.model.template = @device.template
        @equipment.model.templateName = @device.templateName
        @equipment.model.vendor = @device.vendor
        @equipment.model.vendorName = @device.vendorName
        @equipment.model.station = @device.station
        @equipment.model.stationName = (_.find @project.stations.items, (item)=>item.model.station is @device.station)?.model.name
        @equipment.model.owner = @device.user
        @equipment.setPropertyValue('location', @device.location)

        if not @equipment.model.equipment or (not @equipment.model.name)
          @display null, '请填写完整资料'
          return
  #      value = "mu-#{@equipment.model.user}.#{@equipment.model.project}.#{@equipment.model.station}/su-#{@equipment.model.equipment}"
  #      value = 'mu/su'
        value = "#{@qrcode}/#{@device.sampleId}"
        su = _.find @device.sampleUnits, (s)->s.id.indexOf('su')>=0
        su = @device.sampleUnits[0] if not su
        sunit =
          id: su.id
          value: value
        mu = _.find @device.sampleUnits, (s)->s.id.indexOf('mu')>=0
        munit =
          id: mu?.id ? 'mu'
          value: "#{@qrcode}/_"
        #      @equipment.model.sampleUnits = [{id: 'su', value: value}]
        @equipment.sampleUnits =
          su: sunit
          mu: munit
        @device.name = @device.id + "-" + @device.template
        super (err, model) =>
          if err
            @flag = -1
          else
            @flag = 1
          callback? err, model

    goBack: ->
      # console.log "goBack"
      if @$routeParams.origin is 'overview'
        @$state.go 'tab.overview', {user: @$routeParams.user, project: @$routeParams.project}
      else if @$routeParams.origin is 'setting'
        @$state.go 'tab.setting', {user: @$routeParams.user, project: @$routeParams.project}
      else if @$routeParams.origin is 'signal'
        @$state.go 'tab.signal', {user: @$routeParams.user, project: @$routeParams.project}
      else
        return

  exports =
    Ctrl: Ctrl
