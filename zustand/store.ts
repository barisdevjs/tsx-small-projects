import { TaskT, TaskStateT } from "./src/types"
import { createWithEqualityFn } from "zustand/traditional";


export interface StoreStateT {
    tasks: TaskT[];
    addTask: (task: TaskT) => void;
}


const useStore = createWithEqualityFn<StoreStateT>((set) => ({
    tasks: [
        { title: "Test 1", state: TaskStateT.PLANNED },
        { title: "Test 2", state: TaskStateT.ONGOING },
        { title: "Test 3", state: TaskStateT.DONE },
    ],

    addTask: (task: TaskT) => {
        set((state) => ({ tasks: [...state.tasks, task] }));
    },
    removeTask: (task: TaskT) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.title !== task.title) }));
    },
    removeTask2: (task: TaskT) => {
        set((state) => ({ tasks: state.tasks.filter((t) => !Object.is(t, task)) }));
    },
}), Object.is);

export default useStore;