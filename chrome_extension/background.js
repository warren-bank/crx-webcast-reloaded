var tabUrls={},tabLink={},tabScreenshots={},screenshotProcessQueue=[],videoEl=document.getElementById("video"),canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),TIME_STAMP=3;videoEl.Qsrc="";videoEl.src="";
var video_url_regex_pattern = /\.(?:mp4|mp4v|mpv|m1v|m4v|mpg|mpg2|mpeg|xvid|webm|3gp|avi|mov|mkv|ogv|ogm|m3u8|mpd|ism(?:[vc]|\/manifest)?)(?:[\?#].*)?$/i;

console.log=function(){};

chrome.runtime.onInstalled.addListener(
  function(details){
    if (details.reason === "install"){
      // initialize default value of option(s)
      chrome.storage.sync.set({
        "external_website_url": "https://warren-bank.github.io/crx-webcast-reloaded/external_website/index.html"
      });
    }
  }
);

chrome.webRequest.onBeforeRequest.addListener(
  function(a){
    console.log(a.url);
    -1==a.tabId?
      console.log("Skipping request from non-tabbed context..."):
      (
        tabUrls[a.tabId]||(tabUrls[a.tabId]=[]),

        // https://developers.google.com/cast/docs/media
        video_url_regex_pattern.test(a.url.trim()) &&

        -1==tabUrls[a.tabId].indexOf(a.url) &&
       (
          console.log("="+a.url),
          prerareScreenShot(a.url.trim(),a.tabId),
          tabUrls[a.tabId].push(a.url.trim()),
          chrome.pageAction.show(a.tabId)
        )
      )
  },
  {urls:["<all_urls>"]}
);

chrome.tabs.onUpdated.addListener(
  function(a,b){
    tabLink[a]&&b.url&&!similar(tabLink[a],b.url)?
      (clearTabData(a),chrome.pageAction.hide(a)):
      tabUrls[a]&&tabUrls[a].length&&chrome.pageAction.show(a);
    b.url&&(tabLink[a]=b.url)
  }
);

chrome.tabs.onRemoved.addListener(
  function(a){
    clearTabData(a)
  }
);

var clearLinksForTab=function(a){clearTabData(a);chrome.pageAction.hide(a)};
function screenshotRunner(){console.log("screenshotRunner videoEl.src="+videoEl.src+" screenshotProcessQueue.length="+screenshotProcessQueue.length);if(""==videoEl.Qsrc&&0<screenshotProcessQueue.length){console.log("Loading...");var a=screenshotProcessQueue.shift();videoEl.Qsrc=a[1];videoEl.addEventListener("canplaythrough",seekScreenshot);videoEl.src=a[0];videoEl.load()}}
function seekScreenshot(){console.log("seekScreenshot");4==videoEl.readyState&&videoEl.currentTime>=TIME_STAMP&&(videoEl.removeEventListener("canplaythrough",seekScreenshot),grabScreenshot());4==videoEl.readyState&&(videoEl.currentTime=TIME_STAMP)}
function grabScreenshot(){console.log("grabScrrenShot");ctx.drawImage(videoEl,0,0,200,130);tabScreenshots[videoEl.Qsrc][videoEl.src]=canvas.toDataURL("image/png");videoEl.Qsrc="";videoEl.src="";screenshotRunner()}
function prerareScreenShot(a,b){tabScreenshots[b]||(tabScreenshots[b]={});tabScreenshots[b][a]?console.log("Image exists "+a):(console.log("Pushing "+a),screenshotProcessQueue.push([a,b]),screenshotRunner())}
function clearTabData(a){delete tabUrls[a];delete tabLink[a];delete tabScreenshots[a]}
function similar(a,b){return void 0===a||void 0===b?!1:a===b||levenshteinDistance(a,b)<=Math.max(a.length,b.length)-Math.min(a.length,b.length)?!0:!1}
function levenshteinDistance(a,b){if(0==a.length)return b.length;if(0==b.length)return a.length;var e=[],c;for(c=0;c<=b.length;c++)e[c]=[c];var d;for(d=0;d<=a.length;d++)e[0][d]=d;for(c=1;c<=b.length;c++)for(d=1;d<=a.length;d++)b.charAt(c-1)==a.charAt(d-1)?e[c][d]=e[c-1][d-1]:e[c][d]=Math.min(e[c-1][d-1]+1,Math.min(e[c][d-1]+1,e[c-1][d]+1));return e[b.length][a.length]};
