//Status of Free Code Camp exercises:
const myFreeCodeCamp = "https://www.freecodecamp.org/sudar";

//First task "Item array removal":

const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

// Write some code here
for (let i = 0; i < names.length; i++) {
  if (names[i] === nameToRemove) names.splice(i, 1);
}
// Code done

console.log(names);

//Second task "When will we be there??"

const travelInformation = {
  speed: 50,
  destinationDistance: 432,
  getTravelTime() {
    return `${Math.floor(
      this.destinationDistance / this.speed
    )} hours and ${Math.round(
      (this.destinationDistance / this.speed -
        Math.floor(this.destinationDistance / this.speed)) *
        60
    )} minutes`;
  },
};

//Decided to make an object method instead of a regular function.

const travelTime = travelInformation.getTravelTime();
console.log(travelTime);
