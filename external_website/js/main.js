var removeClass = function(who, what) {
  var $who = document.querySelector(who + '.' + what)
  $who && $who.classList && $who.classList.remove(what)
}

var addClass = function(who, what) {
  var $who = document.querySelector(who)
  $who && $who.classList && $who.classList.add(what)
}

var CommonUI = {};

// Title: Init functions
CommonUI.initVariable = function() {
    this.browser = getBrowserInfo().browser;
    printLog('browser: ' + this.browser);

    // flags which could be interactive with Website
    this.flagEnableReplay = false;

    // Global variables
    this.context = {};
    this.player_ = null;

    // Golbal flags
    this.flagPlayerInited = false;

    // UI Controls
    this.vopPlayer = null;
    this.vopTooltip = null;
    this.vopTooltipBg = null;
    this.vopTooltipText = null;
    this.vopControlBar = null;
    this.vopProgressBar = null;
    this.vopLoadProgress = null;
    this.vopPlayProgress = null;
    this.vopHoverProgress = null;
    this.vopScrubberContainer = null;
    this.vopVolumeSlider = null;
    this.vopVolumeSliderHandle = null;

    this.vopPlayBtn = null;
    this.vopMuteBtn = null;
    this.vopTimeText = null;
    this.vopSubtitlesBtn = null;
    this.vopSettingsBtn = null;
    this.vopFullscreenBtn = null;
    this.vopPanel = null;
    this.vopPanelMenu = null;

    this.vopSpinner = null;

    // UI Slider Background
    this.colorList_adProgress = ['orange', 'rgba(192,192,192,0.3)'];
    this.colorList_volume = ['#ccc', 'rgba(192,192,192,0.3)'];

    this.playIcon = '&#xe037;';
    this.pauseIcon = 'pause';
    this.replayIcon = 'replay';
    this.volumeDownIcon = '&#xe04d';
    this.volumeUpIcon = '&#xe050';
    this.volumeZeroIcon = '&#xe04e';
    this.volumeMutedIcon = '&#xe04f';
    this.fullScreenIcon = "fullscreen";
    this.fullScreenExitIcon = "fullscreen_exit";

    // flag
    this.timerHideControlBar = null;
    this.timerDblClick = null;
    this.clicks = 0;

    // flags reference variable of progress bar
    this.progressBarContext = {
        mousedown: false,
        pausedBeforeMousedown: true,
        endedBeforeMousedown: false,
        posBeforeMousedown: 0,
        timer: null,
        movePos: 0,

        flagSeekFromUI: false
    };
    this.flagThumbnailMode = false;

    // flags reference variable of volume bar
    this.flagVolumeSliderMousedown = false;
    this.valueVolumeMovePosition = 0;

    // menu context
    this.subtitlesMenuContext = {
        currMenu: 'none', // could be 'none','main_menu'
        subtitleTracks: [],
        currSubtitleId: '' // empty string means don't show subtitle
    };

    this.settingMenuContext = {
        currMenu: 'none', // could be 'none','main_menu','quality_menu','audioTrack_menu', 'fcc_menu';
        qualityList: [],
        isQualityAuto: true,
        currQualityId: '-1',

        audioTrackList: [],
        currAudioTrackId: '-1',

        // FCC settings menu
        isEnableFCC: true,
        fccPropertyList: [{
            // white/black(default)/red/green/blue/yellow/magenta/cyan
            name: 'background_color',
            values: ['white', 'black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan'],
            enable: false,
            currValue: 'black'
        }, {
            name: 'background_opacity',
            values: ['0%', '25%', '50%', '75%', '100%'],
            enable: false,
            currValue: '100%'
        }, {
            // white/black(default)/red/green/blue/yellow/magenta/cyan
            name: 'font_color',
            values: ['white', 'black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan'],
            enable: false,
            currValue: 'black'
        }, {
            name: 'font_opacity',
            values: ['0%', '25%', '50%', '75%', '100%'],
            enable: false,
            currValue: '100%'
        }, {
            // Arial(default)/Courier/Times New Roman/Helvetica/Dom/Coronet/Gothic
            name: 'font_family',
            values: ['Arial', 'Courier', 'Times New Roman', 'Helvetica', 'Dom', 'Coronet', 'Gothic'],
            enable: false,
            currValue: 'Arial'
        }, {
            // none/dropshadow/raised(default)/depressed/uniform
            name: 'font_edge_type',
            values: ['none', 'leftDropShadow', 'rightDropShadow', 'raised', 'depressed', 'uniform'],
            enable: false,
            currValue: 'none'
        }, {
            // white/black/red/green/blue(default)/yellow/magenta/cyan
            name: 'font_edge_color',
            values: ['white', 'black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan'],
            enable: false,
            currValue: 'black'
        }, {
            name: 'font_edge_opacity',
            values: ['0%', '25%', '50%', '75%', '100%'],
            enable: false,
            currValue: '100%'
        }, {
            name: 'font_size',
            values: ['50%', '75%', '100%', '150%', '200%', '300%', '400%'],
            enable: false,
            currValue: '100%'
        }, {
            name: 'font_bold',
            values: ['true', 'false'],
            enable: false,
            currValue: 'false'
        }, {
            name: 'font_underline',
            values: ['true', 'false'],
            enable: false,
            currValue: 'false'
        }, {
            name: 'font_italic',
            values: ['true', 'false'],
            enable: false,
            currValue: 'false'
        }, {
            // white/black/red/green/blue(default)/yellow/magenta/cyan
            name: 'window_color',
            values: ['white', 'black', 'red', 'green', 'blue', 'yellow', 'magenta', 'cyan'],
            enable: false,
            currValue: 'green'
        }, {
            name: 'window_color_opacity',
            values: ['0%', '25%', '50%', '75%', '100%'],
            enable: false,
            currValue: '50%'
        }, {
            name: 'bounding_box',
            values: ['Left', 'Top', 'Right', 'Bottom'],
            enable: false,
            currValue: [10, 10, 10, 10]
        }, {
            name: 'horizontal_position',
            values: ['left', 'center', 'right'],
            enable: false,
            currValue: 'left'
        }]
    };
};

CommonUI.initUI = function() {
    this.vopPlayer = document.querySelector('.html5-video-player');
    this.vopTooltip = document.querySelector('.vop-tooltip');
    this.vopTooltipBg = document.querySelector('.vop-tooltip-bg');
    this.vopTooltipText = document.querySelector('.vop-tooltip-text');

    this.vopControlBar = document.querySelector('.vop-control-bar');
    this.vopProgressBar = document.querySelector('.vop-progress-bar');
    this.vopLoadProgress = document.querySelector('.vop-load-progress');
    this.vopPlayProgress = document.querySelector('.vop-play-progress');
    this.vopHoverProgress = document.querySelector('.vop-hover-progress');

    this.vopScrubberContainer = document.querySelector('.vop-scrubber-container');
    this.uiConsole = document.getElementById('idConsole');

    this.vopPlayBtn = document.querySelector('.vop-play-button');
    this.vopMuteBtn = document.querySelector('.vop-mute-button');
    this.vopTimeText = document.querySelector('.vop-time-text');
    this.vopVolumeSlider = document.querySelector('.vop-volume-slider');
    this.vopVolumeSliderHandle = document.querySelector('.vop-volume-slider-handle');
    this.vopSubtitlesBtn = document.querySelector('.vop-subtitles-button');
    this.vopSettingsBtn = document.querySelector('.vop-settings-button');
    this.vopFullscreenBtn = document.querySelector('.vop-fullscreen-button');

    this.vopSettingsMenu = document.querySelector('.vop-settings-menu');
    this.vopPanel = this.vopSettingsMenu.querySelector('.vop-panel');
    this.vopPanelMenu = this.vopSettingsMenu.querySelector('.vop-panel-menu');

    this.vopSpinner = document.querySelector('.vop-spinner');

    // Workaround for Safari blur
    this.vopSubtitlesBtn.setAttribute('tabindex', '0');
    this.vopSettingsBtn.setAttribute('tabindex', '0');

    // setting ui data
    this.vopPlayBtn.innerHTML = this.playIcon;
    this.vopPlayBtn.title = 'play';
    this.vopMuteBtn.innerHTML = this.volumeUpIcon;
    this.vopFullscreenBtn.innerHTML = this.fullScreenIcon;
    this.vopFullscreenBtn.title = 'fullscreen';
    this.vopSubtitlesBtn.style.display = 'none';
};

