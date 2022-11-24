const startButton = document.getElementById("start");
const durationInput = document.getElementById("timer");
const playerOneField = document.getElementById("player-one");
const playerTwoField = document.getElementById("player-two");
document.querySelector("form");
startButton.addEventListener("click", gameStart);
function gameStart(e) {
  e.preventDefault();
  const gameDuration = durationInput.value * 1000;
  if (gameDuration) {
    setTimeout(getWinner, gameDuration);
    window.addEventListener("keypress", addScore);
    playerOneField.score = 0;
    playerTwoField.score = 0;
  }
}
const confettiElement = document.getElementById("confetti-holder");
confettiElement.style.zIndex = "0";
playerOneField.style.zIndex = "10";
playerTwoField.style.zIndex = "10";
const playerOne = playerOneField.getBoundingClientRect();
const playerTwo = playerTwoField.getBoundingClientRect();
const confetti = confettiElement.getBoundingClientRect();

function getWinner() {
  window.removeEventListener("keypress", addScore);

  if (playerOneField.score === playerTwoField.score) {
    renderWinner(null);
  } else {
    playerOneField.score > playerTwoField.score
      ? renderWinner(playerOneField)
      : renderWinner(playerTwoField);
  }
}

function renderWinner(winner) {
  if (!winner) {
    alert("Draw!");
    return;
  }
  const coordinates = winner.getBoundingClientRect();
  confettiElement.style.left = coordinates.left + "px";
  confettiElement.style.top = coordinates.top + "px";
  confettiElement.style.height = coordinates.height + "px";
  confettiElement.style.width = coordinates.width + "px";
  winner.innerText = `Congratulations! You won with the score ${winner.score}!`;
  startButton.innerText = "Start new game!";
  const confettiSettings = {
    target: "confetti-holder",
    max: "80",
    size: "1",
    animate: true,
    props: ["circle", "square", "triangle", "line"],
    colors: [
      [165, 104, 246],
      [230, 61, 135],
      [0, 199, 228],
      [253, 214, 126]
    ],
    clock: "70",
    rotate: true,
    width: confettiElement.offsetWidth,
    height: confettiElement.offsetHeight,
    start_from_edge: true,
    respawn: true
  };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
  setTimeout(confetti.clear, 3000);
}

function addScore(e) {
  switch (e.code) {
    case "KeyS":
      playerOneField.score++;
      playerOneField.innerText = playerOneField.score;
      break;
    case "KeyL":
      playerTwoField.score++;
      playerTwoField.innerText = playerTwoField.score;
      break;
  }
}
