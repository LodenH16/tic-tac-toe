// HELPERS FOR CREATING DEFAULT CELLS
export interface GridCellType {
  id: string;
  selected: boolean;
  letter: string | null;
}

export const makeEachGridCellState = (id: number): GridCellType => {
  return {
    id: id.toString(),
    selected: false,
    letter: null,
  };
};

export const makeDefaultGridCells = (): GridCellType[] => {
  return Array.from(
    { length: 9 },
    (v, i): GridCellType => makeEachGridCellState(i)
  );
};
