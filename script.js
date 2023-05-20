// server side script, can be used to generate all possible sudoku solutions.
var fs = require("fs");
const { exit } = require("process");
const sudoku = [];

let TOTAL_SOLUTIONS;

if (process.argv.length < 3) {
    TOTAL_SOLUTIONS = 10;
} else {
    TOTAL_SOLUTIONS = parseInt(process.argv[2]);
}
console.log(`Generating ${TOTAL_SOLUTIONS} solutions`);
if (!fs.existsSync("./solutions/")) {
    fs.mkdirSync("./solutions/");
}
for (let i = 0; i < 9; i++) {
    const ar = [];
    for (let i = 0; i < 9; i++) {
        ar.push(0);
    }
    sudoku.push(ar);
}
ct = 0;
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
function solve() {
    if (reached) return;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] == 0) {
                for (let k = 1; k < 10; k++) {
                    if (validate(i, j, k)) {
                        sudoku[i][j] = k;
                        solve();
                        sudoku[i][j] = 0;
                    }
                }
                return;
            }
        }
    }
    let solution = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            solution += sudoku[i][j];
        }
    }
    fs.writeFileSync(`./solutions/sudoku_${ct++}.txt`, solution);

    if (ct === TOTAL_SOLUTIONS) {
        reached = true;
    }
}

solve();
console.log("Total sudoku solutions", ct);
