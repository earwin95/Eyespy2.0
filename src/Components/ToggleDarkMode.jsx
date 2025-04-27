import { Sun, Moon } from 'lucide-react';

const ToggleDarkMode = ({ darkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-300`}
    aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
  >
    {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
  </button>
);

export default ToggleDarkMode;