var CommonUtils = {};

CommonUtils.timeToString = function(value) {
  function formatTimeUnit(time) {
    return time < 10 ? '0' + time.toString() : time.toString();
  }

  value = Math.max(value, 0);
  var h = Math.floor(value / 3600);
  var m = Math.floor((value % 3600) / 60);
  var s = Math.floor((value % 3600) % 60);
  return (h === 0 ? '' : formatTimeUnit(h) + ':') + formatTimeUnit(m) + ':' + formatTimeUnit(s);
};

var UITools = {};
UITools.hasClass = function(elements, cName) {
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
};

UITools.addClass = function(elements, cName) {
  if (!UITools.hasClass(elements, cName)) {
    elements.className = (elements.className + ' ' + cName).trim();
  }
};

UITools.removeClass = function(elements, cName) {
  if (UITools.hasClass(elements, cName)) {
    elements.className = (elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ')).trim();
  }
};

//
var html5Player;
var receiver;
var state;

// UI Components
var vopTimelinBar;
var vopPlayProgress;
var vopPosition;
var vopDuration;

var timerHideTimelineBar;

// Tools
function getProgressInfo(player) {
  let position = player.getPosition();
  let duration = player.getDuration();
  let live = player.isLive();
  let range = player.getSeekableRange();

  if (live) {
    duration = range.end - range.start;
  }

  let ret = {
    position: position,
    duration: duration,
    live: live,
    range: range
  };

  // console.log('getProgressInfo: ', ret);
  return ret;
}

function onAutohideTimeout() {
  vopTimelinBar.style.display = 'none';
}

// Events Callback
function onCastStateChanged(e) {
  state = e.state;
  //console.log('+onCastStateChanged, state: ' + state);

  html5Player.setAttribute('state', state);

  if (timerHideTimelineBar) {
    clearTimeout(timerHideTimelineBar);
    timerHideTimelineBar = null;
  }
  if (state === 'paused') {
    vopTimelinBar.style.display = 'flex';
  } else if (state === 'idle') {
    vopPosition.innerText = '';
    vopDuration.innerText = '';
    vopPlayProgress.style.transform = 'scaleX(0)';
    timerHideTimelineBar = setTimeout(function() {
      onAutohideTimeout();
    }, 3000);
  } else {
    vopTimelinBar.style.display = 'flex';
    timerHideTimelineBar = setTimeout(function() {
      onAutohideTimeout();
    }, 3000);
  }
}

function onCastTimeupdate() {
  let info = getProgressInfo(receiver);

  let playProgressTransform;
  if (info.live) {
    playProgressTransform = 'scaleX(1)';
  } else {
    playProgressTransform = 'scaleX(' + info.position / info.duration + ')';
  }

  vopPlayProgress.style.transform = playProgressTransform;

  if (info.live) {
    vopPosition.style.display = 'none';
    vopDuration.innerText = 'Live';
  } else {
    var position = CommonUtils.timeToString(info.position);
    var duration = CommonUtils.timeToString(info.duration);
    vopPosition.innerText = position;
    vopDuration.innerText = duration;
  }
}

function initUI() {
  html5Player = document.querySelector('.receiver-video-player');

  vopTimelinBar = document.querySelector('.vop-timeline-bar');
  vopPlayProgress = document.querySelector('.vop-play-progress');
  vopPosition = document.querySelector('.vop-position');
  vopDuration = document.querySelector('.vop-duration');
}

function initData() {
  receiver = new voPlayer.Receiver('player-container');
  receiver.addEventListener(voPlayer.ReceiverEvents.VO_OSMP_CB_CAST_STATE_CHANGED, onCastStateChanged);
  receiver.addEventListener(voPlayer.ReceiverEvents.VO_OSMP_CB_CAST_TIME_UPDATE, onCastTimeupdate);
  receiver.start();
}

window.onload = function() {
  initUI();
  initData();
};
