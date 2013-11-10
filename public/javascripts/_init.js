$(function () {
    //document.location.pathname)
});

function GetController() {
    if (GetPathName() == "/")
        return "index";
    return GetPathName().substr(1);
}

function GetPathName() {
    return document.location.pathname;
}
//# sourceMappingURL=_init.js.map
