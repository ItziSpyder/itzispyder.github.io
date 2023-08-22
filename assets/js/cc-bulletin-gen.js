const doc = document;
const out = doc.querySelector('.main .ann');

read('#field-title').value = '&bField Title';
read('#field-desc').value = 'Field Description <n>New line <n><n>Two lines down';
printJson();
updateListeners();
checkButtonsVisibility();

doc.addEventListener('keyup', () => {
    printJson();
});

doc.addEventListener('mouseup', () => {
    checkButtonsVisibility();
});

function checkButtonsVisibility() {
    var buttons = doc.querySelectorAll('.field_remove');

    buttons.forEach(button => {
        button.style.visibility = getFields().length > 1 ? 'visible' : 'hidden';
    });
}

function updateListeners() {
    var removals = doc.querySelectorAll('.field_remove');
    var addition = doc.querySelectorAll('.field_new');

    removals.forEach(button => {
        button.addEventListener('mousedown', event => {
            var cur = event.target;
            var par = cur.parentNode;
        
            if (getFields().length > 1) {
                par.remove(cur);    
            }
            printJson();
        });
    });

    addition.forEach(button => {
        if (button.classList.contains('hasCloningListener')) {
            return;
        }

        button.classList.add('hasCloningListener');
        button.addEventListener('mousedown', () => {
            var og = getFields()[getFields().length - 1];
            var clone = og.cloneNode(true);
            var main = read('.fields');
        
            clone.setAttribute('id', 'field_' + (getFields().length + 1));
            clone.querySelector('#field-title').value = '';
            clone.querySelector('#field-desc').value = '';
            clone.querySelector('.field_new').classList.remove('hasCloningListener');
        
            main.append(clone);
            printJson();
            updateListeners();
        });
    });
}

function printJson() {
    var c = ", ";
    var title = "\"title:\": \"" + read('.ann #ann-title').value + "\"";
    var desc = "\"desc:\": \"" + read('.ann #ann-desc').value + "\"";
    var fields = "\"fields\": ["

    for (var i = 0; i < getFields().length; i++) {
        var field = doc.querySelectorAll('.field')[i];
        var fTitle = field.querySelector('.field #field-title').value;
        var fDesc = field.querySelector('.field #field-desc').value;
        var fTitleName = "\"title:\": \"" + fTitle + "\"";
        var fDescName = "\"desc:\": \"" + fDesc + "\"";

        var fieldJson = "{" + fTitleName + c + fDescName + "}"; 
        fields += fieldJson;
        if (i < getFields().length - 1) {
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
