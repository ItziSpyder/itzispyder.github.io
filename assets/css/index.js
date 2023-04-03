const doc = document;
const myMcSkin = doc.querySelector('.image #image0');

var myMcSkinOpacity = 100;
var myMcSkinScale = 1;
var myMcSkinRotation = 0;

myMcSkin.addEventListener('click', () => {
    myMcSkin.style.opacity = myMcSkinOpacity + "%";
    myMcSkinOpacity = myMcSkinOpacity <= 0 ? 100 : myMcSkinOpacity -= 5;
    myMcSkin.style.transform = "scale(" + myMcSkinScale + ")";
    myMcSkinScale = myMcSkinScale >= 2 ? 1 : myMcSkinScale += 0.05;
});

doc.addEventListener('scroll', () => {
    myMcSkin.style.transform = "rotateZ(" + myMcSkinRotation + "deg)";
    myMcSkinRotation = myMcSkinRotation >= 360 ? 0 : myMcSkinRotation += 5;
});