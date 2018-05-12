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