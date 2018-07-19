### [WebCast-Reloaded](https://github.com/warren-bank/crx-webcast-reloaded)

#### Background:

* [WebCast](https://chrome.google.com/webstore/detail/webcast/gmenldaghgogpiajaipajaphcjbankna?hl=en) is a really nice enhancement to [Chromium-based desktop web browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Other_browsers_based_on_Chromium)
* Its purpose is to identify video files as they are loaded into a webpage, and provide a mechanism by which to cast their links
  * when a link is "cast", Chromecast uses its embedded HTML5 browser to play the video
  * the device which was used to "cast" the link doesn't proxy the stream
* The tool consists of two parts:
  * an external website
    * an AngularJS SPA (single page app)
    * the default route allows a user to enter the URL to a video file
    * another route can be passed a base64 encoded URL to a video file
    * after a URL is received, the following page elements are rendered:
      * an HTML5 video player
      * a Chromecast button, which uses [Google APIs](https://developers.google.com/cast/docs/chrome_sender_integrate) to scan for Chromecasts on the LAN and display a list of devices that could be used to play the video file
  * a Chromium extension
    * it hooks into the HTTP API to listen for requested URLs that end with a supported file extension
    * each URL that matches is made available to "cast"
    * clicking on any such video will open a new browser tab to WebCast's "external website" component
      * it's provided with the base64 encoded URL of the video file

#### Status:

* [WebCast](https://chrome.google.com/webstore/detail/webcast/gmenldaghgogpiajaipajaphcjbankna?hl=en) hasn't been updated since:
  * version 0.2.1
  * June 2, 2014
* It tests for the following file extensions:
  * .mp4
  * .mov

#### Purpose for Fork:

* keep a backup of the "external website"
* detect more types of video formats:
  * .3gp
  * .avi
  * .m1v
  * .m4v
  * .mkv
  * .mov
  * .mp4
  * .mp4v
  * .mpeg
  * .mpg
  * .mpg2
  * .mpv
  * .ogm
  * .ogv
  * .webm
  * .xvid
  * .m3u8
    * HLS: HTTP Live Streaming
  * .mpd
    * MPEG-DASH
  * .ism, .ismv, .ismc, .ism/Manifest
    * Microsoft Smooth Streaming

#### Additional Notes:

* not all of the videos detected ( see [above](#purpose-for-fork) ) will work in Chromecast
  * the preference is to find too many video links, than too few
* the "external website":
  * can be used without any Chromium extension
    * the URL to cast would need to be manually entered into a form field
  * can be loaded into the Chromium desktop web browser from the local filesystem
    * ex: `file:///C:/path/to/external_website/index.html#/watch/:base64-encoded-URL`
    * no server is required
  * [link to canonical host](http://web-cast.appspot.com/)
  * [link to github mirror](http://warren-bank.github.io/crx-webcast-reloaded/external_website/index.html)

#### Possible To-Dos:

* ~~add an option to the Chromium extension that allows the user to change the URL of the "external website"~~
* change the methodology used by the Chromium extension to detect matching video files
  * inspect the HTTP response "Content-Type" header

#### Links to Related Apps for Android:

* [EZ Web Video Cast](https://play.google.com/store/apps/details?id=com.hecorat.videocast)
  * a minimal app that doesn't have ads and works great

#### Legal:

* copyright: original author of [WebCast](https://chrome.google.com/webstore/detail/webcast/gmenldaghgogpiajaipajaphcjbankna?hl=en)
* license: unknown
