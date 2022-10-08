// -----------------------------------------------------------------------------

// https://developer.chrome.com/docs/extensions/reference/runtime/#property-lastError
// https://developer.chrome.com/docs/extensions/reference/pageAction/#method-show
// https://developer.chrome.com/docs/extensions/reference/pageAction/#method-hide
const pageAction_noop_callback = () => {
  if (chrome.runtime.lastError)
    console.log(chrome.runtime.lastError.message)
}

const enable_popup = (tab_id) => {
  chrome.pageAction.show(tab_id, pageAction_noop_callback)
}

const disable_popup = (tab_id) => {
  chrome.pageAction.hide(tab_id, pageAction_noop_callback)
}

// -----------------------------------------------------------------------------

const user_agent_regex_pattern = /^.*Chrome\/(\d+)\..*$/i

const get_chrome_major_version = () => {
  const user_agent_string = navigator.userAgent

  return (user_agent_string && user_agent_regex_pattern.test(user_agent_string))
    ? parseInt( user_agent_string.replace(user_agent_regex_pattern, '$1'), 10)
    : 0
}

// -----------------------------------------------------------------------------

const no_media_urls   = []
const all_media_types = ["videos", "audios", "captions"]
const all_tab_data    = {}  // tab_id => {tab_url, display_media, videos: [{media_url, referer_url}], audios: [{media_url, referer_url}], captions: [{media_url, referer_url}]}

const get_new_tab_data = (tab_url) => ({tab_url: (tab_url || ""), display_media: all_media_types[0], videos: [], audios: [], captions: []})

const set_display_media = (tab_id, display_media) => {
  const tab_data = all_tab_data[tab_id]

  if (tab_data && (all_media_types.indexOf(display_media) >= 0))
    tab_data.display_media = display_media
}

// return: one element of "all_media_types"
const get_display_media = (tab_id) => {
  const tab_data = all_tab_data[tab_id]

  return (!tab_data || !tab_data.display_media)
    ? all_media_types[0]
    : tab_data.display_media
}

// return: [{media_url, referer_url}]
const get_videos = (tab_id) => {
  const tab_data = all_tab_data[tab_id]

  return (!tab_data || !tab_data.videos || !tab_data.videos.length)
    ? no_media_urls
    : tab_data.videos
}

// return: [{media_url, referer_url}]
const get_audios = (tab_id) => {
  const tab_data = all_tab_data[tab_id]

  return (!tab_data || !tab_data.audios || !tab_data.audios.length)
    ? no_media_urls
    : tab_data.audios
}

// return: [{media_url, referer_url}]
const get_captions = (tab_id) => {
  const tab_data = all_tab_data[tab_id]

  return (!tab_data || !tab_data.captions || !tab_data.captions.length)
    ? no_media_urls
    : tab_data.captions
}

const delete_tab_data = (tab_id, hide_popup) => {
  delete all_tab_data[tab_id]

  if (hide_popup)
    disable_popup(tab_id)
}

const clear_videos = (tab_id) => {
  const tab_data = all_tab_data[tab_id]

  if (tab_data && Array.isArray(tab_data.videos))
    tab_data.videos = []
}

const clear_audios = (tab_id) => {
  const tab_data = all_tab_data[tab_id]

  if (tab_data && Array.isArray(tab_data.audios))
    tab_data.audios = []
}

const clear_captions = (tab_id) => {
  const tab_data = all_tab_data[tab_id]

  if (tab_data && Array.isArray(tab_data.captions))
    tab_data.captions = []
}

const get_media = (tab_id) => {
  const media_type = get_display_media(tab_id)
  let   media      = no_media_urls

  switch(media_type) {
    case all_media_types[0]:
      media = get_videos(tab_id)
      break
    case all_media_types[1]:
      media = get_audios(tab_id)
      break
    case all_media_types[2]:
      media = get_captions(tab_id)
      break
  }

  return {media_type, media}
}

const clear_media = (tab_id, hide_popup) => {
  const media_type = get_display_media(tab_id)

  switch(media_type) {
    case all_media_types[0]:
      media = clear_videos(tab_id)
      break
    case all_media_types[1]:
      media = clear_audios(tab_id)
      break
    case all_media_types[2]:
      media = clear_captions(tab_id)
      break
  }

  if (hide_popup)
    disable_popup(tab_id)
}

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onInstalled
chrome.runtime.onInstalled.addListener(
  function(details){
    if (details.reason === "install"){
      // initialize default option value(s)
      const chrome_version = get_chrome_major_version()

      const data = {
        urls:     [
          'https://warren-bank.github.io/crx-webcast-reloaded/external_website/index.html',
          'http://webcast-reloaded.surge.sh/index.html',
          'http://gitcdn.link/cdn/warren-bank/crx-webcast-reloaded/gh-pages/external_website/index.html'
        ],
        contexts: {
          "https_text_link":  1,
          "https_chromecast": 1,
          "https_airplay":    2,
          "https_proxy":      2,

          "http_text_link":   (chrome_version >= 72) ? 1 : 2,  // Chrome 72+: Cannot cast to Chromecast from an insecure URL. For a video served over HTTP: If sent to HTTPS page, can cast but cannot watch. If sent to HTTP page, cannot cast (72+) but can watch. By default, prioritizing ability to cast over ability to watch in Chrome browser.
          "http_chromecast":  (chrome_version >= 72) ? 1 : 2,  // Chrome 72+: Cannot cast to Chromecast from an insecure URL. For a video served over HTTP: If sent to HTTPS page, can cast but cannot watch. If sent to HTTP page, cannot cast (72+) but can watch. By default, prioritizing ability to cast over ability to watch in Chrome browser.
          "http_airplay":     2,
          "http_proxy":       2
        }
      }

      const user_options_json = JSON.stringify(data)

      chrome.storage.sync.set({user_options_json})
    }
  }
)

