/*1. Programming Basics
Make a for loop that logs out even numbers from 10 - 40.
However, if the number is divisible by 3 it should log to the console "This is divisible
by 3"
If it's divisible by 5 it should log "This is divisibleby 5"
If it's divisible by both 3 and 5 it should log "Jackpot!"
Hint: use the modulo operator (%) to figure out if two numbers are divisible. Make
sure the remainder is 0.*/
console.log("Task one:");
for (let i = 10; i <= 40; i += 2) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log(`${i}\nJacpot!`);
  } else if (i % 3 === 0) {
    console.log(`${i}\nthis is divisible by 3`);
  } else if (i % 5 === 0) {
    console.log(`${i}\nthis is divisible by 5`);
  } else {
    console.log(i);
  }
}

/*2. DOM manipulation
Using JavaScript, create a button and add it to the html (the document).
When the button is clicked:
-Insert an h1 tag with the text “This is an h1 tag”*/
console.log("\nTask two - see the page contents,\nnothing should be logged...");
const buttonEl = document.createElement("button");
buttonEl.innerText = "Click me!";
document.body.append(buttonEl);
buttonEl.addEventListener("click", () => {
  const headerEl = document.createElement("h1");
  buttonEl.before(headerEl);
  headerEl.innerText = "This is an h1 tag";
});

/*
3. Async API calls
Make an API call using the Fetch API. Make use of the following API:
https://reqres.in/api/users
Display the email of the first three users in the DOM*/
async function getUsers(url, n) {
  try {
    const response = await fetch(url);
    if (response.status < 200 || response.status > 299) {
      throw new Error("couldn't fetch users");
    }
    const users = await response.json();
    console.log("\nTask three (async):");
    console.dir(users);
    console.log(`the emails of first ${n} of the requested users are:`);
    for (let i = 0; i < n; i++) {
      console.log(users.data[i].email);
    }
  } catch (error) {
    console.log("Error!" + error.message);
  }
}

getUsers("https://reqres.in/api/users", 3);
/*
4. Class (optional)
Create a class called Product. The constructor should have 2 parameters called price
and name. It should have 1 method calledlogProductthat should log: 'NAME is PRICE
kr'*/

console.log("\nTask four:");
class Product {
  constructor(price, name) {
    this.price = price;
    this.name = name;
  }
  logProduct() {
    console.log(`${this.name} is ${this.price}`);
  }
}
const iPhone = new Product(6000, "Iphone 13 mini 128 GB");
console.dir(iPhone);
iPhone.logProduct();
