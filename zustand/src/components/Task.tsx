import useStore from "../../store";
import styles from "../../styles.module.css";
import { TaskT } from "../types";
import { shallow } from 'zustand/shallow';


function Task({ title, state }: TaskT) {
  const task = useStore((store) => store.tasks.find((t: TaskT) => t.title === title), shallow)
  const removeTask2 = useStore((store) => store.removeTask2)
  const setDraggedTask = useStore((store) => store.setDraggedTasks)

  if (!task) return null

  return (
    <div className={styles.task} draggable onDragStart={() => setDraggedTask(task)}>
      <div>{task?.title}</div>
      <div className={`${styles.bottomWrapper} ${styles[state.toLowerCase()]}`}>
        <button onClick={() => removeTask2(task)}>DELETE</button>
        <span className={`${styles.status} ${styles[state.toLowerCase()]}`}>{task?.state}</span>
      </div>
    </div>
  );
}

export default Task;
