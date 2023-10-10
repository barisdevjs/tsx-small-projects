import { useState } from 'react';
import './App.css'

type DataT = {
  data:Record<string, string>
}

type ButtonStateT = "DEFAULT" | "SELECTED" | "WRONG";
type OptionT = {
  value:string;
  state:ButtonStateT
}

function Game({data} : DataT) {
  const cities = Object.keys(data);
  const capitals = Object.values(data);
  const [options, setOptions] = useState<OptionT[]>(
    [...cities,...capitals].sort(() => Math.random() - .5).map((value) => ({
      value,
      state:"DEFAULT"
    }))
  )

  return (
    <div>
      {options.map((opt, index) => (
        <button
          key={opt.value}
          className={opt.state === "SELECTED" ? "selected" : ""}
          onClick={() => {
            setOptions((prevOptions) =>
              prevOptions.map((o, i) =>
                i === index ? { ...o, state: "SELECTED" } : o
              )
            );
          }}
        >
          {opt.value}
        </button>
      ))}
    </div>
  );
}

function App() {
  return (
    <Game data={{Germany:"Berlin", Turkey:"Ankara"}}/>
  )
}

export default App
