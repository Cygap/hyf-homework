const user = {
  name: "",
  toDo: {},
};

function newName(command, name) {
  console.log(
    `This is the newName function with matched pattern ${command} and a username = ${name}`
  );
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
const assistant = new Map([
  [/my\s+name\s+is\s+(\w+)/i, newName],
  [/is\s+my\s+name\s*(\w+)?/i, "Find name"],
  [/Add\s+((\w+\s+)+)to\s+my\s+todo/i, "todo add command!"],
  [/Remove\s+((\w+\s+)+)from\s+my\s+todo/i, "todo remove command!"],
  [/What\s+is\s+on\s+my\s+todo/i, "display todo!"],
  ["What day is it today?", "There is a command!"],
  [
    /timer\s+for\s+(\d+(?:\.\d+)?)\s*(hour(?:s)?|minute(?:s)?|second(?:s)?)/i,
    "timer command!",
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
    //
    // return assistant[key](command);
    // }
  }
  if (!knownCommand) console.log("Command not known :(");
}

// getReply("what is 2.25    *    -1.2");
getReply("Hi! my name is   Alex");
// getReply("IS MY NAME alex?");
// getReply("remove sfishing from    my todO!");
// getReply("Set my timer for 5 hours!");
getReply("Now my name is George");
