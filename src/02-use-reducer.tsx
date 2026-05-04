import { useReducer } from "react";

//step 1, bikin type state
type CounterState = {
  count: number;
  history: number[];
  lastAction: string;
};

//step 2, bikin type action

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "ADD_BY"; payload: number };

//step 3, render function

//(state lama, action) -> state baru
//tidak boleh mengubah data/state lama

function counterReducer(
  state: CounterState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, state.count + 1],
        lastAction: "+1",
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count - 1],
        lastAction: "-1",
      };

    case "ADD_BY":
      return {
        ...state,
        count: state.count + action.payload,
        history: [...state.history, state.count + action.payload],
        lastAction: `+${action.payload}`,
      };

    case "RESET":
      return {
        count: 0,
        history: [],
        lastAction: "reset",
      };

    default:
      return state;
  }
}

//state awal
const initialState: CounterState = {
  count: 0,
  history: [],
  lastAction: "(belom ada)",
};

export default function CounterReducer() {
  // DISPATCH({TYPE:"INCREMENT"})
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="space-y-3">
      <p className="text-3xl font-bold text-sky-400">{state.count}</p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white"
        >
          +1
        </button>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold text-white"
        >
          -1
        </button>
        <button
          onClick={() => dispatch({ type: "ADD_BY", payload: 5 })}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold text-white"
        >
          +5
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-white"
        >
          Reset
        </button>
      </div>

      <div className="mt-3 p-3 bg-slate-900 border border-slate-700 rounded-md text-sm">
        <p className="text-slate-300">
          Aksi terakhir:{" "}
          <span className="text-yellow-300">{state.lastAction}</span>
        </p>
        <p className="text-slate-300 mt-1">
          History{" "}
          <span className="text-yellow-300">[{state.history.join(", ")}]</span>
        </p>
      </div>
    </div>
  );
}
