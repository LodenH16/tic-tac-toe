"use client"

// css and stuff
import "./globals.css"
// React stuff
import { useState } from "react";
//components
import Cell from "./Cell";
// game helpers
import {
  xStartsFirst,
  oStartsFirst,
  makeDefaultGameState,
  processUserTurn,
} from "./helpers/GameStateHelpers";
import { GridCellType, defaultGridCells } from "./helpers/CellStateHelpers";
import { checkEndGame, defaultWinState } from "./helpers/WinStateHelpers";

export default function Home() {
  const [cellState, setCellState] = useState(defaultGridCells);
  const [gameState, setGameState] = useState(makeDefaultGameState("x", true));
  const [winState, setWinState] = useState(defaultWinState);

  const handleCellClick = (cellId: string) => {
    let newCellState = [...cellState];
    const clickedCell = newCellState[parseInt(cellId)];
    const turnOrder =
      gameState.startingTurn === "x" ? xStartsFirst : oStartsFirst;

    // set cell as selected
    clickedCell.selected = true;

    // update cellState with x or o
    const letterToDraw = turnOrder[gameState.currentTurn];
    clickedCell.letter = letterToDraw;
    // check game over
    checkEndGame(cellState);

    setCellState(newCellState);
    setGameState(processUserTurn(gameState));
  };

  const makeCells = cellState.map((cell: GridCellType, index) => {
    const isWinningCell: boolean = winState.winningRow.includes(index);

    return Cell({
      cell,
      handleCellClick,
      isWinningCell,
      gameOver: winState.gameOver,
    });
  });

  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <h1 className="w-full text-center my-4">Some text here</h1>
      <div
        className={
          "grid grid-cols-3 grid-rows-3 gap-2 " + // define grid stuff
          "w-80 h-80 " + // size of inside cells
          "mx-auto" // margin to put it in the middle
        }
      >
        {makeCells}
      </div>
    </main>
  );
}
