###
* File: mobile-equip-list-directive
* User: David
* Date: 2019/07/09
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileEquipListDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-equip-list"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.activeFollow = false
      scope.offlineImg = @getComponentPath('image/e-offline.png')
      scope.onlineImg = @getComponentPath('image/e-online.svg')
      scope.normalImg = @getComponentPath('image/e-normal.png')
      scope.alarmImg = @getComponentPath('image/e-alarm.png')
      scope.addressImg = @getComponentPath('image/map.svg')
      scope.followImg = @getComponentPath('image/follow.svg')
      scope.followFocusImg = @getComponentPath('image/follow-active.svg')
      scope.noEquipImg = @getComponentPath('image/no-equip.svg')
      scope.equipTypeLists = []
      scope.equipments = []
      scope.status = {}
      scope.alarms = {}

      scope.project.loadEquipmentTemplates null, null, (err, templates) =>
        scope.templates = templates

      scope.selectEquipType = (type) =>
        return if not type
        scope.currentType = type
        @selectType scope, type, null, true

      # 选择设备
      scope.selectEquipment = (equipment) =>
        equipment?.loadEquipmentTemplate null, (err, template) =>
          #console.log template
          templateId = equipment.getTemplateValue 'directive'
          @publishEventBus "selectEquipment", {
            stationId: equipment.model.station,
            equipmentId: equipment.model.equipment,
            name: equipment.model.name,
            templateId: templateId,
            type: equipment.model.type,
            template: equipment.model.template,
          }

      # 过滤设备-设备列表
      scope.filterEquipment = () =>
        (equipment) =>
          if equipment.model.template is 'card-sender' or equipment.model.template is 'card_template' or equipment.model.template is 'people_template'
            return false
          if scope.activeFollow and !scope.followEquip(equipment)
            return false
          text = scope.searchLists?.toLowerCase()
          if not text
            return true
          if equipment.model.equipment?.toLowerCase().indexOf(text) >= 0
            return true
          if equipment.model.name?.toLowerCase().indexOf(text) >= 0
            return true
          if equipment.model.tag?.toLowerCase().indexOf(text) >= 0
            return true
          if equipment.model.typeName?.toLowerCase().indexOf(text) >= 0
            return true
          if equipment.model.stationName?.toLowerCase().indexOf(text) >= 0
            return true
          if equipment.model.vendorName?.toLowerCase().indexOf(text) >= 0
            return true
          return false

      # 设备图片路径
      scope.imgString = (equip) =>
        str = if _.isEmpty(equip.model.image) then (_.find scope.templates, (item)->item.model.template is equip.model.template)?.model.image else equip.model.image
        url = ""
        if str
          url = "url('#{scope.setting.urls.uploadUrl}/#{str}')"
        else
          url = "url('#{scope.noEquipImg}')"

      scope.selectFollow = ()=>
        scope.activeFollow = !scope.activeFollow

      # 检测是否有关注这个属性
      scope.haveFollowProperty = (equip) =>
        follow = _.find equip.properties.items, (item)=>item.model.property is 'follow'
        if follow
          return true
        return false

      # 检测是否关注了
      scope.followEquip = (equip) =>
        follow = _.find equip.properties.items, (item)=>item.model.property is 'follow'
        if follow
          followValue  = {}
          followValue = JSON.parse(follow.value) if follow.value
          return followValue[@commonService.$rootScope.user.user]
        return false

      # 对关注进行修改
      scope.addFollowEquip = (equip) =>
        _.map equip.properties.items, (item) =>
          if item.model.property is 'follow'
            value = {}
            value = JSON.parse(item.value) if item.value
            if value[@commonService.$rootScope.user.user]
              value[@commonService.$rootScope.user.user] = !value[@commonService.$rootScope.user.user]
            else
              value[@commonService.$rootScope.user.user] = true
            item.value = JSON.stringify value
        equip.save()

      stations = @commonService.loadStationChildren scope.station, true
      n = 0
      for station in stations
        @loadStationEquipStatistics scope, station, =>
          n++
          if n is stations.length
            scope.selectEquipType scope.equipTypeLists[0]

      scope.statusSubscription?.dispose()
      filter1 = scope.project.getIds()
      filter1.station = "+"
      filter1.equipment = "+"
      filter1.signal = "communication-status"
      scope.statusSubscription = @commonService.signalLiveSession.subscribeValues filter1, (err, d)=>
        scope.status[d.message.station+"."+d.message.equipment] = d.message.value

      scope.alarmsSubscription?.dispose()
      filter2 = scope.project.getIds()
      filter2.station = "+"
      filter2.equipment = "+"
      filter2.signal = "alarms"
      scope.alarmsSubscription = @commonService.signalLiveSession.subscribeValues filter2, (err, d)=>
        scope.alarms[d.message.station+"."+d.message.equipment] = d.message.value

    loadStationEquipStatistics: (scope, station, callback) ->
      station.loadStatisticByEquipmentTypes (err, statistic) =>
        value = JSON.parse JSON.stringify statistic.statistic
        for key, val of value
          scope.equipTypeLists.push val if @filterType scope, val
        callback?()

    filterType: (scope, type) ->
      item = _.find scope.project.dictionary.equipmenttypes.items, (tp)->tp.model.type is type.type
      type.index = item.model.index
      return false if item?.model?.visible is false
      return false if type.type.substr(0,1) is "_"
      return false if type.count is 0
      key = _.find scope.equipTypeLists,(tp)->tp.type is type.type
      return false if key
      return true

    selectType: (scope, type, callback ,refresh) ->
      scope.equipments = []
      scope.groups = []
      scope.station = _.find scope.project.stations.items, (item)->item.model.station is scope.station.model.station
      stations = @commonService.loadStationChildren scope.station, true
      for station in stations
        @commonService.loadEquipmentsByType station, type.type, (err, equips)=>
          for equip in equips
            equip.loadProperties()
          scope.equipments = scope.equipments.concat equips
          scope.$applyAsync()
        ,refresh

    resize: (scope)->

    dispose: (scope)->
      scope.statusSubscription?.dispose()
      scope.alarmsSubscription?.dispose()


  exports =
    MobileEquipListDirective: MobileEquipListDirective
