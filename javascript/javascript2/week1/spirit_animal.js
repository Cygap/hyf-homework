input = document.getElementById("name");
const button = document.querySelector("button");

const animals = [
  "maniacal",
  "frightened",
  "standing",
  "ruddy",
  "horrible",
  "astonishing",
  "juicy",
  "thoughtful",
  "yellow",
  "robust",
  "obsequious",
  "uppity",
  "better",
  "utopian",
  "defective",
  "courageous",
  "illustrious",
  "silent",
  "aloof",
  "square",
];
const spirits = [
  "mink",
  "lion",
  "frog",
  "gnu",
  "lemur",
  "fox",
  "peccary",
  "parrot",
  "gazelle",
  "prairie dog",
  "hippopotamus",
  "jaguar",
  "wolverine",
  "burro",
  "hamster",
];
/**
 * Generates a random pair of words to describe Spirit Animal
 * @param {array} animals - an array of animal kinds to choose from
 * @param {array} spirits - an array of animal characteristics (qualities) to choose from
 * @returns {string} string of randomly generated pairs of words
 */
function getSpiritAnimal(animals, spirits) {
  return `${animals[Math.floor(animals.length * Math.random())]} ${
    spirits[Math.floor(spirits.length * Math.random())]
  }`;
}
/**
 * Displays the text inside the button, checks, whether username was entered.
 */
function renderSpiritAnimal() {
  const spiritAnimal = getSpiritAnimal(animals, spirits);
  if (input.value) {
    button.textContent = `${input.value} - The ${spiritAnimal}.`;
  } else {
    button.textContent = `Unknown warrior - The ${spiritAnimal}.`;
  }
}

/**
 * Removes previousely added listeners, to allow for radio button mechanics to work properly.
 * then adds new event listener depending on the option selected and its value.
 * @param {event} event
 */
function radioChange(event) {
  button.removeEventListener("click", renderSpiritAnimal);
  input.removeEventListener("pointermove", renderSpiritAnimal);
  input.removeEventListener("input", renderSpiritAnimal);

  if (event.target.value === "click") {
    button.addEventListener(event.target.value, renderSpiritAnimal);
  } else {
    input.addEventListener(event.target.value, renderSpiritAnimal);
  }
}
const optionField = document.querySelector("fieldset[name='update']");
optionField.addEventListener("change", radioChange);

button.addEventListener("click", renderSpiritAnimal);
