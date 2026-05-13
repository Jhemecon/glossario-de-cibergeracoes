export default function TermCard({ term, definition, category }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-cyan-500 transition-all duration-300 shadow-xl group">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300">{term}</h2>
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-slate-300 rounded-full">
          {category}
        </span>
      </div>
      <p className="text-slate-300 leading-relaxed italic">
        "{definition}"
      </p>
    </div>
  );
}