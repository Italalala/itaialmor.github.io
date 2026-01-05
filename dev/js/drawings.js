var drawingsCount=0;
var drawings=[];
var topCount, bottomCount,rightCount;
var currentDrawing="Drawing0";

function getWindowAspectRatio() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (height == 0) {
    return 0; // Avoid division by zero
  }
  var aspect= width/height;
  return aspect;
}

function loadDrawingsArray(){
    var url="/media/miscDrawings/MiscDrawing_"+drawingsCount+".jpg";
    var img= new Image();
    img.onerror=function(){
        calculateDrawingCountsPerSection();
        return;
    }
    img.onload=function(){
        drawings[drawingsCount]="<div class='drawing-icon-container'><img id='Drawing"+drawingsCount+"' src='/media/miscDrawings/MiscDrawing_"+drawingsCount+".jpg' class='drawing-icon clickable'/></div>";
        drawingsCount++;
        loadDrawingsArray();
    }
    img.src=url;
}

function calculateDrawingCountsPerSection(){
    var aspect = getWindowAspectRatio();
    if (aspect !=0){
        topCount = Math.round((((drawingsCount+1)/2)/(1+(1/aspect))))-3; // return the number of pictures that should be loaded in the top 
        bottomCount=topCount+3;
        rightCount=Math.round((drawingsCount-topCount-bottomCount)/2);
    }
    // console.log("Top bar will have "+topCount+" images");
    // console.log("Right bar will have "+rightCount+" images");
    // console.log("Bottom bar will have "+bottomCount+" images");
    // console.log("Left bar will have "+(drawingsCount-topCount-rightCount-bottomCount)+" images");
    loadDrawingsToPage();
}

function updateCounter(){
    var num=(""+currentDrawing).split("Drawing")[1];
    console.log("updating counter");
    $("#Counter h1").html(num);
}

function updateDetails(){
        //display drawing's title and date from drawingsData object
        $("#ArtTitle").html(""+drawingsData[currentDrawing].title);
        $("#ArtDate").html(""+drawingsData[currentDrawing].date);
}

