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
    var tabId = undefined;
    $scope.links = [];

    chrome.tabs.query(
        {active: true, lastFocusedWindow: true},
        function(array_of_Tabs) {
            var tab = array_of_Tabs[0];
            tabId = tab.id;
            addLinks(chrome.extension.getBackgroundPage().tabUrls[tab.id]);
        }
    );

    function addLinks(links) {
        if (links && links.length) {
            chrome.storage.sync.get("external_website_url", function(items) {
                var url = items.external_website_url
                var screenshots = chrome.extension.getBackgroundPage().tabScreenshots[tabId] || {};
                var payload, base64_payload, screenshot;

                for(v in links) {
                    payload        = links[v].trim();
                    base64_payload = encodeLink(payload, true);
                    screenshot     = screenshots[payload] ? screenshots[payload] : "data/noimage.jpg";

                    $scope.links.push({
                        'img':   screenshot,
                        'id':    base64_payload,
                        'link':  url + "#/watch/" + base64_payload,
                        'proxy': url.replace(/\/(index\.html)?$/, '/proxy.html') + "#/watch/" + base64_payload,
                        'title': payload
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
