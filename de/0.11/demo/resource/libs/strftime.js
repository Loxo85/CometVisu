Date.ext={},Date.ext.util={},Date.ext.util.xPad=function(e,t,a){for(void 0===a&&(a=10);parseInt(e,10)<a&&1<a;a/=10)e=t.toString()+e;return e.toString()},Date.prototype.locale="en-GB",document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang&&(Date.prototype.locale=document.getElementsByTagName("html")[0].lang),Date.ext.locales={},Date.ext.locales.en={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],x:"%d/%m/%y",X:"%T"},Date.ext.locales["en-US"]=Date.ext.locales.en,Date.ext.locales["en-US"].c="%a %d %b %Y %r %Z",Date.ext.locales["en-US"].x="%D",Date.ext.locales["en-US"].X="%r",Date.ext.locales["en-GB"]=Date.ext.locales.en,Date.ext.locales["en-AU"]=Date.ext.locales["en-GB"],Date.ext.formats={a:function(e){return Date.ext.locales[e.locale].a[e.getDay()]},A:function(e){return Date.ext.locales[e.locale].A[e.getDay()]},b:function(e){return Date.ext.locales[e.locale].b[e.getMonth()]},B:function(e){return Date.ext.locales[e.locale].B[e.getMonth()]},c:"toLocaleString",C:function(e){return Date.ext.util.xPad(parseInt(e.getFullYear()/100,10),0)},d:["getDate","0"],e:["getDate"," "],g:function(e){return Date.ext.util.xPad(parseInt(Date.ext.util.G(e)/100,10),0)},G:function(e){var t=e.getFullYear(),a=parseInt(Date.ext.formats.V(e),10),n=parseInt(Date.ext.formats.W(e),10);return a<n?t++:0===n&&52<=a&&t--,t},H:["getHours","0"],I:function(e){var t=e.getHours()%12;return Date.ext.util.xPad(0==t?12:t,0)},j:function(e){var t=e-new Date(e.getFullYear()+"/1/1 GMT");t+=6e4*e.getTimezoneOffset();var a=parseInt(t/6e4/60/24,10)+1;return Date.ext.util.xPad(a,0,100)},m:function(e){return Date.ext.util.xPad(e.getMonth()+1,0)},M:["getMinutes","0"],p:function(e){return Date.ext.locales[e.locale].p[12<=e.getHours()?1:0]},P:function(e){return Date.ext.locales[e.locale].P[12<=e.getHours()?1:0]},S:["getSeconds","0"],u:function(e){var t=e.getDay();return 0===t?7:t},U:function(e){var t=parseInt(Date.ext.formats.j(e),10),a=6-e.getDay(),n=parseInt((t+a)/7,10);return Date.ext.util.xPad(n,0)},V:function(e){var t=parseInt(Date.ext.formats.W(e),10),a=new Date(e.getFullYear()+"/1/1").getDay(),n=t+(4<a||a<=1?0:1);return 53==n&&new Date(e.getFullYear()+"/12/31").getDay()<4?n=1:0===n&&(n=Date.ext.formats.V(new Date(e.getFullYear()-1+"/12/31"))),Date.ext.util.xPad(n,0)},w:"getDay",W:function(e){var t=parseInt(Date.ext.formats.j(e),10),a=7-Date.ext.formats.u(e),n=parseInt((t+a)/7,10);return Date.ext.util.xPad(n,0,10)},y:function(e){return Date.ext.util.xPad(e.getFullYear()%100,0)},Y:"getFullYear",z:function(e){var t=e.getTimezoneOffset();return(0<t?"-":"+")+Date.ext.util.xPad(parseInt(Math.abs(t/60),10),0)+Date.ext.util.xPad(t%60,0)},Z:function(e){return e.toString().replace(/^.*\(([^)]+)\)$/,"$1")},"%":function(e){return"%"}},Date.ext.aggregates={c:"locale",D:"%m/%d/%y",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"},Date.ext.aggregates.z=Date.ext.formats.z(new Date),Date.ext.aggregates.Z=Date.ext.formats.Z(new Date),Date.ext.unsupported={},Date.prototype.strftime=function(e){this.locale in Date.ext.locales||(this.locale.replace(/-[a-zA-Z]+$/,"")in Date.ext.locales?this.locale=this.locale.replace(/-[a-zA-Z]+$/,""):this.locale="en-GB");for(var n=this;e.match(/%[cDhnrRtTxXzZ]/);)e=e.replace(/%([cDhnrRtTxXzZ])/g,function(e,t){var a=Date.ext.aggregates[t];return"locale"==a?Date.ext.locales[n.locale][t]:a});var t=e.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g,function(e,t){var a=Date.ext.formats[t];return"string"==typeof a?n[a]():"function"==typeof a?a.call(n,n):"object"==typeof a&&"string"==typeof a[0]?Date.ext.util.xPad(n[a[0]](),a[1]):t});return n=null,t};