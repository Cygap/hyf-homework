const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const counter = document.getElementById("counter");
button1.addEventListener("click", increment);
button2.addEventListener("click", increment);

function increment(e) {
  if (counter.innerText) {
    counter.innerText = Number(counter.innerText) + 1;
  } else {
    counter.innerText = 0;
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
  const averageCoordinates = {};
  averageCoordinates.averageX =
    coordinates.reduce((acc, curr) => {
      acc.x = acc.x + curr.x;
      return acc;
    }).x / coordinates.length;
  averageCoordinates.averageY =
    coordinates.reduce((acc, curr) => {
      acc.y += curr.y;
      return acc;
    }).y / coordinates.length;

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
