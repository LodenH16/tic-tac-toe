"use client"

// css and stuff
import "./globals.css"
// React stuff
import { useEffect, useState } from "react";
//components
import Cell from "./Cell";
// game helpers
import {
  turnOrder,
  makeNewGameState,
  processUserTurn,
} from "./helpers/GameStateHelpers";
import { GridCellType, makeDefaultGridCells } from "./helpers/CellStateHelpers";
import { checkEndGame, makeDefaultWinState } from "./helpers/WinStateHelpers";

export default function Home() {
  const [cellState, setCellState] = useState(makeDefaultGridCells());
  const [gameState, setGameState] = useState(makeNewGameState());
  const [winState, setWinState] = useState(makeDefaultWinState());

  const resetGameToDefault = () => {
    setCellState(makeDefaultGridCells());
    setGameState(makeNewGameState());
    setWinState(makeDefaultWinState());
  };

  const handleCellClick = (cellId: string) => {
    let newCellState = [...cellState];
    const clickedCell = newCellState[parseInt(cellId)];

    // set cell as selected
    clickedCell.selected = true;

    // update cellState with x or o
    const letterToDraw = turnOrder[gameState.currentTurn];
    clickedCell.letter = letterToDraw;
    // check game over
    const newWinState = checkEndGame(cellState);

    setCellState(newCellState);
    setGameState(processUserTurn(gameState));
    setWinState(newWinState);
  };

  const [showResetButton, setShowResetButton] = useState(false);
  useEffect(() => {
    if (winState.gameOver || gameState.currentTurn >= 9) {
      setShowResetButton(true);
    } else setShowResetButton(false);
  }, [winState.gameOver, gameState.currentTurn]);

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
      {showResetButton && (
        <button
          onClick={() => resetGameToDefault()}
          className={
            "block mx-auto my-4 " + // positioning
            "rounded-sm px-3 py-0.5 " + // size & shape
            "bg-sky-300 hover:bg-sky-400 text-sky-950" // colors
          }
        >
          Reset
        </button>
      )}
    </main>
  );
}
