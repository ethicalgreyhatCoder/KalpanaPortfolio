import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Contact from './components/Contact';
import CherryBlossoms from './components/CherryBlossoms';
import './App.css';

function App() {
  return (
    <div className="portfolio-container font-sans overflow-x-hidden selection:bg-theme-accent selection:text-white bg-theme-bg text-theme-text transition-colors duration-500">
      <CherryBlossoms />
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Contact />
    </div>
  );
}

export default App;
