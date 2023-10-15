import { useState } from "react"

type DataT = {
    data: Record<string, string>
}

enum ButtonStateE {
    DEFAULT = "DEFAULT",
    SELECTED = "SELECTED",
    WRONG = "WRONG",
  }

type OptionT = {
    value: string;
    state: ButtonStateE
}

function shuffle() {
    return Math.random() - .5
}

function getClassName(opt: OptionT): string {
    switch (opt.state) {
      case ButtonStateE.SELECTED:
        return "selected";
      case ButtonStateE.WRONG:
        return "wrong";
      default:
        return "";
    }
  }

function isPair(innerOpt: OptionT, selected: OptionT, option: OptionT) {
    return innerOpt.value === selected.value || innerOpt.value === option.value
}

export default function Game({ data }: DataT) {
    const cities = Object.keys(data);
    const capitals = Object.values(data);
    const [options, setOptions] = useState<OptionT[]>(
        [...cities, ...capitals].sort(shuffle).map((value) => ({
            value,
            state: ButtonStateE.DEFAULT,
        }))
    );
    const [selected, setSelected] = useState<OptionT | undefined>();
    const gameOver = options.length === 0;

    function btnClick(opt: OptionT, index: number) {
        if (!selected) {
            setSelected(opt);
            setOptions((prevOptions) =>
                prevOptions.map((o, i) => ({
                    ...o,
                    state: i === index ? ButtonStateE.SELECTED : ButtonStateE.DEFAULT,
                }))
            );
        } else {
            const capital = data[opt.value];
            const selectedCapital = data[selected.value]
            if (selected.value === capital || selectedCapital === opt.value) {
                setOptions((prevOptions) =>
                    prevOptions.filter((innerOpt) => !isPair(innerOpt, selected, opt))
                );
            } else {
                setOptions(
                    options.map((innerOpt) => ({
                        ...innerOpt,
                        state: isPair(innerOpt, selected, opt) ? ButtonStateE.WRONG : opt.state
                    }))
                );
            }
            setSelected(undefined);
        }
    }

    return (
        <div className="flexApp">
            {options.map((opt, index) => (
                <button
                    key={opt.value}
                    className={getClassName(opt)}
                    onClick={() => btnClick(opt, index)}
                >
                    {opt.value}
                </button>
            ))}
            {gameOver && <h2 style={{margin:"auto"}}>FINISHED</h2>}
        </div>
    );
}
