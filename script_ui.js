const sudoku = [];
const ids = [];

// initialize sudoku and ids
for (let i = 0; i < 9; i++) {
  const row = [];
  const idRow = [];
  for (let j = 0; j < 9; j++) {
    row.push(0);
    idRow.push(i.toString() + j.toString());
  }
  sudoku.push(row);
  ids.push(idRow);
}

sudokuDiv = document.getElementById("sudoku");
sudokuDiv.style["font-size"] = "x-large";

// initialize the UI grid
for (let i = 0; i < 9; i++) {
  rowDiv = document.createElement("div");
  rowDiv.style.display = "flex";
  for (let j = 0; j < 9; j++) {
    newDiv = document.createElement("div");
    // newDiv.innerText = sudoku[i][j];
    newDiv.style["padding"] = "8px 16px";
    newDiv.className = "sudoku-square";
    newDiv.id = ids[i][j];
    if ((i + 1) % 3 == 0 && i != 8) {
      newDiv.style["border-bottom"] = "2px solid";
    }

    if ((j + 1) % 3 == 0 && j != 8) {
      newDiv.style["border-right"] = "2px solid";
    }
    newDiv.onclick = () => {
      document.getElementById(i.toString() + j.toString()).style[
        "background-color"
      ] = "cadetblue";
    };
    rowDiv.appendChild(newDiv);
  }
  sudokuDiv.appendChild(rowDiv);
}

// sudoku solver

function validate(i, j, val) {
  for (let k = 0; k < 9; k++) {
    if (sudoku[i][k] == val) {
      return false;
    }
    if (sudoku[k][j] == val) {
      return false;
    }
  }
  let x = Math.floor(i / 3) * 3;
  let y = Math.floor(j / 3) * 3;

  for (let k = x; k < x + 3; k++) {
    for (let l = y; l < y + 3; l++) {
      if (sudoku[k][l] == val) {
        return false;
      }
    }
  }
  return true;
}
let reached;
let currentSolution;
function resetSudoku() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      sudoku[i][j] = 0;
    }
  }
}
function generateSolution() {
  // randomize one of the row
  resetSudoku();
  const randomRow = Math.floor(Math.random() * 9);
  for (let i = 0; i < 9; i++) {
    while (
      sudoku[randomRow].filter((e) => e == sudoku[randomRow][i]).length != 1 ||
      sudoku[randomRow][i] == 0
    ) {
      sudoku[randomRow][i] = Math.floor(Math.random() * 10);
    }
  }
  reached = false;
  solve();
}
function solve() {
  if (reached) return;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] == 0) {
        for (let k = 1; k < 10; k++) {
          if (validate(i, j, k)) {
            sudoku[i][j] = k;
            this.solve();
            sudoku[i][j] = 0;
          }
        }
        return;
      }
    }
  }
  reached = true;
  // add some random values into the grid
  currentSolution = JSON.parse(JSON.stringify(sudoku));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(i.toString() + j.toString()).innerText = "";
    }
  }
  for (let i = 0; i < 20; i++) {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    document.getElementById(x.toString() + y.toString()).innerText =
      sudoku[x][y];
  }
}

function updateSolved() {
  console.log(currentSolution);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(i.toString() + j.toString()).innerText =
        currentSolution[i][j];
    }
  }
}

document.getElementById("new").onclick = generateSolution;
document.getElementById("solve").onclick = updateSolved;

generateSolution();
