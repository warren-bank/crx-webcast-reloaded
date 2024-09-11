// -----------------------------------------------------------------------------

const state = {}

// https://developer.chrome.com/docs/extensions/reference/storage/#usage
const get_options = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(
      ['user_options_json'],
      function(items){
        try {
          const data = JSON.parse(items.user_options_json)
          if (!data || !Array.isArray(data.urls) || !data.urls.length || !data.contexts)
            throw new Error('bad data format')

          state.user_options = data
          resolve()
        }
        catch(e) {
          reject()
        }
      }
    )
  })
}

// https://developer.chrome.com/docs/extensions/reference/tabs/#method-query
const get_tab_id = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      {active: true, lastFocusedWindow: true},
      function(matching_tabs_array){
        const tab_id = (matching_tabs_array && Array.isArray(matching_tabs_array) && matching_tabs_array.length)
          ? matching_tabs_array[0].id
          : null

        if (tab_id && (tab_id !== chrome.tabs.TAB_ID_NONE)) {
          state.tab_id = tab_id
          resolve()
        }
        else {
          reject()
        }
      }
    )
  })
}

const ff_private_bg_window_proxy = {
  reset_options: () => {
    // Promise
    return browser.runtime.sendMessage({"method": "reset_options"})
  },

  set_media_type: (tab_id, display_media) => {
    // Promise
    return browser.runtime.sendMessage({"method": "set_media_type", "params": {tab_id, display_media}})
  },

  clear_media: (tab_id, hide_popup) => {
    // Promise
    return browser.runtime.sendMessage({"method": "clear_media", "params": {tab_id, hide_popup}})
  },

  get_media: (tab_id) => {
    // Promise
    return browser.runtime.sendMessage({"method": "get_media", "params": {tab_id}})
  }
}

// https://developer.chrome.com/docs/extensions/reference/extension/#method-getBackgroundPage
const get_background_window = () => {
  state.bg_window = chrome.extension.getBackgroundPage()

  if (!state.bg_window) {
    if (typeof browser !== 'undefined')
      state.bg_window = ff_private_bg_window_proxy
    else
      throw new Error('')
  }
}

const initialize_state = async () => {
  get_background_window()

  try {
    await get_options()
  }
  catch(e) {
    await state.bg_window.reset_options()
    await get_options()
  }

  await get_tab_id()
}

// -----------------------------------------------------------------------------

const encode_link = (str, double_urlencode) => {
  if (!str || (typeof str !== 'string'))
    return ''

  str = window.btoa(str)
  str = encodeURIComponent(str)
  if (double_urlencode) {
    // note: workaround for bug in Angular JS $routeProvider
    // link: https://stackoverflow.com/questions/16630912
    str = encodeURIComponent(str)
  }
  return str
}

const is_https = (url) => (url.substring(0,6).toLowerCase() === 'https:')

const baseurl_suffix_regex_pattern = /\/(index\.html)?$/i

const get_contextualized_baseurls = (https) => {
  const urls = {
    entrypoint: '_text_link',
    chromecast: '_chromecast',
    airplay:    '_airplay',
    proxy:      '_proxy'
  }

  for (const key in urls) {
    const context_key = `http${https ? 's' : ''}${urls[key]}`
    const url_index   = state.user_options.contexts[ context_key ] - 1  // users enter 1-based indices on options page. subtract 1 to shift to 0-based indices for array access.
    const url         = state.user_options.urls[ url_index ]

    urls[key] = url
  }

  urls.chromecast = urls.chromecast.replace(baseurl_suffix_regex_pattern, '/chromecast_sender.html')
  urls.airplay    = urls.airplay.replace(   baseurl_suffix_regex_pattern, '/airplay_sender.html')
  urls.proxy      = urls.proxy.replace(     baseurl_suffix_regex_pattern, '/proxy.html')

  return urls
}

const get_links = (media_item) => {
  const {media_url, referer_url} = media_item
  const links = {}

  if (!media_url)
    return links

  const base64_video   = encode_link(media_url,   true)
  const base64_referer = encode_link(referer_url, true)

  const https = is_https(media_url)
  const urls  = get_contextualized_baseurls(https)
  const hash  = "#/watch/" + base64_video + (base64_referer ? ("/referer/" + base64_referer) : "")

  links.media_link = media_url
  links.entrypoint = urls.entrypoint + hash
  links.chromecast = urls.chromecast + hash
  links.airplay    = urls.airplay    + hash
  links.proxy      = urls.proxy      + hash

  return links
}

