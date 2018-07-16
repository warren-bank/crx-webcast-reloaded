### [crx-webcast-reloaded](https://github.com/warren-bank/crx-webcast-reloaded)

#### Background:

* [WebCast](https://chrome.google.com/webstore/detail/webcast/gmenldaghgogpiajaipajaphcjbankna?hl=en) is a really nice enhancement for the Google Chrome desktop web browser
* Its purpose is to identify embedded video files on a webpage that are encoded in a format supported by Google Chromecast, and provide a mechanism by which to cast their links
  * when a link is "cast", Chromecast use its embedded HTML5 browser to play the video
  * the device which was used to "cast" the link doesn't proxy the stream
* The tool consists of two parts:
  * an external website
    * an AngularJS SPA (single page app)
    * the default route allows a user to enter the URL to a video file (in a format supported by Google Chromecast)
    * another route can be passed a base64 encoded URL to a video file (in a format supported by Google Chromecast)
    * after a URL is received, the following page elements are rendered:
      * an HTML5 video player
      * a Chromecast button, which used some Google APIs to scan for Chromecasts on the LAN and display a list of devices that could be used to play the video file
  * a Chrome extension
    * it hooks into the HTTP API to listen for requested URLs that end with a supported file extension
    * each URL that matches is made available to "cast"
    * clicking on any such video will open a new browser tab to WebCast's external website component
      * it's provided with the base64 encoded URL of the video file

#### Status:

* [WebCast](https://chrome.google.com/webstore/detail/webcast/gmenldaghgogpiajaipajaphcjbankna?hl=en) hasn't been updated since:
  * version 0.2.1
  * June 2, 2014
* It tests for the following file extensions:
  * .mp4
  * .mov

#### Issues:

* [Supported Media for Google Cast](https://developers.google.com/cast/docs/media):
  * not supported:
    * .mov
  * is supported:
    * .webm
* Google Chrome will prefer .webm to .mp4
  * if a video tag has sources for both formats
    * only the .webm video file will be requested
    * the Chrome extension won't detect the URL of this video file

#### Purpose for Fork:

* support .webm
* keep a backup of the "external website"

#### Additional Notes:

* the "external website":
  * can be used without any Chrome extension
    * the URL to cast would need to be manually entered into a form field
  * can be loaded into the Google Chrome desktop web browser from the local filesystem
    * ex: `file:///C:/PortableApps/webcast-reloaded/external_website/index.html#/watch/aHR0cDovL3RlY2hzbGlkZXMuY29tL2RlbW9zL3NhbXBsZS12aWRlb3Mvc21hbGwubXA0`
    * no server is required
  * [link to canonical host](http://web-cast.appspot.com/)
  * [link to github mirror](http://warren-bank.github.io/crx-webcast-reloaded/external_website/index.html)

#### Possible To-Dos:

* add an option to the Chrome extension that allows the user to change the URL of the "external website"
* change the methodology used by the Chrome extension to detect matching video files
  * inspect the HTTP response "Content-Type" header

#### Links to Related Apps for Android:

* [EZ Web Video Cast](https://play.google.com/store/apps/details?id=com.hecorat.videocast)
  * a minimal app that doesn't have ads and works great

#### Legal:

* copyright: original author of [WebCast](https://chrome.google.com/webstore/detail/webcast/gmenldaghgogpiajaipajaphcjbankna?hl=en)
* license: unknown
