var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

//checks if any key has been pressed before.
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence(){

  //Once nextSequence() is triggered, userClickedPattern resets to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);  //title changes to the current level.

  var randomNumber = Math. floor(Math. random() * 4);
  var randomChosenColour = buttonColours[randomNumber]; //random number between 0-3.
    
  gamePattern.push(randomChosenColour); // Add the new randomChosenColour to the end of the gamePattern.

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //Animate button.

  playSound(randomChosenColour); // Play sound according to color
}


$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id"); //The color that the user chose.

  userClickedPattern.push(userChosenColour); // Add the new userChosenColour to the end of the userClickedPattern.

  playSound(userChosenColour); // Play sound according to color the user chose.

  animatePress(userChosenColour); //Animate button.

  var index = userClickedPattern.length -1;
  checkAnswer(index) ;
} );


//function that plays audio.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function that animates user color by adding a class and removing it.
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//function that checks if the userClickedPattern is correct.
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //correct user answer

    if (userClickedPattern.length === gamePattern.length){ //checks if the pattern is complete.

      //Calls nextSequence.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else { 

    playSound("wrong");

    //change the background color
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 500);

    $("h1").text("Game Over, Press Any Key to Restart");  //title changes to game-over.

    startOver();
  }

}

//function that resets the game.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
