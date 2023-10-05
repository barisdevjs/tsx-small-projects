export enum TaskStateT {
    PLANNED = 'PLANNED',
    ONGOING = 'ONGOING',
    DONE = 'DONE',
}

export interface TaskT {
    state: TaskStateT;
    title: string;
}