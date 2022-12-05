"use strict";
import { getRandomInt } from "./move-elements.js";
const redTarget = { x: 20, y: 300 };
const blueTarget = { x: 400, y: 300 };
const greenTarget = { x: 400, y: 20 };

const redCircle = document.querySelector("ul.marks li:nth-child(1)");
const blueCircle = document.querySelector("ul.marks li:nth-child(2)");
const greenCircle = document.querySelector("ul.marks li:nth-child(3)");

const movementVectors = new Map([
  [redCircle, redTarget],
  [blueCircle, blueTarget],
  [greenCircle, greenTarget]
]);

console.dir();

function getElementOffset(element, target) {
  const coordinates = element.getBoundingClientRect();

  return { x: target.x - coordinates.left, y: target.y - coordinates.top };
}

let circles = movementVectors.entries();
let currentCircle = circles.next();

moveElement(
  currentCircle.value[0],
  getElementOffset(currentCircle.value[0], currentCircle.value[1])
)
  .then(() => {
    console.dir(
      `circle ${window
        .getComputedStyle(currentCircle.value[0])
        .getPropertyValue("background-color")} is at target place`
    );
    currentCircle = circles.next();
    return moveElement(
      currentCircle.value[0],
      getElementOffset(currentCircle.value[0], currentCircle.value[1])
    );
  })
  .then(() => {
    console.dir(
      `circle ${window
        .getComputedStyle(currentCircle.value[0])
        .getPropertyValue("background-color")} is at target place`
    );
    currentCircle = circles.next();
    return moveElement(
      currentCircle.value[0],
      getElementOffset(currentCircle.value[0], currentCircle.value[1])
    );
  })
  .then(() => {
    console.dir(
      `circle ${window
        .getComputedStyle(currentCircle.value[0])
        .getPropertyValue("background-color")} is at target place: x=${
        currentCircle.value[0].getBoundingClientRect().x
      } y=${currentCircle.value[0].getBoundingClientRect().y}`
    );
    console.dir(movementVectors);
  })
  .then(() => {
    const movementPromises = [];
    movementVectors.forEach((target, circle) =>
      movementPromises.push(
        moveElement(
          circle,
          getElementOffset(circle, {
            x: getRandomInt(0, window.innerWidth),
            y: getRandomInt(0, window.innerHeight)
          })
        )
      )
    );
    return Promise.all(movementPromises);
  })
  .then(() =>
    movementVectors.forEach((target, circle) => {
      circle.style.top = circle.getBoundingClientRect().top;
      circle.style.left = circle.getBoundingClientRect().left;
      moveElement(circle, getElementOffset(circle, target));
    })
  );

/*moveElement(circle, {
    x: getRandomInt(0, window.innerWidth),
    y: getRandomInt(0, window.innerHeight)
  });*/
/*
movementVectors.forEach((target, circle) =>
  moveElement(circle, getElementOffset(circle, target)).then(() =>
    console.dir(
      `circle ${window
        .getComputedStyle(circle)
        .getPropertyValue("background-color")} is at target place`
    )
  )
);*/
