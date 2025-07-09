import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      {/* Navbar */}
      <header className="shadow-md sticky top-0 z-50 bg-white">
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="CodeFusion Logo" className="w-8 h-8" />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              CodeFusion
            </span>
          </div>
          <ul className="hidden md:flex space-x-6 text-lg font-medium">
            <li><a href="#home" className="hover:text-blue-600">Home</a></li>
            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
            <li><a href="#" className="hover:text-blue-600">Docs</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
          <Link to="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Login / Register
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" className="max-w-7xl mx-auto flex flex-col items-center text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Collaborate, Code, and Conquer.
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
          The ultimate code editor for developers and teams.
        </h2>
        <p className="max-w-2xl text-gray-700 mb-8">
          CodeFusion provides real-time collaboration, syntax highlighting,
          and a seamless coding experience. Build better code together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {["javascript", "python", "java", "cpp", "html"].map((lang) => (
            <img
              key={lang}
              src={`/logos/${lang}.png`}
              alt={lang}
              className="w-12 h-12"
            />
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-12">Features</h1>
          <div className="grid gap-10 md:grid-cols-2">
            {[
              {
                title: "Real-Time Collaboration",
                desc: "Edit code simultaneously with your team and see updates in real-time.",
              },
              {
                title: "Syntax Highlighting",
                desc: "Supports multiple programming languages for a smoother coding experience.",
              },
              {
                title: "Customizable Themes",
                desc: "Switch between light and dark themes to suit your preferences.",
              },
              {
                title: "Session Persistence",
                desc: "Rejoin your coding sessions anytime without losing progress.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-white shadow p-6 rounded-xl text-left">
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-700">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>
          <form className="space-y-6">
            <div>
              <label className="block font-semibold mb-1" htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows="4"
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Type your message here"
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4 text-sm text-gray-700">
          <div>
            <h2 className="font-bold mb-2">About Us</h2>
            <p>Learn more about CodeFusion and how we are revolutionizing collaborative coding.</p>
          </div>
          <div>
            <h2 className="font-bold mb-2">Privacy Policy</h2>
            <p>Read about how we handle your data and privacy.</p>
          </div>
          <div>
            <h2 className="font-bold mb-2">Terms of Service</h2>
            <p>Understand the terms and conditions of using our platform.</p>
          </div>
          <div>
            <h2 className="font-bold mb-2">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              {["facebook", "twitter", "linkedin"].map((platform) => (
                <a
                  key={platform}
                  href={`https://www.${platform}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`/logos/${platform}.png`} alt={platform} className="w-6 h-6" />
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
