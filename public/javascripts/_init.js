$(function () {
    console.log(GetPathName());
    Init();
});

var controller;
function Init() {
    if (Voting[GetController()] !== null) {
        controller = new Voting[GetController()]();
        controller.Init();
    }
}

function GetController() {
    if (GetPathName() == "/")
        return "Index";
    return GetPathName().substr(1);
}

function GetPathName() {
    return document.location.pathname;
}
