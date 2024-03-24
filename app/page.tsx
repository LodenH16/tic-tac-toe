"use client"

// css and stuff
import "./globals.css"
// React stuff
import { createContext, useContext, useState, useEffect } from "react";
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

    setCellState(newCellState);
    setGameState(processUserTurn(gameState));
    console.log(cellState);
  };

  const cells = cellState.map((cell: GridCellType, index) => {
    return Cell({ cell, handleCellClick });
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
        {cells}
      </div>
    </main>
  );
}
