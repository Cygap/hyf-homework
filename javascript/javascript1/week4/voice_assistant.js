const user = {
  name: "",
  toDo: [],
};

function newName(command, name) {
  if (user.name === "") {
    console.log(`Nice to meet you, ${name}`);
  } else {
    console.log(
      `You told me, that your name was "${user.name}" \nMaybe you or I have mistaken... (you couldn't be lying to me....)\nCnahging your name to ${name}`
    );
  }
  user.name = name;
}

function findName(command, name) {
  if (user.name === "") {
    console.log("You haven't introduced yourself yet!\n");
    getReply(prompt("Please, introduce yourself:"));
  } else {
    console.log(`Your name is ${user.name}`);
  }
}

function addToDo(command, activity) {
  user.toDo.push(activity);
  console.log(`Added task "${activity}" to your todo list`);
}

function removeToDo(command, activity) {
  if (user.toDo.length) {
    const item = user.toDo.indexOf(activity);
    if (item === -1) {
      console.log(
        `Cannot delete anything, your todo doesn't have a task called: "${activity}"`
      );
    } else {
      console.log(
        `Removed "${user.toDo.splice(item, 1)}" task from your todo list`
      );
    }
  } else
    console.log("Cannot delete anything, your todo list is already empty!");
}

function displayToDo(command) {
  if (user.toDo.length) {
    console.log(`Your todo list:\n${user.toDo.join("\n")}`);
  } else
    console.log(
      "Good job! Your todo list is already empty! Everything is done!"
    );
}

function todayName() {
  const today = new Date();
  console.log(
    `Today is ${today.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`
  );
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
  alert(`Timer set for ${amount} ${typeOfTime}(s) milliseconds: ${ms}`);
  setTimeout(() => {
    alert("Time is up!");
  }, ms);
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
  [/(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/, "Calculator"],
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

// getReply("what is 2.25    *    -1.2");
getReply("Hi! my name is   Alex");
getReply("IS MY NAME alex?");
getReply("add pick kids up from school and kindergarden to my todo");
getReply("remove fishing from    my todO!");
getReply("What is on my todo?");
getReply("remove pick kids up from school and kindergarden from my todo");
getReply("remove fishing from    my todO!");
// getReply("Set my timer for 5 hours!");
getReply("Now my name is George");
getReply("What day is it today?");
getReply("Set a timer for 5 seconds");
