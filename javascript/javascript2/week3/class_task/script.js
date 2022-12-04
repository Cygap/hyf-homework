const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const counter = document.getElementById("counter");
button1.addEventListener("click", increment);
button2.addEventListener("click", increment);
let count = 0;
function increment(e) {
  if (counter.innerText) {
    counter.innerText = ++count;
  } else {
    counter.innerText = count = 0;
  }
}

const delayClicker = document.getElementById("delay-clicker");

delayClicker.addEventListener("click", () =>
  setTimeout(() => console.log("Logged in a 3 seconds"), 3000)
);

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});
window.addEventListener("pointerup", (e) => {
  console.log(e.x, e.y);
});

const coordinates = [];
const trackMouse = (e) => coordinates.push({ x: e.x, y: e.y });
window.addEventListener("pointermove", trackMouse);

const intervalId = setInterval(calculateAverage, 5000);

function calculateAverage() {
  const averageCoordinates = coordinates.reduce((acc, curr) => {
    acc.x = acc.x + curr.x;
    acc.y = acc.y + curr.y;
    return acc;
  });
  averageCoordinates.x /= coordinates.length;
  averageCoordinates.y /= coordinates.length;
  console.dir(coordinates);
  console.dir(averageCoordinates);
  counter.innerText = `average Coordinates = ${JSON.stringify(
    averageCoordinates
  )}`;
  averageCoordinates.length = 0;
}

const stopTracking = document.getElementById("stop-tracking");
stopTracking.addEventListener("click", stop);
function stop(e) {
  window.removeEventListener("pointermove", trackMouse);
  clearInterval(intervalId);
}
