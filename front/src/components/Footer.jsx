import React from "react";

const Footer = () => (
  <footer className="w-full bg-white/80 backdrop-blur border-t border-blue-100 shadow-inner mt-16 z-30">
    <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold text-blue-600">NoteNest</span>
        <span className="hidden md:inline">
          © {new Date().getFullYear()} All rights reserved.
        </span>
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          GitHub
        </a>
        <a
          href="/privacy"
          className="hover:text-blue-600 transition"
        >
          Privacy
        </a>
        <a
          href="/terms"
          className="hover:text-blue-600 transition"
        >
          Terms
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
