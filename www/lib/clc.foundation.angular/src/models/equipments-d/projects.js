if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(e,t){for(var r in t)__hasProp.call(t,r)&&(e[r]=t[r]);function o(){this.constructor=e}return o.prototype=t.prototype,e.prototype=new o,e.__super__=t.prototype,e};define(["./items-model","./project"],function(e,t){var r,o;return{Projects:r=function(e){function r(e,t){var o,n;r.__super__.constructor.call(this,e,t),null==(o=this.options).id&&(o.id="project"),null==(n=this.options).keys&&(n.keys=["user","project"])}return __extends(r,e),r.prototype.createItem=function(e){var r;return new t.Project(this,e)},r}(e.ItemsModel)}});