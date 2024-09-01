
const CF_KEY = '$2a$10$Sfn.ovCOUBg24FD1sBI/fe2cuWc2p/o6o7tVpWtNcnfDcyfjaqxTC';
// this api key is provided by @Josh and is for public use
// no worries if it is leaked

const CURSEFORGE = 'https://api.curseforge.com/v1/mods/946253';
const CURSEFORGE_2 = 'https://api.curse.tools/v1/cf/mods/946253';
const MODRINTH = 'https://api.modrinth.com/v2/project/clickcrystals';
const GITHUB = 'https://api.github.com/repos/clickcrystals-development/ClickCrystals/releases';
const PLANETMC = 'https://www.planetminecraft.com/mod/clickcrystal';

const headers = {
    method: 'GET'
}

var dlsCurseForge = 0;
var dlsModrinth = 0;
var dlsGitHub = 0;
var dlsPlanetMC = 8461; // hardcoded until I find a fix for CORS error, last updated 8/31/2024

function getDownloads() {
    return {
        total: dlsCurseForge + dlsModrinth + dlsGitHub + dlsPlanetMC,
        curseforge: dlsCurseForge,
        modrinth: dlsModrinth,
        github: dlsGitHub,
        planetmc: dlsPlanetMC
    }
}

async function getCurseForge(done) {
    fetch(CURSEFORGE, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'X-API-Key': CF_KEY
        }
    })
    .then(res => res.json())
    .then(res => {
        dlsCurseForge = res.data.downloadCount;
        console.log(dlsCurseForge);
        done();
    })
}

async function getCurseForge2(done) {
    fetch(CURSEFORGE, headers)
    .then(res => res.json())
    .then(res => {
        dlsCurseForge = res.data.downloadCount;
        console.log(dlsCurseForge);
        done();
    })
}

async function getModrinth(done) {
    fetch(MODRINTH, headers)
    .then(res => res.json())
    .then(res => {
        dlsModrinth = res.downloads;
        console.log(dlsModrinth);
        done();
    })
}

async function getGitHub(done) {
    fetch(GITHUB, headers)
    .then(res => res.json())
    .then(res => {
        var count = 0;
        for (var i = 0; i < res.length; i++) {
            var release = res[i];
            for (var j = 0; j < release.assets.length; j++) {
                var asset = release.assets[j];
                count += asset.download_count;
            }
        }
        dlsGitHub = count;
        console.log(count);
        done();
    })
}

async function getPlanetMC(done) {
    fetch(PLANETMC, headers)
    .then(res => res.text())
    .then(res => {
        console.log(res);
        done();
    })
}






