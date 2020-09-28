if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,e){for(var n in e)__hasProp.call(e,n)&&(t[n]=e[n]);function i(){this.constructor=t}return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};define(["../../disposable","underscore"],function(t,e){var n,i;return{DeviceModel:n=function(t){function n(){n.__super__.constructor.apply(this,arguments),this.signals={},this.events={},this.commands={}}return __extends(n,t),n.prototype.translateObject=function(t,e){var n,i,o,r,s;if(o={},!t)return o;for(r=0,s=t.length;r<s;r++)o[n=(i=t[r]).model[e]]=i;return o},n.prototype.bindSignal=function(t,e){var n,i;if(n=this.signals[t]={},e&&(n.oid=e.model.signal,n.id=t,n.value=e.data.value,n.name=e.model.name,n.unit=null!=(i=e.unit)?i.unit:void 0,null!=e.data.eventSeverity))return n.eventSeverity=e.data.eventSeverity.severity},n.prototype.bindModuleSignal=function(t,e,n){var i;if(i=e(n))return this.bindSignal(t+n,i),this.signals.moduleNum=n,this.bindModuleSignal(t,e,n+1)},n.prototype.updateSignal=function(t){var n,i,o;if(n=e.findWhere(this.signals,{oid:t.model.signal}))return n.value=t.data.value,n.unit=null!=(i=t.unit)?i.unit:void 0,n.eventSeverity=null!=(o=t.data.eventSeverity)?o.severity:void 0},n.prototype.bindEvent=function(t,e){if(e)return this.events[t]=e},n.prototype.updateEvent=function(t){var e;return(e=this.events[t.model.event]).model=t.model,e.data=t.data},n.prototype.bindCommand=function(t,e){if(e)return this.commands[t]=e},n.prototype.setEvents=function(t){var e,n,i,o;if(null==t)return this.events;for(i=0,o=t.length;i<o;i++)e=(n=t[i]).model.event,this.events[e]={},this.events[e].model=n.model,this.events[e].data=n.data;return this.events},n.prototype.setPorts=function(){},n.prototype.setSignals=function(){},n.prototype.setCommands=function(){},n}(t.Disposable)}});