// react stuff
import React, { useState, useContext, useEffect } from "react";
// game helpers
import { GridCellType } from "./helpers/CellStateHelpers";

interface cellProps {
  cell: GridCellType;
  handleCellClick: (id: string) => void;
}

export default function GridCell({
  cell: { id, selected, letter },
  handleCellClick,
}: cellProps) {
  const determineCharacter = () => {
    switch (letter) {
      case "x":
        return <span>&#10005;</span>;
      case "o":
        return <span>&#9711;</span>;
      case null:
        return null;
    }
  };

  return (
    <button
      id={id}
      key={`cell-${id}`}
      disabled={selected}
      className={
        "size-full rounded-md " + // size and shape of cells
        "flex items-center text-center " + // center the character texts
        (selected ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400") // colors
      }
      onClick={() => handleCellClick(id)}
    >
      <span className="w-full text-7xl font-mono">{determineCharacter()}</span>
    </button>
  );
}
