;

(function () {
  "use strict";

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var state = {};

  var get_options = function get_options() {
    return new Promise(function (resolve, reject) {
      chrome.storage.sync.get(['user_options_json'], function (items) {
        try {
          var data = JSON.parse(items.user_options_json);
          if (!data || !Array.isArray(data.urls) || !data.urls.length || !data.contexts) throw new Error('bad data format');
          state.user_options = data;
          resolve();
        } catch (e) {
          reject();
        }
      });
    });
  };

  var get_tab_id = function get_tab_id() {
    return new Promise(function (resolve, reject) {
      chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
      }, function (matching_tabs_array) {
        var tab_id = matching_tabs_array && Array.isArray(matching_tabs_array) && matching_tabs_array.length ? matching_tabs_array[0].id : null;

        if (tab_id && tab_id !== chrome.tabs.TAB_ID_NONE) {
          state.tab_id = tab_id;
          resolve();
        } else {
          reject();
        }
      });
    });
  };

  var get_background_window = function get_background_window() {
    state.bg_window = chrome.extension.getBackgroundPage();
  };

  var initialize_state = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return get_options();

            case 2:
              _context.next = 4;
              return get_tab_id();

            case 4:
              get_background_window();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function initialize_state() {
      return _ref.apply(this, arguments);
    };
  }();

  var encode_link = function encode_link(str, double_urlencode) {
    if (!str || typeof str !== 'string') return '';
    str = window.btoa(str);
    str = encodeURIComponent(str);

    if (double_urlencode) {
      str = encodeURIComponent(str);
    }

    return str;
  };

  var is_https = function is_https(url) {
    return url.substring(0, 6).toLowerCase() === 'https:';
  };

  var baseurl_suffix_regex_pattern = /\/(index\.html)?$/i;

  var get_contextualized_baseurls = function get_contextualized_baseurls(https) {
    var urls = {
      entrypoint: '_text_link',
      chromecast: '_chromecast',
      airplay: '_airplay',
      proxy: '_proxy'
    };

    for (var key in urls) {
      var context_key = "http".concat(https ? 's' : '').concat(urls[key]);
      var url_index = state.user_options.contexts[context_key] - 1;
      var url = state.user_options.urls[url_index];
      urls[key] = url;
    }

    urls.chromecast = urls.chromecast.replace(baseurl_suffix_regex_pattern, '/chromecast_sender.html');
    urls.airplay = urls.airplay.replace(baseurl_suffix_regex_pattern, '/airplay_sender.html');
    urls.proxy = urls.proxy.replace(baseurl_suffix_regex_pattern, '/proxy.html');
    return urls;
  };

  var get_links = function get_links(media_item) {
    var media_url = media_item.media_url,
        referer_url = media_item.referer_url;
    var links = {};
    if (!media_url) return links;
    var base64_video = encode_link(media_url, true);
    var base64_referer = encode_link(referer_url, true);
    var https = is_https(media_url);
    var urls = get_contextualized_baseurls(https);
    var hash = "#/watch/" + base64_video + (base64_referer ? "/referer/" + base64_referer : "");
    links.media_link = media_url;
    links.entrypoint = urls.entrypoint + hash;
    links.chromecast = urls.chromecast + hash;
    links.airplay = urls.airplay + hash;
    links.proxy = urls.proxy + hash;
    return links;
  };

  var process_set_media_type = function process_set_media_type(event, media_type) {
    event.preventDefault();
    event.stopPropagation();
    state.bg_window.set_media_type(state.tab_id, media_type);
    draw_list();
  };

  var process_click = function process_click(event, url) {
    event.preventDefault();
    event.stopPropagation();
    chrome.tabs.create({
      windowId: chrome.windows.WINDOW_ID_CURRENT,
      url: url
    });
  };

  var process_clear_media = function process_clear_media(event) {
    event.preventDefault();
    event.stopPropagation();
    state.bg_window.clear_media(state.tab_id, true);
    close_popup();
  };

  var all_media_types = ["videos", "audios", "captions"];

  var is_audio_video = function is_audio_video(media_type) {
    return ["videos", "audios"].indexOf(media_type) >= 0;
  };

  var hls_regex_pattern = /\.m3u8(?:[#\?]|$)/i;

  var is_hls = function is_hls(url) {
    return hls_regex_pattern.test(url);
  };

  var App = function App(_ref2) {
    var media_type = _ref2.media_type,
        media = _ref2.media;
    return React.createElement("div", {
      id: "app"
    }, React.createElement("div", {
      id: "media-type-options"
    }, all_media_types.map(function (media_type_option, index) {
      return React.createElement("button", {
        disabled: media_type_option === media_type,
        onClick: function onClick(event) {
          return process_set_media_type(event, media_type_option);
        }
      }, media_type_option);
    })), React.createElement("h3", null, media.length, " ", media_type, " detected on page."), React.createElement("h4", null, "Click link to transfer the media item to external website in a new tab."), React.createElement("div", {
      id: "links"
    }, media.map(function (media_item, index) {
      var links = get_links(media_item);
      return React.createElement("div", {
        "class": "media-item",
        key: index
      }, React.createElement("div", {
        "class": "icons-container"
      }, !is_audio_video(media_item.media_type) ? null : React.createElement("a", {
        "class": "chromecast",
        href: links.chromecast,
        onClick: function onClick(event) {
          return process_click(event, links.chromecast);
        },
        title: "Chromecast Sender"
      }, React.createElement("img", {
        src: "img/chromecast.png"
      })), !is_audio_video(media_item.media_type) ? null : React.createElement("a", {
        "class": "airplay",
        href: links.airplay,
        onClick: function onClick(event) {
          return process_click(event, links.airplay);
        },
        title: "ExoAirPlayer Sender"
      }, React.createElement("img", {
        src: "img/airplay.png"
      })), !is_audio_video(media_item.media_type) || !is_hls(media_item.media_url) ? null : React.createElement("a", {
        "class": "proxy",
        href: links.proxy,
        onClick: function onClick(event) {
          return process_click(event, links.proxy);
        },
        title: "HLS-Proxy Configuration"
      }, React.createElement("img", {
        src: "img/proxy.png"
      })), React.createElement("a", {
        "class": "media-link",
        href: links.media_link,
        onClick: function onClick(event) {
          return process_click(event, links.media_link);
        },
        title: "direct link to media item"
      }, React.createElement("img", {
        src: "img/media_link.png"
      }))), React.createElement("div", {
        "class": "text-container"
      }, React.createElement("a", {
        "class": "entrypoint",
        href: links.entrypoint,
        onClick: function onClick(event) {
          return process_click(event, is_audio_video(media_item.media_type) ? links.entrypoint : links.media_link);
        },
        title: links.media_link
      }, links.media_link)));
    })), React.createElement("div", {
      id: "actions"
    }, React.createElement("button", {
      onClick: process_clear_media
    }, "Clear ", media_type, " list")));
  };

  var get_props = function get_props() {
    return state.bg_window.get_media(state.tab_id);
  };

  var draw_list = function draw_list() {
    var props = get_props();
    if (props.media_type === state.media_type && props.media === state.media) return;
    state.media_type = props.media_type;
    state.media = props.media;
    if (!props.media || !props.media.length) return close_popup();
    ReactDOM.render(React.createElement(App, props), document.getElementById('root'));
  };

  var close_popup = function close_popup() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    state.media_type = null;
    state.media = null;
    state.bg_window = null;
    window.close();
  };

  var initialize_popup = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return initialize_state();

            case 3:
              draw_list();
              state.timer = setInterval(draw_list, 500);
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              close_popup();

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function initialize_popup() {
      return _ref3.apply(this, arguments);
    };
  }();

  document.addEventListener('DOMContentLoaded', initialize_popup);
})();

//# sourceMappingURL=popup.js.map