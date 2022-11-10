// Game of life

const fieldSizeX = 7,
  fieldSizeY = 7;

class LifeCell {
  constructor() {
    this.value = Number(Math.random().toFixed(0));

    this.lives = this.value;
  }
  update() {
    this.value = this.lives;
  }
}

//Populate initial field
let field = new Array(fieldSizeY);
for (let j = 0; j < fieldSizeY; j++) {
  field[j] = new Array(fieldSizeX);
  for (let i = 0; i < fieldSizeX; i++) {
    field[j][i] = new LifeCell();
  }
}

function createVisualField(field) {
  let result = "";
  for (let j = 0; j < field.length; j++) {
    for (let i = 0; i < field[j].length; i++) {
      field[j][i].update();
      result += field[j][i].value + " ";
    }

    result += "\n";
  }
  return result;
}
console.log(`Initial field:\n${createVisualField(field)}`);

while (confirm("Next step?")) {
  let neighbours;
  for (let j = 0; j < field.length; j++) {
    for (let i = 0; i < field[j].length; i++) {
      neighbours = 0;
      for (
        let x = i === 0 ? 0 : i - 1;
        x <= (i + 1 > field.length - 1 ? field.length - 1 : i + 1);
        x++
      ) {
        for (
          let y = j === 0 ? 0 : j - 1;
          y <= (j + 1 > field[i].length - 1 ? field[i].length - 1 : j + 1);
          y++
        ) {
          neighbours += field[y][x].value;
        }
      }

      neighbours -= field[j][i].value;

      if (field[j][i].value) {
        if (neighbours > 3 || neighbours < 2) field[j][i].lives = 0;
      } else {
        if (neighbours === 3) {
          field[j][i].lives = 1;
        }
      }
    }
  }
  console.log(`Next step field:\n${createVisualField(field)}`);
}
