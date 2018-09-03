var h,k=this,aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},m=function(a){return"array"==aa(a)},ba=function(a){var b=aa(a);return"array"==b||"object"==b&&"number"==typeof a.length},n=function(a){return"string"==typeof a},ca=function(a){return"function"==aa(a)},da=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ea=function(a,b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,
2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},p=function(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return p.apply(null,arguments)},ga=Date.now||function(){return+new Date},q=function(a,b){function c(){}c.prototype=b.prototype;a.Ga=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ha=function(a,c,f){for(var g=
Array(arguments.length-2),l=2;l<arguments.length;l++)g[l-2]=arguments[l];return b.prototype[c].apply(a,g)}};Function.prototype.bind=Function.prototype.bind||function(a,b){if(1<arguments.length){var c=Array.prototype.slice.call(arguments,1);c.unshift(this,a);return p.apply(null,c)}return p(this,a)};var r=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,r);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};q(r,Error);r.prototype.name="CustomError";var ha;var u=function(a,b){return 0==t(b,a.substr(0,b.length))},w=function(a,b){return 0==t(b,a.substr(a.length-b.length,b.length))},ia=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},ja=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},t=function(a,b){var c=String(a).toLowerCase(),d=String(b).toLowerCase();return c<d?-1:c==d?0:1},ra=function(a){if(!ka.test(a))return a;
-1!=a.indexOf("&")&&(a=a.replace(la,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(ma,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(na,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(oa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(pa,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(qa,"&#0;"));return a},la=/&/g,ma=/</g,na=/>/g,oa=/"/g,pa=/'/g,qa=/\x00/g,ka=/[\x00&<>"']/,x=function(a){a=String(a);var b=a.indexOf(".");-1==b&&(b=a.length);b=Math.max(0,2-b);return Array(b+1).join("0")+a},ta=function(a,b){for(var c=0,d=
ja(String(a)).split("."),e=ja(String(b)).split("."),f=Math.max(d.length,e.length),g=0;0==c&&g<f;g++){var l=d[g]||"",v=e[g]||"",L=RegExp("(\\d*)(\\D*)","g"),V=RegExp("(\\d*)(\\D*)","g");do{var W=L.exec(l)||["","",""],X=V.exec(v)||["","",""];if(0==W[0].length&&0==X[0].length)break;c=sa(0==W[1].length?0:parseInt(W[1],10),0==X[1].length?0:parseInt(X[1],10))||sa(0==W[2].length,0==X[2].length)||sa(W[2],X[2])}while(0==c)}return c},sa=function(a,b){return a<b?-1:a>b?1:0};var ua=function(a,b){b.unshift(a);r.call(this,ia.apply(null,b));b.shift()};q(ua,r);ua.prototype.name="AssertionError";var y=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=Array.prototype.slice.call(arguments,2);throw new ua(""+d,e||[]);}},va=function(a,b){throw new ua("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var z=Array.prototype,wa=z.indexOf?function(a,b,c){y(null!=a.length);return z.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(n(a))return n(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},xa=z.forEach?function(a,b,c){y(null!=a.length);z.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=n(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},ya=function(a){return z.concat.apply(z,arguments)},za=function(a){var b=
a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var Aa=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},Ba=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ca=function(a){for(var b in a)return!1;return!0},Da="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Ea=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Da.length;f++)c=Da[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}},Fa=function(a){var b=arguments.length;
if(1==b&&m(arguments[0]))return Fa.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};Fa("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));var A=function(){this.a="";this.c=Ga;this.b=null};A.prototype.toString=function(){return"SafeHtml{"+this.a+"}"};var Ga={},Ha=function(a){var b=new A;b.a=a;b.b=0};Ha("<!DOCTYPE html>");Ha("");var Ia="StopIteration"in k?k.StopIteration:{message:"StopIteration",stack:""},Ja=function(){};Ja.prototype.a=function(){throw Ia;};Ja.prototype.g=function(){return this};var B=function(a,b){this.b={};this.a=[];this.f=this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)Ka(this,arguments[d],arguments[d+1])}else if(a){if(a instanceof B)c=a.u(),d=a.v();else{var c=Ba(a),e=[],f=0;for(d in a)e[f++]=a[d];d=e}for(e=0;e<c.length;e++)Ka(this,c[e],d[e])}};B.prototype.v=function(){La(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};B.prototype.u=function(){La(this);return this.a.concat()};
B.prototype.remove=function(a){return C(this.b,a)?(delete this.b[a],this.c--,this.f++,this.a.length>2*this.c&&La(this),!0):!1};var La=function(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];C(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){for(var e={},c=b=0;b<a.a.length;)d=a.a[b],C(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}},Ma=function(a,b){return C(a.b,b)?a.b[b]:void 0},Ka=function(a,b,c){C(a.b,b)||(a.c++,a.a.push(b),a.f++);a.b[b]=c};
B.prototype.forEach=function(a,b){for(var c=this.u(),d=0;d<c.length;d++){var e=c[d];a.call(b,Ma(this,e),e,this)}};B.prototype.clone=function(){return new B(this)};B.prototype.g=function(a){La(this);var b=0,c=this.f,d=this,e=new Ja;e.a=function(){if(c!=d.f)throw Error("The map has changed since the iterator was created");if(b>=d.a.length)throw Ia;var e=d.a[b++];return a?e:d.b[e]};return e};var C=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var D;a:{var Na=k.navigator;if(Na){var Oa=Na.userAgent;if(Oa){D=Oa;break a}}D=""};var E=function(){return-1!=D.indexOf("Edge")};var Pa=-1!=D.indexOf("Opera")||-1!=D.indexOf("OPR"),F=-1!=D.indexOf("Edge")||-1!=D.indexOf("Trident")||-1!=D.indexOf("MSIE"),G=-1!=D.indexOf("Gecko")&&!(-1!=D.toLowerCase().indexOf("webkit")&&!E())&&!(-1!=D.indexOf("Trident")||-1!=D.indexOf("MSIE"))&&!E(),Qa=-1!=D.toLowerCase().indexOf("webkit")&&!E(),Ra=function(){var a=D;if(G)return/rv\:([^\);]+)(\)|;)/.exec(a);if(F&&E())return/Edge\/([\d\.]+)/.exec(a);if(F)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Qa)return/WebKit\/(\S+)/.exec(a)},Sa=
function(){var a=k.document;return a?a.documentMode:void 0},Ta=function(){if(Pa&&k.opera){var a=k.opera.version;return ca(a)?a():a}var a="",b=Ra();b&&(a=b?b[1]:"");return F&&!E()&&(b=Sa(),b>parseFloat(a))?String(b):a}(),Ua={},H=function(a){return Ua[a]||(Ua[a]=0<=ta(Ta,a))},Va=k.document,Wa=Sa(),Xa=!Va||!F||!Wa&&E()?void 0:Wa||("CSS1Compat"==Va.compatMode?parseInt(Ta,10):5);var Za=function(a,b,c,d,e){"number"==typeof e||Ya++;this.f=d||ga();this.g=a;this.c=b;this.b=c;delete this.a};Za.prototype.a=null;var Ya=0;var $a=function(a){this.g=a;this.a=this.c=this.f=this.b=null},I=function(a,b){this.name=a;this.value=b};I.prototype.toString=function(){return this.name};var ab=new I("SHOUT",1200),bb=new I("SEVERE",1E3),cb=new I("WARNING",900),db=new I("INFO",800),eb=new I("CONFIG",700),fb=function(a){if(a.f)return a.f;if(a.b)return fb(a.b);va("Root logger has no level set.");return null};
$a.prototype.log=function(a,b,c){if(a.value>=fb(this).value)for(ca(b)&&(b=b()),a=new Za(a,String(b),this.g),c&&(a.a=c),c="log:"+a.c,k.console&&(k.console.timeStamp?k.console.timeStamp(c):k.console.markTimeline&&k.console.markTimeline(c)),k.msWriteProfilerMark&&k.msWriteProfilerMark(c),c=this;c;){b=c;var d=a;if(b.a)for(var e=0,f=void 0;f=b.a[e];e++)f(d);c=c.b}};
var J=function(a,b){a.log(cb,b,void 0)},K=function(a,b){a.log(db,b,void 0)},gb={},M=null,hb=function(){M||(M=new $a(""),gb[""]=M,M.f=eb)},ib=function(a){hb();var b;if(!(b=gb[a])){b=new $a(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=ib(a.substr(0,c));c.c||(c.c={});c.c[d]=b;b.b=c;gb[a]=b}return b};var jb=new function(){this.a=ga()};var kb=function(a){this.f=a||"";this.g=jb};kb.prototype.a=!0;kb.prototype.b=!0;kb.prototype.c=!1;var N=function(a){return 10>a?"0"+a:String(a)},lb=function(a){kb.call(this,a)};q(lb,kb);var mb=function(){this.h=p(this.f,this);this.a=new lb;this.a.b=!1;this.a.c=!1;this.b=this.a.a=!1;this.c="";this.g={}};
mb.prototype.f=function(a){if(!this.g[a.b]){var b;b=this.a;var c=[];c.push(b.f," ");if(b.b){var d=new Date(a.f);c.push("[",N(d.getFullYear()-2E3)+N(d.getMonth()+1)+N(d.getDate())+" "+N(d.getHours())+":"+N(d.getMinutes())+":"+N(d.getSeconds())+"."+N(Math.floor(d.getMilliseconds()/10)),"] ")}var d=(a.f-b.g.a)/1E3,e=d.toFixed(3),f=0;if(1>d)f=2;else for(;100>d;)f++,d*=10;for(;0<f--;)e=" "+e;c.push("[",e,"s] ");c.push("[",a.b,"] ");c.push(a.c);b.c&&(d=a.a)&&c.push("\n",d instanceof Error?d.message:d.toString());
b.a&&c.push("\n");b=c.join("");if(c=nb)switch(a.g){case ab:ob(c,"info",b);break;case bb:ob(c,"error",b);break;case cb:ob(c,"warn",b);break;default:ob(c,"debug",b)}else this.c+=b}};var pb=null,nb=k.console,ob=function(a,b,c){if(a[b])a[b](c);else a.log(c)};var qb=function(a){qb[" "](a);return a};qb[" "]=function(){};var rb=!F||F&&(E()||9<=Xa),sb=F&&!H("9");!Qa||H("528");G&&H("1.9b")||F&&H("8")||Pa&&H("9.5")||Qa&&H("528");G&&!H("8")||F&&H("9");var tb=function(){this.a=this.a;this.m=this.m};tb.prototype.a=!1;var O=function(a,b){this.type=a;this.a=this.target=b};O.prototype.b=function(){};var ub=function(a,b){O.call(this,a?a.type:"");this.c=this.state=this.a=this.target=null;if(a){this.type=a.type;this.target=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&G)try{qb(c.nodeName)}catch(d){}this.state=a.state;this.c=a;a.defaultPrevented&&this.b()}};q(ub,O);ub.prototype.b=function(){ub.Ga.b.call(this);var a=this.c;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,sb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var vb="closure_listenable_"+(1E6*Math.random()|0),wb=0;var xb=function(a,b,c,d,e){this.listener=a;this.a=null;this.src=b;this.type=c;this.C=!!d;this.D=e;this.X=++wb;this.s=this.B=!1},yb=function(a){a.s=!0;a.listener=null;a.a=null;a.src=null;a.D=null};var zb=function(a){this.src=a;this.a={};this.b=0};zb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.a[f];a||(a=this.a[f]=[],this.b++);var g=Ab(a,b,d,e);-1<g?(b=a[g],c||(b.B=!1)):(b=new xb(b,this.src,f,!!d,e),b.B=c,a.push(b));return b};zb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.a))return!1;var e=this.a[a];b=Ab(e,b,c,d);return-1<b?(yb(e[b]),y(null!=e.length),z.splice.call(e,b,1),0==e.length&&(delete this.a[a],this.b--),!0):!1};
var Bb=function(a,b){var c=b.type;if(c in a.a){var d=a.a[c],e=wa(d,b),f;if(f=0<=e)y(null!=d.length),z.splice.call(d,e,1);f&&(yb(b),0==a.a[c].length&&(delete a.a[c],a.b--))}},Cb=function(a,b,c,d,e){a=a.a[b.toString()];b=-1;a&&(b=Ab(a,c,d,e));return-1<b?a[b]:null},Ab=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.s&&f.listener==b&&f.C==!!c&&f.D==d)return e}return-1};var Db="closure_lm_"+(1E6*Math.random()|0),Eb={},Fb=0,Gb=function(a,b,c,d,e){if(m(b)){for(var f=0;f<b.length;f++)Gb(a,b[f],c,d,e);return null}c=Hb(c);if(a&&a[vb])a=a.g(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,g=Ib(a);g||(a[Db]=g=new zb(a));c=g.add(b,c,!1,d,e);c.a||(d=Jb(),c.a=d,d.src=a,d.listener=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(Kb(b.toString()),d),Fb++);a=c}return a},Jb=function(){var a=Lb,b=rb?function(c){return a.call(b.src,b.listener,
c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},Mb=function(a,b,c,d,e){if(m(b))for(var f=0;f<b.length;f++)Mb(a,b[f],c,d,e);else c=Hb(c),a&&a[vb]?a.f(b,c,d,e):a&&(a=Ib(a))&&(b=Cb(a,b,c,!!d,e))&&Nb(b)},Nb=function(a){if("number"!=typeof a&&a&&!a.s){var b=a.src;if(b&&b[vb])Bb(b.o,a);else{var c=a.type,d=a.a;b.removeEventListener?b.removeEventListener(c,d,a.C):b.detachEvent&&b.detachEvent(Kb(c),d);Fb--;(c=Ib(b))?(Bb(c,a),0==c.b&&(c.src=null,b[Db]=null)):yb(a)}}},Kb=function(a){return a in
Eb?Eb[a]:Eb[a]="on"+a},Pb=function(a,b,c,d){var e=!0;if(a=Ib(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.C==c&&!f.s&&(f=Ob(f,d),e=e&&!1!==f)}return e},Ob=function(a,b){var c=a.listener,d=a.D||a.src;a.B&&Nb(a);return c.call(d,b)},Lb=function(a,b){if(a.s)return!0;if(!rb){var c;if(!(c=b))a:{c=["window","event"];for(var d=k,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new ub(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==
e.keyCode)try{e.keyCode=-1;break a}catch(g){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.a;f;f=f.parentNode)e.push(f);for(var f=a.type,l=e.length-1;0<=l;l--){c.a=e[l];var v=Pb(e[l],f,!0,c),d=d&&v}for(l=0;l<e.length;l++)c.a=e[l],v=Pb(e[l],f,!1,c),d=d&&v}return d}return Ob(a,new ub(b,this))},Ib=function(a){a=a[Db];return a instanceof zb?a:null},Qb="__closure_events_fn_"+(1E9*Math.random()>>>0),Hb=function(a){y(a,"Listener can not be null.");if(ca(a))return a;y(a.handleEvent,"An object listener must have handleEvent method.");
a[Qb]||(a[Qb]=function(b){return a.handleEvent(b)});return a[Qb]};var Rb=!F||F&&(E()||9<=Xa);!G&&!F||F&&F&&(E()||9<=Xa)||G&&H("1.9.1");F&&H("9");var Tb=function(a,b){Aa(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in Sb?a.setAttribute(Sb[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},Sb={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},Vb=function(a,b,c){function d(c){c&&b.appendChild(n(c)?
a.createTextNode(c):c)}for(var e=2;e<c.length;e++){var f=c[e];!ba(f)||da(f)&&0<f.nodeType?d(f):xa(Ub(f)?za(f):f,d)}},Wb=function(a){y(a,"Node cannot be null or undefined.");return 9==a.nodeType?a:a.ownerDocument||a.document},Ub=function(a){if(a&&"number"==typeof a.length){if(da(a))return"function"==typeof a.item||"string"==typeof a.item;if(ca(a))return"function"==typeof a.item}return!1},Xb=function(a){this.b=a||k.document||document};
Xb.prototype.a=function(a,b,c){var d=this.b,e=arguments,f=e[0],g=e[1];if(!Rb&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',ra(g.name),'"');if(g.type){f.push(' type="',ra(g.type),'"');var l={};Ea(l,g);delete l.type;g=l}f.push(">");f=f.join("")}f=d.createElement(f);g&&(n(g)?f.className=g:m(g)?f.className=g.join(" "):Tb(f,g));2<e.length&&Vb(d,f,e);return f};var Yb=function(a){tb.call(this);this.b=a;this.c={}};q(Yb,tb);var Zb=[];Yb.prototype.g=function(a,b,c,d){m(b)||(b&&(Zb[0]=b.toString()),b=Zb);for(var e=0;e<b.length;e++){var f=Gb(a,b[e],c||this.handleEvent,d||!1,this.b||this);if(!f)break;this.c[f.X]=f}return this};
Yb.prototype.f=function(a,b,c,d,e){if(m(b))for(var f=0;f<b.length;f++)this.f(a,b[f],c,d,e);else c=c||this.handleEvent,e=e||this.b||this,c=Hb(c),d=!!d,b=a&&a[vb]?Cb(a.o,String(b),c,d,e):a?(a=Ib(a))?Cb(a,b,c,d,e):null:null,b&&(Nb(b),delete this.c[b.X]);return this};Yb.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};var P=function(){tb.call(this);this.o=new zb(this);this.l=this};q(P,tb);P.prototype[vb]=!0;P.prototype.removeEventListener=function(a,b,c,d){Mb(this,a,b,c,d)};var bc=function(a,b){$b(a);var c=a.l,d=b,e=d.type||d;if(n(d))d=new O(d,c);else if(d instanceof O)d.target=d.target||c;else{var f=d,d=new O(e,c);Ea(d,f)}c=d.a=c;ac(c,e,!0,d);ac(c,e,!1,d)};P.prototype.g=function(a,b,c,d){$b(this);return this.o.add(String(a),b,!1,c,d)};P.prototype.f=function(a,b,c,d){return this.o.remove(String(a),b,c,d)};
var ac=function(a,b,c,d){if(b=a.o.a[String(b)]){b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.s&&g.C==c){var l=g.listener,v=g.D||g.src;g.B&&Bb(a.o,g);e=!1!==l.call(v,d)&&e}}}},$b=function(a){y(a.o,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var cc=function(a){P.call(this);this.c={};this.b={};this.h=new Yb(this);this.i=a};q(cc,P);var dc=[F&&!H("11")?"readystatechange":"load","abort","error"],ec=function(a){var b=a.c;xa(Ba(b),function(a){var d=b[a];if(d&&(delete b[a],!this.a)){var e;this.i?(e=this.i,e=(e?new Xb(Wb(e)):ha||(ha=new Xb)).a("IMG")):e=new Image;d.W&&(e.crossOrigin=d.W);this.h.g(e,dc,this.j);this.b[a]=e;e.id=a;e.src=d.src}},a)};
cc.prototype.j=function(a){var b=a.a;if(b){if("readystatechange"==a.type)if("complete"==b.readyState)a.type="load";else return;"undefined"==typeof b.naturalWidth&&("load"==a.type?(b.naturalWidth=b.width,b.naturalHeight=b.height):(b.naturalWidth=0,b.naturalHeight=0));bc(this,{type:a.type,target:b});!this.a&&(a=b.id,delete this.c[a],b=this.b[a])&&(delete this.b[a],this.h.f(b,dc,this.j),Ca(this.b)&&Ca(this.c)&&bc(this,"complete"))}};var fc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,hc=function(a){if(gc){gc=!1;var b=k.location;if(b){var c=b.href;if(c&&(c=(c=hc(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw gc=!0,Error();}}return a.match(fc)},gc=Qa,ic=function(a,b){for(var c=a.split("&"),d=0;d<c.length;d++){var e=c[d].indexOf("="),f=null,g=null;0<=e?(f=c[d].substring(0,e),g=c[d].substring(e+1)):f=c[d];b(f,g?decodeURIComponent(g.replace(/\+/g," ")):"")}};var Q=function(a,b){this.f=this.j=this.c="";this.i=null;this.h=this.b="";this.a=!1;var c;a instanceof Q?(this.a=void 0!==b?b:a.a,jc(this,a.c),this.j=a.j,this.f=a.f,kc(this,a.i),this.b=a.b,lc(this,a.g.clone()),this.h=a.h):a&&(c=hc(String(a)))?(this.a=!!b,jc(this,c[1]||"",!0),this.j=mc(c[2]||""),this.f=mc(c[3]||"",!0),kc(this,c[4]),this.b=mc(c[5]||"",!0),lc(this,c[6]||"",!0),this.h=mc(c[7]||"")):(this.a=!!b,this.g=new nc(null,0,this.a))};
Q.prototype.toString=function(){var a=[],b=this.c;b&&a.push(oc(b,pc,!0),":");if(b=this.f){a.push("//");var c=this.j;c&&a.push(oc(c,pc,!0),"@");a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g,"%$1"));b=this.i;null!=b&&a.push(":",String(b))}if(b=this.b)this.f&&"/"!=b.charAt(0)&&a.push("/"),a.push(oc(b,"/"==b.charAt(0)?qc:rc,!0));(b=this.g.toString())&&a.push("?",b);(b=this.h)&&a.push("#",oc(b,sc));return a.join("")};Q.prototype.clone=function(){return new Q(this)};
var jc=function(a,b,c){a.c=c?mc(b,!0):b;a.c&&(a.c=a.c.replace(/:$/,""))},kc=function(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.i=b}else a.i=null},lc=function(a,b,c){b instanceof nc?(a.g=b,tc(a.g,a.a)):(c||(b=oc(b,uc)),a.g=new nc(b,0,a.a))},vc=function(a){return a instanceof Q?a.clone():new Q(a,void 0)},mc=function(a,b){return a?b?decodeURI(a):decodeURIComponent(a):""},oc=function(a,b,c){return n(a)?(a=encodeURI(a).replace(b,wc),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,
"%$1")),a):null},wc=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},pc=/[#\/\?@]/g,rc=/[\#\?:]/g,qc=/[\#\?]/g,uc=/[\#\?@]/g,sc=/#/g,nc=function(a,b,c){this.c=this.a=null;this.b=a||null;this.f=!!c},R=function(a){a.a||(a.a=new B,a.c=0,a.b&&ic(a.b,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))};h=nc.prototype;h.add=function(a,b){R(this);this.b=null;a=xc(this,a);var c=Ma(this.a,a);c||Ka(this.a,a,c=[]);c.push(b);this.c++;return this};
h.remove=function(a){R(this);a=xc(this,a);return C(this.a.b,a)?(this.b=null,this.c-=Ma(this.a,a).length,this.a.remove(a)):!1};h.u=function(){R(this);for(var a=this.a.v(),b=this.a.u(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};h.v=function(a){R(this);var b=[];if(n(a)){var c=a;R(this);c=xc(this,c);C(this.a.b,c)&&(b=ya(b,Ma(this.a,xc(this,a))))}else for(a=this.a.v(),c=0;c<a.length;c++)b=ya(b,a[c]);return b};
h.toString=function(){if(this.b)return this.b;if(!this.a)return"";for(var a=[],b=this.a.u(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.v(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.b=a.join("&")};h.clone=function(){var a=new nc;a.b=this.b;this.a&&(a.a=this.a.clone(),a.c=this.c);return a};
var xc=function(a,b){var c=String(b);a.f&&(c=c.toLowerCase());return c},tc=function(a,b){b&&!a.f&&(R(a),a.b=null,a.a.forEach(function(a,b){var e=b.toLowerCase();b!=e&&(this.remove(b),this.remove(e),0<a.length&&(this.b=null,Ka(this.a,xc(this,e),za(a)),this.c+=a.length))},a));a.f=b};F&&H(8);var yc={Ia:!0},zc=function(){throw Error("Do not instantiate directly");};zc.prototype.N=null;zc.prototype.toString=function(){return this.a};var Ac=function(a){if(null!=a)switch(a.N){case 1:return 1;case -1:return-1;case 0:return 0}return null},Bc=function(){zc.call(this)};q(Bc,zc);Bc.prototype.ma=yc;
var T=function(a){if(null!=a&&a.ma===yc)return y(a.constructor===Bc),a;if(a instanceof A){var b=S,c;a instanceof A&&a.constructor===A&&a.c===Ga?c=a.a:(va("expected object of type SafeHtml, got '"+a+"'"),c="type_error:SafeHtml");a=b(c,a.b)}else a=S(ra(String(String(a))),Ac(a));return a},S=function(a){function b(a){this.a=a}b.prototype=a.prototype;return function(a,d){var e=new b(String(a));void 0!==d&&(e.N=d);return e}}(Bc);
(function(a){function b(a){this.a=a}b.prototype=a.prototype;return function(a,d){var e=String(a);if(!e)return"";e=new b(e);void 0!==d&&(e.N=d);return e}})(Bc);var Cc=function(a){var b=4,c=!1;a=String(a);if(a.length<=b)return a;c&&(3<b?b-=3:c=!1);var d=a.charAt(b-1);if(d=55296<=d&&56319>=d)d=a.charAt(b),d=56320<=d&&57343>=d;d&&--b;a=a.substring(0,b);c&&(a+="...");return a};var Dc=function(a){var b="";return b=a.media&&a.media.metadata&&a.media.metadata.title?b+("Now Casting: "+a.media.metadata.title):a.media?b+"Now Casting":b+"Ready To Cast"};var Y=function(a){this.a=Ec;pb||(pb=new mb);if(k.location&&-1!=k.location.href.indexOf("Debug=true")){var b=pb;if(1!=b.b){hb();var c=M,d=b.h;c.a||(c.a=[]);c.a.push(d);b.b=!0}}/[&?]Debug=true(&|$)/.test(window.location.search)&&(cast.player.api.setLoggerLevel(cast.player.api.LoggerLevel.DEBUG),cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG));this.l=a;this.l.className="gcpa";this.l.innerHTML=S('<div class="background"></div><div class="gcpb"><video></video><div class="logo"></div><div class="gcpp"></div><div class="splash"></div><div class="watermark"></div><div class="gcpc"></div><div class="gcpd"><div class="gcpf"><div class="gcpq"></div><div class="gcpe"></div></div><div class="gcpi"><span class="gcpj"></span><span class="gcpn"></span><span class="gcpo"></span><div class="gcpk"><div class="gcpl progressBar"></div><div class="gcpm"></div></div></div></div></div>');
Fc(this,"unknown",!1);this.J=0;this.g("launching",!1);this.A=U(this,"gcpb");this.R=U(this,"gcpl");this.S=U(this,"gcpm");this.ba=U(this,"gcpn");this.V=U(this,"gcpo");this.G=this.pa.bind(this);this.i=this.h=this.f=null;this.L=!1;this.w=null;this.K=this.M=!1;this.b=this.l.querySelector("video");this.b.addEventListener("playing",this.wa.bind(this),!1);this.b.addEventListener("pause",this.va.bind(this),!1);this.b.addEventListener("ended",this.ra.bind(this),!1);this.b.addEventListener("abort",this.oa.bind(this),
!1);this.b.addEventListener("timeupdate",this.ya.bind(this),!1);this.b.addEventListener("seeking",this.Ba.bind(this),!1);this.b.addEventListener("seeked",this.Aa.bind(this),!1);this.H={};this.j=cast.receiver.CastReceiverManager.getInstance();this.j.onReady=this.za.bind(this);this.j.onSenderConnected=this.Ca.bind(this);this.j.onSenderDisconnected=this.Da.bind(this);this.j.onVisibilityChanged=this.Fa.bind(this);this.j.setApplicationState(Dc({}).toString());this.c=new cast.receiver.MediaManager(this.b);
this.ja=this.c.onLoad.bind(this.c);this.c.onLoad=this.ta.bind(this);this.ga=this.c.onEditTracksInfo.bind(this.c);this.c.onEditTracksInfo=this.qa.bind(this);this.ka=this.c.onMetadataLoaded.bind(this.c);this.c.onMetadataLoaded=this.ua.bind(this);this.Y=this.c.onStop.bind(this.c);this.c.onStop=this.Ea.bind(this);this.ia=this.c.onLoadMetadataError.bind(this.c);this.c.onLoadMetadataError=this.F.bind(this);this.ha=this.c.onError.bind(this.c);this.c.onError=this.sa.bind(this);this.c.customizedStatusCallback=
this.na.bind(this);this.c.onPreload=this.xa.bind(this)},Gc=["castplayer","CastPlayer"],Z=k;Gc[0]in Z||!Z.execScript||Z.execScript("var "+Gc[0]);for(var Hc;Gc.length&&(Hc=Gc.shift());)Gc.length||void 0===Y?Z[Hc]?Z=Z[Hc]:Z=Z[Hc]={}:Z[Hc]=Y;var Ec;Ec=ib("castplayer.CastPlayer");var Ic={idle:3E5,loading:3E5,paused:12E5};Y.prototype.da=function(){return this.b};Y.prototype.getMediaElement=Y.prototype.da;Y.prototype.ea=function(){return this.c};Y.prototype.getMediaManager=Y.prototype.ea;
Y.prototype.fa=function(){return this.f};Y.prototype.getPlayer=Y.prototype.fa;Y.prototype.aa=function(){this.j.start()};Y.prototype.start=Y.prototype.aa;Y.prototype.P=function(a){var b;(b=!cast.player.api.Player.prototype.preload)||(b=null==Jc(a||{}));if(b)return!1;this.h&&(this.h.unload(),this.h=null);return Kc(this,a)};Y.prototype.preload=Y.prototype.P;
var Kc=function(a,b){var c=b.contentId,d=Jc(b);if(!d)return J(a.a,"No protocol found for preload"),!1;c=new cast.player.api.Host({url:c,mediaElement:a.b});a.h=new cast.player.api.Player(c);c.onError=function(){a.h.unload();a.h=null;J(a.a,"Error during preload")};a.h.preload(d(c));return!0};
Y.prototype.O=function(a){clearTimeout(this.U);var b=this,c=a.message.media||{},d=c.contentType,e=Lc(c),f=c.streamType==cast.receiver.media.StreamType.LIVE;if(c.contentId)if("unknown"==e)J(this.a,"Load failed: unknown content type: "+d),b.F(a);else{var g=null;Mc(b);Fc(b,e,f);switch(e){case "audio":Nc(b,a);break;case "video":Oc(b,a);break;case "image":g=b.$.bind(b,a);break;default:va("Unknown player type")}b.M=!1;b.K=!1;Pc(b,c);Qc(c,function(){Rc(b.A,function(){b.g("loading",!1);g?g():(b.M=!0,Sc(b,
a),b.L&&(Tc(b),b.L=!1))})})}else J(this.a,"Load failed: no content"),b.F(a)};Y.prototype.load=Y.prototype.O;
var Sc=function(a,b){a.M?a.K?(a.ka(b),K(a.a,"Sent load response, player is ready and metadata loaded")):K(a.a,"Deferring load response, loadedmetadata event not received"):K(a.a,"Deferring load response, player not ready")},Mc=function(a){a.b.style.backgroundImage="none";a.f&&(a.f.unload(),a.f=null);a.i=null},Pc=function(a,b){var c=U(a,"gcpe"),d,e=b.metadata||{};d=S;e=e?1==e.metadataType?S((e.title?'<div class="gcpg">'+T(e.title)+"</div>":"")+(e.subtitle||e.studio||e.releaseDate?'<div class="gcph">'+
(e.subtitle?"<div><span>"+T(e.subtitle)+"</span></div>":"")+(e.studio||e.releaseDate?"<div>"+(e.studio?"<span>"+T(e.studio)+"</span>":"")+(e.releaseDate?"<span>"+T(Cc(e.releaseDate))+"</span>":"")+"</div>":"")+"</div>":"")):2==e.metadataType?S((e.title?'<div class="gcpg">'+T(e.title)+"</div>":"")+(e.season||e.episode||e.seriesTitle||e.originalAirdate?'<div class="gcph">'+(e.season||e.episode||e.originalAirdate?"<div>"+(e.season||e.episode?"<span>"+(e.season&&e.episode?"Season "+T(e.season)+", Episode "+
T(e.episode):e.season?"Season "+T(e.season):e.episode?"Episode "+T(e.episode):"")+"</span>":"")+(e.originalAirdate?"<span>"+T(Cc(e.originalAirdate))+"</span>":"")+"</div>":"")+(e.seriesTitle?"<div><span>"+T(e.seriesTitle)+"</span></div>":"")+"</div>":"")):3==e.metadataType?S((e.title?'<div class="gcpg">'+T(e.title)+"</div>":"")+(e.artist||e.composer||e.albumName||e.albumArtist||e.releaseDate?'<div class="gcph">'+(e.artist?"<div>"+(e.albumArtist?"<span>"+T(e.albumArtist)+"</span>":e.artist?"<span>"+
T(e.artist)+"</span>":e.composer?"<span>"+T(e.composer)+"</span>":"")+"</div>":"")+(e.albumName||e.releaseDate?"<div>"+(e.albumName?"<span>"+T(e.albumName)+"</span>":"")+(e.releaseDate?"<span>"+T(Cc(e.releaseDate))+"</span>":"")+"</div>":"")+"</div>":"")):S((e.title?'<div class="gcpg">'+T(e.title)+"</div>":"")+(e.subtitle?'<div class="gcph">'+T(e.subtitle)+"</div>":"")):"";d=d(e);c.innerHTML=d;c=Uc(b);d=U(a,"gcpq");c?(d.style.content='url("'+c.replace(/"/g,'\\"')+'")',d.classList.remove("placeholderImage")):
(d.classList.add("placeholderImage"),d.style.removeProperty("content"))},Vc=function(a,b){var c=b.message.autoplay;b.message.autoplay=!1;a.b.autoplay=!1;a.L=void 0==c?!0:c},Nc=function(a,b){y("audio"==a.I,"loadAudio called when type != AUDIO");Vc(a,b);Wc(a,b)};
Y.prototype.$=function(a){y("image"==this.I,"loadImage called when type != IMAGE");var b=this,c=b.l.ownerDocument.createElement("img");c.onerror=b.F.bind(b,a);c.onload=function(){b.g("paused",!1);b.b.style.backgroundImage='url("'+c.src.replace(/"/g,'\\"')+'")';b.c.sendLoadComplete()};c.src=a.message.media.contentId};
var Oc=function(a,b){y("video"==a.I,"loadVideo called when type != VIDEO");var c=b.message.media.contentId,d=Jc(b.message.media);Vc(a,b);if(d){a.b.removeEventListener("stalled",a.G);a.b.removeEventListener("waiting",a.G);var e=function(){a.f&&(Mc(a),a.b.dispatchEvent(new Event("error")))};!a.h||a.h.getHost&&a.h.getHost().url!=c?(a.h&&(a.h.unload(),a.h=null),K(a.a,"Regular video load"),c=new cast.player.api.Host({url:c,mediaElement:a.b}),c.onError=e,a.f=new cast.player.api.Player(c),a.f.load(d(c))):
(K(a.a,"Preloaded video load"),a.f=a.h,a.h=null,a.f.getHost().onError=e,a.f.load())}else a.b.addEventListener("stalled",a.G,!1),a.b.addEventListener("waiting",a.G,!1);Xc(a,b,!!d)},Xc=function(a,b,c){c?b.message&&b.message.media&&b.message.media.tracks&&0!=b.message.media.tracks.length&&a.c.loadTracksInfo({tracks:b.message.media.tracks,activeTrackIds:b.message.activeTrackIds,textTrackStyle:b.message.media.textTrackStyle}):Wc(a,b)},Zc=function(a,b,c){if(0!=b.length)for(var d=0;d<c.length;d++)if(0<=
wa(b,c[d].trackId)&&Yc(c[d],"ttml","application/ttml+xml")){if(!a.f){var e=new cast.player.api.Host({url:"",mediaElement:a.b});a.f=new cast.player.api.Player(e)}a.f.enableCaptions(!0,cast.player.api.CaptionsType.TTML,c[d].trackContentId)}},Yc=function(a,b,c){if(!a)return!1;var d=a.trackContentId;a=a.trackContentType;return d&&w(d,b)||a&&0==t(a,c)?!0:!1},Wc=function(a,b){a.ja(new cast.receiver.MediaManager.Event(cast.receiver.MediaManager.EventType.LOAD,b.message,b.senderId))},$c=function(a,b){clearTimeout(a.U);
b&&(a.U=setTimeout(function(){K(a.a,"Suicide timer expired");a.j.stop()},b))},Fc=function(a,b,c){K(a.a,"type changed: "+b);a.I=b;a.l.setAttribute("type",b);a.l.setAttribute("live",c.toString());var d=U(a,"gcpd"),e=U(a,"watermark");clearInterval(a.Z);"audio"!=b?(d.removeAttribute("style"),e.removeAttribute("style")):a.Z=setInterval(function(){d.style.marginBottom=Math.round(100*Math.random())+"px";d.style.marginLeft=Math.round(600*Math.random())+"px";e.style.marginBottom=Math.round(50*Math.random())+
"px";e.style.marginRight=Math.round(50*Math.random())+"px"},15E3)};Y.prototype.g=function(a,b,c){clearTimeout(this.la);var d=this;d.J=Date.now();if(c)d.la=setTimeout(d.g.bind(d,a,b),c);else if(b){var e=d.J;Rc(d.A,function(){e<d.J?K(d.a,"discarded obsolete deferred state("+a+")."):d.g(a,!1)})}else K(d.a,"state changed: "+a),d.m=a,d.l.setAttribute("state",a),ad(d),$c(d,Ic[a])};var ad=function(a){if(a.c){var b="idle"==a.m?null:a.c.getMediaInformation(),b=Dc({media:b}).toString();a.ca!=b&&(a.ca=b,a.j.setApplicationState(b))}};
h=Y.prototype;h.za=function(){K(this.a,"onReady");var a=this.j.getApplicationData(),b=U(this,"logo"),c=window.getComputedStyle(b,null);"none"==c.backgroundImage&&(b.textContent=a.name);b=U(this,"splash");"none"!=window.getComputedStyle(b,null).backgroundImage?this.g("idle",!0,3E3):(this.g("idle",!1),"none"==c.backgroundImage?b.textContent=a.name:b.classList.add("logo"))};h.Ca=function(a){K(this.a,"onSenderConnected");var b=this.j.getSender(a.senderId);y(null!==b);this.H[a.senderId]=b};
h.Da=function(a){K(this.a,"onSenderDisconnected");var b=this.H[a.senderId].userAgent.split(",");delete this.H[a.senderId];var c=0==Ba(this.H).length;a=a.reason==cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER;b="iOS CastSDK"==b[0]&&0>=ta(b[1],"2.2.0");c&&a&&!b&&this.j.stop()};h.sa=function(a){K(this.a,"onError");var b=this;Rc(this.A,function(){b.g("idle",!0);b.ha(a)})};
h.pa=function(){K(this.a,"onBuffering[readyState="+this.b.readyState+"]");"playing"==this.m&&this.b.readyState<HTMLMediaElement.HAVE_ENOUGH_DATA&&this.g("buffering",!1)};h.wa=function(){K(this.a,"onPlaying");bd(this,"media is already playing");var a="audio"==this.I;this.g("playing","loading"==this.m&&!a)};
h.va=function(){K(this.a,"onPause");bd(this,"media is paused");var a="idle"==this.m,b=this.b.currentTime==this.b.duration;this.f&&this.f.getState().underflow?(this.g("buffering",!1),this.c.broadcastStatus(!1)):a||b||this.g("paused",!1);cd(this)};h.na=function(a){a.playerState==cast.receiver.media.PlayerState.PAUSED&&"buffering"==this.m&&(a.playerState=cast.receiver.media.PlayerState.BUFFERING);return a};
h.Ea=function(a){K(this.a,"onStop");bd(this,"media is stopped");var b=this;Rc(b.A,function(){b.g("idle",!1);b.Y(a)})};h.ra=function(){K(this.a,"onEnded");this.g("idle",!0)};h.oa=function(){K(this.a,"onAbort");this.g("idle",!0)};h.ya=function(){"buffering"==this.m&&this.g("playing",!1);cd(this)};var cd=function(a){var b=a.b.currentTime;a.ba.textContent=dd(b);var c=a.b.duration;isFinite(c)&&(b=(100*b/c).toFixed(2)+"%",a.R.style.width=b,a.S.style.left=b)};h=Y.prototype;
h.Ba=function(){K(this.a,"onSeekStart");clearTimeout(this.T);this.l.classList.add("gcpr")};h.Aa=function(){K(this.a,"onSeekEnd");clearTimeout(this.T);this.T=ed(this.l)};h.Fa=function(a){K(this.a,"onVisibilityChanged");a.isVisible||(this.b.pause(),this.c.broadcastStatus(!1))};h.xa=function(a){K(this.a,"onPreload");return this.P(a.data.media)};h.ta=function(a){K(this.a,"onLoad");bd(this,"new media is loaded");this.O(new cast.receiver.MediaManager.LoadInfo(a.data,a.senderId))};
h.qa=function(a){K(this.a,"onEditTracksInfo");this.ga(a);if(a.data&&a.data.activeTrackIds&&this.i){var b=this.c.getMediaInformation()||{},c=this.i;if("ttml"==c)this.f&&this.f.enableCaptions(!1,cast.player.api.CaptionsType.TTML),Zc(this,a.data.activeTrackIds,b.tracks||[]);else if("embedded"==c){this.f.enableCaptions(!1);a=a.data.activeTrackIds;for(var b=this.f.getStreamingProtocol(),c=b.getStreamCount(),d=0;d<c;d++){var e=0<=wa(a,d+1),f=b.isStreamEnabled(d);e&&!f?b.enableStream(d,!0):!e&&f&&b.enableStream(d,
!1)}this.f.enableCaptions(!0)}}};
h.ua=function(a){K(this.a,"onMetadataLoaded");K(this.a,"onLoadSuccess");var b=this.b.duration;isFinite(b)?this.V.textContent=dd(b):(this.V.textContent="",this.R.style.width="100%",this.S.style.left="100%");if(a.message&&a.message.media&&a.message.media.tracks)for(b=0;b<a.message.media.tracks.length;b++){var c=this.i;if(a.message.media.tracks[b].type==cast.receiver.media.TrackType.TEXT){if(Yc(a.message.media.tracks[b],"ttml","application/ttml+xml"))this.i="ttml";else if(Yc(a.message.media.tracks[b],"vtt",
"text/vtt"))this.i="vtt";else{J(this.a,"Unsupported side loaded text track types");this.i="unsupported";break}if(c&&c!=this.i){J(this.a,"Load has inconsistent text track types");this.i="unsupported";break}}}if("ttml"==this.i&&a.message&&a.message.activeTrackIds&&a.message.media&&a.message.media.tracks)Zc(this,a.message.activeTrackIds,a.message.media.tracks);else if(!this.i&&a.message&&a.message.media){var d;if(b=this.f?this.f.getStreamingProtocol():null){for(var c=b.getStreamCount(),e=[],f=[],g=0;g<
c;g++){var l=g+1;b.isStreamEnabled(g)&&e.push(l);var v=b.getStreamInfo(g),L=v.mimeType,V;(V=u(L,"text"))||(V="application/ttml+xml"==L.toLowerCase());V?d=new cast.receiver.media.Track(l,cast.receiver.media.TrackType.TEXT):u(L,"video")?d=new cast.receiver.media.Track(l,cast.receiver.media.TrackType.VIDEO):u(L,"audio")&&(d=new cast.receiver.media.Track(l,cast.receiver.media.TrackType.AUDIO));d&&(d.name=v.name,d.language=v.language,d.trackContentType=v.mimeType,f.push(d))}d=0===f.length?null:{tracks:f,
activeTrackIds:e}}else d=null;d&&(this.i="embedded",d.textTrackStyle=a.message.media.textTrackStyle,this.c.loadTracksInfo(d))}this.K=!0;Sc(this,a)};h.F=function(a){K(this.a,"onLoadError");var b=this;Rc(this.A,function(){b.g("idle",!0);b.ia(a)})};
var bd=function(a,b){a.w&&(K(a.a,"Cancelled deferred playback: "+b),clearTimeout(a.w),a.w=null)},Tc=function(a){K(a.a,"Defering playback for 2000 ms");a.w=setTimeout(function(){a.w=null;a.f?(K(a.a,"Playing when enough data"),a.f.playWhenHaveEnoughData()):(K(a.a,"Playing"),a.b.play())},2E3)},U=function(a,b){var c=a.l.querySelector("."+b);if(c)return c;va("Cannot find element with class: "+b)},Uc=function(a){return(a=(a.metadata||{}).images||[],a[0])&&a[0].url},Jc=function(a){var b=a.contentType||"";
a=vc(a.contentId).b||"";return w(a,".m3u8")||0==t(b,"application/x-mpegurl")||0==t(b,"application/vnd.apple.mpegurl")?cast.player.api.CreateHlsStreamingProtocol:w(a,".mpd")||0==t(b,"application/dash+xml")?cast.player.api.CreateDashStreamingProtocol:-1!=a.indexOf(".ism")||0==t(b,"application/vnd.ms-sstr+xml")?cast.player.api.CreateSmoothStreamingProtocol:null},Lc=function(a){var b=a.contentType||"";a=vc(a.contentId||"").b||"";return u(b,"audio/")?"audio":u(b,"image/")?"image":u(b,"video/")?"video":
0==t(b,"application/x-mpegurl")?"video":0==t(b,"application/vnd.apple.mpegurl")?"video":0==t(b,"application/dash+xml")?"video":0==t(b,"application/vnd.ms-sstr+xml")?"video":w(a,".mp3")?"audio":w(a,".oga")?"audio":w(a,".wav")?"audio":w(a,".jpg")?"image":w(a,".gif")?"image":w(a,".png")?"image":w(a,".mp4")?"video":w(a,".ogv")?"video":w(a,".webm")?"video":w(a,".m3u8")?"video":w(a,".mpd")?"video":-1!=a.indexOf(".ism")?"video":"unknown"},dd=function(a){a=Math.floor(a);var b=Math.floor(a/3600),c=Math.floor(a/
60)%60;a%=60;return b?x(b)+":"+x(c)+":"+x(a):x(c)+":"+x(a)},ed=function(a){a.classList.add("gcpr");return setTimeout(function(){a.classList.remove("gcpr")},3E3)},Rc=function(a,b){fd(a,function(){b();gd(a,"",void 0)})},Qc=function(a,b){var c=[],d=Uc(a);d&&c.push(d);var d=a.contentId,e=Lc(a);d&&"image"==e&&c.push(d);if(0==c.length)b();else{d=new cc;Gb(d,"complete",b);for(e=0;e<c.length;e++){var f=c[e];(f=n(f)?f:f.src)&&(d.c[c[e]]={src:f,W:null})}ec(d)}},fd=function(a,b){gd(a,0,b)},gd=function(a,b,c){var d=
Date.now(),e=function(){K(Ec,"Transition end ["+d+"]");a.style.webkitTransition="";a.removeEventListener("webkitTransitionEnd",e,!1);c&&c()};K(Ec,"Transition start ["+d+"] Opacity: "+b+" 0.75s");a.addEventListener("webkitTransitionEnd",e,!1);a.style.webkitTransition="opacity 0.75s";a.style.opacity=b};location.search.slice(1).split("&").forEach(function(a){a=a.split("=");if("skin"==a[0]){var b=document.createElement("link");b.setAttribute("rel","stylesheet");b.setAttribute("type","text/css");b.setAttribute("href",unescape(a[1]));document.head.appendChild(b)}});
