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

//events - a super-basic Javascript (publish subscribe) pattern
// code from learntocodeacademy video

var events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function (eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data);
      });
    }
  },
};
