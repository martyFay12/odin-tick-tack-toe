let gameboard = (function () {
  let boardBoxes = document.querySelectorAll(".board-box");
  let currentPlayerH1 = document.querySelector(".current-player");
  let restartButton = document.querySelector(".restart");
  let currentPlayer = "X";
  let gameArray = [];
  for (let i = 0; i < 9; i++) gameArray.push("");

  // set up pubsub events.
  events.on("changedPlayer", render);
  events.on("gameOver", disableAllBoxes);

  // add event listeners
  boardBoxes.forEach((box) => box.addEventListener("click", addToArray));
  restartButton.addEventListener("click", restart);

  render();

  function restart() {
    gameArray = [];
    for (let i = 0; i < 9; i++) gameArray.push("");
    render();
    boardBoxes.forEach((box) => box.addEventListener("click", addToArray));
    events.emit("restart");
  }
  function render(player) {
    if (player) {
      currentPlayerH1.textContent = `Current player: ${player}`;
      currentPlayer = player;
    }
    boardBoxes.forEach(
      (box) => (box.textContent = gameArray[parseInt(box.id) - 1])
    );
  }
  function addToArray() {
    gameArray[this.id - 1] = currentPlayer;
    render();
    this.removeEventListener("click", addToArray);
    this.classList.remove("playable");
    events.emit("playerPlayed", gameArray);
  }

  function disableAllBoxes() {
    boardBoxes.forEach((box) => {
      box.classList.remove("playable");
      box.removeEventListener("click", addToArray);
    });
  }

  function getCurrentArray() {
    return gameArray;
  }

  return {
    getCurrentArray,
  };
})();
