//PROCESSED
qx.$$packageData['16']={"resources":{"plugins/rss/dep/zrssfeed/jquery.zrssfeed.js":"cv"}};
qx.Part.$$notifyLoad("16", function() {
(function(){var a='width:',b='" style="',c='#',d="",e="interval",f='<div class="actor"><div class="rss_inline" id="rss_',g="rss",h='',i='plugins/rss/dep/zrssfeed/jquery.zrssfeed.js',j='height:',k='"></div>',l='cv.plugins.Rss',m="String",n=' .rss_inline',o="_new";qx.Class.define(l,{extend:cv.ui.structure.AbstractWidget,include:[cv.ui.common.Refresh],statics:{parse:function(p,t,r,q){var s=cv.parser.WidgetParser.parseElement(this,p,t,r,q,this.getAttributeToPropertyMappings());cv.parser.WidgetParser.parseRefresh(p,t);return s;},getAttributeToPropertyMappings:function(){return {'src':{},'width':{"default":d},'height':{"default":d},'limit':{"default":10},'header':{"default":true},'date':{"default":true},'content':{"default":true},'snippet':{"default":true},'showerror':{"default":true},'ssl':{"default":false},'linktarget':{"default":o},'link':{"default":true},'title':{"default":true}};}},properties:{src:{check:m,init:d},'width':{init:d},'height':{init:d},'limit':{init:10},'header':{init:true},'date':{init:true},'content':{init:true},'snippet':{init:true},'showerror':{init:true},'ssl':{init:false},'linktarget':{init:o},'link':{init:true},'title':{init:true}},members:{_getInnerDomString:function(){var u=h+this.getWidth()?a+this.getWidth():h+this.getHeight()?j+this.getHeight():h;return f+this.getPath()+b+u+k;},_onDomReady:function(){cv.ui.structure.AbstractWidget.prototype._onDomReady.call(this);this.refreshRSS();},_setupRefreshAction:function(){this._timer=new qx.event.Timer(this.getRefresh());this._timer.addListener(e,function(){this.refreshRSS();},this);this._timer.start();},refreshRSS:function(){var v=cv.data.Model.getInstance().getWidgetData(this.getPath());$(c+this.getPath()+n).rssfeed(this.getSrc(),v);}},defer:function(w){var x=cv.util.ScriptLoader.getInstance();x.addScripts(i);cv.parser.WidgetParser.addHandler(g,cv.plugins.Rss);cv.ui.structure.WidgetFactory.registerClass(g,w);}});})();
}); (function($){$.fn.rssfeed=function(url,options,fn){var defaults={limit:10,header:true,titletag:'h4',date:true,content:true,snippet:true,media:true,showerror:true,errormsg:'',key:null,ssl:false,linktarget:'_self'};var options=$.extend(defaults,options);return this.each(function(i,e){var $e=$(e);var s='';if(options.ssl)s='s';if(!$e.hasClass('rssFeed'))$e.addClass('rssFeed');if(url==null)return false;var api="http"+s+"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURIComponent(url);if(options.limit!=null)api+="&num="+options.limit;if(options.key!=null)api+="&key="+options.key;api+="&output=json_xml"
$.getJSON(api,function(data){if(data.responseStatus==200){_process(e,data.responseData,options);if($.isFunction(fn))fn.call(this,$e);}else{if(options.showerror)
if(options.errormsg!=''){var msg=options.errormsg;}else{var msg=data.responseDetails;};$(e).html('<div class="rssError"><p>'+msg+'</p></div>');};});});};var _process=function(e,data,options){var feeds=data.feed;if(!feeds){return false;}
var html='';var row='odd';if(options.media){var xml=getXMLDocument(data.xmlString);var xmlEntries=xml.getElementsByTagName('item');}
if(options.header)
html+='<div class="rssHeader">'+'<a href="'+feeds.link+'" title="'+feeds.description+'">'+feeds.title+'</a>'+'</div>';html+='<div class="rssBody">'+'<ul>';for(var i=0;i<feeds.entries.length;i++){var entry=feeds.entries[i];var pubDate;if(entry.publishedDate){var entryDate=new Date(entry.publishedDate);var pubDate=entryDate.toLocaleDateString()+' '+entryDate.toLocaleTimeString()+'&nbsp;';}
html+='<li class="rssRow '+row+'">'+'<'+options.titletag+'><a href="'+entry.link+'" title="View this feed at '+feeds.title+'">'+entry.title+'</a></'+options.titletag+'>'
if(options.date&&pubDate)html+='<div>'+pubDate+'</div>'
if(options.content){if(options.snippet&&entry.contentSnippet!=''){var content=entry.contentSnippet;}else{var content=entry.content;}
html+='<p>'+content+'</p>'}
if(options.media&&xmlEntries.length>0){var xmlMedia=xmlEntries[i].getElementsByTagName('enclosure');if(xmlMedia.length>0){html+='<div class="rssMedia"><div>Media files</div><ul>'
for(var m=0;m<xmlMedia.length;m++){var xmlUrl=xmlMedia[m].getAttribute("url");var xmlType=xmlMedia[m].getAttribute("type");var xmlSize=xmlMedia[m].getAttribute("length");html+='<li><a href="'+xmlUrl+'" title="Download this media">'+xmlUrl.split('/').pop()+'</a> ('+xmlType+', '+formatFilesize(xmlSize)+')</li>';}
html+='</ul></div>'}
html+='</li>';}
if(row=='odd'){row='even';}else{row='odd';}}
html+='</ul>'+'</div>'
$(e).html(html);$('a',e).attr('target',options.linktarget);};function formatFilesize(bytes){var s=['bytes','kb','MB','GB','TB','PB'];var e=Math.floor(Math.log(bytes)/Math.log(1024));return(bytes/Math.pow(1024,Math.floor(e))).toFixed(2)+" "+s[e];}
function getXMLDocument(string){var browser=navigator.appName;var xml;if(browser=='Microsoft Internet Explorer'){xml=new ActiveXObject('Microsoft.XMLDOM');xml.async='false'
xml.loadXML(string);}else{xml=(new DOMParser()).parseFromString(string,'text/xml');}
return xml;}})(jQuery);