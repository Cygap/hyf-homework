const assistant = new Map([
  ["Hello my name is", "There is a command!"],
  ["What is my name", "There is a command!"],
  ["Add fishing to my todo", "There is a command!"],
  ["Add singing in the shower to my todo", "There is a command!"],
  ["Remove fishing from my todo", "There is a command!"],
  ["What is on my todo?", "There is a command!"],
  ["What day is it today?", "There is a command!"],
  ["what is ", "There is a command!"],
  ["Set a timer for ", "There is a command!"],
]);
const user = {
  name: "",
  toDo: {},
};
function getReply(command) {
  let knownCommand = false;

  for (let [key, reply] of assistant) {
    if (command.includes(key)) {
      console.log(`Key is "${key}"; value is "${reply}"`);

      knownCommand = true;
      // return assistant[key](command);
    }
  }
  if (!knownCommand) console.log("Command not known :(");
}

getReply("what is 2 * 2");
