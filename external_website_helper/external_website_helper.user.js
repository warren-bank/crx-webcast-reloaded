// ==UserScript==
// @name         WebCast-Reloaded Helper
// @description  Attempts to workaround issue #1 by automatically redirecting video between secure and insecure external website hosts depending upon the desired behavior.
// @version      0.3.5
// @match        *://warren-bank.github.io/crx-webcast-reloaded/external_website/*
// @match        *://webcast-reloaded.frii.site/*
// @match        *://webcast-reloaded.surge.sh/*
// @match        *://raw.githack.com/warren-bank/crx-webcast-reloaded/gh-pages/external_website/*
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
  "script_enabled":                   true,
  "script_injection_delay_ms":        0,
  "webcast_reloaded_external_website_helper": {
    "always_redirect_to_webhost": {
      "script_enabled":               true,
      "webhost": {
        "http":                       "webcast-reloaded.surge.sh/",
        "https":                      "warren-bank.github.io/crx-webcast-reloaded/external_website/"
        /*
         * examples (http):
         *   "webcast-reloaded.frii.site/"
         *   "webcast-reloaded.surge.sh/"
         *   "raw.githack.com/warren-bank/crx-webcast-reloaded/gh-pages/external_website/"
         * examples (https):
         *   "warren-bank.github.io/crx-webcast-reloaded/external_website/"
         */
      }
    },
    "always_redirect_to_endpoint": {
      "script_enabled":               false,
      "endpoint":                     "/airplay_sender.html"
        /*
         * examples:
         *   "/airplay_sender.html"
         *   "/airplay_sender.es5.html"
         *   "/proxy.html"
         *   "/chromecast_sender.html"
         *   "/4-clappr/index.html"
         *   "/6-clappr-latest/index.html"
         */
    },
    "workaround_issue_01": {
      "script_enabled":               true,
      "airplay_sender": {
        "block_mixed_content":        true
      },
      "chromecast_sender": {
        "prioritize_cast_over_watch": true
      }
    },
    "prioritize_script_language": {
      "script_enabled":               false,
      "redirect_to_es5":              true,
      "redirect_to_es6":              false
    },
    "prepopulate_form_fields": {
      "script_enabled":               true,
      "script_delay_ms":              500,
      "airplay_sender": [
        {
          "host":                     "192.168.0.2",
          "port":                     "8192",
          "tls":                      false
        },
        {
          "host":                     "192.168.0.3",
          "port":                     "8192",
          "tls":                      false,
          "default":                  true
        },
        {
          "host":                     "192.168.0.4",
          "port":                     "8192",
          "tls":                      false
        }
      ],
      "proxy": [
        {
          "host":                     "192.168.0.2",
          "port":                     "8080",
          "tls":                      false
        },
        {
          "host":                     "192.168.0.3",
          "port":                     "8080",
          "tls":                      false,
          "default":                  true
        },
        {
          "host":                     "192.168.0.4",
          "port":                     "8080",
          "tls":                      false
        }
      ]
    }
  }
}

// -----------------------------------------------------------------------------
// conditionally redirect to specific webhost

var always_redirect_to_webhost = function(){

  // ===========================================================================

  var is_tls_endpoint = function(){
    return window.location.protocol.trim().toLowerCase().startsWith('https')
  }

  var get_current_webhost = function(){
    var needle = '/external_website/'
    var index  = window.location.pathname.indexOf(needle)

    return window.location.hostname + (
      (index >= 0)
        ? window.location.pathname.substring(0, index + needle.length)
        : '/'
    )
  }

  // ===========================================================================

  var process_page = function(){
    var target = is_tls_endpoint()
      ? window.webcast_reloaded_external_website_helper.always_redirect_to_webhost.webhost.https
      : window.webcast_reloaded_external_website_helper.always_redirect_to_webhost.webhost.http

    if (!target || (window.location.href.indexOf(target) >= 0))
      return

    var current = get_current_webhost()
    var url

    if (current !== target) {
      url = window.location.href.replace(current, target)

      window.location = url
    }
  }

  process_page()
}

// ----------------------------------------------------------------------------- </always_redirect_to_webhost>
// conditionally redirect to specific SPA endpoint