CommonUI.initUIEventListeners = function() {
    // new
    this.vopPlayer.onmouseenter = this.onPlayerMouseenter.bind(this);
    this.vopPlayer.onmousemove = this.onPlayerMousemove.bind(this);
    this.vopPlayer.onmouseleave = this.onPlayerMouseleave.bind(this);

    this.vopPlayer.onclick = this.onPlayerClick.bind(this);

    this.vopProgressBar.onmousedown = this.onProgressBarMousedown.bind(this);
    this.vopProgressBar.onmousemove = this.onProgressBarMousemove.bind(this);
    this.vopProgressBar.onmouseleave = this.onProgressBarMouseleave.bind(this);

    this.vopControlBar.onclick = this.onChromeBottomClick.bind(this);
    this.vopPlayBtn.onclick = this.onPlayButtonClick.bind(this);
    this.vopMuteBtn.onclick = this.onMuteButtonClick.bind(this);
    this.vopVolumeSlider.onmousedown = this.onVolumeSliderMousedown.bind(this);

    this.vopSubtitlesBtn.onclick = this.onSubtitlesClick.bind(this);
    this.vopSettingsBtn.onclick = this.onSettingClick.bind(this);
    this.vopFullscreenBtn.onclick = this.onFullscreenClick.bind(this);

    this.vopPlayBtn.onmousemove = this.onControlMousemove.bind(this);
    this.vopMuteBtn.onmousemove = this.onControlMousemove.bind(this);
    this.vopVolumeSlider.onmousemove = this.onControlMousemove.bind(this);
    this.vopSettingsBtn.onmousemove = this.onControlMousemove.bind(this);
    this.vopFullscreenBtn.onmousemove = this.onControlMousemove.bind(this);

    // don't route 'click' event from panel to its parent div
    this.vopSettingsMenu.onblur = this.onPopupMenuBlur.bind(this);
    this.vopPanel.onclick = this.onPanelClick.bind(this);
    this.vopPanelMenu.onblur = this.onPanelMenuBlur.bind(this);
};
CommonUI.resizePlayer = function() {
    var v = document.querySelector('.player');
    var dstWidth = 0;
    var dstHeight = 0;
    if (isFullscreen()) {
        dstWidth = v.clientWidth;
        dstHeight = v.clientHeight;
    } else {
        if (v.clientWidth > 720) {
            dstWidth = 720;
            dstHeight = dstWidth * 0.5625;
        } else {
            dstWidth = v.clientWidth;
            dstHeight = dstWidth * 0.5625;
        }
    }
    this.vopPlayer.style.width = dstWidth.toString() + 'px';
    this.vopPlayer.style.height = dstHeight.toString() + 'px';
    if (this.flagPlayerInited) {
        this.updateProgressBarUI();
        this.player_.resize(dstWidth, dstHeight);
    }
    // update full screen icon
    this.updateFullscreenIcon();
}
CommonUI.resetUI = function() {
    this.vopLoadProgress.style.transform = 'scaleX(0)';
    this.vopPlayProgress.style.transform = 'scaleX(0)';
    this.vopScrubberContainer.style.transform = 'translateX(0px)';
    this.vopTimeText.innerText = '00:00/00:00';

    // restore UI if it's playing ad
    this.vopProgressBar.style.pointerEvents = 'auto';
    this.vopScrubberContainer.style.display = 'block';
    // button's default 'inline-block' by default, see https://www.w3.org/TR/CSS21/sample.html
    this.vopSettingsBtn.style.display = 'inline-block';

    this.updateContentVolumeBarUI(false, 1)
};

CommonUI.enterFullscreen = function() {
    printLog('+h5EnterFullscreen', LOG_DEBUG);

    var v = document.querySelector('.html5-video-player');
    var requestFullscreen =
        v.requestFullscreen ||
        v.requestFullScreen ||
        v.webkitRequestFullscreen ||
        v.webkitRequestFullScreen ||
        v.mozRequestFullscreen ||
        v.mozRequestFullScreen ||
        v.msRequestFullscreen ||
        v.msRequestFullScreen;

    if (requestFullscreen) {
        requestFullscreen.call(v);
    } else {
        v = document.querySelector('.vop-video');
        if (v && v.webkitEnterFullscreen) {
            v.webkitEnterFullscreen();
        }
    }
};

CommonUI.leaveFullscreen = function() {
    printLog('+h5LeaveFullscreen', LOG_DEBUG);

    var v;
    var cancelFullscreen =
        document.exitFullscreen ||
        document.exitFullScreen ||
        document.webkitCancelFullScreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen ||
        document.msExitFullscreen;

    if (cancelFullscreen) {
        cancelFullscreen.call(document);
    } else {
        v = document.querySelector('.vop-video');
        if (v && v.webkitExitFullscreen) {
            v.webkitExitFullscreen();
        }
    }
};

CommonUI.closePlayer = function() {
    if (this.player_) {
        this.player_.close();
    }

    this.flagPlayerInited = false;
};

CommonUI.initPlayer = function(config) {
    this.player_ = new voPlayer.Player(this.vopPlayer);
    this.player_.init(config);

    this.player_.addEventListener(voPlayer.events.VO_OSMP_SRC_CB_OPEN_FINISHED, this.onOpenFinished.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_COMPLETE, this.onPlayComplete.bind(this), this.context);

    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_STARTED, this.onPlayStarted.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_PAUSED, this.onPlayPaused.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_WAITING, this.onPlayWaiting.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_PLAYING, this.onPlayPlaying.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_PLAY_TIME_UPDATED, this.onPlayTimeUpdated.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_SEEK_START, this.onSeekStart.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_SEEK_COMPLETE, this.onSeekComplete.bind(this), this.context);

    this.player_.addEventListener(voPlayer.events.VO_OSMP_SRC_ADAPTIVE_STREAMING_INFO_EVENT_BITRATE_CHANGE, this.onBitrateChanged.bind(this), this.context);

    this.player_.addEventListener(voPlayer.events.VO_OSMP_SRC_CB_PROGRAM_CHANGED, this.onProgramChanged.bind(this), this.context);
};

CommonUI.open = function(stream) {
    this.stream_ = stream;
    this.player_.open(stream);
};

CommonUI.replay = function() {
    this.open(this.stream_);
};

// Title: UI Cmd
CommonUI.onPlayButtonClick = function() {
    if (!this.flagPlayerInited) {
        return;
    }

    var currPaused = this.player_.isPaused();
    var currEnded = this.player_.isEnded();

    // do replay
    if (currEnded) {
        this.replay();
    } else {
        var newPaused;
        // execute ui cmd
        if (currPaused) {
            this.player_.play();
            newPaused = false;
        } else {
            this.player_.pause();
            newPaused = true;
        }

        // update ui
        this.updatePlayBtnUI(newPaused, currEnded);

        // don't show buffering icon when paused
        if (newPaused) {
            this.vopSpinner.style.display = 'none';
        }
    }
};

CommonUI.onPlayerMouseenter = function() {
    if (!this.flagPlayerInited) {
        return;
    }
    removeClass('.html5-video-player', 'vop-autohide');
};

CommonUI.onPlayerMousemove = function() {
    this.resetAutohideAction();
};

CommonUI.onPlayerMouseleave = function() {
    if (!this.flagPlayerInited) {
        return;
    }

    var paused = this.player_.isPaused();
    if (!paused && !this.progressBarContext.mousedown && !this.flagVolumeSliderMousedown) {
        addClass('.html5-video-player', 'vop-autohide');
        this.vopTooltip.style.display = 'none';
    }
};

CommonUI.onPlayerClick = function(e) {
    if (!this.flagPlayerInited) {
        return;
    }

    //
    this.clicks++; //count clicks
    if (this.clicks === 1) {
        this.timerDblClick = setTimeout(function() {
            printLog('+Single click', LOG_DEBUG);
            this.clicks = 0; //after action performed, reset counter

            if (this.flagAdStarted && this.flagIsLinearAd) {
                return;
            }
            this.onPlayButtonClick();
        }.bind(this), 300);
    } else {
        printLog('+Dblclick', LOG_DEBUG);
        clearTimeout(this.timerDblClick); //prevent single-click action
        this.clicks = 0; //after action performed, reset counter

        if (this.flagAdStarted && this.flagIsLinearAd) {
            return;
        }
        this.onFullscreenClick();
    }
};

