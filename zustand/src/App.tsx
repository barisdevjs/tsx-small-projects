import './App.css'
import Column from './components/Column'
import { TaskStateT } from './types'
import styles from "../styles.module.css";

function App() {

  return (
    <div className="App">
      <h1 className={styles.h1}>ZUSTAND STATE MANAGEMENT + DRAG && DROP</h1>
      <div className={styles.columnWrapper}>
      <Column state={TaskStateT.PLANNED} title={TaskStateT.PLANNED} />
      <Column state={TaskStateT.ONGOING} title={TaskStateT.ONGOING} />
      <Column state={TaskStateT.DONE} title={TaskStateT.DONE} />
      </div>
    </div>

  )
}

export default App
