import Counter from "./01-use-state";
import CounterReducer from "./02-use-reducer";
import "./index.css";

type LessonProps = {
  title: string;
  desc: string;
  children: React.ReactNode;
};

function Lesson({ title, desc, children }: LessonProps) {
  return (
    <section className="mb-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
      <h2 className="text-xl text-blue-400 font-bold mb-1">{title}</h2>
      <p className="text-sm text-slate-400 mb-4">{desc}</p>
      <div className="p-4 bg-slate-900 rounded-lg border border-dashed border-slate-600">
        {children}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-5">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          ⚡ Meet 17 — State & Rendering
        </h1>
        <p className="text-slate-400 mb-8">
          Komponen React yang <em>hidup</em>: bisa inget data, respon interaksi
          user, dan otomatis update tampilan.
        </p>

        <Lesson title="Use State" desc="manage state">
          <Counter />
        </Lesson>

        <Lesson title="Belajar Use Reducer" desc="Use Reducer">
          <CounterReducer />
        </Lesson>
      </div>
    </div>
  );
}

export default App;
