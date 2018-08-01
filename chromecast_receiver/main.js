
var playerDiv;
var curTimeElement_;
var totalTimeElement_;
var progressBarInnerElement_;
var progressBarThumbElement_;
var previewModeTimerElement_;
var seekingTimeoutId_;

var gReceiver;
var gPosition;
var gDuration;
var gSeekableRange;
var gIsLive;

function formatDuration_(dur) {
    dur = Math.floor(dur);
    function digit(n) { return ('00' + Math.round(n)).slice(-2); }
    var hr = Math.floor(dur / 3600);
    var min = Math.floor(dur / 60) % 60;
    var sec = dur % 60;
    if (!hr) {
        return digit(min) + ':' + digit(sec);
    } else {
        return digit(hr) + ':' + digit(min) + ':' + digit(sec);
    }
}

function getStreamType() {
    if (gIsLive) {
        if (gSeekableRange.start === 0 && gSeekableRange.end === 0) {
            return 'live';
        } else {
            return 'dvr';
        }
    } else {
        return 'vod';
    }
}

function getElementByClass_(className) {
    var element = playerDiv.querySelector(className);
    if (element) {
        return element;
    } else {
        throw Error('Cannot find element with class: ' + className);
    }
}

function addClassWithTimeout_(element, className, timeout) {
    element.classList.add(className);
    return setTimeout(function () {
        element.classList.remove(className);
    }, timeout);
}

function onPlayLoadSuccess(event) {
    // we should have total time at this point, so update the label
    // and progress bar
    var totalTime = event.totalTime;
    if (!isNaN(totalTime)) {
        totalTimeElement_.textContent =
            formatDuration_(totalTime);
    } else {
        totalTimeElement_.textContent = '';
        progressBarInnerElement_.style.width = '100%';
        progressBarThumbElement_.style.left = '100%';
    }
}

function onPlayStateChanged(event) {
    playerDiv.setAttribute('state', event.state);
}
function onPlayTimeupdate(event) {
    gPosition = event.position;
    gDuration = gReceiver.getDuration();
    gIsLive = gReceiver.isLive();
    if (gIsLive) {
        gSeekableRange = gReceiver.getSeekableRange();
    }

    // 
    var type = getStreamType();
    if (type === 'live') {
        gPosition = 1;
        gDuration = 1;
    } else if (type === 'dvr') {
        gDuration = gSeekableRange.end - gSeekableRange.start;
        gPosition = gPosition - gSeekableRange.start;
        if (gPosition > gDuration) {
            gPosition = gDuration;
        }
    }

    //
    var pct = 100 * (gPosition / gDuration);
    console.log('receiver, pos: ' + gPosition + ', dur: ' + gDuration);
    if (type === 'dvr') {
        totalTimeElement_.innerText = 'Live';
    } else if (type === 'live') {
        totalTimeElement_.innerText = 'Live';
    } else {
        curTimeElement_.innerText = formatDuration_(gPosition);
        totalTimeElement_.innerText = formatDuration_(gDuration);
    }

    progressBarInnerElement_.style.width = pct + '%';
    progressBarThumbElement_.style.left = pct + '%';
    // Handle preview mode
    previewModeTimerElement_.innerText = '' + Math.round(gDuration - gPosition);
}

function onPlaySeekStart() {
    clearTimeout(seekingTimeoutId_);
    playerDiv.classList.add('seeking');
}

function onPlaySeekEnd() {
    clearTimeout(seekingTimeoutId_);
    seekingTimeoutId_ = addClassWithTimeout_(playerDiv,
        'seeking', 3000);
}

function initUI() {
    playerDiv = document.getElementById('player');

    curTimeElement_ = getElementByClass_('.controls-cur-time');
    totalTimeElement_ = getElementByClass_('.controls-total-time');
    progressBarInnerElement_ = getElementByClass_('.controls-progress-inner');
    progressBarThumbElement_ = getElementByClass_('.controls-progress-thumb');
    previewModeTimerElement_ = getElementByClass_('.preview-mode-timer-countdown');
}

function initData() {
    gReceiver = new voPlayer.Receiver(playerDiv);
    gReceiver.addEventListener(voPlayer.ReceiverEvents.VO_OSMP_CB_CAST_LOAD_SUCCESS, onPlayLoadSuccess, null);
    gReceiver.addEventListener(voPlayer.ReceiverEvents.VO_OSMP_CB_CAST_STATE_CHANGED, onPlayStateChanged, null);
    gReceiver.addEventListener(voPlayer.ReceiverEvents.VO_OSMP_CB_CAST_TIME_UPDATE, onPlayTimeupdate, null);
    gReceiver.addEventListener(voPlayer.ReceiverEvents.VO_OSMP_CB_CAST_SEEK_START, onPlaySeekStart, null);
    gReceiver.addEventListener(voPlayer.ReceiverEvents.VO_OSMP_CB_CAST_SEEK_END, onPlaySeekEnd, null);

    gReceiver.start();
}

window.onload = function () {
  initUI();
  initData();
};
