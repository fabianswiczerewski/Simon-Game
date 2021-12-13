var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
//FIRST KEYBOARD INPUT

$(document).on("keypress", function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//EVERY CLICK

$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//CHECKING ANSWERS PROVIDED BY USERS
//CHCECK LAST USER'S INPUT WITH LAST GENERATED ITEM
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    $("#level-title").text("Game Over, Press Any Key to Restart")

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    playSound("wrong");
    
    startOver();
  }
}

//RANDOM NUMBER AND BUTTON ANIMATION

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
}

//PLAYING SOUND

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//ANIMATING USERS CLICKS

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;
}
