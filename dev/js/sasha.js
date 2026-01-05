var page=0;

function NextImage(currPageNum){
    var newNum=(currPageNum+1)%36;
    page=newNum;
    return newNum;
}
function PrevImage(currPageNum){
    var newNum = currPageNum-1;
    console.log("subtractedNum: "+newNum);
    if(newNum<0){
        newNum=35;
    }
    console.log("recheck substractedNum: "+newNum);
    page=newNum;
    return newNum;
}
function ParseSrc(path){
    var newPath=path.split("/media/sasha/SashaWeb-")[1];
    console.log("newPath: "+newPath);
    newPath=newPath.split(".")[0];
    return Number(newPath);
}
function UpdatePage(direction){
    $("#SashaPageFreezer").css("opacity","1"); //pull up the freezeframe
    var url=$("#SashaPage").attr("src");
    console.log("original url: "+url);
    url = ParseSrc(url);
    console.log("parsed url: "+url);
    if(direction=="right"){ //update the src for the page image forward or backward
        url = NextImage(url);
        console.log("next url: "+url);
    }
    else{
        url = PrevImage(url);
    }

    //update page number but hide on cover pages
    $("#PageNum").html("Page " + page);
    if(page==0 || page==35){
        $("#PageNum").html("~");
    }

    url = "/media/sasha/SashaWeb-"+url+".jpg";
    $("#SashaPage").attr("src", url); //and then fade the freeze frame out
    $("#SashaPageFreezer").animate({opacity:"0"},function(){$("#SashaPageFreezer").attr("src",url);}); //after freeze frame fades out, update it to match the new current page 
}

function SizeFreezeFrame(){
    $("#SashaPageFreezer").width($("#SashaPage").width());
    $("#SashaPageFreezer").height($("#SashaPage").height());
    
}

$(document).ready(function(){
    SizeFreezeFrame();

    //Listener for iterate page forward
$("#RightArrow").click(function(){
    UpdatePage("right");
})

//Listener for iterate page backward
$("#LeftArrow").click(function(){
    UpdatePage("left");
})

$(document).keydown(function(event){
    if(event.which==39){//right arrow key
        UpdatePage("right");
    }
    else if(event.which==37){//left arrow key
        UpdatePage("left");
    }
})

$("#Back").click(function(){
    window.location.href ="/index.html"
})
})