var COMPILED=!0,goog=goog||{};goog.global=this;goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c=c[d]?c[d]:c[d]={}:c[d]=b};goog.define=function(a,b){var c=b;COMPILED||goog.global.CLOSURE_DEFINES&&Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES,a)&&(c=goog.global.CLOSURE_DEFINES[a]);goog.exportPath_(a,c)};goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;
goog.provide=function(a){if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a];for(var b=a;(b=b.substring(0,b.lastIndexOf(".")))&&!goog.getObjectByName(b);)goog.implicitNamespaces_[b]=!0}goog.exportPath_(a)};goog.setTestOnly=function(a){if(COMPILED&&!goog.DEBUG)throw a=a||"",Error("Importing test-only code into non-debug environment"+a?": "+a:".");};goog.forwardDeclare=function(a){};
COMPILED||(goog.isProvided_=function(a){return!goog.implicitNamespaces_[a]&&!!goog.getObjectByName(a)},goog.implicitNamespaces_={});goog.getObjectByName=function(a,b){for(var c=a.split("."),d=b||goog.global,e;e=c.shift();)if(goog.isDefAndNotNull(d[e]))d=d[e];else return null;return d};goog.globalize=function(a,b){var c=b||goog.global,d;for(d in a)c[d]=a[d]};
goog.addDependency=function(a,b,c){if(goog.DEPENDENCIES_ENABLED){var d;a=a.replace(/\\/g,"/");for(var e=goog.dependencies_,f=0;d=b[f];f++)e.nameToPath[d]=a,a in e.pathToNames||(e.pathToNames[a]={}),e.pathToNames[a][d]=!0;for(d=0;b=c[d];d++)a in e.requires||(e.requires[a]={}),e.requires[a][b]=!0}};goog.ENABLE_DEBUG_LOADER=!0;
goog.require=function(a){if(!COMPILED&&!goog.isProvided_(a)){if(goog.ENABLE_DEBUG_LOADER){var b=goog.getPathFromDeps_(a);if(b){goog.included_[b]=!0;goog.writeScripts_();return}}a="goog.require could not find: "+a;goog.global.console&&goog.global.console.error(a);throw Error(a);}};goog.basePath="";goog.nullFunction=function(){};goog.identityFunction=function(a,b){return a};goog.abstractMethod=function(){throw Error("unimplemented abstract method");};
goog.addSingletonGetter=function(a){a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED&&(goog.included_={},goog.dependencies_={pathToNames:{},nameToPath:{},requires:{},visited:{},written:{}},goog.inHtmlDocument_=function(){var a=goog.global.document;return"undefined"!=typeof a&&"write"in a},goog.findBasePath_=function(){if(goog.global.CLOSURE_BASE_PATH)goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_())for(var a=goog.global.document.getElementsByTagName("script"),b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?"),d=-1==d?c.length:
d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}},goog.importScript_=function(a){var b=goog.global.CLOSURE_IMPORT_SCRIPT||goog.writeScriptTag_;!goog.dependencies_.written[a]&&b(a)&&(goog.dependencies_.written[a]=!0)},goog.writeScriptTag_=function(a){if(goog.inHtmlDocument_()){var b=goog.global.document;if("complete"==b.readyState){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}b.write('<script type="text/javascript" src="'+a+'">\x3c/script>');
return!0}return!1},goog.writeScripts_=function(){function a(f){if(!(f in d.written)){if(!(f in d.visited)&&(d.visited[f]=!0,f in d.requires))for(var e in d.requires[f])if(!goog.isProvided_(e))if(e in d.nameToPath)a(d.nameToPath[e]);else throw Error("Undefined nameToPath for "+e);f in c||(c[f]=!0,b.push(f))}}var b=[],c={},d=goog.dependencies_,e;for(e in goog.included_)d.written[e]||a(e);for(e=0;e<b.length;e++)if(b[e])goog.importScript_(goog.basePath+b[e]);else throw Error("Undefined script input");
},goog.getPathFromDeps_=function(a){return a in goog.dependencies_.nameToPath?goog.dependencies_.nameToPath[a]:null},goog.findBasePath_(),goog.global.CLOSURE_NO_DEPS||goog.importScript_(goog.basePath+"deps.js"));
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isDef=function(a){return void 0!==a};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isString=function(a){return"string"==typeof a};
goog.isBoolean=function(a){return"boolean"==typeof a};goog.isNumber=function(a){return"number"==typeof a};goog.isFunction=function(a){return"function"==goog.typeOf(a)};goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};goog.removeUid=function(a){"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};
goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(a.clone)return a.clone();var b="array"==b?[]:{},c;for(c in a)b[c]=goog.cloneObject(a[c]);return b}return a};goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};
goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};
goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval)if(null==goog.evalWorksForGlobals_&&(goog.global.eval("var _et_ = 1;"),"undefined"!=typeof goog.global._et_?(delete goog.global._et_,goog.evalWorksForGlobals_=!0):goog.evalWorksForGlobals_=!1),goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("script");c.type="text/javascript";c.defer=!1;c.appendChild(b.createTextNode(a));b.body.appendChild(c);
b.body.removeChild(c)}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;goog.getCssName=function(a,b){var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")},d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};return b?a+"-"+d(b):d(a)};goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};
!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b){var c=b||{},d;for(d in c){var e=(""+c[d]).replace(/\$/g,"$$$$");a=a.replace(RegExp("\\{\\$"+d+"\\}","gi"),e)}return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};goog.exportProperty=function(a,b,c){a[b]=c};
goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){var g=Array.prototype.slice.call(arguments,2);return b.prototype[c].apply(a,g)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() expects not to be running in strict mode. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(d.superClass_)return d.superClass_.constructor.apply(a,Array.prototype.slice.call(arguments,1));for(var e=Array.prototype.slice.call(arguments,2),f=!1,g=a.constructor;g;g=g.superClass_&&g.superClass_.constructor)if(g.prototype[b]===d)f=!0;else if(f)return g.prototype[b].apply(a,
e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){a.call(goog.global)};var webcast={player:{}};webcast.player.Playable=function(){};webcast.player.Playable.prototype.load=function(){};webcast.player.Playable.prototype.play=function(){};webcast.player.Playable.prototype.pause=function(){};webcast.player.Playable.prototype.stop=function(){};webcast.player.Playable.prototype.paused=function(){};webcast.player.Playable.prototype.hasFullScreen=function(){};webcast.player.Playable.prototype.canPlayType=function(a){};webcast.player.Playable.prototype.getCurrentTime=function(){};
webcast.player.Playable.prototype.setCurrentTime=function(a){};webcast.player.Playable.prototype.getDuration=function(){};webcast.player.Playable.prototype.getVolume=function(){};webcast.player.Playable.prototype.setVolume=function(a){};webcast.player.Playable.prototype.getMuted=function(){};webcast.player.Playable.prototype.setMuted=function(a){};webcast.player.Playable.prototype.getPlaybackRate=function(){};webcast.player.Playable.prototype.setPlaybackRate=function(a){};
webcast.player.Playable.prototype.requestFullScreen=function(a){};webcast.player.Playable.prototype.isFullScreen=function(){};webcast.player.ChromecastPlayer=function(a,b){this.url=a;this.listener=b;this.deviceState=webcast.player.ChromecastPlayer.DEVICE_STATE.IDLE;this.canCast=!1;this.mediaDuration=this.currenTime=0;this.currentVolume=1;this.muted=!1;this.autoplay=!0;this.initializePlayer()};webcast.player.ChromecastPlayer.DEVICE_STATE={IDLE:0,ACTIVE:1,WARNING:2,ERROR:3};
webcast.player.ChromecastPlayer.PLAYER_STATE={IDLE:"IDLE",LOADING:"LOADING",LOADED:"LOADED",PLAYING:"PLAYING",PAUSED:"PAUSED",STOPPED:"STOPPED",SEEKING:"SEEKING",ERROR:"ERROR"};
webcast.player.ChromecastPlayer.prototype.initializePlayer=function(){if(window.chrome.cast&&window.chrome.cast.isAvailable){var a=new window.chrome.cast.SessionRequest("C157D242"),a=new window.chrome.cast.ApiConfig(a,this.sessionListener.bind(this),this.receiverListener.bind(this));window.chrome.cast.initialize(a,this.onInitSuccess.bind(this),this.onInitError.bind(this));this.timer=setInterval(this.timeTick.bind(this),1E3)}else setTimeout(this.initializePlayer.bind(this),1E3)};
webcast.player.ChromecastPlayer.prototype.timeTick=function(){this.castPlayerState==webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING&&this.currentTime++};webcast.player.ChromecastPlayer.prototype.onInitSuccess=function(){console.log("init success")};webcast.player.ChromecastPlayer.prototype.onInitError=function(){console.log("init error")};
webcast.player.ChromecastPlayer.prototype.sessionListener=function(a){if(this.session=a)this.deviceState=webcast.player.ChromecastPlayer.DEVICE_STATE.ACTIVE,this.session.media[0]&&this.session.media[0].media.contentId==this.url?(this.onMediaDiscovered("activeSession",this.session.media[0]),this.listener.onAttachedToCasting()):this.loadMedia()};webcast.player.ChromecastPlayer.prototype.receiverListener=function(a){"available"===a?(this.canCast=!0,console.log("receiver found")):(this.canCast=!1,console.log("receiver list empty"))};
webcast.player.ChromecastPlayer.prototype.launchApp=function(){this.currentMediaSession&&this.currentMediaSession.playerState==chrome.cast.media.PlayerState.PLAYING&&(this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING);console.log("launching app...");window.chrome.cast.requestSession(this.onRequestSessionSuccess.bind(this),this.onLaunchError.bind(this))};
webcast.player.ChromecastPlayer.prototype.onRequestSessionSuccess=function(a){console.log("session success: "+a.sessionId);this.session=a;this.deviceState=webcast.player.ChromecastPlayer.DEVICE_STATE.ACTIVE;this.loadMedia()};webcast.player.ChromecastPlayer.prototype.onLaunchError=function(){console.log("launch error");this.listener.onLaunchError();this.deviceState=webcast.player.ChromecastPlayer.DEVICE_STATE.ERROR};
webcast.player.ChromecastPlayer.prototype.stopApp=function(){this.session.stop(this.onStopAppSuccess.bind(this,"Session stopped"),this.onStopError.bind(this))};webcast.player.ChromecastPlayer.prototype.duration=function(){return this.mediaDuration};webcast.player.ChromecastPlayer.prototype.onStopError=function(){console.log("error stopping app")};
webcast.player.ChromecastPlayer.prototype.onStopAppSuccess=function(a){console.log(a);this.deviceState=webcast.player.ChromecastPlayer.DEVICE_STATE.IDLE;this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.IDLE;this.currentMediaSession=null};
webcast.player.ChromecastPlayer.prototype.loadMedia=function(){if(this.session){console.log("loading..."+this.url);var a=new window.chrome.cast.media.MediaInfo(this.url);a.contentType="video/mp4";a=new window.chrome.cast.media.LoadRequest(a);a.autoplay=this.autoplay;a.currentTime=this.currenTime;a.customData={payload:{"title:":"Custom video"}};this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.LOADING;this.session.loadMedia(a,this.onMediaDiscovered.bind(this,"loadMedia"),this.onLoadMediaError.bind(this))}else console.log("no session")};
webcast.player.ChromecastPlayer.prototype.onError=function(a){console.log("error:"+a)};webcast.player.ChromecastPlayer.prototype.onOK=function(){console.log("OK")};
webcast.player.ChromecastPlayer.prototype.onMediaDiscovered=function(a,b){console.log("new media session ID:"+b.mediaSessionId+" ("+a+")");this.currentMediaSession=b;"loadMedia"==a&&(this.castPlayerState=this.autoplay?webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING:webcast.player.ChromecastPlayer.PLAYER_STATE.LOADED);"activeSession"==a&&(this.castPlayerState=this.session.media[0].playerState,this.currentTime=this.session.media[0].currentTime);this.currentMediaSession.addUpdateListener(this.onMediaStatusUpdate.bind(this));
this.mediaDuration=this.currentMediaSession.media.duration};webcast.player.ChromecastPlayer.prototype.onLoadMediaError=function(a){console.log("media error");this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.IDLE};webcast.player.ChromecastPlayer.prototype.onMediaStatusUpdate=function(a){!1==a?(this.currentTime=0,this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.IDLE):this.currentTime=this.currentMediaSession.currentTime};
webcast.player.ChromecastPlayer.prototype.load=function(){};webcast.player.ChromecastPlayer.prototype.paused=function(){return this.castPlayerState==webcast.player.ChromecastPlayer.PLAYER_STATE.PAUSED};webcast.player.ChromecastPlayer.prototype.hasFullScreen=function(){return!1};
webcast.player.ChromecastPlayer.prototype.play=function(){if(this.currentMediaSession)switch(this.castPlayerState){case webcast.player.ChromecastPlayer.PLAYER_STATE.LOADED:case webcast.player.ChromecastPlayer.PLAYER_STATE.PAUSED:this.currentMediaSession.play(null,this.mediaCommandSuccessCallback.bind(this,"playing started for "+this.currentMediaSession.sessionId),this.onError.bind(this));this.currentMediaSession.addUpdateListener(this.onMediaStatusUpdate.bind(this));this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING;
break;case webcast.player.ChromecastPlayer.PLAYER_STATE.IDLE:case webcast.player.ChromecastPlayer.PLAYER_STATE.LOADING:case webcast.player.ChromecastPlayer.PLAYER_STATE.STOPPED:this.loadMedia(),this.currentMediaSession.addUpdateListener(this.onMediaStatusUpdate.bind(this)),this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING}};
webcast.player.ChromecastPlayer.prototype.pause=function(){this.currentMediaSession&&this.castPlayerState==webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING&&(this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.PAUSED,this.currentMediaSession.pause(null,this.mediaCommandSuccessCallback.bind(this,"paused "+this.currentMediaSession.sessionId),this.onError.bind(this)))};
webcast.player.ChromecastPlayer.prototype.stop=function(){this.currentMediaSession&&(this.currentMediaSession.stop(null,this.mediaCommandSuccessCallback.bind(this,"stopped "+this.currentMediaSession.sessionId),this.onError.bind(this)),this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.STOPPED)};webcast.player.ChromecastPlayer.prototype.canPlayType=function(a){return"maybe"};webcast.player.ChromecastPlayer.prototype.getCurrentTime=function(){return this.currentTime};
webcast.player.ChromecastPlayer.prototype.getDuration=function(){return this.mediaDuration};
webcast.player.ChromecastPlayer.prototype.setCurrentTime=function(a){!this.currentMediaSession||this.castPlayerState!=webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING&&this.castPlayerState!=webcast.player.ChromecastPlayer.PLAYER_STATE.PAUSED||(this.currentTime=a,console.log("Seeking "+this.currentMediaSession.sessionId+":"+this.currentMediaSession.mediaSessionId+" to "+a+" s"),a=new window.chrome.cast.media.SeekRequest,a.currentTime=this.currentTime,this.currentMediaSession.seek(a,this.onSeekSuccess.bind(this,
"media seek done"),this.onError.bind(this)),this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.SEEKING)};webcast.player.ChromecastPlayer.prototype.onSeekSuccess=function(a){console.log(a);this.castPlayerState=webcast.player.ChromecastPlayer.PLAYER_STATE.PLAYING};webcast.player.ChromecastPlayer.prototype.mediaCommandSuccessCallback=function(a,b){console.log(a)};webcast.player.ChromecastPlayer.prototype.getVolume=function(){return this.currentVolume};
webcast.player.ChromecastPlayer.prototype.setVolume=function(a){this.currentMediaSession&&(this.currentVolume=a,console.log("setting volume="+a),this.session.setReceiverVolumeLevel(a,this.mediaCommandSuccessCallback.bind(this),this.onError.bind(this)))};webcast.player.ChromecastPlayer.prototype.getMuted=function(){return this.muted};
webcast.player.ChromecastPlayer.prototype.setMuted=function(a){this.currentMediaSession&&(this.muted=a,this.session.setReceiverMuted(this.muted,this.mediaCommandSuccessCallback.bind(this),this.onError.bind(this)))};webcast.player.ChromecastPlayer.prototype.getPlaybackRate=function(){return 1};webcast.player.ChromecastPlayer.prototype.setPlaybackRate=function(a){};webcast.player.ChromecastPlayer.prototype.requestFullScreen=function(a){};webcast.player.ChromecastPlayer.prototype.isFullScreen=function(){return!1};webcast.player.LocalPlayer=function(a,b){this.url=a;this.isFullscreen=!1;document.addEventListener("fullscreenchange",this.changeHandler.bind(this),!1);document.addEventListener("webkitfullscreenchange",this.changeHandler.bind(this),!1);this.videoEl=b;this.videoEl.src=a;this.load()};webcast.player.LocalPlayer.prototype.hasFullScreen=function(){return!0};webcast.player.LocalPlayer.prototype.load=function(){this.videoEl.load()};webcast.player.LocalPlayer.prototype.play=function(){this.videoEl.play()};
webcast.player.LocalPlayer.prototype.pause=function(){this.videoEl.pause()};webcast.player.LocalPlayer.prototype.paused=function(){return this.videoEl.paused};webcast.player.LocalPlayer.prototype.stop=function(){this.videoEl.pause()};webcast.player.LocalPlayer.prototype.canPlayType=function(a){return this.videoEl.canPlayType(a)};webcast.player.LocalPlayer.prototype.getCurrentTime=function(){return this.videoEl.currentTime};
webcast.player.LocalPlayer.prototype.setCurrentTime=function(a){this.videoEl&&this.videoEl.currentTime&&(this.videoEl.currentTime=a)};webcast.player.LocalPlayer.prototype.getDuration=function(){return this.videoEl.duration};webcast.player.LocalPlayer.prototype.getVolume=function(){return this.videoEl.volume};webcast.player.LocalPlayer.prototype.setVolume=function(a){this.videoEl.volume=a};webcast.player.LocalPlayer.prototype.getMuted=function(){return this.videoEl.muted};
webcast.player.LocalPlayer.prototype.setMuted=function(a){this.videoEl.muted=a};webcast.player.LocalPlayer.prototype.getPlaybackRate=function(){return this.videoEl.playbackRate};webcast.player.LocalPlayer.prototype.setPlaybackRate=function(a){this.videoEl.playbackRate=a};webcast.player.LocalPlayer.prototype.requestFullScreen=function(a){(a=a?this.videoEl.requestFullScreen||this.videoEl.webkitRequestFullScreen:document.cancelFullScreen||document.webkitCancelFullScreen)&&a.call(this.videoEl)};
webcast.player.LocalPlayer.prototype.isFullScreen=function(){return this.isFullscreen};webcast.player.LocalPlayer.prototype.changeHandler=function(){this.isFullscreen=this.isFullscreen?!1:!0};webcast.webcastUtils=function(){};webcast.webcastUtils.utf8_to_b64=function(a){return encodeURIComponent(window.btoa(unescape(encodeURIComponent(a))))};webcast.webcastUtils.b64_to_utf8=function(a){return decodeURIComponent(escape(window.atob(decodeURIComponent(a))))};webcast.webcastControls=angular.module("webcast.webcastControls",[]);
webcast.webcastControls.directive("wcControls",function(){return{restrict:"AE",scope:{localPlayer:"=player",castController:"=controller"},templateUrl:"parts/controls.html",link:function(a,b,c){this.timerStep=1E3;var d=document.getElementById("progress"),e=function(a){isNaN(a)&&(a=0);var b=parseInt(a/3600);a-=3600*b;var c=parseInt(a/60);a=parseInt(a%60);0<b?(10>b&&(b="0"+b),10>c&&(c="0"+c),10>a&&(a="0"+a),a=b+":"+c+":"+a):(10>c&&(c="0"+c),10>a&&(a="0"+a),a=c+":"+a);return a};a.volume=a.localPlayer.getVolume();
this.timer=setInterval(function(){if(!d.max||isNaN(d.max)||"0"==d.max)d.max=parseInt(a.localPlayer.getDuration(),10);var b=a.localPlayer.getCurrentTime();isNaN(b)&&(b=0);a.$apply(function(){a.progress=b;a.duration=e(b)+" / "+e(a.localPlayer.getDuration())})}.bind(this),this.timerStep);a.duration=e(a.localPlayer.getDuration());a.$watch("progress",function(b,c){a.localPlayer.getCurrentTime()!=b&&a.localPlayer.setCurrentTime(b)});a.$watch("volume",function(b,c){parseFloat(a.localPlayer.getVolume())!=
parseFloat(b)&&a.localPlayer.setVolume(parseFloat(b))});d.max=parseInt(a.localPlayer.getDuration(),10);a.play=function(){a.localPlayer.play()};a.pause=function(){a.localPlayer.pause()};a.showPlay=function(){return a.localPlayer.paused()};a.showPause=function(){return!a.localPlayer.paused()};a.expandFullscreen=function(){a.localPlayer.requestFullScreen(!0)};a.collapseFullscreen=function(){a.localPlayer.requestFullScreen(!1)};a.showFulscreenExpand=function(){return a.localPlayer.hasFullScreen()&&!a.localPlayer.isFullScreen()};
a.showFulscreenCollapse=function(){return a.localPlayer.hasFullScreen()&&a.localPlayer.isFullScreen()};a.stopCast=function(){a.castController.cast(!1)};a.startCast=function(){a.castController.cast(!0)};a.showStopCast=function(){return a.castController.isCasting()};a.showStartCast=function(){return!a.castController.isCasting()};a.showAudioOn=function(){return a.localPlayer.getMuted()};a.showAudioOff=function(){return!a.localPlayer.getMuted()};a.audioOn=function(){return a.localPlayer.setMuted(!1)};
a.audioOff=function(){return!a.localPlayer.setMuted(!0)}}}});webcast.webcastControllers=angular.module("webcast.webcastControllers",[webcast.webcastControls.name]);
webcast.webcastControllers.controller("WatchCtrl",["$scope","$routeParams","$location",function(a,b,c){window.chrome||c.path("chromeonly");this.url=webcast.webcastUtils.b64_to_utf8(b.url);var d=new webcast.player.LocalPlayer(this.url,document.getElementById("video_element")),e=new webcast.player.ChromecastPlayer(this.url,this);this.activePlayer=d;this.controller=this;this.onLaunchError=function(){a.$apply(function(){this.activePlayer=d}.bind(this))};this.onAttachedToCasting=function(){a.$apply(function(){this.activePlayer=
e}.bind(this))};this.cast=function(a){a?(d.pause(),this.activePlayer=e,e.launchApp()):(this.activePlayer=d,e.stopApp())};this.isCasting=function(){return this.activePlayer==e}}]);webcast.webcastControllers.controller("HomeCtrl",["$scope","$location",function(a,b){this.url="";this.watch=function(){var a=webcast.webcastUtils.utf8_to_b64(this.url);b.path("watch/"+a)}}]);webcast.webcastApp=angular.module("webcastApp",["ngRoute","webcast.webcastControllers"]);webcast.webcastApp.config(["$routeProvider",function(a){a.when("/about",{templateUrl:"parts/about.html"}).when("/chromeonly",{templateUrl:"parts/chrome.html"}).when("/watch/:url",{templateUrl:"parts/watch.html",controller:"WatchCtrl",controllerAs:"watch"}).when("/",{templateUrl:"parts/home.html",controller:"HomeCtrl",controllerAs:"home"}).otherwise({redirectTo:"/"})}]);
