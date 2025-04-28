import React from 'react';
import Gallery from '../Components/Gallery';

const GalleryPage = ({ darkMode }) => (
  <main className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    <h1 className="text-4xl md:text-5xl font-bold text-blue-800 text-center mb-8 tracking-tight animate-fade-in">
    Galerie des captures

          </h1>
    <Gallery darkMode={darkMode} />
  </main>
);

export default GalleryPage;
