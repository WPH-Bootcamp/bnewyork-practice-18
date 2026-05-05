import { createContext, useContext, useState } from "react";

// tanpa useContext
function UserBadgeOld({ username }: { username: string }) {
  return (
    <span className="px-2 py-1 bg-yellow-500 text-slate-900 rounded text-xs font-bold">
      {username}
    </span>
  );
}

function MenuOld({ username }: { username: string }) {
  return (
    <div className="p-2 bg-blue-900 rounded">
      <p className="text-xs text-slate-400 mb-1">Menu (cuma lewat doang)</p>
      <UserBadgeOld username={username} />
    </div>
  );
}

function SidebarOld({ username }: { username: string }) {
  return (
    <div className="p-2 rounded bg-pink-500">
      <p className="text-xs text-slate-400 mb-1">Sidebar (props hanya lewat)</p>
      <MenuOld username={username} />
    </div>
  );
}

function LayoutOld({ username }: { username: string }) {
  return (
    <div className="p-2 bg-slate-900 rounded border border-red-700/50">
      <p className="text-x text-red-400 mb-1">
        Layout (cuma lewat doang) - Prop Driling
      </p>
      <SidebarOld username={username} />
    </div>
  );
}

// menggunakan useContext
const UserContext = createContext<string | null>(null);

function UserBadgeNew() {
  const username = useContext(UserContext);
  return (
    <span className="px-2 py-1 bg-emerald-500 text-slate-900 rounded text-xs font-bold">
      {username}
    </span>
  );
}

function MenuNew() {
  return (
    <div className="p-2 bg-slate-700 rounded">
      <p className="text-xs text-slate-400 mb-1">Menu (cuma lewat doang)</p>
      <UserBadgeNew />
    </div>
  );
}

function SidebarNew() {
  return (
    <div className="p-2 bg-slate-800 rounded">
      <p className="text-xs text-slate-400 mb-1">Menu</p>
      <MenuNew />
    </div>
  );
}

function LayoutNew() {
  return (
    <div className="p-2 bg-slate-900 rounded border border-emerald-700/50">
      <p className="text-xs text-green-400 mb-1">
        Layout (cuma lewat doang) - Prop Driling
      </p>
      <SidebarNew />
    </div>
  );
}

export default function IntroContext() {
  const [username, setUsername] = useState("Budi");

  return (
    <div className="spac-y-4">
      {/* button ganti username */}
      <div className="flex flex-wrap gap-2">
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold text-white"
          onClick={() => setUsername("Budi")}
        >
          Set: Budi
        </button>
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold text-white"
          onClick={() => setUsername("Henry")}
        >
          Set: Henry
        </button>
        <button
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold text-white"
          onClick={() => setUsername("Rivardo")}
        >
          Set: Rivardo
        </button>
      </div>

      {/* kiri = cara salah (props driling), kanan = cara benar (useContext) */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* kiri = cara salah */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-red-400 font-bold">
            Tanpa Context
          </p>

          <div className="text-xs text-slate-400 mb-1">
            Tiap lapisan parent component wajib menerima props username
          </div>
          <LayoutOld username={username} />
        </div>

        {/* kanan = cara benar */}

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-green-400 font-bold">
            Dengan context
          </p>
          <div className="text-xs text-slate-400 mb-1">
            Menggunakn Provider, jadi semua component bisa langsung terima
          </div>

          <UserContext.Provider value={username}>
            <LayoutNew />
          </UserContext.Provider>
        </div>
      </div>

      <div className="p-3 bg-slate-900 border border-slate-700 rounded-md text-xs text-slate-300">
        sumber data sama, cara kirim nya yang beda
      </div>
    </div>
  );
}
