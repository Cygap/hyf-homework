"use strict";

/**
 * inititalizing all the parameters
 */
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const timesPerSecond = 12;
let isDelayed = false;

/**
 * gets pseudorandom integer greater or equal to min and less or equal to max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * class description
 */
class Circle {
  /**
   * Creates a circle, destructures arguments into this class' properties
   * @param {number} x - horizontal coordinate of a circle
   * @param {number} y - vertical coordinate of a circle
   * @param {number} r - radius of a circle
   * @param {number} startAngle - angle of the arc where the drawing starts
   * @param {number} endAngle - angle of the arc where the drawing ends
   * @param {string} fillColor - CSS color
   */
  constructor(x, y, r, startAngle, endAngle, fillColor) {
    [this.x, this.y, this.r, this.startAngle, this.endAngle, this.fillColor] =
      arguments;
  }
  /**
   * Draws an instance of Circle. Requires global variable ctx.
   */
  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.startAngle, this.endAngle);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
  }
}

/**
 * Creates a new instance of Circle and calls it's .render() method
 * @param {object} - event object
 * @param {number} event.x - x coordinate of the event
 * @param {number} event.y - y coordinate of the event
 */
function renderCircle({ x, y }) {
  const circle = new Circle(
    x,
    y,
    getRandomInt(5, 200),
    0,
    2 * Math.PI,
    `rgb(
    ${getRandomInt(0, 255)},
    ${getRandomInt(0, 255)},
    ${getRandomInt(0, 255)})`
  );
  circle.render();
}

/**
 * adds event listener ot canvas, doesn't allow to renderCircle() more often that timesPerSecond.
 */
canvas.addEventListener("pointermove", (e) => {
  if (!isDelayed) {
    renderCircle(e);
    isDelayed = true;
    setTimeout(() => (isDelayed = false), 1000 / timesPerSecond);
  }
});
