qx.$$packageData['176033']={"locales":{},"resources":{},"translations":{"de":{},"en":{}}};
qx.Part.$$notifyLoad("176033", function() {
(function(){var a="domReady",b='px',c='showFloor',d='none',e='',f='left',g='display',h="cv.ui.common.Update",i='top';qx.Mixin.define(h,{include:cv.ui.common.BasicUpdate,construct:function(){if(this.getAddress){if(this._initOnCreate===true){this.__rl();}else if(qx.Class.getEventType(this.constructor,a)){this.addListenerOnce(a,this.__rl,this);};};},members:{_initOnCreate:false,__rl:function(){var j=cv.data.Model.getInstance();Object.getOwnPropertyNames(this.getAddress()).forEach(function(m){if(!cv.data.Model.isReadAddress(this.getAddress()[m])){return;};var k=j.getState(m);if(k!==undefined){this.update(m,k);};j.addUpdateListener(m,this.update,this);},this);},update:function(p,n){if(this._update){this._update(p,n);}else {var o=this.processIncomingValue(p,n);if(this.handleUpdate){this.handleUpdate(o,p);};};},processIncomingValue:function(s,q){if(this._processIncomingValue){var r=this._processIncomingValue(s,q);if(r!==undefined){this.setBasicValue(r);};return r;};return this.defaultUpdate(s,q,this.getDomElement(),true,this.getPath());},update3d:function(u,v){var l=u.data.layout;var w=v.building2screen(new THREE.Vector3(l.x,l.y,l.z));u.data.element.css(f,w.x+b);u.data.element.css(i,w.y+b);var t=true;if(l.floorFilter){t=v.getState(c)===v.buildingProperties.floorNames[l.floorFilter];};u.data.element.css(g,t?e:d);}}});})();
});