CommonUI.doEnterThumbnailMode = function() {
    printLog('+doEnterThumbnailMode', LOG_DEBUG);
    if (!this.flagThumbnailMode) {
        // need to pause content first before starting a seek operation.
        if (!this.progressBarContext.pausedBeforeMousedown) {
            this.player_.pause();

            var paused = true;
            var ended = this.player_.isEnded();
            this.updatePlayBtnUI(paused, ended);
        }

        this.progressBarContext.timer = null;
        this.flagThumbnailMode = true;
    }
};

CommonUI.doProcessThumbnailMove = function() {
    // for further action, you can add thumbnail popup here.
};

CommonUI.doProcessThumbnailUp = function() {
    // for further action, you can add thumbnail ended event here.
};

CommonUI.onProgressBarMousedown = function(e) {
    printLog('+onProgressBarMousedown', LOG_DEBUG);
    e.preventDefault();
    e.stopPropagation();
    if (!this.flagPlayerInited) {
        return;
    }

    this.captureProgressBarMouseEvents();

    this.progressBarContext.mousedown = true;
    this.progressBarContext.pausedBeforeMousedown = this.player_.isPaused();
    this.progressBarContext.endedBeforeMousedown = this.player_.isEnded();
    this.progressBarContext.posBeforeMousedown = this.player_.getPosition();
    this.flagThumbnailMode = false;
    var self = this;
    this.progressBarContext.timer = setTimeout(function() {
        self.doEnterThumbnailMode();
    }, 500);

    // update progress bar ui
    this.progressBarContext.movePos = this.getProgressMovePosition(e);
    this.updateProgressBarUI();
    this.updateProgressBarHoverUI();
};

CommonUI.onProgressBarMousemove = function(e) {
    if (!this.flagPlayerInited) {
        return;
    }

    e.stopPropagation();
    this.removeAutohideAction();

    // if mouse down, just return
    if (this.progressBarContext.mousedown) {
        return;
    }

    // part - process
    // process normal mouse move logic
    this.progressBarContext.movePos = this.getProgressMovePosition(e);

    // part - output
    this.updateProgressBarHoverUI();
    this.updateTooltipUI(e);
};

CommonUI.onProgressBarMouseleave = function() {
    printLog('+onProgressBarMouseleave', LOG_DEBUG);
    this.vopTooltip.style.display = 'none';
};

CommonUI.captureProgressBarMouseEvents = function() {
    CommonUI.newProgressBarMousemove = this.docProgressBarMousemove.bind(this);
    CommonUI.newProgressBarMouseup = this.docProgressBarMouseup.bind(this);

    document.addEventListener('mousemove', CommonUI.newProgressBarMousemove, true);
    document.addEventListener('mouseup', CommonUI.newProgressBarMouseup, true);
};

CommonUI.releaseProgressBarMouseEvents = function() {
    document.removeEventListener('mousemove', CommonUI.newProgressBarMousemove, true);
    document.removeEventListener('mouseup', CommonUI.newProgressBarMouseup, true);
};

CommonUI.docProgressBarMousemove = function(e) {
    printLog('+docProgressBarMousemove', LOG_DEBUG);

    var movePos = this.getProgressMovePosition(e);
    if (this.progressBarContext.movePos === movePos) {
        printLog('skip move operation, movePos: ' + movePos, LOG_DEBUG);
        return;
    }

    this.doEnterThumbnailMode();
    this.doProcessThumbnailMove();

    this.progressBarContext.movePos = movePos;
    this.updateProgressBarUI();
    this.updateProgressBarHoverUI();
    this.updateTooltipUI(e);
};

CommonUI.docProgressBarMouseup = function(e) {
    printLog('+docProgressBarMouseup', LOG_DEBUG);
    this.releaseProgressBarMouseEvents();
    e.preventDefault();

    if (this.flagThumbnailMode) {
        // thumbnail mode click event
        this.doProcessThumbnailUp();
    } else {
        // plain click event
        if (this.progressBarContext.timer) {
            // it's quick click, don't need to pause
            clearTimeout(this.progressBarContext.timer);
            this.progressBarContext.timer = null;
        }
    }

    // update ui first
    this.progressBarContext.movePos = this.getProgressMovePosition(e);
    this.updateProgressBarUI();
    this.updateProgressBarHoverUI();

    if (this.progressBarContext.posBeforeMousedown != this.progressBarContext.movePos) {
        printLog('Begin seek to: ' + this.progressBarContext.movePos, LOG_DEBUG);
        this.progressBarContext.flagSeekFromUI = true;
        this.player_.setPosition(this.progressBarContext.movePos);
    }

    this.progressBarContext.mousedown = false;
};

CommonUI.getProgressMovePosition = function(e) {
    // part - input
    var rect = this.vopProgressBar.getBoundingClientRect();

    // part - logic process
    var offsetX = e.clientX - rect.left;
    if (offsetX < 0) {
        offsetX = 0;
    } else if (offsetX > rect.width) {
        offsetX = rect.width;
    }

    // update time progress scrubber button, need to identify stream type(can be vod, live, live dvr)
    var streamInfo = this.getStreamInfo();
    var duration = streamInfo.duration;

    return (offsetX / rect.width) * duration;
};

CommonUI.updateProgressBarUI = function() {
    if (!this.flagPlayerInited) {
        return;
    }

    // part - input
    var paused = this.player_.isPaused();
    var ended = this.player_.isEnded();

    var streamInfo = this.getStreamInfo();

    // WA
    if (streamInfo.type === 'vod' && (isNaN(streamInfo.position) || isNaN(streamInfo.duration))) {
        return;
    }

    // part - logic process
    var uiPosition;
    var uiDuration;
    var tDisplayText = '';
    if (streamInfo.type === 'live') {
        tDisplayText = 'Live';
    } else if (streamInfo.type === 'dvr') {
        uiDuration = streamInfo.duration;
        if (this.progressBarContext.mousedown) {
            uiPosition = this.progressBarContext.movePos;
        } else {
            uiPosition = streamInfo.position;
        }

        this.vopLoadProgress.style.transform = 'scaleX(' + uiPosition / uiDuration + ')';
        this.vopPlayProgress.style.transform = 'scaleX(' + uiPosition / uiDuration + ')';

        // update time progress scrubber button
        this.vopScrubberContainer.style.transform = 'translateX(' + ((uiPosition / uiDuration) * this.vopProgressBar.clientWidth).toString() + 'px)';
        tDisplayText = 'Live';
    } else {
        var uiBufferedPos;
        uiDuration = streamInfo.duration;

        if (this.progressBarContext.mousedown) {
            uiPosition = this.progressBarContext.movePos;
        } else {
            uiPosition = streamInfo.position;
        }

        // part - output, update ui
        // update time progress bar
        if (this.progressBarContext.mousedown) {
            uiBufferedPos = uiPosition;
        } else {
            // get buffered length from current position
            var currBuffered = this.player_.getValidBufferDuration('video');
            if (this.player_.getQualityLevels().length == 0) {
                currBuffered = this.player_.getValidBufferDuration('audio');
            }
            uiBufferedPos = uiPosition + (isNaN(currBuffered) ? 0 : currBuffered);
            uiBufferedPos = (uiBufferedPos > uiDuration) ? uiDuration : uiBufferedPos;
        }
        this.vopLoadProgress.style.transform = 'scaleX(' + uiBufferedPos / uiDuration + ')';
        this.vopPlayProgress.style.transform = 'scaleX(' + uiPosition / uiDuration + ')';

        // update time progress scrubber button
        this.vopScrubberContainer.style.transform = 'translateX(' + ((uiPosition / uiDuration) * this.vopProgressBar.clientWidth).toString() + 'px)';

        // update time display label
        var c = timeToString(uiPosition);
        var d = timeToString(uiDuration);
        tDisplayText = c + '/' + d;
    }

    this.vopTimeText.innerText = tDisplayText;

    //
    if (streamInfo.type === 'live') {
        this.vopProgressBar.style.display = 'none';
    } else {
        this.vopProgressBar.style.display = 'block';
    }
};

CommonUI.updateProgressBarHoverUI = function() {
    var position = this.player_.getPosition();
    var duration = this.player_.getDuration();
    if (this.progressBarContext.movePos <= position || this.progressBarContext.mousedown) {
        this.vopHoverProgress.style.transform = 'scaleX(0)';
    } else {
        var rect = this.vopProgressBar.getBoundingClientRect();
        var offsetX = (position / duration) * rect.width;
        this.vopHoverProgress.style.left = offsetX + 'px';
        this.vopHoverProgress.style.transform = 'scaleX(' + (this.progressBarContext.movePos - position) / duration + ')';
    }
};

