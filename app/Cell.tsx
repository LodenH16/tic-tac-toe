// react stuff
import React, { useState, useContext } from "react";
// game helpers
import { GridCellType } from "./gameContextStuff";
// game context
// import { GameContext } from "./page";

interface cellProps {
  cellState: GridCellType;
  gameState: GridCellType[];
  updateGameState: React.Dispatch<React.SetStateAction<any>>;
}

export default function GridCell({
  cellState,
  gameState,
  updateGameState,
}: cellProps) {
  // const gameData = useContext(GameContext);

  const handleClick = () => {
    let newGameState = gameState;
    gameState[parseInt(cellState.id)].selected = true;
    updateGameState(newGameState);
  };

  console.log(cellState);
  return (
    <div
      id={cellState.id}
      key={`cell-${cellState.id}`}
      className="size-full rounded-lg bg-slate-300 hover:bg-slate-400"
      onClick={handleClick}
    >
      &#215; &#9711;
    </div>
  );
}
