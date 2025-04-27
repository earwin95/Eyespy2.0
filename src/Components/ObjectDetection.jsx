// On importe les fonsctionnalites de react (useRef, useEffect, useState)
// On importe react-webcam pour acceder à la webcam, cocco-ssd qui est un modèle d'IA 
// qui détecte les objets, et tensorflow/tfjs qui est la bibliothèque de tensorflow 
// pour le javascript afin de faire fonctionner le modèle d'IA
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
// On crée la fonction ObjectDetection qui va gérer la détection d'objets  
import { Camera, X } from 'lucide-react';

const ObjectDetection = () => {
// On crée les variables
// webcamRef une reférence pour acceder au flux video de la webcam
// canvasRef une reférence pour dessiner les carrés de détection 
// model pour stocker le modèle d'IA (coco-ssd)
// detections pour stocker les objets détectés par le modèle d'IA
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);

    // on utilise useEffect pour charger le modèle d'IA coco-ssd une seule fois 
  // On telecharge cooco-ssd et on le set dans la variable model 
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      setIsLoading(true);
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      setIsLoading(false);
    };
    loadModel();
  }, []);

// on crée une fonction drawBoxes qui va dessiner les carrés de détection sur les objets détectés :
// on cree une variable ctx qui est le contexte de dessin du canvas en utilisant
//  canvasref.current.getContext('2d') pour acceder au contexte de dessin du canvas
// on met a 0 les attributs du canvas pour le redessiner

  const drawBoxes = (predictions) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // on utilise une boucle forEach pour parcourir un tableau predictions 
    // qui contient les objets détectés par le modèle d'IA coco-ssd
    // on cree une variable prediction.bbox qui contient les coordonnées et gandeur 
    // de l'objet détecté dans un tableau
    // on utilise ctx.strokeRect pour dessiner un rectangle autour de l'objet détecté
    // on utilise ctx.fillText pour afficher le nom et le score 
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      let color = '#EF4444';
      if (prediction.score > 0.7) {
        color = '#10B981';
      } else if (prediction.score > 0.5) {
        color = '#F59E0B';
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = color + '33';
      ctx.fillRect(x, y, width, height);

      ctx.fillStyle = color;
      const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
      const textMetrics = ctx.measureText(label);
      ctx.fillRect(x, y - 25, textMetrics.width + 10, 25);

      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.fillText(label, x + 5, y - 7);
    });
  };

  // on utilise useEffect pour mettre à jour les détections toutes les 500ms

  // on utilise une fonction setInterval pour appeler la fonction detect du modèle d'IA coco-ssd 
  // et verifier si le modele est chargé et si la webcam est prête grace 
  // à webcamRef.current.video.readyState === 4
  // on cree une variable predictions qui contient les objets détectés par coco-ssd
  // on incremente predictions dans la variable detections
  // on appelle la fonction drawBoxes pour dessiner les carrés de détection sur le canvas
  //on clear la fonction interval pour remettre à zéro le setInterval une fois le retturn effectué
  // on utilise le tableau de dépendances [model] pour que l'effet ne s'exécute 
  // qu'une seule fois lorsque le modèle est chargé

  useEffect(() => {
    if (model) {
      const interval = setInterval(async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const predictions = await model.detect(webcamRef.current.video);
          setDetections(predictions);
          drawBoxes(predictions);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [model]);

  // on crée une fonction capture 
  // on cree une variabble screenshot en utilisant webcamRef.current.getScreenshot() 
  // pour prendre une capture d'écran de la webcam
  // on cree une variable now qui contient la date et l'heure actuelle
  // on cree une variable predictionNames qui contient les noms des objets détectés 

  const startVideo = () => {
    setVideoEnabled(true);
  };

  const stopVideo = () => {
    setVideoEnabled(false);
  };

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    const now = new Date().toLocaleString();
    const predictionNames = detections.map(d => d.class).join(', ');

    const captureData = {
      date: now,
      objects: predictionNames,
      image: screenshot,
    };

    // on cree une variable old capture pour sauvegarder les capuresData dans le local storage
    // on utilise JSON.parse pour convertir les données en format JSON en un tableau d'objets javascript 
    // et localStorage.getItem pour recuperer les données du local storage
    // on utilise push pour ajouter la nouvelle capture à l'ancien tableau de captures
    // on utilise JSON.stringify pour convertir le tableau d'objets javascript en une chaîne de caractères JSON 
    // et localStorage.setItem pour sauvegarder les données dans le local storage

    const oldCaptures = JSON.parse(localStorage.getItem('captures')) || [];
    oldCaptures.push(captureData);
    localStorage.setItem('captures', JSON.stringify(oldCaptures));
    alert('Capture sauvegardée !');
  };

  return (
    <div className=" pb-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container-page">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-8 tracking-tight animate-fade-in">
            Object Detection
          </h1>

          {/* Buttons at the top */}
          <div className="mb-6 animate-fade-in flex justify-center space-x-4">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                <span className="ml-2 text-gray-600">Loading model...</span>
              </div>
            ) : !videoEnabled ? (
              <button
                onClick={startVideo}
                className="px-6 py-3 text-lg font-medium text-white bg-blue-500 hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                disabled={isLoading}
              >
                <Camera size={20} className="mr-2" />
                Start Camera
              </button>
            ) : (
              <button
                onClick={stopVideo}
                className="px-6 py-3 text-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                <X size={20} className="mr-2" />
                Stop Camera
              </button>
            )}

            {videoEnabled && (
              <button
                onClick={capture}
                className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors duration-300"
                aria-label="Take snapshot"
              >
                <Camera size={24} />
              </button>
            )}
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="card relative w-full max-w-[700px] h-[550px]">
              {!videoEnabled ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Camera size={48} className="mb-4 opacity-50" />
                  <p>Camera is currently disabled</p>
                  <p className="text-sm mt-2">Click "Start Camera" to begin object detection</p>
                </div>
              ) : (
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width={700}
                    height={550}
                    className="mx-auto"
                    videoConstraints={{ facingMode: "user" }}
                  />
                  <canvas
                    ref={canvasRef}
                    width={700}
                    height={550}
                    className="absolute inset-0 block mx-auto"
                  />
                </>
              )}
            </div>
          </div>

          {videoEnabled && detections.length > 0 && (
            <div className="mt-6 p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2">Detected Objects:</h3>
              <div className="flex flex-wrap gap-2">
                {detections.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {item.class} ({Math.round(item.score * 100)}%)
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObjectDetection;