var always_redirect_to_endpoint = function(){

  // ===========================================================================

  var get_endpoint = function(){
    var endpoint = new RegExp('^.*(/(?:chromecast_sender|airplay_sender|airplay_sender\\.es5|proxy|(?:.+/)?index)\\.html)$')
    var pathname = window.location.pathname
    var matches  = endpoint.exec(pathname)

    return (matches && matches.length)
      ? matches[1]
      : null
  }

  // ===========================================================================

  var process_page = function(){
    var endpoints = {
      current: get_endpoint(),
      target:  window.webcast_reloaded_external_website_helper.always_redirect_to_endpoint.endpoint
    }

    if (!endpoints.current || (endpoints.current === endpoints.target))
      return

    var url = window.location.href.replace(endpoints.current, endpoints.target)

    window.location = url
  }

  process_page()
}

// ----------------------------------------------------------------------------- </always_redirect_to_endpoint>
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

      if (!window.webcast_reloaded_external_website_helper.workaround_issue_01.chromecast_sender.prioritize_cast_over_watch)
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
        if (window.webcast_reloaded_external_website_helper.workaround_issue_01.chromecast_sender.prioritize_cast_over_watch)
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
    if (airplay_sender && tls_endpoint && window.webcast_reloaded_external_website_helper.workaround_issue_01.airplay_sender.block_mixed_content) {
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
// prepopulate form fields with preconfigured values.
//
// since pages use cookies to conditionally prepopulate form fields,
// a timer is used to delay DOM inspection and updates only occur when fields are empty.

var prepopulate_form_fields = function(){

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

  var add_configs_dropdown = function(all_configs, id, onchange_callback){
    var $select = document.createElement('select')
    var label_id = '-1'
    var $option

    {
      $option = document.createElement('option')
      $option.value = label_id
      $option.textContent = '-- Bookmarks --'

      $select.appendChild($option)
    }

    for (var i=0; i < all_configs.length; i++) {
      $option = document.createElement('option')
      $option.value = '' + i
      $option.textContent = all_configs[i].host

      $select.appendChild($option)
    }

    $select.addEventListener('change', function(event) {
      event.preventDefault()
      event.stopPropagation()

      if ($select.value === label_id) return

      var index = parseInt($select.value, 10)
      $select.value = label_id

      var configs = all_configs[index]
      onchange_callback(configs)
    })

    document.getElementById(id).parentNode.appendChild($select)
  }

  var process_page_now = function(all_configs, id, callback){
    var process_now = (document.getElementById(id).value === '') && (all_configs.length > 0)
    var default_configs

    if (process_now) {
      default_configs = all_configs.find(function(configs){
        return !!configs.default
      })

      if (!default_configs)
        default_configs = all_configs[0]

      callback(default_configs)
    }
  }

  var process_airplay_sender_page = function(all_configs){
    var id = 'airplay_host'

    add_configs_dropdown(all_configs, id, process_airplay_sender)
    process_page_now(    all_configs, id, process_airplay_sender)
  }

  var process_proxy_page = function(all_configs){
    var id = 'host'

    add_configs_dropdown(all_configs, id, process_proxy)
    process_page_now(    all_configs, id, process_proxy)
  }

  // ===========================================================================

  var process_page = function(){
    var endpoint       = get_endpoint()
    var airplay_sender = endpoint.airplay_sender || endpoint.airplay_sender_es5

    if (airplay_sender) {
      process_airplay_sender_page(window.webcast_reloaded_external_website_helper.prepopulate_form_fields.airplay_sender)
      return
    }

    if (endpoint.proxy) {
      process_proxy_page(window.webcast_reloaded_external_website_helper.prepopulate_form_fields.proxy)
      return
    }
  }

  setTimeout(
    process_page,
    window.webcast_reloaded_external_website_helper.prepopulate_form_fields.script_delay_ms
  )
}

// ----------------------------------------------------------------------------- </prepopulate_form_fields>

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

  if (user_options.webcast_reloaded_external_website_helper.always_redirect_to_webhost.script_enabled)
    inject_function(always_redirect_to_webhost)

  if (user_options.webcast_reloaded_external_website_helper.always_redirect_to_endpoint.script_enabled)
    inject_function(always_redirect_to_endpoint)

  if (user_options.webcast_reloaded_external_website_helper.workaround_issue_01.script_enabled)
    inject_function(workaround_issue_01)

  if (user_options.webcast_reloaded_external_website_helper.prioritize_script_language.script_enabled)
    inject_function(prioritize_script_language)

  if (user_options.webcast_reloaded_external_website_helper.prepopulate_form_fields.script_enabled)
    inject_function(prepopulate_form_fields)
}

if (user_options['script_enabled']) {
  setTimeout(
    bootstrap,
    user_options['script_injection_delay_ms']
  )
}
