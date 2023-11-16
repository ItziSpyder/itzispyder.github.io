code = `<div class="header" style="top: 0; left: 0; position: fixed; width: 100%; font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;">
<style>
    .display {
        height: 50px;
    }
    .display .exit {
        border-radius: 10px;
        padding-left: 10px;
        padding-right: 10px;
        width: fit-content;
        height: fit-content;
        margin-left: 10px;
        font-size: 30px;
        color: black;
        text-decoration: none;
    }
    .display .exit:hover {
        background-color: rgb(223, 223, 223);
    }
</style>
<div class="display" style="background-color: white; box-shadow: rgb(57, 57, 57) 0 -2px 10px;">
    <a href="../../clickscript.html" class="exit">x</a>
</div>
</div>`;
var div = document.createElement('div');
div.innerHTML = code;
document.body.appendChild(div);



const doc = document;
const nextButton = doc.querySelector('.next');
var contentParent = doc.querySelector('.sections');
var content = contentParent.querySelectorAll('.section');
var index = 0;

content.forEach(e => contentParent.removeChild(e));
next();

doc.addEventListener('keypress', () => {
    next();
});
nextButton.addEventListener('click', () => {
    next();
});

function next() {
    contentParent.appendChild(content[index++]);
    if (index == content.length) {
        nextButton.addEventListener('click', () => {
            window.location.href = '../../clickscript.html';
        });
        nextButton.innerHTML = `Finish Lesson`;
    }
}

