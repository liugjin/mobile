if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(e,t){for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);function o(){this.constructor=e}return o.prototype=t.prototype,e.prototype=new o,e.__super__=t.prototype,e};define(["../items-model","./equipment-template"],function(e,t){var n,o;return{EquipmentTemplates:n=function(e){function n(e,t){var o,r;n.__super__.constructor.call(this,e,t),null==(o=this.options).id&&(o.id="equipmenttemplates"),null==(r=this.options).keys&&(r.keys=["user","project","type","template"])}return __extends(n,e),n.prototype.createItem=function(e){var n;return new t.EquipmentTemplate(this,e)},n.prototype.loadEquipmentTemplate=function(e,t,n,o){var r,p;return!o&&(null!=(r=this.getItemByIds(e))?r._loaded:void 0)?"function"==typeof n?n(null,r):void 0:this.load(e,t,(p=this,function(i,u){var l,s,a,d;return null!=(r=null!=u?u[0]:void 0)&&(r._loaded=!0),r||p.log("equipment template not found: "+e.user+"/"+e.project+"/"+e.type+"/"+e.template),r&&!r.base&&r.model.base?(0===(s=r.model.base.split(".")).length?(d=r.type,a=s[0]):(d=s[0],a=s[1]),l={user:e.user,project:e.project,type:d,template:a},p.loadEquipmentTemplate(l,t,function(e,t){return r.base=t,"function"==typeof n?n(e,r):void 0},o)):"function"==typeof n?n(i,r):void 0}),o)},n}(e.ItemsModel)}});