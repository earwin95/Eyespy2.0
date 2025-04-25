import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);

  // Charger le modèle
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Dessiner les boîtes aux vraies coordonnées
  const drawBoxes = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (predictions.length === 0) return;

    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;

      ctx.strokeStyle = '#22c55e'; 
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.font = '14px sans-serif';
      ctx.fillStyle = '#22c55e';
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };

  // Lancer la détection régulièrement
  useEffect(() => {
    if (model) {
      const interval = setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video.readyState === 4
        ) {
          const predictions = await model.detect(webcamRef.current.video);
          setDetections(predictions);
          drawBoxes(predictions);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [model]);

  // Capturer une image
  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    const now = new Date().toLocaleString();
    const predictionNames = detections.map(d => d.class).join(', ');

    const captureData = {
      date: now,
      objects: predictionNames,
      image: screenshot,
    };

    const oldCaptures = JSON.parse(localStorage.getItem('captures')) || [];
    oldCaptures.push(captureData);
    localStorage.setItem('captures', JSON.stringify(oldCaptures));
    alert('📸 Capture sauvegardée !');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          🎯 Détection d'objets en temps réel
        </h1>

        {/* Parent avec centrage et taille définie */}
        <div className="relative w-[640px] h-[480px] mx-auto rounded-xl overflow-hidden border border-gray-300 shadow">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
            className="block mx-auto rounded-xl"
            videoConstraints={{ facingMode: 'user' }}
          />
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="absolute inset-0 block mx-auto"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={capture}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-200"
          >
            📸 Capturer et sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetection;