CommonUI.getTooltipOffsetX = function(e, tooltipWidth) {
    // part - input
    // bounding client rect can return the progress bar's rect relative to current page.
    var rect = this.vopProgressBar.getBoundingClientRect();
    var leftMin = 12;
    var rightMax = 12 + rect.width;

    // part - logic process
    var offsetToProgressBar = (e.clientX - rect.left);
    var offsetToVideo = offsetToProgressBar + 12;

    var tooltipLeft_RelativeToVideo = offsetToVideo - tooltipWidth / 2;
    var tooltipRight_RelativeToVideo = offsetToVideo + tooltipWidth / 2;

    if (tooltipLeft_RelativeToVideo < leftMin) {
        tooltipLeft_RelativeToVideo = leftMin;
    } else if (tooltipRight_RelativeToVideo > rightMax) {
        tooltipLeft_RelativeToVideo = rightMax - tooltipWidth;
    }

    return tooltipLeft_RelativeToVideo;
}

CommonUI.updateTooltipUI = function(e) {
    var streamInfo = this.getStreamInfo();
    if (isNaN(streamInfo.position) || isNaN(streamInfo.duration)) {
        return;
    }

    // update tooltip offset
    if (streamInfo.type === 'dvr') {
        var strTime = timeToString((streamInfo.duration - this.progressBarContext.movePos));
        this.vopTooltipText.innerText = '-' + strTime;
    } else {
        this.vopTooltipText.innerText = timeToString(this.progressBarContext.movePos);
    }

    //
    this.vopTooltip.style.left = '10000px';
    this.vopTooltip.style.display = 'block';

    var tooltipWidth = this.vopTooltip.clientWidth;
    var offsetX = this.getTooltipOffsetX(e, tooltipWidth);
    this.vopTooltip.style.left = offsetX.toString() + 'px';
};

CommonUI.onChromeBottomClick = function(e) {
    e.stopPropagation();
};

CommonUI.onMuteButtonClick = function() {
    if (!this.flagPlayerInited) {
        return;
    }
    var muted = this.player_.isMuted();
    var volume = this.player_.getVolume();

    if (volume === 0) {
        if (muted) {
            this.player_.unmute();
            muted = false;
        }

        // If the player is muted, and volume is 0,
        // in this situation, we will restore volume to 0.1
        volume = 0.1;
        this.player_.setVolume(volume);
    } else {
        if (muted) {
            this.player_.unmute();
            muted = false;
        } else {
            this.player_.mute();
            muted = true;
        }
    }
    this.updateContentVolumeBarUI(muted, volume);
};

CommonUI.onControlMousemove = function(e) {
    e.stopPropagation();
    this.removeAutohideAction();
};

CommonUI.onPopupMenuBlur = function(e) {
    printLog('+onPopupMenuBlur', LOG_DEBUG);
    if (this.browser === 'IE') {
        var nextFocus = document.activeElement;
        if (this.subtitlesMenuContext.currMenu !== 'none') {
            if (nextFocus.className.indexOf('vop-panel-title') !== -1 ||
                nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
                nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
                nextFocus.className.indexOf('vop-menuitem-toggle-checkbox') !== -1 ||
                nextFocus.className.indexOf('vop-subtitles-button') !== -1) {
                // do nothing
            }
            else {
                this.onSubtitlesClick();
            }
        } else if (this.settingMenuContext.currMenu !== 'none') {
            if (nextFocus &&
                nextFocus.className.indexOf('vop-panel-title') !== -1 ||
                nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
                nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
                nextFocus.className.indexOf('vop-menuitem-toggle-checkbox') !== -1 ||
                nextFocus.className.indexOf('vop-settings-button') !== -1) {
                // do nothing
            }
            else {
                this.onSettingClick();
            }
        }
    }
};

CommonUI.onPanelClick = function(e) {
    e.stopPropagation();
};

CommonUI.onPanelMenuBlur = function(e) {
    if (this.browser === 'IE') {
        prevFocus = e.target;
        nextFocus = document.activeElement;
        if (nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-toggle-checkbox') !== -1 ||
            nextFocus.className.indexOf('vop-popup') !== -1 ||
            nextFocus === this.vopSubtitlesBtn) {
            // do nothing
        } else {
            this.onSubtitlesClick();
        }
    }
};

CommonUI.onVolumeSliderMousedown = function(e) {
    if (!this.flagPlayerInited) {
        return;
    }

    printLog('+onVolumeSliderMousedown', LOG_DEBUG);
    this.captureVolumeSliderMouseEvents();
    e.preventDefault();
    e.stopPropagation();

    this.flagVolumeSliderMousedown = true;

    this.docVolumeSliderMousemove(e);
};

CommonUI.onSubtitlesClick = function(e) {
    // Part - process
    if (this.settingMenuContext.currMenu !== 'none') {
        this.destroySettingsMenu();
    }

    if (this.subtitlesMenuContext.currMenu === 'none') {
        this.createSubtitlesMenu();
    } else if (this.subtitlesMenuContext.currMenu === 'main_menu') {
        if (this.vopSettingsMenu.style.display === 'none') {
            this.vopSettingsMenu.style.display = 'block';
            var elem_child = this.vopPanelMenu.children;
            elem_child[0].focus();
        } else {
            this.vopSettingsMenu.style.display = 'none';
        }
    }
};

CommonUI.onSettingClick = function() {
    if (!this.flagPlayerInited) {
        return;
    }

    printLog('+onSettingClick, currMenu: ' + this.settingMenuContext.currMenu, LOG_DEBUG);

    // Part - process
    if (this.subtitlesMenuContext.currMenu !== 'none') {
        this.destroySettingsMenu();
    }

    if (this.settingMenuContext.currMenu === 'none') {
        this.createSettingsMenu();
    } else if (this.settingMenuContext.currMenu === 'main_menu') {
        if (this.vopSettingsMenu.style.display === 'none') {
            this.vopSettingsMenu.style.display = 'block';
            var elem_child = this.vopPanelMenu.children;
            elem_child[0].focus();
        } else {
            this.vopSettingsMenu.style.display = 'none';
        }
    } else if (this.settingMenuContext.currMenu === 'quality_menu' ||
        this.settingMenuContext.currMenu === 'audioTrack_menu') {
        this.destroySettingsMenu();
    }
};

CommonUI.onFullscreenClick = function() {
    printLog('+onFullscreenClick', LOG_DEBUG);
    if (isFullscreen()) {
        this.leaveFullscreen();
    } else {
        this.enterFullscreen();
        this.resetAutohideAction();
    }
};

// Title: voPlayer event callbacks
CommonUI.onOpenFinished = function() {
    this.flagPlayerInited = true;

    // update quality menu
    this.settingMenuContext.qualityList = [];

    var qualityLevels = this.player_.getQualityLevels();
    printLog('Quality Levels: ' + qualityLevels.length, LOG_DEBUG);
    if (qualityLevels.length > 0) {
        var currQuality = this.player_.getCurrentQualityLevel();
        var tmpQualitys = [];
        for (var i = 0; i < qualityLevels.length; ++i) {
            var quality = qualityLevels[i];
            tmpQualitys.push({
                id: quality.id,
                bitrate: quality.bandwidth
            });
        }
        tmpQualitys.sort(function(a, b) {
            return b.bitrate - a.bitrate;
        });
        tmpQualitys.forEach(function(quality) {
            var bitrate;
            if (quality.bitrate) {
                bitrate = Math.round(quality.bitrate / 1000) + ' kbps';
            } else {
                bitrate = 'Unknown';
            }

            this.settingMenuContext.qualityList.push({
                id: quality.id,
                bitrate: bitrate
            });
        }.bind(this));

        if (qualityLevels.length > 1) {
            this.settingMenuContext.qualityList.push({
                id: '-1',
                bitrate: 'Auto'
            });
        }
        if (currQuality) {
            this.settingMenuContext.currQualityId = (currQuality ? currQuality.id : '-1');
        } else {
            this.settingMenuContext.currQualityId = this.settingMenuContext.qualityList[0].id;
        }
        this.settingMenuContext.isQualityAuto = true;
    }

    // update audio track menu
    this.settingMenuContext.audioTrackList = [];

    var audioTracks = this.player_.getAudioTracks();
    printLog('Audio Tracks: ' + audioTracks.length, LOG_DEBUG);
    if (audioTracks.length > 0) {
        var currAudioTrack = this.player_.getCurrentAudioTrack();
        audioTracks.forEach(function(track) {
            var lang = track.id + '_' + track.lang;
            this.settingMenuContext.audioTrackList.push({
                id: track.id,
                lang: lang
            });
        }.bind(this));
        if (currAudioTrack) {
            this.settingMenuContext.currAudioTrackId = (currAudioTrack ? currAudioTrack.id : '-1');
        } else {
            this.settingMenuContext.currAudioTrackId = this.settingMenuContext.audioTrackList[0].id;
        }
    }

    // update progress bars
    this.vopControlBar.style.display = 'block';

    // update volume bar
    var muted = this.player_.isMuted();
    var volume = this.player_.getVolume();
    this.updateContentVolumeBarUI(muted, volume);

    // update play/pause button
    var paused = this.player_.isPaused();
    this.updatePlayBtnUI(paused, false);
};

