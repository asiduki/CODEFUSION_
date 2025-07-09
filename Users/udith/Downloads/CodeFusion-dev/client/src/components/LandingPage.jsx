import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-gray-100 font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-black bg-opacity-40 backdrop-blur-md z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-5">
          <div className="flex items-center space-x-3 cursor-pointer select-none">
            <div className="bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-extrabold text-xl">
              ASIDUKI
            </div>
            <span className="text-2xl font-bold tracking-wide">DevNest</span>
          </div>
          <ul className="hidden md:flex space-x-10 text-lg tracking-wide">
            <li>
              <a
                href="#home"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#docs"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                Docs
              </a>
            </li>
          </ul>
          <Link to="/login">
            <button className="bg-pink-500 hover:bg-pink-600 px-5 py-2 rounded-full font-semibold shadow-lg transition-colors duration-300">
              Login / Register
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main
        id="home"
        className="pt-32 flex flex-col items-center text-center px-5 max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Code Together,
          <br />
          Create Forever.
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-pink-300 max-w-xl">
          Experience seamless, lightning-fast, real-time collaboration with
          DevNest — your ultimate online code editor.
        </p>
        <Link
          to="/login"
          className="inline-block bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-colors duration-300"
        >
          Get Started
        </Link>
        <div className="flex flex-wrap justify-center gap-6 mt-14">
          {["javascript", "python", "java", "cpp", "html"].map((lang) => (
            <div
              key={lang}
              className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300 cursor-pointer"
              title={lang.charAt(0).toUpperCase() + lang.slice(1)}
            >
              <img
                src={`/logos/${lang}.png`}
                alt={lang}
                className="w-10 h-10"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="mt-32 bg-gradient-to-tr from-black/70 via-purple-900/90 to-pink-900/80 py-20 px-5 rounded-t-3xl shadow-2xl max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-extrabold text-center mb-14 tracking-widest text-pink-400 drop-shadow-lg">
          Features
        </h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Real-Time Collaboration",
              desc: "Code side-by-side with your team and watch live updates.",
              icon: (
                <svg
                  className="w-12 h-12 text-pink-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20l9-7-9-7-9 7 9 7z"
                  />
                </svg>
              ),
            },
            {
              title: "Syntax Highlighting",
              desc: "Beautiful, language-specific highlighting for clean readability.",
              icon: (
                <svg
                  className="w-12 h-12 text-pink-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6v6l4 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
            },
            {
              title: "Customizable Themes",
              desc: "Choose your favorite theme — dark, light, or anything in between.",
              icon: (
                <svg
                  className="w-12 h-12 text-pink-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v1m0 16v1m8-8h1M3 12H2m15.364-6.364l.707.707M6.343 17.657l-.707.707m12.02 0l-.707.707M6.343 6.343l-.707-.707" />
                </svg>
              ),
            },
            {
              title: "Session Persistence",
              desc: "Never lose your work—resume where you left off anytime.",
              icon: (
                <svg
                  className="w-12 h-12 text-pink-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3"
                  />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ),
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-purple-900 to-pink-800 rounded-3xl p-8 shadow-xl hover:scale-[1.03] transition-transform duration-300 cursor-default"
            >
              {icon}
              <h3 className="text-2xl font-semibold mb-3">{title}</h3>
              <p className="text-pink-200">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-screen py-2 bg-gradient-to-tr from-black to-purple-900 text-pink-300 absolute">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
          <div>
            <h3 className="font-bold text-xl mb-3">About DevNest</h3>
            <p className="text-sm opacity-80">
              We are redefining how developers collaborate by providing a
              powerful, easy-to-use, and visually stunning coding environment.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3">Privacy Policy</h3>
            <p className="text-sm opacity-80">
              Your data is safe with us. We never share or sell your personal
              info.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3">Terms of Service</h3>
            <p className="text-sm opacity-80">
              Please read and understand our terms to use DevNest responsibly.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3">Follow Us</h3>
            <div className="flex space-x-5 mt-3">
              {["facebook", "twitter", "linkedin"].map((platform) => (
                <a
                  key={platform}
                  href={`https://www.${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors duration-300"
                >
                  <img
                    src={`/logos/${platform}.png`}
                    alt={platform}
                    className="w-7 h-7"
                    draggable={false}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
