if("function"!=typeof define)var define=require("amdefine")(module);define([],function(){var e,n;return{FileUploaderDirective:e=function(e,n){return{restrict:"AE",require:"ngModel",replace:!0,scope:{dir:"@",filename:"@",accept:"@",ngModel:"=",onUpload:"&"},template:"<div style='width: 100%; height: 100%;' title='{{ngModel && ngModel || \"拖动或选择打开文件\"}}' class=''  ng-mouseenter='toolbar=true' ng-mouseleave='toolbar=false'>\n  <div ng-show='!showLink' style='cursor: pointer; width: 100%; height: 100%; position: relative; display: table' class='file-preview'>\n    <a ng-if='ngModel' style='display: table-cell; vertical-align: middle'><i class='material-icons small'>attach_file</i><span>{{ngModel}}</span></a>\n    <a ng-if='!ngModel' style='display: table-cell; vertical-align: middle'><i class='material-icons small'>file_upload</i></a>\n  </div>\n  <textarea ng-show='showLink' style='width: 100%; height: 100%; resize: none;' ng-model='ngModel'></textarea>\n  <input type='file' accept='{{accept}}' style='display: none' />\n  <div class='progress' ng-show='progress > 0 && progress < 100' title='上载进度：{{name}} {{progress | number:1}}%'>\n    <div class='determinate' style='width: {{progress}}%'></div>\n  </div>\n  <div style='position: relative; float: right; margin: 5px; top: -40px;' ng-show='toolbar'>\n    <span ng-show='ngModel' class='file-remove' title='删除文件' ng-click='ngModel = \"\"'>\n        <a href='' style='color: grey;' onMouseOver='this.style.color=\"orange\"' onMouseOut='this.style.color=\"grey\"'>\n          <i class='material-icons small'>delete</i>\n        </a>\n    </span>\n    <span class='file-link' title='显示或设置文件链接' ng-click='showLink = !showLink'>\n        <a href='' style='color: grey;' onMouseOver='this.style.color=\"orange\"' onMouseOut='this.style.color=\"grey\"'>\n          <i class='material-icons small'>link</i>\n        </a>\n    </span>\n    <span ng-show='ngModel' class='file-link' title='下载文件'>\n        <a ng-href='{{dir}}/{{ngModel}}' target='_blank' style='color: grey;' onMouseOver='this.style.color=\"orange\"' onMouseOut='this.style.color=\"grey\"'>\n          <i class='material-icons small'>file_download</i>\n        </a>\n    </span>\n  </div>\n</div>",link:function(e,l,i){var t,o,a;return null==e.accept&&(e.accept="*"),o=l.find(".file-preview"),t=l.find('input[type="file"]'),o.bind("click",function(){return t.click()}),t.bind("change",function(l){var i,o;return n?a(null!=(i=t[0])&&null!=(o=i.files)?o[0]:void 0):"function"==typeof e.upload&&e.upload()(t[0]),l.target.value=null}),a=function(l){var i,t;if(l)return e.name=l.name,i=e.dir+"/"+l.name,n.upload(l,e.filenmae,i,(t=this,function(n,l){var i;return n?console.log(n):e.ngModel=""+l.resource+l.extension+"?"+(new Date).getTime(),"function"==typeof e.onUpload&&"function"==typeof(i=e.onUpload())?i(n,e.ngModel):void 0}),function(n){return e.progress=100*n})},l.on("drop",function(e){var n,l,i,t;if(!$(e.target).is(":input"))return e.preventDefault(),e.stopPropagation(),n=null!=(i=(l=e.originalEvent).dataTransfer)&&null!=(t=i.files)?t[0]:void 0,a(n)}),l.on("paste",function(e){var n,l,i,t,o;for(e.preventDefault(),e.stopPropagation(),i=0,t=(o=e.originalEvent.clipboardData.items).length;i<t;i++)if("file"===(l=o[i]).kind)return n=l.getAsFile(),void a(n)})}}}}});