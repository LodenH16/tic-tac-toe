// react stuff
import React, { useState, useContext, useEffect } from "react";
// game helpers
import { GridCellType } from "./gameContextStuff";

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
        return <span>&#9900;</span>;
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
        "size-full rounded-md " +
        "flex items-center text-center " +
        (selected ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400")
      }
      onClick={() => handleCellClick(id)}
    >
      <span className="w-full text-7xl font-mono">{determineCharacter()}</span>
    </button>
  );
}
