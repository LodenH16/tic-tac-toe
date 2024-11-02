import { expect, test, describe, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Page from "../app/page";

const HTMLEntityX = "✕";
const HTMLEntityO = "◯";

/* order of cells to click to draw the game
    x | o | x
    o | o | x
    x | x | o
*/

const drawGameClickOrder = [0, 8, 2, 1, 6, 4, 7, 3, 5];
const drawGameCharacterOrder = [
  HTMLEntityX,
  HTMLEntityO,
  HTMLEntityX,
  HTMLEntityO,
  HTMLEntityO,
  HTMLEntityX,
  HTMLEntityX,
  HTMLEntityX,
  HTMLEntityO,
];

/* order of cells to click for x to win the game
    x | o | x
    x | o | o
    x | x | o
*/
const xWinsClickOrder = [0, 1, 2, 4, 3, 5, 7, 8, 6];
const xWinsWinningCells = [0, 3, 6];

/* order of cells to click for o to win the game
    x | o | x
    x | o | 
      | o | 
 */
const oWinsClickOrder = [1, 0, 3, 4, 2, 8];
const oWinsWinningCells = [0, 4, 8];

const cellClassesBeforeClick = ["bg-slate-300", "hover:bg-slate-400"];
const cellClassAfterClick = "bg-slate-400";
const winningCellClass = "bg-green-400";

beforeEach(() => {
  render(<Page />);
});

afterEach(() => {
  cleanup();
});

describe("Page", () => {
  test("Render the page", () => {
    const headingText = screen.getByRole("heading", {
      level: 1,
      name: "Tic-Tac-Toe",
    });
    const gridCells = screen.getAllByRole("button");
    const resetButton = screen.queryByRole("button", { name: "Reset" });

    // renders heading text
    expect(headingText).toBeDefined();
    // renders 9 grid cells
    expect(gridCells.length).toBe(9);
    // does NOT render reset button
    expect(resetButton).toBeFalsy();
  });

  describe("Each button gets selected when clicked", async () => {
    for (let i = 0; i < 9; i++) {
      test(`it clicks grid-cell-${i} and updates the cell's properties`, () => {
        const button: HTMLButtonElement = screen.getByTestId(`grid-cell-${i}`);

        // not disabled at start
        expect(button.disabled).toBe(false);
        // background color "bg-slate-300 hover:bg-slate-400"
        cellClassesBeforeClick.forEach((c) => {
          expect(button.classList.contains(c)).toBe(true);
        });
        expect(button.classList.contains(cellClassAfterClick)).toBe(false);
        // no inner text
        expect(button.children.length).toBe(0);

        fireEvent.click(button);

        // now disabled
        expect(button.disabled).toBe(true);
        // background color = "bg-slate-400"
        cellClassesBeforeClick.forEach((c) => {
          expect(button.classList.contains(c)).toBe(false);
        });
        expect(button.classList.contains(cellClassAfterClick)).toBe(true);
        //inner text of weird X character
        expect(button.children.length).toBe(1);
        expect(button.children[0].innerHTML).toBe(HTMLEntityX);
      });
    }
  });

  describe("draw game behavior", () => {
    beforeEach(() => {
      drawGameClickOrder.forEach((cellIndex) => {
        const cell = screen.getByTestId(`grid-cell-${cellIndex}`);
        fireEvent.click(cell);
      });
    });

    for (let i = 0; i < 9; i++) {
      test(`cell[${i}] has an inner ${drawGameCharacterOrder[i]}`, () => {
        const cell = screen.getByTestId(`grid-cell-${i}`);

        expect(cell.children[0].innerHTML).toEqual(drawGameCharacterOrder[i]);
      });
    }

    test("clicking 'Reset' resets the game", () => {
      const resetButton = screen.getByRole("button", { name: "Reset" });

      for (let i = 0; i < 9; i++) {
        const button: HTMLButtonElement = screen.getByTestId(`grid-cell-${i}`);

        // state before clicking reset
        // button disabled
        expect(button.disabled).toBe(true);
        // background color = "bg-slate-400"
        cellClassesBeforeClick.forEach((c) => {
          expect(button.classList.contains(c)).toBe(false);
        });
        expect(button.classList.contains(cellClassAfterClick)).toBe(true);
        //inner text of weird X character
        expect(button.children.length).toBe(1);
      }

      fireEvent.click(resetButton);

      for (let i = 0; i < 9; i++) {
        const button: HTMLButtonElement = screen.getByTestId(`grid-cell-${i}`);

        // state after clicking reset
        // button disabled
        expect(button.disabled).toBe(false);
        // background color = "bg-slate-400"
        cellClassesBeforeClick.forEach((c) => {
          expect(button.classList.contains(c)).toBe(true);
        });
        expect(button.classList.contains(cellClassAfterClick)).toBe(false);
        //inner text of weird X character
        expect(button.children.length).toBe(0);
      }
    });
  });

  describe("x wins game state", () => {
    beforeEach(() => {
      xWinsClickOrder.forEach((cellIndex) => {
        const cell = screen.getByTestId(`grid-cell-${cellIndex}`);
        fireEvent.click(cell);
      });
    });

    test("winning cells are green", () => {
      xWinsWinningCells.forEach((cellIndex) => {
        const cell = screen.getByTestId(`grid-cell-${cellIndex}`);

        expect(cell.classList.contains(winningCellClass)).toBe(true);
      });
    });

    test("all cells are disabled", () => {
      for (let i = 0; i < 9; i++) {
        const button: HTMLButtonElement = screen.getByTestId(`grid-cell-${i}`);

        expect(button.disabled).toBe(true);
      }
    });

    test("clicking 'Reset' resets the game", () => {
      const resetButton = screen.getByRole("button", { name: "Reset" });
      fireEvent.click(resetButton);

      // state after clicking reset
      for (let i = 0; i < 9; i++) {
        const button: HTMLButtonElement = screen.getByTestId(`grid-cell-${i}`);
        // button disabled
        expect(button.disabled).toBe(false);
        // background color = "bg-slate-400"
        cellClassesBeforeClick.forEach((c) => {
          expect(button.classList.contains(c)).toBe(true);
        });
        expect(button.classList.contains(cellClassAfterClick)).toBe(false);
        //inner text of buttons
        expect(button.children.length).toBe(0);
      }
    });
  });

  describe("o wins game state", () => {
    beforeEach(() => {
      oWinsClickOrder.forEach((cellIndex) => {
        const cell = screen.getByTestId(`grid-cell-${cellIndex}`);
        fireEvent.click(cell);
      });
    });

    test("winning cells are green", () => {
      oWinsWinningCells.forEach((cellIndex) => {
        const cell = screen.getByTestId(`grid-cell-${cellIndex}`);

        expect(cell.classList.contains(winningCellClass)).toBe(true);
      });
    });

    test("all cells are disabled", () => {
      for (let i = 0; i < 9; i++) {
        const button: HTMLButtonElement = screen.getByTestId(`grid-cell-${i}`);

        expect(button.disabled).toBe(true);
      }
    });

    test("clicking 'Reset' resets the game", () => {
      const resetButton = screen.getByRole("button", { name: "Reset" });
      fireEvent.click(resetButton);

      // state after clicking reset
      for (let i = 0; i < 9; i++) {
        const button: HTMLButtonElement = screen.getByTestId(`grid-cell-${i}`);
        // button disabled
        expect(button.disabled).toBe(false);
        // background color = "bg-slate-400"
        cellClassesBeforeClick.forEach((c) => {
          expect(button.classList.contains(c)).toBe(true);
        });
        expect(button.classList.contains(cellClassAfterClick)).toBe(false);
        //inner text of buttons
        expect(button.children.length).toBe(0);
      }
    });
  });
});