function loadDrawingsToPage(){
   
    for(let i=0;i<topCount;i++){
        $("#TopBar").append(drawings[i]);
    }
    for(let i=topCount; i<(topCount+rightCount);i++){
        $("#RightBar").append(drawings[i]);
    }
    for(let i=(topCount+rightCount); i<(topCount+rightCount+bottomCount); i++){
        $("#BottomBar").append(drawings[i]);
    }
    for(let i=(topCount+rightCount+bottomCount); i<drawingsCount; i++){
        $("#LeftBar").append(drawings[i]);
    }
    //size right and left bar icons
    $("#TopBar").children().css("width", 100/topCount+"%");
    $("#TopBar").children().css("height", $("#TopBar").children().css("width"));
    $("#BottomBar").children().css("width", 100/bottomCount+"%");
    $("#BottomBar").children().css("height", $("#BottomBar").children().css("width"));
    $("#RightBar").children().css("height", 100/rightCount+"%");
    $("#RightBar").children().css("width", $("#RightBar").children().css("height"));
    $("#LeftBar").children().css("height", 100 /(drawingsCount-(topCount+rightCount+bottomCount))+"%");
    $("#LeftBar").children().css("width", $("#LeftBar").children().css("height"));

    //update selection on title drawing icon
    $("#"+currentDrawing).parent('div').css('background-image',"url('/media/miscDrawings/selectedBlob.png')");//set background behind selected icon to green blob
    $("#"+currentDrawing).css("opacity",0.5); //dim icon of selected icon to reveal green blob selector

    //set listener for click on drawing to update big view
    $(".drawing-icon, .arrow").click(function(){
        var url;

        $("#"+currentDrawing).css("opacity",1); //bring back previous drawings icon to full opacity
        $("#"+currentDrawing).parent('div').css('background-image',"url('/media/miscDrawings/selectorBlob.png')");//reset its background to yellow selector

        if($(this).hasClass("drawing-icon")){ //if you clicked on a drawing icon
            url=$(this).attr('src');
            currentDrawing=$(this).attr('id'); //save id of the slected drawing to global variable
        }
        else if($(this).hasClass("forward")){ //if forward arrow clicked and 
            currentDrawing="Drawing"+(Number(currentDrawing.split("Drawing")[1])+1)%(drawingsCount); //iterate global id
            //console.log(currentDrawing);
            url=$("#MainDrawing").attr('src').split("_");//grab and parse the current spotlit drawing's file and number
            var filenum=url[1].split(".")[0];
            filenum=(Number(filenum)+1)%(drawingsCount);
            // console.log(""+url[0]+"_"+filenum+".jpg");
            url=""+url[0]+"_"+filenum+".jpg";//rewrite the new path to the source file for the spolight
        }
        else{//if back arrow clicked
            var filenum=Number(currentDrawing.split("Drawing")[1])-1;
            if(filenum<0){filenum=drawingsCount-1;}
            currentDrawing="Drawing"+filenum;
            url=$("#MainDrawing").attr('src').split("_");//grab and parse the current spotlit drawing's file and number
            var filenum=url[1].split(".")[0];
            if(filenum>0){ //handle wrap around with left arrow bc mod doesnt work with negatives
                filenum=(filenum-1);
            }
            else{
                filenum=drawingsCount-1;
            }
            url=""+url[0]+"_"+filenum+".jpg";//rewrite the new path to the source file for the spolight
        }
        
        $("#MainDrawing").attr('src',url); //update image in spotlight
        $("#"+currentDrawing).parent('div').css('background-image',"url('/media/miscDrawings/selectedBlob.png')");//set background behind selected icon to green blob
        $("#"+currentDrawing).css("opacity",0.5); //dim icon of selected icon to reveal green blob selector
        updateCounter();
        updateDetails();
    })




    //redundant listener and routine for if arrowkeys are pressed
        $(document).keydown(function(event) {
        if(event.which==37||event.which==39){// arrow keys
            var url;
            $("#"+currentDrawing).css("opacity",1); //bring back previous drawings icon to full opacity
            $("#"+currentDrawing).parent('div').css('background-image',"url('/media/miscDrawings/selectorBlob.png')");//reset its background to yellow selector
        }
        if(event.which==39){//right arrow key
            currentDrawing="Drawing"+(Number(currentDrawing.split("Drawing")[1])+1)%(drawingsCount); //iterate global id
            //console.log(currentDrawing);
            url=$("#MainDrawing").attr('src').split("_");//grab and parse the current spotlit drawing's file and number
            var filenum=url[1].split(".")[0];
            filenum=(Number(filenum)+1)%(drawingsCount);
            // console.log(""+url[0]+"_"+filenum+".jpg");
            url=""+url[0]+"_"+filenum+".jpg";//rewrite the new path to the source file for the spolight
        } 
        else if(event.which==37){//left arrow key
            var filenum=Number(currentDrawing.split("Drawing")[1])-1;
            if(filenum<0){filenum=drawingsCount-1;}
            currentDrawing="Drawing"+filenum;
            url=$("#MainDrawing").attr('src').split("_");//grab and parse the current spotlit drawing's file and number
            var filenum=url[1].split(".")[0];
            if(filenum>0){ //handle wrap around with left arrow bc mod doesnt work with negatives
                filenum=(filenum-1);
            }
            else{
                filenum=drawingsCount-1;
            }
            url=""+url[0]+"_"+filenum+".jpg";//rewrite the new path to the source file for the spolight
        }
                
        $("#MainDrawing").attr('src',url); //update image in spotlight
        $("#"+currentDrawing).parent('div').css('background-image',"url('/media/miscDrawings/selectedBlob.png')");//set background behind selected icon to green blob
        $("#"+currentDrawing).css("opacity",0.5); //dim icon of selected icon to reveal green blob selector
        updateCounter();
        updateDetails();
    });




//listeners to show yellow blob on each icon on hover
    $(".drawing-icon").mouseenter(function(){
        $(this).css("opacity",0.5);
    })
    $(".drawing-icon").mouseleave(function(){
        if($(this).attr("id")!=currentDrawing){
            $(this).css("opacity",1);
        }
    })
    
}



$(document).ready(function() {
    loadDrawingsArray(); //get everything started - functions call eachother to avoid asynchronous errors
})
