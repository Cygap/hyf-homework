// 1. Warmup
setTimeout(() => console.log("Called after 2.5 seconds"), 2500);

function customAlertDelay(delay, stringToLog) {
  setTimeout(() => console.log(stringToLog), delay * 1000);
}

customAlertDelay(5, "This string is logged after 5 seconds");
customAlertDelay(3, "This string is logged after 3 seconds");

document
  .getElementById("delayed-alert")
  .addEventListener("click", (e) =>
    customAlertDelay(4, "This string is logged after 4 seconds")
  );

const earthLogger = () => console.log("Earth");
const saturnLogger = () => console.log("Saturn");

function planetLogFunction(logger) {
  logger();
}

planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);

let script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQKWxWUcyoZgMmTA50PtbWdZ_GGme3NeY&callback=initMap";
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function () {
  // JS API is loaded and available
  document.getElementById("coordinates").before(locationButton);
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

const locationButton = document.createElement("button");
locationButton.setAttribute("id", "location-log");
locationButton.addEventListener("click", renderCoordinates);
locationButton.innerText = "Show your location";

let map;
function renderCoordinates() {
  const coordinates = document.getElementById("coordinates");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      coordinates.innerText = `latitude ${position.coords.latitude}, longtitude ${position.coords.longitude}`;
      map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 12,
      });
    },
    () =>
      (coordinates.innerText = `don't have your permission to read location`)
  );
}

function runAfterDelay(delay, callback) {
  setTimeout(() => callback(), delay * 1000);
}

runAfterDelay(4, function () {
  console.log("should be logged after 4 seconds");
});

window.addEventListener("dblclick", (e) =>
  console.log(`Double click at X: ${e.x} Y: ${e.y}`)
);

function jockeCreator(shouldTellFunnyJoke, logFunnyJoke, logBadJoke) {
  if (shouldTellFunnyJoke) {
    logFunnyJoke();
  } else {
    logBadJoke();
  }
}

function logBadJoke() {
  console.log("How do you count cows?\nWith a cowculator.");
}

function logFunnyJoke() {
  console.log(
    "What’s the best thing about Switzerland?\nI don’t know, but the flag is a big plus."
  );
}

jockeCreator(true, logFunnyJoke, logBadJoke);
jockeCreator(false, logFunnyJoke, logBadJoke);

// 2. Function as a variable

const fun1 = () => console.log("function 1");
const fun2 = () => console.log("function 2");
const fun3 = () => console.log("function 3");

const arrayOfFunctions = [fun1, fun2, fun3];

arrayOfFunctions.forEach((functionToCall) => functionToCall());

const functionAsAVariable = () =>
  console.log(
    "This is a function statement, the variable has a reference to the function now and can be used after the statement."
  );
function declaredFunction() {
  console.log(
    "This is function declaration. We can use it even before it is declared! Cool, isn't it?"
  );
}

const objectWithFunctionAsAKeyValue = {
  "here the value is a fuction": () =>
    console.log(
      "I am the function as a value of an object key with so long a name... "
    ),
};

objectWithFunctionAsAKeyValue["here the value is a fuction"]();
