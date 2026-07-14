import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WordFeed from './components/WordFeed';
import Leaderboard from './components/Leaderboard';
import ContributionModal from './components/ContributionModal';
import AuthModal from './components/AuthModal';
import { Plus } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [words, setWords] = useState([]);
  const [username, setUsername] = useState('');
  
  // Pagination & Backend Fetching State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalWords, setTotalWords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Check for existing login session
  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) setUsername(savedUser);
  }, []);

  // Debounce search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 whenever search or filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, filter]);

  // Fetch words from backend
  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/words?page=${page}&limit=20&search=${encodeURIComponent(debouncedSearchTerm)}&filter=${encodeURIComponent(filter)}`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.words)) {
          setWords(prev => page === 1 ? data.words : [...prev, ...data.words]);
          setHasMore(data.hasMore);
          setTotalWords(data.total);
        } else if (Array.isArray(data)) {
          // Fallback just in case backend hasn't restarted yet
          setWords(data);
          setHasMore(false);
          setTotalWords(data.length);
        }
      })
      .catch(err => console.error("Error fetching words:", err))
      .finally(() => setIsLoading(false));
  }, [page, debouncedSearchTerm, filter]);

  const handleContribute = async (newWordData) => {
    if (!username) {
      console.error("Must be logged in to contribute.");
      return;
    }

    const payload = {
      binubolinaoWord: newWordData.word,
      partOfSpeech: newWordData.pos,
      englishMeaning: newWordData.translation,
      exampleSentenceBinubolinao: newWordData.exampleNative,
      exampleSentenceEnglish: newWordData.exampleTranslation,
      submittedBy: username
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/words`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const savedWord = await res.json();
        setWords([savedWord, ...words]);
      }
    } catch (err) {
      console.error("Error saving word:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-zinc-700 pb-[max(5rem,env(safe-area-inset-bottom))]">
      <Header 
        username={username} 
        onOpenAuth={() => setIsAuthModalOpen(true)} 
        onLogout={handleLogout} 
      />

      <main className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              filter={filter} 
              setFilter={setFilter} 
              onExport={() => window.open(`${import.meta.env.VITE_API_URL}/api/words`, '_blank')}
            />
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Corpus Results</h2>
              <span className="text-sm font-medium text-zinc-500">{totalWords} words found</span>
            </div>

            <WordFeed 
              words={words} 
              username={username} 
              onRequireAuth={() => setIsAuthModalOpen(true)} 
              onLoadMore={() => setPage(p => p + 1)}
              hasMore={hasMore}
              isLoading={isLoading}
            />
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            
            {/* Contribute CTA */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Know a Binubolinao word?</h3>
              <p className="text-sm text-zinc-400 mb-6">Contribute to the dictionary and help preserve the language.</p>
              <button 
                onClick={() => username ? setIsModalOpen(true) : setIsAuthModalOpen(true)}
                className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-xl transition-colors shadow-lg shadow-white/5"
              >
                Add New Word
              </button>
            </div>

            <Leaderboard />
            
          </div>
        </div>
      </main>

      <ContributionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleContribute}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(name) => setUsername(name)}
      />
    </div>
  );
}

export default App;
