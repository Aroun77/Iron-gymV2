import { useState } from "react";
import { motion } from "framer-motion";

function SectionCategories() {
  const categories = [
    {
      name: "Equipement",
      image: "/Cardio.JPG",
      description:
        "La discipline forge le corps et l'esprit. C’est la clé pour atteindre tes objectifs.",
    },
    {
      name: "Discipline",
      image: "/GILL.jpg",
      description:
        "Chaque goutte de sueur te rapproche de ton but. Ne lâche rien 💪",
    },
    {
      name: "OLD SCHOOL",
      image: "/DevantIron.jpg",
      description:
        "Retour aux sources, là où tout a commencé. Brut, authentique, efficace.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative w-full py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* 🌄 Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dosGill.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* 🧱 Contenu principal */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* 📝 Texte à gauche */}
        <div className="text-center lg:text-left space-y-6 max-w-lg">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 leading-tight drop-shadow-lg">
            Discipline.
            <br />
            Motivation.
            <br />
            OLD SCHOOL.
          </h2>
          <p className="text-white/90 text-lg sm:text-xl">
            Des valeurs fortes pour des performances réelles.  
            Chez <span className="text-yellow-400 font-semibold">Iron GYM</span>, 
            chaque entraînement est un pas vers la légende.
          </p>
        </div>

        {/* 🖼️ Images à droite */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              } // ✅ clic sur mobile
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay au survol / clic */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 transition-all duration-500 ${
                  activeIndex === index
                    ? "bg-black/80 opacity-100"
                    : "bg-black/70 opacity-0 group-hover:opacity-100"
                }`}
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2 drop-shadow-lg">
                  {cat.name}
                </h3>
                <p className="text-white text-sm sm:text-base">
                  {cat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionCategories;
