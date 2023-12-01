// --------------------------------------------------------- video player managment tasks:
// https://github.com/videojs/video.js
// https://github.com/videojs/videojs-contrib-eme
// https://github.com/videojs/videojs-contrib-eme#setting-options-per-source
// https://github.com/silvermine/videojs-chromecast
// https://github.com/silvermine/videojs-chromecast/issues/29
// https://docs.videojs.com/
// https://docs.videojs.com/player
// https://docs.videojs.com/player#src
// https://docs.videojs.com/player#addRemoteTextTrack
// https://docs.videojs.com/player#play
// https://docs.videojs.com/player#currentTime
// https://docs.videojs.com/player#pause
// https://docs.videojs.com/player#dispose
// https://videojs.com/guides/options/
// https://videojs.com/guides/text-tracks/

var disconnect_chromecast = function(player) {
    // how?
}

var toggle_chromecast_connection_state = function() {
    // how?

    var button = document.querySelector('.vjs-chromecast-button')
    if (button && button.click) button.click()
}

var webcast_video_player

var destroy_videoplayer = function(skip_reload) {
    if (webcast_video_player) {
        webcast_video_player.pause()
        webcast_video_player.dispose()  // note: does NOT disconnect from Chromecast
        disconnect_chromecast()

        webcast_video_player = null

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
          webcast_video_player.currentTime(secs)
    }
}

var initialize_videoplayer_dom = function() {
    var video_container = document.querySelector('.webcast-video-player > #video-player')
    var video_element   = document.createElement('video')

    video_element.setAttribute('id', 'video-element')
    video_element.className = 'video-js vjs-default-skin vjs-big-play-centered'

    video_container.innerHTML = ''
    video_container.appendChild(video_element)
}

var initialize_videoplayer = function(URL_video, URL_subtitle, DRM_scheme, DRM_server) {
    if (! URL_video) return

    // cleanup
    destroy_videoplayer(true)
    initialize_videoplayer_dom()

    var options = {
        techOrder: [ 'chromecast', 'html5' ],
        plugins: {
            chromecast: {
                receiverAppID: '9DFB77C0',
                addButtonToControlBar: true,
                addCastLabelToButton: false
            }
        },
        width:    720,
        height:   405,
        autoPlay: false,
        controls: true,
        poster:   'img/poster.jpg'
    }

    webcast_video_player = videojs('video-element', options, function onPlayerReady() {
        var source = {
            src: URL_video
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
                source.type = type.mime
                return false
            }
            return true
        })
        types = undefined

        if (DRM_scheme && DRM_server) {
            source.keySystems = {}

            switch(DRM_scheme) {
                case 'widevine':
                    source.keySystems['com.widevine.alpha'] = DRM_server
                    break
                case 'clearkey':
                    source.keySystems['org.w3.clearkey'] = DRM_server
                    break
                case 'playready':
                    source.keySystems['com.microsoft.playready'] = DRM_server
                    break
                case 'fairplay':
                default:
                    delete source.keySystems
                    break
            }
        }

        webcast_video_player.eme()

        webcast_video_player.src(source)

        if (URL_subtitle) {
            // video.js only supports .vtt external text tracks
            webcast_video_player.addRemoteTextTrack(
                {
                    src:     URL_subtitle,
                    kind:    'subtitles',
                    mode:    'showing',
                    default: true
                },
                false
            )
        }

        webcast_video_player.play()

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
    })
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
            DRM_scheme   = document.querySelector('.URL-entry-form select#DRM_scheme').value
            DRM_server   = document.querySelector('.URL-entry-form input#DRM_server').value

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
