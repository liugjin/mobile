if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(o,e){for(var t in e)__hasProp.call(e,t)&&(o[t]=e[t]);function n(){this.constructor=o}return n.prototype=e.prototype,o.prototype=new n,o.__super__=e.prototype,o};define(["./http-service"],function(o){var e,t;return{HttpModelService:e=function(o){function e(o,t,n){this.options=n,this.model={loaded:!1,loading:!1,err:null,data:null,parameters:null,paging:null},e.__super__.constructor.call(this,o,t)}return __extends(e,o),e.prototype.load=function(o,e,t){var n,r;return this.model.parameters=o,!t&&this.model.loaded?"function"==typeof e&&e(null,this.model,this.model.data):(this.model.loading=!0,this.$rootScope.loading=!0,r=this,n=function(o,t,n){var i,l,d,a;if(r.model.err=o,r.model.loaded=!0,r.model.loading=!1,r.model.paging=n,n&&n.pageCount>0){for(l=[],i=d=1,a=n.pageCount;1<=a?d<=a:d>=a;i=1<=a?++d:--d)l.push(i);n.pages=l}return r.model.data=t,r.$rootScope.loading=!1,"function"==typeof e?e(o,r.model,t):void 0},this.get(this.options.url,o,n)),this.model},e}(o.HttpService)}});