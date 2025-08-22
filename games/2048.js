let grid;
let grid_new;
let score = 0;



function isGameWon() {
    for (let i = 0; i < 4 ; i++ ) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 2048) {
                return true;
            }
        }
    }

}

function isGameOver() {
    for (let i = 0; i < 4 ; i++ ) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                return false;
            }
            if (i !== 3 && grid[i][j] === grid[i +1][j]) {
                return false;
            }
            if (j !== 3 && grid[i][j] === grid[i][j+1]) {
                return false;
            }
        }
    }
    return true;
}


function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]; 
}

function setup() {
    var myCanvas = createCanvas(400, 400);
    myCanvas.parent("canvadiv");
    noLoop();
    grid = blankGrid();
    grid_new = blankGrid();
    addNumber();
    addNumber();
    updateCanvas();

}

function addNumber() {
    let options = [];
    for (let i = 0; i < 4 ; i++ ) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) { 
                options.push({
                    x: i,
                    y: j
                });
            
            }
        }
    }
    if (options.length > 0) {
        let spot = random(options);
        let r = random(1);
        grid[spot.x][spot.y] = r > 0.1 ? 2 : 4;
        grid_new[spot.x][spot.y] = 1;
    }
}

function compare (a,b) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++ ) {
           if (a[i][j] !== grid[i][j]) {
            return true;
           }
        }
    }
    return false;

}

function copyGrid(grid) {
    let extra = blankGrid();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++ ) {
            extra[i][j] = grid[i][j]
        }
    }
    return extra;

}

function flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid; 
}

function transposeGrid(grid, direction) {
    let newGrid = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (direction == 1) {
            newGrid[i][j] = grid[j][i];
        }   else {
            newGrid[j][i] = grid[i][j];
        }
        }
    }
    return newGrid;
}

// One "move"
function keyPressed() {
    let flipped = false;
    let rotated = false; 
    let played = true;
    switch(keyCode) {
        case DOWN_ARROW :
            // do nothing
            break;
        case UP_ARROW :
            grid = flipGrid(grid);
            flipped = true
            break;
        case RIGHT_ARROW :
            grid = transposeGrid(grid, 1); 
            rotated = true
            break;
        case LEFT_ARROW :
            grid = transposeGrid(grid, 1 ); 
            grid = flipGrid(grid);
            rotated = true;
            flipped = true;
            break;
        default:
            played = false;

    }

  

    if (played) {

        let past = copyGrid(grid);
        for (let i = 0;i<4; i++) {
            grid[i] = operate(grid[i]); 
        }
        let changed = compare(past, grid);
        if (flipped) {
            grid = flipGrid(grid);
        }
        if (rotated) {
            grid = transposeGrid(grid,  -1);
        }
        

        if (changed) {
            addNumber();
        }
        updateCanvas(); 

        let gameover = isGameOver();
        if (gameover) {
            console.log("GAME OVER");
            document.getElementById("result").innerHTML ="<h3> GAME OVER </h3>";
        }

        let gamewon = isGameWon();
        if (gamewon) {
            console.log("GAME WON");
            document.getElementById("result").innerHTML ="<h3> GAME WON </h3>";
        }
    }
}

function operate(row) {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row; 
}


function updateCanvas() {
    background (255);
    drawGrid();
    select('#score').html(score);
}

// making new array
function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr
}

// operating on array itself
function combine(row) {
    for (let i = 3; i >= 1; i-- ) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            score += row[i];
            row[i - 1] = 0;
            //break;
        }
    }
    return row; 
}


function drawGrid() {
    let w = 100;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++ ) {
            noFill();
            strokeWeight(10);
            let val = grid[i][j];
            let s = val.toString();
            if (grid_new [i][j] === 1) {
                //stroke (200, 0 , 200);
                stroke ("#bbada0")
                strokeWeight(10);
                (grid_new [i][j] = 0);
            }   else {
                strokeWeight (10)
                stroke ("#bbada0");
                
            }
            if (val != 0) {
                fill(colorsSizes[s].color);
            }   else {
                fill("#ccc0b3");
                //noFill();
            }

            rect(i * w, j * w, w, w, 5);
            if (grid[i][j] !==0 ) {
                textAlign(CENTER, CENTER);
                noStroke();
                fill(colorsSizes[s].fill);
                textSize(colorsSizes[s].size);
                text(val, i * w + w / 2, j * w + w / 2);
            }

        }
    } 
}