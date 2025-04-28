import ObjectDetection from '../Components/ObjectDetection';

const DetectionPage = ({ darkMode }) => (
  <main className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    <ObjectDetection darkMode={darkMode} />
  </main>
);

export default DetectionPage;
