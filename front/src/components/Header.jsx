import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Courses', href: '/getCourses' },
  { name: 'Add Course', href: '/course' },
  { name: 'Admin', href: '/admin' },
];

const Header = () => {
  const { logout, user } = useAuth();
  const [hoveredTab, setHoveredTab] = useState(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const ref = tabRefs.current[index];
    if (ref) {
      const { offsetLeft, offsetWidth } = ref;
      setHighlightStyle({ left: offsetLeft, width: offsetWidth, opacity: 1 });
      setHoveredTab(index);
    }
  };
  const handleMouseLeave = () => {
    setHighlightStyle({ left: 0, width: 0, opacity: 0 });
    setHoveredTab(null);
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm fixed top-0 left-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">📝 NoteNest</span>
          <span className="hidden md:inline text-sm text-blue-400 ml-2 font-medium animate-fade-in-slow">Your magical note space</span>
        </div>
        <nav className="relative flex rounded-full border border-blue-100 bg-white/70 p-1.5 shadow-md">
          <ul className="relative flex items-center gap-1">
            {tabs.map((tab, index) => (
              <li
                key={index}
                ref={(el) => (tabRefs.current[index] = el)}
                className="z-10 block cursor-pointer px-4 py-2 text-base font-semibold transition-colors duration-200 hover:text-blue-700 text-blue-600/70 tracking-tight relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <a href={tab.href}>{tab.name}</a>
              </li>
            ))}
           
            {user && (
              <li
                onClick={logout}
                className="z-10 block cursor-pointer px-4 py-2 text-base font-semibold transition-colors duration-200 hover:text-pink-600 text-pink-500/80 tracking-tight relative"
              >
                Log Out
              </li>
            )}
            {/* Floating highlight */}
            <div
              className="absolute rounded-full bg-blue-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow"
              style={{
                left: highlightStyle.left,
                width: highlightStyle.width,
                opacity: highlightStyle.opacity,
                top: '6px',
                height: 'calc(100% - 12px)',
              }}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
