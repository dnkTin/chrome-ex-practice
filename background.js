var rule2 = {
    conditions: [

        new chrome.declarativeContent.PageStateMatcher({
            css: ["video"]
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};
localStorage.setItem('listInfo', '');
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule2]);
    });
});

let activeTabs = {};
chrome.tabs.onActivated.addListener(function (details) {
    activeTabs[details.windowId] = details.tabId;
});
let idx = 1;
chrome.webRequest.onBeforeRequest.addListener(function (details) {

    if (details.tabId == -1) {
        console.log("Skipping request from non-tabbed context...");
        return;
    }
    if (details.url.includes('get_video_info')) {
        console.log(details.url);
    }
    if (details.url.includes('.m3u8')) {
        console.log('m3u8 ', details, document.URL);
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            var url = tabs[0].url;
            let information = {
                currentUrl: url,
                linkm3u8: details.url
            };
            chrome.storage.local.set({ information: information }, function () {
            });
        });
    }
    if (details.url.includes('.ts')) {
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            chrome.storage.local.set({ 'tsLink': details.url }, function () {
            });
        })
    }
    console.log('day la details', details);
    if (details.url.includes('.TS')) {
        chrome.downloads.download({
            url: details.url,
            // filename: details.url

        });
    }
}, { urls: ["<all_urls>"] });

let currentInfoLink = 0;
function saveData(url) {
    chrome.storage.local.set({
        Data: {
            ["Link" + currentInfoLink]: {
                url: url
            }
        }
    }, function () {

    });
    ++currentInfoLink;
}