const process_set_media_type = async (event, media_type) => {
  event.preventDefault()
  event.stopPropagation()

  await state.bg_window.set_media_type( state.tab_id, media_type )
  draw_list()
}

const is_Firefox = (navigator.appCodeName === 'Mozilla')
const is_Fenix   = is_Firefox && (navigator.appVersion.indexOf('Android') >= 0)

const process_click_open = (event, url) => {
  event.preventDefault()
  event.stopPropagation()

  // https://developer.chrome.com/docs/extensions/reference/api/tabs#method-create
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/windows/WINDOW_ID_CURRENT#browser_compatibility

  try {
    const options = {url}

    if (!is_Fenix)
      options.windowId = chrome.windows.WINDOW_ID_CURRENT

    chrome.tabs.create(options)
  }
  catch(e) {
  }
}

const process_click_copy = (event, url) => {
  event.preventDefault()
  event.stopPropagation()

  // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

  try {
    navigator.clipboard.writeText(url)
  }
  catch(e) {
  }
}

const process_clear_media = (event) => {
  event.preventDefault()
  event.stopPropagation()

  state.bg_window.clear_media( state.tab_id, true )
}

const all_media_types = ["videos", "audios", "captions", "drm_licenses"]

const is_audio_video = (media_type) => ((["videos", "audios"]).indexOf(media_type) >= 0)

const format_media_type = (media_type) => media_type.replaceAll('_', ' ')

const hls_regex_pattern = /\.m3u8(?:[#\?]|$)/i

const is_hls = (url) => (hls_regex_pattern.test(url))

const App = ({media_type, media}) => {
  const av_media_type = is_audio_video(media_type)

  return (
    <div id="app">
      <div id="media-type-options">
        {all_media_types.map((media_type_option, index) => {
          return (
            <button disabled={(media_type_option === media_type)} onClick={(event) => process_set_media_type(event, media_type_option)}>{format_media_type(media_type_option)}</button>
          )
        })}
      </div>
      <h3>{media.length} {format_media_type(media_type)} detected on page.</h3>
      <h4>Click link to transfer the media item to external website in a new tab.</h4>
      <div id="links">
        {media.map((media_item, index) => {
          const links = get_links(media_item)

          return (
            <div class={av_media_type ? "media-item" : "non-av media-item"} key={index}>
              <div class="icons-container">
                {
                  (!av_media_type) ? null : (
                    <a class="chromecast" href={links.chromecast} onClick={(event) => process_click_open(event, links.chromecast)} title="Chromecast Sender">
                      <img src="img/chromecast.png" />
                    </a>
                  )
                }
                {
                  (!av_media_type) ? null : (
                    <a class="airplay" href={links.airplay} onClick={(event) => process_click_open(event, links.airplay)} title="ExoAirPlayer Sender">
                      <img src="img/airplay.png" />
                    </a>
                  )
                }
                {
                  (!av_media_type || !is_hls(media_item.media_url)) ? null : (
                    <a class="proxy" href={links.proxy} onClick={(event) => process_click_open(event, links.proxy)} title="HLS-Proxy Configuration">
                      <img src="img/proxy.png" />
                    </a>
                  )
                }
                <a class="media-link" href={links.media_link} onClick={(event) => process_click_open(event, links.media_link)} title="direct link to media item">
                  <img src="img/media_link.png" />
                </a>
              </div>
              <div class="text-container">
                <a class="entrypoint" href={links.entrypoint} onClick={(event) => process_click_copy(event, (av_media_type ? links.entrypoint : links.media_link))} title="copy link to clipboard">
                  {links.media_link}
                </a>
              </div>
            </div>
          )
        })}
      </div>
      <div id="actions">
        <button onClick={process_clear_media}>Clear list of {format_media_type(media_type)}</button>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------

const get_props = async () => {
  return await state.bg_window.get_media( state.tab_id )
}

const draw_list = async () => {
  const props = await get_props()

  if (
    (props.media_type === state.media_type) &&
    (props.media === state.media)
  )
    return

  state.media_type = props.media_type
  state.media      = props.media

  ReactDOM.render(
    <App {...props} />,
    document.getElementById('root')
  )
}

const close_popup = () => {
  if (state.timer)
    clearInterval(state.timer)

  state.timer      = null
  state.media_type = null
  state.media      = null
  state.bg_window  = null

  window.close()
}

const initialize_popup = async () => {
  try {
    await initialize_state()

    draw_list()
    state.timer = setInterval(draw_list, 500)
  }
  catch(e) {
    close_popup()
  }
}

document.addEventListener('DOMContentLoaded', initialize_popup)

// -----------------------------------------------------------------------------
