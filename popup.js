
let listCurrentCorrectLinkM3U8 = [];
let listCurrentCorrectLinkInfo = [];

let listURL = document.getElementById('listUrl');
let listURLInfo = document.getElementById('listUrlInfo');
let buttonCopyM3U8 = document.getElementById('copyM3U8');
let buttonOpenInfoList = document.getElementById('openInfoList');
let buttonDownloadTsFile = document.getElementById('downloadTsFile');
let tsInput = document.getElementById('ts');

chrome.storage.local.get('information', function (data) {
    // let a = document.createElement('a');
    // a.href = data.url;
    // listURL.appendChild(a);
    // listURL.innerHTML = data.url;
    let m = data.information.currentUrl.split('/')[3];
    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + '-' + d.getHours() + '-' + d.getMinutes() + '-' +
        d.getSeconds();
    let name = m + '-' + date;
    let fullLink = `ffmpeg -reconnect_delay_max 10 -i ${data.information.linkm3u8} -c copy ${name}.mkv`;
    // console.log('day la link: ' + document.URL);
    listURL.value = fullLink;
});
buttonCopyM3U8.addEventListener('click', function () {
    listURL.select();
    listURL.setSelectionRange(0, 99999);
    document.execCommand('copy');
});


chrome.storage.local.get('tsLink', function (data) {
    tsInput.value = data.tsLink;
});
let increase = document.getElementById('increase');
increase.addEventListener('click', function () {
    document.querySelector('video').playbackRate = 1.5;
})

let decrease = document.getElementById('decrease');
decrease.addEventListener('click', function () {
    document.querySelector('video').playbackRate = 1.5;
})