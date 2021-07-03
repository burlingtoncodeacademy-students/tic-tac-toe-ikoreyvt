// grab the start button
let startButt = document.getElementById("start");
// take the game board title to manipulate later
let gameStatus = document.getElementById("game-status");
// game is initially not running
let gameRunning = false;
// initialize an array to represent the 9 game squares with different values
let gameState = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
// grab the html collection of all the div boxes by class name
let gameSquares = document.getElementsByClassName("box");
// grab the name of player one
let playerOneName = document.getElementById("playerOneName");
// grab name of player two
let playerTwoName = document.getElementById("playerTwoName");
// function for starting the game
function gameStart() {
  // when function is called, remove functionality from start button
  startButt.disabled = true;
  // grab the player's names without the colons tagged on
  playerOneName.innerText = playerOneName.innerText.slice(0, (playerOneName.innerText.length -1));
  playerTwoName.innerText = playerTwoName.innerText.slice(0, (playerTwoName.innerText.length -1));
  // tell player one it's their turn in the game board title using stored user name
  gameStatus.innerText = `${playerOneName.innerText}'s turn!`;
  // start the game
  gameRunning = true;
  // iterate over the htmlcollection and add a click event listener that calls the addPieces function to add the correct game pieces to the board when clicked
  for (item of gameSquares) {
    item.addEventListener("click", addPieces);
  }
}
// add an event listener to the start button for clicking and call the game start function when clicked
startButt.addEventListener("click", whoIs);
// function that alerts player to select a new square
function cantPlace() {
  alert("There's already a piece here! Please select another square...");
}
// function that will be called to create a form and ask players for their names
function whoIs() {
  // create a new form element
  let form = document.createElement("form");
  // change position of form to be absolute
  form.style.position = "absolute";
  //create inputs for player one
  let playerOne = document.createElement("input");
  // type of input is text
  playerOne.type = "text";
  // add placeholder for the input
  playerOne.placeholder = "Player one's name...";
  // creat player two input
  let playerTwo = document.createElement("input");
  // type of input is text
  playerTwo.type = "text";
  // placeholder text for player two
  playerTwo.placeholder = "Player two's name...";
  // create a submit button
  let submit = document.createElement("input");
  // type of submit button is submit for form functionality
  submit.type = "submit";
  // append all inputs to the form
  form.appendChild(playerOne);
  form.appendChild(playerTwo);
  form.appendChild(submit);
  // grab the game board from the page
  let gameBoard = document.getElementById("game-board");
  // append the form to the game page
  gameBoard.appendChild(form);
  // add an event listener to the form to use the info provided
  form.addEventListener("submit", (evt) => {
    // prevent default actions of form
    evt.preventDefault();
    // change the innerText of each player to be the value of their respective inputs
    playerOneName.innerText = playerOne.value + ":";
    playerTwoName.innerText = playerTwo.value + ":";
    // remove the form from the page
    form.remove();
    // call the start game function
    gameStart();
  });
}
// function that will add game pieces to the board when clicked
function addPieces(evt) {
  // if game is running and the title of the board say it's player one's turn
  if (gameStatus.textContent === `${playerOneName.innerText}'s turn!`) {
    // creat a new img element
    let greenClops = document.createElement("img");
    // change the source of the img element to the right image
    greenClops.src = "/images/green_cyclops.png";
    // set the height to be equal to the height of the box
    greenClops.style.height = "5vw";
    // add the element to the div so it displays on the page
    evt.target.appendChild(greenClops);
    // change the game title to reflect that it is player two's turn
    gameStatus.textContent = `${playerTwoName.innerText}'s turn!`;
    // grab the id from the element it's targeting, slice the number off the end, and subtract 1 to add to the right index of the array to checking later on
    gameState[evt.target.id.slice(3) - 1] = "green";
    // add a new event listener that will warn the player against selecting a square that's already taken
    evt.target.addEventListener("click", cantPlace);
    // remove the event listener from the the block so it cannot be clicked again
    evt.target.removeEventListener("click", addPieces);
    // call the winCondition function to check if player has won
    winCondition();
    // if game status is not player one's turn, then it's player two's turn obviously
  } else {
    // create new img element
    let redClops = document.createElement("img");
    // assign the source to the right image
    redClops.src = "/images/red_cyclops.png";
    // set height of the image to that of the game cells
    redClops.style.height = "5vw";
    // add the element into the div to display on page
    evt.target.appendChild(redClops);
    // change game status to be player's one's turn again
    gameStatus.textContent = `${playerOneName.innerText}'s turn!`;
    // grab the id from the element it's targeting, slice the number off the end, and subtract 1 to add to the right index of the array to checking later on
    gameState[evt.target.id.slice(3) - 1] = "red";
    // add a new event listener that will warn the player against selecting a square that's already taken
    evt.target.addEventListener("click", cantPlace);
    // remove event listen from element so they cannot click again
    evt.target.removeEventListener("click", addPieces);

    // call winCondition function to check any if any of the win conditions have been met
    winCondition();
  }
}
// function the check all possible win conditions
function winCondition() {
  // check in the array gameState for a win condition on the top row of the board
  if (gameState[0] === gameState[1] && gameState[0] === gameState[2]) {
    // if the game piece at the start of the row is player one's, aka green, player one wins
    if (gameState[0] === "green") {
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
      // otherwise player two wins
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
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
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
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
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
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
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
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
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
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
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
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
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
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
      gameStatus.textContent = `${playerOneName.innerText} wins!`;
    } else {
      gameStatus.textContent = `${playerTwoName.innerText} wins!`;
    }
    gameRunning = false;
    for (item of gameSquares) {
      item.removeEventListener("click", addPieces);
      item.removeEventListener("click", cantPlace);
    }
    gameSquares[2].style.backgroundColor = "white";
    gameSquares[4].style.backgroundColor = "white";
    gameSquares[6].style.backgroundColor = "white";
  }
}
