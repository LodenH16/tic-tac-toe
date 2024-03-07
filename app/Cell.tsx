export default function GridCell(id: string) {

    
    return (
        <div
            id={id}
            key={`block-${id}`}
            className="size-full rounded-lg bg-slate-300 hover:bg-slate-400"
        />
    )
}