import { TaskT, TaskStateT } from "./src/types"
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from 'zustand/middleware';

export interface StoreStateT {
  tasks: TaskT[];
  addTask: (task: TaskT) => void;
  removeTask: (task: TaskT) => void;
  removeTask2: (task: TaskT) => void;
  draggedTask: null | TaskT;
  setDraggedTask: (task: TaskT | null) => void;
  moveTask: (task: TaskT) => void;
}

const useStore = createWithEqualityFn<StoreStateT>()(
  devtools(
    persist(
      (set) => ({
        tasks: [
          { title: "Test 1", state: TaskStateT.PLANNED },
          { title: "Test 2", state: TaskStateT.ONGOING },
          { title: "Test 3", state: TaskStateT.DONE },
        ],
        draggedTask: null as TaskT | null,
        setDraggedTask: (task: TaskT | null) => set({ draggedTask: task }),
        moveTask: (task) =>
          set((store) => {
            const updatedTasks = store.tasks.map((t) =>
              t.title === task.title ? { ...t, state: task.state } : t
            );
            return { tasks: updatedTasks };
          }),

        addTask: (task: TaskT) => {
          set((state) => ({ tasks: [...state.tasks, task] }), false, "addTask");
        },
        removeTask: (task: TaskT) => {
          set((state) => ({ tasks: state.tasks.filter((t) => t.title !== task.title) }));
        },
        removeTask2: (task: TaskT) => {
          set((state) => ({ tasks: state.tasks.filter((t) => !Object.is(t, task)) }));
        },
      }),
      {
        name: 'zustand',
      }
    ),
  )
);

export default useStore;