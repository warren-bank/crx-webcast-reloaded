// ==UserScript==
// @name         WebCast-Reloaded
// @description  Userscript for Android-WebMonkey to enable the ability to open an Intent chooser to transfer video streams to another app (ex: Android-WebCast).
// @version      1.0.1
// @match        *://warren-bank.github.io/crx-webcast-reloaded/external_website/*
// @match        *://webcast-reloaded.surge.sh/*
// @match        *://gitcdn.link/cdn/warren-bank/crx-webcast-reloaded/gh-pages/external_website/*
// @icon         https://warren-bank.github.io/crx-webcast-reloaded/external_website/4-clappr/img/favicon.ico
// @run-at       document-idle
// @homepage     https://github.com/warren-bank/crx-webcast-reloaded/tree/gh-pages/external_website_helper
// @supportURL   https://github.com/warren-bank/crx-webcast-reloaded/issues
// @downloadURL  https://github.com/warren-bank/crx-webcast-reloaded/raw/gh-pages/external_website_helper/external_website_webmonkey.user.js
// @updateURL    https://github.com/warren-bank/crx-webcast-reloaded/raw/gh-pages/external_website_helper/external_website_webmonkey.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

// ================================================================================================= config

var user_options = {
  "script_init_poll_interval_ms": 500,
  "script_init_timeout_ms": 30000
}

// ================================================================================================= extract data from URL #hash

var encoded_urls = {
  video:      null,
  caption:    null,
  referer:    null,
  drm:        null
}

var decoded_urls = {
  video:      null,
  caption:    null,
  referer:    null,
  drm_scheme: null,
  drm_server: null
}

var decode_URL = function(str) {
  var tail, done

  if (str) {
    while (! done) {
      tail = str
      str  = unsafeWindow.decodeURIComponent(tail)
      done = (tail === str)
    }
    str = unsafeWindow.atob(str)
  }
  return str
}

var get_encoded_urls = function() {
  var b64, hash_regex_pattern, matches

  b64 = '[A-Za-z0-9+/=%]'
  hash_regex_pattern = '^#/watch/(' + b64 + '+?)(?:/subtitle/(' + b64 + '+?))?(?:/referer/(' + b64 + '+?))?(?:/drm/(' + b64 + '+?))?$'
  hash_regex_pattern = new RegExp(hash_regex_pattern)

  matches = hash_regex_pattern.exec(unsafeWindow.location.hash)
  if (matches && matches.length && matches[1]) {
    encoded_urls.video = matches[1]

    if ((matches.length > 2) && matches[2])
      encoded_urls.caption = matches[2]

    if ((matches.length > 3) && matches[3])
      encoded_urls.referer = matches[3]

    if ((matches.length > 4) && matches[4])
      encoded_urls.drm = matches[4]
  }
}

var get_decoded_urls = function() {
  var base64_payload, payload, pattern, matches

  if (encoded_urls.video)
    decoded_urls.video = decode_URL(encoded_urls.video)

  if (encoded_urls.caption)
    decoded_urls.caption = decode_URL(encoded_urls.caption)

  if (encoded_urls.referer)
    decoded_urls.referer = decode_URL(encoded_urls.referer)

  if (encoded_urls.drm) {
    base64_payload = encoded_urls.drm
    payload        = decode_URL(base64_payload)

    pattern = /^(widevine|clearkey|playready|fairplay)\|(https?:.*)$/i
    matches = pattern.exec(payload)
    if (matches) {
      decoded_urls.drm_scheme = matches[1]
      decoded_urls.drm_server = matches[2]
    }
  }

}

// ================================================================================================= init

var is_hls_proxy = function() {
  return (unsafeWindow.location.pathname.indexOf('proxy.html') >= 0)
}

var start_android_intent = function(video_url, video_type, referer_url, drm_scheme, drm_server) {
  if (!video_url) return

  var args = [
    'android.intent.action.VIEW',  /* action */
    video_url,                     /* data   */
    video_type                     /* type   */
  ]

  if (referer_url) {
    // extras:
    args.push('referUrl')          /* key          */
    args.push(referer_url)         /* string value */
  }

  if (drm_scheme && drm_server) {
    // extras:
    args.push('drmScheme')         /* key          */
    args.push(drm_scheme)          /* string value */

    args.push('drmUrl')            /* key          */
    args.push(drm_server)          /* string value */
  }

  GM_startIntent.apply(null, args)
}

var hls_proxy_callback = function(hls_url, referer_url, drm_scheme, drm_server) {
  start_android_intent(hls_url, 'application/x-mpegurl', referer_url, drm_scheme, drm_server)
}

var non_hls_proxy_callback = function() {
  get_encoded_urls()
  get_decoded_urls()

  start_android_intent(decoded_urls.video, null, decoded_urls.referer, decoded_urls.drm_scheme, decoded_urls.drm_server)
}

var init = function() {
  var webmonkey_callback = is_hls_proxy()
    ? hls_proxy_callback
    : non_hls_proxy_callback

  unsafeWindow.enable_webmonkey(webmonkey_callback)
}

// ================================================================================================= bootstrap

var max_poll_attempts = Math.ceil(user_options.script_init_timeout_ms / user_options.script_init_poll_interval_ms)
var count_poll_attempts = 0

var call_init_when_dom_ready = function() {
  count_poll_attempts++

  if (count_poll_attempts > max_poll_attempts)
    return

  if (typeof unsafeWindow.enable_webmonkey === 'function')
    init()
  else
    unsafeWindow.setTimeout(call_init_when_dom_ready, user_options.script_init_poll_interval_ms)
}

if (typeof GM_startIntent === 'function')
  call_init_when_dom_ready()
