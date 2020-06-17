angular.module('project', [])
.config([
    '$compileProvider',
    function( $compileProvider ) {
        // Angular -1.2.0-rc2 : /^\s*(https?|ftp|file):|data:image\//
        var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
        var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)+'|chrome-extension:|filesystem:chrome-extension:'+'|blob:chrome-extension%3A'+currentImgSrcSanitizationWhitelist.toString().slice(-1);
        $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
    }
])
.controller('WebCast', function($scope) {
    var tabId          = undefined;
    var tabUrl         = undefined;
    var base64_referer = undefined;
    $scope.links = [];

    chrome.tabs.query(
        {active: true, lastFocusedWindow: true},
        function(array_of_Tabs) {
            var tab = array_of_Tabs[0];
            tabId          = tab.id;
            tabUrl         = tab.url;
            base64_referer = tabUrl ? encodeLink(tabUrl, true) : undefined;
            addLinks(chrome.extension.getBackgroundPage().tabUrls[tab.id]);
        }
    );

    function addLinks(links) {
        if (links && links.length) {
            chrome.storage.sync.get("external_website_url", function(items) {
                var url = items.external_website_url
                var screenshots = chrome.extension.getBackgroundPage().tabScreenshots[tabId] || {};
                var payload, screenshot, base64_payload, hash;

                for(v in links) {
                    payload        = links[v].trim();
                    screenshot     = screenshots[payload] ? screenshots[payload] : "data/noimage.jpg";
                    base64_payload = encodeLink(payload, true);
                    hash           = "#/watch/" + base64_payload + (tabUrl ? ("/referer/" + base64_referer) : "");

                    $scope.links.push({
                        "img":        screenshot,
                        "id":         base64_payload,
                        "video_link": payload,
                        "entrypoint": url + hash,
                        "chromecast": url.replace(/\/(index\.html)?$/, '/chromecast_sender.html') + hash,
                        "airplay":    url.replace(/\/(index\.html)?$/, '/airplay_sender.html')    + hash,
                        "proxy":      url.replace(/\/(index\.html)?$/, '/proxy.html')             + hash
                    });
                }
                $scope.$digest();
            });
        }
    }

    $scope.openLink = function(link) {
        chrome.tabs.create({
            windowId: chrome.windows.WINDOW_ID_CURRENT,
            url: link
        });
    }

    $scope.clearAll = function() {
        chrome.extension.getBackgroundPage().clearLinksForTab(tabId);
        window.close();
    }

    function encodeLink(str, double_urlencode) {
        str = window.btoa(str)
        str = encodeURIComponent(str)
        if (double_urlencode) {
          // note: workaround for bug in Angular JS $routeProvider
          // link: https://stackoverflow.com/questions/16630912
          str = encodeURIComponent(str)
        }
        return str
    }  
});
