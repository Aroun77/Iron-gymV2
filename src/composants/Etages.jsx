import { motion } from "framer-motion";

function Etages() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* 🏷️ Titre */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-white">
        Découvrez notre salle 
      </h2>

      {/* 🖼️ Grille images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl">
        {/* 🏋️ Premier étage */}
        <motion.div
          className="relative group rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src="/1er.jpg"
            alt="Premier étage"
            className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover transform group-hover:scale-105 transition duration-500"
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-sm sm:text-base md:text-lg font-semibold">
            Premier étage
          </span>
        </motion.div>

        {/* 🪜 Deuxième étage */}
        <motion.div
          className="relative group rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src="/EnHaut.JPG"
            alt="Deuxième étage"
            className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover transform group-hover:scale-105 transition duration-500"
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-sm sm:text-base md:text-lg font-semibold">
            Deuxième étage
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Etages;
