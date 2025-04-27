//  on met en place les imports nécessaires et on importe les composants Header, Home, DetectionPage et GalleryPage
// on utilise react-router pour mettre en place la structure de navigation

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Header from './components/Header';
import Home from './pages/Home';
import DetectionPage from './pages/DetectionPage';
import GalleryPage from './pages/GalleryPage';
import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detect" element={<DetectionPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;