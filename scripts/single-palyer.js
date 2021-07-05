
let startButt = document.getElementById("start");

let restartButt = document.getElementById("restart");

let gameStatus = document.getElementById("game-status");

let gameRunning = false;

let gameState = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

let gameSquares = document.getElementsByClassName("box");

let playerOneName = document.getElementById("playerOneName");

let gameBoard = document.getElementById("game-board");

let noColonOne;

let time = 0;

// function for starting the game
function gameStart() {
  // when function is called, remove functionality from start button
  startButt.disabled = true;
  // enable the reset button
  restartButt.disabled = false;
  // after the player has submitted their name in the form, take the name and slice off the colon
  noColonOne = playerOneName.innerText.slice(
    0,
    playerOneName.innerText.length - 1
  );
  // tell player it's their turn in the game board title using stored user name
  gameStatus.innerText = `${noColonOne}'s turn!`;
  // start the game for the timer
  gameRunning = true;
  // iterate over the htmlcollection and add a click event listener that calls the addPieces function to add the correct game piece to the board when clicked
  for (item of gameSquares) {
    item.addEventListener("click", addPieces);
  }
  // call the add timer function to start the game time
  startTimer();
}
// add an event listener to the start button for clicking and call the game start function when clicked
startButt.addEventListener("click", whoIs);
// function that alerts player to select a new square
function cantPlace() {
  alert("There's already a piece here! Please select another square...");
}
// add event listener to reset button that when clicked will clear board and reset timer
restartButt.addEventListener("click", (evt) => {
  // re enable the start button
  startButt.disabled = false;
  // disable the reset button
  restartButt.disabled = true;
  // stop the game from running so the timer stops
  gameRunning = false;
  // reset timer back to 0
  time = 0;
  // iterate over every square
  for (square of gameSquares) {
    // remove all event listeners that may be left
    square.removeEventListener("click", addPieces);
    square.removeEventListener("click", cantPlace);
    // remove all background colors by changing it to inherit it's parent's background color which is nothing
    square.style.backgroundColor = "inherit";
    // while the square has a child (img) remove the children until there are none
    while (square.firstChild) {
      square.removeChild(square.firstChild);
    }
    // reset the gameState array
    gameState = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  }
});
function whoIs() {
  // create a new form element
  let form = document.createElement("form");
  // change position of form to be absolute
  form.style.position = "absolute";
  //create input for player
  let playerOne = document.createElement("input");
  // type of input is text
  playerOne.type = "text";
  // add placeholder for the input
  playerOne.placeholder = "Player's name...";
  // create a submit button
  let submit = document.createElement("input");
  // type of submit button is submit for form functionality
  submit.type = "submit";
  // append all inputs to the form
  form.appendChild(playerOne);
  form.appendChild(submit);
  // append the form to the game page
  gameBoard.appendChild(form);
  // add an event listener to the form to use the info provided
  form.addEventListener("submit", (evt) => {
    // prevent default actions of form
    evt.preventDefault();
    // change the innerText of the player to be the value of their input
    playerOneName.innerText = playerOne.value + ":";
    // remove the form from the page
    form.remove();
    // call the start game function
    gameStart();
  });
}
// function that will be called in the start function to start the timer
function startTimer() {
  // grab the timer element
  let timer = document.getElementById("timer");
  // formatting for timer using ternary operation to decide seconds display
  // also assuming a game will never go over 10 minutes currently
  timer.innerText = `Time: 0${Math.floor(time / 60)}:${
    time % 60 < 10 ? "0" + (time % 60) : time % 60
  } (MM:SS)`;
  // while game is running (truthy)
  if (gameRunning) {
    // increment time by 1
    time += 1;
    // call again in 1 second to increase timer every second
    setTimeout(startTimer, 1000);
  }
}
// function that will add game pieces to the board when clicked
function addPieces(evt) {
  // if game is running and the title of the board say it's player one's turn
  if (gameStatus.textContent === `${noColonOne}'s turn!`) {
    // creat a new img element
    let greenClops = document.createElement("img");
    // change the source of the img element to the right image
    greenClops.src = "/images/green_cyclops.png";
    // set the height to be equal to the height of the box
    greenClops.style.height = "5vw";
    // add the element to the div so it displays on the page
    evt.target.appendChild(greenClops);
    // change the game title to reflect that it is player two's turn
    gameStatus.textContent = `Computer's turn!`;
    // grab the id from the element it's targeting, slice the number off the end, and subtract 1 to add to the right index of the array to checking later on
    gameState[evt.target.id.slice(3) - 1] = "green";
    // add a new event listener that will warn the player against selecting a square that's already taken
    evt.target.addEventListener("click", cantPlace);
    // remove the event listener from the the block so it cannot be clicked again
    evt.target.removeEventListener("click", addPieces);
    // call the winCondition function to check if player has won
    winCondition();
    // if the game isn't won with player's placement and game is still running
    if(gameRunning){
      // call computer placement function with a slight delay to make it look like computer is thinking for a sec
      setTimeout(computerPiece, 1000);
    }
  }
}
// function that will place a piece on the board randomly as long as there isn't a piece there
function computerPiece() {
  // generate a random number between 0 and 8 for indexing of the game board
  let randomIndex = Math.floor(Math.random() * 9)
  // check to see if there has been a game piece played on that square
  if(gameState[randomIndex] === "green" || gameState[randomIndex] === "red"){
    // if so run the function again until there isn't a piece at that index
    computerPiece();
    // if no piece has been played at that index
  } else {
    // create new img element
    let redClops = document.createElement("img");
    // assign the source to the right image
    redClops.src = "/images/red_cyclops.png";
    // set height of the image to that of the game cells
    redClops.style.height = "5vw";
    // add the element into the div to display on page
    gameSquares[randomIndex].appendChild(redClops);
    // change game status to be player's one's turn again
    gameStatus.textContent = `${noColonOne}'s turn!`;
    gameState[randomIndex] = "red";
    // add a new event listener that will warn the player against selecting a square that's already taken
    gameSquares[randomIndex].addEventListener("click", cantPlace);
    // remove the event listener from the the block so it cannot be clicked again
    gameSquares[randomIndex].removeEventListener("click", addPieces);
    // call the winCondition function to check if computer has won
    winCondition();
  }
}
// function the check all possible win conditions
function winCondition() {
  // check in the array gameState for a win condition on the top row of the board
  if (gameState[0] === gameState[1] && gameState[0] === gameState[2]) {
    // if the game piece at the start of the row is player one's, aka green, player one wins
    if (gameState[0] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
      // otherwise computer wins
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    // stop the game from working anymore
    gameRunning = false;
    // remove event listeners from each board square after game is over so they can't click after game is done
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    // change background color of the winning squares
    gameSquares[0].style.backgroundColor = "white";
    gameSquares[1].style.backgroundColor = "white";
    gameSquares[2].style.backgroundColor = "white";
    // check in the array for second row win conditions
  } else if (gameState[3] === gameState[4] && gameState[3] === gameState[5]) {
    if (gameState[3] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[3].style.backgroundColor = "white";
    gameSquares[4].style.backgroundColor = "white";
    gameSquares[5].style.backgroundColor = "white";
    // checking the array for a third row win condition
  } else if (gameState[6] === gameState[7] && gameState[6] === gameState[8]) {
    if (gameState[6] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[6].style.backgroundColor = "white";
    gameSquares[7].style.backgroundColor = "white";
    gameSquares[8].style.backgroundColor = "white";
    // checking array for column one win condition
  } else if (gameState[0] === gameState[3] && gameState[0] === gameState[6]) {
    if (gameState[0] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[0].style.backgroundColor = "white";
    gameSquares[3].style.backgroundColor = "white";
    gameSquares[6].style.backgroundColor = "white";
    // checking array for column two win condition
  } else if (gameState[1] === gameState[4] && gameState[1] === gameState[7]) {
    if (gameState[1] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[1].style.backgroundColor = "white";
    gameSquares[4].style.backgroundColor = "white";
    gameSquares[7].style.backgroundColor = "white";
    // checking array for column three win condition
  } else if (gameState[2] === gameState[5] && gameState[2] === gameState[8]) {
    if (gameState[2] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[2].style.backgroundColor = "white";
    gameSquares[5].style.backgroundColor = "white";
    gameSquares[8].style.backgroundColor = "white";
    // checking array for top left to bottom right diagonal win condition
  } else if (gameState[0] === gameState[4] && gameState[0] === gameState[8]) {
    if (gameState[0] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[0].style.backgroundColor = "white";
    gameSquares[4].style.backgroundColor = "white";
    gameSquares[8].style.backgroundColor = "white";
    // and finally checking the top right to bottom left diagonal win condition
  } else if (gameState[2] === gameState[4] && gameState[2] === gameState[6]) {
    if (gameState[2] === "green") {
      gameStatus.textContent = `${noColonOne} wins!`;
    } else {
      gameStatus.textContent = "Computer wins!";
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[2].style.backgroundColor = "white";
    gameSquares[4].style.backgroundColor = "white";
    gameSquares[6].style.backgroundColor = "white";
    // check to see if the gameState array has been completely replaced by the colors
  } else if (
    gameState.filter((color) => color === "green" || color === "red").length ===
    9
  ) {
    // stop the timer by changing the gameRunning to false
    gameRunning = false;
    // iterate over every square and remove any lingering event listeners
    for (item of gameSquares) {
      item.removeEventListener("click", cantPlace);
    }
    // call a draw
    gameStatus.textContent = "Draw! Try again!"
  }
}