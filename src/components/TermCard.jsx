export default function TermCard({ term, definition, category }) {
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Social':
        return 'bg-blue-500/10 border-blue-500 text-blue-400';
      case 'Brainrot':
        return 'bg-red-500/10 border-red-500 text-red-400';
      case 'Cultura':
        return 'bg-green-500/10 border-green-500 text-green-400';
      case 'Personalidade':
        return 'bg-purple-500/10 border-purple-500 text-purple-400';
      default:
        return 'bg-cyan-500/10 border-cyan-500 text-cyan-400';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-cyan-500 transition-all duration-300 shadow-xl group">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300">{term}</h2>
        <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${getCategoryColor(category)}`}>
          {category}
        </span>
      </div>
      <p className="text-slate-300 leading-relaxed italic">
        "{definition}"
      </p>
    </div>
  );
}