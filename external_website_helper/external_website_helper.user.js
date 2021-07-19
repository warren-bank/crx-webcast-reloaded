// ==UserScript==
// @name         WebCast-Reloaded Helper
// @description  Attempts to workaround issue #1 by automatically redirecting video between secure and insecure external website hosts depending upon the desired behavior.
// @version      0.3.0
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
  "webcast_reloaded_external_website_helper": {
    "workaround_issue_01": {
      "script_enabled":             true,
      "prioritize_cast_over_watch": true
    },
    "prioritize_script_language": {
      "script_enabled":             true,
      "redirect_to_es5":            false,
      "redirect_to_es6":            false
    },
    "prepopulate_incognito_forms": {
      "script_enabled":             true,
      "airplay_sender": {
        "host":                     "192.168.0.100",
        "port":                     "8192",
        "tls":                      false
      },
      "proxy": {
        "host":                     "192.168.0.100",
        "port":                     "8080",
        "tls":                      false
      }
    }
  }
}

// -----------------------------------------------------------------------------
// conditionally redirect HTTP protocol

var workaround_issue_01 = function(){

  // ===========================================================================

  var is_tls_endpoint = function(){
    return window.location.protocol.trim().toLowerCase().startsWith('https')
  }

  var get_endpoint = function(){
    var endpoint = {
      chromecast_sender:  false,
      airplay_sender:     false,
      airplay_sender_es5: false,
      proxy:              false
    }

    var pathname = window.location.pathname.trim().toLowerCase()

    if (pathname.endsWith('chromecast_sender.html'))
      endpoint.chromecast_sender = true
    else if (pathname.endsWith('airplay_sender.html'))
      endpoint.airplay_sender = true
    else if (pathname.endsWith('airplay_sender.es5.html'))
      endpoint.airplay_sender_es5 = true
    else if (pathname.endsWith('proxy.html'))
      endpoint.proxy = true

    return endpoint
  }

  // ===========================================================================

  var redirect = function(endpoint, is_user_initiated){
    var override_search = '?override=true'

    // short-circuit automatic redirects when the user initiated the redirect that brought them to this page
    if (!is_user_initiated && (window.location.search === override_search))
      return

    var webcast_reloaded_base, url

    var to_protocol = is_tls_endpoint() ? 'http' : 'https'

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
    else if (endpoint.airplay_sender_es5)
      url = 'airplay_sender.es5.html'
    else if (endpoint.proxy)
      url = 'proxy.html'

    if (!url)
      return

    url = webcast_reloaded_base + url + (is_user_initiated ? override_search : '') + window.location.hash

    window.location = url
  }

  // ===========================================================================

  var decode_URL = function(str){
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

  var get_video_url = function(){
    var video_url, b64, hash_regex_pattern, matches

    b64 = '[A-Za-z0-9+/=%]'
    hash_regex_pattern = '^#/watch/(' + b64 + '+?)(?:/subtitle/(' + b64 + '+?))?(?:/referer/(' + b64 + '+?))?$'
    hash_regex_pattern = new RegExp(hash_regex_pattern)

    matches = hash_regex_pattern.exec(window.location.hash)
    if (matches && matches.length && matches[1]) {
      video_url = matches[1]
      video_url = decode_URL(video_url)
    }

    return video_url
  }

  var is_tls_video_stream = function(video_url){
    if (!video_url)
      video_url = get_video_url()

    return (!video_url)
      ? false
      : (video_url.trim().substring(0,5).toLowerCase() === 'https')
  }

  var get_chrome_major_version = function(){
    var useragent = navigator.userAgent
    var regex     = /^.*\bChrome\/(\d+)\..*$/
    var version

    version = useragent.replace(regex, '$1')
    version = Number(version)

    return isNaN(version) ? 0 : version
  }

  var update_chromecast_sender_DOM = function(endpoint, message_text, button_text){
    var button_id = 'redirect_button'
    var $div      = document.createElement('div')

    $div.innerHTML = ''
      + '<hr />'
      + '<div>' + message_text + '</div>'
      + '<button id="' + button_id + '">' + button_text + '</button>'

    document.body.appendChild($div)

    var $button = document.getElementById(button_id)

    $button.addEventListener('click', function(event){
      event.preventDefault()
      event.stopPropagation()

      redirect(endpoint, /* is_user_initiated= */ true)
    })
  }

  var process_chromecast_sender = function(endpoint){
    if (!window.location.hash)
      return

    var tls_endpoint         = is_tls_endpoint()
    var tls_video_stream     = is_tls_video_stream()
    var chrome_major_version = get_chrome_major_version()

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

      if (!window.webcast_reloaded_external_website_helper.workaround_issue_01.prioritize_cast_over_watch)
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
        if (window.webcast_reloaded_external_website_helper.workaround_issue_01.prioritize_cast_over_watch)
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

  var process_page = function(){
    var tls_endpoint   = is_tls_endpoint()
    var endpoint       = get_endpoint()
    var airplay_sender = endpoint.airplay_sender || endpoint.airplay_sender_es5

    // airplay_sender => HTTP only
    if (airplay_sender && tls_endpoint) {
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
// conditionally redirect HTTP pathname

var prioritize_script_language = function(){

  // ===========================================================================

  var get_endpoint = function(){
    var endpoint = {
      airplay_sender:     false,
      airplay_sender_es5: false
    }

    var pathname = window.location.pathname.trim().toLowerCase()

    if (pathname.endsWith('airplay_sender.html'))
      endpoint.airplay_sender = true
    else if (pathname.endsWith('airplay_sender.es5.html'))
      endpoint.airplay_sender_es5 = true

    return endpoint
  }

  // ===========================================================================

  var process_page = function(){
    var endpoint = get_endpoint()
    var config   = window.webcast_reloaded_external_website_helper.prioritize_script_language
    var url      = window.location.href

    // airplay_sender: es6 => es5
    if (endpoint.airplay_sender && config.redirect_to_es5) {
      window.location = url.replace(/airplay_sender\.html/i, 'airplay_sender.es5.html')
      return
    }

    // airplay_sender: es5 => es6
    if (endpoint.airplay_sender_es5 && config.redirect_to_es6) {
      window.location = url.replace(/airplay_sender\.es5\.html/i, 'airplay_sender.html')
      return
    }
  }

  process_page()
}

// ----------------------------------------------------------------------------- </prioritize_script_language>
// prepopulate form fields in incognito with preconfigured values,
// since form fields in normal windows are prepopulated from persistent cookies

var prepopulate_incognito_forms = function(){

  // ===========================================================================

  var get_endpoint = function(){
    var endpoint = {
      airplay_sender:     false,
      airplay_sender_es5: false,
      proxy:              false
    }

    var pathname = window.location.pathname.trim().toLowerCase()

    if (pathname.endsWith('airplay_sender.html'))
      endpoint.airplay_sender = true
    else if (pathname.endsWith('airplay_sender.es5.html'))
      endpoint.airplay_sender_es5 = true
    else if (pathname.endsWith('proxy.html'))
      endpoint.proxy = true

    return endpoint
  }

  // ===========================================================================

  var update_form_field_textbox = function(id, val){
    var $field = document.getElementById(id)

    if ($field)
      $field.value = val
  }

  var update_form_field_checkbox = function(id, val){
    if (!val)
      return

    var $field = document.getElementById(id)

    if ($field)
      $field.checked = true
  }

  var process_airplay_sender = function(configs){
    update_form_field_textbox( 'airplay_host', configs.host)
    update_form_field_textbox( 'airplay_port', configs.port)
    update_form_field_checkbox('airplay_tls',  configs.tls)
  }

  var process_proxy = function(configs){
    update_form_field_textbox( 'host', configs.host)
    update_form_field_textbox( 'port', configs.port)
    update_form_field_checkbox('tls',  configs.tls)
  }

  // ===========================================================================

  var process_page = function(){
    var endpoint       = get_endpoint()
    var airplay_sender = endpoint.airplay_sender || endpoint.airplay_sender_es5

    if (airplay_sender) {
      process_airplay_sender(window.webcast_reloaded_external_website_helper.prepopulate_incognito_forms.airplay_sender)
      return
    }

    if (endpoint.proxy) {
      process_proxy(window.webcast_reloaded_external_website_helper.prepopulate_incognito_forms.proxy)
      return
    }
  }

  var process_page_in_incognito_window = function(){
    var fs = window.RequestFileSystem || window.webkitRequestFileSystem

    if (!fs)
      return

    var callback = function(is_incognito){
      if (is_incognito)
        process_page()
    }

    fs(window.TEMPORARY,
      100,
      callback.bind(undefined, false),
      callback.bind(undefined, true)
    )
  }

  process_page_in_incognito_window()
}

// ----------------------------------------------------------------------------- </prepopulate_incognito_forms>

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
  var _function = ''
    + 'function(){'
    + '  window.webcast_reloaded_external_website_helper = ' + JSON.stringify(user_options['webcast_reloaded_external_website_helper'])
    + '}'

  inject_function(_function)
}

var bootstrap = function(){
  inject_options()

  if (user_options.webcast_reloaded_external_website_helper.workaround_issue_01.script_enabled)
    inject_function(workaround_issue_01)

  if (user_options.webcast_reloaded_external_website_helper.prioritize_script_language.script_enabled)
    inject_function(prioritize_script_language)

  if (user_options.webcast_reloaded_external_website_helper.prepopulate_incognito_forms.script_enabled)
    inject_function(prepopulate_incognito_forms)
}

if (user_options['script_enabled']) {
  setTimeout(
    bootstrap,
    user_options['script_injection_delay_ms']
  )
}
