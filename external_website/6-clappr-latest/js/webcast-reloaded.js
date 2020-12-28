// ---------------------------------------------------------
// prevent Clappr from loading Google Analytics scripts by making its detection strategy think GA is already loaded

window._gat = true

// --------------------------------------------------------- video player managment tasks:
// http://clappr.github.io/classes/Player.html

var disconnect_chromecast = function(player) {
    // how?
}

var toggle_chromecast_connection_state = function() {
    // how?

    let button = document.querySelector('.chromecast-button')
    if (button && button.click) button.click()
}

var webcast_video_player

var destroy_videoplayer = function(skip_reload) {
    if (webcast_video_player) {
        webcast_video_player.stop()
        webcast_video_player.destroy()  // note: does NOT disconnect from Chromecast
        disconnect_chromecast()

        if (skip_reload !== true) {
            history.replaceState("", document.title, window.location.pathname)
            window.location.reload()
        }
    }
}

var seek_to_time = function() {
    if (webcast_video_player) {
        var hh = parseInt(document.getElementById('seek_to_hh').value, 10)
        var mm = parseInt(document.getElementById('seek_to_mm').value, 10)
        var ss = parseInt(document.getElementById('seek_to_ss').value, 10)

        if (isNaN(hh)) hh = 0
        if (isNaN(mm)) mm = 0
        if (isNaN(ss)) ss = 0

        var secs = ss + (mm * 60) + (hh * 60 * 60)

        if (secs > 0)
          webcast_video_player.seek(secs)
    }
}

var initialize_subtitles = function() {
    // unfortunately, the Chromecast plugin still doesn't support subtitles

    var video = document.querySelector('video')
    if (!video) return

    var textTracks = video.textTracks
    if (!textTracks || !textTracks.length) return

    for (var i=0; i < textTracks.length; i++) {
        if (textTracks[i].mode === 'showing') return
    }

    // turn on the first subtitles text track (which is always "Disabled") to display the "CC" icon/menu in the media-control panel
    textTracks[0].mode = 'showing'
}

var initialize_videoplayer = function(URL_video, URL_subtitle) {
    if (! URL_video) return

    var settings = {
        source:      URL_video,
        mimeType:    '',
        poster:      'img/poster.jpg',
        width:       '100%',
        height:      '100%',
        autoPlay:    false,
        controls:    false,
        parentId:    '#video-player',
        plugins:    [ChromecastPlugin, LevelSelector],
        chromecast: {
            appId:   '9DFB77C0'
        },
        playback: {
          //crossOrigin: 'anonymous',
            externalTracks: [{
                lang:    'en-US',
                label:   'English',
                kind:    'subtitles',
                src:     URL_subtitle
            }]
        },
        events: {
            onPlay:  initialize_subtitles
        }
    }

    if (! URL_subtitle) {
        delete settings.playback.externalTracks
        delete settings.events
    }

    var types = [
        {ext: "m3u8", mime: "application/x-mpegURL"},
        {ext: "mpd",  mime: "application/dash+xml"},
        {ext: "mp4",  mime: "video/mp4"},
        {ext: "webm", mime: "video/webm"}
    ]
    types.every(function(type){
        var pattern = new RegExp(('\\.' + type.ext + '(?:[#\?]|$)'), 'i')

        if (pattern.test(URL_video)) {
            settings.mimeType = type.mime
            return false
        }
        return true
    })
    types = undefined

    // cleanup
    destroy_videoplayer(true)

    webcast_video_player = new Clappr.Player(settings)

    // display direct links to the video stream and subtitle sources
    var info
    info = `Now Playing: <a href="${URL_video}">Video</a>`
    if (URL_subtitle) {
        info += ` with <a href="${URL_subtitle}">Subtitles</a>`
    }

    document.querySelector('.webcast-video-player .video-player-info .video-player-info-status').innerHTML = info

    document.querySelector('.webcast-video-player .video-player-info i.material-icons#destroy_videoplayer').onclick = destroy_videoplayer

    document.querySelector('.webcast-video-player .video-player-info #seek_to button#seek_to_time').onclick = seek_to_time

    document.querySelector('.webcast-video-player .video-player-info i.material-icons#toggle_chromecast_connection_state').onclick = toggle_chromecast_connection_state
}

// --------------------------------------------------------- webpage initialization:

var is_player_showing = false

var show_player = function() {
  is_player_showing = true

  document.querySelector('.URL-entry-form').style.display = 'none'
  document.querySelector('.webcast-video-player').style.display = 'block'
}

var parse_location_hash = function() {
    var b64, hash_regex_pattern, URL_video, URL_subtitle

    b64 = '[A-Za-z0-9+/=%]'
    hash_regex_pattern = `^#/watch/(${b64}+?)(?:/subtitle/(${b64}+))?$`
    hash_regex_pattern = new RegExp(hash_regex_pattern)

    var decode_URL = function(str) {
      var tail, done

      if (str) {
        while (! done) {
          tail = str
          str  = decodeURIComponent(tail)
          done = (tail === str)
        }
        str = window.atob(str)
      }
      return str
    }

    var matches = hash_regex_pattern.exec(window.location.hash)
    if (matches && matches.length && matches[1]) {
        URL_video = decode_URL( matches[1] )
        if (matches.length > 2 && matches[2]) {
            URL_subtitle = decode_URL( matches[2] )
        }
    }
    return {URL_video, URL_subtitle}
}

var $DOMContentLoaded = function () {
    var {URL_video, URL_subtitle} = parse_location_hash()

    if (URL_video) {
        show_player()
        initialize_videoplayer(URL_video, URL_subtitle)
    }
    else {
        document.querySelector('.URL-entry-form button').onclick = function() {
            URL_video    = document.querySelector('.URL-entry-form input#URL_video').value
            URL_subtitle = document.querySelector('.URL-entry-form input#URL_subtitle').value

            if (URL_video) {
                show_player()
                initialize_videoplayer(URL_video, URL_subtitle)
            }
        }
    }
}

var $hashchange = function () {
    var {URL_video, URL_subtitle} = parse_location_hash()

    if (URL_video) {
        if (!is_player_showing) show_player()
        initialize_videoplayer(URL_video, URL_subtitle)
    }
    else {
        destroy_videoplayer()
    }
}

document.addEventListener("DOMContentLoaded", $DOMContentLoaded)

window.addEventListener("hashchange", $hashchange, false)