var firebaseRef = firebase.database().ref();
var Users = firebaseRef.child("Users");

// firebaseHeadingRef.on('value', function(datasnapshot) {
//   fireHeading.text(datasnapshot.val());
// });

function loginClick() {
  var email = $("#l-email").val();
  var password = $("#l-pass").val();

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {

    if (user.emailVerified) {
      $("#l-email").val('');
      $("#l-pass").val('');

      appendMessage("You are logged in successfully", 3500, "success");

      setTimeout(function() {
        window.location.href = "mainPage.html";
      }, 3500);
    } else {
      appendMessage("Your account is not confirmed! Check the email box and access the link in the email you received.", 5000, "warning");
    }

  }).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("SingIn user error: ");
    console.log("Code: " + errorCode + ", Message: " + errorMessage);
    console.log("");

    appendMessage(errorMessage, 3500, "error");

  });
}

function registerClick() {
  var email = $("#r-email").val();
  var name = $("#r-nume").val();
  var username = $("#r-usernume").val();
  var password = $("#r-pass").val();
  var passwordConfirm = $("#r-repass").val();
  var studentNo = $("#r-stdno").val();

  if (name != '' && username != '' && studentNo != '') {
    if (password == passwordConfirm) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
        
        var userID = firebase.auth().currentUser.uid;

        Users.child(userID).set({
          username: username,
          email: email,
          fullName: name,
          studentNumber: studentNo,
          profileImg: "default"
        }).then(function() {

          appendMessage("Your data has been uploaded to the database", 4000, "info");

          if (user && user.emailVerified === false) {
            user.sendEmailVerification().then(function() {

              $("#r-email").val('');
              $("#r-nume").val('');
              $("#r-usernume").val('');
              $("#r-pass").val('');
              $("#r-repass").val('');
              $("#r-stdno").val('');

              firebase.auth().signOut().then(function() {

                appendMessage("Your account has been successfully created. You will receive an activation link via email.", 5000, "success");
                goScreenClick(550, 'register', 'login');

              }).catch(function(error) {
                
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Initial signout error: ");
                console.log("Code: " + errorCode + ", Message: " + errorMessage);
                console.log("");

                appendMessage(errorMessage, 3500, "info");

              });

            }).catch(function(error) {

              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("Email verification error: ");
              console.log("Code: " + errorCode + ", Message: " + errorMessage);
              console.log("");

              appendMessage(errorMessage, 3500, "warning");

            });
          }

        }).catch(function(error) {

          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Database upload error: ");
          console.log("Code: " + errorCode + ", Message: " + errorMessage);
          console.log("");

          appendMessage(errorMessage, 3500, "error");

        });

      }).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Create user error: ");
        console.log("Code: " + errorCode + ", Message: " + errorMessage);
        console.log("");

        appendMessage(errorMessage, 3500, "error");

      });
    } else {
      appendMessage("Passwords do not match", 2000, "info");
    }
  } else {
    if (name == '') {
      appendMessage("The full name not entered", 2000, "info");
    }
    
    if (username == '') {
      appendMessage("Username not entered", 2000, "info");
    }

    if (studentNo == '') {
      appendMessage("Student number not entered", 2000, "info");
    }
  }
}

function resetClick() {
  var email = $("#p-email").val();
  var emailConfirm = $("#p-rmail").val();

  if (email == emailConfirm) {
    firebase.auth().sendPasswordResetEmail(email).then(function() {

      $("#p-email").val('');
      $("#p-rmail").val('');
      appendMessage("The operation was successful. You will receive a password reset link by email.", 4000, "success");
      goScreenClick(550, 'password', 'login');

    }).catch(function(error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Send verification email error: ");
      console.log("Code: " + errorCode + ", Message: " + errorMessage);

      appendMessage(errorMessage, 3500, "error");

    });
  } else {
    appendMessage("Emails do not match", 2000, "info");
  }
}


function appendMessage(message, duration, type) {
  new Noty({
    text: message,
    timeout: duration,
    type: type,
    layout: 'topRight',
    theme: 'metroui'
  }).show();
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
});

$(document).ready(function() {
  $('.side-menu-btn').click(function() {
    $(this).css({
      'visibility': 'hidden'
    });

    $('#side-menu').css({
      'right': 0
    });
  });

  $('#menu-close').click(function() {
    $('.side-menu-btn').css({
      'visibility': 'visible'
    });

    $('#side-menu').css({
      'right': -300
    });
  });
});