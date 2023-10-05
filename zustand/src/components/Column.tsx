import { TaskStateT, TaskT } from "../types";
import styles from "../../styles.module.css";
import TaskComponent from "./Task";
import { shallow } from "zustand/shallow";
import useStore, { StoreStateT } from '../../store';


function Column({ state }: TaskT) {
    const tasks = useStore((store: StoreStateT) => store.tasks.filter((t: TaskT) => t.state === state), shallow);
    const addTask = useStore((store: StoreStateT) => store.addTask)

    console.log(tasks)
    return (
        <div className={styles.column}>
            <div className={styles.titleWrapper}>
            <p>{state}</p>
            <button onClick={() => {addTask({title:"4", state:TaskStateT.PLANNED})}}>ADD</button>
            </div>
            {tasks.map((task : TaskT) => (
                <TaskComponent key={task.title} title={task.title} state={task.state} />
            ))}
        </div>
    );
}

export default Column;
