const doc = document;
var temp;

function get(query) {
    return doc.querySelector(query);
}

function getAll(query) {
    return doc.querySelectorAll(query);
}

function setLink(query, link) {
    get(query).addEventListener('mousedown', () => {
        window.open(link);
    });
}

function appendImage(query, path) {
    getAll(query).forEach(element => {
        temp = doc.createElement('div');
        temp.innerHTML = '<img src="' + path + '" style="width: 100px; margin-top: 40px;"></img>'
        element.appendChild(temp);
    });
}

setLink('#link-canvas', 'https://esuhsd.instructure.com/');
setLink('#link-drive', 'https://drive.google.com/');
setLink('#link-classroom', 'https://classroom.google.com/');
setLink('#link-clickcrystals', 'https://itzispyder.github.io/clickcrystals');
setLink('#link-discord', 'https://discord.com/channels/@me/');

appendImage('#icon-classroom', "./arms/assets/icon_classroom.png");
appendImage('#icon-canvas', "./arms/assets/icon_canvas.png");
appendImage('#icon-docs', "./arms/assets/icon_docs.png");
appendImage('#icon-drive', "./arms/assets/icon_drive.png");
appendImage('#icon-sheets', "./arms/assets/icon_sheets.png");
appendImage('#icon-translate', "./arms/assets/icon_translate.png");

