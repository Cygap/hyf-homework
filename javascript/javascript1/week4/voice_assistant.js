const user = {
  name: "",
  toDo: [],
};

function newName(command, name) {
  let result = "";
  if (user.name === "") {
    result = `Nice to meet you, ${name}`;
  } else {
    result = `You told me, that your name was "${user.name}" \nMaybe you or I have mistaken... (you couldn't be lying to me....)\nCnahging your name to ${name}`;
  }
  user.name = name;
  return result;
}

function findName(command, name) {
  if (user.name === "") {
    alert("You haven't introduced yourself yet!\n");
    return getReply(prompt("Please, introduce yourself:"));
  } else {
    return `Your name is ${user.name}`;
  }
}

function addToDo(command, activity) {
  user.toDo.push(activity);
  return `Added task "${activity}" to your todo list`;
}

function removeToDo(command, activity) {
  if (user.toDo.length) {
    const item = user.toDo.indexOf(activity);
    if (item === -1) {
      return `Cannot delete anything, your todo doesn't have a task called: "${activity}"`;
    } else {
      return `Removed "${user.toDo.splice(item, 1)}" task from your todo list`;
    }
  } else return "Cannot delete anything, your todo list is already empty!";
}

function displayToDo(command) {
  if (user.toDo.length) {
    return `Your todo list:\n${user.toDo.join("\n")}`;
  } else
    return "Good job! Your todo list is already empty! Everything is done!";
}

function todayName() {
  const today = new Date();
  return `Today is ${today.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;
}

function timer(command, amount, typeOfTime) {
  let ms = 1000;
  switch (typeOfTime) {
    case "hour":
    case "hours":
      ms *= 60 * 60 * amount;
      break;
    case "minute":
    case "minutes":
      ms *= 60 * amount;
      break;
    case "second":
    case "seconds":
      ms *= amount;
  }

  setTimeout(() => {
    alert("Time is up!");
  }, ms);
  return `Timer set for ${amount} ${typeOfTime}(s) milliseconds: ${ms}`;
}

function calc(command, a, operator, b) {
  let result = 0;
  switch (operator) {
    case "-":
      result = a - b;
      break;
    case "+":
      result = a + b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
  }

  return `${command} is ${result}`;
  /*do not use eval(command), because I've read somewhere that it is on the dark side of the Force.
  console.log(`${command} is ${eval(command)}`);*/
}

function getWeather() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "af35d9bda9msh1d5d601753355fcp1d5ca1jsnc37e78a50099",
      "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
    },
  };

  fetch(
    "https://yahoo-weather5.p.rapidapi.com/weather?location=Copenhagen&format=json&u=c",
    options
  )
    .then((response) => response.json())
    .then((response) =>
      console.log(
        `Ah... weather... So, today's weather in Copenhagen is ${response.current_observation.condition.text} and the temperature is ${response.current_observation.condition.temperature} degrees C`
      )
    )
    .catch((err) => console.error(err));
  return "The weather... let me check..."; //Cannot figure out, how to adapt Promises mechanics to logging Promise results to console...
}

const assistant = new Map([
  [/my\s+name\s+is\s+(\w+)/i, newName],
  [/is\s+my\s+name\s*(\w+)?/i, findName],
  [/Add\s+((\w+\s+)*\w+)\s+to\s+my\s+todo/i, addToDo],
  [/Remove\s+((\w+\s+)*\w+\b)\s+from\s+my\s+todo/i, removeToDo],
  [/What\s+is\s+on\s+my\s+todo/i, displayToDo],
  [/What\s+day\s+is\s+it\s+today/i, todayName],
  [
    /timer\s+for\s+(\d+(?:\.\d+)?)\s*(hour(?:s)?|minute(?:s)?|second(?:s)?)/i,
    timer,
  ],
  [/(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/, calc],
  [/weather/i, getWeather], //Additional feature - today's weather, fetching from YahooWeather.
]);

function getReply(command) {
  let knownCommand = false;

  for (let [key, reply] of assistant) {
    if (typeof key === "object" && key.test(command)) {
      knownCommand = true;
      return reply(...command.match(key));
    }
  }
  if (!knownCommand) console.log("Command not known :(");
}

console.log(getReply("Hi! my name is   Alex"));

console.log(getReply("IS MY NAME alex?"));
console.log(
  getReply("add pick kids up from school and kindergarden to my todo")
);
console.log(getReply("remove fishing from    my todO!"));
console.log(getReply("What is on my todo?"));
console.log(
  getReply("remove pick kids up from school and kindergarden from my todo")
);
console.log(getReply("remove fishing from    my todO!"));

console.log(getReply("Now my name is George"));
console.log(getReply("What day is it today?"));
console.log(getReply("Set a timer for 5 seconds"));
console.log(getReply("what is 2.25    *    -1.2"));

console.log(getReply("What is the weather like?"));
