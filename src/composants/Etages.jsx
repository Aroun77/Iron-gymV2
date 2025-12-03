import React, { useEffect, useState } from "react";
import { getEtages } from "../services/api";

const Etages = React.memo(function Etages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const data = await getEtages();
        setImages(data);
      } catch (err) {
        console.error("Erreur chargement étages:", err);
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
      <h2 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-12 tracking-wide">
        Découvrez nos espaces
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto place-items-center">
        {images.map((img, index) => (
          <div
            key={img.name || index}
            className="etage-card relative group rounded-2xl overflow-hidden shadow-xl bg-black w-full max-w-[480px]"
          >
            <img
              src={img.url}
              srcSet={`
                ${img.url}&w=480 480w,
                ${img.url}&w=800 800w,
                ${img.url}&w=1200 1200w
              `}
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 50vw, 600px"
              alt={img.name || `Étage ${index + 1}`}
              loading="eager"
              className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundColor: '#1a1a1a' }}
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2 rounded-xl text-sm sm:text-base font-semibold backdrop-blur-sm">
              {img.label || img.name || `Étage ${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Etages;