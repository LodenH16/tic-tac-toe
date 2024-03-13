import { createContext } from "react";

export interface GridCellType {
  id: string;
  selected: boolean;
  o: boolean;
  x: boolean;
};

export const makeEachGridCellState = (id: number) => {
  return {
    id: id.toString(),
    selected: false,
    o: false,
    x: false,
  };
};

let defaultGridCells: GridCellType[] = [];
for (let i = 0; i < 9; i++) {
  defaultGridCells.push(makeEachGridCellState(i));
}

export { defaultGridCells };
