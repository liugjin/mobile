if("function"!=typeof define)var define=require("amdefine")(module);define(["materialize-css"],function(i){var n,r;return{CarouselDirective:n=function(n){return{restrict:"AE",link:function(r,e,t){return n(function(){var n;return n={duration:t.duration||200,dist:t.dist||-100,shift:t.duration||0,padding:t.padding||0,numVisible:t.numVisible||5,fullWidth:null!=t.fullWidth&&"true"===t.fullWidth,indicators:null==t.indicators||"true"===t.indicators,noWrap:null!=t.noWrap&&"true"===t.noWrap,onCycleTo:t.onCycleTo},i.Carousel.init(e,n)})}}}}});