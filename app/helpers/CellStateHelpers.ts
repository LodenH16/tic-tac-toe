// HELPERS FOR CREATING DEFAULT CELLS
export interface GridCellType {
  id: string;
  selected: boolean;
  letter: string | null;
}

export const makeEachGridCellState = (id: number) => {
  return {
    id: id.toString(),
    selected: false,
    letter: null,
  };
};

let defaultGridCells: GridCellType[] = [];
for (let i = 0; i < 9; i++) {
  defaultGridCells.push(makeEachGridCellState(i));
}

export { defaultGridCells };
