"use strict";
import { moveElement } from "./move-elements.js";
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

function getElementOffset(element, target) {
  const coordinates = element.getBoundingClientRect();

  return {
    x: target.x - coordinates.x,
    y: target.y - coordinates.y
  };
}

async function ILikeRoMoveItMoveIt() {
  for (let [circle, target] of movementVectors) {
    await moveElement(circle, getElementOffset(circle, target));
    console.dir(
      `circle ${window
        .getComputedStyle(circle)
        .getPropertyValue("background-color")} is at target place`
    );
  }
  const movementPromises = [];
  movementVectors.forEach((target, circle) =>
    movementPromises.push(
      moveElement(circle, {
        x: 0,
        y: 0
      })
    )
  );
  await Promise.all(movementPromises);
  console.log("Circles' positions reset");
  movementPromises.length = 0;
  movementVectors.forEach((target, circle) =>
    movementPromises.push(moveElement(circle, getElementOffset(circle, target)))
  );
  await Promise.all(movementPromises); //Could have done it without await Promise.all,
  // the same visual effect, with only few milliseconds difference.
  console.log("All circles positioned at target");
}

ILikeRoMoveItMoveIt();
