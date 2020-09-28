if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(e,t){for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);function s(){this.constructor=e}return s.prototype=t.prototype,e.prototype=new s,e.__super__=t.prototype,e};define(["./view-model","./items-model"],function(e,t){var o,s;return{EquipmentTemplate:o=function(e){function o(e,s){o.__super__.constructor.call(this,e,s),this.properties=new t.ItemsModel(this,{id:"equipmentproperties",keys:["user","project","type","template","property"]}),this.signals=new t.ItemsModel(this,{id:"equipmentsignals",keys:["user","project","type","template","signal"]}),this.events=new t.ItemsModel(this,{id:"equipmentevents",keys:["user","project","type","template","event"]}),this.commands=new t.ItemsModel(this,{id:"equipmentcommands",keys:["user","project","type","template","command"]})}return __extends(o,e),o.prototype.loadProperties=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadProperties(e,(i=this,function(n,r){return i.properties.load(s,e,function(e,o){var s,i,n,p,l,a,d,u;if(n=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],n.push(p),s[p.key]=p;if(i=0,r)for(a=0,u=r.length;a<u;a++)s[(p=r[a]).key]||n.splice(i++,0,p);return"function"==typeof t?t(e,n):void 0},o)}),o):this.properties.load(s,e,t,o)},o.prototype.loadSignals=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadSignals(e,(i=this,function(n,r){return i.signals.load(s,e,function(e,o){var s,i,n,p,l,a,d,u;if(n=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],n.push(p),s[p.key]=p;if(i=0,r)for(a=0,u=r.length;a<u;a++)s[(p=r[a]).key]||n.splice(i++,0,p);return"function"==typeof t?t(e,n):void 0},o)}),o):this.signals.load(s,e,t,o)},o.prototype.loadEvents=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadEvents(e,(i=this,function(n,r){return i.events.load(s,e,function(e,o){var s,i,n,p,l,a,d,u;if(n=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],n.push(p),s[p.key]=p;if(i=0,r)for(a=0,u=r.length;a<u;a++)s[(p=r[a]).key]||n.splice(i++,0,p);return"function"==typeof t?t(e,n):void 0},o)}),o):this.events.load(s,e,t,o)},o.prototype.loadCommands=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadCommands(e,(i=this,function(n,r){return i.commands.load(s,e,function(e,o){var s,i,n,p,l,a,d,u;if(n=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],n.push(p),s[p.key]=p;if(i=0,r)for(a=0,u=r.length;a<u;a++)s[(p=r[a]).key]||n.splice(i++,0,p);return"function"==typeof t?t(e,n):void 0},o)}),o):this.commands.load(s,e,t,o)},o.prototype.getModelValue=function(e){var t,o;return(t=this.model[e])||(null!=(o=this.base)?o.getModelValue(e):void 0)},o.prototype.getSampleUnits=function(){var e,t,o,s,i,n,r;if(t={},this.model.sampleUnits)for(i=0,n=(r=this.model.sampleUnits).length;i<n;i++)t[(o=r[i]).id]=o;if(this.base&&(s=this.base.getSampleUnits()))for(e in s)o=s[e],t.hasOwnProperty(e)||(t[e]=o);return t},o.prototype.dispose=function(){return o.__super__.dispose.apply(this,arguments),this.signals.dispose(),this.events.dispose(),this.commands.dispose()},o}(e.ViewModel)}});