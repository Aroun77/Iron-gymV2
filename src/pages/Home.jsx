import backImg from "../assets/back.png";
function Home() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Contenu avec animation */}
      <div className="relative z-10 p-8 text-left animate-fade-in-up">
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
            JE RESERVE MA SEANCE D'ESSAI
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
