import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../services/supabaseImages"; // ton client Supabase

function SectionCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        //  Liste des fichiers dans le dossier "categories"
        const { data, error } = await supabase
          .storage
          .from("gym-images")
          .list("categories", { limit: 10 });

        if (error) throw error;

        //  On ignore les fichiers cachés type .emptyFolderPlaceholder
        const validFiles = data.filter(f => f.name && !f.name.startsWith("."));

        //  On crée les URLs publiques
        const urls = validFiles.map((file) => {
          const { data } = supabase
            .storage
            .from("gym-images")
            .getPublicUrl(`categories/${file.name}`);

          // 🧠 Associe les descriptions manuellement selon le nom du fichier
          let description = "";
          if (file.name.toLowerCase().includes("cardio"))
            description = "Entraîne-toi avec les plus grandes marques : TechnoGym, Hammer Strength.";
          else if (file.name.toLowerCase().includes("gill"))
            description = "Chaque goutte de sueur te rapproche de ton but. Ne lâche rien 💪";
          else if (file.name.toLowerCase().includes("iron"))
            description = "Retour aux sources, là où tout a commencé. Brut, authentique, efficace.";

          return {
            name: file.name.split(".")[0], // sans l’extension
            image: data.publicUrl,
            description,
          };
        });

        console.log(" Catégories Supabase :", urls);
        setCategories(urls);
      } catch (err) {
        console.error("Erreur chargement catégories :", err);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center items-center py-20 text-yellow-400">
        Chargement des catégories...
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
      {/*  Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dosGill.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/*  Contenu principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-14">
          {/* 📝 Texte */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 leading-tight drop-shadow-lg mb-6">
              Équipement.
              <br />
              Motivation.
              <br />
              OLD SCHOOL.
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed px-2 sm:px-4">
              Des valeurs fortes pour des performances réelles.  
              Chez <span className="text-yellow-400 font-semibold">Iron GYM</span>,  
              chaque entraînement est un pas vers la légende.
            </p>
          </motion.div>

          {/* Grille de catégories */}
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center">
              {categories.map((cat, index) => (
                <motion.div
                  key={index}
                  className="relative group rounded-2xl overflow-hidden shadow-xl cursor-pointer w-full max-w-sm"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Image Supabase */}
                  <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                    <motion.img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      onLoad={(e) => e.currentTarget.classList.add("loaded")}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>

                  {/* Overlay texte */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${
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
