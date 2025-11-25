import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getEtages } from "../services/api";

function Etages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  Préconnect CDN Supabase (iPhone boost)
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://cxhhepesqvcrlwfenhck.supabase.co";
    document.head.appendChild(link);

    async function loadImages() {
      try {
        const data = await getEtages();
        setImages(data);

        //  FIX SAFARI / ANDROID : force no-store au 1er rendu
        data?.forEach((img) => {
          if (img?.url) {
            fetch(img.url, { cache: "no-store" }).catch(() => {});
          }
        });
      } catch (err) {
        console.error("Erreur chargement étages:", err);
      } finally {
        setLoading(false);
      }
    }

    //  Pendant idle → préfetch Express route
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        fetch(`${API_URL}/api/images/etages`, { cache: "no-cache" }).catch(() => {});
      });
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

      {/* Grille */}
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
              decoding="async"
              style={{ contentVisibility: "auto", containIntrinsicSize: "460px" }}
              className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-110 opacity-0"
              onLoad={(e) => (e.currentTarget.style.opacity = "1")}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2 rounded-xl text-sm sm:text-base font-semibold backdrop-blur-sm">
              {img.label || `Étage ${index + 1}`}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Etages;