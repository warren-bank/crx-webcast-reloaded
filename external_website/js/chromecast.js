var chromecastUI = Object.create(CommonUI);

chromecastUI.initVariable = function () {
    CommonUI.initVariable.call(this);
    this.vopRemoteDisplayContainer = null;
    this.vopRemoteDisplayText = null;
};

chromecastUI.initUI = function () {
    CommonUI.initUI.call(this);

    this.vopRemoteDisplayContainer = document.querySelector('.vop-remote-display-container');
    this.vopRemoteDisplayText = document.querySelector('.vop-remote-display-status-text');
};

chromecastUI.initPlayer = function (config) {
    CommonUI.initPlayer.call(this, config);

    // for chromecast
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_CAST_CONNECTED, this.onCastConnected.bind(this), this.context);
    this.player_.addEventListener(voPlayer.events.VO_OSMP_CB_CAST_DISCONNECTED, this.onCastDisconnected.bind(this), this.context);
};

chromecastUI.onCastConnected = function(e) {
    this.vopRemoteDisplayText.innerText = 'Playing on ' + e.deviceName;
    this.vopRemoteDisplayContainer.style.display = 'block';
};

chromecastUI.onCastDisconnected = function() {
    this.vopRemoteDisplayContainer.style.display = 'none';
};

chromecastUI.onload = function () {
    this.initVariable();
    this.initUI();
    this.initUIEventListeners();
    this.initPlayer(Chromecast_config);
};

chromecastUI.loadSubtitle = function (subtitleInfo) {
    if (subtitleInfo && subtitleInfo.uri) {
        this.subtitleInfo_ = subtitleInfo;
        this.player_.setExternalSubtitle(subtitleInfo);
    }
}

var disconnect_chromecast = function() {
    var cc_context = cast.framework['CastContext']['getInstance']();
    var cc_session = cc_context && cc_context['getCurrentSession']();
    var cc_state   = cc_session && cc_session['getSessionState']();
    var cc_casting = cc_state && (cc_state !== cast.framework.SessionState.NO_SESSION) && (cc_state !== cast.framework.SessionState.SESSION_ENDING);
    if (cc_casting) {
        cc_session.endSession(true);
    }
}

var destroy_videoplayer = function() {
    chromecastUI.player_.stop();
    chromecastUI.player_.close();

    disconnect_chromecast();

    history.replaceState("", document.title, window.location.pathname)
    window.location.reload()
}

var initialize_videoplayer = function(URL_video, URL_subtitle) {
    if (! URL_video) return;

    var info = `now playing: <a href="${URL_video}">video</a>`

    Chromecast_stream.links[0].uri = URL_video;
    chromecastUI.onload();
    chromecastUI.open(Chromecast_stream);
    if (URL_subtitle) {
        info += ` with <a href="${URL_subtitle}">subtitles</a>`

        External_Subtitle_info.uri = URL_subtitle;
        chromecastUI.loadSubtitle(External_Subtitle_info);
    }

    document.querySelector('.player-info .player-info-status').innerHTML = info

    document.querySelector('.player-info i.material-icons').onclick = destroy_videoplayer
}
