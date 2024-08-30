
const downloadText = document.querySelector('h1#download-text');
const countdownText = document.querySelector('#time-until-next-fetch');
const lastFetchText = document.querySelector('#since-last-fetch');
const lastRefreshText = document.querySelector('#since-last-refresh');

const curseforgeDlt = document.querySelector('#curseforge #sub-download-text');
const modrinthDlt = document.querySelector('#modrinth #sub-download-text');
const githubDlt = document.querySelector('#github #sub-download-text');
const planetmcDlt = document.querySelector('#planetmc #sub-download-text');

var timeUtilNextFetch = 15;
var lastFetch = 0;
var sinceLastFetch = 0;
var sinceLastRefresh = 0;
setInterval(tickAPIFetch, 1000);
fetchAPI();

function update() {
    const dls = getDownloads();
    var total = dls.total;
    downloadText.innerText = formatNumber(total);

    sinceLastFetch = total - lastFetch;
    lastFetch = total;
    sinceLastRefresh += sinceLastFetch < 100 ? sinceLastFetch : 0;

    lastFetchText.innerText = formatNumber(sinceLastFetch);
    lastRefreshText.innerText = formatNumber(sinceLastRefresh);

    curseforgeDlt.innerText = formatNumber(dls.curseforge);
    modrinthDlt.innerText = formatNumber(dls.modrinth);
    githubDlt.innerText = formatNumber(dls.github);
    planetmcDlt.innerText = formatNumber(dls.planetmc); // hardcoded until I find a fix for CORS error, last updated 8/30/2024
}

function tickAPIFetch() {
    if (timeUtilNextFetch-- > 0) {
        countdownText.innerText = 'Fetching again in ' + timeUtilNextFetch + ' seconds';
        return;
    }
    countdownText.innerText = 'Now fetching...'; 
    fetchAPI();
}

function fetchAPI() {
    timeUtilNextFetch = 15;
    getCurseForge(update);
    getModrinth(update);
    getGitHub(update);
}

function formatNumber(num) {
    var str = "" + num;
    var len = str.length;
    if (len <= 3) {
        return str;
    }

    var result = '';
    for (var i = len - 1; i >= 0; i--) {
        result = str[i] + result;
        if ((len - i) % 3 == 0 && i > 0)
            result = ',' + result;
    }
    return result;
}

