// --------------------------------------------------------- video player managment tasks:

/*
var connect_chromecast = function(player) {
    if (player && player.cast && player.cast.chromecast) {
        if (!player.cast.casting && !player.cast.chromecast.casting) {
            if (player.cast.chromecast.state.toLowerCase() === 'unavailable') {
                var $statechangeEventListener = function() {
                    if (player && player.cast && player.cast.chromecast) {
                        if (player.cast.casting || player.cast.chromecast.casting) {
                            player.cast.chromecast.removeEventListener('statechange', $statechangeEventListener)
                        }
                        else if (player.cast.chromecast.state.toLowerCase() === 'available') {
                            player.cast.chromecast.removeEventListener('statechange', $statechangeEventListener)
                            player.cast.chromecast.start()
                        }
                    }
                }
                player.cast.chromecast.addEventListener('statechange', $statechangeEventListener)
            }
            else {
                player.cast.chromecast.start()
            }
        }
    }
    else {
        THEOplayer.cast.chromecast.initialize()
        .then(function(){
            THEOplayer.cast.chromecast.startSession()
        })
    }
}
*/

var disconnect_chromecast = function(player) {
    if (player && player.cast && player.cast.chromecast) {
        if (player.cast.casting && player.cast.chromecast.casting) {
            player.cast.chromecast.stop()
        }
    }
    else {
        THEOplayer.cast.chromecast.endSession()
    }
}

var toggle_chromecast_connection_state = function() {
    if (webcast_video_player && webcast_video_player.cast && webcast_video_player.cast.chromecast) {
        if (webcast_video_player.cast.casting && webcast_video_player.cast.chromecast.casting) {
            webcast_video_player.cast.chromecast.stop()
        }
        else {
            webcast_video_player.cast.chromecast.start()
        }
    }
}

var webcast_video_player

var destroy_videoplayer = function(skip_reload) {
    if (webcast_video_player) {
        webcast_video_player.stop()
        webcast_video_player.destroy()  // also: disconnects from Chromecast
        disconnect_chromecast()         // todo: remove redundant call?

        if (skip_reload !== true) {
            history.replaceState("", document.title, window.location.pathname)
            window.location.reload()
        }
    }
}

var initialize_videoplayer = function(URL_video, URL_subtitle) {
    if (! URL_video) return

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

    var types = [
        {ext: "m3u8", mime: "application/x-mpegURL"},
        {ext: "mpd",  mime: "application/dash+xml"},
        {ext: "mp4",  mime: "video/mp4"},
        {ext: "webm", mime: "video/webm"}
    ]
    types.every(function(type){
        var pattern = new RegExp(('\\.' + type.ext + '(?:[#\?]|$)'), 'i')

        if (pattern.test(URL_video)) {
            settings.sources[0].type = type.mime
            return false
        }
        return true
    })
    types = undefined

    // cleanup
    destroy_videoplayer(true)

    webcast_video_player = new THEOplayer.Player(
        document.querySelector('.webcast-video-player > div.video-js'),
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

    // open the Chromecast connection dialog
//  connect_chromecast()
//  connect_chromecast(webcast_video_player)

    // display direct links to the video stream and subtitle sources
    var info
    info = `now playing: <a href="${URL_video}">video</a>`
    if (URL_subtitle) {
        info += ` with <a href="${URL_subtitle}">subtitles</a>`
    }

    document.querySelector('.webcast-video-player .video-player-info .video-player-info-status').innerHTML = info

    document.querySelector('.webcast-video-player .video-player-info i.material-icons#destroy_videoplayer').onclick = destroy_videoplayer

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
