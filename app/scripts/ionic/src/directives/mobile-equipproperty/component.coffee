###
* File: mobile-equipproperty-directive
* User: David
* Date: 2018/12/08
* Desc:
###

# compatible for node.js and requirejs
`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['../base-directive','text!./style.css', 'text!./view.html', 'underscore', "moment"], (base, css, view, _, moment) ->
  class MobileEquippropertyDirective extends base.BaseDirective
    constructor: ($timeout, $window, $compile, $routeParams, commonService)->
      @id = "mobile-equipproperty"
      super $timeout, $window, $compile, $routeParams, commonService

    setScope: ->

    setCSS: ->
      css

    setTemplate: ->
      view

    show: (scope, element, attrs) =>
      scope.setting = setting
      oldValue = ''
#      console.log scope
#      console.log controller

# 组件间交互的情况
#      @subscribeEventBus 'selectEquip',(msg)=>
#        console.log msg
##        scope.equip = msg.message
#        @getStation scope,msg.message.station,()=>
#          @getEquipment scope, msg.message.id,()=>
#            scope.equipment.model.typeName = (_.find scope.project.dictionary.equipmenttypes.items, (type)->type.key is scope.equipment.model.type)?.model.name
#            scope.equipment.model.vendorName = (_.find scope.project.dictionary.vendors.items, (vendor)->vendor.key is scope.equipment.model.vendor)?.model.name
#            @getProperty scope,'life',()=>
#              console.log scope
#              scope.$applyAsync()


      # 属性页为一个单独页的情况可以取路由地址的站点和设备
      scope.$watch 'equipment',(equip)=>
        return if not equip
        equip.loadEquipmentTemplate()
        scope.equipment.model.typeName = (_.find scope.project.dictionary.equipmenttypes.items, (type)->type.key is scope.equipment.model.type)?.model.name
        scope.equipment.model.vendorName = (_.find scope.project.dictionary.vendors.items, (vendor)->vendor.key is scope.equipment.model.vendor)?.model.name
        @getProperty scope,'life',()=>
          # console.log scope
          scope.$applyAsync()

      scope.formatValue = (property) =>
        val = ''
        if property.model.dataType is 'enum'
          arr = property.model.format.split(',')
          for i in arr
            if i.split(':')[0] == property.value
              val = i.split(':')[1]
        else if property.model.dataType is 'date'
          val = moment(property.value).format('YYYY-MM-DD')
        return val

      # 保存旧数据
      scope.saveValue = (value) =>
        oldValue = value

      # 检查数据是否有变化
      scope.checkValue = (value) =>
        if oldValue is value
          return
        else
          scope.saveEquipment()

      scope.saveEquipment = () =>
        scope.equipment.save()

      scope.filterItems = ->
        (item) ->
          return false if item.model.visible is false
          return false if item.model.dataType is "json"
          return true


##    测试第二次选设备出来慢的bug
#      scope.topic6 =
#        equipment:'equipment1'
#      scope.subEvent = {}
#      scope.$watch 'topic6',(eid)=>
#        console.log "---------1----------"
#        equip = eid.equipment
#        return if !equip
#        scope.subEvent[equip]?.dispose()
#        scope.equipment?.dispose()
#        scope.subEvent[equip] = @subscribeEventBus 'equipmentId',(d)=>
#          console.log "--------2--------------"
#          scope.topic6.equipment = d.message.equipmentId
#          @getEquipment scope, d.message.equipmentId,()=>
#            @getProperty scope,'life',()=>
#              console.log "--------3-----------"
#              console.log scope.equipment.properties.items





    resize: (scope)->

    dispose: (scope)->


  exports =
    MobileEquippropertyDirective: MobileEquippropertyDirective
