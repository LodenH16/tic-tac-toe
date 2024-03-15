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