CommonUI.onPlayComplete = function() {
    this.updatePlayBtnUI(true, true);

    this.vopSpinner.style.display = 'none';
    //
    this.progressBarContext.movePos = this.player_.getPosition();
    this.updateProgressBarUI();

    removeClass('.html5-video-player', 'vop-autohide');

    if (this.flagEnableReplay) {
        this.onPlayButtonClick();
    }
};

CommonUI.onPlayStarted = function() {
    this.updatePlayBtnUI(false, false);
};

CommonUI.onPlayPaused = function() {
    printLog('+onPlayPaused', LOG_DEBUG);
    var paused = true;
    var ended = this.player_.isEnded();
    this.updatePlayBtnUI(paused, ended);
};

CommonUI.onPlayWaiting = function() {
    printLog('+onPlayWaiting', LOG_DEBUG);
    this.vopSpinner.style.display = 'block';
};

CommonUI.onPlayPlaying = function() {
    printLog('+onPlayPlaying', LOG_DEBUG);
    this.vopSpinner.style.display = 'none';
};

CommonUI.onSeekStart = function() {
    printLog('+onSeekStart', LOG_DEBUG);
    this.vopSpinner.style.display = 'block';
};

CommonUI.onSeekComplete = function() {
    var position = this.player_.getPosition();
    printLog('+onSeekComplete, pos: ' + position, LOG_DEBUG);

    this.vopSpinner.style.display = 'none';

    if (this.progressBarContext.flagSeekFromUI === true) {
        this.progressBarContext.flagSeekFromUI = false;
        if (!this.progressBarContext.pausedBeforeMousedown || this.progressBarContext.endedBeforeMousedown) {
            this.player_.play();

            // update ui
            var paused = false;
            var ended = this.player_.isEnded();
            this.updatePlayBtnUI(paused, ended);
        }
    }
};

CommonUI.onBitrateChanged = function(e) {
    if (e.mediaType === 'audio') {
        var track = this.player_.getCurrentAudioTrack();

    } else if (e.mediaType === 'video') {
        for (var i = 0; i < this.settingMenuContext.qualityList.length; i++) {
            var quality = this.settingMenuContext.qualityList[i];
            if (quality.id === e.newQuality) {
                this.settingMenuContext.currQualityId = quality.id;
                break;
            }
        }
        printLog('onBitrateChanged, video: ' + this.settingMenuContext.currQualityId, LOG_DEBUG);
        this.updateQualityMenuUI();
    }
};

CommonUI.onProgramChanged = function(e) {
    printLog('+onProgramChanged', LOG_DEBUG);

    this.subtitlesMenuContext.subtitleTracks = [];
    var sTracks = this.player_.getSubtitleTracks();
    if (sTracks.length > 0) {
        for (var i = 0; i < sTracks.length; i++) {
            var sTrack = sTracks[i];
            printLog('Found subtitle, id: ' + sTrack.id + ', lang: ' + sTrack.lang, LOG_DEBUG);
            this.subtitlesMenuContext.subtitleTracks.push({
                id: sTrack.id,
                lang: sTrack.lang
            });
        }

        var currTrack = this.player_.getCurrentSubtitleTrack();
        if (currTrack) {
            this.subtitlesMenuContext.currSubtitleId = currTrack.id;
        }
        printLog('Found default subtitle track id: ' + this.subtitlesMenuContext.currSubtitleId, LOG_DEBUG);

        this.vopSubtitlesBtn.style.display = 'inline-block';
    } else {
        this.vopSubtitlesBtn.style.display = 'none';
    }
};

CommonUI.onPlayTimeUpdated = function() {
    //printLog('+onPlayTimeUpdated', LOG_DEBUG);

    // Sometime, the timeupdate will trigger after we mouse down on the progress bar,
    // in this situation, we won't update progress bar ui.
    if (this.progressBarContext.mousedown) {

    } else {
        this.updateProgressBarUI();
        this.updateProgressBarHoverUI();
    }
};

// Title: help functions
CommonUI.removeAutohideAction = function() {
    removeClass('.html5-video-player', 'vop-autohide');
    if (this.timerHideControlBar) {
        clearTimeout(this.timerHideControlBar);
        this.timerHideControlBar = null;
    }
};

CommonUI.addAutohideAction = function() {

    this.timerHideControlBar = setTimeout(function() {
        this.onPlayerMouseleave();
    }.bind(this), 3000);
};

CommonUI.resetAutohideAction = function() {
    if (!this.flagPlayerInited) {
        return;
    }
    this.removeAutohideAction();
    this.addAutohideAction();
};

CommonUI.getStreamInfo = function() {
    var ret = {};

    var position = this.player_.getPosition();
    var isStreamLive = this.player_.isLive();
    var seekableRange = this.player_.getSeekableRange();
    if (isStreamLive) {
        if (seekableRange.start === 0 && seekableRange.end === 0) {
            ret.type = 'live';
        } else {
            ret.type = 'dvr';
        }
    } else {
        ret.type = 'vod';
    }

    if (ret.type === 'live') {
        ret.position = 1;
        ret.duration = 1;
    } else if (ret.type === 'dvr') {
        ret.duration = seekableRange.end - seekableRange.start;
        ret.position = position - seekableRange.start;
        if (ret.position > ret.duration) {
            ret.position = ret.duration;
        }
    } else {
        ret.position = this.player_.getPosition();
        ret.duration = this.player_.getDuration();
    }

    return ret;
};

CommonUI.updatePlayBtnUI = function(paused, ended) {
    if (ended) {
        this.vopPlayBtn.innerHTML = this.replayIcon;
        this.vopPlayBtn.title = 'replay';
    } else {
        if (paused) {
            this.vopPlayBtn.innerHTML = this.playIcon;
            this.vopPlayBtn.title = 'play';
        } else {
            this.vopPlayBtn.innerHTML = this.pauseIcon;
            this.vopPlayBtn.title = 'pause';
        }
    }
};

CommonUI.updateContentVolumeBarUI = function(muted, volume) {
    var uiMutedIcon;
    var uiVolumeList;
    var uiVolumeHandleLeft;
    if (volume === 0 || muted) {
        uiMutedIcon = this.volumeMutedIcon;
        uiVolumeList = [0, 1];
        uiVolumeHandleLeft = '0px';
    } else {
        if (volume >= 0.5) {
            uiMutedIcon = this.volumeUpIcon;
        } else {
            uiMutedIcon = this.volumeDownIcon;
        }

        uiVolumeList = [volume, 1];

        var vLeft = (volume / 1) * this.vopVolumeSlider.clientWidth;
        if (vLeft + this.vopVolumeSliderHandle.clientWidth > this.vopVolumeSlider.clientWidth) {
            vLeft = this.vopVolumeSlider.clientWidth - this.vopVolumeSliderHandle.clientWidth;
        }

        uiVolumeHandleLeft = vLeft.toString() + 'px';
    }

    // update muted button
    this.vopMuteBtn.innerHTML = uiMutedIcon;
    // update volume slider background
    this.vopVolumeSlider.style.background = this.genGradientColor(uiVolumeList, 1, this.colorList_volume);
    // update volume slider handle
    this.vopVolumeSliderHandle.style.left = uiVolumeHandleLeft;
};

CommonUI.genGradientColor = function(posList, totalRange, colorList) {
    var gradient = ['to right'];
    for (var i = 0; i < posList.length; ++i) {
        var range = posList[i] * 100 / totalRange;

        if (i === 0) {
            gradient.push(colorList[0] + ' 0%');
            gradient.push(colorList[0] + ' ' + range + '%');
        } else {
            var lastRange = posList[i - 1] * 100 / totalRange;
            gradient.push(colorList[i] + ' ' + lastRange + '%');
            gradient.push(colorList[i] + ' ' + range + '%');
        }
    }

    return 'linear-gradient(' + gradient.join(',') + ')';
};

