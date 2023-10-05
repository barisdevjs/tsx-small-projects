import './App.css'
import Column from './components/Column'
import { TaskStateT } from './types'

function App() {

  return (
    <div className="App">
      <Column state={TaskStateT.PLANNED} title={TaskStateT.PLANNED} />
      <Column state={TaskStateT.ONGOING} title={TaskStateT.ONGOING} />
      <Column state={TaskStateT.DONE} title={TaskStateT.DONE} />
    </div>

  )
}

export default App
