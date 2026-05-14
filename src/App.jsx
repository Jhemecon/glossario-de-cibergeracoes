import { useState, useEffect, useRef } from 'react';
import { terms } from './data/terms';
import TermCard from './components/TermCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Obter categorias únicas
  const categories = ['Todas', ...new Set(terms.map(term => term.category))];

  const filteredTerms = (isSearching
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
      }))
    .filter((item) => selectedCategory === 'Todas' || item.category === selectedCategory)
    .sort((a, b) => {
      if (sortAlphabetical) {
        return a.term.localeCompare(b.term);
      }
      return 0;
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
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <header className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 px-2 sm:px-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 py-2">
          GLOSSÁRIO DAS CIBERGERAÇÕES
        </h1>
        <p className="text-slate-400 text-base sm:text-lg font-light mb-6 sm:mb-8">
          Entender gerações para bater de frente com o choque geracional.
        </p>
        
        <div className="relative max-w-3xl mx-auto" ref={filterRef}>
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
            className="w-full pl-6 pr-20 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:outline-none text-slate-100 placeholder-slate-500 transition-all duration-300"
          />
          
          {/* Botão de filtro */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-md transition-all duration-300 ${
              showFilters ? 'text-cyan-400 bg-slate-700' : 'text-slate-400 hover:text-cyan-400'
            }`}
            aria-label="Abrir filtros"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
          
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="Limpar busca"
            >
              ✕
            </button>
          )}

          {/* Dropdown de filtros */}
          {showFilters && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-xl z-10">
              <div className="space-y-4">
                {/* Ordem alfabética */}
                <div className="flex items-center justify-between">
                  <label htmlFor="sort-alpha" className="text-slate-300 text-sm font-medium">
                    Ordem alfabética
                  </label>
                  <button
                    id="sort-alpha"
                    onClick={() => setSortAlphabetical(!sortAlphabetical)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                      sortAlphabetical
                        ? 'bg-cyan-500 text-slate-900'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {sortAlphabetical ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Filtro por categoria */}
                <div className="flex items-center justify-between">
                  <label htmlFor="category-filter" className="text-slate-300 text-sm font-medium">
                    Categoria
                  </label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 rounded bg-slate-700 border border-slate-600 focus:border-cyan-500 focus:outline-none text-slate-100 text-xs transition-all duration-300"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} className="bg-slate-700 text-slate-100">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-2 sm:px-0">
        {filteredTerms.length > 0 ? (
          <>
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-slate-400 text-base sm:text-lg">
                {filteredTerms.length} de {terms.length} termos
              </p>
            </div>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="text-center py-16 px-4 sm:px-0">
            <div className="text-5xl sm:text-6xl mb-4">🔍</div>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
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