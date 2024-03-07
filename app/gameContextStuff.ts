import { createContext } from "react";

export type GridCellType = {
  id: string;
  selected: boolean;
  o: boolean;
  x: boolean;
};

export const makeEachGridCell = (id: number) => {
  return {
    id: id.toString(),
    selected: false,
    o: false,
    x: false,
  };
};

let gridCells: GridCellType[] = [];
for (let i = 0; i < 9; i++) {
  gridCells.push(makeEachGridCell(i));
}

export { gridCells };
