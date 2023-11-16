

const doc = document;
var div;



code = `<div class="navbar" style="position: fixed; width: 100%; height: 50px; margin: 0; padding: 0; top: 0; left: 0; z-index: 999;">
<style>
    .title {
        padding: 15px;
        padding-top: 0;
        padding-right: 30px;
        font-size: 30px;
        font-weight: bold;
        color: rgb(55, 54, 54);
    }
    .title > img {
        width: 45px;
        transform: translateY(10px);
    }
    .content {
        box-shadow: rgb(57, 57, 57) 0 -2px 10px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: white;
    }
    .content  .display > a {
        color: rgb(125, 125, 125);
        text-decoration: none;
        font-size: 25px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .content > .display > a:hover {
        color: black;
    }
</style>
<div class="content">
    <div class="display" style="margin: auto; width: fit-content;">
        <div class="title" style="display: inline-block;"><img src="./clickscript/assets/ccs.png">ClickScript</div>
        <a href="https://itzispyder.github.io/clickcrystals" target="_blank">Home</a>
        <a href="https://github.com/ItziSpyder/ClickCrystals/wiki/Using-ClickCrystalsScript" target="_blank">Wiki</a>
        <a href="https://github.com/ItziSpyder/ClickCrystals" target="_blank">GitHub</a>
        <a href="https://github.com/ItziSpyder/ClickCrystals/wiki" target="_blank">FAQ</a>
        <a href="https://discord.gg/tMaShNzNtP" target="_blank">Discord</a>
    </div>
</div>
</div>`;
div = doc.createElement('div');
div.innerHTML = code;
doc.body.appendChild(div);
console.log('loaded navigation bar from `./clickscript/js/navbar.js`');


code = `<div class="footer" style="text-align: center; background-color: gray; color: white; padding: 10px; margin-top: 50px;">Copyright (c) 2023 ClickCrystals</div>`;
div = doc.createElement('div');
div.innerHTML = code;
doc.body.appendChild(div);
console.log('loaded footer bar from `./clickscript/js/navbar.js`');

