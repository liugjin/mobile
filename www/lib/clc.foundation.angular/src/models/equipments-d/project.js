if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,e){for(var o in e)__hasProp.call(e,o)&&(t[o]=e[o]);function s(){this.constructor=t}return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t};define(["./view-model","./items-model","./equipment-templates","./stations"],function(t,e,o,s){var n,i;return{Project:n=function(t){function n(t,e){n.__super__.constructor.call(this,t,e),this.typeModels={},this.createTypeModel("datatypes","type"),this.createTypeModel("signaltypes","type"),this.createTypeModel("eventtypes","type"),this.createTypeModel("eventseverities","severity"),this.createTypeModel("units","unit"),this.createTypeModel("vendors","vendor"),this.createTypeModel("equipmenttypes","type"),this.equipmentTemplates=new o.EquipmentTemplates(this),this.stations=new s.Stations(this),this.equipments={},this.signals={},this.signalTopics={},this.events={},this.eventTopics={},this.commands={},this.commandTopics={}}return __extends(n,t),n.prototype.getIds=function(){var t;return{user:this.model.user,project:this.model.project}},n.prototype.createTypeModel=function(t,o){var s;return s=new e.ItemsModel(this,{id:t,keys:[o]}),this.typeModels[t]=s,s},n.prototype.loadTypeModel=function(t,e,o,s){var n,i;if(i=this.typeModels[t])return n={user:this.model.user,project:this.model.project},i.load(n,e,o,s);"function"==typeof o&&o("unknown type: "+t)},n.prototype.loadTypeModels=function(t,e){var o,s,n,i;for(s in o={user:this.model.user,project:this.model.project},i=this.typeModels)(n=i[s]).load(o,null,t,e)},n.prototype.getTypeProperty=function(t,e,o){var s,n;return null!=(s=this.typeModels[t])&&null!=(n=s.getItem(e))?n.model[o]:void 0},n.prototype.loadStations=function(t,e,o){var s;return s={user:this.model.user,project:this.model.project},this.stations.load(s,t,e,o)},n.prototype.loadEquipmentTemplates=function(t,e,o,s){return null==t&&(t={}),null==t.user&&(t.user=this.model.user),null==t.project&&(t.project=this.model.project),this.equipmentTemplates.load(t,e,o,s)},n.prototype.loadEquipmentTemplate=function(t,e,o,s){return null==t&&(t={}),null==t.user&&(t.user=this.model.user),null==t.project&&(t.project=this.model.project),this.equipmentTemplates.loadEquipmentTemplate(t,e,o,s)},n.prototype.dispose=function(){var t,e,o,s,i,r,p,l,u,a,d;for(o in n.__super__.dispose.apply(this,arguments),p=this.typeModels)(r=p[o]).dispose();for(s in this.equipmentTemplates.dispose(),this.stations.dispose(),l=this.signals)i=l[s],delete this.signals[s];for(s in u=this.events)e=u[s],delete this.events[s];for(s in d=[],a=this.commands)t=a[s],d.push(delete this.commands[s]);return d},n.prototype.addSignal=function(t){var e,o;return o="signal-values/"+(e=t.equipment.model).user+"/"+e.project+"/"+e.station+"/"+e.equipment+"/"+t.model.signal,this.signalTopics[o]=t,this.signals[t.key]=t,t},n.prototype.getSignal=function(t){return this.signals[t]},n.prototype.getSignalByTopic=function(t){return this.signalTopics[t]},n.prototype.addEvent=function(t){var e,o;return o="event-values/"+(e=t.equipment.model).user+"/"+e.project+"/"+e.station+"/"+e.equipment+"/"+t.model.event,this.eventTopics[o]=t,this.events[t.key]=t,t},n.prototype.getEvent=function(t){return this.events[t]},n.prototype.getEventByTopic=function(t){return this.eventTopics[t]},n.prototype.addCommand=function(t){var e,o;return o="command-values/"+(e=t.equipment.model).user+"/"+e.project+"/"+e.station+"/"+e.equipment+"/"+t.model.command,this.commandTopics[o]=t,this.commands[t.key]=t,t},n.prototype.getCommand=function(t){return this.commands[t]},n.prototype.getCommandByTopic=function(t){return this.commandTopics[t]},n.prototype.createStation=function(t){var e;return e={user:this.model.user,project:this.model.project,parent:null!=t?t.model.station:void 0},this.station=this.stations.createItem(e),this.station.parentStation=t,this.station.root=this,this.station},n}(t.ViewModel)}});