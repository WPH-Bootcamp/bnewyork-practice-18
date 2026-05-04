import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3">
      <p>Count: {count}</p>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white"
        >
          +1
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold text-white"
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
