declare var $;

$(()=>{
   //document.location.pathname)
});

function GetController():string
{
    if(GetPathName() == "/")
        return "index";
    return GetPathName().substr(1);
}

function GetPathName():string{
    return document.location.pathname;
}