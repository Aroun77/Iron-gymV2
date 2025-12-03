import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import HamburgerButton from "./HamburgerButton";
import logo from "/Logo.png";
import { usePrefetch, prefetchRoute } from "../hooks/usePrefetch";

// Icône TikTok custom
const TikTok = (props) => (
  <svg fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M168 32a40 40 0 0 0 40 40h24v40h-24a80 80 0 1 1-80-80z" />
  </svg>
);

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Prefetch routes during idle time
  usePrefetch();

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/products", label: "Produits" },
    { path: "/abonnement", label: "Abonnement" },
    { path: "/machines", label: "Machines" },
    { path: "/tableau", label: "Performances" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-4 z-50 w-full flex justify-center">
      {/* Navbar principale */}
      <nav
        className={`navbar-main transition-all duration-500 rounded-full px-8 py-3 flex justify-between items-center shadow-lg border backdrop-blur-lg ${scrolled
            ? "bg-white/10 border-white/20 shadow-xl navbar-scrolled"
            : "bg-white/5 border-white/10"
          } max-w-5xl w-full`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group no-underline">
          <img
            src={logo}
            alt="Iron Gym"
            width="40"
            height="40"
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span
            className="text-lg font-extrabold text-white tracking-widest transition duration-300 group-hover:text-yellow-400"
            style={{ minWidth: '95px', display: 'inline-block' }}
          >
            Iron Gym
          </span>
        </Link>

        {/* Menu Desktop centré */}
        <div className="hidden md:flex items-center gap-6 relative">
          {navLinks.map(({ path, label }) => (
            <div key={path} className="relative">
              <Link
                to={path}
                onMouseEnter={() => prefetchRoute(path)}
                className={`relative px-3 py-1.5 text-sm font-medium transition-all duration-300 no-underline ${location.pathname === path
                    ? "text-yellow-400 font-semibold"
                    : "text-white hover:text-yellow-400"
                  }`}
              >
                {label}
              </Link>

              {/* Barre sous le lien actif */}
              {location.pathname === path && (
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Icônes */}
        <div className="hidden md:flex items-center gap-4">
          {[Instagram, TikTok, Facebook].map((Icon, idx) => (
            <a
              key={idx}
              href={[
                "https://www.instagram.com/irongymofficiel",
                "https://www.tiktok.com/@irongymofficiel",
                "https://www.facebook.com/share/1aGGtuBjer",
              ][idx]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 hover:scale-110 transition-transform"
            >
              <Icon className="w-5 h-5 text-white" />
            </a>
          ))}
        </div>

        {/* Hamburger Mobile */}
        <div className="md:hidden">
          <HamburgerButton isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="mobile-menu-overlay fixed inset-0 z-50 bg-black/70 backdrop-blur-md">
          <div className="mobile-menu absolute top-0 right-0 w-4/5 max-w-xs h-full bg-[#1a1a1a] text-white p-6 shadow-2xl rounded-l-2xl">
            {/* Bouton Fermer */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-yellow-400 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Liens Mobile */}
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 px-4 rounded-full text-left text-sm transition-all duration-300 no-underline ${location.pathname === path
                      ? "bg-yellow-400 text-black font-semibold shadow"
                      : "bg-gray-700/80 text-white hover:bg-yellow-400 hover:text-black"
                    }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Réseaux sociaux Mobile */}
            <div className="flex justify-center gap-4 mt-6">
              {[Instagram, TikTok, Facebook].map((Icon, idx) => (
                <a
                  key={idx}
                  href={[
                    "https://www.instagram.com/irongymofficiel",
                    "https://www.tiktok.com/@irongymofficiel",
                    "https://www.facebook.com/share/1aGGtuBjer",
                  ][idx]}
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

export default React.memo(Navbar);
