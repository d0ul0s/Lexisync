import React, { useState } from 'react';
import { Search, Filter, Download, ExternalLink, Loader2 } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, filter, setFilter }) {
  const filters = ['All', 'Noun', 'Verb', 'Adjective', 'Phrase'];
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/words`);
      const data = await res.json();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'lexisync-corpus.json';
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download dataset:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleViewAPI = () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/words`, '_blank');
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black border border-zinc-800 text-white text-base rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block pl-12 p-4 transition-all placeholder-zinc-600"
          placeholder="Search Binubolinao corpus..."
        />
      </div>
      
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-zinc-500" />
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-zinc-100 text-black'
                    : 'bg-black text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Export Button Group */}
        <div className="flex items-center border border-zinc-800 rounded-xl overflow-hidden bg-black shadow-sm">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-900 text-zinc-300 hover:text-emerald-400 text-sm font-medium transition-colors border-r border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>Download JSON</span>
          </button>
          <button
            onClick={handleViewAPI}
            className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-900 text-zinc-300 hover:text-emerald-400 text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View API</span>
          </button>
        </div>
      </div>
    </div>
  );
}
