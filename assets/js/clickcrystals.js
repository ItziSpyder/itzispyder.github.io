const d = document;
const win = window;

function get(path) {
    return d.querySelector(path);
}

function getAll(path) {
    return d.querySelectorAll(path);
}

function setLink(path, link) {
    get(path).addEventListener('click', () => win.open(link));
}

setLink('#github', "https://github.com/itzispyder/clickcrystals");
setLink('#download', "https://modrinth.com/mod/clickcrystals");
setLink('#discord', "https://discord.gg/tMaShNzNtP");

setLink('.points #download_1_20_1', "https://modrinth.com/mod/clickcrystals/version/1.20.1-1.0.2");
setLink('.points #download_1_19_4', "https://modrinth.com/mod/clickcrystals/version/1.19.4-0.8.6");
setLink('.points #download_sources', "https://github.com/itzispyder/clickcrystals/archive/refs/heads/main.zip");
setLink('.points #download_pack', "https://modrinth.com/resourcepack/clickcrystalplus-pack");
setLink('.points #help_info_faq', "https://github.com/itzispyder/clickcrystals/wiki");

