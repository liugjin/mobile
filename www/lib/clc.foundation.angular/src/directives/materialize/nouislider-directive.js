if("function"!=typeof define)var define=require("amdefine")(module);define(["materialize-css","nouislider"],function(e,n){var i,r;return{NoUiSliderDirective:i=function(e){return{restrict:"EA",link:function(i,r,t){return e(function(){var e;return e={},n.create(r[0]({start:[20,80],connect:!0,step:1,orientation:"horizontal",range:{min:0,max:100},format:wNumb({decimals:0})}))})}}}}});