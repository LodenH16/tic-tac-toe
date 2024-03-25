// HELPERS FOR CREATING DEFAULT GAME STATE
const x = "x";
const o = "o";

export const xStartsFirst = [x, o, x, o, x, o, x, o, x];
export const oStartsFirst = [o, x, o, x, o, x, o, x, o];

// Helpers for game state
export interface GameStateType {
  xStartsGame: boolean;
  userStartsFirst: boolean;
  currentTurn: number;
  gameOver: boolean;
  isUserTurn: boolean;
}

export const makeNewGameState = (
  xStartedGame: boolean = true,
  userStartsFirst: boolean = true
): GameStateType => {
  return {
    xStartsGame: xStartedGame,
    userStartsFirst,
    currentTurn: 0,
    gameOver: false,
    isUserTurn: userStartsFirst,
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
