import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Offerings from './components/Offerings';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-pink-pale selection:text-green-deep">
      <Navbar />
      <Hero />
      <About />
      <Offerings />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
