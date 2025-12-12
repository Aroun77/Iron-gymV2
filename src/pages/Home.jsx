import { useState, useEffect } from "react";
import SectionCategories from "../composants/SectionCategories";
import Etages from "../composants/Etages";
import SectionCoach from "../composants/SectionCoach";
import Footer from "../composants/Footer";
import SEO from "../composants/SEO";
import { getBackgrounds } from "../services/api";
// Force rebuild - v2

function Home() {
  const [popup, setPopup] = useState(null);
  const [heroBackground, setHeroBackground] = useState('');

  // Données structurées pour LocalBusiness (Gym)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "name": "Iron Gym",
    "image": "https://iron-gym.org/iron-gym-logo.png",
    "telephone": "01 75 78 31 28",
    "email": "iron-gym@hotmail.fr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "71 Rue Aristide Briand",
      "addressLocality": "Villenoy",
      "postalCode": "77124",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.9477625,
      "longitude": 2.8678739
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "25€ - 38€",
    "url": "https://irongym-villenoy.fr"
  };

  // Charger le background DevantIron
  useEffect(() => {
    async function loadBackground() {
      try {
        const backgrounds = await getBackgrounds();
        const devantIron = backgrounds.find(bg => bg.name === 'DevantIron');

        if (devantIron) {
          // Ajouter un cache buster pour forcer le rechargement
          const cacheBuster = `&v=${Date.now()}`;
          setHeroBackground(`${devantIron.url}&w=1920&fit=crop&q=85${cacheBuster}`);
        }
      } catch (err) {
        console.error("Erreur chargement background:", err);
      }
    }
    loadBackground();
  }, []);

  const handleOpenPopup = (type) => {
    setPopup(type);
  };

  const handleRedirect = () => {
    if (popup === "register") {
      window.location.href =
        "https://member.resamania.com/irongym/registration";
    } else if (popup === "login") {
      window.location.href =
        "https://api.resamania.com/oauth/login/irongym?client_id=26_2532ba2d23446346e4f83dda1570fdd224ce70c546251c4ce84bd734e0e18811&redirect_uri=https://member.resamania.com/irongym/&response_type=code&locale=fr";
    }
    setPopup(null);
  };

  return (
    <div className="w-full">
      <SEO
        title="Iron Gym - Salle de Sport Villenoy (77)"
        description="Rejoignez Iron Gym Villenoy. Profitez de nos équipements Power Lifting, Cross Training et de nos coachs experts. Ouvert 7j/7, ambiance authentique et motivante."
        keywords="salle de sport villenoy, musculation 77, cross training meaux, powerlifting ile de france, coach sportif"
        jsonLd={jsonLd}
      />
      {/* ================= SECTION HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* 🎥 Image de fond dynamique */}
        <img
          src={heroBackground || "https://iron-gym.imgix.net/backgrounds/DevantIron.jpg?auto=format,compress&w=1920&fit=crop&q=85"}
          srcSet={heroBackground ? `
            ${heroBackground}&w=1280 1280w,
            ${heroBackground}&w=1920 1920w,
            ${heroBackground}&w=2560 2560w
          ` : undefined}
          sizes="100vw"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* 🔲 Overlay sombre */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

        {/* 📝 Contenu principal */}
        <div className="relative z-20 p-8 pl-12 pt-20 max-w-4xl h-full flex flex-col justify-start">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">
            VOTRE CLUB AUX VALEURS UNIQUE
          </h1>
          <p className="text-lg mb-6 text-white drop-shadow-sm">
            IRON GYM - La Salle au Concept Old School.💪
          </p>

          {/* 🔗 Boutons avec pop-ups */}
          <div className="flex justify-start gap-4">
            <button
              onClick={() => handleOpenPopup("register")}
              className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 hover:scale-105 transition-transform duration-300"
            >
              JE M'INSCRIS
            </button>
            <button
              onClick={() => handleOpenPopup("login")}
              className="bg-transparent border border-yellow-400 text-yellow-400 font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 hover:scale-105 transition-transform duration-300"
            >
              JE ME CONNECTE
            </button>
          </div>
        </div>

        {/* 🌀 Scroll flottant */}
        <a
          href="#categories"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center group no-underline"
        >
          <div className="animate-bounce group-hover:animate-[pulse_1.2s_ease-in-out_infinite]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-yellow-400 transition-transform duration-300 transform group-hover:scale-125"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M426.7 117.3c-36.4-36.4-95.5-36.4-131.8 0-20.7 20.7-30.9 49.1-28.9 77.1-16.5 10.8-30.1 26.1-38.8 44.2-16.6-1.5-33.4 4.5-45.8 16.9L91.6 345.3c-26.5 26.5-26.5 69.4 0 95.9s69.4 26.5 95.9 0l89.5-89.5c12.4-12.4 18.4-29.2 16.9-45.8 18.1-8.7 33.4-22.3 44.2-38.8 28 2 56.4-8.2 77.1-28.9 36.4-36.4 36.4-95.5 0-131.9z" />
            </svg>
          </div>
          <span className="mt-1 text-xs tracking-widest font-semibold text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            SCROLL
          </span>
        </a>
      </section>

      {/* SECTION CATEGORIES */}
      <section
        id="categories"
        className="relative z-20 animate-fade-in-top"
      >
        <Etages />
        <SectionCategories />
      </section>
      <SectionCoach />
      <Footer />

      {/* Pop-up glassmorphism */}
      {popup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-[zoomIn_0.3s_ease]">
            <h2 className="text-2xl font-bold mb-3 text-yellow-400 drop-shadow-lg">
              {popup === "register"
                ? "Prêt à rejoindre Iron GYM ?"
                : "Connecte-toi pour continuer"}
            </h2>
            <p className="text-white/90 mb-6 text-base">
              {popup === "register"
                ? "En t'inscrivant, tu rejoins notre communauté de passionnés 💪"
                : "Entre dans ton espace membre pour accéder à tes avantages 🔑"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPopup(null)}
                className="bg-gray-200/20 text-white px-6 py-2 rounded-xl border border-gray-300/20 hover:bg-gray-300/30 transition duration-300"
              >
                Annuler
              </button>
              <button
                onClick={handleRedirect}
                className="bg-yellow-400 text-black px-6 py-2 rounded-xl font-semibold shadow-lg hover:bg-yellow-300 hover:scale-105 transition-transform duration-300"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
