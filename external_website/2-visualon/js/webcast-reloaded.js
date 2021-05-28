var playerContainer_;
var player_ = null;
var playerUI_ = null;

// --------------------------------------------------------- video player managment tasks:

var disconnect_chromecast = function(player) {
    if (!player_) return

    if (player_.isCasting())
      player_.stopCast()
}

var toggle_chromecast_connection_state = function() {
    if (!player_) return

    if (player_.isCasting())
      player_.stopCast()
    else
      player_.startCast()
}

var destroy_videoplayer = function(skip_reload) {
    if (!player_) return

    disconnect_chromecast()
    player_.stop()
    player_.close()

    if (skip_reload !== true) {
        history.replaceState("", document.title, window.location.pathname)
        window.location.reload()
    }
}

var seek_to_time = function() {
    if (player_) {
        var hh = parseInt(document.getElementById('seek_to_hh').value, 10)
        var mm = parseInt(document.getElementById('seek_to_mm').value, 10)
        var ss = parseInt(document.getElementById('seek_to_ss').value, 10)

        if (isNaN(hh)) hh = 0
        if (isNaN(mm)) mm = 0
        if (isNaN(ss)) ss = 0

        var secs = ss + (mm * 60) + (hh * 60 * 60)

        if (secs > 0)
          player_.setPosition(secs)
    }
}

var get_URL_video_type = function(URL_video) {
    URL_video = URL_video.toLowerCase()

    if (URL_video.indexOf('.m3u8') >= 0)
        return 'hls'
    if (URL_video.indexOf('.mpd') >= 0)
        return 'dash'
    if (URL_video.indexOf('.ism') >= 0)
        return 'dash'

    return 'progressive'
}

var initialize_videoplayer = function(URL_video, URL_subtitle) {
    if (!URL_video) return

    var config = {
        player: {
            width:  '100%',
            height: '100%',
            playback: {
                autoPlay: false
            },
            logs: {
                logToConsole: false
            },
            cast: {
                receiverAppId: 'FF4B0BBE' // VisualOn WebSite Demo customer receiver
            }
        },
        video: {
            links: [{
                uri:  URL_video,
                type: get_URL_video_type(URL_video)
            }],
            poster: {
                url: 'img/poster.jpg',
                width:  '100%',
                height: '100%'
            }
        },
        subtitle: {
            uri:  URL_subtitle,
            lang: 'english',
            default: true
        }
    }

    playerContainer_ = document.getElementById('video-player-container')

    // build player
    player_ = new voPlayer.Player(playerContainer_)
  //player_.addPlugin(voPlayer.voAnalyticsPlugin)
    player_.addPlugin(voPlayer.voCastSenderPlugin)
    player_.addPlugin(voPlayer.voSRTParserPlugin)
    player_.addPlugin(voPlayer.voCaptionParserPlugin)
    player_.addPlugin(voPlayer.voVTTParserPlugin)
    player_.addPlugin(voPlayer.voTTMLParserPlugin)
    player_.addPlugin(voPlayer.voFCCStylePlugin)
    player_.addPlugin(voPlayer.voSubtitlesPlugin)
    player_.init(config.player)

    // attach ui engine
    playerUI_ = new voPlayer.UIEngine(player_);
    playerUI_.buildUI();

    player_.open(config.video);

    if (URL_subtitle)
        player_.setExternalSubtitle(config.subtitle)

    // display direct links to the video stream and subtitle sources
    var info
    info = 'Now Playing: <a href="' + URL_video + '">Video</a>'
    if (URL_subtitle) {
        info += ' with <a href="' + URL_subtitle + '">Subtitles</a>'
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
    hash_regex_pattern = '^#/watch/(' + b64 + '+?)(?:/subtitle/(' + b64 + '+))?$'
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
    return {URL_video: URL_video, URL_subtitle: URL_subtitle}
}

var $DOMContentLoaded = function () {
    var parsed_hash  = parse_location_hash()
    var URL_video    = parsed_hash.URL_video
    var URL_subtitle = parsed_hash.URL_subtitle

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
    var parsed_hash  = parse_location_hash()
    var URL_video    = parsed_hash.URL_video
    var URL_subtitle = parsed_hash.URL_subtitle

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
