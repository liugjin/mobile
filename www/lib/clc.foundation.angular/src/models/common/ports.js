if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,e){for(var o in e)__hasProp.call(e,o)&&(t[o]=e[o]);function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};define(["../items-model","./port"],function(t,e){var o,r;return{Ports:o=function(t){function o(t,e){var r,n;o.__super__.constructor.call(this,t,e),null==(r=this.options).id&&(r.id="equipmentports"),null==(n=this.options).keys&&(n.keys=["user","project","station","equipment","port"]),this.equipment=this.parent}return __extends(o,t),o.prototype.createItem=function(t){var o;return new e.Port(this,t)},o.prototype.getKey=function(t){var e,o,r;return r=this.options.keysSeperator||".",e=""+(o=this.equipment.model).user+r+o.project+r+o.station+r+o.equipment+r+t.port},o}(t.ItemsModel)}});