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
      chrome.storage.local.get(['user_options_json', 'selected_website'], function (items) {
        try {
          var data = JSON.parse(items.user_options_json);
          if (!data || !Array.isArray(data.urls) || !data.urls.length || !data.contexts) throw new Error('bad data format');
          state.user_options = data;
          state.selected_website = items.selected_website || 0;
          resolve();
        } catch (e) {
          reject();
        }
      });
    });
  };

  var update_selected_website = function update_selected_website(new_value) {
    var selected_website = Number(new_value);
    state.selected_website = selected_website;
    chrome.storage.local.set({
      selected_website: selected_website
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

  var ff_private_bg_window_proxy = {
    reset_options: function reset_options() {
      return browser.runtime.sendMessage({
        "method": "reset_options"
      });
    },
    set_media_type: function set_media_type(tab_id, display_media) {
      return browser.runtime.sendMessage({
        "method": "set_media_type",
        "params": {
          tab_id: tab_id,
          display_media: display_media
        }
      });
    },
    clear_media: function clear_media(tab_id, hide_popup) {
      return browser.runtime.sendMessage({
        "method": "clear_media",
        "params": {
          tab_id: tab_id,
          hide_popup: hide_popup
        }
      });
    },
    get_media: function get_media(tab_id) {
      return browser.runtime.sendMessage({
        "method": "get_media",
        "params": {
          tab_id: tab_id
        }
      });
    }
  };

  var get_background_window = function get_background_window() {
    state.bg_window = chrome.extension.getBackgroundPage();

    if (!state.bg_window) {
      if (typeof browser !== 'undefined') state.bg_window = ff_private_bg_window_proxy;else throw new Error('');
    }
  };

  var initialize_state = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              get_background_window();
              _context.prev = 1;
              _context.next = 4;
              return get_options();

            case 4:
              _context.next = 12;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              _context.next = 10;
              return state.bg_window.reset_options();

            case 10:
              _context.next = 12;
              return get_options();

            case 12:
              _context.next = 14;
              return get_tab_id();

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 6]]);
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

  var get_contextualized_baseurls_automatic = function get_contextualized_baseurls_automatic(https) {
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

  var get_contextualized_baseurls = function get_contextualized_baseurls(https) {
    if (!state.selected_website) return get_contextualized_baseurls_automatic(https);
    var url_index = state.selected_website - 1;
    var url = state.user_options.urls[url_index];
    return {
      entrypoint: url,
      chromecast: url.replace(baseurl_suffix_regex_pattern, '/chromecast_sender.html'),
      airplay: url.replace(baseurl_suffix_regex_pattern, '/airplay_sender.html'),
      proxy: url.replace(baseurl_suffix_regex_pattern, '/proxy.html')
    };
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

  var process_set_media_type = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(event, media_type) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              event.preventDefault();
              event.stopPropagation();
              _context2.next = 4;
              return state.bg_window.set_media_type(state.tab_id, media_type);

            case 4:
              draw_list();

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function process_set_media_type(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var is_Firefox = navigator.appCodeName === 'Mozilla';
  var is_Fenix = is_Firefox && navigator.appVersion.indexOf('Android') >= 0;

  var process_click_open = function process_click_open(event, url) {
    event.preventDefault();
    event.stopPropagation();

    try {
      var options = {
        url: url
      };
      if (!is_Fenix) options.windowId = chrome.windows.WINDOW_ID_CURRENT;
      chrome.tabs.create(options);
    } catch (e) {}
  };

  var process_click_copy = function process_click_copy(event, url) {
    event.preventDefault();
    event.stopPropagation();

    try {
      navigator.clipboard.writeText(url);
    } catch (e) {}
  };

  var process_clear_media = function process_clear_media(event) {
    event.preventDefault();
    event.stopPropagation();
    state.bg_window.clear_media(state.tab_id, true);
  };

  var process_selected_website = function process_selected_website(event) {
    event.preventDefault();
    event.stopPropagation();
    update_selected_website(event.target.value);
    draw_list(true);
  };

  var all_media_types = ["videos", "audios", "captions", "drm_licenses"];

  var is_audio_video = function is_audio_video(media_type) {
    return ["videos", "audios"].indexOf(media_type) >= 0;
  };

  var format_media_type = function format_media_type(media_type) {
    return media_type.replaceAll('_', ' ');
  };

  var hls_regex_pattern = /\.m3u8(?:[#\?]|$)/i;

  var is_hls = function is_hls(url) {
    return hls_regex_pattern.test(url);
  };

  var App = function App(_ref3) {
    var media_type = _ref3.media_type,
        media = _ref3.media;
    var av_media_type = is_audio_video(media_type);
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
      }, format_media_type(media_type_option));
    })), React.createElement("h3", null, media.length, " ", format_media_type(media_type), " detected on page."), !media.length ? null : React.createElement(React.Fragment, null, React.createElement("div", {
      id: "actions"
    }, React.createElement("button", {
      onClick: process_clear_media
    }, "Clear list of ", format_media_type(media_type)), state.user_options.urls.length <= 1 ? null : React.createElement("div", {
      className: "selected_website"
    }, React.createElement("h4", null, "External Website:"), React.createElement("div", null, React.createElement("select", {
      onChange: process_selected_website
    }, React.createElement("option", {
      value: "0",
      selected: state.selected_website === 0
    }, "Automatic"), state.user_options.urls.map(function (url_string, index) {
      var value = index + 1;
      var url = new URL(url_string);
      var name = "[".concat(url.protocol.toUpperCase().replace(/:$/, ''), "] ").concat(url.hostname.replace('webcast-reloaded.', '').replace('warren-bank.', ''));
      return React.createElement("option", {
        value: value,
        selected: state.selected_website === value
      }, name);
    }))))), React.createElement("h4", null, "Click ", av_media_type ? 'icons' : 'icon', " to transfer to external website."), React.createElement("h4", null, "Click link to copy URL to clipboard."), React.createElement("div", {
      id: "links"
    }, media.map(function (media_item, index) {
      var links = get_links(media_item);
      return React.createElement("div", {
        className: av_media_type ? "media-item" : "non-av media-item",
        key: index
      }, React.createElement("div", {
        className: "icons-container"
      }, !av_media_type ? null : React.createElement("a", {
        className: "chromecast",
        href: links.chromecast,
        onClick: function onClick(event) {
          return process_click_open(event, links.chromecast);
        },
        title: "Chromecast Sender"
      }, React.createElement("img", {
        src: "img/chromecast.png"
      })), !av_media_type ? null : React.createElement("a", {
        className: "airplay",
        href: links.airplay,
        onClick: function onClick(event) {
          return process_click_open(event, links.airplay);
        },
        title: "ExoAirPlayer Sender"
      }, React.createElement("img", {
        src: "img/airplay.png"
      })), !av_media_type || !is_hls(media_item.media_url) ? null : React.createElement("a", {
        className: "proxy",
        href: links.proxy,
        onClick: function onClick(event) {
          return process_click_open(event, links.proxy);
        },
        title: "HLS-Proxy Configuration"
      }, React.createElement("img", {
        src: "img/proxy.png"
      })), React.createElement("a", {
        className: "media-link",
        href: links.media_link,
        onClick: function onClick(event) {
          return process_click_open(event, links.media_link);
        },
        title: "direct link to media item"
      }, React.createElement("img", {
        src: "img/media_link.png"
      }))), React.createElement("div", {
        className: "text-container"
      }, React.createElement("a", {
        className: "entrypoint",
        href: links.media_link,
        onClick: function onClick(event) {
          return process_click_copy(event, links.media_link);
        },
        title: "copy link to clipboard"
      }, links.media_link)));
    }))));
  };

  var get_props = function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return state.bg_window.get_media(state.tab_id);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function get_props() {
      return _ref4.apply(this, arguments);
    };
  }();

  var draw_list = function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var force,
          props,
          _args4 = arguments;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              force = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : false;
              _context4.next = 3;
              return get_props();

            case 3:
              props = _context4.sent;

              if (!(!force && props.media_type === state.media_type && props.media === state.media)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return");

            case 6:
              state.media_type = props.media_type;
              state.media = props.media;
              ReactDOM.render(React.createElement(App, props), document.getElementById('root'));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function draw_list() {
      return _ref5.apply(this, arguments);
    };
  }();

  var close_popup = function close_popup() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    state.media_type = null;
    state.media = null;
    state.bg_window = null;
    window.close();
  };

  var initialize_popup = function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return initialize_state();

            case 3:
              draw_list();
              state.timer = setInterval(draw_list, 500);
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              close_popup();

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    return function initialize_popup() {
      return _ref6.apply(this, arguments);
    };
  }();

  document.addEventListener('DOMContentLoaded', initialize_popup);
})();

//# sourceMappingURL=popup.js.map