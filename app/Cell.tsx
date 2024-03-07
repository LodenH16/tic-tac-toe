// react stuff
import { useState, useContext } from "react";
// game helpers
import { GridCellType } from "./gameContextStuff";
// game context
import { GameContext } from "./page";

export default function GridCell(props: GridCellType) {
  const gameData = useContext(GameContext);

  return (
    <div
      id={props.id}
      key={`block-${props.id}`}
      className="size-full rounded-lg bg-slate-300 hover:bg-slate-400"
    >
      &#215; &#9711;
    </div>
  );
}
