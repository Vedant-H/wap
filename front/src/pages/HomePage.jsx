import React from 'react'
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
// If you have a Globe or other MagicUI component, import it here
// import { Globe } from '@/components/ui/globe';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen top-16   bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-12 animate-fade-in overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-40 z-0 animate-float-slow" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-40 z-0 animate-float-slow2" />
      {/* If you have a Globe or other MagicUI component, you can add it here */}
      {/* <div className="absolute left-0 right-0 mx-auto top-10 z-0 opacity-60 max-w-xl pointer-events-none">
        <Globe />
      </div> */}
      <section className="w-full max-w-3xl text-center flex flex-col items-center gap-8 z-10 relative">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg animate-slide-down">
          Welcome to <span className="text-blue-600">NoteNest</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 font-medium animate-fade-in-slow">
          Effortlessly create, organize, and manage your notes in one beautiful, secure place.<br/>
          Stay productive, stay organized, and never lose a thought again.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-4 animate-fade-in-slow">
          <Button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate(user ? `/dashboard/${user.id}` : '/login')}
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-50"
            onClick={() => window.open('https://github.com/', '_blank')}
          >
            Learn More
          </Button>
        </div>
        {/* Animated illustration */}
        <div className="w-full flex justify-center mt-8 animate-float">
          <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl">
            <rect x="20" y="40" width="280" height="100" rx="20" fill="#fff" className="shadow-lg"/>
            <rect x="40" y="60" width="80" height="16" rx="8" fill="#a5b4fc"/>
            <rect x="40" y="90" width="180" height="12" rx="6" fill="#c7d2fe"/>
            <rect x="40" y="110" width="120" height="12" rx="6" fill="#c7d2fe"/>
            <rect x="180" y="60" width="80" height="16" rx="8" fill="#f472b6"/>
            <rect x="230" y="90" width="60" height="12" rx="6" fill="#fbcfe8"/>
            <rect x="180" y="110" width="60" height="12" rx="6" fill="#fbcfe8"/>
            <rect x="120" y="130" width="80" height="8" rx="4" fill="#e0e7ff"/>
          </svg>
        </div>
        {/* Fun fact or testimonial */}
        <div className="mt-8 animate-fade-in-slow">
          <blockquote className="italic text-gray-500 text-lg max-w-xl mx-auto">
            “The best way to capture ideas is to write them down. NoteNest makes it magical.”
          </blockquote>
          <div className="mt-2 text-sm text-gray-400">— Your Productivity, Upgraded</div>
        </div>
        {/* Feature highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-fade-in-slow">
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center gap-2 border border-blue-100">
            <span className="text-3xl">📝</span>
            <div className="font-bold text-blue-700">Rich Text Notes</div>
            <div className="text-gray-500 text-sm">Format, highlight, and organize your notes with ease.</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center gap-2 border border-purple-100">
            <span className="text-3xl">🔒</span>
            <div className="font-bold text-purple-700">Private & Secure</div>
            <div className="text-gray-500 text-sm">Your notes are encrypted and only accessible by you.</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow-lg p-6 flex flex-col items-center gap-2 border border-pink-100">
            <span className="text-3xl">⚡</span>
            <div className="font-bold text-pink-700">Lightning Fast</div>
            <div className="text-gray-500 text-sm">Instant sync and access across all your devices.</div>
          </div>
        </div>
      </section>
      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s ease; }
        .animate-fade-in-slow { animation: fadeIn 1.5s 0.3s both; }
        .animate-slide-down { animation: slideDown 1s cubic-bezier(.23,1.01,.32,1) 0.2s both; }
        .animate-float { animation: float 3s ease-in-out infinite alternate; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite alternate; }
        .animate-float-slow2 { animation: floatSlow2 10s ease-in-out infinite alternate; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInSlow { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { from { transform: translateY(0); } to { transform: translateY(-16px); } }
        @keyframes floatSlow { from { transform: translateY(0); } to { transform: translateY(40px); } }
        @keyframes floatSlow2 { from { transform: translateY(0); } to { transform: translateY(-40px); } }
      `}</style>
    </div>
  );
};

export default HomePage;