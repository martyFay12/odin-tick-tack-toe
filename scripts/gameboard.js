let gameboard = (function () {
  let boardBoxes = document.querySelectorAll(".board-box");

  // initialize game array to an array of empty strings of length 9
  let gameArray = [];
  for (let i = 0; i < 9; i++) gameArray.push("");

  render();
  boardBoxes.forEach((box) => box.addEventListener("click", addToArray));
  function render() {
    boardBoxes.forEach(
      (box) => (box.textContent = gameArray[parseInt(box.id) - 1])
    );
  }
  function addToArray() {
    gameArray[this.id - 1] = game.currentPlayer;
    events.emit("playerPlayed");
    render();
  }

  function getCurrentArray() {
    return gameArray;
  }

  return {
    getCurrentArray,
  };
})();
