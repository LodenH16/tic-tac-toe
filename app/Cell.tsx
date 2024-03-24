// react stuff
import React, { useState, useEffect } from "react";
// game helpers
import { GridCellType } from "./helpers/CellStateHelpers";

interface cellProps {
  cell: GridCellType;
  handleCellClick: (id: string) => void;
  isWinningCell: boolean;
  gameOver: boolean;
}

export default function GridCell({
  cell: { id, selected, letter },
  handleCellClick,
  isWinningCell,
  gameOver,
}: cellProps) {
  const [backgroundColor, setBackgroundColor] = useState(
    "bg-slate-300 hover:bg-slate-400"
  );

  useEffect(() => {
    switch (true) {
      case isWinningCell: {
        setBackgroundColor("bg-green-400");
        break;
      }
      case selected: {
        setBackgroundColor("bg-slate-400");
        break;
      }
      case gameOver: {
        setBackgroundColor("bg-slate-300");
        break;
      }
      default: {
        setBackgroundColor("bg-slate-300 hover:bg-slate-400");
      }
    }
  }, [selected, isWinningCell, gameOver]);

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
        backgroundColor // colors
      }
      onClick={() => handleCellClick(id)}
    >
      <span className="w-full text-7xl font-mono">{determineCharacter()}</span>
    </button>
  );
}
