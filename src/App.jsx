import React from 'react';
import { BookingProvider } from './contexts/BookingContext';
import useScrollToTop from './hooks/useScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import CherryBlossoms from './components/CherryBlossoms';
import AudioController from './components/AudioController';
import './App.css';

function App() {
  // Use custom hook to ensure page always starts at the top
  useScrollToTop();

  return (
    <BookingProvider>
      <div className="portfolio-container font-sans overflow-x-hidden selection:bg-theme-accent selection:text-white bg-theme-bg text-theme-text transition-colors duration-500">
        <CherryBlossoms />
        <Navbar />
        <Hero />
        <About />
        <Gallery />
        <Skills />
        <Services />
        <Contact />

        {/* Background ambient music controller */}
        <AudioController />
      </div>
    </BookingProvider>
  );
}

export default App;