CommonUI.captureVolumeSliderMouseEvents = function() {
    CommonUI.newVolumeSliderMousemove = this.docVolumeSliderMousemove.bind(this);
    CommonUI.newVolumeSliderMouseup = this.docVolumeSliderMouseup.bind(this);

    document.addEventListener('mousemove', CommonUI.newVolumeSliderMousemove, true);
    document.addEventListener('mouseup', CommonUI.newVolumeSliderMouseup, true);
};

CommonUI.releaseVolumeSliderMouseEvents = function() {
    document.removeEventListener('mousemove', CommonUI.newVolumeSliderMousemove, true);
    document.removeEventListener('mouseup', CommonUI.newVolumeSliderMouseup, true);
};

CommonUI.docVolumeSliderMousemove = function(e) {
    this.updateVolumeMovePosition(e);

    var muted = this.player_.isMuted();
    var volume = this.valueVolumeMovePosition;
    if (volume === 0) {

    } else {
        if (muted === true) {
            this.player_.unmute();
        }

        muted = false;
    }

    this.player_.setVolume(this.valueVolumeMovePosition);
    this.updateContentVolumeBarUI(muted, volume);
};

CommonUI.docVolumeSliderMouseup = function(e) {
    printLog('+docVolumeSliderMouseup', LOG_DEBUG);
    this.releaseVolumeSliderMouseEvents();
    e.preventDefault();

    this.flagVolumeSliderMousedown = false;

    // if mouse up out of 'vop-video', hide control bar directly
    var pt = { x: e.clientX, y: e.clientY };
    if (!isPtInElement(pt, this.vopPlayer)) {
        this.onPlayerMouseleave();
    }
};

CommonUI.updateVolumeMovePosition = function(e) {
    // part - input
    var rect = this.vopVolumeSlider.getBoundingClientRect();

    // part - logic process
    var offsetX = e.clientX - rect.left;
    if (offsetX < 0) {
        offsetX = 0;
    } else if (offsetX + this.vopVolumeSliderHandle.clientWidth > rect.width) {
        offsetX = rect.width;
    }

    // update time progress scrubber button
    this.valueVolumeMovePosition = (offsetX / rect.width) * 1.0;
};
/////////////////////////////////////////////////////////////////////////
// Title: UI Operation
CommonUI.createHeaderItemUI = function(text, cb) {
    var header = document.createElement('div');
    header.setAttribute('tabindex', 0);
    header.setAttribute('class', 'vop-panel-header');

    var title = document.createElement('button');
    title.setAttribute('class', 'vop-panel-title');
    title.innerText = text;

    header.appendChild(title);
    header.addEventListener('click', cb);
    
    return header;
};

CommonUI.createRadioMenuItem = function(text, cbBlur, cbClick) {
    var menuitem = document.createElement('div');
    menuitem.setAttribute('class', 'vop-menuitem');
    menuitem.setAttribute('role', 'menuitemradio');
    menuitem.setAttribute('tabindex', '0');
    menuitem.onblur = cbBlur;
    menuitem.onclick = cbClick;

    var label = document.createElement('div');
    label.setAttribute('class', 'vop-menuitem-label');
    label.innerText = text;
    label.onblur = cbBlur;

    menuitem.appendChild(label);
    return menuitem;
};

CommonUI.createSubtitlesMenu = function() {
    // The subtitle menu html:
    // <div class="vop-panel-menu">
    //     <div class="vop-menuitem" role="menuitem" aria-checked="true">
    //         <div class="vop-menuitem-label">
    //             English
    //         </div>
    //         <div class="vop-menuitem-content">
    //             <div class="vop-menuitem-toggle-checkbox">
    //             </div>
    //         </div>
    //     </div>
    //     <div class="vop-menuitem" role="menuitem" aria-checked="true">
    //         <div class="vop-menuitem-label">
    //             Svenska
    //         </div>
    //         <div class="vop-menuitem-content">
    //             <div class="vop-menuitem-toggle-checkbox">
    //             </div>
    //         </div>
    //     </div>
    // </div>

    // Part - process, remove all children of vopPanelMenu
    this.destroySettingsMenu();

    // Part - input
    var header = document.createElement('div');
    header.setAttribute('class', 'vop-panel-header');

    var panelTitle = document.createElement('button');
    panelTitle.setAttribute('class', 'vop-panel-title');
    panelTitle.innerText = 'Subtitles';
    panelTitle.addEventListener('click', this.onSubtitlesBack.bind(this));
    panelTitle.setAttribute('role', 'plain');
    panelTitle.onblur = this.onSubtitleBackBlur.bind(this);

    header.appendChild(panelTitle);
    this.vopPanel.insertBefore(header, this.vopPanelMenu);

    // Part -- input
    var focusItem = null;
    for (var i = 0; i < this.subtitlesMenuContext.subtitleTracks.length; i++) {
        var subtitleTrack = this.subtitlesMenuContext.subtitleTracks[i];

        var menuitem = document.createElement('div');
        menuitem.setAttribute('class', 'vop-menuitem');
        menuitem.setAttribute('role', 'menuitem');
        menuitem.setAttribute('tabindex', '0');
        if (subtitleTrack.id === this.subtitlesMenuContext.currSubtitleId) {
            menuitem.setAttribute('aria-checked', 'true');
        }

        var label = document.createElement('div');
        label.setAttribute('class', 'vop-menuitem-label');
        label.innerText = subtitleTrack.lang;

        var content = document.createElement('div');
        content.setAttribute('class', 'vop-menuitem-content');

        var checkBox = document.createElement('div');
        checkBox.setAttribute('class', 'vop-menuitem-toggle-checkbox');
        content.appendChild(checkBox);

        menuitem.appendChild(label);
        menuitem.appendChild(content);

        menuitem.dataset.id = subtitleTrack.id;
        menuitem.addEventListener('click', this.onSubtitleItemClick.bind(this));
        menuitem.onblur = this.onSubtitleItemBlur.bind(this);

        this.vopPanelMenu.appendChild(menuitem);

        if (!focusItem) {
            focusItem = menuitem;
        }
    }

    //
    this.vopSettingsMenu.style.display = 'block';
    focusItem.focus();
    this.subtitlesMenuContext.currMenu = 'main_menu';
}

CommonUI.updateSubtitlesMenuUI = function() {
    printLog('+updateSubtitlesMenuUI', LOG_DEBUG);
    if (this.subtitlesMenuContext.currMenu !== 'main_menu') {
        return;
    }

    this.updatePanelMenuUI(this.subtitlesMenuContext.currSubtitleId);
};

CommonUI.updatePanelMenuUI = function(id) {
    var elem_child = this.vopPanelMenu.children;
    for (var i = 0; i < elem_child.length; i++) {
        var menuitem = elem_child[i];

        if (menuitem.dataset.id === id) {
            menuitem.setAttribute('aria-checked', 'true');
        } else {
            menuitem.removeAttribute('aria-checked');
        }
    }
}

CommonUI.destroySettingsMenu = function() {
    var v = document.querySelector('.vop-panel-header');
    if (v) {
        this.vopPanel.removeChild(v);
    }
    while (this.vopPanelMenu.firstChild) {
        this.vopPanelMenu.firstChild.onblur = null;

        var label = this.vopPanelMenu.firstChild.querySelector('.vop-menuitem-label');
        if (label) {
            label.onblur = null;
        }
        
        this.vopPanelMenu.removeChild(this.vopPanelMenu.firstChild);
    }

    this.settingMenuContext.currMenu = 'none';
    this.subtitlesMenuContext.currMenu = 'none';
};

