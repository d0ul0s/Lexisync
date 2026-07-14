import React, { useEffect, useRef } from 'react';
import WordCard from './WordCard';
import { Loader2 } from 'lucide-react';

export default function WordFeed({ words, username, onRequireAuth, onLoadMore, hasMore, isLoading }) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  if (words.length === 0 && !isLoading) {
    return (
      <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
        <p className="text-zinc-500 text-lg">No words found in the corpus.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-8">
      {words.map((word) => (
        <WordCard key={word._id || word.id} wordData={word} username={username} onRequireAuth={onRequireAuth} />
      ))}
      
      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="h-4 w-full" />
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      )}
      
      {/* End of list message */}
      {!hasMore && words.length > 0 && (
        <div className="text-center py-8">
          <p className="text-zinc-500 text-sm">You've reached the end of the corpus.</p>
        </div>
      )}
    </div>
  );
}
