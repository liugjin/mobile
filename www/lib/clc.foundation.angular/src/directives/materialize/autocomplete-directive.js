if("function"!=typeof define)var define=require("amdefine")(module);define(["materialize-css"],function(t){var e,n;return{AutocompleteDirective:e=function(e){return{restrict:"AE",scope:{data:"="},link:function(n,i,r){return e(function(){var e,u,o;return o={limit:r.limit,minLength:r.minLength},u=t.Autocomplete.init(i,o),e=u[0],n.$watch(n.data,function(t){return e.updateData(t)}),n.$on("$destroy",function(){return e.destroy()})})}}}}});