/* START GAME
  make function that will grey out start button
*/

let startButt = document.getElementById("start");

let gameStatus = document.getElementById("game-status");

let gameRunning = false;

function gameStart() {
  startButt.disabled = true;
  gameStatus.textContent = "PLAYER ONE'S TURN!";
  gameRunning = true;
}

startButt.addEventListener("click", gameStart);

/* NO RULES
  inside start game function?
  assign an event listener to the squares on event 'click'
  on click take the text content of the the square and replace with cyclops image
  given that the active player is player, place the green cyclops
  if active player is player 2, place red cyclops
  */

let gameSquares = document.getElementsByClassName("box");








for (item of gameSquares) {
  item.addEventListener("click", (evt) => {
    if(gameRunning){
    if (gameStatus.textContent === "PLAYER ONE'S TURN!") {
      let greenClops = document.createElement("img");
      greenClops.src = "/images/green_cyclops.png";
      greenClops.height = "50";
      evt.target.appendChild(greenClops);
      gameStatus.textContent = "PLAYER TWO'S TURN!";
    } else {
      let redClops = document.createElement("img");
      redClops.src = "/images/red_cyclops.png";
      redClops.height = "50";
      evt.target.appendChild(redClops);
      gameStatus.textContent = "PLAYER ONE'S TURN!";
    }
  } else {
    alert("You must start the game first!");
  }
  });
}

/* RULES
  check that the box selected text content equals nothing, if so, place cyclops
  if there is text content in the selected box warn player and let them choose another spot
*/

/* WIN CONDITION
  given that the player has placed a cyclops
  check surrounding boxes for 3 in a row
  if placement was a winning square, make 3 cyclops that won bounce til a new game is started
*/
