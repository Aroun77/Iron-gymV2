import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import logo from "../assets/logo.png";

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return [isDark, setIsDark];
}

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/products", label: "Produits" },
    { path: "/abonnement", label: "Abonnement" },
    { path: "/login", label: "Connexion" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full font-sans">
      {/* Bandeau promotionnel */}
      <div className="bg-[#111] text-yellow-400 text-sm py-1 px-4 text-center tracking-wide">
        🎯 Séance d’essai offerte – Venez découvrir notre salle !
      </div>

      {/* NAVBAR */}
      <nav
        className={`transition-all duration-500 mx-3 my-2 px-6 rounded-[2rem] flex justify-between items-center border border-white/10 shadow-2xl backdrop-blur-md ${
          scrolled
            ? "bg-[#0a0a0a]/95 py-2 scale-[0.98]"
            : "bg-[#0a0a0a]/80 py-3"
        } animate-fade-in-top`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Iron Gym"
            className="h-10 w-auto transition-transform duration-300 hover:scale-110"
          />
        </Link>

        {/* MENU PC */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 no-underline ${
                location.pathname === path
                  ? "bg-yellow-400 text-black font-semibold shadow-md"
                  : "bg-gray-700/70 dark:bg-gray-600/60 text-white hover:bg-yellow-400 hover:text-black hover:shadow-lg"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* RÉSEAUX */}
          <div className="w-px h-5 bg-white/30 mx-3" />
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href={
                  ["https://instagram.com", "https://facebook.com", "https://twitter.com"][i]
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-transform duration-300 hover:scale-110 hover:drop-shadow"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-4 relative w-12 h-6 bg-gray-700 dark:bg-gray-600 rounded-full shadow-inner transition-colors duration-500"
          >
            <span
              className={`absolute top-[2px] left-[2px] w-5 h-5 bg-yellow-400 rounded-full shadow-lg transition-transform duration-500 flex items-center justify-center ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-black rotate-180 transition-transform duration-700" />
              ) : (
                <Moon className="w-4 h-4 text-black rotate-0 transition-transform duration-700" />
              )}
            </span>
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white hover:text-yellow-400 transition"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute top-2 right-2 w-4/5 max-w-xs bg-[#111] text-white p-6 rounded-xl shadow-2xl animate-slide-in-right">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-white hover:text-yellow-400"
            >
              <X />
            </button>

            <nav className="flex flex-col gap-4 mt-6">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`py-2 px-4 rounded-full text-sm transition-all duration-300 ${
                    location.pathname === path
                      ? "bg-yellow-400 text-black font-semibold shadow"
                      : "bg-gray-700/80 text-white hover:bg-yellow-400 hover:text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex justify-center gap-4 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href={
                    ["https://instagram.com", "https://facebook.com", "https://twitter.com"][idx]
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 hover:scale-110 transition-transform"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
