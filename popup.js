
let listCurrentCorrectLinkM3U8 = [];
let listCurrentCorrectLinkInfo = [];

let listURL = document.getElementById('listUrl');
let listURLInfo = document.getElementById('listUrlInfo');

chrome.storage.sync.get('url', function (data) {
    // let a = document.createElement('a');
    // a.href = data.url;
    // listURL.appendChild(a);
    // listURL.innerHTML = data.url;

    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + '-' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();
    if (data.url.includes('m3u8')) {
        let m = `ffmpeg -reconnect_delay_max 10 -i ${data.url} -c copy maevesminx-${date}.mkv`;
        console.log('day la link: ' + document.URL);
        listURL.innerHTML = m;
    } else {
        listURLInfo.innerHTML = data.url;
    }
});
