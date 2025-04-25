import { useState, useEffect } from "react";

const Gallery = () => {
  const [captures, setCaptures] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("captures")) || [];
    setCaptures(saved);
  }, []);

  const handleDelete = (index) => {
    const updatedCaptures = captures.filter((_, i) => i !== index);
    setCaptures(updatedCaptures);
    localStorage.setItem("captures", JSON.stringify(updatedCaptures));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {captures.map((c, i) => (
        <div key={i} className="border p-4 bg-white shadow rounded flex flex-col items-center">
          <img src={c.image} alt="capture" className="w-full rounded" />
          <p className="mt-2 text-sm text-gray-600">📅 {c.date}</p>
          <p className="text-sm mb-2">🔍 {c.objects}</p>
          <button
            onClick={() => handleDelete(i)}
            className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
          >
            🗑️ Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
