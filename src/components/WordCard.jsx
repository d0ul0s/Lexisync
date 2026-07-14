import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Quote } from 'lucide-react';

export default function WordCard({ wordData, username, onRequireAuth }) {
  // If arrays are missing (e.g. from a mocked local word), default to 0
  const initialUpvotes = Array.isArray(wordData.upvotes) ? wordData.upvotes : typeof wordData.upvotes === 'number' ? new Array(wordData.upvotes).fill('anon') : [];
  const initialDownvotes = Array.isArray(wordData.downvotes) ? wordData.downvotes : typeof wordData.downvotes === 'number' ? new Array(wordData.downvotes).fill('anon') : [];
  
  const [upvoteCount, setUpvoteCount] = useState(initialUpvotes.length);
  const [downvoteCount, setDownvoteCount] = useState(initialDownvotes.length);
  
  const [userVote, setUserVote] = useState(
    initialUpvotes.includes(username) ? 'up' : initialDownvotes.includes(username) ? 'down' : null
  );

  const handleUpvote = async () => {
    if (!username) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    // Optimistic UI update
    if (userVote === 'up') {
      setUserVote(null);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUserVote('up');
      setUpvoteCount(upvoteCount + 1);
      if (userVote === 'down') {
        setDownvoteCount(downvoteCount - 1);
      }
    }

    // Persist to backend if real database word
    if (wordData._id) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/words/${wordData._id}/vote`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voteType: 'upvote', username })
        });
      } catch (err) {
        console.error("Failed to upvote:", err);
      }
    }
  };

  const handleDownvote = async () => {
    if (!username) {
      if (onRequireAuth) onRequireAuth();
      return;
    }

    // Optimistic UI update
    if (userVote === 'down') {
      setUserVote(null);
      setDownvoteCount(downvoteCount - 1);
    } else {
      setUserVote('down');
      setDownvoteCount(downvoteCount + 1);
      if (userVote === 'up') {
        setUpvoteCount(upvoteCount - 1);
      }
    }

    // Persist to backend if real database word
    if (wordData._id) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/words/${wordData._id}/vote`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ voteType: 'downvote', username })
        });
      } catch (err) {
        console.error("Failed to downvote:", err);
      }
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)] group relative overflow-hidden">
      
      {/* Main Content */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {wordData.binubolinaoWord || wordData.word}
          </h2>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase tracking-widest">
            {wordData.partOfSpeech || wordData.pos}
          </span>
        </div>
        
        <p className="text-zinc-200 text-lg leading-relaxed mb-5">
          {wordData.englishMeaning || wordData.translation}
        </p>
        
        {(wordData.exampleSentenceBinubolinao || wordData.exampleNative) && (
          <div className="pl-4 border-l-2 border-zinc-700 space-y-1.5">
            <p className="text-white/90 italic text-[0.95rem] leading-relaxed">
              "{wordData.exampleSentenceBinubolinao || wordData.exampleNative}"
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {wordData.exampleSentenceEnglish || wordData.exampleTranslation}
            </p>
          </div>
        )}
      </div>

      {/* Action Bar (Voting) */}
      <div className="flex items-center gap-2 pt-4 border-t border-zinc-800/50">
        <button 
          onClick={handleUpvote}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
            userVote === 'up' 
              ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20' 
              : 'text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 border border-transparent'
          }`}
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          <span className="font-semibold text-sm">{upvoteCount}</span>
        </button>
        
        <button 
          onClick={handleDownvote}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
            userVote === 'down' 
              ? 'text-rose-500 bg-rose-500/10 border border-rose-500/20' 
              : 'text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 border border-transparent'
          }`}
        >
          <ArrowDown className="w-4 h-4 stroke-[2.5]" />
          <span className="font-semibold text-sm">{downvoteCount}</span>
        </button>
      </div>

    </div>
  );
}
