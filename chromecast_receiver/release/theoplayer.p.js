/*!
 THEOplayer

 Usage of this software is limited by the THEOplayer License.

 It is prohibited to reverse engineer, decompile, translate,
 disassemble, decipher, decrypt, or otherwise attempt to
 discover the source code of this software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.

 For more information, visit http://www.theoplayer.com or contact
 contact @ theoplayer . com



 THEOplayer is based on a patent pending technology developed by
 OpenTelly (http://www.opentelly.com).

 Version: 2.40.0
 Created: 2018-07-17T08:36:28.910Z
 */

(function(self){var _=["value","empty string","Infinity","+Infinity","-Infinity","number","radix","interior hyphen","string","boolean","ontouchstart","ActiveXObject","objectFit","application/vnd.apple.mpegURL","video/mp4",'audio/mp4; codecs="mp4a.40.34"',"audio/mpeg",'video/mp4; codecs="avc1.4d401e"',"aac-lc","he-aac","unknown codec ","ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/","division by zero","format-mp3_","format-mp4_","format-m4s_","format-mp4-initializer_","format-m4s-and-initializer_","PIW0031","message","PIW0072","PIW0082","PIW0077","PIW0078","PIW0090","2.40.0"],$=["enumerable","configurable","writable","defineProperty","prototype","unsigned","indexOf","substring","document","location","navigator","setTimeout","clearTimeout","setInterval","clearInterval","TypeError","SyntaxError","parseInt","parseFloat","Uint8Array","WorkerGlobalScope","XMLHttpRequest","userAgent","DocumentTouch","msMaxTouchPoints","ActiveXObject","MediaSource","WebKitMediaSource","TextTrack","createElement","documentElement","fullscreenEnabled","webkitFullscreenEnabled","mozFullScreenEnabled","msFullscreenEnabled","canPlayType","POSITIVE_INFINITY","duration","hasOwnProperty","postMessage","byteLength","Instance","fromNumber","fromBits","fromString","fromValue","MAX_VALUE","MAX_UNSIGNED_VALUE","MIN_VALUE","toNumber","toString","isNegative","getHighBits","getHighBitsUnsigned","getLowBits","getLowBitsUnsigned","getNumBitsAbs","isPositive","notEquals","lessThan","lessThanOrEqual","greaterThan","greaterThanOrEqual","subtract","multiply","get_high","toUnsigned","shiftLeft","shiftRight","shiftRightUnsigned","toSigned","toBytesLE","toBytesBE","fromBytes","fromBytesLE","fromBytesBE","stringify","addEventListener"];!function(){"use strict";function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n[$[0]]=n[$[0]]||!1,n[$[1]]=!0,_[0]in n&&(n[$[2]]=!0),N[$[3]](t,n.key,n)}}function e(e,i,n){return i&&t(e[$[4]],i),n&&t(e,n),e}function i(t,e){var i=t+e;return i>=Ae&&(i-=Ae),i}function n(t,e){var i=t-e;return isFinite(t)&&isFinite(e)?(i>=ke?i-=Ae:-ke>i&&(i+=Ae),i):i}function r(t,e){return a(t.slice(),e)}function a(t,e){var i=t.length;if(1>=i)return t;for(var n=new Array(i),r=1;i>r;r*=2){o(t,e,r,n);var a=t;t=n,n=a}return t}function o(t,e,i,n){var r,a,o,s,u,h=t.length,f=0,c=2*i;for(r=0;h>r;r+=c)for(a=r+i,o=a+i,a>h&&(a=h),o>h&&(o=h),s=r,u=a;;)if(a>s&&o>u)n[f++]=e(t[s],t[u])<=0?t[s++]:t[u++];else if(a>s)n[f++]=t[s++];else{if(!(o>u))break;n[f++]=t[u++]}}function s(t,e){var i,n,r;return n=t.length,r=e.length,i=[],Se(i,1),Se(i,t[1]),Se(i,t[2]),Se(i,t[3]),Se(i,255),Se(i,225),Se(i,(65280&n)>>8),Se(i,255&n),Ie(i,t),Se(i,1),Se(i,(65280&r)>>8),Se(i,255&r),Ie(i,e),i}function u(t,e,i){var n,r,a,o;for(r=8,a=8,n=0;i>n;n+=1)0!==a&&(o=Be(t,e),a=(r+o+256)%256),r=0===a?r:a}function h(t){var e,i,n,r,a,o,s,h,f,c,g,d,l,w,m,p,v,U,y,T,B,S,I,E,P,N,k,R,M,b,O=new Oe(t);if(n=O.ba(1),e={bit:32},Te(O,e),(100===n||110===n||122===n||144===n)&&(r=Te(O,e),3===r&&(a=Ue(O,e)),Te(O,e),Te(O,e),Ue(O,e),o=Ue(O,e),1===o))for(i=0;(3!==r?8:12)>i;i+=1)s=Ue(O,e),1===s&&(6>i?u(O,e,16):u(O,e,64));if(h=Te(O,e),f=Te(O,e),0===f)Te(O,e);else if(1===f)for(Ue(O,e),Be(O,e),Be(O,e),c=Te(O,e),i=0;c>i;i+=1)Be(O,e);return Te(O,e),Ue(O,e),g=Te(O,e),d=Te(O,e),l=Ue(O,e),0===l&&Ue(O,e),Ue(O,e),w=Ue(O,e),1===w&&(m=Te(O,e),p=Te(O,e),v=Te(O,e),U=Te(O,e)),y=Ue(O,e),1===y&&(T=Ue(O,e),1===T&&(B=ye(O,e,8),255===B?(S=ye(O,e,16),I=ye(O,e,16)):Ce[B]&&(S=Ce[B][0],I=Ce[B][1])),E=Ue(O,e),1===E&&Ue(O,e),P=Ue(O,e),1===P&&(ye(O,e,3),Ue(O,e),N=Ue(O,e),1===N&&(ye(O,e,8),ye(O,e,8),ye(O,e,8))),k=Ue(O,e),1===k&&(Te(O,e),Te(O,e)),R=Ue(O,e),1===R&&(M=ye(O,e,32),b=ye(O,e,32),Ue(O,e))),{width:A.floor(16*(g+1)-2*(m||0)-2*(p||0)),height:A.floor((2-l)*(d+1)*16-2*(v||0)-2*(U||0)),Yi:S,Zi:I,xi:R?b/(2*M):!1,vma:a,wma:h}}function f(t){var e=t.length;if(e){t=r(t,function(t,e){return n(t.Ga.ui,e.Ga.ui)});var i=t[0].Ga;i.Vna=0;for(var a=1;e>a;a+=1){var o=t[a].Ga,s=n(o.ui,i.ui);o.Vna=A.max(s,0),i=o}}}function c(t){var e=t.length;if(e)for(var r=t[0].Ga.ui,a=0;e>a;a+=1){var o=t[a].Ga;o.Wna=n(o.vi,r),r=i(r,o.Pi)}}function g(t,e,i){return We[t>>2]+We[(3&t)<<4|e>>4]+We[(15&e)<<2|i>>6]+We[63&i]}function d(t,e,i){for(var n=[],r=e;i>r;r+=3)n.push(g(t[r],t[r+1],t[r+2]));return n.join("")}function l(t){for(var e=t.length,i=e%3,n=[],r=e-i,a=0;r>a;a+=Fe)n.push(d(t,a,A.min(r,a+Fe)));if(1===i){var o=t[e-1];n.push(We[o>>2]+We[(3&o)<<4]+"==")}else if(2===i){var s=t[e-2],u=t[e-1];n.push(We[s>>2]+We[(3&s)<<4|u>>4]+We[(15&u)<<2]+"=")}return n.join("")}function w(t,e,i){this.low=0|t,this.high=0|e,this[$[5]]=!!i}function m(t){return(t&&t.ga)===!0}function p(t,e){var i,n,r;return e?(t>>>=0,(r=t>=0&&256>t)&&(n=Ze[t])?n:(i=U(t,0>(0|t)?-1:0,!0),r&&(Ze[t]=i),i)):(t|=0,(r=t>=-128&&128>t)&&(n=Ke[t])?n:(i=U(t,0>t?-1:0,!1),r&&(Ke[t]=i),i))}function v(t,e){if(M(t))return e?ti:$e;if(e){if(0>t)return ti;if(t>=Qe)return ai}else{if(-Ye>=t)return oi;if(t+1>=Ye)return ri}return 0>t?v(-t,e).neg():U(t%Ge|0,t/Ge|0,e)}function U(t,e,i){return new w(t,e,i)}function y(t,e,i){if(0===t.length)throw P(_[1]);if("NaN"===t||_[2]===t||_[3]===t||_[4]===t)return $e;if(_[5]==typeof e?(i=e,e=!1):e=!!e,i=i||10,2>i||i>36)throw RangeError(_[6]);var n;if((n=t[$[6]]("-"))>0)throw P(_[7]);if(0===n)return y(t[$[7]](1),e,i).neg();for(var r=v(je(i,8)),a=$e,o=0;o<t.length;o+=8){var s=A.min(8,t.length-o),u=k(t[$[7]](o,o+s),i);if(8>s){var h=v(je(i,s));a=a.mul(h).add(v(u))}else a=a.mul(r),a=a.add(v(u))}return a[$[5]]=e,a}function T(t,e){return _[5]==typeof t?v(t,e):_[8]==typeof t?y(t,e):U(t.low,t.high,_[9]==typeof e?e:t[$[5]])}{var B,S=self.window,I=self[$[8]],E=(self[$[9]],self[$[10]]),P=(self[$[11]],self[$[12]],self[$[13]],self[$[14]],self.Error),N=(self[$[15]],self[$[16]],self.Object),A=self.Math,k=self[$[17]],R=self[$[18]],M=self.isNaN,b=self[$[19]],O=(self.Worker,self[$[20]],self[$[21]],E?E[$[22]]:""),C=/chrome\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/i,D=O.match(/Android ([0-9\.]+)/i),q=O.match(/Windows NT ([0-9\.]+)/i),L=O.match(/(Version)\/((\d+)\.(\d+)(?:\.(\d+))?).*Safari/),x=O.match(/Firefox\/([0-9\.]+)/i),W=O.match(/OPR\/(\d+\.\d+)/i),F=Boolean(O.match(/(mac\sos\sx)\s?([\w\s\.]+\w)*/i)||O.match(/(macintosh|mac(?=_powerpc)\s)/i)),z=(Boolean(O.match(/Windows NT/i)),q?R(q[1]):0,Boolean(O.match(/Android/i))),V=D?R(D[1]):0,K=Boolean(O.match(/windows phone (8|8\.1)/i)),Z=Boolean(O.match(/iPhone/i)),j=Boolean(O.match(/iPad/i)),H=Boolean(O.match(/iPod/i)),X=(Z||j||H)&&!K,G=(!!O.match(/Mobile Safari/i),Boolean(_[10]in self||self[$[23]]&&I instanceof self[$[23]]||E&&E[$[24]]),Boolean(O.match(/CriOS/i))),Q=(Boolean(self.chrome&&/google/i.test(E.vendor))||G,C.exec(E&&E[$[22]])||[],Boolean(O.match(/Edge\/\d+/i))),Y=!!O.match(/Trident/i),J=(Y&&!self[$[25]]&&_[11]in self,Boolean(O.match(/Vivaldi/i))),te=Boolean(O.match(/Firefox/i)&&!O.match(/Seamonkey/i)),ee=(x?R(x[1]):0,Boolean(O.match(/Safari/i))&&!O.match(/Chrome/i)&&!K),ie=(L?R(L[2]):0,Boolean(W)),ne=W?R(W[1]):0,re=self,ae=re[$[26]],oe=re[$[27]],se=(re[$[28]],I&&I[$[29]]("video")),_e=(I&&_[12]in I[$[30]].style,F&&ie&&26>=ne),ue=!(!ae&&!oe),he=(I&&(I[$[31]]||I[$[32]]||I[$[33]]||I[$[34]])||X,se&&se[$[35]]&&(""!==se[$[35]](_[13])||z&&!te&&V>=4),se&&se[$[35]]&&""!==se[$[35]](_[14])&&!_e),fe=ue&&!ee&&!Y&&!Q&&((ae||oe).isTypeSupported?(ae||oe).isTypeSupported(_[15]):se&&se[$[35]]&&""!==se[$[35]](_[15]));ue&&!ee&&(fe||((ae||oe).isTypeSupported?(ae||oe).isTypeSupported(_[16]):se&&se[$[35]]&&""!==se[$[35]](_[16]))),ue&&!(J&&F)&&((ae||oe).isTypeSupported?(ae||oe).isTypeSupported(_[17]):he)}try{B=S&&S.top!==S.self}catch(ce){B=!0}var ge,de=A.pow(2,33),le=9e4,we="TV",me=function(t){var e=t/A.pow(2,32);return[e>>>24&255,e>>>16&255,e>>>8&255,255&e,t>>>24&255,t>>>16&255,t>>>8&255,255&t]},pe=function(t){return[t>>>24&255,t>>>16&255,t>>>8&255,255&t]},ve=function(t){return[t>>>8&255,255&t]},Ue=function(t,e){var i=[128,64,32,16,8,4,2,1],n=A.floor(e.bit/8),r=t.ba?t.ba(n):t[n],a=0===(r&i[e.bit%8])?0:1;return e.bit+=1,a},ye=function(t,e,i){for(var n=0;i>0;)i-=1,n=2*n+Ue(t,e);return n},Te=function(t,e){for(var i=0;0===Ue(t,e)&&32>i;)i+=1;return ye(t,e,i)+A.pow(2,i)-1},Be=function(t,e){var i=Te(t,e);return 1&i?A.floor((i+1)/2):-A.floor(i/2)},Se=function(t,e){return t.push(e),t},Ie=function(t,e,i,n){var r=i||0,a=n||e.length,o=a-r,s=t.length,u=s+o;for(t.length=u;a>r;r+=1,s+=1)t[s]=e[r];return t},Ee=function(t,e,i){return Ie(t,i(e))},Pe=function(t,e){return Ee(t,e,pe)},Ne=function(){function t(){this.xma=0,this.cW=[],this.Ga={}}var i=t[$[4]];return i.yma=function(t){this.cW=this.cW.concat(t.cW),this.xma+=t.w},i.zma=function(t,e,i){var n=this.xma,r=i-e;r>0&&(this.cW.push({Ama:e,Bma:i,Cma:r,Dma:n,Ema:t}),this.xma+=r)},i.ba=function(t){for(var e=0,i=this.cW;e<i.length;e++){var n=i[e];if(n.Dma<=t&&t<n.Dma+n.Cma)return n.Ema[t+n.Ama-n.Dma]}return void 0},i.Fma=function(t,e){for(var i=0,n=this.cW;i<n.length;i++)for(var r=n[i],a=r.Bma,o=r.Ama;a>o;o+=1,e+=1)t[e]=r.Ema[o];return e},i.H5=function(t){var e=this.Gma();return t.push(e.buffer),{Hma:e,Ima:this.xma,qi:this.Ga}},i.Gma=function(){for(var t=new b(this.xma),e=0,i=0,n=this.cW;i<n.length;i++)for(var r=n[i],a=r.Bma,o=r.Ama;a>o;o+=1,e+=1)t[e]=r.Ema[o];return t},t.Jma=function(e){var i=new t;return i.zma(e.Hma,0,e.Ima),i.Ga=e.qi,i},e(t,[{key:"w",get:function(){return this.xma},set:function(t){var e=this.cW,i=this.xma-t;if(!(t>=this.xma)){if(this.xma=t,0===t)return e.length=0,void 0;for(var n=e.length-1;n>=0;n-=1){var r=e[n];if(i<=r.Cma)return r.Bma-=i,r.Cma-=i,e.length!==n+1&&(e.length=n+1),void 0;i-=r.Cma}}}},{key:"Na",get:function(){for(var t=new Array(this.xma),e=0,i=0,n=this.cW;i<n.length;i++)for(var r=n[i],a=r.Bma,o=r.Ama;a>o;o+=1,e+=1)t[e]=r.Ema[o];return t}}]),t}(),Ae=de,ke=Ae/2;!function(t){t[t.m5=0]="m5",t[t.n5=1]="n5",t[t.o5=2]="o5",t[t.p5=3]="p5",t[t.q5=4]="q5",t[t.r5=5]="r5"}(ge||(ge={}));var Re;!function(t){t[t.s5=0]="s5",t[t.t5=1]="t5",t[t.u5=2]="u5",t[t.v5=3]="v5"}(Re||(Re={}));var Me;!function(t){t[t.oma=47]="oma",t[t.pma=49]="pma"}(Me||(Me={}));var be,Oe=function(){var t=function(t){this.tna=t,this.una=[]},e=function(){for(var t,e=this.una,i=A.max(0,this.vna+e.length-2),n=this.tna,r=n.w,a=0;r>i;i+=1)t=n.ba(i),0===t?a+=1:(3===t&&a>=2&&e.push(i),a=0);this.vna=i-e.length},i=function(t){for(var e,i=this.una,n=i.length,r=0,a=t;n>r;r+=1){if(e=i[r],!(a>=e))return a;a+=1}return a},n=t[$[4]];return n.tna=null,n.una=null,n.vna=0,n.ba=function(t){{var n=this.una;n.length}if(!(t>this.tna.w))return t>this.vna&&e.call(this,t),this.tna.ba(i.call(this,t))},t}();!function(t){t[t.wna=1]="wna",t[t.xna=2]="xna",t[t.yna=3]="yna",t[t.zna=4]="zna",t[t.Ana=5]="Ana",t[t.Bna=6]="Bna",t[t.Cna=7]="Cna",t[t.Dna=8]="Dna",t[t.Ena=9]="Ena"}(be||(be={}));var Ce=[void 0,[1,1],[12,11],[10,11],[16,11],[40,33],[24,11],[20,11],[32,11],[80,33],[18,11],[15,11],[64,33],[160,99],[4,3],[3,2],[2,1]],De=function(){var t="h.264",e="mp3",i=_[18],n=_[19],r=[0,0,0,32,102,116,121,112,105,115,111,109,0,0,2,0,105,115,111,109,105,115,111,50,97,118,99,49,109,112,52,49],a=[0,0,0,28,102,116,121,112,109,112,52,50,0,0,0,0,105,115,111,109,109,112,52,50,100,97,115,104],o=[109,100,97,116],u=[109,111,111,118],g=[109,118,104,100],d=[116,114,97,107],l=[116,107,104,100],w=[109,118,101,120],m=[116,114,101,120],p=32,v=[101,100,116,115],U=[101,108,115,116],y=[109,100,105,97],T=[109,100,104,100],B=[99,116,116,115],S=[0,0,0,45,104,100,108,114,0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0],I=[0,0,0,45,104,100,108,114,0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0],E=45,k=[109,105,110,102],R=[0,0,0,16,115,109,104,100,0,0,0,0,0,0,0,0],M=16,b=[0,0,0,20,118,109,104,100,0,0,0,1,0,0,0,0,0,0,0,0],O=20,C=[0,0,0,36,100,105,110,102,0,0,0,28,100,114,101,102,0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1],D=36,q=[115,116,98,108],L=[115,116,115,100],x=[97,118,99,67],W=[101,115,100,115],F=[115,116,115,115],z=[115,116,116,115],V=[115,116,115,99],K=[115,116,115,122],Z=[115,116,99,111],j=[112,97,115,112],H=[97,118,99,49],X=[109,112,52,97],G=[1,0],Q=[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0],Y=9e4,J=function(t){if(t&&!t.Xi){var e=t.Vi,i=t.Wi;t.Xi=s(e,i);var n=new Ne;n.zma(e,0,e.length);var r=h(n);t.width=r&&r.width,t.height=r&&r.height,r&&r.Yi&&r.Zi&&(t.Yi=r.Yi,t.Zi=r.Zi)}},te=function(t,e){var i,n=t.xi||0;return t.Ni?t.Ni:(i=A.max(Y,n),e?A.round(i):i)},ee=function(t){var e,i=0,n=function(t){var i=t.length,n=0;for(e=0;i>e;e+=1)n+=t[e].w;return n};return t.video&&(i+=n(t.video.Vc)),t.audio&&(i+=n(t.audio.Vc)),i},ie=function(t,e){var i={video:[],audio:[]},n=8+e,r={video:t.video&&t.video.Vc||[],audio:t.audio&&t.audio.Vc||[]},a={Ga:{N2:Number[$[36]]}};for(r.video.index=0,r.audio.index=0,r.video.current=r.video[0]||a,r.audio.current=r.audio[0]||a;r.video.index<r.video.length||r.audio.index<r.audio.length;)r.video.current.Ga.N2<r.audio.current.Ga.N2?(Pe(i.video,n),n+=r.video.current.w,r.video.index+=1,r.video.current=r.video[r.video.index]||a):(Pe(i.audio,n),n+=r.audio.current.w,r.audio.index+=1,r.audio.current=r.audio[r.audio.index]||a);return i},ne=function(t,e,i){var n,r={Ga:{N2:Number[$[36]]}},a=0,s=0,u=e.video&&e.video.Vc||[],h=e.audio&&e.audio.Vc||[],f=u.length,c=h.length,g=u[a]||r,d=h[s]||r;for(t.Xna(i),t.Yna(o);f>a||c>s;)g.Ga.N2<d.Ga.N2?(n=g,a+=1,g=u[a]||r):(n=d,s+=1,d=h[s]||r),t.Zna(n)},re=function(t,e,i,n,r){return i?(r||0)+A.floor(e*t||0):n?A.round(e*n||0):0},ae=function(t,e,i){var n=A.max(t.video&&re(t.video[$[37]],Y,e,i,t.video.Bi),t.audio&&re(t.audio[$[37]],Y,e,i,t.audio.Bi));return n>A.pow(2,32)-1?1:0},oe=function(t,e,i){return 1===ae(t,e,i)?120:108},se=function(t,e,i,n){var r,a=oe(e,i,n),o=[0,1,0,0],s=[0,0,0,0,0,0,0,0,0,0],u=2;r=A.max(e.video&&re(e.video[$[37]],Y,i,n,e.video.Bi),e.audio&&re(e.audio[$[37]],Y,i,n,e.audio.Bi)),t.Xna(a),t.Yna(g),1===ae(e,i,n)?(t.Xna(16777216),t.aoa(0),t.aoa(0),t.Xna(Y),t.aoa(r)):(t.Xna(0),t.Xna(0),t.Xna(0),t.Xna(Y),t.Xna(r)),t.Yna(o),t.Yna(G),t.Yna(s),t.Yna(Q),t.Xna(0),t.Xna(0),t.Xna(0),t.Xna(0),t.Xna(0),t.Xna(0),t.Xna(u+1)},_e=function(t,e,i){var n=re(t[$[37]],Y,e,i,t.Bi);return n>A.pow(2,32)-1?1:0},ue=function(t,e,i){return 1===_e(t,e,i)?104:92},he=function(t,e,i,n,r,a){var o=re(e[$[37]],Y,n,a,e.Bi),s=ue(e,n,a);t.Xna(s),t.Yna(l),1===_e(e,n,a)?(t.Xna(16777231),t.aoa(0),t.aoa(0),t.Xna(i),t.Xna(0),t.aoa(o)):(t.Xna(15),t.Xna(0),t.Xna(0),t.Xna(i),t.Xna(0),t.Xna(o)),t.Xna(0),t.Xna(0),t.boa(0),t.boa(r?0:1),t.Yna(r?[0,0]:G),t.Yna([0,0]),t.Yna(Q),r?(t.boa(e.width||0),t.boa(0),t.boa(e.height||0),t.boa(0)):(t.Xna(0),t.Xna(0))},fe=function(t,e,i){var n=te(t,!1),r=re(t[$[37]],n,e,i);return r>A.pow(2,32)-1?1:0},ce=function(t,e,i){return 1===fe(t,e,i)?44:32},ge=function(t,e,i,n){var r=ce(e,i,n),a=te(e,!1),o=re(e[$[37]],a,i,n);a=A.round(a),t.Xna(r),t.Yna(T),1===fe(e,i,n)?(t.Xna(16777216),t.aoa(0),t.aoa(0),t.Xna(a),t.aoa(o)):(t.Xna(0),t.Xna(0),t.Xna(0),t.Xna(a),t.Xna(o)),t.Yna([85,196]),t.Yna([0,0])},de=function(t,e){e?t.Yna(S):t.Yna(I)},we=function(t){t.Yna(b)},me=function(t){t.Yna(R)},pe=function(t){t.Yna(C)},ve=function(t){var e,i;if(t[$[38]]("coa"))return t.coa;for(e=0,i=0;i<t.Vc.length;i+=1)t.Vc[i].Ga.ri&&(e+=1);return t.coa=e,e},Ue=function(t,e){var i=t.video&&0!==N.keys(t.video).length,n=t.audio&&0!==N.keys(t.audio).length;return e?0:8+(i?p:0)+(n?p:0)},ye=function(t){return t.Li?t.Li.length+12:0},Te=function(t,e){return e?110+t.Xi.length+ye(t)+(t.Yi&&t.Zi?16:0):52+ye(t)},Be=function(t,e,i){return i&&e?16+4*ve(t):0},Se=function(t,e,i){return t.Mi&&e&&i?16+8*t.Vc.length:0},Ie=function(t,e){return 20+(e?4*t.Vc.length:0)},Ee=function(t,e){return 16+(e?4*t.Vc.length:0)},Ae=function(t,e,i){return i?16+(e?8*t.Vc.length:0):16+(e?8:0)},ke=function(t){return 16+(t?12:0)},Re=function(t,e,i){return 8+Te(t,i)+Be(t,e,i)+Se(t,e,i)+Ae(t,e,i)+ke(e)+Ie(t,e)+Ee(t,e)},Me=function(t,e,i){return 8+(i?O:M)+D+Re(t,e,i)},be=function(t,e,i,n){return 8+ce(t,e,i)+E+Me(t,e,n)},Oe=function(t){var e=A.floor(Y*t[$[37]]||0),i=t.Bi;return e>A.pow(2,31)-1||i>A.pow(2,31)-1?1:0},Ce=function(t,e){return e?1===Oe(t)?24+(0!==t.Bi?40:20):24+(0!==t.Bi?24:12):0},De=function(t,e,i,n){return t&&0!==N.keys(t).length?8+ue(t,e,i)+be(t,e,i,n)+Ce(t,e):0},qe=function(r){if(r===t)return H;if(r===e)return X;if(r===i||r===n)return X;throw new P(_[20]+r)},Le=function(t,e,i,n){var r=Te(e,n),a=qe(e.wi),o=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];t.Xna(r),t.Yna(L),t.Xna(0),t.Xna(1),t.Xna(r-16),t.Yna(a),t.Xna(0),t.boa(0),t.boa(1),a===H?(t.Xna(0),t.Xna(0),t.Xna(0),t.Xna(0),t.boa(e.width||0),t.boa(e.height||0),t.boa(72),t.boa(0),t.boa(72),t.boa(0),t.Xna(0),t.boa(1),t.Yna(o),t.boa(24),t.Yna([255,255]),t.Xna(8+e.Xi.length),t.Yna(x),t.Yna(e.Xi)):a===X&&(t.Xna(0),t.Xna(0),t.boa(e.zi),t.boa(16),t.boa(0),t.boa(0),t.boa(e.Ni),t.boa(0)),e.Yi&&e.Zi&&(t.Xna(16),t.Yna(j),t.Xna(e.Yi),t.Xna(e.Zi)),e.Li&&(t.Xna(ye(e)),t.Yna(W),t.Xna(0),t.Yna(e.Li))},xe=function(t,e,i,n){var r,a;if(n&&i)for(r=Be(e,i,n),t.Xna(r),t.Yna(F),t.Xna(0),t.Xna(ve(e)),a=0;a<e.Vc.length;a+=1)e.Vc[a].Ga.ri&&t.Xna(a+1)},We=function(t,e,i,n){var r,a,o,s=te(e,!1),u=s/le;if(e.Mi&&i&&n)for(c(e.Vc),r=Se(e,i,n),t.Xna(r),t.Yna(B),t.Xna(0),t.Xna(e.Vc.length),a=0;a<e.Vc.length;a+=1)o=e.Vc[a].Ga.Wna,t.Xna(1),t.Xna(A.round(o*u))},Fe=function(t,e,i){var n,r=Ie(e,i);if(t.Xna(r),t.Yna(K),t.Xna(0),t.Xna(0),t.Xna(i?e.Vc.length:0),i)for(n=0;n<e.Vc.length;n+=1)t.Xna(e.Vc[n].w)},ze=function(t,e,i){var n=Ee(e,!!i);t.Xna(n),t.Yna(Z),t.Xna(0),t.Xna(i?e.Vc.length:0),i&&t.Yna(i)},Ve=function(t,e,i){t.Xna(i?1:0),i&&(t.Xna(e.Vc.length),t.Xna(e.Oi))},Ke=function(t,e,i){var n=te(e,!0),r=0,a=i?e.Vc.length:0,o=n/le;for(f(e.Vc),t.Xna(a);a>r;r+=1)t.Xna(1),t.Xna(A.round(e.Vc[r].Ga.Vna*o))},Ze=function(t,e,i,n){t.Xna(Ae(e,i,n)),t.Yna(z),t.Xna(0),n?Ke(t,e,i):Ve(t,e,i)},je=function(t,e){t.Xna(ke(e)),t.Yna(V),t.Xna(0),t.Xna(e?1:0),e&&(t.Xna(1),t.Xna(1),t.Xna(1))},He=function(t,e,i,n,r){var a=Re(e,!!n,r);t.Xna(a),t.Yna(q),Le(t,e,i,r),Ze(t,e,!!n,r),xe(t,e,!!n,r),We(t,e,!!n,r),je(t,!!n),Fe(t,e,!!n),ze(t,e,n)},Xe=function(t,e,i,n,r){var a=Me(e,!!n,r);t.Xna(a),t.Yna(k),r?we(t):me(t),pe(t),He(t,e,i,n,r)},Ge=function(t,e,i,n,r,a){var o=be(e,!!n,a,r);t.Xna(o),t.Yna(y),ge(t,e,!!n,a),de(t,r),Xe(t,e,i,n,r)},Qe=function(t,e){var i=Ce(e,!0),n=A.floor(Y*e[$[37]]||0),r=Oe(e);t.Xna(i),t.Yna(v),t.Xna(i-8),t.Yna(U),1===r?t.Xna(16777216):t.Xna(0),t.Xna(0!==e.Bi?2:1),0!==e.Bi&&(1===r?(t.aoa(e.Bi),t.Yna([255,255,255,255,255,255,255,255])):(t.Xna(e.Bi),t.Yna([255,255,255,255])),t.boa(1),t.boa(0)),1===r?(t.aoa(n),t.aoa(0)):(t.Xna(n),t.Xna(0)),t.boa(1),t.boa(0)},Ye=function(t,e){t.Xna(p),t.Yna(m),t.Xna(0),t.Xna(e),t.Xna(1),t.Xna(0),t.Xna(0),t.Xna(0)},Je=function(t,e){t.Xna(Ue(e,!1)),t.Yna(w),e.video&&0!==N.keys(e.video).length&&Ye(t,1),e.audio&&0!==N.keys(e.audio).length&&Ye(t,2)},$e=function(t,e,i,n,r,a){var o=De(e,!!i,a,r);0!==o&&(t.Xna(o),t.Yna(d),he(t,e,n,!!i,r,a),i&&Qe(t,e),Ge(t,e,n,i,r,a))},ti=function(t,e,i){var n=De(t.video,e,i,!0),r=De(t.audio,e,i,!1);return 8+oe(t,e,i)+Ue(t,e)+n+r},ei=function(t,e,i,n,r){t.Xna(i),t.Yna(u),se(t,e,!!n,r),n||Je(t,e),$e(t,e.video,n&&n.video,1,!0,r),$e(t,e.audio,n&&n.audio,2,!1,r)},ii=function(t,e){J(t.video);var i=ti(t,!0),n=ee(t)+8,a=r.length+i+n,o=r.length+i,s=ie(t,o);return e.Wla(a),e.Yna(r),ei(e,t,i,s),ne(e,t,n),e},ni=function(t,e,i){J(t.video);var n=ti(t,!1,e),r=a.length+n;return i.Wla(r),i.Yna(a),ei(i,t,n,!1,e||0),i},ri=function(){var t=[0,0,0,24,115,116,121,112,109,115,100,104,0,0,0,0,109,115,100,104,109,115,105,120],e=[115,105,100,120],i=[109,111,111,102],n=[109,102,104,100],r=16,a=[116,114,97,102],s=[116,102,104,100],u=24,h=[116,102,100,116],f=[116,114,117,110],g=[115,100,116,112],d=function(t,e){return e?20+16*t.Vc.length:20+4*t.Vc.length},l=function(t,e){return e?12+t.Vc.length:0},w=function(t,e){var i=te(t,!0),n=A.round(e*i);return n>A.pow(2,32)-1?1:0},m=function(t,e){return 1===w(t,e)?20:16},p=function(t,e,i){return t&&t.Vc?8+u+m(t,i)+d(t,e)+l(t,e):0},v=function(t,e){return 8+r+p(t.audio,!1,e)+p(t.video,!0,e)},U=function(t){var e,i=0;if(!t||!t.Vc)return 0;for(e=0;e<t.Vc.length;e+=1)i+=t.Vc[e].w;return i},y=function(t,e){var i=A.round(e*Y);return i>A.pow(2,32)-1?1:0},T=function(t,e){return 1===y(t,e)?52:44},B=function(t,i,n,r,a){var o=A.max((i.video&&i.video.Bi||0)+A.floor(Y*(i.video&&i.video[$[37]])||0),(i.audio&&i.audio.Bi||0)+A.floor(Y*(i.audio&&i.audio[$[37]])||0)),s=A.round(a*Y);t.Xna(n),t.Yna(e),1===y(i,a)?(t.Xna(16777216),t.Xna(1),t.Xna(Y),t.aoa(s),t.aoa(0)):(t.Xna(0),t.Xna(1),t.Xna(Y),t.Xna(s),t.Xna(0)),t.boa(0),t.boa(1),t.Xna(v(i,r)+U(i.video)+U(i.audio)+8),t.Xna(o),t.Yna([144,0,0,0])},S=function(t,e){t.Xna(r),t.Yna(n),t.Xna(0),t.Xna(e)},I=function(t,e,i,n){var r=te(e,!0),a=n?A.round(r/9e4*(e.yi||0)):e.Oi;t.Xna(u),t.Yna(s),t.Xna(40),t.Xna(i),t.Xna(a),t.Yna(n?[0,1,0,0]:[2,0,0,0])},E=function(t,e,i){var n=te(e,!0),r=A.round(i*n);t.Xna(m(e,i)),t.Yna(h),1===w(e,i)?(t.Xna(16777216),t.aoa(r)):(t.Xna(0),t.Xna(r))},P=function(t,e,i,n){var r,a=U(e.video),o=v(e,n)+8+a;for(t.Xna(d(i,!1)),t.Yna(f),t.Yna([0,0,2,1]),t.Xna(i.Vc.length),t.Xna(o),r=0;r<i.Vc.length;r+=1)t.Xna(i.Vc[r].w)},N=function(t,e,i,n){var r,a,o=v(e,n)+8,s=te(i,!1),u=s/le;for(c(i.Vc),t.Xna(d(i,!0)),t.Yna(f),t.Yna([1,0,15,1]),t.Xna(i.Vc.length),t.Xna(o),r=0;r<i.Vc.length;r+=1)t.Xna(A.round(i.Vc[r].Ga.ec*s)),a=i.Vc[r].Ga.Wna,t.Xna(i.Vc[r].w),t.Yna(i.Vc[r].Ga.ri?[2,0,0,0]:[0,1,0,0]),t.Xna(A.round(a*u))},k=function(t,e,i,n,r){n?N(t,e,i,r):P(t,e,i,r)},R=function(t,e,i,n){var r;if(n)for(t.Xna(l(i,n)),t.Yna(g),t.Yna([0,0,0,0]),r=0;r<i.Vc.length;r+=1)i.Vc[r].Ga.ri?t.doa(32):t.doa(16)},M=function(t,e,i,n,r,o){i&&(t.Xna(p(i,r,o)),t.Yna(a),I(t,i,n,r),E(t,i,o),k(t,e,i,r,o),R(t,e,i,r))},b=function(t,e,n,r,a){t.Xna(n),t.Yna(i),S(t,r),M(t,e,e.video,1,!0,a),M(t,e,e.audio,2,!1,a)},O=function(t,e,i){var n=0,r=e.video&&e.video.Vc||e.audio&&e.audio.Vc||[],a=r.length,s=!!e.video;for(t.Xna(i),t.Yna(o);a>n;)t.Zna(r[n]),r[n]=null,n+=1,n===a&&e.audio&&s&&(s=!1,r=e.audio.Vc,a=r.length,n=0)};return function(e,i,n,r,a){var o=T(e,r),s=v(e,n),u=ee(e)+8,h=t.length+o+s+u;return a.Wla(h),a.Yna(t),B(a,e,o,n,r),b(a,e,s,i,n),O(a,e,u),a}}();return{eoa:ii,foa:ni,goa:ri}}(),qe=function(){var t=function(t){var e,i=t.length,n=0;for(e=0;i>e;e+=1)n+=t[e].w;return n},e=function(e){var i=0;return e.audio&&(i+=t(e.audio.Vc)),i};return{hoa:function(t,i){i.Wla(e(t));for(var n=0,r=t.audio&&t.audio.Vc||[],a=r.length;a>n;)i.Zna(r[n]),n+=1}}}(),Le=function(){function t(t){this.Na=void 0,this.ioa=0,this.Hd=t}var e=t[$[4]];return e.joa=function(t,e,i){var n=this.ioa,r=this.Na;for(e=e||0,i=i||t.length;i>e;e+=1,n+=1)r[n]=t[e];this.ioa=n},e.Wla=function(t){this.Na=new b(t),this.ioa=0},e.doa=function(t){this.Na&&(this.Na[this.ioa]=t,this.ioa+=1)},e.Yna=function(t,e,i){this.Na&&this.joa(t,e,i)},e.Zna=function(t){this.ioa=t.Fma(this.Na,this.ioa)},e.H5=function(t){return t(this.Na,this.Hd)},e.boa=function(t){return this.Yna(ve(t))},e.Xna=function(t){return this.Yna(pe(t))},e.aoa=function(t){return this.Yna(me(t))},t}(),xe=function(t){var e=void 0,i=function(){var e=new b(1);try{return t[$[39]](e,[e.buffer]),0===e[$[40]]}catch(i){return!1}};return function(n,r){return void 0===e&&(e=i()),r&&e?t[$[39]](n,r):t[$[39]](n)}}(self),We=_[21].split(""),Fe=16383,ze=null;try{ze=new WebAssembly[$[41]](new WebAssembly.Module(new b([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(Ve){}N[$[3]](w[$[4]],"ga",{value:!0}),w.isLong=m;var Ke={},Ze={};w.fromInt=p,w[$[42]]=v,w[$[43]]=U;var je=A.pow;w[$[44]]=y,w[$[45]]=T;var He=65536,Xe=1<<24,Ge=He*He,Qe=Ge*Ge,Ye=Qe/2,Je=p(Xe),$e=p(0);w.ZERO=$e;var ti=p(0,!0);w.UZERO=ti;var ei=p(1);w.ONE=ei;var ii=p(1,!0);w.UONE=ii;var ni=p(-1);w.NEG_ONE=ni;var ri=U(-1,2147483647,!1);w[$[46]]=ri;var ai=U(-1,-1,!0);w[$[47]]=ai;var oi=U(0,-2147483648,!1);w[$[48]]=oi;var si=w[$[4]];si.toInt=function(){return this[$[5]]?this.low>>>0:this.low},si[$[49]]=function(){return this[$[5]]?(this.high>>>0)*Ge+(this.low>>>0):this.high*Ge+(this.low>>>0)},si[$[50]]=function(t){if(t=t||10,2>t||t>36)throw RangeError(_[6]);if(this.isZero())return"0";if(this[$[51]]()){if(this.eq(oi)){var e=v(t),i=this.div(e),n=i.mul(e).sub(this);return i[$[50]](t)+n.toInt()[$[50]](t)}return"-"+this.neg()[$[50]](t)}for(var r=v(je(t,6),this[$[5]]),a=this,o="";;){var s=a.div(r),u=a.sub(s.mul(r)).toInt()>>>0,h=u[$[50]](t);if(a=s,a.isZero())return h+o;for(;h.length<6;)h="0"+h;o=""+h+o}},si[$[52]]=function(){return this.high},si[$[53]]=function(){return this.high>>>0},si[$[54]]=function(){return this.low},si[$[55]]=function(){return this.low>>>0},si[$[56]]=function(){if(this[$[51]]())return this.eq(oi)?64:this.neg()[$[56]]();for(var t=0!=this.high?this.high:this.low,e=31;e>0&&0==(t&1<<e);e--);return 0!=this.high?e+33:e+1},si.isZero=function(){return 0===this.high&&0===this.low},si.eqz=si.isZero,si[$[51]]=function(){return!this[$[5]]&&this.high<0},si[$[57]]=function(){return this[$[5]]||this.high>=0},si.isOdd=function(){return 1===(1&this.low)},si.isEven=function(){return 0===(1&this.low)},si.equals=function(t){return m(t)||(t=T(t)),this[$[5]]!==t[$[5]]&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low},si.eq=si.equals,si[$[58]]=function(t){return!this.eq(t)},si.neq=si[$[58]],si.ne=si[$[58]],si[$[59]]=function(t){return this.comp(t)<0},si.lt=si[$[59]],si[$[60]]=function(t){return this.comp(t)<=0},si.lte=si[$[60]],si.le=si[$[60]],si[$[61]]=function(t){return this.comp(t)>0},si.gt=si[$[61]],si[$[62]]=function(t){return this.comp(t)>=0},si.gte=si[$[62]],si.ge=si[$[62]],si.compare=function(t){if(m(t)||(t=T(t)),this.eq(t))return 0;var e=this[$[51]](),i=t[$[51]]();return e&&!i?-1:!e&&i?1:this[$[5]]?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t)[$[51]]()?-1:1},si.comp=si.compare,si.negate=function(){return!this[$[5]]&&this.eq(oi)?oi:this.not().add(ei)},si.neg=si.negate,si.add=function(t){m(t)||(t=T(t));var e=this.high>>>16,i=65535&this.high,n=this.low>>>16,r=65535&this.low,a=t.high>>>16,o=65535&t.high,s=t.low>>>16,u=65535&t.low,h=0,f=0,c=0,g=0;return g+=r+u,c+=g>>>16,g&=65535,c+=n+s,f+=c>>>16,c&=65535,f+=i+o,h+=f>>>16,f&=65535,h+=e+a,h&=65535,U(c<<16|g,h<<16|f,this[$[5]])},si[$[63]]=function(t){return m(t)||(t=T(t)),this.add(t.neg())},si.sub=si[$[63]],si[$[64]]=function(t){if(this.isZero())return $e;if(m(t)||(t=T(t)),ze){var e=ze.mul(this.low,this.high,t.low,t.high);return U(e,ze[$[65]](),this[$[5]])}if(t.isZero())return $e;if(this.eq(oi))return t.isOdd()?oi:$e;if(t.eq(oi))return this.isOdd()?oi:$e;if(this[$[51]]())return t[$[51]]()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t[$[51]]())return this.mul(t.neg()).neg();if(this.lt(Je)&&t.lt(Je))return v(this[$[49]]()*t[$[49]](),this[$[5]]);var i=this.high>>>16,n=65535&this.high,r=this.low>>>16,a=65535&this.low,o=t.high>>>16,s=65535&t.high,u=t.low>>>16,h=65535&t.low,f=0,c=0,g=0,d=0;return d+=a*h,g+=d>>>16,d&=65535,g+=r*h,c+=g>>>16,g&=65535,g+=a*u,c+=g>>>16,g&=65535,c+=n*h,f+=c>>>16,c&=65535,c+=r*u,f+=c>>>16,c&=65535,c+=a*s,f+=c>>>16,c&=65535,f+=i*h+n*u+r*s+a*o,f&=65535,U(g<<16|d,f<<16|c,this[$[5]])},si.mul=si[$[64]],si.divide=function(t){if(m(t)||(t=T(t)),t.isZero())throw P(_[22]);if(ze){if(!this[$[5]]&&-2147483648===this.high&&-1===t.low&&-1===t.high)return this;var e=(this[$[5]]?ze.div_u:ze.div_s)(this.low,this.high,t.low,t.high);return U(e,ze[$[65]](),this[$[5]])}if(this.isZero())return this[$[5]]?ti:$e;var i,n,r;if(this[$[5]]){if(t[$[5]]||(t=t[$[66]]()),t.gt(this))return ti;if(t.gt(this.shru(1)))return ii;r=ti}else{if(this.eq(oi)){if(t.eq(ei)||t.eq(ni))return oi;if(t.eq(oi))return ei;var a=this.shr(1);return i=a.div(t).shl(1),i.eq($e)?t[$[51]]()?ei:ni:(n=this.sub(t.mul(i)),r=i.add(n.div(t)))}if(t.eq(oi))return this[$[5]]?ti:$e;if(this[$[51]]())return t[$[51]]()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t[$[51]]())return this.div(t.neg()).neg();r=$e}for(n=this;n.gte(t);){i=A.max(1,A.floor(n[$[49]]()/t[$[49]]()));for(var o=A.ceil(A.log(i)/A.LN2),s=48>=o?1:je(2,o-48),u=v(i),h=u.mul(t);h[$[51]]()||h.gt(n);)i-=s,u=v(i,this[$[5]]),h=u.mul(t);u.isZero()&&(u=ei),r=r.add(u),n=n.sub(h)}return r},si.div=si.divide,si.modulo=function(t){if(m(t)||(t=T(t)),ze){var e=(this[$[5]]?ze.rem_u:ze.rem_s)(this.low,this.high,t.low,t.high);return U(e,ze[$[65]](),this[$[5]])}return this.sub(this.div(t).mul(t))},si.mod=si.modulo,si.rem=si.modulo,si.not=function(){return U(~this.low,~this.high,this[$[5]])},si.and=function(t){return m(t)||(t=T(t)),U(this.low&t.low,this.high&t.high,this[$[5]])},si.or=function(t){return m(t)||(t=T(t)),U(this.low|t.low,this.high|t.high,this[$[5]])},si.xor=function(t){return m(t)||(t=T(t)),U(this.low^t.low,this.high^t.high,this[$[5]])},si[$[67]]=function(t){return m(t)&&(t=t.toInt()),0===(t&=63)?this:32>t?U(this.low<<t,this.high<<t|this.low>>>32-t,this[$[5]]):U(0,this.low<<t-32,this[$[5]])},si.shl=si[$[67]],si[$[68]]=function(t){return m(t)&&(t=t.toInt()),0===(t&=63)?this:32>t?U(this.low>>>t|this.high<<32-t,this.high>>t,this[$[5]]):U(this.high>>t-32,this.high>=0?0:-1,this[$[5]])},si.shr=si[$[68]],si[$[69]]=function(t){if(m(t)&&(t=t.toInt()),t&=63,0===t)return this;var e=this.high;if(32>t){var i=this.low;return U(i>>>t|e<<32-t,e>>>t,this[$[5]])}return 32===t?U(e,0,this[$[5]]):U(e>>>t-32,0,this[$[5]])},si.shru=si[$[69]],si.shr_u=si[$[69]],si[$[70]]=function(){return this[$[5]]?U(this.low,this.high,!1):this},si[$[66]]=function(){return this[$[5]]?this:U(this.low,this.high,!0)},si.toBytes=function(t){return t?this[$[71]]():this[$[72]]()},si[$[71]]=function(){var t=this.high,e=this.low;return[255&e,e>>>8&255,e>>>16&255,e>>>24,255&t,t>>>8&255,t>>>16&255,t>>>24]},si[$[72]]=function(){var t=this.high,e=this.low;return[t>>>24,t>>>16&255,t>>>8&255,255&t,e>>>24,e>>>16&255,e>>>8&255,255&e]},w[$[73]]=function(t,e,i){return i?w[$[74]](t,e):w[$[75]](t,e)},w[$[74]]=function(t,e){return new w(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,e)},w[$[75]]=function(t,e){return new w(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],e)};!function(){function t(t){void 0===t&&(t=0),this.bq=t}var i=t[$[4]];return i.ia=function(t){this.bq+=t},i.Kc=function(t){this.bq=t},i.cq=function(){return new t(this.ha)},e(t,[{key:"ha",get:function(){return this.bq}}]),t}();!function(t){var e=_[23],i=_[24],n=_[25],r=_[26],a=_[27],o="m3",s=function(t){var e,i,n;if(t&&t.Vc)for(n=t.Vc,e=0,i=n.length;i>e;e+=1)n[e]=Ne.Jma(n[e])},u=function(t){return t.audio&&s(t.audio),t.video&&s(t.video),t},h=function(e,i,n){i={},n||(n=_[28]),t[$[39]]({E3:"K3",F3:e,H3:i.message||n,koa:i.name,loa:i.stack,moa:JSON[$[76]](i)})},f=function(t,e,i){return t.push(e.buffer),{Na:e,Hd:i}},c=function(t,e){return{Na:l(t),Hd:e}};t[$[77]](_[29],function(t){var s,g,d,l=t.data.h3,w=[],m=t.data.n3,p=t.data.l3,v=t.data.p3,U=t.data.r3,y=t.data.s3,T=t.data.q3,B=t.data.k3,S=t.data.j3,I=p===o?f.bind(null,w):c;if("i3"===l){d=u(t.data.o3),t.data.o3=null;try{switch(B){case e:s=new Le(m),qe.hoa(d,s);break;case i:s=new Le(m),De.eoa(d,s);break;case n:s=new Le(m),De.goa(d,v,U,y,s);break;case r:s=new Le(m),De.foa(d,T,s);break;case a:s={T3:new Le(m),U3:new Le(m),H5:function(t){return{T3:s.T3.H5(t),U3:s.U3.H5(t)}}},De.foa(d,T,s.T3),De.goa(d,v,U,y,s.U3);break;default:return h(S,{},_[30])}}catch(E){return h(S,E,_[31])}try{g=s.H5(I)}catch(P){return h(S,P,_[32])}try{return xe({E3:"I3",F3:S,G3:g},w)}catch(N){return h(S,N,_[33])}}return h(S,{},_[34])},!1),t[$[39]](we+_[35])}(self)}();}('undefined'!=typeof self?self:'undefined'!=typeof window?window:'undefined'!=typeof global?global:this));
