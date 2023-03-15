import { ReactNode } from "react"

type WrapperT = {
    title: string
    children: ReactNode
}

function Wrapper({ title, children }: WrapperT) {
    return (
        <>
            <h2 style={{ textAlign: 'center', margin: '0 0 2rem 0' }}>{title}</h2>
            <div style={{ 
                display: 'grid', 
                gap: '1rem .5rem', 
                justifyContent: 'flex-start', 
                gridTemplateColumns: "auto minmax(auto, 400px)" }}>
                {children}
            </div>
        </>
    )
}

export default Wrapper