CommonUI.doCreateSettingsMenu = function() {
    // The main menu html:
    // <div class="vop-panel-menu">
    //     <div class="vop-menuitem" role="menuitem" aria-haspopup="true" onclick="onQualityMenuItemClick(event)">
    //         <div class="vop-menuitem-label">
    //             Quality
    //         </div>
    //         <div class="vop-menuitem-content">
    //             <span class="vop-menuitem-content-text">360p</span>
    //         </div>
    //     </div>
    //     <div class="vop-menuitem" role="menuitem" aria-haspopup="true" onclick="onAudioTrackMenuClick(event)">
    //         <div class="vop-menuitem-label">
    //             Language
    //         </div>
    //         <div class="vop-menuitem-content">
    //             <span>Auto</span>
    //             <span class="vop-menuitem-content-text">Bipbop1</span>
    //         </div>
    //     </div>
    // </div>

    function getQualityBitrate() {
        var bitrate = '';
        for (var i = 0; i < this.settingMenuContext.qualityList.length; i++) {
            var quality = this.settingMenuContext.qualityList[i];
            if (quality.id === this.settingMenuContext.currQualityId) {
                bitrate = quality.bitrate;
                break;
            }
        }
        return bitrate;
    }

    function getAudioTrackLang() {
        var lang = '';
        for (var i = 0; i < this.settingMenuContext.audioTrackList.length; i++) {
            var audioTrack = this.settingMenuContext.audioTrackList[i];
            if (audioTrack.id === this.settingMenuContext.currAudioTrackId) {
                lang = audioTrack.lang;
                break;
            }
        }
        return lang;
    }

    // Part - input: current quality, current audio track, etc.
    var qualityCnt = this.settingMenuContext.qualityList.length - 1;

    // Part - process: created quality menu item
    var qualityMenuitem = document.createElement('div');
    qualityMenuitem.setAttribute('class', 'vop-menuitem');
    qualityMenuitem.setAttribute('role', 'menuitem');
    if (qualityCnt > 1) {
        qualityMenuitem.setAttribute('aria-haspopup', 'true');
    }
    qualityMenuitem.setAttribute('tabindex', '0');

    var label = document.createElement('div');
    label.setAttribute('class', 'vop-menuitem-label');
    label.innerText = 'Quality';

    var content = document.createElement('div');
    content.setAttribute('class', 'vop-menuitem-content');

    if (this.settingMenuContext.isQualityAuto === true) {
        var spanAuto = document.createElement('span');
        spanAuto.innerText = 'Auto';
        spanAuto.style.paddingRight = '6px';

        content.appendChild(spanAuto);
    }

    var contentText = document.createElement('span');
    contentText.setAttribute('class', 'vop-menuitem-content-text');
    contentText.innerText = getQualityBitrate.call(this);
    content.appendChild(contentText);

    qualityMenuitem.appendChild(label);
    qualityMenuitem.appendChild(content);

    qualityMenuitem.onclick = this.onQualityMenuClick.bind(this);
    qualityMenuitem.onblur = this.onMainMenuBlur.bind(this);

    this.vopPanelMenu.appendChild(qualityMenuitem);

    // create audio track menu item
    var audioMenuitem = null;
    var audioTrackCnt = this.settingMenuContext.audioTrackList.length;
    if (audioTrackCnt > 0) {
        audioMenuitem = document.createElement('div');
        audioMenuitem.setAttribute('class', 'vop-menuitem');
        audioMenuitem.setAttribute('role', 'menuitem');
        if (audioTrackCnt > 1) {
            audioMenuitem.setAttribute('aria-haspopup', 'true');
        }
        audioMenuitem.setAttribute('tabindex', '0');

        label = document.createElement('div');
        label.setAttribute('class', 'vop-menuitem-label');
        label.innerText = 'Language';

        content = document.createElement('div');
        content.setAttribute('class', 'vop-menuitem-content');

        if (this.settingMenuContext.currAudioTrackId === '-1') {
            var spanAuto = document.createElement('span');
            spanAuto.innerText = 'Auto';
            spanAuto.style.paddingRight = '6px';

            content.appendChild(spanAuto);
        }

        contentText = document.createElement('span');
        contentText.setAttribute('class', 'vop-menuitem-content-text');
        contentText.innerText = getAudioTrackLang.call(this);
        content.appendChild(contentText);

        audioMenuitem.appendChild(label);
        audioMenuitem.appendChild(content);

        audioMenuitem.addEventListener('click', this.onAudioTrackMenuClick.bind(this));
        audioMenuitem.onblur = this.onMainMenuBlur.bind(this);
    }

    return {
        qualityMenuitem: qualityMenuitem,
        audioMenuitem: audioMenuitem
    };
};

CommonUI.createSettingsMenu = function() {
    // Part - process, remove all children of vopPanelMenu
    this.destroySettingsMenu();

    var items = this.doCreateSettingsMenu();
    var focusItem = null;
    if (items.qualityMenuitem) {
        this.vopPanelMenu.appendChild(items.qualityMenuitem);
    }
    if (items.audioMenuitem) {
        this.vopPanelMenu.appendChild(items.audioMenuitem);
    }

    //
    if (items.qualityMenuitem) {
        focusItem = items.qualityMenuitem;
    } else if (items.audioMenuitem) {
        focusItem = items.audioMenuitem;
    }

    //
    this.vopSettingsMenu.style.display = 'block';
    if (focusItem) { focusItem.focus(); }

    this.settingMenuContext.currMenu = 'main_menu';
};

CommonUI.createQualityMenu = function() {
    // The quality menu html:
    // <div class="vop-panel-header">
    //     <button class="vop-panel-title" onclick="onQualityBack(event)">Quality</button>
    // </div>
    // <div class="vop-panel-menu">
    //     <div class="vop-menuitem" role="menuitemradio">
    //         <div class="vop-menuitem-label">
    //             <span>720p</span>
    //         </div>
    //     </div>
    //     <div class="vop-menuitem" role="menuitemradio">
    //         <div class="vop-menuitem-label">
    //             <span>480p</span>
    //         </div>
    //     </div>
    //     <div class="vop-menuitem" role="menuitemradio">
    //         <div class="vop-menuitem-label">
    //             <span>360p</span>
    //         </div>
    //     </div>
    //     <div class="vop-menuitem" role="menuitemradio" aria-checked="true">
    //         <div class="vop-menuitem-label">
    //             <span>Auto</span>
    //         </div>
    //     </div>
    // </div>

    // Part - process, remove all children of vopPanelMenu
    this.destroySettingsMenu();

    // add quality back menu
    var header = document.createElement('div');
    header.setAttribute('class', 'vop-panel-header');

    var button = document.createElement('button');
    button.setAttribute('class', 'vop-panel-title');
    button.innerText = 'Quality';
    button.addEventListener('click', this.onQualityBack.bind(this));
    header.setAttribute('tabindex', '0');
    header.appendChild(button);

    // add quality menuitem
    var focusItem = null;
    for (var i = 0; i < this.settingMenuContext.qualityList.length; i++) {
        var quality = this.settingMenuContext.qualityList[i];

        var menuitem = document.createElement('div');
        menuitem.setAttribute('class', 'vop-menuitem');
        menuitem.setAttribute('role', 'menuitemradio');
        menuitem.setAttribute('tabindex', '0');
        menuitem.onblur = this.onQualityMenuItemBlur.bind(this);
        menuitem.onclick = this.onQualityMenuItemClick.bind(this);

        menuitem.dataset.id = quality.id;
        if (this.settingMenuContext.isQualityAuto) {
            if (quality.id === '-1') {
                menuitem.setAttribute('aria-checked', 'true');
            }
        } else {
            if (quality.id === this.settingMenuContext.currQualityId) {
                menuitem.setAttribute('aria-checked', 'true');
            }
        }

        var label = document.createElement('div');
        label.setAttribute('class', 'vop-menuitem-label');
        label.innerText = quality.bitrate;
        menuitem.appendChild(label);

        this.vopPanelMenu.appendChild(menuitem);

        if (!focusItem) {
            focusItem = menuitem;
        }
    }

    this.vopPanel.insertBefore(header, this.vopPanelMenu);
    //
    this.vopSettingsMenu.style.display = 'block';
    focusItem.focus();
};

CommonUI.updateQualityMenuUI = function() {
    printLog('+updateQualityMenuUI', LOG_DEBUG);

    if (this.settingMenuContext.currMenu !== 'quality_menu') {
        return;
    }

    this.updatePanelMenuUI(this.settingMenuContext.currQualityId);
};

CommonUI.updateAudioTrackMenuUI = function() {
    printLog('+updateAudioTrackMenuUI', LOG_DEBUG);

    if (this.settingMenuContext.currMenu !== 'audioTrack_menu') {
        return;
    }

    this.updatePanelMenuUI(this.settingMenuContext.currAudioTrackId);
};

