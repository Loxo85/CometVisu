qx.$$packageData['2']={"resources":{}};
qx.Part.$$notifyLoad("2", function() {
(function(){var a="changeModel",b="/config",c="Boolean",d="application/json",e="The CometVisu seems to be delivered by a proxied webserver. Changing configuration values might not have the expected effect. Please proceed only if you know what you are doing.",f="changeModified",g="true",h="__tA",i="putSuccess",j="bottom-text",k="org.openhab.cometvisu",l="changeValue",m="GET",o="cv.plugins.openhab.Settings",p="execute",q="BOOLEAN",r="text-shadow",s=" to ",t="window-caption",u="autoDownload",v="rgba(216, 216, 216, 1.0)",w="save-button",x="center",y="PUT",z="get",A="__root",B="enabled",C="/rest/config-descriptions/",D="TEXT",E="icons.mapping>",F="title",G="cancel-button",H="_",I="_store",J="appear",K="_window",L="ui:cometvisu",M="form",N="openHAB backend settings",O="Cancel",P="DELETE",Q="icons>enableMapping",R="icons_enableMapping",S="__tz",T="getSuccess",U="bold",V="model",W="Save",X="none",Y="/rest/services/",bh=" has changed from ",bi="Content-Type",bj="excluded",bf="rgb(61, 61, 61)",bg="modified";qx.Class.define(o,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.VBox());this.set({padding:10,backgroundColor:v,textColor:bf});if(!this.getBounds()){this.addListenerOnce(J,function(){this.getContentElement().setStyle(r,X);},this);}else {this.getContentElement().setStyle(r,X);};this.__ty=k;this.__ca=L;this._initConfigRestClient();},properties:{modified:{check:c,init:false,event:f}},members:{__ty:null,__ca:null,__tz:null,__tA:null,__tB:null,__tC:false,_store:null,__tD:null,_initStore:function(bl){var bk={"get":{method:m,url:Y+bl+b},"delete":{method:P,url:Y+bl+b},"put":{method:y,url:Y+bl+b}};var bm=this.__tA=new qx.io.rest.Resource(bk);this._store=new qx.data.store.Rest(bm,z,{configureRequest:function(bn){bn.setRequestHeader(bi,d);},manipulateData:function(bo){var n={};Object.getOwnPropertyNames(bo).forEach(function(bp){n[bp.replace(/[\.>]/g,H)]=bo[bp];});if(!n.hasOwnProperty(u)){n.autoDownload=false;};return n;}});bm.get();this._store.addListenerOnce(a,function(){this.__tD=JSON.parse(qx.util.Serializer.toJson(this._store.getModel()));},this);},_saveConfig:function(){var bq=qx.util.Serializer.toJson(this._store.getModel());bq=bq.replace(/icons_mapping_/g,E);bq=JSON.parse(bq.replace(R,Q));this.__tA.put(null,bq);this.__tA.addListenerOnce(i,this.close,this);},_initConfigRestClient:function(){var bs={"get":{method:m,url:C+this.__ca}};var br=this.__tz=new qx.io.rest.Resource(bs);br.addListener(T,function(bt){this._createForm(bt.getRequest().getResponse());},this);br.configureRequest(function(bu){bu.setRequestHeader(bi,d);});br.get();this._initStore(this.__ty);},_createForm:function(bw){this._createChildControl(F);var by=this.getChildControl(M);bw.parameters.forEach(function(bA){var bz;switch(bA.type){case D:bz=new qx.ui.form.TextField();if(bA.defaultValue){bz.setPlaceholder(bA.defaultValue);};break;case q:bz=new qx.ui.form.CheckBox();bz.setValue(bA.defaultValue===g);break;};if(bA.readOnly){bz.setReadOnly(true);};if(bA.required){bz.setRequired(true);};bz.setToolTipText(bA.description);bz.addListener(l,this._onFormFieldChange,this);by.add(bz,bA.label,null,bA.name,null,bA);},this);var bx=new cv.plugins.openhab.renderer.Single(by);if(cv.Config.guessIfProxied()){bx.setBottomText(this.tr(e));bx.getChildControl(j).set({padding:10,textAlign:x,font:U});};bx.addButton(this.getChildControl(G));bx.addButton(this.getChildControl(w));this._addAt(bx,1);var bv=new qx.data.controller.Form(null,by);this._store.bind(V,bv,V);this.setModified(false);},_onFormFieldChange:function(){var bC=false;var bB=this.getChildControl(M).getItems();Object.getOwnPropertyNames(bB).some(function(name){if(this.__tD[name]!=bB[name].getValue()){this.debug(name+bh+this.__tD[name]+s+bB[name].getValue());bC=true;return true;};},this);this.setModified(bC);},_createChildControlImpl:function(bF,bE){var bD;switch(bF){case F:bD=new qx.ui.basic.Label(this.tr(N));bD.set({font:U,marginBottom:5,allowGrowX:true,decorator:t});this._addAt(bD,0);break;case M:bD=new qx.ui.form.Form();break;case G:bD=new qx.ui.form.Button(qx.locale.Manager.tr(O));bD.addListener(p,this.close,this);break;case w:bD=new qx.ui.form.Button(qx.locale.Manager.tr(W));bD.addListener(p,this._saveConfig,this);this.bind(bg,bD,B);break;};return bD||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bF,bE);},close:function(){this.setVisibility(bj);}},destruct:function(){this._disposeObjects(S,h,A,I,K);}});})();(function(){var a="changeModel",b="function",c="qx.io.rest.Resource",d="Success",f="String",g="qx.data.store.Rest";qx.Class.define(g,{extend:qx.core.Object,construct:function(i,h,j){qx.core.Object.call(this);try{this.setResource(i);this.setActionName(h);}catch(e){this.dispose();throw e;};this._delegate=j;this._marshaler=new qx.data.marshal.Json(j);if(j&&qx.lang.Type.isFunction(j.configureRequest)){this.__rM();};this.__tE=qx.lang.Function.bind(this.__tG,this);this.__tF();},properties:{resource:{check:c},actionName:{check:f},model:{nullable:true,event:a}},members:{_marshaler:null,_delegate:null,__tE:null,__rM:function(){var k=this.getResource(),l=this._delegate;k.configureRequest(l.configureRequest);},__tF:function(){var n=this.getResource(),m=this.getActionName();if(n&&m){n.addListener(this.getActionName()+d,this.__tE);};},__tG:function(e){var r=e.getData(),q=this._marshaler,s,o=this.getModel(),p=this._delegate;if(r){if(p&&p.manipulateData){r=p.manipulateData(r);};q.toClass(r,true);s=q.toModel(r);if(s){this.setModel(s);};};if(o&&o.dispose){o.dispose();};}},destruct:function(){var t=this.getModel();if(t&&typeof t.dispose===b){t.dispose();};this._marshaler&&this._marshaler.dispose();}});})();(function(){var a="changeModel",b="modelSelection[0]",c="qx.core.Object",d="_applyTarget",e="qx.data.controller.Form",f="changeTarget",g="value",h=".",j="No target is set.",k="qx.ui.form.Form",l="_applyModel";qx.Class.define(e,{extend:qx.core.Object,implement:[qx.core.IDisposable],construct:function(m,o,n){qx.core.Object.call(this);this._selfUpdate=!!n;this.__tH={};if(m!=null){this.setModel(m);};if(o!=null){this.setTarget(o);};},properties:{model:{check:c,apply:l,event:a,nullable:true,dereference:true},target:{check:k,apply:d,event:f,nullable:true,init:null,dereference:true}},members:{__tI:null,__tH:null,addBindingOptions:function(name,r,s){this.__tH[name]=[r,s];if(this.getModel()==null||this.getTarget()==null){return;};var p=this.getTarget().getItems()[name];var q=this.__tL(p)?b:g;this.__tI.removeTarget(p,q,name);this.__tI.addTarget(p,q,name,!this._selfUpdate,r,s);},createModel:function(y){var t=this.getTarget();if(t==null){throw new Error(j);};var u=t.getItems();var v={};for(var name in u){var B=name.split(h);var A=v;for(var i=0;i<B.length;i++ ){if(i+1==B.length){var w=u[name].constructor;var x=null;if(qx.Class.hasInterface(w,qx.ui.core.ISingleSelection)){x=u[name].getModelSelection().getItem(0)||null;}else {x=u[name].getValue();};if(this.__tH[name]&&this.__tH[name][1]){x=this.__tH[name][1].converter(x);};A[B[i]]=x;}else {if(!A[B[i]]){A[B[i]]={};};A=A[B[i]];};};};var z=qx.data.marshal.Json.createModel(v,y);this.setModel(z);return z;},updateModel:function(){if(!this._selfUpdate||!this.getModel()||!this.getTarget()){return;};var C=this.getTarget().getItems();for(var name in C){var F=C[name];var E=this.__tL(F)?b:g;var D=this.__tH[name];D=D&&this.__tH[name][1];qx.data.SingleValueBinding.updateTarget(F,E,this.getModel(),name,D);};},_applyTarget:function(H,G){if(G!=null){this.__tK(G);};if(this.getModel()==null){return;};if(H!=null){this.__tJ();};},_applyModel:function(K,I){if(this.__tI!=null&&K==null){this.__tI.setModel(null);};if(this.__tI!=null&&this.getTarget()!=null){var J=this.getTarget().getItems();for(var name in J){var L=J[name];var M=this.__tL(L)?b:g;this.__tI.removeTarget(L,M,name);};};if(this.__tI!=null){this.__tI.setModel(K);};if(this.getTarget()==null){return;}else {this.getTarget().getValidationManager().reset();};if(K!=null){this.__tJ();};},__tJ:function(){if(this.__tI==null){this.__tI=new qx.data.controller.Object(this.getModel());};var Q=this.getTarget().getItems();for(var name in Q){var N=Q[name];var O=this.__tL(N)?b:g;var P=this.__tH[name];try{if(P==null){this.__tI.addTarget(N,O,name,!this._selfUpdate);}else {this.__tI.addTarget(N,O,name,!this._selfUpdate,P[0],P[1]);};}catch(R){{};};};this.getTarget().redefineResetter();},__tK:function(S){if(this.__tI==null){return;};var V=S.getItems();for(var name in V){var U=V[name];var T=this.__tL(U)?b:g;this.__tI.removeTarget(U,T,name);};},__tL:function(W){return qx.Class.hasInterface(W.constructor,qx.ui.core.ISingleSelection)&&qx.Class.hasInterface(W.constructor,qx.ui.form.IModelSelection);}},destruct:function(){if(this.__tI){this.__tI.dispose();};}});})();(function(){var a="form-renderer-label",b="bold",c="left",d="content",e="50%",f="qx.dynlocale",g="button-container",h="cv.plugins.openhab.renderer.Single",j="bottom-text",k="_applyBottomText",l="String",m="right";qx.Class.define(h,{extend:qx.ui.form.renderer.AbstractRenderer,construct:function(o){var n=new qx.ui.layout.VBox(6);this._setLayout(n);qx.ui.form.renderer.AbstractRenderer.call(this,o);},properties:{bottomText:{check:l,nullable:true,apply:k}},members:{_applyBottomText:function(q){var p=this.getChildControl(j);if(q){p.setValue(q);p.show();}else {p.exclude();};},_createChildControlImpl:function(t,s){var r;switch(t){case d:r=new qx.ui.container.Composite(new qx.ui.layout.VBox(8));this._addAt(r,1);break;case j:r=new qx.ui.basic.Label(this.getBottomText());r.set({rich:true,wrap:true});this._addAt(r,2);if(this.getBottomText()){r.show();}else {r.exclude();};break;case g:var u=new qx.ui.layout.HBox();u.setAlignX(m);u.setSpacing(5);r=new qx.ui.container.Composite(u);this._addAt(r,3);break;};return r||qx.ui.form.renderer.AbstractRenderer.prototype._createChildControlImpl.call(this,t,s);},addItems:function(y,B,x){if(x!==null){this.getChildControl(d).add(this._createHeader(x));};var w=this.getChildControl(d);for(var i=0;i<y.length;i++ ){var z=this._createLabel(B[i],y[i]);var A=y[i];z.setBuddy(A);if(A instanceof qx.ui.form.CheckBox){var v=new qx.ui.container.Composite(new qx.ui.layout.HBox());v.add(z,{width:e});v.add(A,{width:e});w.add(v);}else {w.add(z);w.add(A);};this._connectVisibility(A,z);if(qx.core.Environment.get(f)){this._names.push({name:B[i],label:z,item:y[i]});};};},addButton:function(C){this.getChildControl(g).add(C);},getLayout:function(){return this._getLayout();},_createLabel:function(name,D){var E=new qx.ui.basic.Label(this._createLabelText(name,D));this._labels.push(E);E.setRich(true);E.setAppearance(a);return E;},_createHeader:function(G){var F=new qx.ui.basic.Label(G);this._labels.push(F);F.setFont(b);if(this._row!=0){F.setMarginTop(10);};F.setAlignX(c);return F;}}});})();(function(){var a="div",b="notifications",c="edit_settings",d="section",f='object',g="#notification-center footer",h='width: 22px; height: 22px;',i="execute",j="invalid content received from SSE: ",k="#qxsettings > div",l="#",m="cv.backend",n="singleton",o="cv.plugins.openhab.Openhab",p="open-settings",q="qxsettings",r="__tN",s="_openSettings",t=" section.messages",u="<div></div>",v="Ctrl+S",w="float: left;",x='preview',y="tap";qx.Class.define(o,{extend:qx.core.Object,type:n,construct:function(){qx.core.Object.call(this);if(!cv.Config.request.queryKey.hasOwnProperty(x)){this.__tM=cv.core.notifications.Router.getInstance();var A=cv.TemplateEngine.getInstance().visu;var z=A.getCurrentTransport&&A.getCurrentTransport();if(z){z.subscribe(b,this._onNotification,this);};cv.TemplateEngine.getInstance().executeWhenDomFinished(this._createSettings,this);};},members:{__tM:null,__tN:null,_openSettings:null,_createSettings:function(){var C=qx.dom.Element.create(d,{"id":q,"html":u});qx.dom.Element.insertAfter(C,document.querySelector(l+cv.ui.NotificationCenter.getInstance().getRootElementId()+t));var B=qx.dom.Element.create(a,{html:cv.util.IconTools.svgKUF(c)(null,h),style:w});this._openSettings=new qx.ui.command.Command(v);this._openSettings.addListener(i,function(){cv.ui.NotificationCenter.getInstance().show();this.__tN.show();},this);cv.TemplateEngine.getInstance().getCommands().add(p,this._openSettings);qx.dom.Element.insertBegin(B,document.querySelector(g));qx.event.Registration.addListener(B,y,function(){this.__tN.show();},this);qx.theme.manager.Meta.getInstance().setTheme(cv.theme.Dark);this._inline=new qx.ui.root.Inline(document.querySelector(k),true,false);this._inline.setLayout(new qx.ui.layout.VBox());this.__tN=new cv.plugins.openhab.Settings();this.__tN.exclude();this._inline.add(this.__tN,{flex:1});},_onNotification:function(e){if(!e.data){this.error(j,e);};var D=typeof e.data===f?e.data:JSON.parse(e.data);this.__tM.dispatchMessage(D.topic||m,D);}},destruct:function(){this._disposeObjects(r,s);this.__tM=null;},defer:function(E){E.getInstance();}});})();
});