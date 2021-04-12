// ==UserScript==
// @name         WebCast-Reloaded HLS-Proxy configuration
// @description  Userscript for Android-WebMonkey to enable the ability to open an Intent chooser to view the proxied video stream in another app (ex: Android-WebCast).
// @version      1.0.0
// @match        *://warren-bank.github.io/crx-webcast-reloaded/external_website/proxy.html*
// @match        *://webcast-reloaded.surge.sh/proxy.html*
// @match        *://gitcdn.link/cdn/warren-bank/crx-webcast-reloaded/gh-pages/external_website/proxy.html*
// @icon         https://warren-bank.github.io/crx-webcast-reloaded/external_website/4-clappr/img/favicon.ico
// @run-at       document-idle
// @homepage     https://github.com/warren-bank/crx-webcast-reloaded/tree/gh-pages/external_website_helper
// @supportURL   https://github.com/warren-bank/crx-webcast-reloaded/issues
// @downloadURL  https://github.com/warren-bank/crx-webcast-reloaded/raw/gh-pages/external_website_helper/external_website_proxy_webmonkey.user.js
// @updateURL    https://github.com/warren-bank/crx-webcast-reloaded/raw/gh-pages/external_website_helper/external_website_proxy_webmonkey.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

var user_options = {
  "script_init_poll_interval_ms": 500,
  "script_init_timeout_ms": 30000
}

var max_poll_attempts = Math.ceil(user_options.script_init_timeout_ms / user_options.script_init_poll_interval_ms)
var count_poll_attempts = 0

var call_init_when_dom_ready = function() {
  count_poll_attempts++

  if (count_poll_attempts > max_poll_attempts)
    return

  if (typeof unsafeWindow.enable_webmonkey === 'function')
    unsafeWindow.enable_webmonkey(GM_startIntent)
  else
    unsafeWindow.setTimeout(call_init_when_dom_ready, user_options.script_init_poll_interval_ms)
}

if (typeof GM_startIntent === 'function')
  call_init_when_dom_ready()
