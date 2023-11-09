let maxView = document.querySelector(".view-icon");
let centerContent = document.querySelector(".center-content");
let fullScreenIcon = document.querySelector(".full-screen-icon");
let minScreenIcon = document.querySelector(".min-screen-icon");

let isToggleMax = false;

function toggleCenterView() {
    isToggleMax ? minCenterView() : maxCenterView();
}

function maxCenterView() {
    centerContent.style.height = "100vh";
    centerContent.style.width = "100vw";
    centerContent.style.position = "absolute";
    centerContent.style.top = "0px";
    centerContent.style.left = "-300px";
    centerContent.style.zIndex = "1";
    isToggleMax = true;
    fullScreenIcon.style.display = "none";
    minScreenIcon.style.display = "block";
}

function minCenterView() {
    centerContent.style.height = "100%";
    centerContent.style.width = "100%";
    centerContent.style.position = "relative";
    centerContent.style.top = "0px";
    centerContent.style.left = "0px";
    centerContent.style.zIndex = "1";
    isToggleMax = false;
    fullScreenIcon.style.display = "block";
    minScreenIcon.style.display = "none";
}