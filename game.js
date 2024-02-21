const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let currentIndex = 0;

const nextSequence = () => {
  // Increment level and change h1 level text
  level++;
  $("h1").text(`Level ${level}`);

  // Choose random color
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];

  // Add color to pattern
  gamePattern.push(randomChosenColor);

  // After 1 second animate and play the sound for the random button
  const button = $(`#${randomChosenColor}`);
  setTimeout(() => {
    button.fadeOut({ duration: 100 }).fadeIn({ duration: 100 });
    playSound(randomChosenColor);
  }, 1000);
};

const animatePress = (currentColor) => {
  const button = $(`#${currentColor}`);
  button.addClass("pressed");
  setTimeout(() => button.removeClass("pressed"), 100);
};

const playSound = (name) => {
  const audioElement = new Audio(`sounds/${name}.mp3`);
  audioElement.play();
};

const buttonClickHandler = (e) => {
  if (level === 0) {
    // If the level is 0, disallow the player from clicking the colored buttons
    return;
  } else {
    // Animate, play sound attributed to, and record the button the user pressed
    const userChosenColor = e.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);

    // Validate the button press in relation to the game pattern
    const result = checkIsPatternCorrect(currentIndex);

    // If the total pattern is correct, reset values and continue the game
    // Else if we're still checking the pattern increment the index
    // Else restart the game because the button clicked is incorrect
    if (result && currentIndex + 1 === gamePattern.length) {
      userClickedPattern = [];
      currentIndex = 0;
      nextSequence();
    } else if (result && currentIndex + 1 < gamePattern.length) {
      currentIndex++;
    } else {
      restartGame();
    }
  }
};

const checkIsPatternCorrect = (index) => {
  if (gamePattern[index] !== userClickedPattern[index]) return false;
  return true;
};

const gameStartHandler = () => {
  if (level === 0) {
    $("h1").text("Level 0");
    nextSequence();
  }
};

const restartGame = () => {
  // Animate text and play sound for game over
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");

  // Reset values for new game
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
};

$(".btn").click(buttonClickHandler);
$(document).keypress(gameStartHandler);
