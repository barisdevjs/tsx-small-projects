import useStore, { StoreStateT } from './store';
import { TaskStateT, TaskT } from './src/types';
import { shallow } from 'zustand/shallow';
import React from 'react';

function Temp({ state }: { state: TaskStateT }) {
    const tasks = useStore((store: StoreStateT) => store.tasks.filter((t: TaskT) => t.state === state), shallow);

    return (
        <div style={{color:"white"}}>
            Temp
            {JSON.stringify(tasks)}
        </div>
    );
}

export default Temp;