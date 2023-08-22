const doc = document;
const out = doc.querySelector('.main .ann');

printJson();

doc.addEventListener('keyup', () => {
    printJson();
});

read('.ann .field-remove').addEventListener('click', event => {
    if (getFields().length > 1) {
        console.log(getFields()[getFields() - 1]);
        read('.fields').remove(getFields()[getFields() - 1]);
        printJson();
    }
});

read('.ann .field-new').addEventListener('click', event => {
    var og = getFields()[getFields().length - 1];
    var clone = og.cloneNode(true);
    var main = read('.fields');

    clone.setAttribute('id', 'field_' + (getFields().length + 1));
    clone.querySelector('#field-title').value = og.querySelector('#field-title').value;
    clone.querySelector('#field-desc').value = og.querySelector('#field-desc').value;

    main.append(clone);
    printJson();
});

function printJson() {
    var c = ", ";
    var title = "\"title:\": \"" + read('.ann #ann-title').value + "\"";
    var desc = "\"desc:\": \"" + read('.ann #ann-desc').value + "\"";
    var fields = "\"fields\": ["

    for (var i = 0; i < doc.querySelectorAll('.field').length; i++) {
        var field = doc.querySelectorAll('.field')[i];
        var fTitle = field.querySelector('.field #field-title').value;
        var fDesc = field.querySelector('.field #field-desc').value;
        var fTitleName = "\"title:\": \"" + fTitle + "\"";
        var fDescName = "\"desc:\": \"" + fDesc + "\"";

        var fieldJson = "{" + fTitleName + c + fDescName + "}"; 
        fields += fieldJson;
        if (i < doc.querySelectorAll('.field').length - 1) {
            fields += c;
        }
    }
    fields += "]";

    var finalJson = "{" + title + c + desc + c + fields + "}";
    output(finalJson);
}

function getFields() {
    return doc.querySelectorAll('.field');
}

function output(text) {
    read('#output').value = text;
}

function read(selector) {
    return doc.querySelector(selector);
}