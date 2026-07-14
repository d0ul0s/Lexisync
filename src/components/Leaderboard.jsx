import React, { useState, useEffect } from 'react';
import { Trophy, Medal } from 'lucide-react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/words/leaderboard`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLeaders(data);
        }
      })
      .catch(err => console.error('Failed to fetch leaderboard:', err));
  }, []);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-bold text-white tracking-tight">Top Contributors</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {leaders.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center py-4">No contributions yet.</p>
        ) : (
          leaders.map((user, index) => (
            <div key={user.username} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                  index === 1 ? 'bg-zinc-300/20 text-zinc-300' :
                  index === 2 ? 'bg-amber-700/20 text-amber-600' :
                  'bg-zinc-800 text-zinc-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{user.username}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-400">{user.count}</span>
                <span className="text-xs text-zinc-600 ml-1">words</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <button className="w-full mt-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold text-zinc-300 transition-colors">
        View Full Rankings
      </button>
    </div>
  );
}
