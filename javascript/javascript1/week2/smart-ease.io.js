const myFreeCodeCamp = "https://www.freecodecamp.org/sudar";

//firt taks code

function getFullname(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
const fullName1 = getFullname(
  prompt("please enter the first name:"),
  prompt("Please, enter the last name:")
);
alert(`The full name will be: ${fullName1}`);
const fullName2 = getFullname(
  prompt("please enter the first name:"),
  prompt("Please, enter the last name:")
);
alert(`The full name will be: ${fullName2}`);
