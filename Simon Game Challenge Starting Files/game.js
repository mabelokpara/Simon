
//array containing the button colors
var buttonColors = ["red","blue","green","yellow"];

//empty array to hold game pattern
var gamePattern = [];

// empty array to store click patterns
var userClickedPattern = [];

var started = false;

var level = 0;

//detect if button is clicked
$(".btn").click(function() {
  //stores the id of the button that was clicked
  var userChosenColor = $(this).attr("id");

  //adds chosen colors to the userClickedPattern array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});


//function to generate a random number betweenn 0 and 3.
function nextSequence() {
  userClickedPattern = [];
  //increases the level by 1
  level++;
  //displays the level the user is currently at
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  //push random color intern gamePattern array
  gamePattern.push(randomChosenColor);

  // animates the randomly chosen color
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColor);
}

//function to play the sound that matches the button color
function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

//function to animate keypress
function animatePress(currentColor) {
  //adds the css class "pressed"
  $("#" + currentColor).addClass("pressed");

  //removes the "pressed" class after 100 miliseconds
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//function to check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 100);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

//detect when keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

//function to start the game Over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
