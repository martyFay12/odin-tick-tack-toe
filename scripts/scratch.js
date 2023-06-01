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

winnerIndexPatternChecker([0, 4, 8, 3, 6]);
winnerIndexPatternChecker([0, 4, 8]);

winnerIndexPatternChecker([2, 4, 6]);
winnerIndexPatternChecker([0]);

winnerIndexPatternChecker([]);
