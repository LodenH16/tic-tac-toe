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
  return (
    <div
      id={id}
      key={`cell-${id}`}
      className={
        "size-full rounded-md " +
        (selected ? "bg-slate-400" : "bg-slate-300 hover:bg-slate-400")
      }
      onClick={() => handleCellClick(id)}
    >
      {letter}
    </div>
  );
}
