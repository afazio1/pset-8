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
let flag1 = false;
let round = 0;

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

function init(e) {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  max = 0;
  win = null;
  go = 0;
  if (gamemode !== "hard") {
    gamemode = "easy";
  }
  

  //resets the animation
  
  if (round > 0 || flag1 === true) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].className = "square";
    }
  }

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
      e.target.className = "x-animation";
      reset();
      go++;
      win = getWinner();

      if (gamemode === "easy" && go !== 5 && win === null) {
        max = 9;
        let flag = false;
        while (flag === false) {
          randomNum = Math.floor(Math.random() * Math.floor(max));
          if (board[randomNum] === "") {
          board[randomNum] = "O";
          squares[randomNum].className = "o-animation";
          flag = true;
          win = getWinner();
        }
      }  
    }
      else if (gamemode === "hard") {
        //develop algorithm
        console.log("hard");
        miniMax();


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
  round = 0;
  flag1 = true;
  init();

}

function hard(e) {
	e.target.className = "hard";
	easySpan.className = "";
  gamemode = "hard";
  flag1 = true;
  init();
}

function reset() {
  round++;
}

function miniMax() {
  let flag = false;
  let bestMoves = [];
  let possibleIndexes = [];
  let best;

    for (let i = 0; i < squares.length; i++) {

      if (board[i] === "X") {
        //pick a spot touching the index
        if (i === 0) {
          possibleIndexes.push(1, 3, 4);
        }
        else if (i === 1) {
          possibleIndexes.push(0, 2, 3, 4, 5);
        }
        else if (i === 2) {
          possibleIndexes.push(1, 4, 5);
        }
        else if (i === 3) {
          possibleIndexes.push(0, 1, 4, 6, 7);
        }
        else if (i === 4) {
          possibleIndexes.push(0, 1, 2, 3, 5, 6, 7, 8);
        }
        else if (i === 5) {
          possibleIndexes.push(2, 4, 7, 8);
        }
        else if (i === 6) {
          possibleIndexes.push(3, 4, 7);
        }
        else if (i === 7) {
          possibleIndexes.push(3, 4, 5, 6, 8);
        }
        else if (i === 8) {
          possibleIndexes.push(4, 5, 7);
        }
        

      }
    }
  }
