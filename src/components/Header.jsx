import React from 'react';


export default function Header({ username, onOpenAuth, onLogout }) {
  return (
    <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-800 p-1.5 rounded-lg flex items-center justify-center">
            <img src="/logo.svg" alt="LexiSync Logo" className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">LexiSync</h1>
            <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase">Binubolinao</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {username ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm font-semibold text-emerald-400">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-zinc-300 hidden sm:block">{username}</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
