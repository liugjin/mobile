if("function"!=typeof define)var define=require("amdefine")(module);define(["showdown","hljs"],function(e,l){var n,r,c,t;return n='class="',c=function(e){return e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")},t=function(){return[{type:"output",filter:function(n,r,t){var i,a,s,u;return a="<pre><code\\b[^>]*>",u="</code></pre>",i="g",s=function(e,n,r,t){var i,a;return n=c(n),a=(r.match(/class=\"([^ \"]+)/)||[])[1],r.includes('class="')?(i=r.indexOf('class="')+'class="'.length,r=r.slice(0,i)+"hljs "+r.slice(i)):r=r.slice(0,-1)+' class="hljs">',a&&l.getLanguage(a)?r+l.highlight(a,n).value+t:r+l.highlightAuto(n).value+t},e.helper.replaceRecursiveRegExp(n,s,a,u,"g")}}]}});