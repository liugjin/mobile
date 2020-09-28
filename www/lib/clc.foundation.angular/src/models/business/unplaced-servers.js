if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(e,r){for(var t in r)__hasProp.call(r,t)&&(e[t]=r[t]);function o(){this.constructor=e}return o.prototype=r.prototype,e.prototype=new o,e.__super__=r.prototype,e};define(["../../disposable","./servers"],function(e,r){var t,o;return{UnplacedServers:t=function(e){function t(e){this.station=e,t.__super__.constructor.apply(this,arguments),this.servers=new r.Servers(this.station)}return __extends(t,e),t.prototype.loadServers=function(e,r,t){var o,s,n;return o={user:(s=this.station.model).user,project:s.project,station:s.station,type:"server",$or:[{parent:""},{parent:null}]},this.servers.load(o,e,(n=this,function(e,t){var o,s,n;for(s=0,n=t.length;s<n;s++)(o=t[s]).loadProperties();return"function"==typeof r?r(e,t):void 0}),t)},t.prototype.addServer=function(e){return this.servers.appendItem(e)},t.prototype.removeServer=function(e){return this.servers.removeItem(e,!1)},t.prototype.dispose=function(e){return t.__super__.dispose.call(this,e),this.servers.dispose(e)},t.prototype.updateModel=function(e){if("server"===e.type)return this.updateServerModel(e)},t.prototype.updateServerModel=function(e){var r;return(r=this.servers.getItemByIds(e))?e.parent?this.servers.removeItem(r.key,!1):r.setModel(e):e.parent||(r=this.servers.addItem(e)).loadProperties(),r},t}(e.Disposable)}});