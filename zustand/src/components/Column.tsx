import { TaskT } from "../types";
import styles from "../../styles.module.css";
import TaskComponent from "./Task";
import { shallow } from "zustand/shallow";
import useStore, { StoreStateT } from '../../store';
import { useState } from "react";


function Column({ state }: TaskT) {
    const tasks = useStore((store: StoreStateT) => store.tasks.filter((t: TaskT) => t.state === state), shallow);
    const addTask = useStore((store: StoreStateT) => store.addTask)
    const setDraggedTask = useStore((store) => store.setDraggedTask)
    const draggedTask = useStore((store) => store.draggedTask)
    const moveTask = useStore((store) => store.moveTask)

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.column}
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={() => {
                if (draggedTask) {
                    moveTask({ ...draggedTask, state });
                    setDraggedTask(null);
                }
            }}>
            <div className={styles.titleWrapper}>
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>ADD</button>
            </div>
            {tasks.map((task: TaskT) => (
                <TaskComponent key={Math.random()} title={task.title} state={task.state} />
            ))}
            {open && <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <input onChange={(e) => setText(e.target.value)} value={text} />
                    <button onClick={() => {
                        addTask({ state: state, title: text });
                        setText('');
                        setOpen(false);
                    }}>ADD TASK</button>
                </div>
            </div>}
        </div>
    );
}

export default Column;
