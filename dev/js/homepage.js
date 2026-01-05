//Global Variables
var filenameholder=""; //to save original filename of mouseovered image for quick restore
var labelsrcholder=""; //to save original filename of mouseovered label
var labelname="";
var id="";
var AvatarNumber=0;
var waitTime=1000;
// var wPercent;
var wGlobal;
var gifnum=0;
var totalgifs=3;
var gifs=['/media/homepage/DonQuixoteStreetFighterOptimized.gif','/media/homepage/BirdBomb.gif','/media/homepage/smokeGif.gif'];

//Function for if mouse enters a menu Icon or Label
function AnimateMenuOn(iconID){
    var filename = filenameholder = $("#"+iconID).attr('src'); //get src of Icon and save it
        
    filename=filename.split(".")[0]+"2.png";//get filename of new icon image

    labelname= filenameholder.split('/')[3].split('.')[0]; //get name of image
    labelname+="Label"; //get ID name for corresponding label
    labelsrcholder=$("#"+labelname).attr('src'); //save unpainted filename
    var labelsrc=$("#"+labelname).attr('src').split('.')[0]+"-Highlit.png"; //get src for painted version label

    $("#"+iconID).attr("src",filename); // assign new icon image
    $("#"+labelname).attr('src',labelsrc); //assign new label image (painted)
}

//Function for when mouse exits a menu Icon or Label
function AnimateMenuOff(iconID){
    $("#"+iconID).attr('src',filenameholder); //reset icon
    $("#"+labelname).attr('src',labelsrcholder); //reset label
}

function getRandomDelay(min, max) { // function to get a random delay time for avatar transition btwn min and max limits
    return Math.random() * (max - min) + min;
    }

function repeatWithRandomDelay(minDelay, maxDelay, codeToExecute) { //function to repeat a function on a random delay
    setTimeout(() => {
    codeToExecute();
    repeatWithRandomDelay(minDelay, maxDelay, codeToExecute);
    }, getRandomDelay(minDelay, maxDelay));
}
//Function to randomly iterate Avatar image to a different skin
function IterateAvatar(){
        var randomNum = AvatarNumber;
        while(randomNum == AvatarNumber){
        randomNum = Math.round(Math.random()*25+1);
        }  
        AvatarNumber=randomNum;
        $("#Avatar").attr('src', '/media/homepage/Avatar/Avatar_'+randomNum+'.png');
}


//Start Listeners and page functions
$(document).ready(function() {

     $(".menuIcon").mouseenter(function(){ //listener for if mouse enters an icon
        id = $(this).attr('id');
        AnimateMenuOn(id);
    })
    $(".menuIcon").mouseleave(function(){ //lister for if mouse exits an icon
        AnimateMenuOff(id);
    })

    $(".menuLabel").mouseenter(function(){ //listener for if mouse enters a label
        id=$(this).attr('id').replace("Label","")+"Icon";
        AnimateMenuOn(id);
    })
    $(".menuLabel").mouseleave(function(){ //listener for if mouse exits a label
       AnimateMenuOff(id);
    })

    $("#Heart").click(function(){
        $('#LoveWinsBackground').css("display", "block");
    })
    $("#CloseGif").click(function(){
        gifnum=0;
        $("#LoveWinsBackground").css("display", "none");
        $("#LoveWinsContainer").css("background-image", "url('"+gifs[gifnum]+"'");
    })

    //listener to grow key elements on hover
    $(".hover-grow").mouseenter(function(){
    console.log("init width = "+$(this).width());
    wGlobal=$(this).width();
        $(this).width(Number(parseInt($(this).width())*1.2));
        
    });
    $(".hover-grow").mouseleave(function(){
    $(this).width(wGlobal);
    });

    $("#NextGif").click(function(){
        gifnum=(gifnum+1)%totalgifs;
        $("#LoveWinsContainer").css("background-image", "url('"+gifs[gifnum]+"'");
    });

    // $("#Menu").mouseenter(function(){
    //     $(this).animate({"max-width":"75%"});
    // })
    //  $("#Menu").mouseleave(function(){
    //     $(this).animate({"max-width":"60%"});
    // })

    const minDelay = 1000;
    const maxDelay = 8000;
    repeatWithRandomDelay(minDelay, maxDelay, IterateAvatar); //iterate avatar skin on random interval btwn 1 and 8 seconds
})