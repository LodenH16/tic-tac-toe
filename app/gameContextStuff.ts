import { createContext } from "react";

const x = "x";
const o = "o";

export const xStartsFirst = [x, o, x, o, x, o, x, o, x];
export const oStartsFirst = [o, x, o, x, o, x, o, x, o];

// Helpers for game state
export interface GameStateType {
  startingTurn: string;
  currentTurn: number;
  gameOver: boolean;
  isUserTurn: boolean;
}

export const makeDefaultGameState = (
  startingTurn: string = "x",
  userStartFirst: boolean = true
) => {
  return {
    startingTurn,
    currentTurn: 0,
    gameOver: false,
    isUserTurn: userStartFirst,
  };
};

export const processUserTurn = (
  currentGameState: GameStateType
): GameStateType => {
  let newGameState = { ...currentGameState };

  newGameState.currentTurn += 1;
  newGameState.isUserTurn = !newGameState.isUserTurn;

  return newGameState;
};

// HELPERS FOR CHECKING ENDGAME
interface WinState {
  hasWon: boolean;
  winner: string | null;
  winningRow: number[];
}

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
const possibleWinningRows = [
  ...winningHorizontalRows,
  ...winningVerticalRows,
  ...winningDiagonalRows,
];

const xWins = JSON.stringify([x, x, x]);
const oWins = JSON.stringify([o, o, o]);

// get values of cells that could possibly be winning rows
const getLettersFromCells = (
  cellState: GridCellType[],
  indexesToGrab: number[]
) => indexesToGrab.map((i: number) => cellState[i].letter);

// compare row of cells for win state
const compareRows = (cellRow: string[]) => {
  const stringifiedCellRow = JSON.stringify(cellRow);
  if (stringifiedCellRow === xWins) return x;
  if (stringifiedCellRow === oWins) return o;
  return null;
};

// check each possible winning row for win state
export const checkEndGame = (cellState: GridCellType[]): WinState => {
  let winState: WinState = {
    hasWon: false,
    winner: null,
    winningRow: [],
  };

  // for each possible winning row of indices...
  for (let possibleRow of possibleWinningRows) {
    // ...assimilate the letters it corresponds to
    const cellRow: Array<string | null> = getLettersFromCells(
      cellState,
      possibleRow
    );

    // if row's cells aren't filled don't bother checking it
    if (cellRow.includes(null)) continue;

    // compare row of letters to xWins and oWins
    const winner = compareRows(cellRow as string[]);

    // return win state if someone won
    if (winner) {
      winState.hasWon = true;
      winState.winner = winner;
      winState.winningRow = possibleRow;
      // stop checking if someone wins
      break;
    }
  }
  // return winState
  return winState;
};

// Helpers for cells
export interface GridCellType {
  id: string;
  selected: boolean;
  letter: string | null;
}

export const makeEachGridCellState = (id: number) => {
  return {
    id: id.toString(),
    selected: false,
    letter: null,
  };
};

let defaultGridCells: GridCellType[] = [];
for (let i = 0; i < 9; i++) {
  defaultGridCells.push(makeEachGridCellState(i));
}

export { defaultGridCells };
