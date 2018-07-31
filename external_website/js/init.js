var show_player = function() {
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

window.onload = function () {
    var hash_regex_pattern = new RegExp('^#/watch/([^/]+)(?:/subtitle/(.+))?$', 'i');
    var URL_video, URL_subtitle;

    var matches = hash_regex_pattern.exec(window.location.hash)
    if (matches && matches.length && matches[1]) {
        show_player();

        URL_video = window.atob( matches[1] );
        if (matches.length > 2 && matches[2]) {
            URL_subtitle = window.atob( matches[2] );

            if (! share_common_origin( URL_video, URL_subtitle )) {
                URL_subtitle = null;
            }
        }
        initialize_videoplayer(URL_video, URL_subtitle);
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
};
