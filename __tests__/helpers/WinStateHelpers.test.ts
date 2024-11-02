import { expect, test, describe } from "vitest";
import {
  makeDefaultWinState,
  getLettersFromCells,
  compareRows,
  checkEndGame,
  possibleWinningRows,
  WinState,
} from "../../app/helpers/WinStateHelpers";
import { makeDefaultGridCells } from "../../app/helpers/CellStateHelpers";
import { turnOrder } from "../../app/helpers/GameStateHelpers";

let filledCellState = makeDefaultGridCells();

turnOrder.forEach((letter, index) => {
  filledCellState[index].letter = letter;
});

describe("WinStateHelpers helper functions", () => {
  describe("makeDefaultWinState", () => {
    test("returns a default winState object", () => {
      const defaultWinState = makeDefaultWinState();
      const expectedDefaultWinState: WinState = {
        gameOver: false,
        winner: null,
        winningRow: [],
      };

      expect(defaultWinState).toStrictEqual(expectedDefaultWinState);
    });
  });
  describe("getLettersFromCells", () => {
    describe("all x's", () => {
      const allXCellState = makeDefaultGridCells();

      allXCellState.forEach((cell, index) => {
        allXCellState[index].letter = "x";
      });

      test.each([...possibleWinningRows])(
        "[ cell[%i], cell[%i], cell[%i] ] === ['x','x','x']",
        (index0, index1, index2) => {
          const possibleWinningRow = [index0, index1, index2];

          expect(
            getLettersFromCells(allXCellState, possibleWinningRow)
          ).toStrictEqual(["x", "x", "x"]);
        }
      );
    });

    describe("all o's", () => {
      const allOCellState = makeDefaultGridCells();

      allOCellState.forEach((cell, index) => {
        allOCellState[index].letter = "o";
      });

      test.each([...possibleWinningRows])(
        "[ cell[%i], cell[%i], cell[%i] ] === ['o','o','o']",
        (index0, index1, index2) => {
          const possibleWinningRow = [index0, index1, index2];

          expect(
            getLettersFromCells(allOCellState, possibleWinningRow)
          ).toStrictEqual(["o", "o", "o"]);
        }
      );
    });

    describe("all nulls", () => {
      const allNullCellState = makeDefaultGridCells();

      allNullCellState.forEach((cell, index) => {
        allNullCellState[index].letter = "null";
      });

      test.each([...possibleWinningRows])(
        "[ cell[%i], cell[%i], cell[%i] ] === ['null','null','null']",
        (index0, index1, index2) => {
          const possibleWinningRow = [index0, index1, index2];

          expect(
            getLettersFromCells(allNullCellState, possibleWinningRow)
          ).toStrictEqual(["null", "null", "null"]);
        }
      );
    });

    describe("alternating letters", () => {
      const alternatingLetterCellState = makeDefaultGridCells();

      alternatingLetterCellState.forEach((cell, index) => {
        alternatingLetterCellState[index].letter = turnOrder[index];
      });
      /* visual depiction of game board with alternating letters
      x | o | x
      o | x | o
      x | o | x
      */

      // indexes of rows from possibleWinningRows
      const expectedXOXRows = [0, 2, 3, 5].map((i) => possibleWinningRows[i]);
      const expectedOXORows = [1, 4].map((i) => possibleWinningRows[i]);
      const expectedXXXRows = [6, 7].map((i) => possibleWinningRows[i]);

      const XOX = ["x", "o", "x"];
      const OXO = ["o", "x", "o"];
      const XXX = ["x", "x", "x"];

      describe("X O X rows", () => {
        test.each([...expectedXOXRows])(
          "[ cell[%i], cell[%i], cell[%i] ] === ['x','o','x']",
          (index0, index1, index2) => {
            const possibleWinningRow = [index0, index1, index2];

            expect(
              getLettersFromCells(
                alternatingLetterCellState,
                possibleWinningRow
              )
            ).toStrictEqual(XOX);
          }
        );
      });

      describe("O X O rows", () => {
        test.each([...expectedOXORows])(
          "[ cell[%i], cell[%i], cell[%i] ] === ['o','x','o']",
          (index0, index1, index2) => {
            const possibleWinningRow = [index0, index1, index2];

            expect(
              getLettersFromCells(
                alternatingLetterCellState,
                possibleWinningRow
              )
            ).toStrictEqual(OXO);
          }
        );
      });

      describe("X X X rows", () => {
        test.each([...expectedXXXRows])(
          "[ cell[%i], cell[%i], cell[%i] ] === ['x','X','x']",
          (index0, index1, index2) => {
            const possibleWinningRow = [index0, index1, index2];

            expect(
              getLettersFromCells(
                alternatingLetterCellState,
                possibleWinningRow
              )
            ).toStrictEqual(XXX);
          }
        );
      });
    });
  });

  describe("compareRows", () => {
    test("x wins", () => {
      const xWinsRow = ["x", "x", "x"];
      expect(compareRows(xWinsRow)).toBe("x");
    });

    test("o wins", () => {
      const oWinsRow = ["o", "o", "o"];
      expect(compareRows(oWinsRow)).toBe("o");
    });

    test("neither wins", () => {
      const neitherWinsRow = ["x", "o", "o"];
      expect(compareRows(neitherWinsRow)).toBe(null);
    });
  });

  describe("checkEndGame", () => {
    describe("each possible winning row can return a winning win state when all letters are the same", () => {
      test.each([...possibleWinningRows])(
        "[ [cell[%i], cell[%i], cell[%i] ] wins",
        (index0, index1, index2) => {
          const winningGridCellsState = makeDefaultGridCells();
          winningGridCellsState[index0].letter = "x";
          winningGridCellsState[index1].letter = "x";
          winningGridCellsState[index2].letter = "x";

          const expectedWinState = makeDefaultWinState();
          expectedWinState.gameOver = true;
          expectedWinState.winner = "x";
          expectedWinState.winningRow = [index0, index1, index2];

          const gameWinState = checkEndGame(winningGridCellsState);

          expect(gameWinState).toStrictEqual(expectedWinState);
        }
      );
    });

    describe("each possible winning row can return a default win state when rows are different letters", () => {
      test.each([...possibleWinningRows])(
        "[ [cell[%i], cell[%i], cell[%i] ] does not win",
        (index0, index1, index2) => {
          const losingGridCellsState = makeDefaultGridCells();
          losingGridCellsState[index0].letter = "x";
          losingGridCellsState[index1].letter = "o";
          losingGridCellsState[index2].letter = "o";

          const expectedWinState = makeDefaultWinState();

          const gameWinState = checkEndGame(losingGridCellsState);

          expect(gameWinState).toStrictEqual(expectedWinState);
        }
      );
    });

    describe("each possible winning row can return a default win state when one of the cells in null", () => {
      test.each([...possibleWinningRows])(
        "[ [cell[%i], cell[%i], cell[%i] ] does not win",
        (index0, index1, index2) => {
          const losingGridCellsState = makeDefaultGridCells();
          losingGridCellsState[index0].letter = "x";
          losingGridCellsState[index1].letter = null;
          losingGridCellsState[index2].letter = "o";

          const expectedWinState = makeDefaultWinState();

          const gameWinState = checkEndGame(losingGridCellsState);

          expect(gameWinState).toStrictEqual(expectedWinState);
        }
      );
    });
  });
});
