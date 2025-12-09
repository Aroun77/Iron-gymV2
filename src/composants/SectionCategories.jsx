import React, { useState, useEffect } from "react";
import { getCategories, getBackgrounds } from "../services/api";
// Force rebuild - v2

const SectionCategories = React.memo(function SectionCategories() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        // Charger les catégories
        const data = await getCategories();

        const metaData = {
          Equipement: {
            name: "Equipement",
            description: "Entraîne-toi avec les plus grandes marques : TechnoGym, Hammer Strength, Waston, Life Fitness. ",
          },
          Dumbells: {
            name: "Performance",
            description: "Un seul endroit. Cinq disciplines : Power Lifting, Cross Training, Weight Lifting et Cardio Training.",
          },
          Old: {
            name: "Old School",
            description: "Retour aux sources, brut et authentique. L'essence même de la force.",
          },
        };

        const formatted = data
          .filter((it) => it?.url && !it.url.toLowerCase().includes("empty") && !it.url.toLowerCase().includes("placeholder"))
          .map((cat) => ({
            ...cat,
            name: metaData[cat.name]?.name || cat.name,
            description: metaData[cat.name]?.description || "Découvrez notre espace unique.",
          }));

        setCategories(formatted);

        // Charger le background dosGill
        const backgrounds = await getBackgrounds();
        const dosGill = backgrounds.find(bg => bg.name === 'dosGill');
        if (dosGill) {
          const cacheBuster = `&v=${Date.now()}`;
          setBackgroundUrl(`${dosGill.url}&w=1920&fit=crop&q=80${cacheBuster}`);
        }
      } catch (err) {
        console.error("Erreur Chargement Catégories:", err);
      }
    }

    loadData();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundUrl
            ? `url('${backgroundUrl}')`
            : "url('https://iron-gym.imgix.net/backgrounds/dosGill.jpg?auto=format,compress&w=1920&fit=crop&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-14">
          <div className="category-header text-center max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 leading-tight mb-6">
              Performance.<br />Equipement.<br />OLD SCHOOL.
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed px-2 sm:px-4">
              Des valeurs fortes pour des performances réelles.<br />
              Chez <span className="text-yellow-400 font-semibold">IRON GYM</span>, chaque entraînement est un pas vers la meilleur  version de soi.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="category-card relative group rounded-2xl overflow-hidden shadow-xl cursor-pointer w-full max-w-sm bg-[#111]"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                    <img
                      src={cat.url}
                      srcSet={`
                        ${cat.url}&w=400 400w,
                        ${cat.url}&w=800 800w,
                        ${cat.url}&w=1200 1200w
                      `}
                      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 33vw"
                      alt={cat.name}
                      loading="eager"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ backgroundColor: '#111' }}
                    />
                  </div>

                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-400 ${activeIndex === index ? "bg-black/80 opacity-100" : "bg-black/70 opacity-0 group-hover:opacity-100"
                      }`}
                  >
                    <h3 className="text-2xl font-bold text-yellow-400 mb-3 drop-shadow-lg">{cat.name}</h3>
                    <p className="text-white text-sm sm:text-base leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SectionCategories;
