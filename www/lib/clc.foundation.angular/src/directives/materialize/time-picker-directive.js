if("function"!=typeof define)var define=require("amdefine")(module);define(["materialize-css"],function(e){var n,t;return{TimePickerDirective:n=function(n){return{restrict:"AE",link:function(t,r,o){return n(function(){var n;return n={duration:o.duration||350,container:o.container,showClearBtn:null!=o.showClearBtn&&"true"===o.showClearBtn,defaultTime:o.defaultTime||"now",fromNow:o.fromNow||0,i18n:o.i18n||{},autoClose:o.autoClose,twelveHour:null==o.twelveHour||"true"===o.twelveHour,vibrate:null==o.vibrate||"true"===o.vibrate,onOpenStart:o.onOpenStart,onOpenEnd:o.onOpenEnd,onCloseStart:o.onCloseStart,onCloseEnd:o.onCloseEnd,onSelect:o.onSelect},e.Timepicker.init(r,n)})}}}}});