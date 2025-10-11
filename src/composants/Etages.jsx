import { motion } from "framer-motion";

function Etages() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-yellow-400">
        Découvrez nos espaces
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
        {/* Premier étage */}
        <motion.div
          className="relative group rounded-2xl overflow-hidden shadow-lg w-full"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="EnHaut.JPG"
            alt="Premier étage"
            className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold">
            Premier étage
          </span>
        </motion.div>

        {/* Deuxième étage */}
        <motion.div
          className="relative group rounded-2xl overflow-hidden shadow-lg w-full"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="1er.jpg" 
            alt="Deuxième étage"
            className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold">
            Deuxième étage
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Etages;
