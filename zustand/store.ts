import { create } from "zustand";
import { Task, TaskState } from "./src/types"


interface StoreState {
    tasks: Task[];
  }
  
  interface StoreActions {
    addTask: (task: Task) => void;
  }
  const useStore = create<StoreState & StoreActions>((set) => ({
    tasks: [{ title: "TestTask", state: TaskState.PLANNED }],
  
    addTask: (task: Task) => {
      set((state) => ({ tasks: [...state.tasks, task] }));
    },
  }));
  
  export default useStore;