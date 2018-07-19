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
                for(v in links) {
                    var link = links[v].trim();
                    var title = link;
                    $scope.links.push({
                        'img': screenshots[link] ? screenshots[link] : "data/noimage.jpg",
                        'id': encodeLink(link),
                        'link': url + "#/watch/" + encodeURIComponent(encodeLink(link)),
                        'title': title
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

    function encodeLink(str) {
        return encodeURIComponent(
        window.btoa(unescape(encodeURIComponent( str ))));
    }  
});
