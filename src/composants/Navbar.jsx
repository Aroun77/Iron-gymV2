import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "../assets/irongym.png"; // ← importe ton logo ici

function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      {/* Mini barre en haut */}
      <div className="bg-gray-800 text-yellow-400 text-sm py-1 px-4 text-center">
          Séance d'essaie offerte  
      </div>

      {/* Espacement */}
      <div className="h-2 bg-transparent"></div>

      {/* Navbar principale */}
      <nav className="bg-gray-900/80 backdrop-blur-md shadow-xl px-6 py-1.5 flex justify-between items-center rounded-b-xl animate-fade-in-up duration-700">
        {/* Logo image cliquable */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Iron Gym Logo"
            className="h-10 w-auto hover:rotate-1 transition-transform duration-300"
          />
        </Link>

        {/* Liens de navigation + réseaux sociaux */}
        <div className="flex items-center gap-2 sm:gap-4">
          {["/", "/products", "/login"].map((path, idx) => {
            const labels = ["Accueil", "Produits", "Connexion"];
            return (
              <Link
                key={path}
                to={path}
                className="text-white bg-gray-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full transition-all duration-300 shadow-md hover:(bg-yellow-400 text-gray-900 shadow-xl scale-105) active:scale-95 text-sm"
              >
                {labels[idx]}
              </Link>
            );
          })}

          {/* Barre verticale */}
          <div className="w-px h-6 bg-white/40 mx-2" />

          {/* Réseaux sociaux */}
          <div className="flex gap-2 items-center text-white">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-yellow-400 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-yellow-400 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 hover:text-yellow-400 transition" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
