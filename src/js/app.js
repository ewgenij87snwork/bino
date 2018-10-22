$(function() {
  var items = $('#menuSelection-items').width();
  var itemSelected = document.getElementsByClassName('menuSelection-item');
  var backgroundColours = ["rgb(133, 105, 156)", "rgb(175, 140, 115)","rgb(151, 167, 109)","rgb(171, 100, 122)","rgb(105, 134, 156)","rgb(152, 189, 169)"]
  menuPointerScroll($(itemSelected));
  $("#menuSelection-items").scrollLeft(200).delay(200).animate({
    scrollLeft: "-=200"
  }, 2000, "easeOutQuad");
 
  $('.menuSelection-paddle-right').click(function () {
    $("#menuSelection-items").animate({
      scrollLeft: '+='+items
    });
  });
  $('.menuSelection-paddle-left').click(function () {
    $( "#menuSelection-items" ).animate({
      scrollLeft: "-="+items
    });
  });

  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var scrolling = false;

    $(".menuSelection-paddle-right").bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("right");
    }).bind("mouseout", function(event) {
        scrolling = false;
    });

    $(".menuSelection-paddle-left").bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("left");
    }).bind("mouseout", function(event) {
        scrolling = false;
    });

    function scrollContent(direction) {
        var amount = (direction === "left" ? "-=3px" : "+=3px");
        $("#menuSelection-items").animate({
            scrollLeft: amount
        }, 1, function() {
            if (scrolling) {
                scrollContent(direction);
            }
        });
    }
  }
  
  $('.menuSelection-item').click(function () {
    $('#menuSelection').find('.active').removeClass('active');
    $(this).addClass("active");
    menuPointerScroll($(this));
    newBackgroundColour(backgroundColours)
  });

});
var newBackgroundColour = function(backgroundColours){
  var newBackground = backgroundColours[Math.floor(Math.random()*backgroundColours.length)];
  if(newBackground != $("html").css("background-color")){
    $("html").css("background",newBackground);
  }else{
    newBackgroundColour(backgroundColours);
  }
}

function menuPointerScroll(ele) {

  var parentScroll = $("#menuSelection-items").scrollLeft();
  var offset = ($(ele).offset().left - $('#menuSelection-items').offset().left);
  var totalelement = offset + $(ele).outerWidth()/2;

  var rt = (($(ele).offset().left) - ($('#menuSelection-wrapper').offset().left) + ($(ele).outerWidth())/2);
  $('#menuSelector').animate({
    left: totalelement + parentScroll
  })
}