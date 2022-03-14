/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// what might the flow of the game be?
// X Start button to start the game?
// => Create rows & columns size for the players
// => click event handler
// => set & memary separate counting accumulator for player1 & player2
// => count 4 points (horiz, vert, or diag) to the win criteria
// => refresh the game

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push([0]);
    for (let j = 0; j < WIDTH; j++) {
      board[i][j] = null;
    }
  }
  //return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: append a row of WIDTH value on the very top above of the whole htmlBoard table for adding a piece to that column
  const top = document.createElement("tr"); //creating a row of the table
  top.setAttribute("id", "column-top"); // setting id of the tr to column-top
  top.addEventListener("click", handleClick); // adding a click event listener and call handleClick()

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td"); // creating a table data element * WIDTH amount
    headCell.setAttribute("id", x); // setting id of the td to x
    top.append(headCell); // displaying headCell under the top and appending the td to the tr (top)
  }
  htmlBoard.append(top); // displaying top and appending the tr (top) to htmlBoard

  // TODO: append the rows of WIDTH value and the columns of HEIGHT value to the htmlBoard table
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); // creating a table row (tr) * HEIGHT amount
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); // creating a table data (td) * WIDTH amount
      cell.setAttribute("id", `${y}-${x}`); // setting id of the td to `${y}-${x}`
      row.append(cell); // displaying cell and appending the cell to row
    }
    htmlBoard.append(row); // displaying row and appending the row to htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = 0; y < HEIGHT; y++) {
    if (board[y][x] === null) {
      console.log(y);
      console.log(document.getElementById(`${y}-${x}`));
      return y;
    }
    //console.log(document.getElementById(`${y}-${x}`));
    //return null; // This line will stop the for loop
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement("div");
  //div.setAttribute("class", "piece");
  //div.setAttribute("class", "p1");
  div.classList.add("piece", "player-drop", `p${currPlayer}`);

  // const cell = document.getElementById(`${y}-${x}`);
  // cell.append(div);

  document.querySelector("#board").rows[HEIGHT - y].cells[x].appendChild(div); // rows count from top to bottom or vise versa?
  //document.querySelector("#board").rows[HEIGHT - y].cells[x].append(div); //append or appendChild both works
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer; // record the cell you clicked is p1 or p2
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((cell) => cell.every(Boolean))) {
    // every(Boolean): return false when it is given null, true when it is given 1 or 2
    return endGame("It's a draw!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = 3 - currPlayer;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // list all win criteria of 4 cells in a row
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      // get the winner if any of the win criteria is true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
