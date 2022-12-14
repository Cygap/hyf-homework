const myFreeCodeCamp = "https://www.freecodecamp.org/sudar";

//first taks code: Flight booking fullname function
//second task code: Formal fullname - code was added after the first commit, pls see changes
function getFullname(
  firstName = "*No name*",
  lastName = "*No last name*",
  useFormalName = false
) {
  if (firstName === "") firstName = "*No name*";
  if (lastName === "") lastName = "*No last name*";
  //had to perform another check for the case user does not cancel input,
  // which results in empty object and triggers the default, but
  // when the user just leaves input blanc and presses OK - this will return an empty string,
  // which does not trigger the default.
  if (useFormalName) {
    const sex = prompt(
      "Do you prefer to be called Lord or Lady (or any other title)? please enter below:"
    );
    let message = `Lord ${firstName} ${lastName}`;
    if (sex) message = `${sex} ${firstName} ${lastName}`;
    return message;
  }
  return `${firstName} ${lastName}`;
}
const fullName1 = getFullname(
  prompt("please enter the first name:"),
  prompt("Please, enter the last name:"),
  prompt("Would you like to be adressed formally? (")
);
alert(`The full name will be: ${fullName1}`);

const fullName2 = getFullname(prompt("please enter the first name:"));

alert(`The full name will be: ${fullName2}`);

//third task code: Event application
function getEventWeekday(inNDays) {
  const meetingDay = new Date();
  meetingDay.setDate(meetingDay.getDate() + inNDays);
  return meetingDay.toLocaleDateString("en-GB", { weekday: "long" });

  //Alternatevely we could use the following formula: (today.getDay() + inNDays % 7)
  //to know the meeting's weekday number in future,then populate array with
  //weekday names and choose the right index with the index numeration starting from 0;
  //However .toLocaleDateString seems more elegant way.
}
alert(
  `Your meeting will be on ${getEventWeekday(
    Number(prompt("Please, enter the number of days left before the meeting"))
  )}`
);

//Fourth task code: Weather wear
/*function shouldWear(temp) {
  return temp < -60
    ? "spacesuit"
    : temp < -30
    ? "Arctic Expedition & Polar Clothing"
    : temp < -10
    ? "Warm jacket and pair of good trousers"
    : temp < 0
    ? "Jacket and pants"
    : temp < 10
    ? " a parka, biker jacket or leather jacket"
    : temp < 20
    ? "Hoodie and jeans"
    : temp < 30
    ? "T-shirt and shorts"
    : temp < 50
    ? "thawb and kufiyah"
    : "spacesuite";
}*/
//Decided to rewrite conditions using if for better readability:

/*function shouldWear(temp) {
  if (temp < -60) {
    return "spacesuit";
  } else if (temp < -30) {
    return "Arctic Expedition & Polar Clothing";
  } else if (temp < -10) {
    return "Warm jacket and pair of good trousers";
  } else if (temp < 0) {
    return "Jacket and pants";
  } else if (temp < 10) {
    return "a parka, biker jacket or leather jacket";
  } else if (temp < 20) {
    return "Hoodie and jeans";
  } else if (temp < 30) {
    return "T-shirt and shorts";
  } else if (temp < 50) {
    return "thawb and kufiyah";
  } else {
    return "spacesuite";
  }
}*/

//Other variant to implement the task, using Switch/case

//Cool that it works without break - we may use return instead to break not only the switch block, but the function block itself.
function shouldWear(temp) {
  switch (true) {
    case temp < -60:
      return "spacesuit";
    case temp < -30:
      return "Arctic Expedition & Polar Clothing";
    case temp < -10:
      return "Warm jacket and pair of good trousers";
    case temp < 0:
      return "Jacket and pants";
    case temp < 10:
      return "a parka, biker jacket or leather jacket";
    case temp < 20:
      return "Hoodie and jeans";
    case temp < 30:
      return "T-shirt and shorts";
    case temp < 50:
      return "thawb and kufiyah";
    case temp >= 50:
      return "spacesuite";
    default:
      return "Strange temperature...";
  }
}

alert(
  `You probably will be better of wearing ${shouldWear(
    Number(prompt("Enter current tempreture in C:"))
  )}`
);

//Fifth task code: Student manager
const class23Students = [];
function addStudentToClass(studentName) {
  if (class23Students.indexOf(studentName) !== -1) {
    console.log(`Student ${studentName} is already in class23`);
  } else if (studentName == "") {
    console.log("The student's name can't be an empty string!");
  } else if (class23Students.length < 6 || studentName === "Queen") {
    class23Students.push(studentName);
  } else {
    console.log("Class 23 is full");
  }
}

function getNumberOfStudents() {
  return class23Students.length;
}

for (let i = 0; i < 4; i++) {
  addStudentToClass(`Student${i}`);
}
addStudentToClass("Student1");
addStudentToClass("");
addStudentToClass("Anakin Skywalker");
addStudentToClass("Darth Wader");
addStudentToClass("Queen");
addStudentToClass("Princess Amidala");

console.log(getNumberOfStudents());
console.log(class23Students);

//Sixth, bonus, task code: Candy helper
const candyPrice = {
  Sweet: 0.5,
  Chocolate: 0.7,
  Toffee: 1.1,
  "Chewing-gum": 0.03,
};
const boughtCandyPrices = [];
const amountToSpend = Math.floor(Math.random() * 100);
console.log(`You can buy candies for ${amountToSpend} credits`);

function addCandy(candyType, weight) {
  let currentPrice = Number((candyPrice[candyType] * weight).toFixed(3));
  boughtCandyPrices.push(currentPrice);
  console.log(
    `Your order is: ${boughtCandyPrices}. The last addition is ${weight} grams of ${candyType} for ${candyPrice[candyType]} per gram, in total we added: ${currentPrice} to your order`
  );
}

function canBuyMoreCandy(order, allowance) {
  if (getTotalPrice(order) < allowance) {
    console.log("You can buy more, so please do!");
    return true;
  } else {
    console.log("Enough candy for you!");
    return false;
  }
}

function getTotalPrice(order) {
  //did not understood, why the assignment asks to use while loop in stead of "for .. of .." loop
  let i = 0;
  let total = 0;
  while (order[i]) {
    total += order[i];
    i++;
    // Alternatively could have written: if (order.reduce((sum, current) => sum + current, 0) < allowance) { ... }
    // this probably would work faster then the function I wrote...
  }
  console.log(`You already have ordered for ${total} credits`);
  return total;
}

function getRandomProperty(obj) {
  const keys = Object.keys(obj);

  return keys[Math.floor(Math.random() * keys.length)];
}

while (canBuyMoreCandy(boughtCandyPrices, amountToSpend)) {
  addCandy(getRandomProperty(candyPrice), Math.floor(Math.random() * 50));
}
