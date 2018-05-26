var mainText = $("#mainText");
var submitBtn = $("#submitBtn");
var fireHeading = $("#fireHeading");

var registerBtn = $("#registerBtn");
var emailInput = $("#email");
var passwordInput = $("#pass");

var firebaseRef = firebase.database().ref();
var firebaseHeadingRef = firebaseRef.child("Heading");

firebaseHeadingRef.on('value', function(datasnapshot) {
  fireHeading.text(datasnapshot.val());
});

function submitClick() {
  var messageText = mainText.val();

  firebaseRef.push().set(messageText);
}

function registerClick() {
  console.log("merge");

  var email = emailInput.val();
  var password = passwordInput.val();

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ", " + errorMessage);
    // ...
  });
}



function goScreenClick(x, currentDot, nextDot) {
  $(".acrylic").show(100, function() {
    $(".acrylic").animate({
      "opacity": "0.95"
    }, 500, function() {
      $("#inner").css({
        "left": "-" + x + "px"
      });

      $("#dots-nav").find(".active").removeClass(currentDot).addClass(nextDot);
    });
  });

  setTimeout(function() {
    $(".acrylic").animate({
      "opacity": "0"
    }, 500, function() {
      $(".acrylic").hide(100);
    });
  }, 1000);
}



$(function() {
  $(".input input").focus(function() {
    $(this).parent(".input").each(function() {
      $("label", this).css({
        "line-height": "18px",
        "font-size": "18px",
        "font-weight": "300",
        "font-style": "italic",
        "top": "-20px",
        "color": "#998a83"
      })
    });
  }).blur(function() {
    if ($(this).val() == "") {
      $(this).parent(".input").each(function() {
        $("label", this).css({
          "line-height": "50px",
          "font-size": "24px",
          "font-weight": "400",
          "font-style": "normal",
          "top": "0px",
          "color": "rgba(0, 0, 0, 0.8)"
        })
      });
    }
  });

  $(".button button").mouseenter(function() {
    $(this).parent(".button").each(function() {
      $("span", this).css({
        "width": "340px"
      })
    });
  }).mouseleave(function() {
    $(this).parent(".button").each(function() {
      $("span", this).css({
        "width": "62px"
      })
    });
  });

  // $(".button").click(function(e) {
  //   var pX = e.pageX,
  //       pY = e.pageY,
  //       oX = parseInt($(this).offset().left),
  //       oY = parseInt($(this).offset().top);

  //   $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' +(pY - oY) + 'px;"></span>')

  //   $('.x-' + oX + '.y-' + oY + '').animate({
  //     "width": "500px",
  //     "height": "500px",
  //     "top": "-250px",
  //     "left": "-250px",
  //   }, 600);

  //   $("button", this).addClass('active');
  // })

  // $(".alt-2").click(function() {
  //   if (!$(this).hasClass('material-button')) {
  //     $(".shape").css({
  //       "width": "100%",
  //       "height": "100%",
  //       "transform": "rotate(0deg)"
  //     })

  //     setTimeout(function() {
  //       $(".overbox").css({
  //           "overflow": "initial"
  //       })
  //     }, 600)

  //     $(this).animate({
  //       "width": "140px",
  //       "height": "140px"
  //     }, 500, function() {
  //       $(".box").removeClass("back");

  //       $(this).removeClass('active')
  //     });

  //     $(".overbox .title").fadeOut(300);
  //     $(".overbox .input").fadeOut(300);
  //     $(".overbox .button").fadeOut(300);

  //     $(".alt-2").addClass('material-buton');
  //   }
  // })

  // $(".material-button").click(function() {
  //   if ($(this).hasClass('material-button')) {
  //     setTimeout(function() {
  //       $(".overbox").css({
  //         "overflow": "hidden"
  //       })

  //       $(".box").addClass("back");
  //     }, 200)

  //     $(this).addClass('active').animate({
  //       "width": "700px",
  //       "height": "700px"
  //     });

  //     setTimeout(function() {
  //       $(".shape").css({
  //         "width": "50%",
  //         "height": "50%",
  //         "transform": "rotate(45deg)"
  //       })

  //       $(".overbox .title").fadeIn(300);
  //       $(".overbox .input").fadeIn(300);
  //       $(".overbox .button").fadeIn(300);
  //     }, 700)

  //     $(this).removeClass('material-button');
  //   }

  //   if ($(".alt-2").hasClass('material-buton')) {
  //     $(".alt-2").removeClass('material-buton');
  //     $(".alt-2").addClass('material-button');
  //   }
  // });
});
//Burger transition
$(document).ready(function(){
    $('.icon').click(function(){
        $('.icon').toggleClass('active')
    })
})