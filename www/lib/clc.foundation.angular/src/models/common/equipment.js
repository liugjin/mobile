if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,e){for(var o in e)__hasProp.call(e,o)&&(t[o]=e[o]);function n(){this.constructor=t}return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};define(["../view-model","./properties","./signals","./events","./commands","./ports","underscore","rx"],function(t,e,o,n,i,r,s,p){var a,u;return{Equipment:a=function(t){function a(t,s){a.__super__.constructor.call(this,t,s),this.station=this.parent.parent,this.project=this.station.project,this.properties=new e.Properties(this),this.signals=new o.Signals(this),this.events=new n.Events(this),this.commands=new i.Commands(this),this.ports=new r.Ports(this),this.sampleUnits={},this.propertyValues={},this.subject=new p.Subject}return __extends(a,t),a.prototype.getIds=function(){var t;return(t=this.station.getIds()).equipment=this.model.equipment,t},a.prototype.loadEquipmentTemplate=function(t,e,o){var n,i;return!o&&this.templateLoaded?"function"==typeof e?e(null,this.equipmentTemplate):void 0:(n={type:this.model.type,template:this.model.template},this.project.loadEquipmentTemplate(n,t,(i=this,function(t,o){return i.templateLoaded=!0,i.setEquipmentTemplate(o),"function"==typeof e?e(t,i.equipmentTemplate):void 0}),o))},a.prototype.setModel=function(t,e){return!!a.__super__.setModel.call(this,t,e)&&(this.setImage(),this.updatePropertyValues(),!0)},a.prototype.updatePropertyValues=function(){var t,e,o,n,i,r,s,p,a,u;for(o={},i=0,s=(a=this.properties.items).length;i<s;i++)o[(e=a[i]).model.property]=e.getValue();if(this.model.properties)for(r=0,p=(u=this.model.properties).length;r<p;r++)o[(e=u[r]).id]=e.value;for(t in o)n=o[t],this.setPropertyValue(t,n);return this.propertyValues},a.prototype.setImage=function(){var t,e;return this.image=null!=(t=this.model.image)?t:null!=(e=this.equipmentTemplate)?e.getModelValue("image"):void 0},a.prototype.setEquipmentTemplate=function(t){var e,o,n,i,r;if(t&&(this.setImage(),this.sampleUnits=t.getSampleUnits(),this.model.sampleUnits))for(n=0,i=(r=this.model.sampleUnits).length;n<i;n++)o=r[n],(e=this.sampleUnits[o.id])&&null!=o.value&&(e.value=o.value);return this.equipmentTemplate=t},a.prototype.getChanges=function(t){var e,o,n,i,r,p,u,d;for(e=a.__super__.getChanges.call(this,t),n=[],p=0,u=(d=this.properties.items).length;p<u;p++)(i=d[p]).isChanged()&&(o={id:i.model.property,value:i.value},n.push(o));return e.properties=n,r=s.map(this.sampleUnits,function(t){var e;return{id:t.id,value:t.value}}),e.sampleUnits=r,e},a.prototype.loadProperties=function(t,e,o){return!o&&this.propertiesLoaded?"function"==typeof e?e(null,this.properties.items):void 0:this.loadEquipmentTemplate(null,(n=this,function(i,r){return n.propertiesLoaded=!0,r?r.loadProperties(t,function(t,o){var i;return o?(i=n.addProperties(o),"function"==typeof e?e(t,i):void 0):"function"==typeof e?e(t):void 0},o):"function"==typeof e?e(i):void 0}),o);var n},a.prototype.addProperties=function(t){var e,o,n,i,r,s,p,a,u,d;if(n=function(){var e,o,n;for(n=[],e=0,o=t.length;e<o;e++)i=t[e],n.push(i.model);return n}(),o=this.properties.addItems(n),t=this.propertyValues)for(s=0,a=o.length;s<a;s++)(e=o[s]).setValue(t[e.model.property]);for(r=this.project.typeModels.units,p=0,u=o.length;p<u;p++)e=o[p],null==t[e.model.property]&&this.setPropertyValue(e.model.property,e.getValue()),e.unit=null!=(d=r.getItem(e.model.unit))?d.model:void 0;return o},a.prototype.getPropertyValue=function(t,e){var o;return null!=(o=this.propertyValues[t])?o:e},a.prototype.setPropertyValue=function(t,e){var o,n;return(n=this.properties.getItemByIds({property:t}))&&(e=n.setValue(e)),e===(o=this.propertyValues[t])?e:(this.propertyValues[t]=e,this.subject.onNext({type:"property",key:t,value:e,oldValue:o}),e)},a.prototype.subscribePropertyValue=function(t,e,o,n){var i,r,s;return o&&(i={type:"property",key:t,value:this.propertyValues[t]},"function"==typeof e&&e(i)),s=(s=this.subject).where(function(e){return"property"===e.type&&e.key===t}),n&&(s=s.throttle(n)),r=s.subscribe(e),this.addHandler(r),r},a.prototype.subscribePropertiesValue=function(t,e,o){var n,i;return i=this.subject,o&&(i=i.throttle(o)),n=i.where(d(function(){return"property"===d.type&&t.indexOf(d.key)>=0})).subscribe(e),this.addHandler(n),n},a.prototype.loadSignals=function(t,e,o){return!o&&this.signalsLoaded?"function"==typeof e?e(null,this.signals.items):void 0:this.loadEquipmentTemplate(null,(n=this,function(i,r){return n.signalsLoaded=!0,r?r.loadSignals(t,function(t,o){var i;return o?(i=n.addSignals(o),"function"==typeof e?e(t,i):void 0):"function"==typeof e?e(t):void 0},o):"function"==typeof e?e(i):void 0}),o);var n},a.prototype.addSignals=function(t){var e,o,n,i,r,s;for(n=function(){var e,o,n;for(n=[],e=0,o=t.length;e<o;e++)i=t[e],n.push(i.model);return n}(),r=0,s=(o=this.signals.addItems(n)).length;r<s;r++)e=o[r],this.station.signals[e.key]=e,this.project.addSignal(e);return o},a.prototype.loadEvents=function(t,e,o){return!o&&this.eventsLoaded?"function"==typeof e?e(null,this.events.items):void 0:this.loadEquipmentTemplate(null,(n=this,function(i,r){return n.eventsLoaded=!0,r?r.loadEvents(t,function(t,o){var i;return o?(i=n.addEvents(o),"function"==typeof e?e(t,i):void 0):"function"==typeof e?e(t):void 0},o):"function"==typeof e?e(i):void 0}),o);var n},a.prototype.addEvents=function(t){var e,o,n,i,r,s;for(i=function(){var o,n,i;for(i=[],o=0,n=t.length;o<n;o++)e=t[o],i.push(e.model);return i}(),r=0,s=(n=this.events.addItems(i)).length;r<s;r++)o=n[r],this.station.events[o.key]=o,this.project.addEvent(o);return n},a.prototype.loadCommands=function(t,e,o){return!o&&this.commandsLoaded?"function"==typeof e?e(null,this.commands.items):void 0:this.loadEquipmentTemplate(null,(n=this,function(i,r){return n.commandsLoaded=!0,r?r.loadCommands(t,function(t,o){var i;return o?(i=n.addCommands(o),"function"==typeof e?e(t,i):void 0):"function"==typeof e?e(t):void 0},o):"function"==typeof e?e(i):void 0}),o);var n},a.prototype.addCommands=function(t){var e,o,n,i,r,s;for(i=function(){var o,n,i;for(i=[],o=0,n=t.length;o<n;o++)e=t[o],i.push(e.model);return i}(),r=0,s=(n=this.commands.addItems(i)).length;r<s;r++)o=n[r],this.station.commands[o.key]=o,this.project.addCommand(o);return n},a.prototype.loadPorts=function(t,e,o){return!o&&this.portsLoaded?"function"==typeof e?e(null,this.ports.items):void 0:this.loadEquipmentTemplate(null,(n=this,function(i,r){return n.portsLoaded=!0,r?r.loadPorts(t,function(t,o){var i;return o?(i=n.addPorts(o),"function"==typeof e?e(t,i):void 0):"function"==typeof e?e(t):void 0},o):"function"==typeof e?e(i):void 0}),o);var n},a.prototype.addPorts=function(t){var e,o,n,i,r,s;for(n=function(){var e,o,n;for(n=[],e=0,o=t.length;e<o;e++)i=t[e],n.push(i.model);return n}(),r=0,s=(o=this.ports.addItems(n)).length;r<s;r++)e=o[r],this.station.ports[e.key]=e,this.project.addPort(e);return o},a.prototype.dispose=function(t){return a.__super__.dispose.call(this,t),t||this.subject.dispose(),this.signals.dispose(t),this.events.dispose(t),this.commands.dispose(t),this.ports.dispose(t)},a.prototype.getTemplateValue2=function(t,e){var o;if(e)return null!=(o=e.model[t])?o:this.getTemplateValue2(t,e.base)},a.prototype.getTemplateValue=function(t){var e;return null!=(e=this.model[t])?e:this.getTemplateValue2(t,this.equipmentTemplate)},a.prototype.updateSignals=function(t,e){var o,n,i;return null==this.updateSignalsService&&(this.updateSignalsService=this.engine.modelManager.getService("updateSignals")),n=this.updateSignalsService.getUrl(this.model,!0),o={signals:t},this.updateSignalsService.postData(n,o,(i=this,function(t,o){return o&&i.setModel(o),i.display(t,"更新信号实例成功！"),"function"==typeof e?e(t,o):void 0}))},a.prototype.updateEvents=function(t,e){var o,n,i;return null==this.updateEventsService&&(this.updateEventsService=this.engine.modelManager.getService("updateEvents")),n=this.updateEventsService.getUrl(this.model,!0),o={events:t},this.updateEventsService.postData(n,o,(i=this,function(t,o){return o&&i.setModel(o),i.display(t,"更新事件实例成功！"),"function"==typeof e?e(t,o):void 0}))},a.prototype.updateCommands=function(t,e){var o,n,i;return null==this.updateCommandsService&&(this.updateCommandsService=this.engine.modelManager.getService("updateCommands")),n=this.updateCommandsService.getUrl(this.model,!0),o={commands:t},this.updateCommandsService.postData(n,o,(i=this,function(t,o){return o&&i.setModel(o),i.display(t,"更新控制实例成功！"),"function"==typeof e?e(t,o):void 0}))},a}(t.ViewModel)}});