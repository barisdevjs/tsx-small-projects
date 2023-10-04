export enum TaskState {
    PLANNED = 'PLANNED',
    ONGOING = 'ONGOING',
    DONE = 'DONE',
}

export interface Task {
    state: TaskState;
    title: string;
}