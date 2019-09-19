var rule2 = {
    conditions: [

        new chrome.declarativeContent.PageStateMatcher({
            css: ["video"]
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule2]);
    });
});

let activeTabs = {};
chrome.tabs.onActivated.addListener(function (details) {
    console.log('00000');
    console.log(details);
    activeTabs[details.windowId] = details.tabId;
});
chrome.webRequest.onBeforeRequest.addListener(function (details) {

    if (details.tabId == -1) {
        console.log("Skipping request from non-tabbed context...");
        return;
    }
    if (details.url.includes('get_video_info')) {
        console.log("Check this out:", details);
        chrome.storage.sync.set({ url: details.url }, function () {
        });

    }
    if (details.url.includes('.m3u8')) {
        console.log('m3u8 ', details, document.URL);
        chrome.storage.sync.set({ url: details.url }, function () {
        });
    }
}, { urls: ["<all_urls>"] });