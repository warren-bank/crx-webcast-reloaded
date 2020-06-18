// ==UserScript==
// @name         WebCast-Reloaded Helper
// @description  Attempts to workaround issue #1 by automatically redirecting video between secure and insecure external website hosts depending upon the desired behavior.
// @version      0.1.0
// @match        *://warren-bank.github.io/crx-webcast-reloaded/external_website/*
// @match        *://webcast-reloaded.surge.sh/*
// @match        *://gitcdn.link/cdn/warren-bank/crx-webcast-reloaded/gh-pages/external_website/*
// @icon         https://warren-bank.github.io/crx-webcast-reloaded/external_website/4-clappr/img/favicon.ico
// @run-at       document-idle
// @homepage     https://github.com/warren-bank/crx-webcast-reloaded/tree/gh-pages/external_website_helper
// @supportURL   https://github.com/warren-bank/crx-webcast-reloaded/issues/1
// @downloadURL  https://github.com/warren-bank/crx-webcast-reloaded/raw/gh-pages/external_website_helper/external_website_helper.user.js
// @updateURL    https://github.com/warren-bank/crx-webcast-reloaded/raw/gh-pages/external_website_helper/external_website_helper.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

// https://www.chromium.org/developers/design-documents/user-scripts

var user_options = {
  "script_enabled":             true,
  "script_injection_delay_ms":  0,
  "prioritize_cast_over_watch": true
}

// -----------------------------------------------------------------------------

