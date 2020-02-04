///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


///////////////////// APP STATE (VARIABLES) /////////////////////////

let board;
let turn;
let win;
let gamemode;
let max;
let go;





///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const easySpan = document.getElementById("easy");
const hardSpan = document.getElementById("hard");






///////////////////// EVENT LISTENERS ///////////////////////////////

window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("easy").onclick = easy;
document.getElementById("hard").onclick = hard;



///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  max = 0;
  win = null;
  go = 0;

  render(); 
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;    // writes an X or an O on board
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      console.log(turn);
      //turn = turn === "X" ? "O" : "X";
      go++;
      win = getWinner();
      //create an animation when an X or O is placed 
      if (gamemode === "easy" && go !== 5) {
        console.log("easy");
        max = 9;
        let flag = false;
        while (flag === false) {
          randomNum = Math.floor(Math.random() * Math.floor(max));
          if (board[randomNum] === "") {
          board[randomNum] = "O";
          flag = true;
          win = getWinner();
        }
      }  
    }
      else if (gamemode === "hard") {
        //develop algorithm
        console.log("hard");
      }
      
    

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}
function easy(e) {
	e.target.className = "easy";
	hardSpan.className = "";
  gamemode = "easy";
  init();

}

function hard(e) {
	e.target.className = "hard";
	easySpan.className = "";
  gamemode = "hard";
  init();
}
