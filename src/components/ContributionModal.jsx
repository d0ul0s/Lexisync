import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

export default function ContributionModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    word: '',
    pos: 'Noun',
    translation: '',
    exampleNative: '',
    exampleTranslation: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ word: '', pos: 'Noun', translation: '', exampleNative: '', exampleTranslation: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg max-h-[85dvh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Contribute a Word</h2>
            <p className="text-sm text-zinc-400 mt-1">Help grow the Binubolinao corpus.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-300">Binubolinao Word</label>
              <input
                required
                type="text"
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="e.g. Mapteng"
                value={formData.word}
                onChange={e => setFormData({...formData, word: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-300">Part of Speech</label>
              <select
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors appearance-none"
                value={formData.pos}
                onChange={e => setFormData({...formData, pos: e.target.value})}
              >
                <option value="Noun">Noun</option>
                <option value="Verb">Verb</option>
                <option value="Adjective">Adjective</option>
                <option value="Adverb">Adverb</option>
                <option value="Pronoun">Pronoun</option>
                <option value="Phrase">Phrase</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-zinc-300">English Meaning</label>
            <input
              required
              type="text"
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="e.g. Beautiful, good"
              value={formData.translation}
              onChange={e => setFormData({...formData, translation: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-zinc-300">Example Sentence (Binubolinao)</label>
            <textarea
              required
              rows={2}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
              placeholder="Write a sentence using the word..."
              value={formData.exampleNative}
              onChange={e => setFormData({...formData, exampleNative: e.target.value})}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-zinc-300">Sentence Translation (English)</label>
            <textarea
              required
              rows={2}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
              placeholder="Translate the sentence..."
              value={formData.exampleTranslation}
              onChange={e => setFormData({...formData, exampleTranslation: e.target.value})}
            />
          </div>

          <div className="mt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-[0_0_20px_rgba(52,211,153,0.2)] hover:shadow-[0_0_25px_rgba(52,211,153,0.3)]"
            >
              <Send className="w-5 h-5" />
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
