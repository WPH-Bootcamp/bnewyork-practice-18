import { useReducer } from "react";

type FormState = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  submitted: boolean;
  errors: string[];
};

//type action

type FormField = "name" | "email" | "password" | "role";

type FormAction =
  | { type: "SET_FIELD"; field: FormField; value: string }
  | { type: "SUBMIT" }
  | { type: "SET_ERRORS"; errors: string[] }
  | { type: "RESET" };

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  role: "user",
  submitted: false,
  errors: [],
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: [],
      };

    case "SET_ERRORS":
      return { ...state, errors: action.errors, submitted: false };

    case "SUBMIT":
      return { ...state, submitted: true, errors: [] };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function FormReducer() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errs: string[] = [];

    if (!state.name.trim()) errs.push("Nama wajib diisi");
    if (!state.email.includes("@")) errs.push("email tidak valid");
    if (state.password.length < 5) errs.push("Password minimal 5 karakter");

    if (errs.length) {
      dispatch({ type: "SET_ERRORS", errors: errs });
    } else {
      dispatch({ type: "SUBMIT" });
    }
  };

  if (state.submitted) {
    return (
      <div className="space-y-3">
        <div className="p-4 bg-emerald-900/40 border border-emerald-600 rounded-md">
          <p className="text-emerald-300 font-bold">✅ Pendaftaran berhasil!</p>
          <p className="text-sm text-slate-300 mt-2">
            Halo <strong>{state.name}</strong> ({state.role}) — kami kirim
            konfirmasi ke <strong>{state.email}</strong>
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white"
        >
          Daftar lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm text-slate-300 mb-1">Nama</label>
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "name",
              value: e.target.value,
            })
          }
          placeholder="Budi Santoso"
          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Email</label>
        <input
          type="email"
          value={state.email}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "email",
              value: e.target.value,
            })
          }
          placeholder="budi@email.com"
          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Password</label>
        <input
          type="password"
          value={state.password}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "password",
              value: e.target.value,
            })
          }
          placeholder="min. 6 karakter"
          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-1">Role</label>
        <select
          value={state.role}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "role",
              value: e.target.value,
            })
          }
          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md text-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {state.errors.length > 0 && (
        <ul className="p-3 bg-red-900/40 border border-red-600 rounded-md text-sm text-red-300 list-disc list-inside">
          {state.errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white"
        >
          Daftar
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold text-white"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
