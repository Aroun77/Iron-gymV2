import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseImages";

function Etages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const { data, error } = await supabase.storage
          .from("gym-images")
          .list("etages", { limit: 10 });

        if (error) throw error;

        // On ignore les .hidden ou fichiers vides
        const validFiles = data.filter(
          (f) => f.name && !f.name.startsWith(".")
        );

        const urls = validFiles.map((file) => {
          const { data } = supabase
            .storage
            .from("gym-images")
            .getPublicUrl(`etages/${file.name}`);

          const baseUrl = data.publicUrl;

          // 🔥 URL optimisée SANS /render → donc PAS de 403
          const optimizedUrl = `${baseUrl}?width=1200&quality=70&resize=contain`;

          // Préchargement pour accélérer l'affichage
          fetch(optimizedUrl, { cache: "force-cache" }).catch(() => {});

          return {
            name: file.name,
            url: optimizedUrl,
          };
        });

        setImages(urls);
      } catch (err) {
        console.error("Erreur chargement images:", err);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-80 bg-black text-yellow-400 text-lg font-semibold">
        Chargement...
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#111] text-white">
      {/* Titre */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-12 tracking-wide">
        Découvrez nos espaces
      </h2>

      {/* Grille des étages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto place-items-center">
        {images.map((img, index) => (
          <motion.div
            key={img.name}
            className="relative group rounded-2xl overflow-hidden shadow-xl bg-black w-full max-w-[480px] transition-transform duration-500 hover:scale-105"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={img.url}
              alt={img.name}
              loading="lazy"
              onLoad={(e) => e.currentTarget.classList.add("loaded")}
              className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2 rounded-xl text-sm sm:text-base font-semibold backdrop-blur-sm">
              {index === 0 ? "Premier étage" : "Deuxième étage"}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Etages;
