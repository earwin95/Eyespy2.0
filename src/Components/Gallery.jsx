import { useState, useEffect } from "react";
// fonction qui nous permet de recuperer les captures d images dans le local storage et de les afficher 
// dans la galerie
// on utilise useState pour gerer l etat de la galerie et useEffect pour recuperer les donnees du local storage : 
// on utilise JSON.parse pour convertir les donnees en format JSON en un tableau d objets javascript et localStorage.getItem pour recuperer les donnees du local storage
// on utilise map pour parcourir le tableau et afficher chaque image avec sa date et les objets detectes

const Gallery = () => {
    const [captures, setCaptures] = useState([]);
  
    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem('captures')) || [];
      setCaptures(saved);
    }, []);
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {captures.map((c, i) => (
          <div key={i} className="border p-2 bg-white shadow">
            <img src={c.image} alt="capture" className="w-full" />
            <p className="mt-2 text-sm text-gray-600">📅 {c.date}</p>
            <p className="text-sm">🔍 {c.objects}</p>
          </div>
        ))}
      </div>
    );
  };

  export default Gallery;