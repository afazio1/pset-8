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
      else if (gamemode === "hard" && go !== 5 && win === null) {
        //develop algorithm
        console.log("hard");
        let flag = false;
        let randomCorner = null;
        //if the player hasn't gone in a corner, go in a corner
        if ((index != 0 && index != 2 && index != 6 && index != 8) && round === 1){
          
          while (randomCorner === null) {
            randomCorner = Math.floor(Math.random() * Math.floor(5))
            switch (randomCorner) {
              case 1:
                randomCorner = 0;
                break;
              case 2:
                randomCorner = 2;
                break;
              case 3:
                randomCorner = 6;
                break;
              case 4:
              randomCorner = 8;
              break;
            }
          }

          board[randomCorner] = "O";
          squares[randomCorner].className = "o-animation";
          win = getWinner();
          console.log(randomCorner);
        }
        //if the player goes in a corner, then go in the middle
        else if ((index === 0 || index === 2 || index === 6 || index === 8 || index === 4) && round === 1) {
          board[4] = "O";
          squares[4].className = "o-animation";
        }
        else if (round === 2) {
          if (randomCorner === 0 && board[8] === "") {
            board[8] = "O";
            squares[8].className = "o-animation";
          }
          else if (randomCorner === 2 && board[6] === "") {
            board[6] = "O";
            squares[6].className = "o-animation";
          }
          else if (randomCorner === 8 && board[0] === "") {
            board[0] = "O";
            squares[0].className = "o-animation";
          }
          else if (randomCorner === 6 && board[2] === "") {
            board[2] = "O";
            squares[2].className = "o-animation";
          }
        }
        round++;
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

