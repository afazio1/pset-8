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
let round;

///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const easySpan = document.getElementById("easy");
const hardSpan = document.getElementById("hard");
const hardText = document.querySelector("h3");

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
  round = 1;
  randomCorner = null;
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
      render();

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
      render();  
    }
      else if (gamemode === "hard" && go !== 5 && win === null) {
        let flag = false;
        //if the player hasn't gone in a corner, go in a corner
        if ((index != 0 && index != 2 && index != 6 && index != 8) && round === 2){
          
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
          round++;
        }
        //if the player goes in a corner, then go in the middle
        else if ((index === 0 || index === 2 || index === 6 || index === 8) && round === 2) {
          board[4] = "O";
          squares[4].className = "o-animation";
          round++;
        }
        //if the player is about to win on the second go, then block them
        if (round === 4) {
          let didSomething = false;
          preventWin();
          getWinner();
          render();
        
            //if player did not place 2nd X in a winning position, then go to a side middle spot
            
          }
          else if (round >= 6) {
            preventWin();
            win = getWinner();
            render();
          }
          }
        }
      
      render();
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
  hardText.className = "more-hidden";
  init();

}

function hard(e) {
	e.target.className = "hard";
	easySpan.className = "";
  gamemode = "hard";
  flag1 = true;
  init();
  hardText.className = "";

}

function reset() {
  round++;
}
function preventWin() {
  let didSomething = false;
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "X";
      squares[i].className = "hidden";
      possibleWinner = getWinner();
      if (possibleWinner == "X") {
        squares[i].className = "o-animation";
        board[i] = "O";
        didSomething = true;
        round++;
        break;
      } 
      else {
        board[i] = "";
        squares[i].className = "square";
      }
}
}
//if all the corners are free
if (didSomething === false && (board[0] === "" || board[2] === "" || board[6] === "" || board[8] === "") && round === 2) {

  didSomething = false;
  let valid = false;
  let randomCorner1 = null;

  if ((board[0] === "X" && board[8] === "X") || (board[2] === "X" && board[6] === "X")) {
    while (valid === false) {
    randomMiddleSide = Math.floor(Math.random() * Math.floor(5))
    switch (randomMiddleSide) {
    case 1:
      randomMiddleSide = 1;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
      }
      
      break;
    case 2:
      randomMiddleSide = 3;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
      }
     
      break;
    case 3:
      randomMiddleSide = 5;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
      }
     
      break;
    case 4:
      randomMiddleSide = 7;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
      }
      
      break;
  }
  }
  board[randomMiddleSide] = "O";
  squares[randomMiddleSide].className = "o-animation";
  }
  //go in a corner
  else {
    while (valid === false) {
    randomCorner1 = Math.floor(Math.random() * Math.floor(5))
    switch (randomCorner1) {
      case 1:
        randomCorner1 = 0;
        if (board[randomCorner1] === "") {
        valid = true;
        didSomething = true;
        round++;
      }
        break;
      case 2:
        randomCorner1 = 2;
        if (board[randomCorner1] === "") {
        valid = true;
        didSomething = true;
        round++;
      }
        break;
      case 3:
        randomCorner1 = 6;
        if (board[randomCorner1] === "") {
        valid = true;
        didSomething = true; 
        round++;
      }
        break;
      case 4:
      randomCorner1 = 8;
      if (board[randomCorner1] === "") {
        valid = true;
        didSomething = true;
        round++;
      }
      break;
    }
  }
  board[randomCorner1] = "O";
  squares[randomCorner1].className = "o-animation";
  }

  }

  else if (didSomething === false) {
    didSomething = false;
    valid = false;
    while (valid === false) {
    randomMiddleSide = Math.floor(Math.random() * Math.floor(5))
    switch (randomMiddleSide) {
    case 1:
      randomMiddleSide = 1;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
        round++;
      }
      
      break;
    case 2:
      randomMiddleSide = 3;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
        round++;
      }
      
      break;
    case 3:
      randomMiddleSide = 5;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
        round++;
      }
      
      break;
    case 4:
      randomMiddleSide = 7;
      if (board[randomMiddleSide] === "") {
        valid = true;
        didSomething = true;
        round++;
      }
      
      break;
  }
  }
  
  board[randomMiddleSide] = "O";
  squares[randomMiddleSide].className = "o-animation";
  } 

  else if (didSomething === false) {
    didSomething = false;
    while (flag === false) {
      randomNum = Math.floor(Math.random() * Math.floor(max));
      if (board[randomNum] === "") {
      board[randomNum] = "O";
      squares[randomNum].className = "o-animation";
      flag = true;
      round++;
    }
  }
}
}

