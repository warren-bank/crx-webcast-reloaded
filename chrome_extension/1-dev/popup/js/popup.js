// -----------------------------------------------------------------------------

const state = {}

// https://developer.chrome.com/docs/extensions/reference/storage/#usage
const get_options = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(
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

// https://developer.chrome.com/docs/extensions/reference/extension/#method-getBackgroundPage
const get_background_window = () => {
  state.bg_window = chrome.extension.getBackgroundPage()
}

const initialize_state = async () => {
  await get_options()
  await get_tab_id()

  get_background_window()
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

const get_links = (video) => {
  const {video_url, referer_url} = video
  const links = {}

  if (!video_url)
    return links

  const base64_video   = encode_link(video_url,   true)
  const base64_referer = encode_link(referer_url, true)

  const https = is_https(video_url)
  const urls  = get_contextualized_baseurls(https)
  const hash  = "#/watch/" + base64_video + (base64_referer ? ("/referer/" + base64_referer) : "")

  links.video_link = video_url
  links.entrypoint = urls.entrypoint + hash
  links.chromecast = urls.chromecast + hash
  links.airplay    = urls.airplay    + hash
  links.proxy      = urls.proxy      + hash

  return links
}

const process_click = (event, url) => {
  event.preventDefault()
  event.stopPropagation()

  chrome.tabs.create({
    windowId: chrome.windows.WINDOW_ID_CURRENT,
    url
  })
}

const process_clear_videos = (event) => {
  event.preventDefault()
  event.stopPropagation()

  state.bg_window.clear_videos( state.tab_id, true )
  close_popup()
}

const App = ({videos}) => {
  return (
    <div id="app">
      <h3>{videos.length} videos detected on page.</h3>
      <h4>Click link to transfer video to external website in a new tab.</h4>
      <div id="links">
        {videos.map((video, index) => {
          const links = get_links(video)

          return (
            <div class="video-item" key={index}>
              <div class="icons-container">
                <a class="chromecast" href={links.chromecast} onClick={(event) => process_click(event, links.chromecast)} title="Chromecast Sender">
                  <img src="img/chromecast.png" />
                </a>
                <a class="airplay" href={links.airplay} onClick={(event) => process_click(event, links.airplay)} title="ExoAirPlayer Sender">
                  <img src="img/airplay.png" />
                </a>
                <a class="proxy" href={links.proxy} onClick={(event) => process_click(event, links.proxy)} title="HLS-Proxy Configuration">
                  <img src="img/proxy.png" />
                </a>
                <a class="video-link" href={links.video_link} onClick={(event) => process_click(event, links.video_link)} title="direct link to video">
                  <img src="img/video_link.png" />
                </a>
              </div>
              <div class="text-container">
                <a class="entrypoint" href={links.entrypoint} onClick={(event) => process_click(event, links.entrypoint)} title={links.video_link}>
                  {links.video_link}
                </a>
              </div>
            </div>
          )
        })}
      </div>
      <div>
        <button onClick={process_clear_videos}>Clear videos list</button>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------

const get_props = () => {
  const videos = state.bg_window.get_videos( state.tab_id )
  return {videos}
}

const draw_list = () => {
  const props = get_props()

  if (props.videos === state.videos)
    return

  if (!props.videos || !props.videos.length)
    return close_popup()

  state.videos = props.videos

  ReactDOM.render(
    <App {...props} />,
    document.getElementById('root')
  )
}

const close_popup = () => {
  if (state.timer)
    clearInterval(state.timer)

  state.timer     = null
  state.videos    = null
  state.bg_window = null

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
