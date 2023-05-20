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

const randomRow = 0;
for (let i = 0; i < 9; i++) {
    while (
        sudoku[randomRow].filter((e) => e == sudoku[randomRow][i]).length !=
            1 ||
        sudoku[randomRow][i] == 0
    ) {
        sudoku[randomRow][i] = Math.floor(Math.random() * 10);
    }
}

sudokuDiv = document.getElementById("sudoku");
sudokuDiv.style["font-size"] = "x-large";

// initialize the UI grid
for (let i = 0; i < 9; i++) {
    rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    for (let j = 0; j < 9; j++) {
        newDiv = document.createElement("div");
        newDiv.innerText = sudoku[i][j];
        newDiv.style["padding"] = "8px 16px";
        newDiv.id = ids[i][j];
        if ((i + 1) % 3 == 0 && i != 8) {
            newDiv.style["border-bottom"] = "1px solid";
        }

        if ((j + 1) % 3 == 0 && j != 8) {
            newDiv.style["border-right"] = "1px solid";
        }
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
let reached = false;
let ct = 1;
function solve() {
    if (reached) return;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] == 0) {
                for (let k = 1; k < 10; k++) {
                    if (validate(i, j, k)) {
                        sudoku[i][j] = k;
                        if (!reached) {
                            setTimeout(() => {
                                document.getElementById(
                                    i.toString() + j.toString()
                                ).innerHTML = k;
                                document.getElementById(
                                    i.toString() + j.toString()
                                ).style.backgroundColor = "#00FF00";
                            }, ct * 10);
                        }
                        ct++;
                        solve();
                        if (!reached) {
                            setTimeout(() => {
                                document.getElementById(
                                    i.toString() + j.toString()
                                ).innerHTML = 0;
                                document.getElementById(
                                    i.toString() + j.toString()
                                ).style.backgroundColor = "#FF0000";
                            }, ct * 10);
                        }
                        ct++;
                        // document.getElementById(
                        //     i.toString() + j.toString()
                        // ).innerHTML = 0;
                        sudoku[i][j] = 0;
                    }
                }
                return;
            }
        }
    }
    reached = true;
}

function sleep(ms) {
    var start = new Date().getTime(),
        expire = start + ms;
    while (new Date().getTime() < expire) {}
    return;
}

solve();
