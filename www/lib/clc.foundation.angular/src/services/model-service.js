if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,n){for(var r in n)__hasProp.call(n,r)&&(t[r]=n[r]);function e(){this.constructor=t}return e.prototype=n.prototype,t.prototype=new e,t.__super__=n.prototype,t};define(["./service"],function(t){var n,r;return{ModelService:n=function(t){var n;function r(t,n,e){this.$http=n,this.options=e,r.__super__.constructor.call(this,t),this.items={},this.itemsByUrl={},this.keys=[]}return __extends(r,t),n="url of ModelService is null",r.prototype.bind=function(t){return this.url=t,this.parseParams()},r.prototype.parseParams=function(){var t,r;if(this.url)return(r=this.url.match(/\/:([^\/\s]*)/g))&&(this.keys=function(){var n,e,o;for(o=[],n=0,e=r.length;n<e;n++)t=r[n],o.push(t.substr(2));return o}()),this.keys.length&&(this.lastKey=this.keys[this.keys.length-1]),this.keys;console.log(n)},r.prototype.replaceUrlParam=function(t,n,r){var e;return"+"===(e=t.replace(/\/:([^\/\s]*)/g,function(t,e){var o,i;return i=n[e],r||delete n[e],o=null!=i?"/"+i:"/+"}))[e.length-1]&&(e=e.substr(0,e.length-2)),e},r.prototype.getUrl=function(t,n){if(this.url)return this.replaceUrlParam(this.url,t,n)},r.prototype.onSuccess=function(t,n){var r,e,o;return this.afterAction(),(null!=(r=t.data)?r._err:void 0)?(e=null!=(o=r._err.message)?o:r._err,"function"==typeof n?n(e):void 0):"function"==typeof n?n(null,r):void 0},r.prototype.onError=function(t,n){var r,e,o,i,u;return this.afterAction(),e=(null!=(r=t.data)?r._err:void 0)?null!=(o=r._err.message)?o:r._err:null!=(i=null!=(u=t.message)?u:t.status)?i:"unknown error","function"==typeof n?n(e):void 0},r.prototype.beforeAction=function(){return this.$rootScope.loading=!0},r.prototype.afterAction=function(){return this.$rootScope.loading=!1},r.prototype.addItem=function(t,n){var r,e,o;if(t)return e=null!=(o=t._id)?o:n,r=this.items[e]||{},angular.extend(r,t),this.items[e]=r},r.prototype.create=function(t,r){var e,o;return t?(this.beforeAction(),(e=this.getUrl(t))?(t=this.appendToken(t),this.$http.post(e,t).then((o=this,function(t){return o.onSuccess(t,function(t,n){var e;return e=o.addItem(n),"function"==typeof r?r(t,e):void 0})})).catch(function(t){return function(n){return t.onError(n,r)}}(this))):"function"==typeof r?r(n):void 0):"function"==typeof r?r("不能创建空项"):void 0},r.prototype.update=function(t,r){var e,o;return t?(this.beforeAction(),t=this.appendToken(t),(e=this.getUrl(t))?this.$http.put(e,t).then((o=this,function(t){return o.onSuccess(t,function(t,n){var e;return e=o.addItem(n),"function"==typeof r?r(t,e):void 0})})).catch(function(t){return function(n){return t.onError(n,r)}}(this)):"function"==typeof r?r(n):void 0):"function"==typeof r?r("不能更新空项"):void 0},r.prototype.save=function(t,n){return t._removed?this.remove(t,n):t._id?this.update(t,n):this.create(t,n)},r.prototype.remove=function(t,r){var e,o,i;return t?(this.beforeAction(),(o=this.getUrl(t,!0))?(e=this.appendToken(null),this.$http.delete(o,{params:e}).then((i=this,function(n){return i.onSuccess(n,function(n,e){return!n&&e&&i.removeItem,"function"==typeof r?r(n,null!=e?e:t):void 0})})).catch(function(t){return function(n){return t.onError(n,r)}}(this))):"function"==typeof r?r(n):void 0):"function"==typeof r?r("不能删除空项"):void 0},r.prototype.removeItem=function(t){var n,r,e,o,i,u,s,c,f;for(i=t._id,delete this.items[i],c=this.itemsByUrl,f=[],e=u=0,s=c.length;u<s;e=++u)o=c[e],f.push(function(){var t,o,u;for(u=[],n=t=0,o=e.length;t<o;n=++t){if((r=e[n])._id===i){e.slice(n,1);break}u.push(void 0)}return u}());return f},r.prototype.get=function(t,r,e){var o,i,u,s;return i=JSON.stringify(t),t=this.clone(t),(u=this.getUrl(t))?!e&&(o=this.itemsByUrl[i])?"function"==typeof r?r(null,o):void 0:(this.beforeAction(),t=this.appendToken(t),this.$http.get(u,{params:t}).then((s=this,function(t){return s.onSuccess(t,function(t,n){var e;return e=s.addItem(n,i),s.itemsByUrl[i]=e,"function"==typeof r?r(t,e):void 0})})).catch(function(t){return function(n){return t.onError(n,r)}}(this))):"function"==typeof r?r(n):void 0},r.prototype.hasProperties=function(t){var n,r;if(!t)return!1;for(n in t)return r=t[n],!0;return!1},r.prototype.clone=function(t){var n,r,e;if(!t)return t;for(r in n={},t)e=t[r],n[r]=e;return n},r.prototype.query=function(t,r,e,o){var i,u,s,c,f;return u=JSON.stringify(t)+"&"+r,t=this.clone(t),(c=this.getUrl(t))?!o&&(i=this.itemsByUrl[u])?"function"==typeof e?e(null,i):void 0:(this.beforeAction(),s={},this.hasProperties(t)&&(s.filter=t),r&&(s.fields=r),s=this.appendToken(s),this.$http.get(c,{params:s}).then((f=this,function(t){return f.onSuccess(t,function(t,n){var r,o;return r=angular.isArray(n)?function(){var t,r,e;for(e=[],t=0,r=n.length;t<r;t++)o=n[t],e.push(this.addItem(o,u));return e}.call(f):f.addItem(n,u),f.itemsByUrl[u]=r,"function"==typeof e?e(t,r):void 0})})).catch(function(t){return function(n){return t.onError(n,e)}}(this))):"function"==typeof e?e(n):void 0},r.prototype.postData=function(t,n,r){return this.beforeAction(),n=this.appendToken(n),this.$http.post(t,n).then((e=this,function(t){return e.onSuccess(t,r)})).catch(function(t){return function(n){return t.onError(n,r)}}(this));var e},r.prototype.getData=function(t,n,r,e){return this.beforeAction(),n=this.appendToken(n),this.$http.get(t,{params:n}).then((o=this,function(t){return o.onSuccess(t,r)})).catch(function(t){return function(n){return t.onError(n,r)}}(this));var o},r.prototype.getStream=function(t,n){var r,e;return this.beforeAction(),r=this.getUrl(t),t.params=this.appendToken(),this.$http.get(r,t).then((e=this,function(t){return e.afterAction(),"function"==typeof n?n(t):void 0})).catch(function(t){return function(r){return t.afterAction(),"function"==typeof n?n(r):void 0}}(this))},r}(t.Service)}});