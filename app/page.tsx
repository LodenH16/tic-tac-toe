"use client"

// css and stuff
import "./globals.css"
// React stuff
import { createContext, useState } from "react";
//components
import Cell from "./Cell";
// game helpers
import { GridCellType, gridCells } from "./gameContextStuff";
// game context
//export const GameContext = createContext();

export default function Home() {
    const [gameState, updateGameState] = useState(gridCells);

    const cells = gameState.map((cellState: GridCellType) => {
      return Cell({ cellState, gameState, updateGameState });
    });


  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <h1 className="w-full text-center my-4">Some text here</h1>
      <div
        className={
          "grid grid-cols-3 grid-rows-3 gap-2" + // define grid stuff
          " w-80 h-80" + // size of inside cells
          " mx-auto" // margin to put it in the middle
        }
      >
        {cells}
      </div>
    </main>
  );
}
