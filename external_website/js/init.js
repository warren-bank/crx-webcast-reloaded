var is_player_showing = false

var show_player = function() {
  is_player_showing = true

  document.querySelector('.URL-entry-form').style.display = 'none'
  document.querySelector('.player').style.display = 'block'
}

var share_common_origin = function(url1, url2) {
  var same = false;
  try {
    var $url1 = new URL(url1);
    var $url2 = new URL(url2);
    same = ($url1.hostname === $url2.hostname);
  }
  catch(e) {
    same = false;
  }
  return same;
}

var parse_location_hash = function() {
    var hash_regex_pattern = new RegExp('^#/watch/([^/]+)(?:/subtitle/(.+))?$', 'i');
    var URL_video, URL_subtitle;

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

            if (! share_common_origin( URL_video, URL_subtitle )) {
                console.log('WARNING: video and subtitles are hosted at different domains. This is likely to cause a problem.')
//              URL_subtitle = null;
            }
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
