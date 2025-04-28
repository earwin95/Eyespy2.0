import { useState, useEffect } from "react";
import { Trash2, Calendar, Download } from "lucide-react";

const Gallery = ({ darkMode }) => {
  const [captures, setCaptures] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("captures")) || [];
    // Vérification de la validité des dates des captures
    const validCaptures = saved.map(capture => {
      if (!capture.date || isNaN(new Date(capture.date).getTime())) {
        // Si la date est invalide, on remplace par la date actuelle
        capture.date = new Date().toISOString();
      }
      return capture;
    });
    setCaptures(validCaptures);
  }, []);

  const handleDelete = (index) => {
    const updatedCaptures = captures.filter((_, i) => i !== index);
    setCaptures(updatedCaptures);
    localStorage.setItem("captures", JSON.stringify(updatedCaptures));
  };

  const downloadImage = (imageUrl, filename) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
        {captures.length > 0 && (
          <button
            onClick={() => setCaptures([])}
            className={`px-3 py-1.5 flex items-center ${darkMode ? 'text-red-400 hover:text-red-500' : 'text-red-500 hover:text-red-600'} transition-colors duration-300`}
            aria-label="Supprimer toute la galerie"
          >
            <Trash2 size={16} className="mr-1" />
            Supprimer tout
          </button>
        )}
      </div>
      
      {captures.length === 0 ? (
        <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p className="mb-2">Aucune capture pour le moment</p>
          <p className="text-sm">Ajoutez des captures pour les voir ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {captures.map((c, i) => (
            <div 
              key={i}
              className={`history-card rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-md`}
            >
              <div className="relative">
                <img 
                  src={c.image} 
                  alt="Capture"
                  className="w-full aspect-video object-cover"
                />
                <button
                  onClick={() => downloadImage(c.image, `capture-${new Date(c.date).toISOString().split('T')[0]}.png`)}
                  className={`absolute bottom-2 right-2 p-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full shadow-md`}
                  aria-label="Télécharger l'image"
                >
                  <Download size={16} />
                </button>
              </div>
              
              <div className={`p-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                <div className="text-sm mb-2">
                  <time dateTime={c.date} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {new Date(c.date).toLocaleString()}
                  </time>
                </div>

                <p className="text-sm mb-2">🔍 {c.objects}</p>

                <button
                  onClick={() => handleDelete(i)}
                  className={`bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 ${darkMode ? 'hover:bg-red-500' : ''}`}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
