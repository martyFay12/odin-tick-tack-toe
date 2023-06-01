let game = (function () {
  let currentPlayer = "X";
  let roundCount = 0;
  let gameMarks = ["X", "O"];
  let winnerBar = document.querySelector(".winner-bar");

  // subscribe to events
  events.on("playerPlayed", changeCurrentPlayer);
  events.on("playerPlayed", checkIfWinner);
  events.on("restart", restart);

  function restart() {
    currentPlayer = "X";
    roundCount = 0;
    events.emit("changedPlayer", currentPlayer);
  }
  function changeCurrentPlayer() {
    currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
    incrementRounds();
    events.emit("changedPlayer", currentPlayer);
  }
  function incrementRounds() {
    roundCount++;
    console.log(roundCount);
  }
  function checkIfWinner(currentArray) {
    if (roundCount < 5) return;
    for (gameMark of gameMarks) {
      let indices = getAllIndexes(currentArray, gameMark);
      if (winnerIndexPatternChecker(indices)) {
        return endGame(gameMark);
      }
    }
    if (roundCount === 9) return endGame("tie");
  }
  function getAllIndexes(arr, val) {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  }
  function winnerIndexPatternChecker(indices) {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    for (let winningCondition of winningConditions) {
      if (winningCondition.every((i) => indices.includes(i))) {
        return true;
      }
    }
    return false;
  }
  function endGame(gameMark) {
    if (gameMark === "tie") {
      return (winnerBar.textContent = "Tie game");
    }
    winnerBar.textContent = `${gameMark} wins!`;
    events.emit("gameOver");
  }
})();
