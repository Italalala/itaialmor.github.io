var src;

function randomFlying(id, maxLeft, maxTop){
    var topMargin = Math.random()*maxTop;
    var leftMargin = Math.random()*maxLeft;
$("#"+id).animate({marginTop : topMargin + "%", marginLeft : leftMargin + "%"}, 10000, "linear", function(){randomFlying(id, maxLeft, maxTop);});
}

$(document).ready(function() {
    var gridw= $(".painting-container").css("width");
    $(".painting-container").css("height", gridw);

    $(".window").mouseenter(function(){
        var red=Math.random()*200+55;
        var green = Math.random()*200+55;
        var blue = Math.random()*200+55;
        // $(this).append("<div class='hover-selector'><h3>"+$(this).attr("data-title")+"</h3></div>");
        $(this).css("background-color", "rgba("+red+","+green+","+blue+",0.25)");
        src=$(this).attr("src");
        $(this).attr("src", "/media/blank.png");
        $(this).parent().append('<h3 class="hover-title">'+$(this).parent().attr("data-title")+"</h3>");
    });
    $(".window").mouseleave(function(){
        //$(this).css("opacity", "1");
        $(this).css("background-color","transparent");
        $(this).attr("src",src);
        $(".hover-title").remove();
    });

    $(".painting-container").click(function(){
        $("#SpotlightImage").css("background-image", $(this).css("background-image"));
        $("#SpotlightDetails").html("<h3>"+$(this).attr('data-title')+"</h3>");
        $("#SpotlightContainer").css("display", "block");
        $("#SpotlightContainer").animate({"width":"90%"},function(){$("#SpotlightImage").animate({opacity:"100%"});});
    });
    $("#CloseSpotlight").click(function(){
        $("#SpotlightImage").animate({opacity:"0%"},function(){
            $("#SpotlightContainer").animate({"width":"0%"},function(){
                $("#SpotlightContainer").css("display", "none");});
        });   
    })

    $("#Back").mouseenter(function(){
        $(this).attr("src", "/media/miscPaintings/Back2.png");
    })
    $("#Back").mouseleave(function(){
        $(this).attr("src", "/media/miscPaintings/Back.png");
    })

    $("#CloseSpotlight").mouseenter(function(){
        $(this).attr("src", "/media/Close2.png");
    })
    $("#CloseSpotlight").mouseleave(function(){
        $(this).attr("src", "/media/Close.png");
    })

    randomFlying("Butterfly", 78, 100);
    // $(".paintings-header img").mouseenter(function(){
    //     $(this).animate({"width":"125%"}, 1000);
    // })
    // $(".paintings-header img").mouseleave(function(){
    //     $(this).animate({"width":"100%"}, 1000);
    // })

    // $("body").css("height", $(document).height()+"px");
})