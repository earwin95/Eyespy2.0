import { Link } from 'react-router';
import '../Styles/style.css'
import logo from '../Images/Logo.png';



const Header = () => (
  <header className="bg-gradient-to-b from-[#094045] to-[#051D21] shadow-lg">

    <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        {/* Icone/logo ici */}
        <img
  src={logo} alt="Logo" className="w-30" />   
<span className="text-2xl text-white font-semibold">EyeSpy</span>
      </div>

      {/* Navbar avec des liens espacés et des effets de survol */}
      <nav className="space-x-8 hidden md:flex">
        <Link
          to="/"
          className="text-white text-lg font-medium hover:text-green-300 transition-colors duration-300"
        >
          Accueil
        </Link>
        <Link
          to="/detect"
          className="text-white text-lg font-medium hover:text-green-300 transition-colors duration-300"
        >
          Détection
        </Link>
        <Link
          to="/gallery"
          className="text-white text-lg font-medium hover:text-green-300 transition-colors duration-300"
        >
          Galerie
        </Link>
      </nav>

      {/* Menu burger pour mobile */}
      <div className="md:hidden flex items-center">
        <button className="text-white text-2xl">
          <i className="fas fa-bars"></i> {/* Icône burger (font-awesome) */}
        </button>
      </div>
    </div>
  </header>
);

export default Header;
