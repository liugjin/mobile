`if (typeof define !== 'function') { var define = require('amdefine')(module) }`

define ['clc.foundation.angular/disposable', './ups','./ac','./ats','./distributor','./door','./genset','./power-meter','./rectifier','./wac', './battery'], (base, ups, ac, ats,distributor,door,genset,powerMeter,rectifier,wac,battery) ->
  class DeviceModelFactory extends base.Disposable
    # @parent: items-model
    constructor: () ->
      super

    getDeviceModel2 : (type, template) ->
      return new ups.Ups if template == '1014'
      return new ac.AC if template == '1020'
      return new ats.ATS if template == '1004'
      return new distributor.Distributor if template == '1003'
      return new rectifier.Rectifier if template == '1009'
      return new door.Door if template == '1028'
      return new genset.Genset if type == '3'
      return new powerMeter.PowerMeter if type == '12'
      return new wac.WAC if template == '1022'
      return new battery.Battery if type == '11'

    getDeviceModel: (equipment) ->
      directive = equipment.getTemplateValue 'directive'

      switch directive
        when 'ups'
          Type = ups.Ups
        when 'ac'
          Type = ac.AC
        when 'ats'
          Type = ats.ATS
        when 'distributor'
          Type = distributor.Distributor
        when 'rectifier'
          Type = rectifier.Rectifier
        when 'door'
          Type = door.Door
        when 'genset'
          Type = genset.Genset
        when 'power-meter'
          Type = powerMeter.PowerMeter
        when 'wac'
          Type = wac.WAC
        when 'battery'
          Type = battery.Battery

      return new Type if Type


  exports =
    DeviceModelFactory: DeviceModelFactory