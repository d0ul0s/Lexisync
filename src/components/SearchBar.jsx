import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, filter, setFilter, onExport }) {
  const filters = ['All', 'Noun', 'Verb', 'Adjective'];

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 text-white text-base rounded-xl focus:ring-2 focus:ring-zinc-700 focus:border-zinc-700 block pl-12 p-4 transition-all placeholder-zinc-500"
          placeholder="Search Binubolinao corpus..."
        />
      </div>
      
      {/* Filters and Export */}
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
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Export Button */}
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-full text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Dataset</span>
          </button>
        )}
      </div>
    </div>
  );
}
