import { expect, test, describe } from "vitest";
import {
  makeEachGridCellState,
  makeDefaultGridCells,
} from "../../app/helpers/CellStateHelpers";

describe("CellStateHelpers helper functions", () => {
  describe("makeEachGridCellState", () => {
    test("it returns a default Grid Cell object", () => {
      const expectedGridCellId = "1";
      const expectedDefaultGridCellState = {
        id: expectedGridCellId,
        selected: false,
        letter: null,
      };

      expect(makeEachGridCellState(1)).toStrictEqual(
        expectedDefaultGridCellState
      );
    });
  });

  describe("makeDefaultGridCells", () => {
    test("it returns nine sequential Grid Cell States", () => {
      const defaultGridCellState = {
        id: "",
        selected: false,
        letter: null,
      };
      let expectedGridCellStates = [];

      for (let i = 0; i < 9; i++) {
        const newGridCellState = { ...defaultGridCellState };
        newGridCellState.id = i.toString();

        expectedGridCellStates.push(newGridCellState);
      }

      const generatedGridCellStates = makeDefaultGridCells();

      expect(expectedGridCellStates).toStrictEqual(generatedGridCellStates);
      expect(generatedGridCellStates.length).toBe(9);
    });
  });
});
