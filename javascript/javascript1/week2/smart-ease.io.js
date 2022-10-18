const myFreeCodeCamp = "https://www.freecodecamp.org/sudar";

//first taks code: Flight booking fullname function
//second task code: Formal fullname - code was added after the first commit, pls see changes
// function getFullname(
//   firstName = "*No name*",
//   lastName = "*No last name*",
//   useFormalName = false
// ) {
//   if (firstName === "") firstName = "*No name*";
//   if (lastName === "") lastName = "*No last name*";
//   //had to perform another check for the case user does not cancels input, which results in empty object and triggers the default, but when the user just leaves input blanc and presses OK - this will return an empty string, which does not trigger the default.
//   if (useFormalName) {
//     const sex = prompt(
//       "Do you prefer to be called Lord or Lady (or any other title)? please enter below:"
//     );
//     let message = `Lord ${firstName} ${lastName}`;
//     if (sex) message = `${sex} ${firstName} ${lastName}`;
//     return message;
//   }
//   return `${firstName} ${lastName}`;
// }
// const fullName1 = getFullname(
//   prompt("please enter the first name:"),
//   prompt("Please, enter the last name:"),
//   prompt("Would you like to be adressed formally? (")
// );
// alert(`The full name will be: ${fullName1}`);

// const fullName2 = getFullname(prompt("please enter the first name:"));

// alert(`The full name will be: ${fullName2}`);

//third task code: Event application
function getEventWeekday(inNDays) {
  const meetingDay = new Date();
  meetingDay.setDate(meetingDay.getDate() + inNDays);
  return meetingDay.toLocaleDateString("en-GB", { weekday: "long" });

  //Alternatevely we could use the following formula: (today.getDay() + inNDays % 7) to know the meeting's weekday number in future, then populate array with weekday names and choose the right index for the day name remembering to substract 1 from future day number to map with the index numeration starting from 0;
  //However .toLocaleDateString seems more elegant way.
}
alert(
  `Your meeting will be on ${getEventWeekday(
    Number(prompt("Please, enter the number of days left before the meeting"))
  )}`
);
