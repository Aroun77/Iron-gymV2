import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "../assets/logo.png"; 

function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Mini barre en haut */}
      <div className="bg-gray-800 text-yellow-400 text-sm py-1 px-4 text-center">
        🔥Séance d'essaie offerte !
      </div>

      {/* Espacement */}
      <div className="h-1 bg-transparent"></div>

      {/* Navbar principale */}
      <nav className="bg-gray-800/90 backdrop-blur-md shadow-xl px-6 py-1 flex justify-between items-center rounded-2xl animate-fade-in-up duration-700">
        {/* Logo image cliquable */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Iron Gym Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 hover:animate-bounce"
          />
        </Link>

        {/* Liens de navigation + réseaux sociaux */}
        <div className="flex items-center gap-2 sm:gap-4">
          {["/", "/products", "/abonnement", "/login"].map((path, idx) => {
            const labels = ["Accueil", "Produits", "Abonnement", "Connexion"];
            return (
              <Link
                key={path}
                to={path}
                className="text-white bg-gray-700/90 px-3 py-1 rounded-full transition-all duration-300 shadow-md hover:bg-yellow-400 hover:text-gray-900 hover:shadow-xl hover:scale-105 active:scale-95 text-sm"
              >
                {labels[idx]}
              </Link>
            );
          })}

          {/* Barre verticale */}
          <div className="w-px h-5 bg-white/40 mx-2" />

          {/* Réseaux sociaux */}
          <div className="flex gap-2 items-center text-white">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-4 h-4 hover:text-yellow-400 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-4 h-4 hover:text-yellow-400 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-4 h-4 hover:text-yellow-400 transition" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
