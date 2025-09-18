function SectionCategories() {
  const categories = [
    { name: "Discipline", image: "/Cardio.JPG" },
    { name: "Motivation", image: "/GILL.jpg" },
    { name: "OLD SCHOOL", image: "/DevantIron.jpg" },
  ];

  return (
    <section className="relative w-full py-16 px-6 sm:px-10 lg:px-16">
      {/* 🌄 Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/dosGill.jpg')" }} // 👉 remplace par ton image de fond
      />

      {/* 🔲 Overlay noir semi-transparent */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 📝 Contenu */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 🖼️ Grille des images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transform group-hover:scale-105 transition duration-500"
              />
              <span className="absolute bottom-4 left-4 text-white text-lg sm:text-xl font-bold tracking-wide bg-black/50 px-3 py-1 rounded">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* 📝 Texte descriptif */}
        <div className="text-center lg:text-right">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white space-y-4">
            <div>Discipline</div>
            <div>Motivation</div>
            <div>OLD SCHOOL</div>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default SectionCategories;
