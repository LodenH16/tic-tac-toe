// react stuff
import React, { useState, useContext, useEffect } from "react";
// tailwind colors
import tailwindColors from "tailwindcss/colors";
// game helpers
import { GridCellType } from "./gameContextStuff";

interface cellProps {
  cellState: GridCellType;
  handleCellClick: (id: string) => void;
}

export default function GridCell({ cellState, handleCellClick }: cellProps) {
  return (
    <div
      id={cellState.id}
      key={`cell-${cellState.id}`}
      className={
        "size-full rounded-md " +
        (cellState.selected
          ? "bg-slate-400"
          : "bg-slate-300 hover:bg-slate-400")
      }
      onClick={() => handleCellClick(cellState.id)}
      // style={{ backgroundColor: cellBackgroundColor }}
    >
      {cellState.selected ? "true" : "false"}
    </div>
  );
}
