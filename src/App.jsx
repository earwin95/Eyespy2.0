import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './pages/Home';
import DetectionPage from './pages/DetectionPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  // Lecture de la préférence de mode sombre depuis localStorage
  const storedMode = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(storedMode === 'true');

  // Fonction pour basculer entre le mode sombre et clair
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode); // Sauvegarder l'état dans localStorage
      return newMode;
    });
  };

  // Appliquer la classe dark au document/html global
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark'); // Ajoute la classe 'dark' à l'élément <html>
    } else {
      document.documentElement.classList.remove('dark'); // Retire la classe 'dark'
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      {/* Passer le mode sombre et la fonction toggleDarkMode au Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="">
        {/* Définir les routes de navigation */}
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/detect" element={<DetectionPage darkMode={darkMode} />} />
          <Route path="/gallery" element={<GalleryPage darkMode={darkMode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
