"use client"

// css and stuff
import "./globals.css"
// React stuff
import { createContext } from "react"
//components
import GridCell from "./GridCell"
export default function Home() {

    const makeEachGridCell = (id: number) => {
        return {
            id: id,
            selected: false,
            o: false,
            x: false
        }
    }

    let gridCells = []
    
    for (let i = 1; i <= 9; i++) {
        gridCells.push(makeEachGridCell(i))
    }

    const blocks = gridCells.map((cell: object) => {
        return GridCell(cell.id)
    })
    
    const GameContext = createContext(null)

    return (
        <main className="max-w-screen-lg mx-auto p-4">
            <h1 className="w-full text-center my-4">Some text here</h1>
            <GameContext.Provider value={null}>
                <div className={
                    "grid grid-cols-3 grid-rows-3 gap-2" // define grid stuff
                    + " w-80 h-80" // size of inside cells
                    + " mx-auto" // margin to put it in the middle
                }>
                    {blocks}
                </div>
            </GameContext.Provider>
        </main>
  );
}
