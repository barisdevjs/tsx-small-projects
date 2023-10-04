import { TaskState } from "../types";
import styles from "../../styles.module.css";
import TaskComponent from "./Task"; 

function Column({ state }: { state: TaskState }) {
  return (
    <div className={styles.column}>
      <p>{state}</p>
      <TaskComponent title="To do" state={state} />
    </div>
  );
}

export default Column;
