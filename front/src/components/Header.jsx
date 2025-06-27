import React, { useState, useRef } from 'react';
import { useParams } from 'react-router';

const tabs = [
  { name: 'Home', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/signin' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {

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
    <div className="not-prose relative overflow-hidden rounded-xl border bg-background p-0">
      <header className="w-full p-2 flex justify-center">
        <ul className="relative flex rounded-full border p-1.5">
          {tabs.map((tab, index) => (
            <li
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              className="z-10 block cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary text-primary/60 tracking-tight relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <a href={tab.href}>{tab.name}</a>
            </li>
          ))}

          {/* Floating highlight */}
          <div
            className="absolute rounded-full bg-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              left: highlightStyle.left,
              width: highlightStyle.width,
              opacity: highlightStyle.opacity,
              top: '6px',
              height: 'calc(100% - 12px)',
            }}
          />
        </ul>
      </header>
    </div>
  );
};

export default Header;
