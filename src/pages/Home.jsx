function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 🎥 Vidéo de fond */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        aria-label="Vidéo de fond Iron Gym"
      >
        <source src="/test.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas les vidéos HTML5.
      </video>

      {/* 🔲 Overlay sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* 📝 Contenu principal */}
      <div className="relative z-20 p-8 pl-12 pt-20 max-w-4xl h-full flex flex-col justify-start">
        <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md">
          VOTRE CLUB AUX VALEURS UNIQUE
        </h1>
        <p className="text-lg mb-6 text-white drop-shadow-sm">
          Iron GYM - Là où la force prend vie.💪
        </p>

        <div className="flex justify-start gap-4">
          <button className="bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-yellow-300 transition">
            JE M'INSCRIS
          </button>
          <button className="bg-transparent border border-yellow-400 text-yellow-400 font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition">
            JE RÉSERVE MA SÉANCE D'ESSAI
          </button>
        </div>
      </div>

      {/* ⬇️ Flèche Scroll personnalisée */}
     <a
  href="#section-suivante"
  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center group"
>
  {/* 💪 Biceps SVG animé */}
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

  {/* Texte scroll */}
  <span className="mt-1 text-xs tracking-widest font-semibold text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    SCROLL
  </span>
</a>


    </div>
  );
}

export default Home;
