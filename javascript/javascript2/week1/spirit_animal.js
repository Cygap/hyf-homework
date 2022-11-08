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

function getSpiritAnimal(animals, spirits) {
  return `${animals[Math.floor(animals.length * Math.random())]} ${
    spirits[Math.floor(spirits.length * Math.random())]
  }`;
}

function renderSpiritAnimal() {
  const spiritAnimal = getSpiritAnimal(animals, spirits);
  if (input.value) {
    button.textContent = `${input.value} - The ${spiritAnimal}.`;
  } else {
    button.textContent = `Unknown warrior - The ${spiritAnimal}.`;
  }
}
function radioChange(event) {
  button.removeEventListener("click", renderSpiritAnimal);
  input.removeEventListener("mouseover", renderSpiritAnimal);
  input.removeEventListener("input", renderSpiritAnimal);
  console.dir(event.target.value);
  if (event.target.value === "click") {
    button.addEventListener(event.target.value, renderSpiritAnimal);
  } else {
    input.addEventListener(event.target.value, renderSpiritAnimal);
  }
}
const options = document.querySelectorAll("input[type='radio']");
for (let option of options) {
  option.addEventListener("change", radioChange);
}

button.addEventListener("click", renderSpiritAnimal);
