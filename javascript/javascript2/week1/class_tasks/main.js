"use strict";

const myButton = document.createElement("button");
myButton.innerText = "Click me";

myButton.addEventListener("click", alertRender);
document.body.append(myButton);
function alertRender(e) {
  myButton.innerText = "Button clicked!";
}

/*const myDiv = document.createElement("div");
myDiv.innerText = "Some text";
myDiv.addEventListener("pointermove", renderDiv);
function renderDiv(e) {
  e.target.innerText = `X: ${e.clientX} Y: ${e.clientY}`;

  //   console.dir(e);
}
document.body.append(myDiv); */

const someDishes = ["pancakes", "potatoes", "pizza", "soup"];
const dishList = document.querySelector("ul");
for (let dish of someDishes) {
  const newDish = document.createElement("li");
  newDish.innerText = dish;
  dishList.append(newDish);
}
const form = document.createElement("form");
form.id = "checkFavourite";
const input = document.createElement("input");
const submit = document.createElement("button");
submit.setAttribute("type", "submit");
submit.innerText = "Submit!";
form.append(input, submit);
document.body.append(form);

form.addEventListener("submit", catchSubmit);

function catchSubmit(e) {
  e.preventDefault();
  const newDish = document.createElement("li");
  console.dir(e);
  someDishes.push((newDish.innerText = input.value));
  dishList.append(newDish);
}

const podcasts = [
  {
    name: "The mystery om of Johan Klausen Varbourg",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Tips about dogs with small legs",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "You, me, we and us",
    imageUrl: "https://picsum.photos/536/354",
  },
  {
    name: "Breakfast news - Dinner edition",
  },
];

const podcastList = document.createElement("ul");

for (let podcast of podcasts) {
  const podcastItem = document.createElement("li");
  const podcastName = document.createElement("h2");
  podcastName.innerText = podcast.name;
  podcastItem.append(podcastName);
  const podcastImg = document.createElement("img");
  podcastImg.src = podcast.imageUrl ? podcast.imageUrl : "";
  podcastItem.append(podcastImg);
  podcastList.append(podcastItem);
}
document.body.append(podcastList);

function imageAppend(imgSource, element) {
  const image = document.createElement("img");
  image.src = imgSource;
  element.append(image);
}
imageAppend("https://picsum.photos/536/357", document.querySelector("body"));

const darkModeToggle = document.createElement("button");
darkModeToggle.innerText = "Toggle dark mode on/off";
document.body.prepend(darkModeToggle);
darkModeToggle.addEventListener("click", toggleDarkMode);
const darkModeCheckbox = document.querySelector(".switch");
darkModeCheckbox.addEventListener("change", toggleDarkMode);
function toggleDarkMode(e) {
  document.body.style.backgroundColor =
    document.body.style.backgroundColor === "black" ? "white" : "black";
  document.body.style.color =
    document.body.style.color === "white" ? "black" : "white";
  const buttons = document.querySelectorAll("button");
  for (let button of buttons) {
    // console.dir(button);
    button.style.backgroundColor =
      button.style.backgroundColor === "rgb(240, 240, 240)"
        ? "black"
        : "rgb(240, 240, 240)";
    button.style.color =
      button.style.color === "black" ? "rgb(240, 240, 240)" : "black";
  }
}
