import useStore from "../../store";
import styles from "../../styles.module.css";
import { TaskT } from "../types";
import { shallow } from 'zustand/shallow';


function Task({ title, state }: TaskT) {
  const task = useStore((store) => store.tasks.find((t:TaskT) => t.title === title), shallow)
  
  return (
    <div className={styles.task}>
      <div>{task?.title}</div>
      <div className={`${styles.bottomWrapper} ${styles[state.toLowerCase()]}`}>
        <div></div>
        <div className={`${styles.status} ${styles[state.toLowerCase()]}`}>{task?.state}</div>
      </div>
    </div>
  );
}

export default Task;
