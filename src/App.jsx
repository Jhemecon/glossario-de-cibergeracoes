import { useState } from 'react';
import { terms } from './data/terms';
import TermCard from './components/TermCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredTerms = isSearching
    ? terms.filter(
        (item) => item.term.toLowerCase() === searchTerm.toLowerCase()
      )
    : terms.filter((item) => {
        const search = searchTerm.toLowerCase();
        return (
          item.term.toLowerCase().includes(search) ||
          item.definition.toLowerCase().includes(search) ||
          item.category.toLowerCase().includes(search)
        );
      });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsSearching(true);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <header className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 py-2">
          GLOSSÁRIO DAS CIBERGERAÇÕES
        </h1>
        <p className="text-slate-400 text-xl font-light mb-8">
          Entender gerações para bater de frente com o choque geracional.
        </p>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar termo, definição ou categoria... (Enter para busca exata)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearching(false);
            }}
            onKeyDown={handleKeyDown}
            aria-label="Campo de busca para termos, definições ou categorias"
            className="w-full px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:outline-none text-slate-100 placeholder-slate-500 transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {filteredTerms.length > 0 ? (
          <>
            <div className="text-center mb-8">
              <p className="text-slate-400 text-lg">
                {filteredTerms.length} de {terms.length} termos
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTerms.map((item) => (
                <TermCard 
                  key={item.term} 
                  term={item.term} 
                  definition={item.definition} 
                  category={item.category} 
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-400 text-xl">
              Nenhum termo encontrado para "<span className="text-cyan-400">{searchTerm}</span>"
            </p>
          </div>
        )}
      </main>

      <footer className="text-center mt-20 pb-10 text-slate-600 border-t border-slate-800 pt-8">
        <p>Projeto Acadêmico (Inglês Instrumental) — Jhemeson, Júlio, Carlos</p>
      </footer>
    </div>
  );
}

export default App;