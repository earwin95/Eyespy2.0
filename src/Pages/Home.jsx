import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className=" overflow-hidden">
      <div className="relative h-[92vh] flex items-center justify-center animated-background">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Welcome to EyeSpy
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Experience real-time object detection with just a click. EyeSpy makes it easy to identify and capture objects in your surroundings.
          </p>
          
          <button
            onClick={() => navigate('/detect')}
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            <Camera size={24} className="mr-2" />
            Start Detection
          </button>
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          .animated-background {
            background: linear-gradient(270deg, #1e3a8a, #3b82f6, #9333ea, #1e3a8a);
            background-size: 600% 800%;
            animation: GradientAnimation 15s ease infinite;
          }
          
          @keyframes GradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
