if("function"!=typeof define)var define=require("amdefine")(module);define([],function(){var e,n,r;return n={executing:"正在执行",complete:"控制完成",timeout:"控制超时",cancel:"控制取消",error:"控制异常"},{CommandPhasesFilter:e=function(){return function(e){var r;return null!=(r=n[e])?r:e}}}});