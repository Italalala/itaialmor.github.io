var h=0;

function SizeThumbnails(){
    $(".thumbnail").each(function (index){
        $(this).height($(this).width());
    });
    h=$("#Slider").height();
}

$(document).ready(function() {
    SizeThumbnails();

    //Function to animate thumbnail height and width growth on hover staying square
     $(".thumbnail").hover(function(){
        $(this).animate({
            // Animate the width to the target value
            width: "10%"
        }, {
            // Animation options
            duration: 100, // Duration of the animation in milliseconds
            easing: 'swing', // Type of easing (swing or linear)
            step: function() {
                 $(this).height($(this).width()+"px");
                // // This function runs on every frame of the animation
            }
        });
    },
    function(){
        $(this).animate({
            // Animate the width to the target value
            width: "7%"
        }, {
            // Animation options
            duration: 100, // Duration of the animation in milliseconds
            easing: 'swing', // Type of easing (swing or linear)
            step: function() {
                $(this).height($(this).width()+"px");
                // // This function runs on every frame of the animation
            }
        });
    });
    $("#Slider").hover(
        function(){
            $(this).animate({
                height: h*1.5},
            {   duration:300,
                easing:"swing"
            });
        },
        function(){
            $(this).animate({
                height: h},
            {   duration:300,
                easing:"swing"
            });
        }
    );

    // listener for click on thumbnail to update spotlight image
    $(".thumbnail").click(function(){
        console.log("clicked");
        $("#SpotlightImage").attr("src", $(this).attr("src"));
        $("#Title").html($(this).attr("data-title"));
        $("#Description").html($(this).attr("data-details"));
    });

    $("#Back").hover(function(){
        $(this).attr("src", "/media/editorialIllustration/backScissorsOpen.png");
    },
    function(){
        $(this).attr("src", "/media/editorialIllustration/backScissors.png");
    });
})

   
