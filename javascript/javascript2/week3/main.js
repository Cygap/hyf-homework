const startButton = document.getElementById("start");
const durationInput = document.getElementById("timer");
const playerOneField = document.getElementById("player-one");
const playerTwoField = document.getElementById("player-two");
let countDownId;
document.querySelector("form");
startButton.addEventListener("click", gameStart);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gameStart(e) {
  e.preventDefault();
  const gameDuration = durationInput.value * 1000;
  if (gameDuration) {
    setTimeout(getWinner, gameDuration);
    window.addEventListener("keypress", addScore);
    playerOneField.score = playerOneField.innerHTML = 0;
    playerTwoField.score = playerTwoField.innerHTML = 0;

    countDownId = setInterval(countDown, 10, gameDuration);
  }
}
const bombHint = document.getElementById("send-to-player");
const bomb = document.getElementById("bomb");

function countDown(time) {
  if (isNaN(Number(startButton.innerText))) {
    startButton.innerText = time / 1000;
    bombHint.style.display = "block";
  } else {
    startButton.innerText = (Number(startButton.innerText) - 0.01).toFixed(2);
    if ((Number(startButton.innerText) * 100) % 15 === 0) {
      const coordinates = startButton.getBoundingClientRect();
      bombHint.style.top = coordinates.bottom + 40 + "px";
      bombHint.style.left =
        coordinates.left +
        coordinates.width / 2 -
        bombHint.getBoundingClientRect().width / 2 -
        10 +
        "px";
      bomb.innerHTML = getRandomInt(-10, 10);
    }
  }
}

const confettiElement = document.getElementById("confetti-holder");
confettiElement.style.zIndex = "0";
playerOneField.style.zIndex = "10";
playerTwoField.style.zIndex = "10";

function getWinner() {
  window.removeEventListener("keypress", addScore);
  clearInterval(countDownId);
  bombHint.style.display = "none";
  if (playerOneField.score === playerTwoField.score) {
    renderWinner(null);
  } else {
    playerOneField.score > playerTwoField.score
      ? renderWinner(playerOneField)
      : renderWinner(playerTwoField);
  }
}

function renderWinner(winner) {
  startButton.innerText = "Start new game!";
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
    case "Digit1":
      playerTwoField.score += Number(bomb.innerHTML);
      playerTwoField.innerText = playerTwoField.score;
      break;
    case "Digit0":
      playerOneField.score += Number(bomb.innerHTML);
      playerOneField.innerText = playerOneField.score;
  }
}
