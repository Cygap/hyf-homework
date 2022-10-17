const myFreeCodeCampUserName = "https://www.freecodecamp.org/sudar";

const yearOfBirth = Number(prompt("enter your year of birth"));
const yearFuture = Number(prompt("enter the year in a future"));
const age = yearFuture - yearOfBirth;
alert(`You will be ${age} years old in ${yearFuture}`);

const dogYearOfBirth = Number(prompt("enter your dog's year of birth"));
const dogYearFuture = Number(prompt("enter the year in a future"));
const shouldShowResultInDogYears = Boolean(
  prompt(
    "Enter 0 if you want ot calculate dog's age in human years. Enter any other value if you want it in dog-years:"
  )
);
let dogAge = dogYearFuture - dogYearOfBirth;
let dogYear = "human";
if (shouldShowResultInDogYears) {
  dogAge *= 7;
  dogYear = "dog";
}

alert(
  `Your dog will be ${dogAge}
    ${dogYear}
    years old in ${dogYearFuture}`
);

class House {
  constructor(gardenSizeInM2, houseWidth, houseHeight, houseDepth) {
    this.volumeInMeters = houseWidth * houseHeight * houseDepth;
    this.housePrice = this.volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
  }
}

const petersHouse = new House(
  Number(prompt("Peter's Garden area")),
  Number(prompt("Peter's House width")),
  Number(prompt("Peter's House height")),
  Number(prompt("Peter's House depth"))
);
const petersAskPrice = Number(
  prompt("What price does Peter pays for the house?")
);

const juliasHouse = new House(
  Number(prompt("Julia's Garden area")),
  Number(prompt("Julia's House width")),
  Number(prompt("Julia's House height")),
  Number(prompt("Julia's House depth"))
);
const juliasAskPrice = Number(
  prompt("What price does Julia pays for the house?")
);

if (petersHouse.housePrice < petersAskPrice) {
  alert(
    `Peter is paying too much, the real price is ${petersHouse.housePrice}`
  );
} else {
  alert(
    `Peter is paying a fair price , the real price is ${petersHouse.housePrice}`
  );
}

if (juliasHouse.housePrice < juliasAskPrice) {
  alert(
    `Julia is paying too much, the real price is ${juliasHouse.housePrice}`
  );
} else {
  alert(
    `Julia is paying a fair price, the real price is  ${juliasHouse.housePrice}`
  );
}

const firstWords = [
  "ragged",
  "medical",
  "pointless",
  "abashed",
  "aware",
  "uppity",
  "waiting",
  "auspicious",
  "greasy",
  "silky",
];
const secondWords = [
  "lady",
  "politics",
  "student",
  "measurement",
  "writer",
  "law",
  "tennis",
  "ability",
  "passenger",
  "difficulty",
];
let startupName = "";
let randomNumber = Math.floor(Math.random() * 10);
startupName += firstWords[randomNumber];
randomNumber = Math.floor(Math.random() * 10);
startupName += " " + secondWords[randomNumber];
alert(startupName);
