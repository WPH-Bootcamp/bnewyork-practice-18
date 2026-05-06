// =============================================================
// 01 — useReducer: COUNTER
// =============================================================
// CERITAIN KE MENTEE DULU (sebelum live coding):
//
//   Inget useState? Itu kayak "papan tulis ajaib" buat 1 nilai.
//   Bagus banget kalo state-nya sederhana (angka, teks, boolean).
//
//   Tapi kalo state mulai kompleks — banyak field yang berubah
//   bareng-bareng, atau ada banyak cara update-nya — kode bisa
//   berantakan kalo cuma pakai useState. Misal:
//
//     setCount(count + 1);
//     setLastAction("increment");
//     setHistory([...history, count]);
//
//   3 setState dipanggil bareng. Gampang lupa salah satu.
//
//   useReducer = "manajer state". Kita kasih dia DAFTAR PERINTAH
//   ("INCREMENT", "DECREMENT", dll), trus dia yang ngatur gimana
//   state berubah. Mirip kayak vending machine: kita pencet tombol
//   (action), mesin yang ngatur isi dalemannya (state).
//
// ANALOGI PALING GAMPANG (buat mentee non-tech):
//
//   useState  = remote TV cuma buat ON/OFF lampu kamar.
//   useReducer = remote TV multifungsi (volume, channel, mute, dll)
//                — semua perintah jelas terdaftar.
// =============================================================

import { useReducer } from "react";

// =====================
// 1) BIKIN TIPE STATE
// =====================
// Kita simpan 3 hal: count, history (semua nilai sebelumnya),
// dan lastAction (string buat label terakhir).
type CounterState = {
  count: number;
  history: number[];
  lastAction: string;
};

// =====================
// 2) BIKIN TIPE ACTION
// =====================
// Action = OBJEK PERINTAH. Wajib punya `type` (nama perintah).
// Bisa juga punya `payload` (data tambahan). Tipe union biar
// TypeScript ngecek auto-complete & ga ada typo.
type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "ADD_BY"; payload: number }; // contoh action dengan payload

// =====================
// 3) BIKIN REDUCER FUNCTION
// =====================
// reducer = function MURNI yang nerima 2 argumen:
//   (state lama, action) → state baru
//
// PENTING:
//   - Selalu return STATE BARU (jangan mutate state lama).
//   - 1 reducer = 1 "switchboard" untuk semua action.
//
// Coba bayangin: state = saldo bank lo, action = jenis transaksi.
// Reducer = teller yang ngitung saldo baru.
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  // Pakai `switch` biar rapi pas action-nya banyak.
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state, // copy field lain (history nanti diupdate)
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
      // action.payload udah otomatis ke-detect sebagai `number`
      // berkat discriminated union di atas. Keren kan TS-nya.
      return {
        ...state,
        count: state.count + action.payload,
        history: [...state.history, state.count + action.payload],
        lastAction: `+${action.payload}`,
      };

    case "RESET":
      // Balik ke state awal. Boleh hardcode di sini, atau
      // simpan const initialState terpisah trus return-nya.
      return { count: 0, history: [], lastAction: "reset" };

    // default penting biar reducer ga "diem doang" kalo action
    // ga ke-handle. Di TS dengan discriminated union ini ga akan
    // pernah ke-trigger, tapi tetep best practice.
    default:
      return state;
  }
}

// =====================
// 4) STATE AWAL
// =====================
const initialState: CounterState = {
  count: 0,
  history: [],
  lastAction: "(belum ada)",
};

export default function CounterReducer() {
  // =====================
  // 5) PANGGIL useReducer
  // =====================
  //
  //   const [state, dispatch] = useReducer(reducer, initialState);
  //          ↑       ↑                       ↑           ↑
  //    state skrng  function          reducer-nya   state awal
  //                 buat kirim
  //                 perintah
  //
  // `dispatch` itu kayak ngirim PESAN ke reducer.
  //   dispatch({ type: "INCREMENT" })
  //   ↑
  //   Reducer "denger" pesan ini, ngitung state baru,
  //   React re-render komponen otomatis.
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="space-y-3">
      {/* Tampilan utama: angka count */}
      <p className="text-3xl font-bold text-sky-400">Count: {state.count}</p>

      {/* Tombol-tombol → tiap tombol cuma "kirim pesan" ke reducer.
          Logic perubahan state-nya ga ada di sini, semuanya di reducer.
          Komponen jadi DUMB & FOKUS NAMPILIN. */}
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

        {/* Action dengan payload — tombol "Tambah 5" */}
        <button
          onClick={() => dispatch({ type: "ADD_BY", payload: 5 })}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-md font-semibold text-white"
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

      {/* Info tambahan: history & lastAction. Ini yg bikin
          mentee "Aha" — 3 state berubah BARENG dari 1 dispatch. */}
      <div className="mt-3 p-3 bg-slate-900 border border-slate-700 rounded-md text-sm">
        <p className="text-slate-300">
          Aksi terakhir:{" "}
          <span className="font-mono text-amber-400">{state.lastAction}</span>
        </p>
        <p className="text-slate-300 mt-1">
          History:{" "}
          <span className="font-mono text-amber-400">
            [{state.history.join(", ")}]
          </span>
        </p>
      </div>
    </div>
  );
}

// =============================================================
// 🧠 AHA MOMENT buat mentee:
// =============================================================
// 1. SATU dispatch → 3 perubahan state (count, history, lastAction)
//    konsisten & ga mungkin lupa salah satu.
//    Coba bayangin pakai useState — butuh 3 setState manual.
//
// 2. LOGIC TERPUSAT di reducer.
//    Komponen cuma "kirim pesan" (dispatch). Mau debug?
//    Cek 1 tempat aja: counterReducer.
//
// 3. ACTION = HISTORY APP LO.
//    Kita bisa log semua action yg pernah ke-dispatch. Ini fondasi
//    dari Redux DevTools, time-travel debugging, undo/redo, dll.
//
// 4. STATE LAMA TIDAK DI-MUTATE.
//    Tiap case selalu return OBJEK BARU dengan `{ ...state, ... }`.
//    Sama prinsip kayak immutability di useState.
//
// LIVE DEMO YANG WAJIB:
//   - Klik tombol +1, +1, +5, -1 berurutan.
//   - Tunjukin history bertambah, lastAction update otomatis.
//   - Tanya: "kalo pake useState, butuh berapa setState per klik?"
// =============================================================
