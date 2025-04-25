import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);

  // Charger le modèle une seule fois
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Dessiner les boîtes de détection
  const drawBoxes = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#00FF00';
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };

  // Détection toutes les 500ms
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

  // Capture et sauvegarde
  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    const now = new Date().toLocaleString();
    const predictionNames = detections.map(d => d.class).join(', ');

    const captureData = {
      date: now,
      objects: predictionNames,
      image: screenshot,
    };

    // Sauvegarde dans localStorage
    const oldCaptures = JSON.parse(localStorage.getItem('captures')) || [];
    oldCaptures.push(captureData);
    localStorage.setItem('captures', JSON.stringify(oldCaptures));
    alert('Capture sauvegardée !');
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          className="rounded shadow"
          videoConstraints={{ facingMode: 'user' }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute top-0 left-0"
        />
      </div>

      <button
        onClick={capture}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        📸 Capturer et sauvegarder
      </button>
    </div>
  );
};

export default ObjectDetection;