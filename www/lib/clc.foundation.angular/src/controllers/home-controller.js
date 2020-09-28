if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,i){for(var n in i)__hasProp.call(i,n)&&(t[n]=i[n]);function e(){this.constructor=t}return e.prototype=i.prototype,t.prototype=new e,t.__super__=i.prototype,t};define(["./controller"],function(t){var i,n;return{HomeController:i=function(t){function i(t,n,e,o,r,s,c){this.$timeout=s,this.homeService=c,i.__super__.constructor.call(this,t,n,e,o,r),this.getReadme(),this.getConfig()}return __extends(i,t),i.prototype.echo=function(){var t,i;return t={user:this.$rootScope.user.user,time:"client: "+(new Date).toISOString()},this.homeService.echo(t,(i=this,function(t,n){return i.echoResult=n,i.display(t,null!=n?n.method:void 0)}))},i.prototype.isAdmnin=function(){var t;return"admin"===(null!=(t=this.$rootScope.user)?t.user:void 0)},i.prototype.getReadme=function(){return this.isAdmnin()?this.homeService.getReadme(null,(t=this,function(i,n){return i&&t.display(i),t.readme=null!=n?n.data:void 0})):this.display("请以系统管理员身份登录!");var t},i.prototype.getConfig=function(t){return this.isAdmnin()?this.homeService.getConfig(null,(i=this,function(n,e){if((n||t)&&i.display(n,"刷新配置成功!"),null!=e?e.data:void 0)return i.config=e.data,i.configJson=JSON.parse(i.config)})):this.display("请以系统管理员身份登录!");var i},i.prototype.restoreConfig=function(){return this.isAdmnin()?this.homeService.restoreConfig(null,(t=this,function(i,n){if(t.display(i,"恢复配置成功!"),null!=n?n.data:void 0)return t.config=n.data,t.configJson=JSON.parse(t.config)})):this.display("请以系统管理员身份登录!");var t},i.prototype.setConfig=function(){var t,i,n;if(!this.isAdmnin())return this.display("请以系统管理员身份登录!");if(this.configDetails||(this.config=JSON.stringify(this.configJson,null,4)),!this.config)return this.display("配置不能为空!");try{this.configJson=JSON.parse(this.config)}catch(i){if(t=i)return this.display(t.message)}return i={config:this.config},this.homeService.setConfig(i,(n=this,function(t,i){return n.display(t,"保存配置成功!")}))},i.prototype.restartProcess=function(){return this.isAdmnin()?this.restarting=!0:this.display("请以系统管理员身份登录!")},i.prototype.restartProcess2=function(){return this.isAdmnin()?(this.restarting=!1,this.homeService.restartProcess(null,(t=this,function(i,n){return t.display(i,null!=n?n.data:void 0)}))):this.display("请以系统管理员身份登录!");var t},i.prototype.toggleConfig=function(){return this.configDetails?this.configJson=JSON.parse(this.config):this.config=JSON.stringify(this.configJson,null,4),this.configDetails=!this.configDetails},i}(t.Controller)}});