if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,e){for(var n in e)__hasProp.call(e,n)&&(t[n]=e[n]);function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};define(["../view-model"],function(t){var e,n;return{Event:e=function(t){function e(t,n){e.__super__.constructor.call(this,t,n),this.equipment=this.parent.parent,this.station=this.equipment.station,this.data={}}return __extends(e,t),e.prototype.getIds=function(){var t;return(t=this.equipment.getIds()).event=this.model.event,t},e.prototype.setValue=function(t){var e;if(!(t.startTime<this.data.startTime))return this.data=e=t,e},e}(t.ViewModel)}});