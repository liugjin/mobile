if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(e,t){for(var o in t)__hasProp.call(t,o)&&(e[o]=t[o]);function r(){this.constructor=e}return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};define(["../services/service","./projects"],function(e,t){var o,r;return{ModelEngine:o=function(e){function o(e,r,n){this.$rootScope=e,this.modelManager=r,this.storage=n,o.__super__.constructor.apply(this,arguments),this.caches={},this.options=window.setting,this.projects=new t.Projects({engine:this})}return __extends(o,e),o.prototype.loadProjects=function(e,t,o,r){return this.projects.load(e,t,o,r),this.projects},o.prototype.loadProject=function(e,t,o,r){return this.projects.load(e,t,(n=this,function(t,r){var i,s,c,p,u;if(t)return o(null!=t);for(p=0,u=r.length;p<u;p++)if((i=(c=r[p]).model).user===e.user&&i.project===e.project)return s={user:i.user,project:i.project,name:i.name},n.storage.set("myproject",s),"function"==typeof o?o(t,c):void 0;return"function"==typeof o?o("无效项目："+e.user+"."+e.project):void 0}),r);var n},o.prototype.query=function(e,t,o,r,n){var i,s,c,p,u,f;if(c=e+"&"+JSON.stringify(t)+"&"+o,i=this.caches[c],n||!i)return s=e,u=this.options.services.model+"/"+this.options.services.api+"/"+e,(p=this.modelManager.getService(s,u)).query(t,o,(f=this,function(e,t){return f.caches[c]=t,"function"==typeof r?r(e,t):void 0}),n);"function"==typeof r&&r(null,i)},o.prototype.updateSignals=function(e,t){},o}(e.Service)}});