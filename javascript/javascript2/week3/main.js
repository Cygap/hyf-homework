"use strict";
import ConfettiGenerator from "./confetti.js";
/**
 * Setting up the DOM elements, required to animate the game
 */
const startButton = document.getElementById("start");
const durationInput = document.getElementById("timer");
const playerOneField = document.getElementById("player-one");
const playerTwoField = document.getElementById("player-two");
let countDownId;
document.querySelector("form");
startButton.addEventListener("click", gameStart);
/**
 * Generates a random integer number between minimal and maximum values
 * @param {number} min - lower limit for the random number
 * @param {number} max - upper limit for the random number
 * @returns {number} random number >= min && <= max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Launches the game, sets up eventListeners and count-down timer
 * @param {event} e - click on the start button.
 */
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

/**
 * Setting up the elements for the bonus feature of the game
 */
const bombHint = document.getElementById("send-to-player");
const bomb = document.getElementById("bomb");
/**
 * Shows the count-down timer inside the start button.
 * Also displays the hint of how one plllayer can "bomb"(or benefit) the other.
 * @param {number} time - initial amount of milliseconds during which the game should last.
 */
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

/**
 * preparing elements to display the winner
 */
const confettiElement = document.getElementById("confetti-holder");
confettiElement.style.zIndex = "0";
playerOneField.style.zIndex = "10";
playerTwoField.style.zIndex = "10";

/**
 * Defines, which player won (or if there is draw). Hides "bomb" hint.
 * Calls function to render the decorations for the winning player.
 */
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

/**
 * Congratulates the winnig player and decorate the winner's div with confetti.
 * @param {element} winner - the div, containing the score of the winner,
 * or null in a case of draw.
 * @returns {undefined}
 */
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

/**
 * Changes relevant player's score in a current match depending on
 * the key pressed.
 * @param {event} e - keypress event by either player
 */

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
