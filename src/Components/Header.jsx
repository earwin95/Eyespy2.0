import { Link } from 'react-router-dom';  // Si tu utilises React Router v6 ou supérieur
import '../Styles/style.css';
import logo from '../Images/Logo.png';
import ToggleDarkMode from '../Components/ToggleDarkMode';  // Import du nouveau composant

// creation du composant Header qui met en place la barre de navigation et le titre de l application
// on utilise  Link to pour naviguer vers les pages de detaction et la gallerie
const Header = ({ darkMode, toggleDarkMode }) => (
  <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-10" />
        <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-500'}`}>
          EyeSpy
        </span>
      </div>

      {/* Navbar */}
      <nav className="space-x-8 hidden md:flex">
        <Link
          to="/"
          className={`text-lg font-medium hover:text-blue-500 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Accueil
        </Link>
        <Link
          to="/detect"
          className={`text-lg font-medium hover:text-blue-500 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Détection
        </Link>
        <Link
          to="/gallery"
          className={`text-lg font-medium hover:text-blue-500 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}
        >
          Galerie
        </Link>
      </nav>

      {/* Appel du composant ToggleDarkMode */}
      <ToggleDarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  </header>
);

export default Header;
