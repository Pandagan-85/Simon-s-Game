var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
//è una variabile per capire se il gioco è iniziato o no, in modo tale da chiamare nextSequence()s solo alla prima pressione di tasto
var started = false;

//controllo ogni tasto pressato, e se il gioco non è cominciato lo inizializzo
$(document).keypress(function (event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

//raccoglie in un array i tasti cliccati dall'utente
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});
//aggiungere il suono tramite id o stringa array per richiamare il file corrispettivo
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//aggiungere animazione al press del button
function animatePress(currentColour) {
  var clickedButton = $("#" + currentColour);
  $(clickedButton).addClass("pressed");

  setTimeout(function () {
    $(clickedButton).removeClass("pressed");
  }, 100);
}

//controlla l'ultima risposta dell'utente con quella del sistema
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //alert("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      //userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOVer();
  }
}
//resetto tutti i valori a quelli iniziali
function startOVer() {
  level = 0;
  gamePattern = [];
  started = false;
}
