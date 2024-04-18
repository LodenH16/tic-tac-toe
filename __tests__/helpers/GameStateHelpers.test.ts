import { expect, test, describe } from "vitest";
import {
  makeNewGameState,
  processUserTurn,
} from "../../app/helpers/GameStateHelpers";

describe("GameStateHelpers helper functions", () => {
  describe("makeNewGameState", () => {
    test("it returns a default game state object", () => {
      const defaultGameState = makeNewGameState();
      const expectedDefaultGameState = {
        currentTurn: 0,
        gameOver: false,
        isUserTurn: true,
      };

      expect(defaultGameState).toStrictEqual(expectedDefaultGameState);
    });
  });

  describe("processUserTurn", () => {
    describe("it increments the turn from 0 to 9", () => {
      for (let t = 0; t <= 9; t++) {
        test(`increments turn counter from ${t} to ${t + 1}`, () => {
          const gameState = makeNewGameState();
          gameState.currentTurn = t;

          const expectedNextTurnNumber = t + 1;
          const expectedNewGameState = { ...gameState };
          expectedNewGameState.currentTurn = expectedNextTurnNumber;
          expectedNewGameState.isUserTurn = false;

          const userTurnProcessedGameState = processUserTurn(gameState);

          expect(userTurnProcessedGameState).toStrictEqual(
            expectedNewGameState
          );
        });
      }
    });
  });
});
