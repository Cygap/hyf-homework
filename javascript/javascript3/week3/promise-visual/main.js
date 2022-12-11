"use strict";
import { moveElement } from "./move-elements.js";

/**
 * Creating separate scope for all the variables
 */
{
  /**
   * Getting the elements, setting up the targets
   */
  const redTarget = { x: 20, y: 300 };
  const blueTarget = { x: 400, y: 300 };
  const greenTarget = { x: 400, y: 20 };

  const redCircle = document.querySelector("ul.marks li:nth-child(1)");
  const blueCircle = document.querySelector("ul.marks li:nth-child(2)");
  const greenCircle = document.querySelector("ul.marks li:nth-child(3)");

  /**
   * Using map for the element-target pair to iterate easily on them and to preserve the "bond"
   * between element and its target.
   */
  const movementVectors = new Map([
    [redCircle, redTarget],
    [blueCircle, blueTarget],
    [greenCircle, greenTarget]
  ]);

  /**
   * Determines x and y lengths of the offset of a given element relative to given target
   * @param {element} element - the element to move
   * @param {object} target
   * @returns {object} with the x and y values, which are difference between the element's and target's lerevant properties.
   */
  function getElementOffset(element, target) {
    const coordinates = element.getBoundingClientRect();
    return {
      x: target.x - coordinates.x,
      y: target.y - coordinates.y
    };
  }

  /**
   * Your task is to create two functions. translateOneByOne - Should translate the circles
   * one at a time from their random start position to their target see the target positions
   * below. Log something out after each element has been moved. translateAllAtOnce - Should
   * translate all the circles at the same time from their random start position to their target.
   * Log out something after all elements have been moved
   *
   * Decided to combine both functions in one ILikeRoMoveItMoveIt function, which initially moves
   * circles one by one, then resets their positions to initial state, and then moves all the circles
   * to their target positions at once.
   */
  async function ILikeRoMoveItMoveIt() {
    /** to await for each circle to move before moving the other we have to use for ... of loop,
     *because it appears that we cannot "await" inside .forEach() method even if the upper scope
     *function marked as async.
     */

    for (let [circle, target] of movementVectors) {
      await moveElement(circle, getElementOffset(circle, target));
      console.dir(
        `circle ${window
          .getComputedStyle(circle)
          .getPropertyValue("background-color")} is at target place`
      );
    }

    // using an Array to gather all promises and then pass them all to Promise.all();
    const movementPromises = [];
    movementVectors.forEach((target, circle) =>
      movementPromises.push(moveElement(circle, { x: 0, y: 0 }))
    );

    await Promise.all(movementPromises);
    console.log("Circles' positions reset");
    movementPromises.length = 0;

    movementVectors.forEach((target, circle) =>
      movementPromises.push(
        moveElement(circle, getElementOffset(circle, target))
      )
    );

    await Promise.all(movementPromises);

    /** Could have done it without await Promise.all, the same visual effect,
     * with only few milliseconds difference.
     */

    console.log("All circles positioned at target");
  }

  ILikeRoMoveItMoveIt();
}
