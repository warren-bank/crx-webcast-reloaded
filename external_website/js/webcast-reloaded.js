// --------------------------------------------------------- video player managment tasks:

var connect_chromecast = function() {
    THEOplayer.cast.chromecast.initialize()
    .then(function(){
        THEOplayer.cast.chromecast.startSession()
    })
}

var disconnect_chromecast = function() {
    THEOplayer.cast.chromecast.endSession()
}

var webcast_video_player

var destroy_videoplayer = function(skip_reload) {
    if (webcast_video_player) {
        webcast_video_player.stop()
        webcast_video_player.destroy()
        disconnect_chromecast()

        history.replaceState("", document.title, window.location.pathname)
        if (skip_reload !== true) {
            window.location.reload()
        }
    }
}

var initialize_videoplayer = function(URL_video, URL_subtitle) {
    if (! URL_video) return;

    var settings = { 
        sources: [{
            src: URL_video
        }],
        textTracks: [{
            default: true,
            kind: 'subtitles',
            label: 'english',
            srclang: 'english',
            src: URL_subtitle
        }],
        poster: 'img/poster.jpg'
    }

    if (! URL_subtitle) {
        delete settings.textTracks
    }

    destroy_videoplayer(true)

    webcast_video_player = new THEOplayer.Player(
        document.querySelector('#video-player'),
        {
            fluid: true,
            libraryLocation: 'lib/theoplayer-2.42.0/',
            cast: {
                strategy: 'auto'
            }
        }
    )

    webcast_video_player.autoplay = false
    webcast_video_player.source   = settings

    var info
    info = `now playing: <a href="${URL_video}">video</a>`
    if (URL_subtitle) {
        info += ` with <a href="${URL_subtitle}">subtitles</a>`
    }

    document.querySelector('.webcast-video-player .video-player-info .video-player-info-status').innerHTML = info

    document.querySelector('.webcast-video-player .video-player-info i.material-icons').onclick = destroy_videoplayer

    connect_chromecast()
}

// --------------------------------------------------------- webpage initialization:

var is_player_showing = false

var show_player = function() {
  is_player_showing = true

  document.querySelector('.URL-entry-form').style.display = 'none'
  document.querySelector('.webcast-video-player').style.display = 'block'
}

var parse_location_hash = function() {
    var b64, hash_regex_pattern, URL_video, URL_subtitle;

    b64 = '[A-Za-z0-9+/=%]';
    hash_regex_pattern = `^#/watch/(${b64}+?)(?:/subtitle/(${b64}+))?$`;
    hash_regex_pattern = new RegExp(hash_regex_pattern);

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
        URL_video = decode_URL( matches[1] );
        if (matches.length > 2 && matches[2]) {
            URL_subtitle = decode_URL( matches[2] );
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
            URL_video    = document.querySelector('.URL-entry-form input#URL_video').value;
            URL_subtitle = document.querySelector('.URL-entry-form input#URL_subtitle').value;

            if (URL_video) {
                show_player();
                initialize_videoplayer(URL_video, URL_subtitle);
            }
        }
    }
}

var $hashchange = function () {
    var {URL_video, URL_subtitle} = parse_location_hash()

    if (!is_player_showing && URL_video) {
        show_player()
        initialize_videoplayer(URL_video, URL_subtitle)
    }
    else if (!URL_video) {
      destroy_videoplayer()
    }
}

document.addEventListener("DOMContentLoaded", $DOMContentLoaded)

window.addEventListener("hashchange", $hashchange, false)

window.onunload = function() {
    destroy_videoplayer(true)
}
