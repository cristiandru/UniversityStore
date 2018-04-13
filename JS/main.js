var mainText = $("#mainText");
var submitBtn = $("#submitBtn");
var fireHeading = $("#fireHeading");

var firebaseRef = firebase.database().ref();
var firebaseHeadingRef = firebaseRef.child("Heading");

firebaseHeadingRef.on('value', function(datasnapshot) {
  fireHeading.text(datasnapshot.val());
});

function submitClick() {
  var messageText = mainText.val();

  firebaseRef.push().set(messageText);
}

$(document).ready(function() {
  // $(".test").text("Ceva");
});