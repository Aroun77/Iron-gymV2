import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCategories } from "../services/api";

function SectionCategories() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    //  Préconnect CDN Supabase
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://cxhhepesqvcrlwfenhck.supabase.co";
    document.head.appendChild(link);

    async function loadCategories() {
      try {
        const data = await getCategories();

        const metaData = {
          Cardio: {
            name: "Equipement",
            description:
              "Entraîne-toi avec les plus grandes marques : TechnoGym, Hammer Strength.",
          },
          GILL: {
            name: "Motivation",
            description:
              "Chaque goutte de sueur te rapproche de ton but. Ne lâche rien 💪",
          },
          DevantIron: {
            name: "Old School",
            description:
              "Retour aux sources, brut et authentique. L’essence même de la force.",
          },
        };

        const formatted = data
          .filter(
            (it) =>
              it?.url &&
              !it.url.toLowerCase().includes("empty") &&
              !it.url.toLowerCase().includes("placeholder")
          )
          .map((cat) => ({
            ...cat,
            name: metaData[cat.name]?.name || cat.name,
            description:
              metaData[cat.name]?.description ||
              "Découvrez notre espace unique.",
          }));

        setCategories(formatted);

        //  FIX iOS SAFARI : force no-store au premier chargement
        formatted.forEach((cat) => {
          if (cat?.url) {
            fetch(cat.url, { cache: "no-store" }).catch(() => {});
          }
        });
      } catch (err) {
        console.error("Erreur Chargement Catégories:", err);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
      {/* Fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dosGill.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-14">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 leading-tight mb-6">
              Équipement.<br />Motivation.<br />OLD SCHOOL.
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed px-2 sm:px-4">
              Des valeurs fortes pour des performances réelles.<br />
              Chez{" "}
              <span className="text-yellow-400 font-semibold">Iron GYM</span>,
              chaque entraînement est un pas vers la légende.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center">
              {categories.map((cat, index) => (
                <motion.div
                  key={index}
                  className="relative group rounded-2xl overflow-hidden shadow-xl cursor-pointer w-full max-w-sm bg-[#111]"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                >
                  {/* IMAGE OPTIMISÉE */}
                  <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                    <img
                      src={cat.url}
                      alt={cat.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        contentVisibility: "auto",
                        containIntrinsicSize: "400px",
                      }}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-200 ease-out"
                      onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                    />
                  </div>

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-400 ${
                      activeIndex === index
                        ? "bg-black/80 opacity-100"
                        : "bg-black/70 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-yellow-400 mb-3 drop-shadow-lg">
                      {cat.name}
                    </h3>
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionCategories;
