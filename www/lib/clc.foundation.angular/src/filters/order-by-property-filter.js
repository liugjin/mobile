if("function"!=typeof define)var define=require("amdefine")(module);define([],function(){var e,r;return{OrderByPropertyFilter:e=function(){return function(e,r,n){var i,t,f;for(i in t=[],e)f=e[i],t.push(f);return t.sort(function(e,n){return e[r]>n[r]}),n&&t.reverse(),t}}}});