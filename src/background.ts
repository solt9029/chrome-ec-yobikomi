let isPlayingMusic = false;
const intervalMilliSeconds = 500;

const targetUrls = [
    "amazon.co.jp",
    "amazon.com",
    "cookpad-mart.com",
    "rakuten.co.jp",
    "biccamera.com",
];

const audio = new Audio();
const audioUrl = chrome.extension.getURL("music.mp3");
audio.src = audioUrl;
audio.load();

function polling() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
        const url = tabs[0]?.url;
        const isTargetUrl = url && targetUrls.map(targetUrl => url.indexOf(targetUrl)).some(index => index >= 0);

        if (!isPlayingMusic && isTargetUrl) {
            console.log("this url is a target");

            isPlayingMusic = true;
            audio.play();
        }

        if (isPlayingMusic && !isTargetUrl) {
            console.log("this url is not a target");

            isPlayingMusic = false;
            audio.pause();
            audio.currentTime = 0;
        }
    });
    
    setTimeout(polling, intervalMilliSeconds);
}

polling();
