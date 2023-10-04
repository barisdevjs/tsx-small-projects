import styles from "../../styles.module.css";
import { TaskState } from "../types";

const STATUS = "ONGOING";

function Task({ title, state }: { title: string, state: TaskState }) {
  return (
    <div className={styles.task}>
      <div>{title}</div>
      <div className={`${styles.bottomWrapper} ${styles[state.toLowerCase()]}`}>
        <div></div>
        <div className={`${styles.status} ${styles[state.toLowerCase()]}`}>{STATUS}</div>
      </div>
    </div>
  );
}

export default Task;
