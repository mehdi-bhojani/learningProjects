const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const AvailablePaths = [hat, hole, fieldCharacter];

class Field {
  constructor(array) {
    this.array = array;
  }
  generateField() {
    let x = prompt('Enter X size:');
    let y = prompt('Enter Y Size:');
    this.array = [];

    for (let i = 0; i < x; i++) {
      this.array.push([]);
      for (let j = 0; j < y; j++) {
        this.array[i][j] = AvailablePaths[Math.floor(Math.random() * AvailablePaths.length)];
      }
    }
    this.array[0][0] = pathCharacter;
    return this.array;
  }

  printArray() {
    for (const row of this.array) {
      console.log(row.join(''));
    }
  }

  nextMove() {
    this.printArray();
    let x = prompt('Enter next position in x-axis:');
    let y = prompt('Enter next position in y-axis:');
    this.game(x, y);
  }

  game(x, y) {
    if (x < 0 || x >= this.array.length || y < 0 || y >= this.array[0].length) {
      console.log("You're out of bounds, try entering a new position.");
      this.nextMove();
      return;
    }

    if (this.array[x][y] === hat) {
      console.log("Congrats! You found the hat.");
      return;
    }
    if (this.array[x][y] === hole) {
      console.log('OMG! You fell in a hole.');
      return;
    }

    this.array[x][y] = pathCharacter;
    this.nextMove();
  }
}

const field = new Field();
field.array = field.generateField();
field.nextMove();
