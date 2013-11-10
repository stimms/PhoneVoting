///<reference path="visualization.ts"/>
declare var $;

$(()=>{
    console.log(GetPathName());
    Init();
});

var controller;
function Init()
{
    if(Voting[GetController()] != null)
    {
        controller = new Voting[GetController()]();
        controller.Init();
    }
}

function GetController():string
{
    if(GetPathName() == "/")
        return "Index";
    return GetPathName().substr(1);
}

function GetPathName():string{
    return document.location.pathname;
}