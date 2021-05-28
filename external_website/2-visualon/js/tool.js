function isFullscreen() {
  return document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreen ||
    document.webkitIsFullScreen;
}

function isPtInElement(pt, element) {
  var rect = element.getBoundingClientRect();
  if ((rect.left <= pt.x && pt.x <= rect.right) &&
    (rect.top <= pt.y && pt.y <= rect.bottom)) {
    return true;
  } else {
    return false;
  }
}

function timeToString(seconds) {
  function formatTime(time) {
    return time < 10 ? '0' + time.toString() : time.toString();
  }

  seconds = Math.max(seconds, 0);
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor((seconds % 3600) % 60);
  return (h === 0 ? '' : formatTime(h) + ':') + formatTime(m) + ':' + formatTime(s);
}

const LOG_DEBUG = 0;
const LOG_INFO = 1;
const LOG_WARN = 2;
const LOG_ERROR = 3;

function printLog(msg, level) {
  if (LOG_INFO === level) {
    console.log('UI: ' + msg);
  }
}

function getBrowserInfo() {
  var sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  var s;
  if (s = ua.match(/edge\/([\d.]+)/)) {
    sys.edge = s[1];
  } else if (s = ua.match(/rv:([\d.]+)\) like gecko/)) {
    sys.ie = s[1];
  } else if (s = ua.match(/msie ([\d.]+)/)) {
    sys.ie = s[1];
  } else if (s = ua.match(/firefox\/([\d.]+)/)) {
    sys.firefox = s[1];
  } else if (s = ua.match(/chrome\/([\d.]+)/)) {
    sys.chrome = s[1];
  } else if (s = ua.match(/opera.([\d.]+)/)) {
    sys.opera = s[1];
  } else if (s = ua.match(/version\/([\d.]+).*safari/)) {
    sys.safari = s[1];
  }

  if (sys.edge) return { browser: "Edge", version: sys.edge };
  if (sys.ie) return { browser: "IE", version: sys.ie };
  if (sys.firefox) return { browser: "Firefox", version: sys.firefox };
  if (sys.chrome) return { browser: "Chrome", version: sys.chrome };
  if (sys.opera) return { browser: "Opera", version: sys.opera };
  if (sys.safari) return { browser: "Safari", version: sys.safari };

  return { browser: "", version: "0" };
}

var mse = [{
  id: 'mp4avc',
  codec: 'video/mp4; codecs="avc1.4D4028"',
}, {
  id: 'mp4ec3',
  codec: 'video/mp4; codecs="ec-3"',
}, {
  id: 'webm',
  codec: 'video/webm; codecs="vorbis,vp8"',
}, {
  id: 'mp2t',
  codec: 'video/mp2t; codecs="avc1.42E01E,mp4a.40.2"',
}];

function checkMSE() {
  for (var i = 0; i < mse.length; i++) {
    var checkbox = document.getElementById(mse[i].id);
    if (!checkbox)
      continue;
    if ('MediaSource' in window && MediaSource.isTypeSupported(mse[i].codec))
      checkbox.checked = true;
    else
      checkbox.checked = false;
  }
}

function supportDASH() {
  if ('MediaSource' in window && MediaSource.isTypeSupported(mse[0].codec))
    return true;
  else
    return false;
}

// DOM Tools
var UITools = {};
UITools.hasClass = function(elements, cName) {
  return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};

UITools.addClass = function(elements, cName) {
  if (!UITools.hasClass(elements, cName)) {
    elements.className = (elements.className + " " + cName).trim();
  }
};

UITools.removeClass = function(elements, cName) {
  if (UITools.hasClass(elements, cName)) {
    elements.className = (elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ")).trim();
  }
};

UITools.isMobile = function() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return isAndroid || isiOS;
}

UITools.isIOS = function() {
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  return isIOS;
}

function loadCss(file){
  var head = document.getElementsByTagName('head').item(0);
  css = document.createElement('link');
  css.href = file;
  css.rel = 'stylesheet';
  css.type = 'text/css';
  head.appendChild(css);
}

UITools.updateUIonMobile = function() {
  if (UITools.isMobile()) {
    loadCss('../common/css/mobile.css');
  } else {
    loadCss('../common/css/pc.css');
  }
}

UITools.updateUIonMobile();