export type GridCell = {
    id: string;
    selected: boolean;
    o: boolean;
    x: boolean;
}

export const makeEachGridCell = (id: number) => {
    return {
        id: id.toString(),
        selected: false,
        o: false,
        x: false
    }
}