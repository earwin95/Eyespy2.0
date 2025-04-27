import { Link } from 'react-router';

// creation du composant Header qui met en place la barre de navigation et le titre de l application
// on utilise  Link to pour naviguer vers les pages de detaction et la gallerie

const Header = () => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold text-green-600">🎯 EyeSpy</h1>
    <nav className="space-x-4">
      <Link to="/" className="text-gray-700 hover:text-green-600">Accueil</Link>
      <Link to="/detect" className="text-gray-700 hover:text-green-600">Détection</Link>
      <Link to="/gallery" className="text-gray-700 hover:text-green-600">Galerie</Link>
    </nav>
  </header>
);
export default Header;