// On importe les fonsctionnalites de react (useRef, useEffect, useState)
// On importe react-webcam pour acceder à la webcam, cocco-ssd qui est un modèle d'IA 
// qui détecte les objets, et tensorflow/tfjs qui est la bibliothèque de tensorflow 
// pour le javascript afin de faire fonctionner le modèle d'IA

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';


// On crée la fonction ObjectDetection qui va gérer la détection d'objets  


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
  

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
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

  // on crée une fonction capture 
  // on cree une variabble screenshot en utilisant webcamRef.current.getScreenshot() 
  // pour prendre une capture d'écran de la webcam
  // on cree une variable now qui contient la date et l'heure actuelle
  // on cree une variable predictionNames qui contient les noms des objets détectés 
  

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    const now = new Date().toLocaleString();
    const predictionNames = detections.map(d => d.class).join(', ');

// on cree une variable captureData qui contient la date, les objets détectés et l'image
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