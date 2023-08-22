const d = document;
const win = window;

function get(path) {
    return d.querySelector(path);
}

function getAll(path) {
    return d.querySelectorAll(path);
}

get('#github').addEventListener('click', () => {
    win.open('https://github.com/itzispyder/clickcrystals');
});

get('#download').addEventListener('click', () => {
    win.open('https://modrinth.com/mod/clickcrystals');
});

get('#discord').addEventListener('click', () => {
    win.open('https://discord.gg/tMaShNzNtP');
});

get('.link-icons #github').addEventListener('click', () => {
    win.open('https://github.com/itzispyder/clickcrystals');
});

get('.link-icons #download').addEventListener('click', () => {
    win.open('https://modrinth.com/mod/clickcrystals');
});

get('.link-icons #discord').addEventListener('click', () => {
    win.open('https://discord.gg/tMaShNzNtP');
});