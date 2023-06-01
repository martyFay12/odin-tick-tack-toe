let game = (function () {
  let currentPlayer = "X";
  events.on("playerPlay", changeCurrentPlayer);

  function changeCurrentPlayer() {
    currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  }
  return {
    currentPlayer,
  };
})();
