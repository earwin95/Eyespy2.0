import { NavLink } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 
import '../Styles/style.css'; 
import logoDark from '../Images/LogoDark.png'; 
import logoLight from '../Images/LogoLight.png'; 
import menuLight from '../Images/menuLight.png'; 
import menuDark from '../Images/menuDark.png'; 
import ToggleDarkMode from '../Components/ToggleDarkMode';  // Composant pour changer de mode

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);  // État pour la largeur de la fenêtre

  // Effet pour gérer la taille de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Écouter les changements de taille
    window.addEventListener('resize', handleResize);

    // Nettoyage lors du démontage
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fermer le menu mobile quand l'écran devient plus grand que le breakpoint "md" (taille desktop)
  useEffect(() => {
    if (windowWidth >= 768) {  // Le breakpoint md de Tailwind est à 768px
      setIsOpen(false);  // Ferme le menu si l'écran est large
    }
  }, [windowWidth]);  // Quand la largeur change, cette logique est exécutée

  return (
    <header className={`py-4 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center space-x-3">
        <a href="/" class="">
          <img 
            src={darkMode ? logoDark : logoLight} 
            alt="Logo" 
            className="w-25" 
          />
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-500'}`}>
            EyeSpy
          </span>
        </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5">
          <ul className="flex items-center gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full font-semibold transition ${isActive ? 'bg-blue-500 text-white' : darkMode ? 'text-white' : 'text-black'}`
                }
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/detect"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full font-semibold transition ${isActive ? 'bg-blue-500 text-white' : darkMode ? 'text-white' : 'text-black'}`
                }
              >
                Détection
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full font-semibold transition ${isActive ? 'bg-blue-500 text-white' : darkMode ? 'text-white' : 'text-black'}`
                }
              >
                Galerie
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Toggle Dark Mode */}
        <ToggleDarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <img 
            src={darkMode ? menuDark : menuLight} 
            alt="Menu" 
            className="w-8" 
          />
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`absolute top-16 left-0 w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md flex flex-col items-center py-4 z-50`}>
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/detect"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  Détection
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold hover:text-blue-500"
                >
                  Galerie
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
