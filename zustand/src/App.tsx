import './App.css'
import Column from './components/Column'
import { TaskState } from './types'

function App() {

  return (
    <div className="App">
      <Column state={TaskState.PLANNED} />
      <Column state={TaskState.ONGOING} />
      <Column state={TaskState.DONE} />
    </div>

  )
}

export default App
