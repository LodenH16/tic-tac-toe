import { GridCellType } from "./CellStateHelpers";
// HELPERS FOR CHECKING ENDGAME

export interface WinState {
  gameOver: boolean;
  winner: string | null;
  winningRow: number[];
}

// consts / defaults
const winningHorizontalRows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const winningVerticalRows = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const winningDiagonalRows = [
  [0, 4, 8],
  [2, 4, 6],
];
export const possibleWinningRows = [
  ...winningHorizontalRows,
  ...winningVerticalRows,
  ...winningDiagonalRows,
];

const xWins = JSON.stringify(["x", "x", "x"]);
const oWins = JSON.stringify(["o", "o", "o"]);

// helper functions

export const makeDefaultWinState = (): WinState => {
  return { gameOver: false, winner: null, winningRow: [] };
};

// get values of cells that could possibly be winning rows
export const getLettersFromCells = (
  cellState: GridCellType[],
  indexesToGrab: number[]
) => {
  return indexesToGrab.map((i: number) => cellState[i].letter);
};

// compare row of cells for win state
export const compareRows = (cellRow: string[]) => {
  const stringifiedCellRow = JSON.stringify(cellRow);
  if (stringifiedCellRow === xWins) return "x";
  if (stringifiedCellRow === oWins) return "o";
  return null;
};

// check each possible winning row for win state
export const checkEndGame = (cellState: GridCellType[]): WinState => {
  let winState = makeDefaultWinState();

  // for each possible winning row of indexes...
  for (let possibleWinningRow of possibleWinningRows) {
    // ...assimilate the letters it corresponds to
    const cellRow: Array<string | null> = getLettersFromCells(
      cellState,
      possibleWinningRow
    );

    // if row's cells aren't filled don't bother checking it
    if (cellRow.includes(null)) continue;

    // compare row of letters to xWins and oWins
    const winner = compareRows(cellRow as string[]);

    // return win state if someone won
    if (winner) {
      winState.gameOver = true;
      winState.winner = winner;
      winState.winningRow = possibleWinningRow;
      // stop checking if someone wins
      break;
    }
  }
  // return winState
  return winState;
};
