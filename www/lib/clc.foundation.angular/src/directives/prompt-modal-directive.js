if("function"!=typeof define)var define=require("amdefine")(module);define([],function(){var n,e;return{PromptModalDirective:n=function(n,e){return{restrict:"EA",scope:{options:"="},template:"<div id='prompt-modal' class='modal'>\n    <div class='modal-content'>\n      <h5>{{options.title}}</h5>\n      <p>{{options.message}}</p>\n      <input type='text' ng-model='options.comment' ng-show='options.enableComment' />\n    </div>\n\n    <div class='modal-footer'>\n      <a class='modal-action modal-close waves-effect waves-green btn red' ng-click='options.confirm(true)'>确认<i class='material-icons left'>save</i></a>\n      <a class='modal-action modal-close waves-effect waves-green btn-flat' ng-click='options.confirm(false)'>取消<i class='material-icons left'>close</i></a>\n\n    </div>\n</div>",link:function(n,e,o){var t;return $(e.find(".modal")).modal(),(o.width||o.height)&&(t={},o.width&&(t.width=o.width),o.height&&(t.height=o.height),e.find("#prompt-modal").css(t)),n.$on("openPromptModal",function(o,t){return n.options=t,e.find("#prompt-modal").modal("open")})}}}}});