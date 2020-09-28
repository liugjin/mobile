if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(e,t){for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);function s(){this.constructor=e}return s.prototype=t.prototype,e.prototype=new s,e.__super__=t.prototype,e};define(["../view-model","../items-model"],function(e,t){var o,s;return{EquipmentTemplate:o=function(e){function o(e,s){o.__super__.constructor.call(this,e,s),this.properties=new t.ItemsModel(this,{id:"equipmentproperties",keys:["user","project","type","template","property"]}),this.signals=new t.ItemsModel(this,{id:"equipmentsignals",keys:["user","project","type","template","signal"]}),this.events=new t.ItemsModel(this,{id:"equipmentevents",keys:["user","project","type","template","event"]}),this.commands=new t.ItemsModel(this,{id:"equipmentcommands",keys:["user","project","type","template","command"]}),this.ports=new t.ItemsModel(this,{id:"equipmentports",keys:["user","project","type","template","port"]})}return __extends(o,e),o.prototype.loadProperties=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadProperties(e,(i=this,function(r,n){return i.properties.load(s,e,function(e,o){var s,i,r,p,l,a,d,m;if(r=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],r.push(p),s[p.model.property]=p;if(i=0,n)for(a=0,m=n.length;a<m;a++)s[(p=n[a]).model.property]||r.splice(i++,0,p);return"function"==typeof t?t(e,r):void 0},o)}),o):this.properties.load(s,e,t,o)},o.prototype.loadSignals=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadSignals(e,(i=this,function(r,n){return i.signals.load(s,e,function(e,o){var s,i,r,p,l,a,d,m;if(r=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],r.push(p),s[p.model.signal]=p;if(i=0,n)for(a=0,m=n.length;a<m;a++)s[(p=n[a]).model.signal]||r.splice(i++,0,p);return"function"==typeof t?t(e,r):void 0},o)}),o):this.signals.load(s,e,t,o)},o.prototype.loadEvents=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadEvents(e,(i=this,function(r,n){return i.events.load(s,e,function(e,o){var s,i,r,p,l,a,d,m;if(r=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],r.push(p),s[p.model.event]=p;if(i=0,n)for(a=0,m=n.length;a<m;a++)s[(p=n[a]).model.event]||r.splice(i++,0,p);return"function"==typeof t?t(e,r):void 0},o)}),o):this.events.load(s,e,t,o)},o.prototype.loadCommands=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadCommands(e,(i=this,function(r,n){return i.commands.load(s,e,function(e,o){var s,i,r,p,l,a,d,m;if(r=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],r.push(p),s[p.model.command]=p;if(i=0,n)for(a=0,m=n.length;a<m;a++)s[(p=n[a]).model.command]||r.splice(i++,0,p);return"function"==typeof t?t(e,r):void 0},o)}),o):this.commands.load(s,e,t,o)},o.prototype.loadPorts=function(e,t,o){var s,i;return s={user:this.model.user,project:this.model.project,type:this.model.type,template:this.model.template},this.base?this.base.loadPorts(e,(i=this,function(r,n){return i.ports.load(s,e,function(e,o){var s,i,r,p,l,a,d,m;if(r=[],s={},o)for(l=0,d=o.length;l<d;l++)p=o[l],r.push(p),s[p.model.port]=p;if(i=0,n)for(a=0,m=n.length;a<m;a++)s[(p=n[a]).model.port]||r.splice(i++,0,p);return"function"==typeof t?t(e,r):void 0},o)}),o):this.ports.load(s,e,t,o)},o.prototype.getModelValue=function(e){var t,o;return(t=this.model[e])||(null!=(o=this.base)?o.getModelValue(e):void 0)},o.prototype.getSampleUnits=function(){var e,t,o,s,i,r,n,p,l,a;if(o={},this.model.sampleUnits)for(p=0,l=(a=this.model.sampleUnits).length;p<l;p++){for(e in i={},s=a[p])n=s[e],i[e]=n;o[i.id]=i}if(this.base&&(r=this.base.getSampleUnits()))for(t in r)s=r[t],o.hasOwnProperty(t)||(o[t]=s);return o},o.prototype.dispose=function(){return o.__super__.dispose.apply(this,arguments),this.signals.dispose(),this.events.dispose(),this.commands.dispose(),this.ports.dispose()},o}(e.ViewModel)}});