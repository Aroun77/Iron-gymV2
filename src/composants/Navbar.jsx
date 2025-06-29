import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-md shadow-xl px-8 py-4 flex justify-between items-center sticky top-0 z-50 animate-fade-in-up duration-700">
      <Link
        to="/"
        className="text-3xl font-extrabold text-white transition-all duration-500 transform hover:(text-yellow-400 rotate-1 text-shadow-lg) active:scale-95"
      >
        🏋️‍♂️ Iron GYM V2
      </Link>

      <div className="flex gap-4 sm:gap-6">
        {["/", "/products", "/login"].map((path, idx) => {
          const labels = ["Accueil", "Produits", "Connexion"];
          return (
            <Link
              key={path}
              to={path}
              className="text-white bg-gray-800/80 backdrop-blur-sm px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:(bg-yellow-400 text-gray-900 shadow-xl scale-105) active:scale-95"
            >
              {labels[idx]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
