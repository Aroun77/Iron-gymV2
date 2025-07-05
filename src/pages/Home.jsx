function Home() {
  return (
    <div className="relative h-screen w-full">
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-opacity-60"></div>

      {/* Contenu */}
      <div className="relative z-10 p-8 pl-12 pt-20 max-w-4xl h-full flex flex-col justify-start">
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
    </div>
  );
}

export default Home;
