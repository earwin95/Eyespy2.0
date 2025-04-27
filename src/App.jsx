//  on met en place les imports nécessaires et on importe les composants Header, Home, DetectionPage et GalleryPage
// on utilise react-router pour mettre en place la structure de navigation

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './pages/Home';
import DetectionPage from './pages/DetectionPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  const storedMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(storedMode === 'true');

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  // Appliquer la classe dark uniquement au Header
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<DetectionPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
