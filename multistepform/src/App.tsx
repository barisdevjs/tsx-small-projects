import { useForm } from "./useForm"

function App() {
  const { currIdx, step, steps, next, prev, goTo } =
    useForm([<div>One</div>, <div>Two</div>, <div>Three</div>]);

  return (
    <div style={{
      position: 'relative', backgroundColor: 'lightcyan', border: '1px solid black',
      padding: '2rem', margin: '1rem', borderRadius: '.5rem', fontFamily: 'sans-serif'
    }}>
      <form>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currIdx + 1} / {steps.length}
        </div>
        {step}
        <div style={{ marginTop:'1rem', display:'flex', gap:'.5rem', justifyContent:'flex-end' }}>
          <button>Back</button>
          <button>Next</button>
        </div>
      </form>
    </div>
  )
}

export default App
