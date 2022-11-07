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
    button.innerHTML = `${input.value} - The ${spiritAnimal}.`;
  } else {
    button.innerHTML = `Unknown warrior - The ${spiritAnimal}.`;
  }
}

button.onclick = renderSpiritAnimal;
input.onmouseover = renderSpiritAnimal;
input.oninput = renderSpiritAnimal;
