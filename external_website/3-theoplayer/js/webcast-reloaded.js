// --------------------------------------------------------- video player managment tasks:

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

var initialize_videoplayer = function(URL_video, URL_subtitle, DRM_scheme, DRM_server) {
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

    // https://www.theoplayer.com/demo-zone
    // https://demo.theoplayer.com/drm-aes-protection-128-encryption

    if (DRM_scheme && DRM_server) {
        settings.sources[0].drm = {}
        settings.sources[0].drm[DRM_scheme] = {
            licenseAcquisitionURL: DRM_server
        }
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

    // display direct links to the video stream and subtitle sources
    var info
    info = 'Now Playing: <a href="' + URL_video + '">Video</a>'
    if (URL_subtitle) {
        info += ' with <a href="' + URL_subtitle + '">Subtitles</a>'
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
    var b64, hash_regex_pattern, URL_video, URL_subtitle, DRM_data, DRM_scheme, DRM_server

    b64 = '[A-Za-z0-9+/=%]'
    hash_regex_pattern = '^#/watch/(' + b64 + '+?)(?:/subtitle/(' + b64 + '+?))?(?:/referer/(?:' + b64 + '+?))?(?:/drm/(' + b64 + '+?))?$'
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

    var decode_DRM_data = function(str) {
        var DRM_data, pattern, matches

        if (str) {
            pattern = /^(widevine|clearkey|playready|fairplay)\|(https?:.*)$/i
            matches = pattern.exec(str)
            if (matches) {
                DRM_data = {
                    DRM_scheme: matches[1].toLowerCase(),
                    DRM_server: matches[2]
                }
            }
        }
        return DRM_data
    }

    var matches = hash_regex_pattern.exec(window.location.hash)
    if (matches && matches.length && matches[1]) {
        URL_video = decode_URL( matches[1] )

        if (matches.length > 2 && matches[2])
            URL_subtitle = decode_URL( matches[2] )

        if (matches.length > 3 && matches[3]) {
            DRM_data = decode_DRM_data( decode_URL( matches[3] ) )

            if (DRM_data) {
                DRM_scheme = DRM_data.DRM_scheme
                DRM_server = DRM_data.DRM_server
            }
        }
    }

    return {URL_video: URL_video, URL_subtitle: URL_subtitle, DRM_scheme: DRM_scheme, DRM_server: DRM_server}
}

var $DOMContentLoaded = function () {
    var parsed_hash  = parse_location_hash()
    var URL_video    = parsed_hash.URL_video
    var URL_subtitle = parsed_hash.URL_subtitle
    var DRM_scheme   = parsed_hash.DRM_scheme
    var DRM_server   = parsed_hash.DRM_server

    if (URL_video) {
        show_player()
        initialize_videoplayer(URL_video, URL_subtitle, DRM_scheme, DRM_server)
    }
    else {
        document.querySelector('.URL-entry-form button').onclick = function() {
            URL_video    = document.querySelector('.URL-entry-form input#URL_video').value
            URL_subtitle = document.querySelector('.URL-entry-form input#URL_subtitle').value
            DRM_scheme   = null
            DRM_server   = null

            if (URL_video) {
                show_player()
                initialize_videoplayer(URL_video, URL_subtitle, DRM_scheme, DRM_server)
            }
        }
    }
}

var $hashchange = function () {
    var parsed_hash  = parse_location_hash()
    var URL_video    = parsed_hash.URL_video
    var URL_subtitle = parsed_hash.URL_subtitle
    var DRM_scheme   = parsed_hash.DRM_scheme
    var DRM_server   = parsed_hash.DRM_server

    if (URL_video) {
        if (!is_player_showing) show_player()
        initialize_videoplayer(URL_video, URL_subtitle, DRM_scheme, DRM_server)
    }
    else {
        destroy_videoplayer()
    }
}

document.addEventListener("DOMContentLoaded", $DOMContentLoaded)

window.addEventListener("hashchange", $hashchange, false)
