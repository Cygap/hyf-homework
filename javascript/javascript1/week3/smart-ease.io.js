//Status of Free Code Camp exercises:
const myFreeCodeCamp = "https://www.freecodecamp.org/sudar";

//First task "Item array removal":

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
