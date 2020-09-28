if("function"!=typeof define)var define=require("amdefine")(module);var __hasProp={}.hasOwnProperty,__extends=function(t,e){for(var r in e)__hasProp.call(e,r)&&(t[r]=e[r]);function o(){this.constructor=t}return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t};define(["./project-item-model-controller"],function(t){var e,r;return{ProjectModelController:e=function(t){function e(t,r,o,n,u,i,a,c,s){e.__super__.constructor.call(this,t,r,o,n,u,i,a,c,s)}return __extends(e,t),e.prototype.load=function(t,e){return this.$routeParams.project?this.loadProject(t,e):this.createProject(t,e)},e.prototype.loadProject=function(t,e){var r,o;return r={user:this.$routeParams.user,project:this.$routeParams.project},this.get(r,(o=this,function(e,r){return"function"==typeof t?t(e,r):void 0}),e)},e.prototype.createProject=function(t,e){return this.current={user:this.$rootScope.user.user,project:this.getGuid(),enable:!0,private:!1},"function"==typeof t?t(null,this.current):void 0},e.prototype.pasteLon=function(t){var e,r,o,n,u;return n=(e=t.originalEvent.clipboardData.getData("text/plain")).split(","),o=n[0],r=n[1],this.$timeout((u=this,function(){if(null!=o&&(u.current.longitude=o),null!=r)return u.current.latitude=r}),50)},e.prototype.pasteLat=function(t){var e,r,o,n,u;return n=(e=t.originalEvent.clipboardData.getData("text/plain")).split(","),o=n[0],r=n[1],this.$timeout((u=this,function(){if(null!=o&&null!=r)return u.current.longitude=o,u.current.latitude=r}),50)},e.prototype.save=function(t,r){return null==r&&(r="/projects"),this.current.project&&!this.current._removed&&(r="/projects/"+this.current.user+"/"+this.current.project),e.__super__.save.call(this,t,r)},e.prototype.addFeature=function(){var t,e;if(this.current)return null==(e=this.current).features&&(e.features=[]),t={desc:"",image:""},this.current.features.push(t)},e.prototype.removeFeature=function(t){var e;if(this.current)return(e=this.current.features).splice(e.indexOf(t),1)},e.prototype.uploadFeatureImage=function(t){return e=this,function(r){return e.uploadFeatureImage2(r,t)};var e},e.prototype.uploadFeatureImage2=function(t,e){var r,o,n,u;if(t.files.length>0)return o=t.files[0],n=this.options.uploadUrl+"/"+o.name,r=this.current.features[e],this.uploadService.upload(o,n,(u=this,function(t,e){return u.$rootScope.err=t,r.image=e}))},e}(t.ProjectItemModelController)}});