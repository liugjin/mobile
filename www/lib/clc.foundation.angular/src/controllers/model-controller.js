if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,e){for(var i in e)__hasProp.call(e,i)&&(t[i]=e[i]);function n(){this.constructor=t}return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};define(["./paging-controller"],function(t){var e,i;return{ModelController:e=function(t){function e(t,i,n,r,o,s,u,c){this.$timeout=s,this.modelManager=u,this.options=c,e.__super__.constructor.call(this,t,i,n,r,o),this.current={},this.model={},this.modelService=this.modelManager.getService(this.options.type),this.initializeValidateKeys()}return __extends(e,t),e.prototype.initializeValidateKeys=function(){var t,e,i,n,r;if(e={},this.options.key instanceof Array)for(i=0,n=(r=this.options.key).length;i<n;i++)e[t=r[i]]=!0;return this.validateKeys=e},e.prototype.select=function(t){var e,i;if(this.current!==t)return this.current=null!=t?t:{},this.next=this.prev=null,t&&(e=this.items.indexOf(t),(i=this.items.length)>1&&(e>0&&(this.prev=this.items[e-1]),e<i-1&&(this.next=this.items[e+1]))),this.current},e.prototype.selectNext=function(t,e){var i,n;return i=0,(n=this.itemIds[t])&&((i=this.items.indexOf(n))>=0?(i+=1)>=this.items.length&&(i=0):i=0),e&&1===this.items.length?this.select(null):this.select(this.items[i])},e.prototype.get=function(t,e,i){return this.modelService.get(t,(n=this,function(t,i){var r;return!t&&i&&(r=n.addItem(i))&&n.select(r),"function"==typeof e?e(t,i):void 0}),i);var n},e.prototype.query=function(t,e,i,n){return this.modelService.query(t,e,(r=this,function(t,e){var n;return n=r.setItems(e),"function"==typeof i?i(t,n):void 0}),n);var r},e.prototype.create=function(t,e){var i,n;return(i=this.getChanges())?this.modelService.create(i,(n=this,function(i,r){var o;return!i&&r&&(o=n.addItem(r))&&n.select(o),n.display(i,null!=e?e:"数据创建成功！"),"function"==typeof t?t(i,r):void 0})):"function"==typeof t?t("cancel"):void 0},e.prototype.getChanges=function(){var t,e,i,n;for(t in e={},n=this.current)i=n[t],"_id"!==t&&"_"===t[0]||(e[t]=i);if(this.validate(e))return e},e.prototype.validate=function(t){var e,i,n;for(e in n=this.validateKeys)if((i=n[e])&&null==t[e])return this.display(e+"不能为空！"),!1;return!0},e.prototype.update=function(t,e){var i,n;return(i=this.getChanges())?this.modelService.update(i,(n=this,function(i,r){var o;return!i&&r&&(o=n.addItem(r))&&n.select(o),n.display(i,null!=e?e:"数据更新成功！"),"function"==typeof t?t(i,r):void 0})):"function"==typeof t?t("cancel"):void 0},e.prototype.save=function(t,e){return this.current._removed?this.remove(t,e):this.current._id?this.update(t,e):this.create(t,e)},e.prototype.remove=function(t,e){var i,n;return(i=this.getChanges())?this.modelService.remove(i,(n=this,function(i,r){var o,s,u,c,a;if(!i&&r){if(r instanceof Array)for(c=0,a=r.length;c<a;c++)u=r[c],o=n.removeById(u._id);else o=n.removeById(r._id);o>=0&&n.items.length>0&&(o>=n.items.length&&(o=n.items.length-1),s=n.items[o])}return n.select(s),n.display(i,null!=e?e:"数据删除成功！"),"function"==typeof t?t(i,r):void 0})):"function"==typeof t?t("cancel"):void 0},e.prototype.saveModel=function(t,e,i){var n,r;return"_back"===e?(r=this,n=function(){return r.goBack()}):"string"==typeof e?n=function(t){return function(){return t.goto(e,!0)}}(this):"function"==typeof e&&(n=e),this.save(function(e){return function(i,r){if("function"==typeof t&&t(i,r),!i)return e.$rootScope.reload=!0,"function"==typeof n?n():void 0}}(this),i)},e.prototype.removeModel=function(t,e){var i,n,r,o;if(this.current)return this.confirm("确认删除："+(null!=(i=null!=(n=null!=(r=this.current.name)?r:this.current.id)?n:this.current.key)?i:this.current._id)+" ?","删除后将从数据库移除相关记录，不可恢复。",(o=this,function(i){return i?(o.current._removed=!0,o.saveModel(t,e)):"function"==typeof t?t("cancel"):void 0}))},e}(t.PagingController)}});