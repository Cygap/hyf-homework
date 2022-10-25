//Status of Free Code Camp exercises:
const myFreeCodeCamp = "https://www.freecodecamp.org/sudar";

//First task "Item array removal":
console.log("________ First task ____________");
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
console.log("________ Second task ____________");

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

//Third task "Series duration of my life"
console.log("________ Third task ____________");

const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
  {
    title: "Babylon 5",
    days: 3,
    hours: 10,
    minutes: 30,
  },
];

function calculatePercentOfLife(movie) {
  movie.percentOfLife = Number(
    (
      ((movie.days * 24 * 60 + movie.hours * 60 + movie.minutes) /
        (80 *
          (365 +
            80 /
              4) /*have to add this to account for the average number of leap years in one's life*/ *
          24 *
          60)) *
      100
    ).toFixed(3)
  );
  return movie.percentOfLife;
}

function logOutSeriesText() {
  let resultText = "";
  let totalPercent = 0;
  for (const movie of seriesDurations) {
    resultText += `${movie.title} took ${calculatePercentOfLife(
      movie
    )}% of my Life \n`;
    totalPercent += movie.percentOfLife;
  }

  resultText += `\nIn total that is ${totalPercent.toFixed(3)}% of my life`;
  console.log(resultText);
}
logOutSeriesText();

//Fourth task "NOnoN0nOYes (Note taking app)"
console.log("________ Fourth task ____________");
const notes = [];

function saveNote(content, id) {
  notes.push({ id: id, content: content });
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

console.log(notes);

function getNote(id) {
  for (const note of notes) {
    if (note.id === id) {
      return note;
    }
  }
  return "Please, enter a valid ID";
}

const firstNote = getNote(1);
console.log(firstNote);

function logOutNotesFormatted() {
  for (const note of notes) {
    console.log(
      `The note with id: ${note.id}, has the following note text: ${note.content}\n`
    );
  }
}

logOutNotesFormatted();

//Unique feature: find a note whose content contains a user provided string:

function findNotes(lookupValue) {
  let resultText = `We have found your following notes, which contain provided string "${lookupValue}":\n`;
  const foundNotes = [];
  for (const note of notes) {
    if (note.content.toLowerCase().includes(lookupValue.toLowerCase())) {
      resultText += `ID: ${note.id} with the content: "${note.content}"\n`;
      foundNotes.push(note);
    }
  }
  if (
    resultText ===
    `We have found your following notes, which contain provided string "${lookupValue}":\n`
  ) {
    resultText = `No notes were found containing string "${lookupValue}" ... please try different string`;
  }
  console.log(resultText);
  return foundNotes;
}

findNotes("gRoC");

//Fifth task "CactusIO-interactive (Smart phone usage app)"
console.log("________ Fifth task ____________");

const activities = [];
const activityLimit = 90;

/*Extra feature: date parser. Checks the custom format provided by the assignment condition "DD/MM-YY", 
otherwise parses the date in usual format and if not, then puts current date to the date property of an object */
function parseDate(dateStr) {
  let date;

  if (typeof dateStr === "string") {
    const yearDelimiter = dateStr.indexOf("-");
    const monthDelimiter = dateStr.indexOf("/");
    if (yearDelimiter > -1 && monthDelimiter > -1) {
      date = new Date(
        20 + dateStr.substring(yearDelimiter + 1),
        Number(dateStr.substring(monthDelimiter + 1, yearDelimiter) - 1),
        Number(dateStr.substring(0, monthDelimiter))
      );
    } else if (!isNaN(Date.parse(dateStr))) {
      date = new Date(Date.parse(dateStr));
    }
  }

  if (!(date instanceof Date) || isNaN(date)) {
    console.log("Wrong string format as date. Using today's date instead");
    date = new Date();
  }

  return date;
}

function addActivity(appName, timeSpent, date = new Date()) {
  activities.push({
    date: parseDate(date),
    activity: appName,
    duration: timeSpent,
  });
}

function getTotalActivityDuration(activitiesToCalculate) {
  for (const activity of activitiesToCalculate) {
  }
}

function showStatus(date = new Date()) {
  let total = 0;
  let counter = 0;
  date = parseDate(date);

  total = activities.reduce((result, activity) => {
    if (
      activity.date.getFullYear() === date.getFullYear() &&
      activity.date.getMonth() === date.getMonth() &&
      activity.date.getDate() === date.getDate()
    ) {
      counter++;
      return result + activity.duration;
    }
    return result;
  }, 0);

  if (activities.length > 0) {
    console.log(
      `For the ${date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })} you have added ${counter} activities for a total amount of ${total} min. of usage`
    );
  } else {
    console.log(
      "You have not added anything.\n Add some activities before calling showStatus!"
    );
  }
  if (total > activityLimit) {
    console.log("You have reached your limit, no more smartphoning for you!");
  }
}

addActivity("Youtube", 30, "kdsjjfakjas fkldsjg j");
addActivity("GitHub", 120);
console.log(activities);

showStatus();
addActivity("Youtube", 40, "23/10-22");
showStatus("23/10-22");
addActivity("Facebook", 20, "24/10-22");
addActivity("Slack", 11);
showStatus("24 Oct 2022");
console.log(activities);

//last task of fifth assignment - function to find the findMaxDurationActivity () - ?
function findMaxDurationActivity() {
  return activities.reduce((result, activity) =>
    result.duration < activity.duration ? activity : result
  );
}

console.log(
  `Here is the activity with the maximal duration: ${JSON.stringify(
    findMaxDurationActivity()
  )}`
);
