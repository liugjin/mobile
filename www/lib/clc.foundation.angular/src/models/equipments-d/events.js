if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(e,t){for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);function o(){this.constructor=e}return o.prototype=t.prototype,e.prototype=new o,e.__super__=t.prototype,e};define(["./items-model","./event"],function(e,t){var n,o;return{Events:n=function(e){function n(e,t){var o,r;n.__super__.constructor.call(this,e,t),null==(o=this.options).id&&(o.id="equipmentevents"),null==(r=this.options).keys&&(r.keys=["user","project","station","equipment","event"]),this.equipment=this.parent}return __extends(n,e),n.prototype.createItem=function(e){var n;return new t.Event(this,e)},n.prototype.getKey=function(e){var t,n,o;return o=this.options.keysSeperator||".",t=""+(n=this.equipment.model).user+o+n.project+o+n.station+o+n.equipment+o+e.event},n}(e.ItemsModel)}});