// https://developer.chrome.com/docs/extensions/reference/webRequest/#type-HttpHeaders
const get_referer_value = (headers) => {
  let referer = ''

  if (!headers || !Array.isArray(headers) || !headers.length)
    return referer

  const header = headers.find(header => header.name.toLowerCase() === 'referer')
  if (header)
    referer = header.value

  return referer
}

const video_url_regex_pattern   = /\.(?:mp4|mp4v|mpv|m1v|m4v|mpg|mpg2|mpeg|xvid|webm|3gp|avi|mov|mkv|ogv|ogm|m3u8|mpd|ism(?:[vc]|\/manifest)?)(?:[\?#].*)?$/i
const audio_url_regex_pattern   = /\.(?:mp3|m4a|m4b|ogg|wav|flac)(?:[\?#].*)?$/i
const caption_url_regex_pattern = /\.(?:srt|ttml|dfxp|vtt|webvtt|ssa|ass)(?:[\?#].*)?$/i

const get_matching_video_data = (tab_data, media_url) => {
  return tab_data.videos.find(video_data => video_data.media_url === media_url)
}

const get_matching_audio_data = (tab_data, media_url) => {
  return tab_data.audios.find(audio_data => audio_data.media_url === media_url)
}

const get_matching_caption_data = (tab_data, media_url) => {
  return tab_data.captions.find(caption_data => caption_data.media_url === media_url)
}

// https://developer.chrome.com/docs/extensions/reference/webRequest/#registering-event-listeners
// https://developer.chrome.com/docs/extensions/reference/webRequest/#type-ResourceType
// https://developer.chrome.com/docs/extensions/reference/webRequest/#event-onSendHeaders
// https://developer.chrome.com/docs/extensions/reference/webRequest/#type-OnSendHeadersOptions
chrome.webRequest.onSendHeaders.addListener(
  function(details){
    const tab_id = details.tabId
    let tab_data

    if (details.tabId !== chrome.tabs.TAB_ID_NONE) {
      tab_data = all_tab_data[tab_id]

      // should not occur; tab_data is initialized when the tab_url changes
      if (!tab_data) {
        tab_data = get_new_tab_data()
        all_tab_data[tab_id] = tab_data
      }

      const request_url = details.url.trim()
      const referer_url = get_referer_value(details.requestHeaders) || tab_data.tab_url
      let  is_media_url = false

      // is a video url?
      if (!is_media_url && video_url_regex_pattern.test(request_url)) {

        // is a duplicate?
        let video_data = get_matching_video_data(tab_data, request_url)
        if (video_data) {
          if (!video_data.referer_url && referer_url) {
            video_data.referer_url = referer_url

            tab_data.videos = [...tab_data.videos]
          }
        }
        else {
          video_data = {media_url: request_url, referer_url}
          tab_data.videos = [...tab_data.videos, video_data]
        }

        is_media_url = true
      }

      // is a audio url?
      if (!is_media_url && audio_url_regex_pattern.test(request_url)) {

        // is a duplicate?
        let audio_data = get_matching_audio_data(tab_data, request_url)
        if (audio_data) {
          if (!audio_data.referer_url && referer_url) {
            audio_data.referer_url = referer_url

            tab_data.audios = [...tab_data.audios]
          }
        }
        else {
          audio_data = {media_url: request_url, referer_url}
          tab_data.audios = [...tab_data.audios, audio_data]
        }

        is_media_url = true
      }

      // is a caption url?
      if (!is_media_url && caption_url_regex_pattern.test(request_url)) {

        // is a duplicate?
        let caption_data = get_matching_caption_data(tab_data, request_url)
        if (caption_data) {
          if (!caption_data.referer_url && referer_url) {
            caption_data.referer_url = referer_url

            tab_data.captions = [...tab_data.captions]
          }
        }
        else {
          caption_data = {media_url: request_url, referer_url}
          tab_data.captions = [...tab_data.captions, caption_data]
        }

        is_media_url = true
      }

      if (is_media_url) {
        enable_popup(tab_id)
      }
    }
  },
  {
    urls:["<all_urls>"],
    types: ["main_frame", "sub_frame", "object", "xmlhttprequest", "media"]
  },
  (get_chrome_major_version() >= 72)
    ? ['requestHeaders', 'extraHeaders']
    : ['requestHeaders']
)

const tab_url_regex_pattern = /^(?:https?|file):/i

// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated
chrome.tabs.onUpdated.addListener(
  function(tab_id, change_info, tab){
    const tab_url   =  change_info.url
    const is_reload = (change_info.status === 'loading') && !tab_url

    // reloading the same url in the same tab?
    if (is_reload)
      clear_media(tab_id, true)

    // not a change to the tab_url?
    if (!tab_url)
      return

    // not a supported url scheme?
    if (!tab_url_regex_pattern.test(tab_url))
      return

    let tab_data = all_tab_data[tab_id]

    if (!tab_data || (tab_data.tab_url !== tab_url)) {
      tab_data = get_new_tab_data(tab_url)
      all_tab_data[tab_id] = tab_data

      disable_popup(tab_id)
    }
  }
)

// https://developer.chrome.com/docs/extensions/reference/tabs/#event-onRemoved
chrome.tabs.onRemoved.addListener(
  function(tab_id){
    delete_tab_data(tab_id, false)
  }
)

// -----------------------------------------------------------------------------

// exports
window.set_media_type = set_display_media
window.get_media      = get_media
window.clear_media    = clear_media
