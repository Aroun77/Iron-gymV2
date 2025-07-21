import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Instagram,
  Twitter,
  Sun,
  Moon,
} from "lucide-react";
import logo from "../assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { X } from "lucide-react";
import HamburgerButton from "./HamburgerButton";




// TikTok icon
const TikTok = (props) => (
  <svg fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M168 32a40 40 0 0 0 40 40h24v40h-24a80 80 0 1 1-80-80z" />
  </svg>
);

// Dark mode hook
function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

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
  const [submenuOpen, setSubmenuOpen] = useState(false); // 👈 pour le sous-menu mobile
  const [hoveredMenu, setHoveredMenu] = useState(null);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
  { path: "/", label: "Accueil" },
  {
    path: "/products",
    label: "Produits",
    children: [
      { path: "/products/proteines", label: "Protéines" },
      { path: "/products/accessoires", label: "Accessoires" },
    ],
  },
  { path: "/abonnement", label: "Abonnement" },
  { path: "/machines", label: "Machines" }, // ✅ Ajouté ici
  { path: "/login", label: "Connexion" },
];


  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Mini-bar avec gradient */}
      <div className="bg-gradient-to-br from-black via-[#1a1a1a] to-[#D2A813] text-yellow-400 text-xs py-1.5 px-4 text-center font-medium tracking-wide shadow rounded-full w-fit mx-auto">
        🎯 Séance d’essai offerte – Venez découvrir notre salle !
      </div>

      {/* NAVBAR principale avec glassmorphisme */}
      <nav
        className={`mx-3 my-2 px-6 flex justify-between items-center rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-lg bg-white/10 transition-all duration-500 ${
          scrolled ? 'py-2 scale-[0.98]' : 'py-3'
        }`}
      >
        {/* LOGO + Texte */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Iron Gym"
            className="h-10 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg font-extrabold text-white tracking-widest transition duration-300 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_10px_#FFD700]">
            Iron Gym
          </span>
        </Link>

        {/* MENU DESKTOP */}
<div className="hidden md:flex items-center gap-6 relative">
  {navLinks.map(({ path, label, children }) => (
    <div
      key={path}
      className="relative group"
      onMouseEnter={() => children && setHoveredMenu(path)}
      onMouseLeave={() => children && setHoveredMenu(null)}
    >
      <Link
        to={path}
        className={`relative px-3 py-1.5 text-sm rounded-full no-underline transition-all duration-300 transform hover:-translate-y-[2px] ${
          location.pathname === path
            ? "bg-yellow-400 text-black font-semibold shadow"
            : "text-white hover:text-yellow-400"
        }`}
      >
        {label}
      </Link>

      {/* SOUS-MENU DESKTOP ANIMÉ */}
      {children && (
  <AnimatePresence>
    {children?.length > 0 && hoveredMenu === path && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 mt-2 z-50 backdrop-blur-md bg-white/10 dark:bg-white/10 border border-white/20 text-white rounded-xl shadow-xl py-2 px-3"
      >
        {children.map((child) => (
          <Link
            key={child.path}
            to={child.path}
            className="block px-4 py-2 text-sm text-white rounded transition hover:text-yellow-400"
          >
            {child.label}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
)}


    </div>
  ))}

  {/* ICÔNES SOCIAUX */}
  <div className="w-px h-5 bg-white/30 mx-3" />
  <div className="flex gap-3 text-white">
    {[Instagram, TikTok, Twitter].map((Icon, idx) => (
      <a
        key={idx}
        href={["https://instagram.com", "https://tiktok.com", "https://twitter.com"][idx]}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-yellow-400 hover:scale-110 transition-transform"
      >
        <Icon className="w-5 h-5" />
      </a>
    ))}
  </div>

  {/* TOGGLE DARK MODE */}
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
        <div className="md:hidden ">
          {/* MENU MOBILE (Hamburger) */}
<div className="md:hidden bg-transparent">
  <HamburgerButton isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
</div>

        </div>
      </nav>

      {/* MENU MOBILE déroulant */}
      <AnimatePresence>
  {menuOpen && (
    <motion.div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute top-0 right-0 w-4/5 max-w-xs h-full bg-[#1a1a1a] text-white p-6 rounded-l-xl shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold tracking-wide">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:text-yellow-400"
          >
          <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION MOBILE */}
        <nav className="flex flex-col gap-3">
          {navLinks.map(({ path, label, children }) => (
            <div key={path} className="flex flex-col">
              <button
                onClick={() => {
                  if (children) {
                    setSubmenuOpen((prev) => prev === path ? null : path);
                  } else {
                    setMenuOpen(false);
                  }
                }}
                className={`py-2 px-4 rounded-full text-left text-sm flex justify-between items-center transition-all duration-300 ${
                  location.pathname === path
                    ? "bg-yellow-400 text-black font-semibold shadow"
                    : "bg-gray-700/80 text-white hover:bg-yellow-400 hover:text-black"
                }`}
              >
                {label}
                {children && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      submenuOpen === path ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* SOUS-MENU MOBILE ANIMÉ */}
              <AnimatePresence>
                {children && submenuOpen === path && (
                  <motion.div
                    className="ml-4 mt-2 flex flex-col gap-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMenuOpen(false)}
                        className="text-sm px-3 py-1 rounded-full bg-gray-600 hover:bg-yellow-400 hover:text-black transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex justify-center gap-4 mt-6">
          {[Instagram, TikTok, Twitter].map((Icon, idx) => (
            <a
              key={idx}
              href={["https://instagram.com", "https://tiktok.com", "https://twitter.com"][idx]}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 hover:scale-110 transition-transform"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}