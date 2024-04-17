// HELPERS FOR CREATING DEFAULT GAME STATE
const x = "x";
const o = "o";

export const turnOrder = [x, o, x, o, x, o, x, o, x];

// Helpers for game state
export interface GameStateType {
  currentTurn: number;
  gameOver: boolean;
  isUserTurn: boolean;
}

export const makeNewGameState = (): GameStateType => {
  return {
    currentTurn: 0,
    gameOver: false,
    isUserTurn: true,
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
