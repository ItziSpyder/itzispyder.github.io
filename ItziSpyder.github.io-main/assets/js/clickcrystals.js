const doc = document;
const win = window;

const navHome = doc.querySelector('.navbar .bar .home');
const navSource = doc.querySelector('.navbar .bar .source');
const navFaq = doc.querySelector('.navbar .bar .faq');

const cardDownload = doc.querySelector('.projects .download');
const cardDiscord = doc.querySelector('.projects .discord');
const cardGithub = doc.querySelector('.projects .github');

const faqScreen = doc.querySelector('.faq-screen');

navHome.addEventListener('click', () => {
    faqScreen.classList.remove('shown');
    faqScreen.style.visibility = hidden;
});

navSource.addEventListener('click', () => {
    win.open('https://github.com/itzispyder/clickcrystals');
});

navFaq.addEventListener('click', () => {
    faqScreen.classList.add('shown');
    faqScreen.style.visibility = visible;
});

cardDownload.addEventListener('click', () => {
    win.open('https://modrinth.com/mod/clickcrystals');
});

cardDiscord.addEventListener('click', () => {
    win.open('https://discord.gg/tMaShNzNtP');
});

cardGithub.addEventListener('click', () => {
    win.open('https://github.com/itzispyder/clickcrystals');
});

