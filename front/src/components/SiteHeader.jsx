import React from "react";

const SiteHeader = () => (
  <header className="w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm fixed top-0 left-0 z-30">
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-blue-600 tracking-tight">📝 NoteNest</span>
        <span className="hidden md:inline text-sm text-blue-400 ml-2 font-medium animate-fade-in-slow">Your magical note space</span>
      </div>
      <nav className="flex gap-6 text-base font-semibold">
        <a href="/" className="text-blue-600 hover:text-blue-800 transition">Home</a>
        <a href="/dashboard" className="text-blue-600 hover:text-blue-800 transition">Dashboard</a>
        <a href="/about" className="text-blue-600 hover:text-blue-800 transition">About</a>
      </nav>
    </div>
  </header>
);

export default SiteHeader;