var workaround_issue_01 = function(){

  // ===========================================================================

  const is_tls_endpoint = () => window.location.protocol.trim().toLowerCase().startsWith('https')

  const get_endpoint = () => {
    const endpoint = {
      chromecast_sender: false,
      airplay_sender:    false,
      proxy:             false
    }

    const pathname = window.location.pathname.trim().toLowerCase()

    if (pathname.endsWith('chromecast_sender.html'))
      endpoint.chromecast_sender = true
    else if (pathname.endsWith('airplay_sender.html'))
      endpoint.airplay_sender = true
    else if (pathname.endsWith('proxy.html'))
      endpoint.proxy = true

    return endpoint
  }

  // ===========================================================================

  const redirect = (endpoint, is_user_initiated) => {
    const override_search = '?override=true'

    // short-circuit automatic redirects when the user initiated the redirect that brought them to this page
    if (!is_user_initiated && (window.location.search === override_search))
      return

    let webcast_reloaded_base, url

    const to_protocol = is_tls_endpoint() ? 'http' : 'https'

    webcast_reloaded_base = {
      "https": "https://warren-bank.github.io/crx-webcast-reloaded/external_website/",
      "http":  "http://webcast-reloaded.surge.sh/"
    }
    webcast_reloaded_base = webcast_reloaded_base[to_protocol]

    url = null
    if (endpoint.chromecast_sender)
      url = 'chromecast_sender.html'
    else if (endpoint.airplay_sender)
      url = 'airplay_sender.html'
    else if (endpoint.proxy)
      url = 'proxy.html'

    if (!url)
      return

    url = webcast_reloaded_base + url + (is_user_initiated ? override_search : '') + window.location.hash

    window.location = url
  }

  // ===========================================================================

  const decode_URL = (str) => {
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

  const get_video_url = () => {
    let video_url, b64, hash_regex_pattern, matches

    b64 = '[A-Za-z0-9+/=%]'
    hash_regex_pattern = `^#/watch/(${b64}+?)(?:/subtitle/(${b64}+?))?(?:/referer/(${b64}+?))?$`
    hash_regex_pattern = new RegExp(hash_regex_pattern)

    matches = hash_regex_pattern.exec(window.location.hash)
    if (matches && matches.length && matches[1]) {
      video_url = matches[1]
      video_url = decode_URL(video_url)
    }

    return video_url
  }

  const is_tls_video_stream = (video_url) => {
    if (!video_url)
      video_url = get_video_url()

    return (!video_url)
      ? false
      : (video_url.trim().substring(0,5).toLowerCase() === 'https')
  }

  const get_chrome_major_version = () => {
    const useragent = navigator.userAgent
    const regex     = /^.*\bChrome\/(\d+)\..*$/
    let version

    version = useragent.replace(regex, '$1')
    version = Number(version)

    return isNaN(version) ? 0 : version
  }

  const update_chromecast_sender_DOM = (endpoint, message_text, button_text) => {
    const button_id = 'redirect_button'
    const $div      = document.createElement('div')

    $div.innerHTML = `
      <hr />
      <div>${message_text}</div>
      <button id="${button_id}">${button_text}</button>
    `

    document.body.appendChild($div)

    const $button = document.getElementById(button_id)

    $button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()

      redirect(endpoint, /* is_user_initiated= */ true)
    })
  }

  const process_chromecast_sender = (endpoint) => {
    if (!window.location.hash)
      return

    const tls_endpoint         = is_tls_endpoint()
    const tls_video_stream     = is_tls_video_stream()
    const chrome_major_version = get_chrome_major_version()

    if (tls_video_stream && tls_endpoint) {
      // cast:  YES
      // watch: YES

      return
    }

    if (tls_video_stream && !tls_endpoint) {
      // cast:
      //   Chrome <  72: YES
      //   Chrome >= 72: NO  (not allowed to cast video from an insecure context)
      // watch: YES

      if (chrome_major_version >= 72)
        redirect(endpoint)

      return
    }

    if (!tls_video_stream && tls_endpoint) {
      // cast:  YES
      // watch: NO  (not allowed to load insecure content from a secure context)

      if (!window.prioritize_cast_over_watch)
        redirect(endpoint)

      // =============================
      // note:
      //   * the above redirect will NOT proceed if the user came to this page by an intentional redirect
      //   * in that case, execution will continue..
      // =============================

      update_chromecast_sender_DOM(endpoint, 'Insecure stream can only be watched from an insecure domain.<br>To send video to Chromecast, do <b>not</b> redirect.', 'Redirect to HTTP')
      return
    }

    if (!tls_video_stream && !tls_endpoint) {
      // cast:
      //   Chrome <  72: YES
      //   Chrome >= 72: NO  (not allowed to cast video from an insecure context)
      // watch: YES

      if (chrome_major_version >= 72) {
        if (window.prioritize_cast_over_watch)
          redirect(endpoint)

        // =============================
        // note:
        //   * the above redirect will NOT proceed if the user came to this page by an intentional redirect
        //   * in that case, execution will continue..
        // =============================
        update_chromecast_sender_DOM(endpoint, 'Chromecast session can only be initialized from a secure domain.<br>To watch video in your browser, do <b>not</b> redirect.', 'Redirect to HTTPS')
      }

      return
    }
  }

  // ===========================================================================

  const process_page = () => {
    const tls_endpoint = is_tls_endpoint()
    const     endpoint = get_endpoint()

    // airplay_sender => HTTP only
    if (endpoint.airplay_sender && tls_endpoint) {
      redirect(endpoint)
      return
    }

    // proxy => HTTP only
    if (endpoint.proxy && tls_endpoint) {
      redirect(endpoint)
      return
    }

    if (endpoint.chromecast_sender)
      process_chromecast_sender(endpoint)
  }

  process_page()
}

// ----------------------------------------------------------------------------- </workaround_issue_01>

var get_hash_code = function(str){
  var hash, i, char
  hash = 0
  if (str.length == 0) {
    return hash
  }
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i)
    hash = ((hash<<5)-hash)+char
    hash = hash & hash  // Convert to 32bit integer
  }
  return Math.abs(hash)
}

var inject_function = function(_function){
  var inline, script, head

  inline = _function.toString()
  inline = '(' + inline + ')()' + '; //# sourceURL=crx_extension.' + get_hash_code(inline)
  inline = document.createTextNode(inline)

  script = document.createElement('script')
  script.appendChild(inline)

  head = document.head
  head.appendChild(script)
}

var inject_options = function(){
  var _function = `function(){
    window.prioritize_cast_over_watch = ${user_options['prioritize_cast_over_watch']}
  }`
  inject_function(_function)
}

var bootstrap = function(){
  inject_options()
  inject_function(workaround_issue_01)
}

if (user_options['script_enabled']) {
  setTimeout(
    bootstrap,
    user_options['script_injection_delay_ms']
  )
}