CommonUI.createAudioTrackMenu = function() {
    // The audio track menu html:
    // <div class="vop-panel-header">
    //     <button class="vop-panel-title" onclick="onAudioTrackBack(event)">Audio</button>
    // </div>
    // <div class="vop-panel-menu">
    //     <div class="vop-menuitem" role="menuitemradio">
    //         <div class="vop-menuitem-label">
    //             <span>Bipbop1</span>
    //         </div>
    //     </div>
    //     <div class="vop-menuitem" role="menuitemradio">
    //         <div class="vop-menuitem-label">
    //             <span>Bipbop2</span>
    //         </div>
    //     </div>
    //     <div class="vop-menuitem" role="menuitemradio" aria-checked="true">
    //         <div class="vop-menuitem-label">
    //             <span>Auto</span>
    //         </div>
    //     </div>
    // </div>

    // Part - process, remove all children of vopPanelMenu
    this.destroySettingsMenu();

    // add quality back menu
    var header = document.createElement('div');
    header.setAttribute('class', 'vop-panel-header');

    var button = document.createElement('button');
    button.innerText = 'Audio';
    button.setAttribute('class', 'vop-panel-title');
    button.addEventListener('click', this.onAudioTrackBack.bind(this));

    header.setAttribute('tabindex', '0');
    header.appendChild(button);

    // add quality menuitem
    var focusItem = null;
    for (var i = 0; i < this.settingMenuContext.audioTrackList.length; i++) {
        var audioTrack = this.settingMenuContext.audioTrackList[i];

        var menuitem = document.createElement('div');
        menuitem.setAttribute('class', 'vop-menuitem');
        menuitem.setAttribute('role', 'menuitemradio');
        if (audioTrack.id == this.settingMenuContext.currAudioTrackId) {
            menuitem.setAttribute('aria-checked', 'true');
        }
        menuitem.dataset.id = audioTrack.id;
        menuitem.setAttribute('tabindex', '0');
        menuitem.addEventListener('click', this.onAudioTrackItemClick.bind(this));
        menuitem.onblur = this.onAudioTrackItemBlur.bind(this);

        var label = document.createElement('div');
        label.innerText = audioTrack.lang;
        label.setAttribute('class', 'vop-menuitem-label');
        
        menuitem.appendChild(label);
        this.vopPanelMenu.appendChild(menuitem);

        if (!focusItem) {
            focusItem = menuitem;
        }
    }

    this.vopPanel.insertBefore(header, this.vopPanelMenu);
    //
    this.vopSettingsMenu.style.display = 'block';
    focusItem.focus();
};

CommonUI.onQualityMenuClick = function(e) {
    printLog('+onQualityMenuClick: ' + e.target.innerText, LOG_DEBUG);

    if (this.settingMenuContext.qualityList.length > 1) {
        this.destroySettingsMenu();
        this.createQualityMenu();
        this.settingMenuContext.currMenu = 'quality_menu';
    }
};

CommonUI.onAudioTrackMenuClick = function(e) {
    printLog('+onAudioTrackMenuClick', LOG_DEBUG);

    if (this.settingMenuContext.audioTrackList.length > 1) {
        this.destroySettingsMenu();
        this.createAudioTrackMenu();
        this.settingMenuContext.currMenu = 'audioTrack_menu';
    }
};

CommonUI.onMainMenuBlur = function(e) {
    printLog('+onMainMenuBlur, this.settingMenuContext.currMenu: ' + this.settingMenuContext.currMenu, LOG_DEBUG);

    // For IE11 only
    var prevFocus;
    var nextFocus;
    if (this.browser === 'IE') {
        prevFocus = e.target;
        nextFocus = document.activeElement;
    } else {
        prevFocus = e.target;
        nextFocus = e.relatedTarget;
    }

    if (nextFocus && (nextFocus.className.indexOf('vop-menuitem') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-toggle-checkbox') !== -1 ||
            nextFocus.className.indexOf('vop-popup') !== -1 ||
            nextFocus === this.vopSettingsBtn)) {
        // do nothing
    } else {
        this.onSettingClick();
    }

    printLog('-onMainMenuBlur', LOG_DEBUG);
};

CommonUI.onSubtitleItemClick = function(e) {
    printLog('+onSubtitleItemClick', LOG_DEBUG);

    var id = e.currentTarget.dataset.id;
    if (this.subtitlesMenuContext.currSubtitleId === id) {
        this.subtitlesMenuContext.currSubtitleId = '';
    } else {
        this.subtitlesMenuContext.currSubtitleId = id;
    }

    this.player_.selectSubtitleTrack(this.subtitlesMenuContext.currSubtitleId);
    this.updateSubtitlesMenuUI();

    e.currentTarget.focus();
}

CommonUI.onSubtitleBackBlur = function(e) {
    this.onSubtitleItemBlur(e);
};

CommonUI.onSubtitleItemBlur = function(e) {
    printLog('+onSubtitleItemBlur', LOG_DEBUG);

    // For IE11 only
    var prevFocus;
    var nextFocus;
    if (this.browser === 'IE') {
        prevFocus = e.target;
        nextFocus = document.activeElement;
    } else {
        prevFocus = e.target;
        nextFocus = e.relatedTarget;
    }

    if (nextFocus && (nextFocus.className.indexOf('vop-panel-title') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-toggle-checkbox') !== -1 ||
            nextFocus.className.indexOf('vop-popup') !== -1 ||
            nextFocus === this.vopSubtitlesBtn)) {
        // do nothing
    } else {
        this.onSubtitlesClick();
    }
}

CommonUI.onSubtitlesBack = function(e) {
    printLog('+onSubtitlesBack', LOG_DEBUG);
};

CommonUI.onQualityBack = function(e) {
    printLog('+onQualityBack', LOG_DEBUG);

    this.destroySettingsMenu();
    this.createSettingsMenu();
};

CommonUI.onQualityMenuItemClick = function(e) {
    printLog('+onQualityMenuItemClick, id: ' + e.currentTarget.dataset.id, LOG_DEBUG);

    this.settingMenuContext.currQualityId = e.currentTarget.dataset.id;
    if (this.settingMenuContext.currQualityId === '-1') {
        this.settingMenuContext.isQualityAuto = true;
    } else {
        this.settingMenuContext.isQualityAuto = false;
    }

    this.updateQualityMenuUI();
    e.currentTarget.focus();

    // do player operation
    if (this.settingMenuContext.isQualityAuto) {
        this.player_.selectQualityLevel('');
    } else {
        this.player_.selectQualityLevel(this.settingMenuContext.currQualityId);
    }
};

CommonUI.onQualityMenuItemBlur = function(e) {
    printLog('+onQualityMenuItemBlur', LOG_DEBUG);

    // For IE11 only
    var prevFocus;
    var nextFocus;
    if (this.browser === 'IE') {
        prevFocus = e.target;
        nextFocus = document.activeElement;
    } else {
        prevFocus = e.target;
        nextFocus = e.relatedTarget;
    }

    if (nextFocus && (nextFocus.className.indexOf('vop-panel-header') !== -1 ||
            nextFocus.className.indexOf('vop-panel-title') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-label') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-content') !== -1 ||
            nextFocus.className.indexOf('vop-menuitem-toggle-checkbox') !== -1 ||
            nextFocus.className.indexOf('vop-popup') !== -1 ||
            nextFocus === this.vopSettingsBtn)) {
        printLog('Click on popup menu, don\'t need to hide it.', LOG_DEBUG);
    } else {
        this.onSettingClick();
    }
};

CommonUI.onAudioTrackBack = function(e) {
    printLog('+onAudioTrackBack', LOG_DEBUG);
    this.destroySettingsMenu();
    this.createSettingsMenu();
};

CommonUI.onAudioTrackItemClick = function(e) {
    printLog('onAudioTrackItemClick', LOG_DEBUG);

    this.settingMenuContext.currAudioTrackId = e.currentTarget.dataset.id;;
    this.updateAudioTrackMenuUI();
    e.currentTarget.focus();

    // do player operation
    this.player_.selectAudioTrack(this.settingMenuContext.currAudioTrackId);
};

CommonUI.onAudioTrackItemBlur = function(e) {
    printLog('+onAudioTrackItemBlur', LOG_DEBUG);

    this.onQualityMenuItemBlur(e);
};

CommonUI.updateFullscreenIcon = function() {
    var v = isFullscreen();
    if (v) {
        this.vopFullscreenBtn.innerHTML = this.fullScreenExitIcon;
        this.vopFullscreenBtn.title = 'Exit Fullscreen';
    } else {
        this.vopFullscreenBtn.innerHTML = this.fullScreenIcon;
        this.vopFullscreenBtn.title = 'fullscreen';
    }
};
