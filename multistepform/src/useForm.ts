import { ReactElement, useState } from "react";


export function useForm(steps: ReactElement[]) {
    const [currIdx, setCurrIdx] = useState(2);

    const isFirstStep:boolean = currIdx === 0;
    const isLastStep:boolean = currIdx === steps.length - 1;

    function next() {
        setCurrIdx(i => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        })
    }

    function prev() {
        setCurrIdx(i => {
            if (i === 0) return i;
            return i - 1;
        })
    }

    function goTo(index: number) {
        setCurrIdx(index)
    }

    return {
        currIdx,
        step: steps[currIdx],
        steps,
        next,
        prev,
        goTo,
        isFirstStep,
        isLastStep
    }
}