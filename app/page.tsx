import Image from "next/image";
import "./globals.css"

export default function Home() {

  const idArray = ["1","2","3","4","5","6","7","8","9",]

  const blocks = idArray.map((id: string) => {
    return (
      <div
        id={id}
        key={`block-${id}`}
        className="size-full rounded-lg bg-slate-300" />
      )
  })

  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <h1 className="w-full text-center my-4">Some text here</h1>
      <div className={
        "grid grid-cols-3 grid-rows-3 gap-2" // define grid stuff
        + " w-80 h-80" // size of inside cells
        + " mx-auto" // margin to put it in the middle
        }>
        {blocks}
      </div>
    </main>
  );
}
