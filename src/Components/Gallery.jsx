import { useState, useEffect } from "react";

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